import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBiodata } from '@/lib/biodataService'
import { exportToPDF } from '@/lib/pdfExport'
import ShareModal from '@/components/ShareModal'
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
import type { BiodataRecord } from '@/types/biodata'
import { Download, Share2 } from 'lucide-react'

const TEMPLATE_CONTAINER_ID = 'biodata-template-container'

/** Render the correct template based on templateId */
function BiodataTemplate({ biodata }: { biodata: BiodataRecord }) {
  switch (biodata.templateId) {
    case 'modern-minimal':
      return <TemplateModernMinimal biodata={biodata} />
    case 'refined-elegance':
      return <TemplateRefinedElegance biodata={biodata} />
    case 'professional-premium':
      return <TemplateProfessionalPremium biodata={biodata} />
    case 'cultural-grace':
      return <TemplateCulturalGrace biodata={biodata} />
    case 'the-modernist':
      return <TemplateTheModernist biodata={biodata} />
    case 'mountain-soul':
      return <TemplateMountainSoul biodata={biodata} />
    case 'vintage-warmth':
      return <TemplateVintageWarmth biodata={biodata} />
    case 'aurora-glass':
      return <TemplateAuroraGlass biodata={biodata} />
    case 'ocean-breeze':
      return <TemplateOceanBreeze biodata={biodata} />
    case 'royal-majestic':
      return <TemplateRoyalMajestic biodata={biodata} />
    case 'botanical-fresh':
      return <TemplateBotanicalFresh biodata={biodata} />
    case 'celestial-night':
      return <TemplateCelestialNight biodata={biodata} />
    case 'rose-gold-luxe':
      return <TemplateRoseGoldLuxe biodata={biodata} />
    case 'zen-minimal':
      return <TemplateZenMinimal biodata={biodata} />
    case 'pastel-dreams':
      return <TemplatePastelDreams biodata={biodata} />
    case 'heritage-splendor':
      return <TemplateHeritageSplendor biodata={biodata} />
    default:
      return <TemplateModernMinimal biodata={biodata} />
  }
}

export default function SharePage() {
  // Support both /pr/:slug and /:slug routes
  const params = useParams<{ slug: string }>()
  const slug = params.slug

  const [biodata, setBiodata] = useState<BiodataRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [pdfLoading, setPdfLoading] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      setNotFound(true)
      setLoading(false)
      return
    }

    let cancelled = false

    getBiodata(slug).then((data) => {
      if (cancelled) return
      if (!data) {
        setNotFound(true)
      } else {
        setBiodata(data)
      }
      setLoading(false)
    }).catch(() => {
      if (!cancelled) {
        setNotFound(true)
        setLoading(false)
      }
    })

    return () => { cancelled = true }
  }, [slug])

  const handleDownloadPDF = async () => {
    if (!biodata) return
    setPdfError(null)
    const source = document.getElementById(TEMPLATE_CONTAINER_ID)
    if (!source) return
    setPdfLoading(true)
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])
      const container = document.createElement('div')
      container.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:480px;background:white;overflow:visible;height:auto;font-family:Inter,sans-serif;'
      document.body.appendChild(container)
      const clone = source.cloneNode(true) as HTMLElement
      clone.style.cssText = 'width:480px;height:auto;overflow:visible;position:static;'
      clone.querySelectorAll('*').forEach((el) => {
        const h = el as HTMLElement
        const s = h.style
        if (s.opacity === '0') s.opacity = '1'
        if (s.visibility === 'hidden') s.visibility = 'visible'
        if (s.transform?.includes('translate')) s.transform = 'none'
        if (s.minHeight?.includes('100vh')) s.minHeight = 'auto'
        if (s.height?.includes('100vh')) s.height = 'auto'
      })
      container.appendChild(clone)

      // Fix objectFit:cover for all images (html2canvas ignores objectFit)
      const allImgs = Array.from(clone.querySelectorAll('img')) as HTMLImageElement[]

      // First ensure all images are loaded
      await Promise.all(allImgs.map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve()
        return new Promise<void>(resolve => {
          img.onload = () => resolve()
          img.onerror = () => resolve()
          if (!img.src && img.currentSrc) img.src = img.currentSrc
        })
      }))

      // Now replace each image with a pre-cropped canvas data URL
      for (const img of allImgs) {
        if (!img.naturalWidth || !img.naturalHeight) continue
        const parent = img.parentElement
        if (!parent) continue

        const containerW = parent.offsetWidth || parseInt(parent.style.width) || img.offsetWidth
        const containerH = parent.offsetHeight || parseInt(parent.style.height) || img.offsetHeight
        if (!containerW || !containerH) continue

        const offCanvas = document.createElement('canvas')
        offCanvas.width = containerW
        offCanvas.height = containerH
        const offCtx = offCanvas.getContext('2d')!

        const iw = img.naturalWidth, ih = img.naturalHeight
        const scale = Math.max(containerW / iw, containerH / ih)
        const scaledW = iw * scale, scaledH = ih * scale
        const offsetX = (containerW - scaledW) / 2
        const offsetY = (containerH - scaledH) / 2

        offCtx.drawImage(img, offsetX, offsetY, scaledW, scaledH)

        img.src = offCanvas.toDataURL('image/jpeg', 0.95)
        img.style.width = `${containerW}px`
        img.style.height = `${containerH}px`
        img.style.objectFit = 'fill'
        img.style.display = 'block'

        parent.style.overflow = 'hidden'
        const parentBorderRadius = window.getComputedStyle(parent).borderRadius
        if (parentBorderRadius && parentBorderRadius !== '0px') {
          parent.style.borderRadius = parentBorderRadius
        }
      }

      // Wait for pre-cropped images to be ready
      await new Promise(r => setTimeout(r, 100))

      // Collect links using offset position (getBoundingClientRect returns 0,0 off-screen)
      function getOffsetPosition(el: HTMLElement, ancestor: HTMLElement): { x: number; y: number } {
        let x = 0, y = 0, cur: HTMLElement | null = el
        while (cur && cur !== ancestor) {
          x += cur.offsetLeft
          y += cur.offsetTop
          cur = cur.offsetParent as HTMLElement | null
        }
        return { x, y }
      }

      const pdfLinks: { x: number; y: number; w: number; h: number; url: string }[] = []
      clone.querySelectorAll('a[href]').forEach(a => {
        const el = a as HTMLAnchorElement
        const href = el.getAttribute('href')
        if (!href || href.startsWith('#')) return
        const pos = getOffsetPosition(el, clone)
        pdfLinks.push({
          x: pos.x,
          y: pos.y,
          w: el.offsetWidth,
          h: el.offsetHeight,
          url: href.startsWith('http') ? href : `https://${href.replace(/^\/\//, '')}`,
        })
      })

      const canvas = await html2canvas(container, { scale: 2, useCORS: true, allowTaint: true, backgroundColor: '#ffffff', scrollX: 0, scrollY: 0, windowWidth: 480, windowHeight: container.scrollHeight })
      document.body.removeChild(container)
      const pxToMm = 0.264583
      const w = (canvas.width / 2) * pxToMm
      const h = (canvas.height / 2) * pxToMm
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [w, h] })
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, w, h)
      pdfLinks.forEach(({ x, y, w: lw, h: lh, url }) => pdf.link(x * pxToMm, y * pxToMm, lw * pxToMm, lh * pxToMm, { url }))
      const name = (biodata.basicInfo.fullName || slug || 'biodata').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      pdf.save(`wymm-${name}.pdf`)
    } catch {
      setPdfError('Could not generate PDF. Please try again.')
    } finally {
      setPdfLoading(false)
    }
  }

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', background: '#FAFAFA',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '3px solid #E5E5E5',
            borderTopColor: '#7C3AED',
            animation: 'spin 0.7s linear infinite',
          }}
        />
        <p style={{ fontFamily: "'Sora', sans-serif", color: '#666', fontSize: 14 }}>
          Loading profile...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  // ── Not found state ───────────────────────────────────────────────────────
  if (notFound || !biodata) {
    return (
      <div
        style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          minHeight: '100vh', background: '#FAFAFA',
          padding: '24px', textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 56, marginBottom: 16,
            background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800,
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 22, fontWeight: 700,
            color: '#1A1A1A', marginBottom: 10,
          }}
        >
          This biodata doesn't exist
        </h1>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 32, maxWidth: 320 }}>
          The link you followed may be broken, or this profile may have been removed.
        </p>
        <Link to="/create" className="btn-primary" style={{ fontSize: 14, padding: '10px 24px' }}>
          Create yours →
        </Link>
      </div>
    )
  }

  // ── Profile found ─────────────────────────────────────────────────────────
  return (
    <>
      {/* Fixed acquisition header */}
      <header
        className="glass"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 60, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700, fontSize: 20,
            textDecoration: 'none',
          }}
        >
          <span className="text-gradient-purple">wymm 💍</span>
        </Link>
        <Link
          to="/create"
          className="btn-primary"
          style={{ fontSize: 13, padding: '8px 20px' }}
        >
          Create Mine →
        </Link>
      </header>

      {/* Template content */}
      <main style={{ paddingTop: 60, paddingBottom: 100, background: '#F8F9FB', minHeight: '100vh' }}>
        <div
          style={{ maxWidth: 860, margin: '0 auto', padding: '32px 16px 0' }}
        >
          <div id={TEMPLATE_CONTAINER_ID} style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}>
            <BiodataTemplate biodata={biodata} />
          </div>
        </div>
      </main>

      {/* Fixed bottom share/download bar */}
      <div
        className="glass"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          height: 72, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 12, padding: '0 24px',
        }}
      >
        {pdfError && (
          <p style={{ color: '#DC2626', fontSize: 12, position: 'absolute', top: -24, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
            {pdfError}
          </p>
        )}
        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          className="btn-secondary"
          style={{ padding: '10px 24px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}
          aria-label="Download as PDF"
        >
          {pdfLoading ? (
            <>
              <span
                style={{
                  width: 14, height: 14, borderRadius: '50%',
                  border: '2px solid #E5E5E5', borderTopColor: '#7C3AED',
                  display: 'inline-block', animation: 'spin 0.7s linear infinite',
                }}
              />
              Generating...
            </>
          ) : (
            <>
              <Download size={16} />
              Download PDF
            </>
          )}
        </button>

        <button
          onClick={() => setShareOpen(true)}
          className="btn-primary"
          style={{ padding: '10px 24px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}
          aria-label="Share biodata"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

      {/* Share modal */}
      {slug && (
        <ShareModal
          slug={slug}
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
        />
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </>
  )
}
