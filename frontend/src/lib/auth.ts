import { auth } from './firebase'
import {
  signInWithEmailLink,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from 'firebase/auth'

const ACTION_CODE_SETTINGS = {
  url: window.location.origin + '/login?finish=true',
  handleCodeInApp: true,
}

export async function sendMagicLink(email: string): Promise<void> {
  await sendSignInLinkToEmail(auth, email, ACTION_CODE_SETTINGS)
  localStorage.setItem('wymm-signin-email', email)
}

export async function completeMagicLinkSignIn(): Promise<User | null> {
  if (!isSignInWithEmailLink(auth, window.location.href)) return null
  const email = localStorage.getItem('wymm-signin-email') || prompt('Please provide your email') || ''
  const result = await signInWithEmailLink(auth, email, window.location.href)
  localStorage.removeItem('wymm-signin-email')
  return result.user
}

export async function signInWithGoogle(): Promise<User | null> {
  const provider = new GoogleAuthProvider()
  const result = await signInWithPopup(auth, provider)
  return result.user
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth)
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export function getCurrentUser(): User | null {
  return auth.currentUser
}
