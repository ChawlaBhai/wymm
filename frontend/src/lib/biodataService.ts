import { supabase } from './supabase'
import { nanoid } from 'nanoid'
import type { BiodataRecord } from '@/types/biodata'

function buildRecord(biodata: BiodataRecord, slug: string, now: string, userId?: string, userEmail?: string) {
  const sessionToken = localStorage.getItem('wymm-session-token') || nanoid(16)
  localStorage.setItem('wymm-session-token', sessionToken)
  return {
    ...biodata,
    id: slug,
    slug,
    createdAt: biodata.createdAt ?? now,
    updatedAt: now,
    _createdBy: userId ?? null,
    _email: userEmail ?? null,
    _sessionToken: userId ? null : sessionToken,
    _createdAt: now,
  }
}

export async function saveBiodata(biodata: BiodataRecord): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser()
  const firstName = biodata.basicInfo.fullName.split(' ')[0] ?? 'user'
  const lastName = biodata.basicInfo.fullName.split(' ').slice(1).join('-') || 'biodata'
  const slug = `${firstName}-${lastName}-${nanoid(5)}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
  const record = buildRecord(biodata, slug, new Date().toISOString(), user?.id, user?.email ?? undefined)
  const { error } = await supabase.from('biodatas').insert(record)
  if (error) throw error
  return slug
}

export async function checkSlugAvailable(slug: string): Promise<boolean> {
  const { count } = await supabase.from('biodatas').select('id', { count: 'exact', head: true }).eq('id', slug)
  // Supabase returns null when no rows found (not 0), so treat null as available
  return count === null || count === 0
}

export async function saveBiodataWithSlug(biodata: BiodataRecord, slug: string): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser()
  const record = buildRecord(biodata, slug, new Date().toISOString(), user?.id, user?.email ?? undefined)
  const { error } = await supabase.from('biodatas').upsert(record)
  if (error) throw error
  return slug
}

export async function getBiodata(slug: string): Promise<BiodataRecord | null> {
  const { data, error } = await supabase.from('biodatas').select('*').eq('id', slug).single()
  if (error || !data) return null
  return data as BiodataRecord
}
