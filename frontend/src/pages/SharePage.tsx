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

      // Step 1: Collect image and link data from LIVE DOM before cloning
      const sourceRect = source.getBoundingClientRect()
      const sourceWidth = sourceRect.width || 900
      const scaleFactor = 480 / sourceWidth

      const liveImgs = Array.from(source.querySelectorAll('img')) as HTMLImageElement[]
      const imgMeta = liveImgs.map(img => {
        const parent = img.parentElement
        const pr = parent?.getBoundingClientRect()
        return {
          naturalW: img.naturalWidth, naturalH: img.naturalHeight,
          containerW: pr ? Math.round(pr.width * scaleFactor) : 0,
          containerH: pr ? Math.round(pr.height * scaleFactor) : 0}
      })

      const liveLinks = Array.from(source.querySelectorAll('a[href]')) as HTMLAnchorElement[]
      const linkMeta = liveLinks.map(a => {
        const href = a.getAttribute('href') || ''
        const r = a.getBoundingClientRect()
        return {
          href, x: (r.left - sourceRect.left) * scaleFactor, y: (r.top - sourceRect.top) * scaleFactor,
          w: r.width * scaleFactor, h: r.height * scaleFactor}
      }).filter(l => l.href && !l.href.startsWith('#'))

      // Step 2: Clone off-screen
      const container = document.createElement('div')
      container.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:480px;background:white;overflow:visible;height:auto;font-family:Inter,sans-serif;'
      document.body.appendChild(container)
      const clone = source.cloneNode(true) as HTMLElement
      clone.style.cssText = 'width:480px;height:auto;overflow:visible;position:static;'
      clone.querySelectorAll('*').forEach((el) => {
        const s = (el as HTMLElement).style
        if (s.opacity === '0') s.opacity = '1'
        if (s.visibility === 'hidden') s.visibility = 'visible'
        if (s.transform?.includes('translate')) s.transform = 'none'
        if (s.minHeight?.includes('100vh')) s.minHeight = 'auto'
        if (s.height?.includes('100vh')) s.height = 'auto'
      })
      container.appendChild(clone)

      // Step 3: Pre-crop images using LIVE dimensions
      const cloneImgs = Array.from(clone.querySelectorAll('img')) as HTMLImageElement[]
      await Promise.all(cloneImgs.map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve()
        return new Promise<void>(r => { img.onload = () => r(); img.onerror = () => r() })
      }))

      for (let i = 0; i < cloneImgs.length; i++) {
        const img = cloneImgs[i]; const meta = imgMeta[i]
        if (!meta || !meta.containerW || !meta.containerH) continue
        const nw = img.naturalWidth || meta.naturalW, nh = img.naturalHeight || meta.naturalH
        if (!nw || !nh) continue
        const cw = meta.containerW, ch = meta.containerH
        const oc = document.createElement('canvas'); oc.width = cw; oc.height = ch
        const ctx = oc.getContext('2d')!
        const s = Math.max(cw / nw, ch / nh)
        ctx.drawImage(img, (cw - nw * s) / 2, (ch - nh * s) / 2, nw * s, nh * s)
        img.src = oc.toDataURL('image/jpeg', 0.92)
        img.style.width = `${cw}px`; img.style.height = `${ch}px`
        img.style.objectFit = 'fill'; img.style.display = 'block'
        const parent = img.parentElement
        if (parent) {
          parent.style.overflow = 'hidden'
          const br = window.getComputedStyle(parent).borderRadius
          if (br && br !== '0px') parent.style.borderRadius = br
        }
      }

      await new Promise(r => setTimeout(r, 150))

      const canvas = await html2canvas(container, {
        scale: 2, useCORS: true, allowTaint: true,
        backgroundColor: '#ffffff', scrollX: 0, scrollY: 0,
        windowWidth: 480, windowHeight: container.scrollHeight})
      document.body.removeChild(container)

      const pxToMm = 0.264583
      const w = (canvas.width / 2) * pxToMm, h = (canvas.height / 2) * pxToMm
      const verticalScale = h / (source.scrollHeight * scaleFactor * pxToMm)
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [w, h] })
      pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, w, h)

      linkMeta.forEach(({ href, x, y, w: lw, h: lh }) => {
        const url = href.startsWith('http') ? href : `https://${href.replace(/^\/\//, '')}`
        const xm = x * pxToMm, ym = y * pxToMm * verticalScale
        const wm = lw * pxToMm, hm = lh * pxToMm
        if (xm >= 0 && ym >= 0 && wm > 0 && hm > 0) pdf.link(xm, ym, wm, hm, { url })
      })

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
          gap: 16}}
      >
        <div
          style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '3px solid #E5E5E5',
            borderTopColor: '#7C3AED',
            animation: 'spin 0.7s linear infinite'}}
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
          padding: '24px', textAlign: 'center'}}
      >
        <div
          style={{
            fontSize: 56, marginBottom: 16,
            background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Sora', sans-serif",
            fontWeight: 800}}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 22, fontWeight: 700,
            color: '#1A1A1A', marginBottom: 10}}
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
          padding: '0 24px'}}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700, fontSize: 20,
            textDecoration: 'none'}}
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
          gap: 12, padding: '0 24px'}}
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
                  display: 'inline-block', animation: 'spin 0.7s linear infinite'}}
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
