import { supabase } from './supabase'
import type { User } from '@supabase/supabase-js'

export type WymmUser = User | null

export async function sendMagicLink(email: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin + '/login?finish=true' }
  })
  if (error) throw error
}

export async function signInWithGoogle(): Promise<WymmUser> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/manage' }
  })
  if (error) throw error
  return null // Google OAuth redirects, so no immediate user returned
}

export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password })
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}

export function onAuthChange(callback: (user: WymmUser) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })
  return () => subscription.unsubscribe()
}

export async function getCurrentUser(): Promise<WymmUser> {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function completeMagicLinkSignIn(): Promise<WymmUser> {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}
