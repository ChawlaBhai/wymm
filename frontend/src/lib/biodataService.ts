import { supabase } from './supabase'
import { nanoid } from 'nanoid'
import type { BiodataRecord } from '@/types/biodata'

// Supabase schema uses: { id, biodata (JSONB), isPublic, _createdBy, _email, _sessionToken, _createdAt }
function buildRow(biodata: BiodataRecord, slug: string, userId?: string, userEmail?: string) {
  const sessionToken = localStorage.getItem('wymm-session-token') || nanoid(16)
  localStorage.setItem('wymm-session-token', sessionToken)
  return {
    id: slug,
    biodata: { ...biodata, id: slug, slug, updatedAt: new Date().toISOString() },
    isPublic: biodata.isPublic ?? true,
    _createdBy: userId ?? null,
    _email: userEmail ?? null,
    _sessionToken: userId ? null : sessionToken,
    _createdAt: new Date().toISOString(),
  }
}

export async function saveBiodata(biodata: BiodataRecord): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser()
  const firstName = biodata.basicInfo.fullName.split(' ')[0] ?? 'user'
  const lastName = biodata.basicInfo.fullName.split(' ').slice(1).join('-') || 'biodata'
  const slug = `${firstName}-${lastName}-${nanoid(5)}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
  const { error } = await supabase.from('biodatas').insert(buildRow(biodata, slug, user?.id, user?.email ?? undefined))
  if (error) throw error
  return slug
}

export async function checkSlugAvailable(slug: string): Promise<boolean> {
  const { count } = await supabase.from('biodatas').select('id', { count: 'exact', head: true }).eq('id', slug)
  return count === null || count === 0
}

export async function saveBiodataWithSlug(biodata: BiodataRecord, slug: string, oldSlug?: string): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser()
  // If renaming (oldSlug differs), delete the old record first
  if (oldSlug && oldSlug !== slug) {
    await supabase.from('biodatas').delete().eq('id', oldSlug)
  }
  const { error } = await supabase.from('biodatas').upsert(buildRow(biodata, slug, user?.id, user?.email ?? undefined))
  if (error) throw error
  return slug
}

export async function getBiodata(slug: string): Promise<BiodataRecord | null> {
  const { data, error } = await supabase.from('biodatas').select('biodata').eq('id', slug).single()
  if (error || !data) return null
  return data.biodata as BiodataRecord
}

export function suggestSlug(fullName: string): string {
  return fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'my-biodata'
}

