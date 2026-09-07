import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { signInWithEmail, onAuthChange, signOut } from '@/lib/auth'
import type { BiodataRecord } from '@/types/biodata'
import { TEMPLATE_META } from '@/types/biodata'

const ADMIN_EMAIL = 'bidi13bhai@gmail.com'
const PAGE_SIZE = 20

function isDemoMode() {
  const url = import.meta.env.VITE_SUPABASE_URL || ''
  return !url || url.includes('placeholder')
}

function AdminLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Check for demo Firebase config before attempting auth
    if (isDemoMode()) {
      setError('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')
      return
    }
    setLoading(true)
    try {
      const { data, error } = await signInWithEmail(email, password)
      if (error || !data.user) { setError('Invalid email or password.'); return }
      if (data.user.email !== ADMIN_EMAIL) {
        await signOut()
        setError('Access denied.')
        return
      }
      onSuccess()
    } catch (err) {
      const code = (err as { code?: string })?.code ?? ''
      if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Invalid email or password.')
      } else if (code === 'auth/user-not-found') {
        setError('No account found with that email.')
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please wait before trying again.')
      } else if (code === 'auth/invalid-api-key' || code === 'auth/network-request-failed') {
        setError('Firebase is not yet configured. Please set up your .env file with real Firebase credentials to access the admin panel.')
      } else {
        setError('Sign-in failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F0F0F',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20}}>
      <div style={{
        background: '#1A1A1A',
        border: '1px solid #2A2A2A',
        borderRadius: 14,
        padding: '36px 32px',
        width: '100%',
        maxWidth: 360}}>
        <div style={{
          display: 'inline-block',
          background: '#DC2626',
          color: '#fff',
          fontSize: 10,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          letterSpacing: '0.1em',
          padding: '3px 8px',
          borderRadius: 4,
          marginBottom: 20}}>
          RESTRICTED
        </div>
        <h1 style={{
          fontFamily: 'Sora, sans-serif',
          fontWeight: 700,
          fontSize: 22,
          color: '#fff',
          marginBottom: 6}}>
          Admin Access
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#666', marginBottom: 28 }}>
          Authorised personnel only
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="admin@example.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #333',
                background: '#0F0F0F',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box'}}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, color: '#888', marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: '1px solid #333',
                background: '#0F0F0F',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box'}}
            />
          </div>

          {error && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: '#F87171',
              marginBottom: 16,
              padding: '8px 12px',
              background: '#3B0A0A',
              borderRadius: 8}}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px 16px',
              borderRadius: 8,
              border: 'none',
              background: loading ? '#444' : '#fff',
              color: '#0F0F0F',
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'}}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const navigate = useNavigate()
  const [authChecked, setAuthChecked] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [biodatas, setBiodatas] = useState<BiodataRecord[]>([])
  const [dataLoading, setDataLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const checkAdmin = useCallback((email: string | null | undefined) => {
    return email === ADMIN_EMAIL
  }, [])

  useEffect(() => {
    const unsub = onAuthChange((user) => {
      if (user && checkAdmin(user.email)) {
        setIsAdmin(true)
        setAuthChecked(true)
      } else if (user && !checkAdmin(user.email)) {
        // Logged in but not admin
        navigate('/', { replace: true })
      } else {
        setIsAdmin(false)
        setAuthChecked(true)
      }
    })
    return unsub
  }, [navigate, checkAdmin])

  useEffect(() => {
    if (isAdmin) {
      fetchAllBiodatas()
    }
  }, [isAdmin])

  async function fetchAllBiodatas() {
    setDataLoading(true)
    try {
      const { data } = await supabase.from('biodatas').select('*').order('createdAt', { ascending: false })
      setBiodatas((data ?? []) as BiodataRecord[])
    } catch (err) {
      console.error('[AdminPage] fetch error:', err)
    } finally {
      setDataLoading(false)
    }
  }

  async function handleDelete(slug: string) {
    try {
      await supabase.from('biodatas').delete().eq('id', slug)
      setBiodatas(prev => prev.filter(b => b.slug !== slug))
    } catch (err) {
      console.error('[AdminPage] delete error:', err)
    } finally {
      setDeleteTarget(null)
    }
  }

  // Stats
  const totalProfiles = biodatas.length
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const profilesThisWeek = biodatas.filter(b => b.createdAt && new Date(b.createdAt).getTime() >= oneWeekAgo).length
  const totalEmailsCollected = biodatas.filter(b => b._email).length

  const templateCounts = biodatas.reduce<Record<string, number>>((acc, b) => {
    const t = b.templateId ?? 'unknown'
    acc[t] = (acc[t] ?? 0) + 1
    return acc
  }, {})
  const mostUsedTemplate = Object.entries(templateCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'
  const mostUsedTemplateName = TEMPLATE_META[mostUsedTemplate as keyof typeof TEMPLATE_META]?.name ?? mostUsedTemplate

  // Filtered + paginated
  const filtered = biodatas.filter(b =>
    !searchQuery || b.basicInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  if (!authChecked) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0F0F0F' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #333', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  if (!isAdmin) {
    return <AdminLoginForm onSuccess={() => {}} />
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', fontFamily: 'Inter, sans-serif' }}>
      {/* Admin strip */}
      <div style={{
        background: '#0F0F0F',
        color: '#FF4444',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.08em'}}>
        <span>ADMIN PANEL — CONFIDENTIAL</span>
        <button
          onClick={async () => { await signOut(); navigate('/') }}
          style={{
            background: 'none',
            border: '1px solid #333',
            color: '#888',
            padding: '4px 12px',
            borderRadius: 4,
            fontSize: 11,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            letterSpacing: '0.04em'}}
        >
          SIGN OUT
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 60px' }}>
        <h1 style={{
          fontFamily: 'Sora, sans-serif',
          fontWeight: 700,
          fontSize: 26,
          color: '#1A1A1A',
          marginBottom: 28,
          letterSpacing: '-0.02em'}}>
          Dashboard
        </h1>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 36}}>
          {[
            { label: 'Total Profiles', value: totalProfiles, icon: '📋' },
            { label: 'This Week', value: profilesThisWeek, icon: '📈' },
            { label: 'Top Template', value: mostUsedTemplateName, icon: '🎨' },
            { label: 'Emails Collected', value: totalEmailsCollected, icon: '📧' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#fff',
              borderRadius: 12,
              padding: '20px 20px',
              border: '1px solid #EBEBEB'}}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: typeof stat.value === 'number' ? 32 : 18,
                fontWeight: 700,
                color: '#1A1A1A',
                lineHeight: 1.1,
                marginBottom: 4}}>
                {dataLoading ? '—' : stat.value}
              </div>
              <div style={{ fontSize: 12, color: '#888', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Profiles table */}
        <div style={{
          background: '#fff',
          borderRadius: 14,
          border: '1px solid #EBEBEB',
          overflow: 'hidden'}}>
          {/* Table header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #F0F0F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap'}}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: 16, color: '#1A1A1A' }}>
              All Profiles
            </h2>
            <input
              type="text"
              placeholder="Search by name…"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid #EBEBEB',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                color: '#1A1A1A',
                outline: 'none',
                width: 220,
                background: '#FAFAFA'}}
            />
          </div>

          {dataLoading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#888', fontSize: 14 }}>
              Loading profiles…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#888', fontSize: 14 }}>
              No profiles found.
            </div>
          ) : (
            <>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#FAFAFA' }}>
                      {['Name', 'Email', 'Template', 'City', 'Created', 'Share', 'Actions'].map(col => (
                        <th key={col} style={{
                          padding: '11px 14px',
                          textAlign: 'left',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: 12,
                          color: '#888',
                          borderBottom: '1px solid #F0F0F0',
                          whiteSpace: 'nowrap'}}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((b, i) => {
                      const meta = TEMPLATE_META[b.templateId as keyof typeof TEMPLATE_META]
                      const createdDate = b.createdAt
                        ? new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })
                        : '—'
                      const shareUrl = b.slug ? `${window.location.origin}/${b.slug}` : ''

                      return (
                        <tr key={b.slug ?? i} style={{ borderBottom: '1px solid #F8F8F8' }}>
                          <td style={{ padding: '12px 14px', fontWeight: 500, color: '#1A1A1A', whiteSpace: 'nowrap', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {b.basicInfo.fullName || '—'}
                          </td>
                          <td style={{ padding: '12px 14px', color: '#555', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {b._email || <span style={{ color: '#CCC' }}>—</span>}
                          </td>
                          <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                            {meta ? (
                              <span style={{
                                display: 'inline-block',
                                padding: '2px 8px',
                                borderRadius: 20,
                                background: `${meta.accent}18`,
                                color: meta.accent,
                                fontSize: 11,
                                fontWeight: 600}}>
                                {meta.name}
                              </span>
                            ) : (
                              <span style={{ color: '#CCC' }}>{b.templateId}</span>
                            )}
                          </td>
                          <td style={{ padding: '12px 14px', color: '#555', whiteSpace: 'nowrap' }}>
                            {b.basicInfo.city || '—'}
                          </td>
                          <td style={{ padding: '12px 14px', color: '#888', whiteSpace: 'nowrap' }}>
                            {createdDate}
                          </td>
                          <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                            {shareUrl ? (
                              <button
                                onClick={() => navigator.clipboard.writeText(shareUrl)}
                                style={{
                                  background: 'none',
                                  border: '1px solid #EBEBEB',
                                  borderRadius: 6,
                                  padding: '4px 10px',
                                  fontSize: 11,
                                  color: '#7C3AED',
                                  cursor: 'pointer',
                                  fontFamily: 'Inter, sans-serif',
                                  fontWeight: 500}}
                              >
                                Copy Link
                              </button>
                            ) : '—'}
                          </td>
                          <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                              {b.slug && (
                                <a
                                  href={`/${b.slug}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    padding: '4px 10px',
                                    borderRadius: 6,
                                    border: '1px solid #EBEBEB',
                                    fontSize: 11,
                                    color: '#555',
                                    textDecoration: 'none',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 500}}
                                >
                                  View
                                </a>
                              )}
                              <button
                                onClick={() => setDeleteTarget(b.slug ?? null)}
                                style={{
                                  padding: '4px 10px',
                                  borderRadius: 6,
                                  border: '1px solid #FEE2E2',
                                  background: '#FEF2F2',
                                  fontSize: 11,
                                  color: '#DC2626',
                                  cursor: 'pointer',
                                  fontFamily: 'Inter, sans-serif',
                                  fontWeight: 500}}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  padding: '14px 20px',
                  borderTop: '1px solid #F0F0F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12}}>
                  <span style={{ fontSize: 12, color: '#888' }}>
                    Page {currentPage} of {totalPages} — {filtered.length} total
                  </span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 6,
                        border: '1px solid #EBEBEB',
                        background: currentPage === 1 ? '#F8F8F8' : '#fff',
                        color: currentPage === 1 ? '#CCC' : '#333',
                        fontSize: 13,
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontFamily: 'Inter, sans-serif'}}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 6,
                        border: '1px solid #EBEBEB',
                        background: currentPage === totalPages ? '#F8F8F8' : '#fff',
                        color: currentPage === totalPages ? '#CCC' : '#333',
                        fontSize: 13,
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontFamily: 'Inter, sans-serif'}}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Delete confirmation */}
      {deleteTarget && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 16}}>
          <div style={{
            background: '#fff',
            borderRadius: 14,
            padding: '28px',
            maxWidth: 340,
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)'}}>
            <h3 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: 17, color: '#1A1A1A', marginBottom: 10 }}>
              Confirm deletion
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#555', marginBottom: 20 }}>
              Permanently delete <code style={{ background: '#F5F5F5', padding: '1px 5px', borderRadius: 4, fontSize: 13 }}>{deleteTarget}</code>? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setDeleteTarget(null)}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: '1px solid #EBEBEB', background: '#F8F8F8', color: '#333', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', background: '#DC2626', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
