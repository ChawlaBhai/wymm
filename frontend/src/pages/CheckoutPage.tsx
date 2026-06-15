import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBiodataStore } from '@/store/biodataStore'
import { useAuthStore } from '@/store/authStore'
import { TEMPLATE_META } from '@/types/biodata'

// Razorpay type declarations
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  prefill?: { name?: string; email?: string }
  theme?: { color?: string }
  handler: (response: { razorpay_payment_id: string }) => void
  modal?: { ondismiss?: () => void }
}

interface RazorpayInstance {
  open(): void
}

function loadRazorpay(): Promise<boolean> {
  return new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const FEATURES = [
  'Shareable profile link',
  'QR code included',
  'PDF download',
  'Live forever — no expiry',
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { biodata } = useBiodataStore()
  const { user } = useAuthStore()

  const [paying, setPaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paid, setPaid] = useState(false)

  const templateMeta = TEMPLATE_META[biodata.templateId]
  const fullName = biodata.basicInfo?.fullName || 'Your Biodata'
  const templateName = templateMeta?.name || 'Custom Template'
  const profilePhoto = biodata.media?.profilePhoto || null
  const initials = fullName
    .split(' ')
    .map((n: string) => n[0] || '')
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Redirect to login if not signed in
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true })
    }
  }, [user, navigate])

  // If already paid (returning from payment success), proceed
  useEffect(() => {
    if (sessionStorage.getItem('payment-completed') === 'true') {
      navigate('/preview', { replace: true })
    }
  }, [navigate])

  async function handlePay() {
    setError(null)
    setPaying(true)

    const loaded = await loadRazorpay()
    if (!loaded) {
      setError('Could not load payment gateway. Please check your connection and try again.')
      setPaying(false)
      return
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY as string
    if (!razorpayKey || razorpayKey === 'rzp_test_your_key_here') {
      setError('Payment is not configured yet. Please contact support.')
      setPaying(false)
      return
    }

    try {
      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: 2000, // ₹20 in paise
        currency: 'INR',
        name: 'wymm',
        description: `Publish biodata — ${fullName}`,
        prefill: {
          name: fullName,
          email: user?.email || undefined,
        },
        theme: { color: '#7C3AED' },
        handler: (response) => {
          // Payment successful
          console.log('[Checkout] Payment successful:', response.razorpay_payment_id)
          sessionStorage.setItem('payment-completed', 'true')
          sessionStorage.setItem('razorpay-payment-id', response.razorpay_payment_id)
          setPaid(true)
          setPaying(false)
        },
        modal: {
          ondismiss: () => {
            setPaying(false)
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error('[Checkout] Razorpay error:', err)
      setError('Something went wrong opening the payment window. Please try again.')
      setPaying(false)
    }
  }

  function handleProceedAfterPayment() {
    navigate('/preview', { replace: true })
  }

  if (!user) return null

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F5F0FF 0%, #FFF5FB 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Header nav */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link to="/preview" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              wymm
            </span>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: 24,
          padding: '36px 32px',
          boxShadow: '0 20px 60px rgba(124,58,237,0.12)',
          border: '1px solid rgba(124,58,237,0.08)',
        }}>

          {paid ? (
            /* ── SUCCESS STATE ── */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(16,185,129,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: 28,
              }}>
                ✓
              </div>
              <h2 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 22,
                fontWeight: 800,
                color: '#1A1A1A',
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}>
                Payment successful!
              </h2>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6, marginBottom: 28 }}>
                Now choose your profile URL and publish your biodata.
              </p>
              <button
                type="button"
                onClick={handleProceedAfterPayment}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 14,
                  border: 'none',
                  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                  color: 'white',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '-0.01em',
                }}
              >
                Choose your profile URL →
              </button>
            </div>
          ) : (
            /* ── PAYMENT STATE ── */
            <>
              {/* Title */}
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <h1 style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#1A1A1A',
                  letterSpacing: '-0.02em',
                  marginBottom: 6,
                }}>
                  Publish your biodata
                </h1>
                <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
                  One-time payment · No subscription
                </p>
              </div>

              {/* Profile preview card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: '#F8F9FB',
                borderRadius: 16,
                padding: '16px 20px',
                marginBottom: 24,
                border: '1px solid #EBEBEB',
              }}>
                {/* Avatar */}
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(124,58,237,0.2)',
                }}>
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={fullName}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{
                      fontFamily: 'Sora, sans-serif',
                      fontWeight: 700,
                      fontSize: 18,
                      color: 'white',
                    }}>
                      {initials}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#1A1A1A',
                    margin: '0 0 3px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {fullName}
                  </p>
                  <p style={{ fontSize: 13, color: '#AAA', margin: 0 }}>
                    {templateName} template
                  </p>
                </div>

                {/* Price badge */}
                <div style={{
                  flexShrink: 0,
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.1))',
                  border: '1px solid rgba(124,58,237,0.15)',
                  borderRadius: 10,
                  padding: '6px 14px',
                  textAlign: 'center',
                }}>
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 800,
                    fontSize: 20,
                    color: '#7C3AED',
                    letterSpacing: '-0.02em',
                  }}>
                    ₹20
                  </span>
                </div>
              </div>

              {/* Feature list */}
              <div style={{ marginBottom: 28 }}>
                {FEATURES.map(feature => (
                  <div
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '7px 0',
                      borderBottom: '1px solid #F5F5F5',
                    }}
                  >
                    <span style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'rgba(16,185,129,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10B981',
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      ✓
                    </span>
                    <span style={{ fontSize: 14, color: '#444', fontWeight: 500 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  marginBottom: 16,
                  fontSize: 13,
                  color: '#EF4444',
                }}>
                  {error}
                </div>
              )}

              {/* Pay button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: 14,
                  border: 'none',
                  background: paying
                    ? '#E5E5E5'
                    : 'linear-gradient(135deg, #7C3AED, #EC4899)',
                  color: paying ? '#AAA' : 'white',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 17,
                  fontWeight: 700,
                  cursor: paying ? 'default' : 'pointer',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 200ms ease',
                  marginBottom: 14,
                }}
              >
                {paying ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Opening payment…
                  </>
                ) : (
                  'Pay ₹20 & Publish →'
                )}
              </button>

              {/* Trust signals */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 12, color: '#BBBBBB', margin: '0 0 6px' }}>
                  🔒 Powered by Razorpay · 100% secure payment
                </p>
                <p style={{ fontSize: 11, color: '#CCCCCC', margin: 0, lineHeight: 1.5 }}>
                  By proceeding you agree to our{' '}
                  <Link to="/terms" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Terms</Link>
                  {' '}and{' '}
                  <Link to="/refund" style={{ color: '#AAAAAA', textDecoration: 'none' }}>Refund Policy</Link>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Back link */}
        {!paid && (
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link
              to="/preview"
              style={{ fontSize: 13, color: '#AAAAAA', textDecoration: 'none' }}
            >
              ← Back to preview
            </Link>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
