import { db, storage, auth } from '@/lib/firebase'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { nanoid } from 'nanoid'
import type { BiodataRecord } from '@/types/biodata'

/** Upload a base64 image to Firebase Storage, return the public download URL. */
export async function uploadPhoto(base64: string, path: string): Promise<string> {
  const storageRef = ref(storage, path)
  // base64 includes the data URI prefix: "data:image/jpeg;base64,..."
  await uploadString(storageRef, base64, 'data_url')
  return getDownloadURL(storageRef)
}

/**
 * Replace any base64 image strings in the biodata with Firebase Storage URLs.
 * Mutates a deep clone of the passed record.
 */
async function resolveMediaUrls(biodata: BiodataRecord, slug: string): Promise<BiodataRecord> {
  const resolved = structuredClone(biodata)

  if (resolved.media.profilePhoto?.startsWith('data:')) {
    try {
      resolved.media.profilePhoto = await uploadPhoto(
        resolved.media.profilePhoto,
        `biodatas/${slug}/profile.jpg`,
      )
    } catch (err) {
      console.error('[biodataService] Failed to upload profilePhoto:', err)
      // Keep as-is on error — Firestore will reject if too large, but we don't block the save
    }
  }

  const uploadedGallery: string[] = []
  for (let i = 0; i < resolved.media.galleryPhotos.length; i++) {
    const photo = resolved.media.galleryPhotos[i]
    if (photo.startsWith('data:')) {
      try {
        const url = await uploadPhoto(photo, `biodatas/${slug}/gallery_${i}.jpg`)
        uploadedGallery.push(url)
      } catch (err) {
        console.error(`[biodataService] Failed to upload galleryPhoto[${i}]:`, err)
        // Drop the unresolved base64 to avoid Firestore doc-size limits
      }
    } else {
      uploadedGallery.push(photo)
    }
  }
  resolved.media.galleryPhotos = uploadedGallery

  return resolved
}

/**
 * Save biodata to Firestore.
 * Uploads any base64 photos to Storage first.
 * Returns the generated slug (e.g. "priya-sharma-k7x2p").
 */
export async function saveBiodata(biodata: BiodataRecord): Promise<string> {
  const firstName = biodata.basicInfo.fullName.split(' ')[0] ?? 'user'
  const lastName = biodata.basicInfo.fullName.split(' ').slice(1).join('-') || 'biodata'

  const raw = `${firstName}-${lastName}-${nanoid(5)}`
  const slug = raw.toLowerCase().replace(/[^a-z0-9-]/g, '')

  const now = new Date().toISOString()
  const resolved = await resolveMediaUrls(biodata, slug)

  // Get or create session token for anonymous users
  const sessionToken = localStorage.getItem('wymm-session-token') || nanoid(16)
  localStorage.setItem('wymm-session-token', sessionToken)

  const currentUser = auth.currentUser
  const crmFields = {
    _createdBy: currentUser?.uid || null,
    _email: currentUser?.email || null,
    _sessionToken: currentUser ? null : sessionToken,
    _createdAt: now,
  }

  const record: BiodataRecord = {
    ...resolved,
    ...crmFields,
    id: slug,
    slug,
    createdAt: biodata.createdAt ?? now,
    updatedAt: now,
  }

  await setDoc(doc(collection(db, 'biodatas'), slug), record)

  return slug
}

/**
 * Check whether a slug is available (not yet taken in Firestore).
 * Returns true if available, false if already taken.
 */
export async function checkSlugAvailable(slug: string): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'biodatas', slug))
    return !snap.exists()
  } catch (err) {
    console.error('[biodataService] checkSlugAvailable error:', err)
    return false
  }
}

/**
 * Save biodata to Firestore using a caller-provided slug.
 * Uploads any base64 photos to Storage first.
 * Returns the slug.
 */
export async function saveBiodataWithSlug(biodata: BiodataRecord, slug: string): Promise<string> {
  const now = new Date().toISOString()
  const resolved = await resolveMediaUrls(biodata, slug)

  const sessionToken = localStorage.getItem('wymm-session-token') || nanoid(16)
  localStorage.setItem('wymm-session-token', sessionToken)

  const currentUser = auth.currentUser
  const crmFields = {
    _createdBy: currentUser?.uid || null,
    _email: currentUser?.email || null,
    _sessionToken: currentUser ? null : sessionToken,
    _createdAt: now,
  }

  const record: BiodataRecord = {
    ...resolved,
    ...crmFields,
    id: slug,
    slug,
    createdAt: biodata.createdAt ?? now,
    updatedAt: now,
  }

  await setDoc(doc(collection(db, 'biodatas'), slug), record)

  return slug
}

/**
 * Fetch a biodata by its slug from Firestore.
 * Returns null if the document doesn't exist.
 */
export async function getBiodata(slug: string): Promise<BiodataRecord | null> {
  try {
    const snap = await getDoc(doc(collection(db, 'biodatas'), slug))
    if (!snap.exists()) return null
    return snap.data() as BiodataRecord
  } catch (err) {
    console.error('[biodataService] getBiodata error:', err)
    return null
  }
}
