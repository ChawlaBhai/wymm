import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { sendMagicLink, signInWithGoogle } from '@/lib/auth'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuthStore()

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  // Supabase handles the magic link token automatically via onAuthStateChange.
  // The auth store's initialize() fires when the session is established.
  // We just watch for user becoming non-null and redirect.
  useEffect(() => {
    if (!loading && user) {
      navigate('/manage', { replace: true })
    }
  }, [user, loading, navigate])

  function friendlyError(err: unknown): string {
    const msg = (err as { message?: string })?.message ?? ''
    if (msg.includes('Invalid login')) return 'Invalid email or password.'
    if (msg.includes('Email not confirmed')) return 'Check your email for the magic link.'
    return 'Something went wrong. Please try again.'
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setError('')
    setSubmitting(true)
    try {
      await sendMagicLink(email.trim())
      setSentEmail(email.trim())
      setSent(true)
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
      // Google OAuth redirects to /manage — no need to navigate manually
    } catch (err) {
      setError(friendlyError(err))
      setGoogleLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2.5px solid #E5E5E5', borderTopColor: '#7C3AED', animation: 'spin 0.7s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px'}}>
      {/* Back to home */}
      <div style={{ position: 'absolute', top: 24, left: 24 }}>
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            textDecoration: 'none',
            color: '#555',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif'}}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </Link>
      </div>

      <div style={{
        width: '100%',
        maxWidth: 400,
        background: '#fff',
        borderRadius: 16,
        border: '1px solid #EBEBEB',
        padding: '40px 36px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)'}}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
            <span style={{ fontSize: 24 }}>💍</span>
            <span
              className="text-gradient-purple"
              style={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: '-0.03em'}}
            >
              wymm
            </span>
          </Link>
          <p style={{
            marginTop: 8,
            color: '#666',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            lineHeight: 1.5}}>
            Sign in to manage your biodatas
          </p>
        </div>

        {sent ? (
          /* Success state */
          <div style={{
            textAlign: 'center',
            padding: '24px 0'}}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#F0FDF4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z" stroke="#16A34A" strokeWidth="1.5"/>
                <path d="M2 6l10 7 10-7" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: 18, color: '#1A1A1A', marginBottom: 8 }}>
              Check your email!
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#555', lineHeight: 1.6 }}>
              We sent a sign-in link to<br />
              <strong style={{ color: '#1A1A1A' }}>{sentEmail}</strong>
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#888', marginTop: 16 }}>
              Click the link in the email to sign in. It may take a minute to arrive.
            </p>
            <button
              onClick={() => { setSent(false); setEmail(''); setSentEmail('') }}
              style={{
                marginTop: 20,
                background: 'none',
                border: 'none',
                color: '#7C3AED',
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                textDecoration: 'underline'}}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            {/* Magic Link Form */}
            <form onSubmit={handleMagicLink} style={{ marginBottom: 20 }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{
                  display: 'block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#333',
                  marginBottom: 6}}>
                  Email address
                </label>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoFocus
                  style={{ width: '100%' }}
                />
              </div>

              {error && (
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13,
                  color: '#DC2626',
                  marginBottom: 12,
                  padding: '8px 12px',
                  background: '#FEF2F2',
                  borderRadius: 8}}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={submitting || !email.trim()}
                style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
              >
                {submitting ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>

            {/* OR divider */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16}}>
              <div style={{ flex: 1, height: 1, background: '#EBEBEB' }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#AAA' }}>OR</span>
              <div style={{ flex: 1, height: 1, background: '#EBEBEB' }} />
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogle}
              className="btn-secondary"
              disabled={googleLoading}
              style={{
                width: '100%',
                justifyContent: 'center',
                gap: 10,
                opacity: googleLoading ? 0.7 : 1}}
            >
              {!googleLoading && (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
              )}
              {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>
          </>
        )}
      </div>

      <p style={{
        marginTop: 24,
        fontFamily: 'Inter, sans-serif',
        fontSize: 12,
        color: '#AAA',
        textAlign: 'center'}}>
        By signing in, you agree to our terms of service and privacy policy.
      </p>
    </div>
  )
}
