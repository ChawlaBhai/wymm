import { db, auth } from '@/lib/firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import type { BiodataRecord } from '@/types/biodata'

// No Firebase Storage on free plan — images stored as base64 in Firestore.
// StepMedia already compresses photos via browser-image-compression before they reach here.

function buildRecord(biodata: BiodataRecord, slug: string, now: string): BiodataRecord {
  const sessionToken = localStorage.getItem('wymm-session-token') || nanoid(16)
  localStorage.setItem('wymm-session-token', sessionToken)

  const user = auth.currentUser
  return {
    ...biodata,
    id: slug,
    slug,
    createdAt: biodata.createdAt ?? now,
    updatedAt: now,
    _createdBy: user?.uid ?? null,
    _email: user?.email ?? null,
    _sessionToken: user ? null : sessionToken,
    _createdAt: now,
  } as BiodataRecord
}

export async function saveBiodata(biodata: BiodataRecord): Promise<string> {
  const firstName = biodata.basicInfo.fullName.split(' ')[0] ?? 'user'
  const lastName = biodata.basicInfo.fullName.split(' ').slice(1).join('-') || 'biodata'
  const slug = `${firstName}-${lastName}-${nanoid(5)}`.toLowerCase().replace(/[^a-z0-9-]/g, '')

  const record = buildRecord(biodata, slug, new Date().toISOString())
  await setDoc(doc(collection(db, 'biodatas'), slug), record)
  return slug
}

export async function checkSlugAvailable(slug: string): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'biodatas', slug))
    return !snap.exists()
  } catch {
    return false
  }
}

export async function saveBiodataWithSlug(biodata: BiodataRecord, slug: string): Promise<string> {
  const record = buildRecord(biodata, slug, new Date().toISOString())
  await setDoc(doc(collection(db, 'biodatas'), slug), record)
  return slug
}

export async function getBiodata(slug: string): Promise<BiodataRecord | null> {
  try {
    const snap = await getDoc(doc(collection(db, 'biodatas'), slug))
    return snap.exists() ? (snap.data() as BiodataRecord) : null
  } catch {
    return null
  }
}

