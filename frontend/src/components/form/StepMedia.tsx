import { useCallback } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import { useBiodataStore } from '@/store/biodataStore'
import type { MediaInfo } from '@/types/biodata'

type DocumentEntry = NonNullable<MediaInfo['documents']>[number]

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function compressAndEncode(file: File, maxSizeMB: number, maxDim: number): Promise<string> {
  const compressed = await imageCompression(file, {
    maxSizeMB,
    maxWidthOrHeight: maxDim,
    useWebWorker: true})
  return toBase64(compressed)
}

function ProfileDropzone() {
  const { biodata, updateMedia } = useBiodataStore()
  const profilePhoto = biodata.media.profilePhoto

  const onDrop = useCallback(async (files: File[]) => {
    const file = files[0]
    if (!file) return
    const base64 = await compressAndEncode(file, 0.5, 800)
    updateMedia({ profilePhoto: base64 })
  }, [updateMedia])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: 1})

  if (profilePhoto) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #7C3AED', boxShadow: '0 0 0 4px rgba(124,58,237,0.12)', flexShrink: 0 }}>
          <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'inherit', marginBottom: '6px' }}>Profile photo added</p>
          <button
            type="button"
            onClick={() => updateMedia({ profilePhoto: undefined })}
            style={{ padding: '6px 16px', background: 'none', border: '1.5px solid #DC2626', borderRadius: '8px', color: '#DC2626', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            Remove
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      style={{
        border: `2px dashed ${isDragActive ? '#7C3AED' : '#E5E5E5'}`,
        borderRadius: '16px',
        padding: '36px',
        textAlign: 'center',
        background: isDragActive ? 'rgba(124,58,237,0.04)' : '#FAFAFA',
        cursor: 'pointer',
        transition: 'all 200ms ease'}}
    >
      <input {...getInputProps()} />
      <div style={{ fontSize: '36px', marginBottom: '12px' }}>📸</div>
      <p style={{ fontSize: '15px', fontWeight: 600, color: 'inherit', marginBottom: '4px' }}>
        {isDragActive ? 'Drop it here' : 'Drop your photo here'}
      </p>
      <p style={{ fontSize: '13px', color: 'inherit' }}>or click to upload · JPEG, PNG, WEBP</p>
    </div>
  )
}

function GalleryDropzone() {
  const { biodata, updateMedia } = useBiodataStore()
  const galleryPhotos = biodata.media.galleryPhotos
  const remaining = 5 - galleryPhotos.length

  const onDrop = useCallback(async (files: File[]) => {
    const toAdd = files.slice(0, remaining)
    const encoded = await Promise.all(toAdd.map(f => compressAndEncode(f, 0.3, 600)))
    updateMedia({ galleryPhotos: [...galleryPhotos, ...encoded] })
  }, [galleryPhotos, remaining, updateMedia])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxFiles: remaining,
    disabled: remaining === 0})

  function removePhoto(idx: number) {
    updateMedia({ galleryPhotos: galleryPhotos.filter((_, i) => i !== idx) })
  }

  return (
    <div>
      {/* Usage indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{ flex: 1, height: '4px', background: '#F0F0F0', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(galleryPhotos.length / 5) * 100}%`, background: 'linear-gradient(90deg, #7C3AED, #EC4899)', borderRadius: '99px', transition: 'width 300ms ease' }} />
        </div>
        <span style={{ fontSize: '12px', color: 'inherit', fontWeight: 600, whiteSpace: 'nowrap' as const }}>{galleryPhotos.length} of 5 photos</span>
      </div>

      {/* Thumbnails grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '16px' }}>
        {[0, 1, 2, 3, 4].map(idx => {
          const photo = galleryPhotos[idx]
          return (
            <div key={idx} style={{ aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1.5px solid #E5E5E5', background: '#F8F9FB' }}>
              {photo ? (
                <>
                  <img src={photo} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    aria-label="Remove photo"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D1D5DB', fontSize: '20px' }}>+</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Drop zone */}
      {remaining > 0 && (
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${isDragActive ? '#7C3AED' : '#E5E5E5'}`,
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            background: isDragActive ? 'rgba(124,58,237,0.04)' : '#FAFAFA',
            cursor: 'pointer',
            transition: 'all 200ms ease'}}
        >
          <input {...getInputProps()} />
          <p style={{ fontSize: '14px', color: 'inherit' }}>
            {isDragActive ? 'Drop photos here' : `Drop up to ${remaining} more photo${remaining !== 1 ? 's' : ''} · or click to browse`}
          </p>
        </div>
      )}
    </div>
  )
}

function DocumentsDropzone() {
  const { biodata, updateMedia } = useBiodataStore()
  const documents = biodata.media.documents ?? []
  const remaining = 5 - documents.length

  const onDrop = useCallback(async (files: File[]) => {
    const toAdd = files.slice(0, remaining)
    const entries: DocumentEntry[] = await Promise.all(
      toAdd.map(async (file) => {
        const isImage = file.type.startsWith('image/')
        let url: string
        if (isImage) {
          url = await compressAndEncode(file, 0.5, 1200)
        } else {
          url = await toBase64(file)
        }
        return {
          name: file.name.replace(/\.[^.]+$/, ''),
          url,
          type: (isImage ? 'image' : 'pdf') as 'pdf' | 'image'}
      })
    )
    updateMedia({ documents: [...documents, ...entries] })
  }, [documents, remaining, updateMedia])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []},
    maxFiles: remaining,
    disabled: remaining === 0})

  function removeDoc(idx: number) {
    updateMedia({ documents: documents.filter((_, i) => i !== idx) })
  }

  return (
    <div>
      {/* Uploaded documents list */}
      {documents.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {documents.map((doc, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', border: '1.5px solid #E5E5E5', borderRadius: '10px', background: '#FAFAFA' }}>
              <span style={{ fontSize: '20px' }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'inherit', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</p>
                <span style={{ fontSize: '11px', fontWeight: 600, color: doc.type === 'pdf' ? '#DC2626' : '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{doc.type}</span>
              </div>
              <button
                type="button"
                onClick={() => removeDoc(idx)}
                style={{ padding: '4px 12px', background: 'none', border: '1.5px solid #DC2626', borderRadius: '6px', color: '#DC2626', fontSize: '12px', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      {remaining > 0 && (
        <div
          {...getRootProps()}
          style={{
            border: `2px dashed ${isDragActive ? '#7C3AED' : '#E5E5E5'}`,
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            background: isDragActive ? 'rgba(124,58,237,0.04)' : '#FAFAFA',
            cursor: 'pointer',
            transition: 'all 200ms ease'}}
        >
          <input {...getInputProps()} />
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>📎</div>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#555', margin: 0, marginBottom: '4px' }}>
            {isDragActive ? 'Drop files here' : 'Drop PDFs or images here'}
          </p>
          <p style={{ fontSize: '12px', color: 'inherit', margin: 0 }}>
            or click to browse · up to {remaining} more file{remaining !== 1 ? 's' : ''}
          </p>
        </div>
      )}
      {remaining === 0 && (
        <p style={{ fontSize: '13px', color: 'inherit', textAlign: 'center', padding: '12px 0' }}>Maximum 5 documents reached</p>
      )}
    </div>
  )
}

export default function StepMedia() {
  const { t } = useTranslation()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: 'inherit', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          {t('builder.step.media')}
        </p>
        <p style={{ fontSize: '14px', color: 'inherit', lineHeight: 1.6 }}>
          Add a clear profile photo and up to 5 gallery photos. Photos are compressed automatically.
        </p>
      </div>

      {/* Profile Photo */}
      <div>
        <label className="form-label" style={{ marginBottom: '14px', display: 'block' }}>Profile Photo</label>
        <ProfileDropzone />
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#F0F0F0' }} />

      {/* Gallery */}
      <div>
        <label className="form-label" style={{ marginBottom: '14px', display: 'block' }}>Gallery Photos (up to 5)</label>
        <GalleryDropzone />
      </div>

      {/* Tips */}
      <div style={{ padding: '16px 20px', background: 'rgba(124,58,237,0.04)', borderRadius: '12px', border: '1px solid rgba(124,58,237,0.12)' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#7C3AED', marginBottom: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Tips for great photos</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {[
            'Use a recent, clear photo with good lighting',
            'Avoid heavy filters — natural looks best',
            'Include a full-face shot as your profile photo',
          ].map((tip, i) => (
            <li key={i} style={{ fontSize: '13px', color: 'inherit', display: 'flex', gap: '8px' }}>
              <span style={{ color: '#7C3AED' }}>·</span> {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#F0F0F0' }} />

      {/* Documents */}
      <div>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 700, color: 'inherit', marginBottom: '4px' }}>
          Other Documents <span style={{ fontWeight: 400, color: 'inherit', fontSize: '13px' }}>(optional)</span>
        </p>
        <p style={{ fontSize: '13px', color: 'inherit', marginBottom: '16px', lineHeight: 1.5 }}>
          Add Kundli, horoscope, certificates or other supporting documents
        </p>
        <DocumentsDropzone />
      </div>
    </div>
  )
}
