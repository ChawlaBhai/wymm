import { useState, useEffect, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { X, Copy, Check, MessageCircle, Mail, Link } from 'lucide-react'

interface ShareModalProps {
  slug: string
  isOpen: boolean
  onClose: () => void
}

export default function ShareModal({ slug, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)

  const url = `https://willyoumarry-me.vercel.app/${slug}`

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers that block clipboard API
      const el = document.createElement('input')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  const whatsappText = encodeURIComponent(`Here is my biodata: ${url}`)
  const mailtoHref = `mailto:?subject=My%20Marriage%20Biodata&body=Here%20is%20my%20biodata%3A%20${encodeURIComponent(url)}`

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '16px',
        animation: 'fade-in 0.15s ease forwards',
      }}
      aria-modal="true"
      role="dialog"
      aria-label="Share your biodata"
    >
      <div
        className="card animate-scale-in"
        style={{
          width: '100%', maxWidth: 480,
          padding: '28px 32px',
          position: 'relative',
          borderRadius: 20,
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="btn-ghost"
          style={{
            position: 'absolute', top: 16, right: 16,
            padding: 8, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 20, fontWeight: 700,
            color: '#1A1A1A', marginBottom: 4,
          }}
        >
          Share your biodata
        </h2>
        <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>
          Anyone with this link can view your biodata
        </p>

        {/* URL copy input */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#F8F9FB', borderRadius: 12,
            border: '1.5px solid #E5E5E5', padding: '10px 14px',
            marginBottom: 24,
          }}
        >
          <Link size={14} color="#AAAAAA" style={{ flexShrink: 0 }} />
          <input
            readOnly
            value={url}
            style={{
              flex: 1, border: 'none', background: 'transparent',
              fontFamily: "'Inter', sans-serif", fontSize: 13,
              color: '#666', outline: 'none', minWidth: 0,
            }}
            aria-label="Shareable URL"
            onFocus={(e) => e.target.select()}
          />
          <button
            onClick={handleCopy}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '6px 14px', borderRadius: 8,
              border: 'none', cursor: 'pointer',
              fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600,
              background: copied ? '#10B98120' : 'linear-gradient(135deg, #7C3AED, #A855F7)',
              color: copied ? '#10B981' : '#fff',
              transition: 'all 200ms ease',
              flexShrink: 0,
            }}
            aria-label={copied ? 'Copied' : 'Copy link'}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* QR Code */}
        <div
          style={{
            display: 'flex', justifyContent: 'center',
            marginBottom: 24, padding: '20px',
            background: '#F8F9FB', borderRadius: 16,
            border: '1px solid #E5E5E5',
          }}
        >
          <QRCodeSVG
            value={url}
            size={160}
            bgColor="#F8F9FB"
            fgColor="#1A1A1A"
            level="M"
          />
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: '#E5E5E5' }} />
          <span style={{ color: '#AAAAAA', fontSize: 12 }}>Share via</span>
          <div style={{ flex: 1, height: 1, background: '#E5E5E5' }} />
        </div>

        {/* Share buttons */}
        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '11px 16px', borderRadius: 12,
              background: '#25D366', color: '#fff',
              fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.filter = 'brightness(1.08)')}
            onMouseOut={(e) => (e.currentTarget.style.filter = '')}
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
          <a
            href={mailtoHref}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '11px 16px', borderRadius: 12,
              background: '#F8F9FB', color: '#444',
              border: '1.5px solid #E5E5E5',
              fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 200ms ease',
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.color = '#7C3AED' }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.color = '#444' }}
          >
            <Mail size={16} />
            Email
          </a>
        </div>
      </div>
    </div>
  )
}
