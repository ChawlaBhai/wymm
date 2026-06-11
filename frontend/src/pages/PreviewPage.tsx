import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { useBiodataStore } from '@/store/biodataStore'
import { useAuthStore } from '@/store/authStore'
import { checkSlugAvailable, saveBiodataWithSlug, suggestSlug } from '@/lib/biodataService'
import TemplateModernMinimal from '@/components/templates/TemplateModernMinimal'
import TemplateRefinedElegance from '@/components/templates/TemplateRefinedElegance'
import TemplateProfessionalPremium from '@/components/templates/TemplateProfessionalPremium'
import TemplateCulturalGrace from '@/components/templates/TemplateCulturalGrace'
import TemplateTheModernist from '@/components/templates/TemplateTheModernist'
import TemplateMountainSoul from '@/components/templates/TemplateMountainSoul'
import TemplateVintageWarmth from '@/components/templates/TemplateVintageWarmth'
import TemplateAuroraGlass from '@/components/templates/TemplateAuroraGlass'
import TemplateOceanBreeze from '@/components/templates/TemplateOceanBreeze'
import TemplateRoyalMajestic from '@/components/templates/TemplateRoyalMajestic'
import TemplateBotanicalFresh from '@/components/templates/TemplateBotanicalFresh'
import TemplateCelestialNight from '@/components/templates/TemplateCelestialNight'
import TemplateRoseGoldLuxe from '@/components/templates/TemplateRoseGoldLuxe'
import TemplateZenMinimal from '@/components/templates/TemplateZenMinimal'
import TemplatePastelDreams from '@/components/templates/TemplatePastelDreams'
import TemplateHeritageSplendor from '@/components/templates/TemplateHeritageSplendor'
import { TEMPLATE_META } from '@/types/biodata'
import type { TemplateId } from '@/types/biodata'

const TEMPLATE_IDS: TemplateId[] = [
  'modern-minimal', 'refined-elegance', 'professional-premium', 'cultural-grace',
  'the-modernist', 'mountain-soul', 'vintage-warmth', 'aurora-glass',
  'ocean-breeze', 'royal-majestic', 'botanical-fresh', 'celestial-night',
  'rose-gold-luxe', 'zen-minimal', 'pastel-dreams', 'heritage-splendor',
]

function TemplateRenderer({ templateId, biodata }: {
  templateId: TemplateId
  biodata: ReturnType<typeof useBiodataStore>['biodata']
}) {
  switch (templateId) {
    case 'modern-minimal': return <TemplateModernMinimal biodata={biodata} />
    case 'refined-elegance': return <TemplateRefinedElegance biodata={biodata} />
    case 'professional-premium': return <TemplateProfessionalPremium biodata={biodata} />
    case 'cultural-grace': return <TemplateCulturalGrace biodata={biodata} />
    case 'the-modernist': return <TemplateTheModernist biodata={biodata} />
    case 'mountain-soul': return <TemplateMountainSoul biodata={biodata} />
    case 'vintage-warmth': return <TemplateVintageWarmth biodata={biodata} />
    case 'aurora-glass': return <TemplateAuroraGlass biodata={biodata} />
    case 'ocean-breeze': return <TemplateOceanBreeze biodata={biodata} />
    case 'royal-majestic': return <TemplateRoyalMajestic biodata={biodata} />
    case 'botanical-fresh': return <TemplateBotanicalFresh biodata={biodata} />
    case 'celestial-night': return <TemplateCelestialNight biodata={biodata} />
    case 'rose-gold-luxe': return <TemplateRoseGoldLuxe biodata={biodata} />
    case 'zen-minimal': return <TemplateZenMinimal biodata={biodata} />
    case 'pastel-dreams': return <TemplatePastelDreams biodata={biodata} />
    case 'heritage-splendor': return <TemplateHeritageSplendor biodata={biodata} />
    default: return <TemplateModernMinimal biodata={biodata} />
  }
}

// Slug validation: lowercase letters, numbers, hyphens; 3–30 chars
const SLUG_RE = /^[a-z0-9-]{3,30}$/

type ShareStep = 'idle' | 'slug-picker' | 'published'

export default function PreviewPage() {
  const { biodata, savedSlug, setSavedSlug, setTemplate } = useBiodataStore()
  const { user } = useAuthStore()

  // Share modal state
  const [shareOpen, setShareOpen] = useState(false)
  const [shareStep, setShareStep] = useState<ShareStep>('idle')

  // Slug picker state
  const [slug, setSlug] = useState('')
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle')
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishError, setPublishError] = useState<string | null>(null)
  const slugCheckTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Copy state (for published link)
  const [copied, setCopied] = useState(false)

  const publishedUrl = publishedSlug
    ? `${window.location.origin}/${publishedSlug}`
    : savedSlug
      ? `${window.location.origin}/${savedSlug}`
      : null

  // Open share modal — gate on auth
  function handleShareClick() {
    if (!user) {
      setShareStep('idle')
    } else if (publishedSlug || savedSlug) {
      setShareStep('published')
      setPublishedSlug(publishedSlug || savedSlug)
    } else {
      setShareStep('slug-picker')
      // Pre-fill with AI-suggested slug from name
      const suggested = suggestSlug(biodata.basicInfo.fullName)
      setSlug(suggested)
      checkSlug(suggested)
    }
    setShareOpen(true)
  }

  function handleCloseShare() {
    setShareOpen(false)
    // Reset slug picker state but keep published state
    if (shareStep !== 'published') {
      setSlug('')
      setSlugStatus('idle')
      setPublishError(null)
    }
  }

  // Debounced slug availability check
  const checkSlug = useCallback((value: string) => {
    if (slugCheckTimer.current) clearTimeout(slugCheckTimer.current)
    if (!SLUG_RE.test(value)) {
      setSlugStatus(value.length === 0 ? 'idle' : 'invalid')
      return
    }
    setSlugStatus('checking')
    slugCheckTimer.current = setTimeout(async () => {
      try {
        const available = await checkSlugAvailable(value)
        setSlugStatus(available ? 'available' : 'taken')
      } catch {
        setSlugStatus('idle')
      }
    }, 500)
  }, [])

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 30)
    setSlug(raw)
    checkSlug(raw)
  }

  async function handlePublish() {
    if (slugStatus !== 'available') return
    setIsPublishing(true)
    setPublishError(null)
    try {
      const finalSlug = await saveBiodataWithSlug(biodata, slug)
      setSavedSlug(finalSlug)
      setPublishedSlug(finalSlug)
      setShareStep('published')
    } catch (err) {
      setPublishError('Something went wrong. Please try again.')
      console.error('[PreviewPage] publish error:', err)
    } finally {
      setIsPublishing(false)
    }
  }

  function handleCopy() {
    if (!publishedUrl) return
    navigator.clipboard.writeText(publishedUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function handleWhatsApp() {
    if (!publishedUrl) return
    const text = encodeURIComponent(`View my marriage biodata: ${publishedUrl}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  // PDF download — inject print styles, trigger browser print dialog (Save as PDF)
  function handleDownload() {
    const fullName = biodata.basicInfo.fullName || 'biodata'
    const date = new Date().toISOString().slice(0, 10)

    // Inject a print stylesheet that hides everything except the template
    const style = document.createElement('style')
    style.id = 'wymm-print-style'
    style.textContent = `
      @media print {
        @page { size: 390px auto; margin: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        body * { visibility: hidden !important; }
        .preview-header,
        .mobile-template-strip-wrapper,
        .preview-share-modal,
        .mobile-share-bar { display: none !important; }
        #preview-template-target,
        #preview-template-target * { visibility: visible !important; }
        #preview-template-target {
          position: absolute !important;
          top: 0 !important; left: 0 !important;
          width: 390px !important;
          max-width: 390px !important;
          padding: 0 !important;
          margin: 0 !important;
          overflow: visible !important;
          page-break-inside: auto;
          break-inside: auto;
        }
        html, body {
          height: auto !important;
          overflow: visible !important;
          width: 390px !important;
        }
      }
    `
    document.head.appendChild(style)

    // Mark the template container
    const target = document.getElementById('preview-template-target')
    if (target) target.classList.add('preview-print-target')

    // Set document title so the browser suggests the right filename
    const prev = document.title
    document.title = `wymm-biodata-${fullName.replace(/\s+/g, '-').toLowerCase()}-${date}`

    window.print()

    // Cleanup after print dialog closes
    document.title = prev
    document.getElementById('wymm-print-style')?.remove()
    target?.classList.remove('preview-print-target')
  }

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (slugCheckTimer.current) clearTimeout(slugCheckTimer.current)
    }
  }, [])

  return (
    <>
      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid #F0F0F0',
        padding: '14px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'Inter, sans-serif',
      }}
        className="preview-header"
      >
        <Link
          to="/create"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 150ms' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1A1A1A')}
          onMouseLeave={e => (e.currentTarget.style.color = '#666')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="preview-header-edit-label">Edit</span>
        </Link>

        <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          wymm
        </span>

        <div className="preview-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={handleShareClick}
            className="preview-header-share-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '9px 18px', borderRadius: '99px',
              border: '1.5px solid #E5E5E5', background: 'white',
              color: '#1A1A1A', fontFamily: 'Inter, sans-serif',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.color = '#7C3AED' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.color = '#1A1A1A' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="btn-primary"
            style={{ padding: '9px 20px', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="preview-header-download-full">Download PDF</span>
            <span className="preview-header-download-short">PDF</span>
          </button>
        </div>
      </header>

      {/* Template content */}
      <main style={{ paddingTop: '65px', background: '#F8F9FB' }} className="preview-content">
        <div id="preview-template-target" style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px' }}>
          <TemplateRenderer templateId={biodata.templateId} biodata={biodata} />
        </div>
      </main>

      {/* Share Modal */}
      {shareOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
          onClick={e => { if (e.target === e.currentTarget) handleCloseShare() }}
        >
          <div style={{
            background: 'white', borderRadius: '24px', padding: '36px',
            width: '100%', maxWidth: '440px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.16)',
            fontFamily: 'Inter, sans-serif',
          }}>
            {/* Modal header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
                {shareStep === 'published' ? 'Your biodata is live!' : 'Share your biodata'}
              </h2>
              <button type="button" onClick={handleCloseShare} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer', fontSize: '22px', lineHeight: 1, padding: '0 4px' }}>×</button>
            </div>

            {/* Step 1 — not logged in */}
            {shareStep === 'idle' && (
              <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.12))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#shareGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <defs>
                      <linearGradient id="shareGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.6, marginBottom: '24px' }}>
                  Sign in to publish your biodata online and get a personal link you can share anywhere.
                </p>
                <Link
                  to="/login"
                  onClick={handleCloseShare}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '13px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    color: 'white', fontFamily: 'Sora, sans-serif',
                    fontSize: '15px', fontWeight: 700,
                    textDecoration: 'none', transition: 'opacity 200ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Sign in to publish
                </Link>
                <p style={{ fontSize: '12px', color: '#BBB', marginTop: '14px' }}>Free · No credit card needed</p>
              </div>
            )}

            {/* Step 2 — slug picker */}
            {shareStep === 'slug-picker' && (
              <div>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', lineHeight: 1.5 }}>
                  Choose a custom URL for your biodata profile. Like Linktree, but for marriage profiles.
                </p>

                {/* Slug input */}
                <div style={{ marginBottom: '8px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#AAA', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Your profile URL
                  </label>
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    border: `1.5px solid ${slugStatus === 'available' ? '#10B981' : slugStatus === 'taken' || slugStatus === 'invalid' ? '#EF4444' : '#E5E5E5'}`,
                    borderRadius: '12px', overflow: 'hidden',
                    transition: 'border-color 200ms ease',
                    background: '#F8F9FB',
                  }}>
                    <span style={{ padding: '11px 0 11px 14px', fontSize: '13px', color: '#AAA', whiteSpace: 'nowrap', fontFamily: 'Inter, monospace' }}>
                      willyoumarry-me.vercel.app/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={handleSlugChange}
                      placeholder="your-name"
                      autoFocus
                      style={{
                        flex: 1, padding: '11px 14px 11px 0',
                        border: 'none', background: 'transparent',
                        fontFamily: 'Inter, monospace', fontSize: '13px',
                        color: '#1A1A1A', outline: 'none',
                      }}
                    />
                    {slugStatus === 'checking' && (
                      <span style={{ padding: '0 12px', color: '#AAA', fontSize: '12px' }}>…</span>
                    )}
                    {slugStatus === 'available' && (
                      <span style={{ padding: '0 12px', color: '#10B981', fontSize: '16px', fontWeight: 700 }}>✓</span>
                    )}
                    {(slugStatus === 'taken' || slugStatus === 'invalid') && (
                      <span style={{ padding: '0 12px', color: '#EF4444', fontSize: '16px', fontWeight: 700 }}>✗</span>
                    )}
                  </div>
                </div>

                {/* Status message */}
                <div style={{ minHeight: '20px', marginBottom: '20px' }}>
                  {slugStatus === 'available' && (
                    <p style={{ fontSize: '12px', color: '#10B981', margin: 0 }}>Available! This URL is yours to claim.</p>
                  )}
                  {slugStatus === 'taken' && (
                    <p style={{ fontSize: '12px', color: '#EF4444', margin: 0 }}>Already taken, try another.</p>
                  )}
                  {slugStatus === 'invalid' && slug.length > 0 && (
                    <p style={{ fontSize: '12px', color: '#EF4444', margin: 0 }}>
                      {slug.length < 3 ? 'Minimum 3 characters.' : 'Only lowercase letters, numbers, and hyphens allowed.'}
                    </p>
                  )}
                </div>

                {publishError && (
                  <p style={{ fontSize: '13px', color: '#EF4444', background: 'rgba(239,68,68,0.08)', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px' }}>
                    {publishError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={slugStatus !== 'available' || isPublishing}
                  style={{
                    width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
                    background: slugStatus === 'available' && !isPublishing
                      ? 'linear-gradient(135deg, #7C3AED, #EC4899)'
                      : '#E5E5E5',
                    color: slugStatus === 'available' && !isPublishing ? 'white' : '#AAA',
                    fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 700,
                    cursor: slugStatus === 'available' && !isPublishing ? 'pointer' : 'default',
                    transition: 'all 200ms ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  }}
                >
                  {isPublishing ? 'Publishing…' : 'Publish Profile'}
                </button>
              </div>
            )}

            {/* Step 3 — published */}
            {shareStep === 'published' && publishedUrl && (
              <div>
                {/* Success badge */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'rgba(16,185,129,0.08)', borderRadius: '12px',
                  padding: '12px 16px', marginBottom: '24px',
                }}>
                  <span style={{ color: '#10B981', fontSize: '20px' }}>✓</span>
                  <p style={{ fontSize: '13px', color: '#10B981', fontWeight: 600, margin: 0 }}>
                    Your profile is live at the link below.
                  </p>
                </div>

                {/* Link */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#AAA', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Your profile link</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      readOnly
                      value={publishedUrl}
                      style={{
                        flex: 1, padding: '10px 14px', borderRadius: '10px',
                        border: '1.5px solid #E5E5E5', background: '#F8F9FB',
                        fontFamily: 'Inter, monospace', fontSize: '13px',
                        color: '#666', outline: 'none',
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      style={{
                        padding: '10px 16px', borderRadius: '10px',
                        border: `1.5px solid ${copied ? '#10B981' : '#7C3AED'}`,
                        background: copied ? 'rgba(16,185,129,0.08)' : 'rgba(124,58,237,0.08)',
                        color: copied ? '#10B981' : '#7C3AED',
                        fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 200ms ease', whiteSpace: 'nowrap' as const,
                      }}
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* QR Code */}
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#AAA', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>QR Code</label>
                  <div style={{ display: 'inline-block', padding: '16px', background: 'white', borderRadius: '12px', border: '1px solid #E5E5E5' }}>
                    <QRCodeSVG value={publishedUrl} size={140} fgColor="#1A1A1A" bgColor="white" />
                  </div>
                </div>

                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  style={{
                    width: '100%', padding: '13px', borderRadius: '12px',
                    border: 'none', background: '#25D366',
                    color: 'white', fontFamily: 'Sora, sans-serif',
                    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'opacity 200ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.128.558 4.127 1.534 5.864L.057 23.8a.5.5 0 0 0 .613.614l5.96-1.457A11.932 11.932 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.653-.52-5.164-1.424l-.363-.213-3.742.914.944-3.715-.232-.378A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Share on WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media print {
          .preview-header { display: none !important; }
          .preview-content { padding-top: 0 !important; background: white !important; }
          body { background: white; }
        }
        .mobile-template-strip { display: none; }
        .preview-mobile-share { display: none; }
        @media (max-width: 767px) {
          .mobile-template-strip { display: flex !important; }
          .preview-content { padding-bottom: 140px !important; }
        }
        @media (max-width: 480px) {
          .preview-header {
            padding: 10px 14px !important;
          }
          .preview-header-edit-label { display: none; }
          .preview-header-actions { gap: 6px !important; }
          .preview-header-share-btn { display: none !important; }
          .preview-header-download-full { display: none !important; }
          .preview-header-download-short { display: inline !important; }
          .preview-mobile-share {
            display: flex !important;
            position: fixed;
            bottom: 52px;
            left: 16px;
            right: 16px;
            z-index: 160;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 13px 20px;
            border-radius: 14px;
            border: none;
            background: linear-gradient(135deg, #7C3AED, #EC4899);
            color: white;
            font-family: Inter, sans-serif;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(124,58,237,0.35);
          }
        }
        .mobile-template-strip-wrapper {
          overflow: hidden;
          max-width: 100vw;
        }
        .preview-header-download-short { display: none; }
      `}</style>

      {/* Mobile share button (fixed above template strip, visible only < 480px) */}
      <button
        type="button"
        className="preview-mobile-share"
        onClick={handleShareClick}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share Biodata
      </button>

      {/* Mobile template switcher strip */}
      <div className="mobile-template-strip-wrapper" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 150 }}>
        <div
          className="mobile-template-strip"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid #F0F0F0',
            padding: '10px 16px',
            overflowX: 'auto',
            maxWidth: '100vw',
            gap: 8,
            alignItems: 'center',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {TEMPLATE_IDS.map((id) => {
            const meta = TEMPLATE_META[id]
            const active = biodata.templateId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTemplate(id)}
                style={{
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '6px 12px',
                  borderRadius: 99,
                  border: `1.5px solid ${active ? meta.accent : '#E5E5E5'}`,
                  background: active ? `${meta.accent}14` : 'white',
                  color: active ? meta.accent : '#666',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: meta.accent, flexShrink: 0 }} />
                {meta.name}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
