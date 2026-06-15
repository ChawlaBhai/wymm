import { useRef, useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import type { BiodataRecord } from '@/types/biodata'

interface Props {
  biodata: BiodataRecord
  profileUrl: string
  onClose: () => void
}

export default function ShareCard({ biodata, profileUrl, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [generating, setGenerating] = useState(true)
  const [copied, setCopied] = useState(false)

  const { basicInfo, career, media } = biodata

  // Initials for avatar fallback
  const initials = basicInfo.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const shortUrl = profileUrl.replace(/^https?:\/\//, '')

  useEffect(() => {
    // Wait for fonts + QRCode SVG to render fully before capture
    const timer = setTimeout(() => generateCard(), 800)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function generateCard() {
    if (!cardRef.current) return
    try {
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (doc) => {
          // Ensure QR SVG is fully visible in the cloned doc
          doc.querySelectorAll('svg').forEach((svg) => {
            svg.style.display = 'block'
            svg.style.visibility = 'visible'
          })
        },
      })
      setImageUrl(canvas.toDataURL('image/jpeg', 0.95))
    } catch (e) {
      console.error('[ShareCard] html2canvas error:', e)
    } finally {
      setGenerating(false)
    }
  }

  function downloadCard() {
    if (!imageUrl) return
    const a = document.createElement('a')
    a.href = imageUrl
    a.download = `wymm-${basicInfo.fullName.replace(/\s+/g, '-').toLowerCase()}.jpg`
    a.click()
  }

  function copyLink() {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function shareWhatsApp() {
    const name = basicInfo.fullName
    const role = career?.currentDesignation
    const city = basicInfo.city
    const details = [role, city].filter(Boolean).join(', ')
    const text = encodeURIComponent(
      `${name}'s marriage biodata\n${details ? details + '\n' : ''}View full profile: ${profileUrl}`
    )
    // WhatsApp Web/Mobile — can't directly attach images via URL scheme.
    // Best UX: prompt user to save image first, then open WhatsApp with text.
    if (imageUrl) {
      const a = document.createElement('a')
      a.href = imageUrl
      a.download = `wymm-${basicInfo.fullName.replace(/\s+/g, '-').toLowerCase()}.jpg`
      a.click()
      // Small delay then open WhatsApp so user has the image downloaded to share manually
      setTimeout(() => {
        window.open(`https://wa.me/?text=${text}`, '_blank')
      }, 500)
    } else {
      window.open(`https://wa.me/?text=${text}`, '_blank')
    }
  }

  // Info grid rows — only show populated fields
  const infoItems = [
    { label: 'Age', value: basicInfo.age ? `${basicInfo.age} yrs` : '' },
    { label: 'Height', value: basicInfo.height || '' },
    { label: 'Religion', value: basicInfo.religion || '' },
    {
      label: 'Location',
      value: [basicInfo.city, basicInfo.state].filter(Boolean).join(', '),
    },
    { label: 'Caste', value: basicInfo.caste || '' },
    {
      label: 'Profession',
      value: career?.currentDesignation || '',
    },
  ].filter((x) => x.value)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          zIndex: 300,
        }}
        aria-hidden="true"
      />

      {/* Modal shell */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Share card"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 301,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: 24,
            padding: '28px 28px 24px',
            maxWidth: 460,
            width: '100%',
            fontFamily: 'Inter, sans-serif',
            boxShadow: '0 32px 80px rgba(0,0,0,0.20)',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1A1A1A',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                Share Card
              </h2>
              <p style={{ fontSize: 12, color: '#AAA', margin: '4px 0 0' }}>
                Download or share this mini-biodata card
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: '#F5F5F5',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                color: '#888',
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* ─── Hidden card div — captured by html2canvas ─── */}
          <div
            style={{
              position: 'absolute',
              left: -9999,
              top: 0,
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          >
            <div
              ref={cardRef}
              style={{
                width: 390,
                background: 'white',
                fontFamily: 'Inter, sans-serif',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Top gradient strip */}
              <div
                style={{
                  height: 6,
                  background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                }}
              />

              {/* Card body */}
              <div
                style={{
                  padding: '28px 28px 20px',
                  background:
                    'linear-gradient(135deg, rgba(232,223,245,0.25) 0%, rgba(252,232,235,0.18) 100%)',
                }}
              >
                {/* Profile photo / initials */}
                <div style={{ textAlign: 'center', marginBottom: 14 }}>
                  {media.profilePhoto ? (
                    <img
                      src={media.profilePhoto}
                      crossOrigin="anonymous"
                      style={{
                        width: 92,
                        height: 92,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #7C3AED',
                        display: 'inline-block',
                      }}
                      alt=""
                    />
                  ) : (
                    <div
                      style={{
                        width: 92,
                        height: 92,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 34,
                        fontWeight: 700,
                        color: 'white',
                        fontFamily: 'Sora, sans-serif',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {initials}
                    </div>
                  )}
                </div>

                {/* Name */}
                <div
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 24,
                    fontWeight: 800,
                    color: '#1A1A1A',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.2,
                    marginBottom: 6,
                  }}
                >
                  {basicInfo.fullName}
                </div>

                {/* Role · City */}
                {(career?.currentDesignation || basicInfo.city) && (
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      color: '#777',
                      marginBottom: 18,
                    }}
                  >
                    {[career?.currentDesignation, basicInfo.city]
                      .filter(Boolean)
                      .join(' · ')}
                  </div>
                )}

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: 'rgba(0,0,0,0.07)',
                    marginBottom: 18,
                  }}
                />

                {/* Info grid */}
                {infoItems.length > 0 && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px 20px',
                      marginBottom: 20,
                    }}
                  >
                    {infoItems.slice(0, 6).map(({ label, value }) => (
                      <div key={label}>
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#BBBBBB',
                            marginBottom: 2,
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#1A1A1A',
                            lineHeight: 1.3,
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* QR section */}
                <div
                  style={{
                    textAlign: 'center',
                    padding: '14px 14px 12px',
                    background: 'rgba(124,58,237,0.04)',
                    borderRadius: 14,
                    border: '1px solid rgba(124,58,237,0.10)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      color: '#BBBBBB',
                      marginBottom: 10,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Scan to view full profile
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: 8,
                      background: 'white',
                      borderRadius: 8,
                    }}
                  >
                    <QRCodeSVG
                      value={profileUrl}
                      size={96}
                      fgColor="#1A1A1A"
                      bgColor="white"
                      level="M"
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: '#7C3AED',
                      marginTop: 8,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {shortUrl}
                  </div>
                </div>

                {/* wymm branding */}
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 14,
                    fontSize: 11,
                    color: '#CCCCCC',
                    letterSpacing: '0.02em',
                  }}
                >
                  💍 Created with wymm
                </div>
              </div>
            </div>
          </div>
          {/* ─── End hidden card ─── */}

          {/* Preview area */}
          {generating ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 0',
                color: '#BBB',
                fontSize: 14,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#CCCCCC"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: 'spin 0.8s linear infinite', marginBottom: 12 }}
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <br />
              Generating card…
            </div>
          ) : imageUrl ? (
            <div style={{ marginBottom: 20 }}>
              <img
                src={imageUrl}
                style={{
                  width: '100%',
                  borderRadius: 14,
                  border: '1px solid #F0F0F0',
                  display: 'block',
                }}
                alt="Share card preview"
              />
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '24px 0',
                color: '#EF4444',
                fontSize: 13,
              }}
            >
              Could not generate preview. Try downloading directly.
            </div>
          )}

          {/* Action buttons */}
          {!generating && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Download */}
              <button
                onClick={downloadCard}
                disabled={!imageUrl}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: 12,
                  border: 'none',
                  background: imageUrl
                    ? 'linear-gradient(135deg, #7C3AED, #EC4899)'
                    : '#E5E5E5',
                  color: imageUrl ? 'white' : '#AAA',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: imageUrl ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'opacity 200ms ease',
                }}
                onMouseEnter={(e) => {
                  if (imageUrl) e.currentTarget.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Share Card
              </button>

              {/* Copy link */}
              <button
                onClick={copyLink}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 12,
                  border: `1.5px solid ${copied ? '#10B981' : '#E5E5E5'}`,
                  background: copied ? 'rgba(16,185,129,0.06)' : 'white',
                  color: copied ? '#10B981' : '#555',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 200ms ease',
                }}
              >
                {copied ? (
                  <>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Link Copied!
                  </>
                ) : (
                  <>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy Link
                  </>
                )}
              </button>

              {/* WhatsApp */}
              <button
                onClick={shareWhatsApp}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: 12,
                  border: 'none',
                  background: '#25D366',
                  color: 'white',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'opacity 200ms ease',
                }}
              >
                📱 Save image + Open WhatsApp
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.534 5.864L.057 23.8a.5.5 0 0 0 .613.614l5.96-1.457A11.932 11.932 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.653-.52-5.164-1.424l-.363-.213-3.742.914.944-3.715-.232-.378A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Share on WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  )
}
