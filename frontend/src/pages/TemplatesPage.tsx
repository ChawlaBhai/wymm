import { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { TEMPLATE_META, type TemplateId } from '@/types/biodata'

const TEMPLATE_CATEGORIES: Record<TemplateId, string> = {
  'modern-minimal': 'Minimal',
  'refined-elegance': 'Elegant',
  'professional-premium': 'Premium',
  'cultural-grace': 'Cultural',
  'the-modernist': 'Dark',
  'mountain-soul': 'Nature',
  'vintage-warmth': 'Warm',
  'aurora-glass': 'Glass',
  'ocean-breeze': 'Nature',
  'royal-majestic': 'Premium',
  'botanical-fresh': 'Nature',
  'celestial-night': 'Dark',
  'rose-gold-luxe': 'Elegant',
  'zen-minimal': 'Minimal',
  'pastel-dreams': 'Soft',
  'heritage-splendor': 'Cultural',
}

const CATEGORY_FILTERS = ['All', 'Light', 'Dark', 'Cultural', 'Nature', 'Minimal', 'Elegant', 'Premium', 'Warm', 'Glass', 'Soft']

const FILTER_MAP: Record<string, string[]> = {
  All: [],
  Light: ['Minimal', 'Elegant', 'Premium', 'Warm', 'Glass', 'Soft', 'Nature', 'Cultural'],
  Dark: ['Dark'],
  Cultural: ['Cultural'],
  Nature: ['Nature'],
  Minimal: ['Minimal'],
  Elegant: ['Elegant'],
  Premium: ['Premium'],
  Warm: ['Warm'],
  Glass: ['Glass'],
  Soft: ['Soft'],
}

const DARK_TEMPLATES: TemplateId[] = ['the-modernist', 'celestial-night']
const TEMPLATE_IDS = Object.keys(TEMPLATE_META) as TemplateId[]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
}
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

function TemplateMockupPreview({ id, accent }: { id: TemplateId; accent: string }) {
  const isDark = DARK_TEMPLATES.includes(id)
  const bg = isDark ? '#0A0A0A' : '#FAFAFA'
  const textColor = isDark ? '#FFFFFF' : '#1A1A1A'
  const subColor = isDark ? '#333' : '#E5E5E5'

  return (
    <div style={{
      background: bg,
      borderRadius: 8,
      padding: '10px 10px 8px',
      flex: 1,
      border: `1px solid ${isDark ? '#2A2A2A' : '#F0F0F0'}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
    }}>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}90)`, borderRadius: 999, marginBottom: 2 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: `${accent}22`, border: `1.5px solid ${accent}45`, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 4, background: textColor, borderRadius: 3, width: '55%', marginBottom: 3, opacity: isDark ? 0.9 : 0.8 }} />
          <div style={{ height: 3, background: `${accent}65`, borderRadius: 2, width: '32%' }} />
        </div>
      </div>
      {[['30%', '50%'], ['38%', '60%'], ['26%', '42%']].map(([lw, vw], i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ height: 3, background: `${accent}55`, borderRadius: 2, width: lw, flexShrink: 0 }} />
          <div style={{ height: 3, background: subColor, borderRadius: 2, width: vw }} />
        </div>
      ))}
    </div>
  )
}

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  Minimal: { bg: '#F3F4F6', color: '#374151' },
  Elegant: { bg: '#FDF2F8', color: '#9D174D' },
  Premium: { bg: '#FFFBEB', color: '#92400E' },
  Cultural: { bg: '#FFF7ED', color: '#C2410C' },
  Dark: { bg: '#1F2937', color: '#9CA3AF' },
  Nature: { bg: '#F0FDF4', color: '#166534' },
  Warm: { bg: '#FFF8F1', color: '#92400E' },
  Glass: { bg: '#EEF2FF', color: '#3730A3' },
  Soft: { bg: '#F5F3FF', color: '#6D28D9' },
}

function CategoryBadge({ category }: { category: string }) {
  const style = BADGE_STYLES[category] || { bg: '#F3F4F6', color: '#374151' }
  return (
    <span style={{
      padding: '2px 8px',
      background: style.bg,
      color: style.color,
      borderRadius: 999,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.07em',
      textTransform: 'uppercase' as const,
      fontFamily: 'Inter, sans-serif',
      flexShrink: 0,
    }}>
      {category}
    </span>
  )
}

export default function TemplatesPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  const filteredTemplates = TEMPLATE_IDS.filter(id => {
    if (activeFilter === 'All') return true
    const allowed = FILTER_MAP[activeFilter]
    if (!allowed || allowed.length === 0) return true
    return allowed.includes(TEMPLATE_CATEGORIES[id])
  })

  function useTemplate(id: TemplateId) {
    sessionStorage.setItem('selected-template-id', id)
    sessionStorage.setItem('selectedTemplate', id)
    navigate('/create')
  }

  function previewTemplate(id: TemplateId) {
    sessionStorage.setItem('selected-template-id', id)
    sessionStorage.setItem('selectedTemplate', id)
    sessionStorage.setItem('demo-mode', 'true')
    navigate('/create')
  }

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* PAGE HEADER */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '60px 6vw 36px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Link to="/" style={{ fontSize: 13, color: '#AAAAAA', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#DDDDDD', fontSize: 13 }}>/</span>
            <span style={{ fontSize: 13, color: '#1A1A1A' }}>Templates</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#1A1A1A',
              marginBottom: 12,
              lineHeight: 1.1,
            }}
          >
            All Templates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
            style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', color: '#777777', lineHeight: 1.6, maxWidth: 480 }}
          >
            16 carefully crafted designs. One for every personality.
          </motion.p>
        </div>
      </div>

      {/* FILTER TABS — sticky */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #F0F0F0', padding: '0 6vw', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 0 #F0F0F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}
            style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', padding: '12px 0' }}
          >
            {CATEGORY_FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '6px 15px',
                  borderRadius: 999,
                  border: activeFilter === filter ? '1.5px solid #7C3AED' : '1.5px solid #E5E5E5',
                  background: activeFilter === filter ? '#7C3AED' : 'white',
                  color: activeFilter === filter ? 'white' : '#666666',
                  fontSize: 12,
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap' as const,
                  transition: 'all 150ms ease',
                  flexShrink: 0,
                }}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* TEMPLATE GRID */}
      <div style={{ padding: '36px 6vw 80px', background: '#FAFAFA' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} ref={gridRef}>
          {filteredTemplates.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#AAAAAA' }}>
              <p style={{ fontSize: 15 }}>No templates found for this filter.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="tpl-page-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}
            >
              {filteredTemplates.map((id) => {
                const meta = TEMPLATE_META[id]
                const category = TEMPLATE_CATEGORIES[id]
                const isDark = DARK_TEMPLATES.includes(id)

                return (
                  <motion.div
                    key={id}
                    variants={cardVariants}
                    whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.10)', transition: { duration: 0.2 } }}
                    style={{
                      background: isDark ? '#0A0A0A' : 'white',
                      borderRadius: 16,
                      overflow: 'hidden',
                      border: isDark ? '1px solid #2A2A2A' : '1px solid #EBEBEB',
                      display: 'flex',
                      flexDirection: 'column',
                      height: 280,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'border-color 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${meta.accent}55` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = isDark ? '#2A2A2A' : '#EBEBEB' }}
                  >
                    {/* Top color strip */}
                    <div style={{ height: 8, background: `linear-gradient(90deg, ${meta.accent} 0%, ${meta.accent}AA 100%)`, flexShrink: 0 }} />

                    {/* Mockup */}
                    <div style={{ padding: '12px 14px 0', flex: 1, display: 'flex' }}>
                      <TemplateMockupPreview id={id} accent={meta.accent} />
                    </div>

                    {/* Footer */}
                    <div style={{ padding: '11px 14px 14px', flexShrink: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                        <span style={{
                          fontFamily: 'Sora, sans-serif',
                          fontWeight: 700,
                          fontSize: 13,
                          color: isDark ? '#FFFFFF' : '#1A1A1A',
                          letterSpacing: '-0.01em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap' as const,
                          flex: 1,
                        }}>
                          {meta.name}
                        </span>
                        <CategoryBadge category={category} />
                      </div>
                      <p style={{
                        fontSize: 11,
                        color: isDark ? '#666' : '#BBBBBB',
                        fontStyle: 'italic',
                        marginBottom: 10,
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: 1.4,
                        whiteSpace: 'nowrap' as const,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {meta.tagline}
                      </p>
                      <div style={{ display: 'flex', gap: 7 }}>
                        <button
                          onClick={() => useTemplate(id)}
                          style={{
                            flex: 1,
                            padding: '6px 10px',
                            background: meta.accent,
                            color: 'white',
                            border: 'none',
                            borderRadius: 7,
                            fontSize: 11,
                            fontWeight: 700,
                            fontFamily: 'Inter, sans-serif',
                            cursor: 'pointer',
                            transition: 'opacity 150ms ease',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.82' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                        >
                          Use this template
                        </button>
                        <button
                          onClick={() => previewTemplate(id)}
                          style={{
                            flex: 1,
                            padding: '6px 10px',
                            background: 'none',
                            color: meta.accent,
                            border: `1.5px solid ${meta.accent}45`,
                            borderRadius: 7,
                            fontSize: 11,
                            fontWeight: 700,
                            fontFamily: 'Inter, sans-serif',
                            cursor: 'pointer',
                            transition: 'all 150ms ease',
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLButtonElement
                            el.style.background = `${meta.accent}12`
                            el.style.borderColor = meta.accent
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLButtonElement
                            el.style.background = 'none'
                            el.style.borderColor = `${meta.accent}45`
                          }}
                        >
                          Preview demo
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          <p style={{ textAlign: 'center', marginTop: 36, fontSize: 12, color: '#CCCCCC', fontFamily: 'Inter, sans-serif' }}>
            Showing {filteredTemplates.length} of 16 templates
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 479px) { .tpl-page-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 480px) and (max-width: 767px) { .tpl-page-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  )
}
