import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/authStore'
import { useBiodataStore } from '@/store/biodataStore'
import { signOut } from '@/lib/auth'
import type { BiodataRecord, TemplateId } from '@/types/biodata'
import { TEMPLATE_META } from '@/types/biodata'

interface BiodataCardProps {
  biodata: BiodataRecord
  onEdit: () => void
  onDelete: () => void
  onShare: () => void
}

function SkeletonCard() {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      border: '1px solid #F0F0F0',
      padding: 20,
      animation: 'pulse 1.5s ease-in-out infinite',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: '#F0F0F0' }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 16, background: '#F0F0F0', borderRadius: 4, width: '60%', marginBottom: 8 }} />
          <div style={{ height: 12, background: '#F0F0F0', borderRadius: 4, width: '40%' }} />
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  )
}

function BiodataCard({ biodata, onEdit, onDelete, onShare }: BiodataCardProps) {
  const meta = TEMPLATE_META[biodata.templateId as TemplateId]
  const createdDate = biodata.createdAt
    ? new Date(biodata.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—'

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: '1px solid #EBEBEB',
      padding: '20px 20px 16px',
      transition: 'box-shadow 0.2s, transform 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        {biodata.media.profilePhoto ? (
          <img
            src={biodata.media.profilePhoto}
            alt={biodata.basicInfo.fullName}
            style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', flexShrink: 0, border: '2px solid #F0F0F0' }}
          />
        ) : (
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${meta?.accent ?? '#7C3AED'}22, ${meta?.accent ?? '#7C3AED'}44)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 20,
          }}>
            {biodata.basicInfo.fullName.charAt(0).toUpperCase()}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 600,
            fontSize: 15,
            color: '#1A1A1A',
            marginBottom: 4,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {biodata.basicInfo.fullName || 'Unnamed Profile'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {meta && (
              <span style={{
                display: 'inline-block',
                padding: '2px 8px',
                borderRadius: 20,
                background: `${meta.accent}18`,
                color: meta.accent,
                fontSize: 11,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}>
                {meta.name}
              </span>
            )}
            {biodata.basicInfo.city && (
              <span style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}>
                {biodata.basicInfo.city}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meta */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        paddingBottom: 14,
        borderBottom: '1px solid #F5F5F5',
      }}>
        <span style={{ fontSize: 12, color: '#AAA', fontFamily: 'Inter, sans-serif' }}>
          Created {createdDate}
        </span>
        <span style={{
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
          padding: '2px 8px',
          borderRadius: 20,
          background: biodata.isPublic ? '#F0FDF4' : '#FEF2F2',
          color: biodata.isPublic ? '#16A34A' : '#DC2626',
          fontWeight: 500,
        }}>
          {biodata.isPublic ? 'Public' : 'Private'}
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={onShare}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #EBEBEB',
            background: '#FAFAFA',
            color: '#555',
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            transition: 'background 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M11 2a2 2 0 100 4 2 2 0 000-4zM5.5 7a2 2 0 100 4 2 2 0 000-4zM11 10a2 2 0 100 4 2 2 0 000-4z" fill="currentColor"/>
            <path d="M7.5 8.5l3-1.5M7.5 9.5l3 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Share
        </button>
        <button
          onClick={onEdit}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #EBEBEB',
            background: '#FAFAFA',
            color: '#555',
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            transition: 'background 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M11.586 1.586a2 2 0 012.828 2.828l-8.5 8.5L2 14l1.086-3.914 8.5-8.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Edit
        </button>
        <button
          onClick={onDelete}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #FEE2E2',
            background: '#FEF2F2',
            color: '#DC2626',
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

interface DeleteDialogProps {
  name: string
  onConfirm: () => void
  onCancel: () => void
}

function DeleteDialog({ name, onConfirm, onCancel }: DeleteDialogProps) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 16,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '28px 28px 24px',
        maxWidth: 360,
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#FEF2F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 9v4M11 15.5h.01M9.172 3.172a4 4 0 015.656 0l3.999 4A4 4 0 0119 10v3a4 4 0 01-1.172 2.828l-4 4a4 4 0 01-5.656 0l-4-4A4 4 0 013 13v-3a4 4 0 011.172-2.828l4-4z" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: 17, color: '#1A1A1A', marginBottom: 8 }}>
          Delete profile?
        </h3>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>
          This will permanently delete <strong>{name}</strong>'s profile. This action cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid #EBEBEB',
              background: '#F8F8F8',
              color: '#333',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: '#DC2626',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ManageBiodasPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuthStore()
  const { resetBiodata, updateBasicInfo, updateFamilyInfo, updateEducation, updateCareer, updatePersonalInterests, updateMatchPreferences, updateMedia, setTemplate, setSavedSlug } = useBiodataStore()

  const [biodatas, setBiodatas] = useState<BiodataRecord[]>([])
  const [fetchLoading, setFetchLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<BiodataRecord | null>(null)
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      fetchBiodatas()
    }
  }, [user, loading])

  async function fetchBiodatas() {
    if (!user) return
    setFetchLoading(true)
    try {
      const { data } = await supabase.from('biodatas').select('biodata, _createdAt').eq('_createdBy', user.id)
      const docs = ((data ?? []) as { biodata: BiodataRecord; _createdAt: string }[])
        .map(row => row.biodata)
        .filter(Boolean)
      docs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
        return dateB - dateA
      })
      setBiodatas(docs)
    } catch (err) {
      console.error('[ManageBiodasPage] fetchBiodatas error:', err)
    } finally {
      setFetchLoading(false)
    }
  }

  async function handleEdit(biodata: BiodataRecord) {
    resetBiodata()
    // Load after reset so savedSlug from this specific profile is set
    if (biodata.templateId) setTemplate(biodata.templateId)
    if (biodata.basicInfo) updateBasicInfo(biodata.basicInfo)
    if (biodata.familyInfo) updateFamilyInfo(biodata.familyInfo)
    if (biodata.education) updateEducation(biodata.education)
    if (biodata.career) updateCareer(biodata.career)
    if (biodata.personalInterests) updatePersonalInterests(biodata.personalInterests)
    if (biodata.matchPreferences) updateMatchPreferences(biodata.matchPreferences)
    if (biodata.media) updateMedia(biodata.media)
    // Set the saved slug so PreviewPage knows this profile is already published
    if (biodata.slug) setSavedSlug(biodata.slug)
    navigate('/create')
  }

  async function handleDelete(biodata: BiodataRecord) {
    if (!biodata.slug) return
    try {
      await supabase.from('biodatas').delete().eq('id', biodata.slug)
      setBiodatas(prev => prev.filter(b => b.slug !== biodata.slug))
    } catch (err) {
      console.error('[ManageBiodasPage] delete error:', err)
    } finally {
      setDeleteTarget(null)
    }
  }

  function handleShare(biodata: BiodataRecord) {
    if (!biodata.slug) return
    const url = `${window.location.origin}/${biodata.slug}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(biodata.slug!)
      setTimeout(() => setCopiedSlug(null), 2000)
    })
  }

  async function handleSignOut() {
    setSigningOut(true)
    try {
      await signOut()
      navigate('/')
    } finally {
      setSigningOut(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2.5px solid #E5E5E5', borderTopColor: '#7C3AED', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  // Not logged in state
  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#FAFAFA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 20px 40px',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #EDE9FE, #DDD6FE)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: 32,
          }}>
            💍
          </div>
          <h1 style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700,
            fontSize: 28,
            color: '#1A1A1A',
            marginBottom: 12,
            letterSpacing: '-0.02em',
          }}>
            Your biodatas, in one place
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            color: '#666',
            lineHeight: 1.6,
            marginBottom: 28,
          }}>
            Sign in to access, edit, and manage all your marriage profiles. Everything stays organised and ready to share.
          </p>
          <Link
            to="/login"
            className="btn-primary"
            style={{ display: 'inline-flex', padding: '12px 28px', fontSize: 15 }}
          >
            Sign in to continue
          </Link>
          <p style={{ marginTop: 16, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#AAA' }}>
            Or{' '}
            <Link to="/create" style={{ color: '#7C3AED', textDecoration: 'none', fontWeight: 500 }}>
              create a biodata without an account
            </Link>
          </p>
        </div>
      </div>
    )
  }

  // Logged in state
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', paddingTop: 80 }}>
      <div className="container" style={{ maxWidth: 900, padding: '32px 20px 60px' }}>
        {/* Page header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 32,
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: 28,
              color: '#1A1A1A',
              letterSpacing: '-0.02em',
              marginBottom: 4,
            }}>
              Your Profiles
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#888' }}>
              {user.email}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              style={{
                padding: '9px 16px',
                borderRadius: 8,
                border: '1px solid #EBEBEB',
                background: '#F8F8F8',
                color: '#555',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                opacity: signingOut ? 0.6 : 1,
              }}
            >
              {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
            <button
              onClick={() => { resetBiodata(); navigate('/create') }}
              className="btn-primary"
              style={{ padding: '9px 20px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', border: 'none' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Create New
            </button>
          </div>
        </div>

        {/* Copy toast */}
        {copiedSlug && (
          <div style={{
            position: 'fixed',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1A1A1A',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: 8,
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 500,
            zIndex: 999,
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}>
            Link copied to clipboard
          </div>
        )}

        {/* Grid */}
        {fetchLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : biodatas.length === 0 ? (
          /* Empty state */
          <div style={{
            textAlign: 'center',
            padding: '64px 20px',
            background: '#fff',
            borderRadius: 16,
            border: '1px dashed #DDD',
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 600,
              fontSize: 20,
              color: '#1A1A1A',
              marginBottom: 8,
            }}>
              No profiles yet
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#888', marginBottom: 24 }}>
              Create your first marriage biodata and start sharing it.
            </p>
            <Link
              to="/create"
              className="btn-primary"
              style={{ display: 'inline-flex', padding: '10px 24px' }}
            >
              Create your first →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {biodatas.map((b) => (
              <BiodataCard
                key={b.slug}
                biodata={b}
                onEdit={() => handleEdit(b)}
                onDelete={() => setDeleteTarget(b)}
                onShare={() => handleShare(b)}
              />
            ))}
          </div>
        )}

        {/* Delete confirmation dialog */}
        {deleteTarget && (
          <DeleteDialog
            name={deleteTarget.basicInfo.fullName || 'this profile'}
            onConfirm={() => handleDelete(deleteTarget)}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </div>
    </div>
  )
}
