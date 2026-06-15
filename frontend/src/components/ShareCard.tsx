import { useRef, useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import type { BiodataRecord } from '@/types/biodata'

interface Props {
  biodata: BiodataRecord
  profileUrl: string
  onClose: () => void
}

export default function ShareCard({ biodata, profileUrl, onClose }: Props) {
  const qrRef = useRef<HTMLCanvasElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [generating, setGenerating] = useState(true)
  const [copied, setCopied] = useState(false)
  const [sharing, setSharing] = useState(false)

  const { basicInfo, career, media } = biodata
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase()
  const shortUrl = profileUrl.replace(/^https?:\/\//, '')

  useEffect(() => {
    // Give QRCodeCanvas time to render its canvas
    const timer = setTimeout(() => generateCard(), 600)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line

  async function generateCard() {
    try {
      // Card at 2x resolution: 390×560 logical → 780×1120 physical
      const W = 780, H = 1120
      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!

      // ── Background ──
      const bgGrad = ctx.createLinearGradient(0, 0, W, H)
      bgGrad.addColorStop(0, '#f7f2ff')
      bgGrad.addColorStop(1, '#fff5f8')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, W, H)

      // ── Top gradient strip ──
      const stripGrad = ctx.createLinearGradient(0, 0, W, 0)
      stripGrad.addColorStop(0, '#7C3AED')
      stripGrad.addColorStop(1, '#EC4899')
      ctx.fillStyle = stripGrad
      ctx.fillRect(0, 0, W, 14)

      // ── Profile photo circle ──
      const cx = W / 2, cy = 220, r = 100
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.clip()

      if (media.profilePhoto) {
        await new Promise<void>(resolve => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => {
            // Cover: scale to fill circle, crop center
            const iw = img.naturalWidth, ih = img.naturalHeight
            const scale = Math.max((r * 2) / iw, (r * 2) / ih)
            const dw = iw * scale, dh = ih * scale
            const dx = cx - dw / 2, dy = cy - dh / 2
            ctx.drawImage(img, dx, dy, dw, dh)
            resolve()
          }
          img.onerror = () => { drawInitialsCircle(ctx, cx, cy, r, initials); resolve() }
          img.src = media.profilePhoto!
        })
      } else {
        drawInitialsCircle(ctx, cx, cy, r, initials)
      }
      ctx.restore()

      // ── Circle border ──
      ctx.strokeStyle = '#7C3AED'
      ctx.lineWidth = 6
      ctx.beginPath()
      ctx.arc(cx, cy, r + 4, 0, Math.PI * 2)
      ctx.stroke()

      // ── Name ──
      ctx.fillStyle = '#1A1A1A'
      ctx.textAlign = 'center'
      ctx.font = 'bold 52px "Sora", sans-serif'
      ctx.fillText(basicInfo.fullName || 'Name', W / 2, 380)

      // ── Subtitle ──
      const sub = [career?.currentDesignation, basicInfo.city].filter(Boolean).join(' · ')
      if (sub) {
        ctx.fillStyle = '#777'
        ctx.font = '28px "Inter", sans-serif'
        ctx.fillText(sub, W / 2, 430)
      }

      // ── Divider ──
      ctx.fillStyle = '#E5E5E5'
      ctx.fillRect(60, 460, W - 120, 2)

      // ── Info grid ──
      const fields = [
        { label: 'Age', value: basicInfo.age ? `${basicInfo.age} yrs` : '' },
        { label: 'Height', value: basicInfo.height || '' },
        { label: 'Religion', value: basicInfo.religion || '' },
        { label: 'Location', value: [basicInfo.city, basicInfo.state].filter(Boolean).join(', ') },
      ].filter(f => f.value)

      const colW = (W - 120) / 2
      fields.forEach((f, i) => {
        const col = i % 2, row = Math.floor(i / 2)
        const x = 60 + col * colW, y = 490 + row * 80
        ctx.fillStyle = '#BBBBBB'
        ctx.font = 'bold 18px "Inter", sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(f.label.toUpperCase(), x, y)
        ctx.fillStyle = '#1A1A1A'
        ctx.font = 'bold 26px "Inter", sans-serif'
        ctx.fillText(f.value, x, y + 30)
      })

      // ── Divider ──
      ctx.fillStyle = '#E5E5E5'
      ctx.fillRect(60, fields.length > 2 ? 670 : 590, W - 120, 2)

      // ── QR label ──
      const qrY = fields.length > 2 ? 690 : 610
      ctx.fillStyle = '#BBBBBB'
      ctx.font = 'bold 18px "Inter", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('SCAN TO VIEW FULL PROFILE', W / 2, qrY)

      // ── QR code from rendered canvas ──
      const qrCanvas = document.querySelector('#wymm-qr-hidden canvas') as HTMLCanvasElement
      if (qrCanvas) {
        const qrSize = 200
        ctx.drawImage(qrCanvas, W / 2 - qrSize / 2, qrY + 16, qrSize, qrSize)
      }

      // ── Short URL ──
      ctx.fillStyle = '#7C3AED'
      ctx.font = 'bold 22px "Inter", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(shortUrl, W / 2, qrY + 16 + 210)

      // ── wymm branding ──
      ctx.fillStyle = '#CCCCCC'
      ctx.font = '20px "Inter", sans-serif'
      ctx.fillText('💍 Created with wymm', W / 2, H - 30)

      setImageUrl(canvas.toDataURL('image/jpeg', 0.95))
    } catch (e) {
      console.error('[ShareCard] canvas error:', e)
    } finally {
      setGenerating(false)
    }
  }

  function drawInitialsCircle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, text: string) {
    const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r)
    grad.addColorStop(0, '#7C3AED')
    grad.addColorStop(1, '#EC4899')
    ctx.fillStyle = grad
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
    ctx.fillStyle = 'white'
    ctx.font = `bold ${r}px "Sora", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, cx, cy)
    ctx.textBaseline = 'alphabetic'
  }

  function downloadCard() {
    if (!imageUrl) return
    const a = document.createElement('a')
    a.href = imageUrl
    a.download = `wymm-${(basicInfo.fullName || 'biodata').replace(/\s+/g, '-').toLowerCase()}.jpg`
    a.click()
  }

  function copyLink() {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  async function shareWhatsApp() {
    if (sharing || !imageUrl) return
    setSharing(true)

    const name = basicInfo.fullName
    const role = career?.currentDesignation
    const city = basicInfo.city
    const details = [role, city].filter(Boolean).join(', ')
    const shareText = `${name}'s marriage biodata\n${details ? details + '\n' : ''}View profile: ${profileUrl}`

    try {
      // Web Share API — works on iOS Safari & Android Chrome, opens native share sheet with WhatsApp
      const blob = await fetch(imageUrl).then(r => r.blob())
      const file = new File([blob], `wymm-${(name || 'biodata').replace(/\s+/g, '-').toLowerCase()}.jpg`, { type: 'image/jpeg' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText })
        return
      }
    } catch (e) {
      // User cancelled or browser doesn't support — fall through to text-only
    }

    // Fallback: download image + open WhatsApp with text
    downloadCard()
    setTimeout(() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank'), 400)
    setSharing(false)
  }

  return (
    <>
      {/* Hidden QR canvas — rendered but off-screen so we can read it */}
      <div id="wymm-qr-hidden" style={{ position: 'fixed', left: -9999, top: -9999, pointerEvents: 'none' }}>
        <QRCodeCanvas value={profileUrl} size={200} fgColor="#1A1A1A" bgColor="white" level="M" />
      </div>

      {/* Backdrop */}
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 300 }} />

      {/* Modal */}
      <div role="dialog" style={{ position: 'fixed', inset: 0, zIndex: 301, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '28px 28px 24px', maxWidth: 440, width: '100%', fontFamily: 'Inter, sans-serif', boxShadow: '0 32px 80px rgba(0,0,0,0.20)', position: 'relative' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>Share Card</h2>
              <p style={{ fontSize: 12, color: '#AAA', margin: '4px 0 0' }}>Branded card with QR code</p>
            </div>
            <button onClick={onClose} style={{ background: '#F5F5F5', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 18, color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
          </div>

          {/* Preview */}
          {generating ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#BBB', fontSize: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #E5E5E5', borderTopColor: '#7C3AED', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              Generating card…
            </div>
          ) : imageUrl ? (
            <div style={{ marginBottom: 20 }}>
              <img src={imageUrl} style={{ width: '100%', borderRadius: 14, border: '1px solid #F0F0F0', display: 'block' }} alt="Share card preview" />
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#EF4444', fontSize: 13 }}>Could not generate. Try downloading directly.</div>
          )}

          {/* Actions */}
          {!generating && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              {/* Download */}
              <button onClick={downloadCard} disabled={!imageUrl} style={{ width: '100%', padding: 13, borderRadius: 12, border: 'none', background: imageUrl ? 'linear-gradient(135deg, #7C3AED, #EC4899)' : '#E5E5E5', color: imageUrl ? 'white' : '#AAA', fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, cursor: imageUrl ? 'pointer' : 'default' }}>
                ⬇ Download Share Card
              </button>

              {/* Copy link */}
              <button onClick={copyLink} style={{ width: '100%', padding: 12, borderRadius: 12, border: `1.5px solid ${copied ? '#10B981' : '#E5E5E5'}`, background: copied ? 'rgba(16,185,129,0.06)' : 'white', color: copied ? '#10B981' : '#555', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                {copied ? '✓ Link Copied!' : '🔗 Copy Profile Link'}
              </button>

              {/* WhatsApp */}
              <button onClick={shareWhatsApp} disabled={sharing || !imageUrl} style={{ width: '100%', padding: 13, borderRadius: 12, border: 'none', background: '#25D366', color: 'white', fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 700, cursor: 'pointer', opacity: sharing ? 0.7 : 1 }}>
                {sharing ? 'Opening…' : '📱 Share on WhatsApp'}
              </button>
              <p style={{ fontSize: 11, color: '#AAA', textAlign: 'center', margin: '4px 0 0' }}>
                On mobile: opens WhatsApp directly with image. On desktop: image downloads + link opens.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
