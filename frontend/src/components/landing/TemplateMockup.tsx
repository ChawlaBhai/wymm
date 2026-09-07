import type { TemplateId } from '@/types/biodata'

interface Props {
  templateId: TemplateId
  width?: number
  height?: number
}

const CONFIGS: Record<TemplateId, {
  bg: string
  heroBg: string
  heroH: string // percentage
  accent: string
  accentBg: string
  dark: boolean
  nameFill: string
  extraEl?: 'wave' | 'glass' | 'stars' | 'leaf' | 'corner-brackets' | 'shimmer' | 'vintage-border' | 'zen-line' | 'pastel-blobs' | 'saffron-strip'
}> = {
  'modern-minimal':       { bg: '#FFFFFF', heroBg: '#FFFFFF', heroH: '0%', accent: '#7C3AED', accentBg: '#F0EBFF', dark: false, nameFill: '#1A1A1A' },
  'refined-elegance':     { bg: '#FFFFFF', heroBg: 'linear-gradient(135deg, rgba(232,223,245,0.5) 0%, rgba(252,232,235,0.4) 100%)', heroH: '45%', accent: '#EC4899', accentBg: '#FDE8F3', dark: false, nameFill: '#1A1A1A' },
  'professional-premium': { bg: '#FFFFFF', heroBg: '#0F172A', heroH: '50%', accent: '#0EA5E9', accentBg: '#E0F2FE', dark: false, nameFill: '#FFFFFF' },
  'cultural-grace':       { bg: '#FFFDF5', heroBg: 'linear-gradient(160deg, rgba(245,158,11,0.12) 0%, rgba(252,232,235,0.1) 100%)', heroH: '48%', accent: '#F59E0B', accentBg: '#FEF3C7', dark: false, nameFill: '#1A1A1A', extraEl: 'saffron-strip' },
  'the-modernist':        { bg: '#0A0A0A', heroBg: '#0A0A0A', heroH: '100%', accent: '#7C3AED', accentBg: '#1A1A1A', dark: true, nameFill: '#FFFFFF', extraEl: 'stars' },
  'mountain-soul':        { bg: '#FAFAF8', heroBg: '#1C2B1E', heroH: '50%', accent: '#3D6B47', accentBg: '#E8F5E9', dark: false, nameFill: '#FFFFFF', extraEl: 'wave' },
  'vintage-warmth':       { bg: '#FDF8F2', heroBg: '#FDF8F2', heroH: '0%', accent: '#8B4513', accentBg: '#F5E6D3', dark: false, nameFill: '#2D1B0E', extraEl: 'vintage-border' },
  'aurora-glass':         { bg: '#FFFFFF', heroBg: 'linear-gradient(135deg, rgba(232,223,245,0.4) 0%, rgba(252,232,235,0.3) 50%, rgba(229,240,232,0.3) 100%)', heroH: '100%', accent: '#7C3AED', accentBg: 'rgba(255,255,255,0.7)', dark: false, nameFill: '#1A1A1A', extraEl: 'glass' },
  'ocean-breeze':         { bg: '#FDFAF3', heroBg: '#FDFAF3', heroH: '0%', accent: '#FF6B6B', accentBg: '#E0FFFE', dark: false, nameFill: '#1A1A1A', extraEl: 'wave' },
  'royal-majestic':       { bg: '#FEF9EC', heroBg: '#3B0764', heroH: '52%', accent: '#D4AF37', accentBg: '#FEF9EC', dark: false, nameFill: '#D4AF37', extraEl: 'corner-brackets' },
  'botanical-fresh':      { bg: '#FFFFFF', heroBg: '#FFFFFF', heroH: '0%', accent: '#2D6A4F', accentBg: '#E8F5E9', dark: false, nameFill: '#1A1A1A', extraEl: 'leaf' },
  'celestial-night':      { bg: '#0B0D21', heroBg: '#0B0D21', heroH: '100%', accent: '#6B7FD7', accentBg: '#0B0D21', dark: true, nameFill: '#FFFFFF', extraEl: 'stars' },
  'rose-gold-luxe':       { bg: '#FFF0F3', heroBg: '#FFF0F3', heroH: '0%', accent: '#D4AF37', accentBg: '#FFF0F3', dark: false, nameFill: '#8B2252', extraEl: 'shimmer' },
  'zen-minimal':          { bg: '#FAFAFA', heroBg: '#FAFAFA', heroH: '0%', accent: '#1A1A1A', accentBg: '#FAFAFA', dark: false, nameFill: '#1A1A1A', extraEl: 'zen-line' },
  'pastel-dreams':        { bg: '#FFFFFF', heroBg: '#FFFFFF', heroH: '0%', accent: '#9C27B0', accentBg: '#EDE7F6', dark: false, nameFill: '#9C27B0', extraEl: 'pastel-blobs' },
  'heritage-splendor':    { bg: '#FFFFF0', heroBg: '#8B0000', heroH: '52%', accent: '#FF8C00', accentBg: '#FFFFF0', dark: false, nameFill: '#FF8C00', extraEl: 'corner-brackets' }}

export function TemplateMockup({ templateId, width = 220, height = 200 }: Props) {
  const cfg = CONFIGS[templateId] || CONFIGS['modern-minimal']
  const heroH = parseFloat(cfg.heroH)
  const contentY = heroH > 0 ? heroH : 0

  return (
    <div style={{ width: '100%', height, background: cfg.bg, overflow: 'hidden', position: 'relative', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero band */}
      {heroH > 0 && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: `${heroH}%`,
          background: cfg.heroBg}} />
      )}

      {/* Full-bg for dark templates */}
      {cfg.heroBg !== '#FFFFFF' && heroH === 0 && (
        <div style={{ position: 'absolute', inset: 0, background: cfg.heroBg }} />
      )}

      {/* Extra elements */}
      {cfg.extraEl === 'wave' && (
        <svg style={{ position: 'absolute', bottom: `${100 - heroH - 2}%`, left: 0, right: 0, width: '100%' }} height="14" viewBox="0 0 220 14" preserveAspectRatio="none">
          <path d={`M0,14 C55,0 165,0 220,14 L220,14 L0,14 Z`} fill={cfg.bg} />
        </svg>
      )}

      {cfg.extraEl === 'stars' && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {[{x:'15%',y:'12%'},{x:'72%',y:'8%'},{x:'88%',y:'25%'},{x:'33%',y:'18%'},{x:'55%',y:'35%'},{x:'20%',y:'45%'}].map((s, i) => (
            <div key={i} style={{ position: 'absolute', left: s.x, top: s.y, width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }} />
          ))}
        </div>
      )}

      {cfg.extraEl === 'corner-brackets' && heroH > 0 && (
        <>
          <div style={{ position: 'absolute', top: 6, left: 6, width: 10, height: 10, borderTop: `1.5px solid ${cfg.accent}`, borderLeft: `1.5px solid ${cfg.accent}`, opacity: 0.7 }} />
          <div style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderTop: `1.5px solid ${cfg.accent}`, borderRight: `1.5px solid ${cfg.accent}`, opacity: 0.7 }} />
        </>
      )}

      {cfg.extraEl === 'saffron-strip' && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${cfg.accent}, #EC4899, ${cfg.accent})` }} />
      )}

      {cfg.extraEl === 'vintage-border' && (
        <div style={{ position: 'absolute', inset: 4, border: `1px solid ${cfg.accent}`, opacity: 0.3, pointerEvents: 'none', borderRadius: 2 }}>
          <div style={{ position: 'absolute', inset: 2, border: `0.5px solid ${cfg.accent}`, opacity: 0.5, borderRadius: 1 }} />
        </div>
      )}

      {cfg.extraEl === 'shimmer' && (
        <div style={{ position: 'absolute', top: 8, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)' }} />
      )}

      {cfg.extraEl === 'pastel-blobs' && (
        <>
          <div style={{ position: 'absolute', top: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(237,231,246,0.6)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -10, right: -20, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,224,178,0.5)', pointerEvents: 'none' }} />
        </>
      )}

      {cfg.extraEl === 'glass' && (
        <div style={{ position: 'absolute', top: '20%', left: '8%', right: '8%', bottom: '8%', background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.4)', boxShadow: '0 4px 16px rgba(124,58,237,0.08)' }} />
      )}

      {/* Content layer */}
      <div style={{ position: 'absolute', top: `${contentY}%`, left: 0, right: 0, padding: '0 14px', paddingTop: heroH > 0 ? 10 : 20 }}>

        {/* Profile circle */}
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: cfg.dark ? '#333' : cfg.accentBg,
          border: `2px solid ${cfg.accent}`,
          margin: heroH > 50 ? '0 auto 8px' : '0 0 8px',
          display: heroH > 50 ? 'block' : 'flex',
          overflow: 'hidden'}}>
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${cfg.accent}40, ${cfg.accent}20)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: cfg.accent, fontFamily: 'Sora, sans-serif' }}>P</span>
          </div>
        </div>

        {/* Name */}
        {cfg.extraEl === 'zen-minimal' ? (
          <div style={{ fontSize: 13, fontWeight: 200, letterSpacing: '0.08em', color: cfg.nameFill, marginBottom: 6, fontFamily: 'Sora, sans-serif' }}>Priya Sharma</div>
        ) : (
          <div style={{ fontSize: 10, fontWeight: 700, color: cfg.nameFill, marginBottom: 5, fontFamily: 'Sora, sans-serif', letterSpacing: heroH > 50 ? '-0.02em' : 0 }}>Priya Sharma</div>
        )}

        {/* Info lines */}
        {cfg.extraEl !== 'zen-minimal' && [
          { w: '70%', color: cfg.dark ? 'rgba(255,255,255,0.25)' : `${cfg.accent}50` },
          { w: '55%', color: cfg.dark ? 'rgba(255,255,255,0.15)' : '#E0E0E0' },
          { w: '80%', color: cfg.dark ? 'rgba(255,255,255,0.15)' : '#E0E0E0' },
          { w: '60%', color: cfg.dark ? 'rgba(255,255,255,0.12)' : '#EBEBEB' },
        ].map((line, i) => (
          <div key={i} style={{ height: 4, background: line.color, borderRadius: 2, width: line.w, marginBottom: 5 }} />
        ))}

        {cfg.extraEl === 'zen-minimal' && (
          <div style={{ width: '40%', height: 1, background: '#1A1A1A', margin: '8px 0' }} />
        )}

        {/* Accent bottom strip */}
        <div style={{ height: 3, background: cfg.accent, borderRadius: 2, width: '30%', marginTop: 4, opacity: 0.6 }} />
      </div>
    </div>
  )
}

export default TemplateMockup
