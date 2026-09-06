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
  const myBiodatas = await getMyBiodatas()
  const unpaidCount = myBiodatas.filter(b => !b.is_paid).length
  if (unpaidCount >= 5) {
    throw new Error('You have reached the limit of 5 free drafts. Please upgrade a profile to create more.')
  }

  const { data: { user } } = await supabase.auth.getUser()
  const firstName = biodata.basicInfo.fullName.split(' ')[0] ?? 'user'
  const lastName = biodata.basicInfo.fullName.split(' ').slice(1).join('-') || 'biodata'
  const slug = `${firstName}-${lastName}-${nanoid(5)}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
  
  const row = buildRow(biodata, slug, user?.id, user?.email ?? undefined)
  const { error } = await supabase.from('biodatas').insert(row)
  if (error) throw error
  return slug
}


export async function checkSlugAvailable(slug: string): Promise<boolean> {
  const { count } = await supabase.from('biodatas').select('id', { count: 'exact', head: true }).eq('id', slug)
  return count === null || count === 0
}

export async function saveBiodata(biodata: BiodataRecord): Promise<string> {
  const myBiodatas = await getMyBiodatas()
  const unpaidCount = myBiodatas.filter(b => !b.is_paid).length
  if (unpaidCount >= 5) {
    throw new Error('You have reached the limit of 5 free drafts. Please upgrade a profile to create more.')
  }

  const { data: { user } } = await supabase.auth.getUser()
  const firstName = biodata.basicInfo.fullName.split(' ')[0] ?? 'user'
  const lastName = biodata.basicInfo.fullName.split(' ').slice(1).join('-') || 'biodata'
  const slug = `${firstName}-${lastName}-${nanoid(5)}`.toLowerCase().replace(/[^a-z0-9-]/g, '')
  
  const row = buildRow(biodata, slug, user?.id, user?.email ?? undefined)
  const { error } = await supabase.from('biodatas').insert(row)
  if (error) throw error
  return slug
}


export async function getBiodata(slug: string): Promise<BiodataRecord | null> {
  const { data, error } = await supabase.from('biodatas').select('biodata, is_paid').eq('id', slug).single()
  if (error || !data) return null
  const b = data.biodata as BiodataRecord
  b.isPaid = data.is_paid
  return b
}

export function suggestSlug(fullName: string): string {
  return fullName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'my-biodata'
}


export async function getMyBiodatas(): Promise<{ id: string; biodata: BiodataRecord; is_paid: boolean; created_at: string }[]> {
  const { data: { user } } = await supabase.auth.getUser()
  let query = supabase.from('biodatas').select('id, biodata, is_paid, _createdAt').order('_createdAt', { ascending: false })
  
  if (user) {
    query = query.eq('_createdBy', user.id)
  } else {
    const sessionToken = localStorage.getItem('wymm-session-token')
    if (!sessionToken) return []
    query = query.eq('_sessionToken', sessionToken)
  }
  
  const { data, error } = await query
  if (error) return []
  return (data as any[]).map(r => ({ ...r, created_at: r._createdAt }))
}
