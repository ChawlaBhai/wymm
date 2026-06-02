import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { TEMPLATE_META, type TemplateId } from '@/types/biodata'
import { TemplateMockup } from '@/components/landing/TemplateMockup'

const FEATURED_IDS: TemplateId[] = [
  'rose-gold-luxe',
  'zen-minimal',
  'pastel-dreams',
  'heritage-splendor',
  'modern-minimal',
  'mountain-soul',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] } },
}

export default function TemplatesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  function selectTemplate(id: TemplateId) {
    sessionStorage.setItem('selectedTemplate', id)
    sessionStorage.setItem('selected-template-id', id)
    navigate('/create')
  }

  return (
    <section
      id="templates"
      ref={ref}
      style={{ padding: '80px 0', background: '#FFFFFF' }}
    >
      <div className="container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          style={{ textAlign: 'center', marginBottom: 12 }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#7C3AED',
          }}>
            Templates
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08 }}
          style={{
            textAlign: 'center',
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(24px, 3.6vw, 38px)',
            letterSpacing: '-0.02em',
            color: '#1A1A1A',
            marginBottom: 10,
          }}
        >
          Choose from 16 beautiful templates
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.14 }}
          style={{
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#888',
            lineHeight: 1.6,
            maxWidth: 480,
            margin: '0 auto 44px',
          }}
        >
          Every design is fully animated and shareable. Not a PDF — a living profile.
        </motion.p>

        {/* Compact template grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="templates-grid-wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURED_IDS.map((id) => {
            const meta = TEMPLATE_META[id]
            const isDark = DARK_TEMPLATES.includes(id)

            return (
              <motion.div
                key={id}
                variants={cardVariants}
                whileHover={{ y: -4, boxShadow: `0 16px 36px rgba(0,0,0,0.09)`, transition: { duration: 0.2 } }}
                onClick={() => selectTemplate(id)}
                style={{
                  background: isDark ? '#0A0A0A' : 'white',
                  borderRadius: 14,
                  overflow: 'hidden',
                  border: isDark ? '1px solid #333' : '1px solid #E8E8E8',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: 200,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${meta.accent}50` }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = isDark ? '#333' : '#E8E8E8' }}
              >
                {/* Accent top strip */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${meta.accent} 0%, ${meta.accent}99 100%)`, flexShrink: 0 }} />

                {/* Mockup — full bleed, no padding */}
                <div style={{ flex: 1, overflow: 'hidden', borderRadius: '14px 14px 0 0' }}>
                  <TemplateMockup templateId={id} height={140} />
                </div>

                {/* Card footer */}
                <div style={{ padding: '10px 12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 700,
                    fontSize: 13,
                    color: isDark ? '#FFFFFF' : '#1A1A1A',
                    letterSpacing: '-0.01em',
                  }}>
                    {meta.name}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      sessionStorage.setItem('selected-template-id', id)
                      sessionStorage.setItem('selectedTemplate', id)
                      sessionStorage.setItem('demo-mode', 'true')
                      navigate('/create')
                    }}
                    style={{
                      background: 'none',
                      border: `1px solid ${meta.accent}45`,
                      borderRadius: 999,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 10,
                      fontWeight: 700,
                      color: meta.accent,
                      padding: '3px 10px',
                      transition: 'all 150ms ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${meta.accent}12`
                      e.currentTarget.style.borderColor = meta.accent
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'none'
                      e.currentTarget.style.borderColor = `${meta.accent}45`
                    }}
                  >
                    Try demo
                  </button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: 32 }}
        >
          <Link
            to="/templates"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'Inter, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: '#7C3AED',
              textDecoration: 'none',
              padding: '8px 20px',
              border: '1.5px solid #7C3AED30',
              borderRadius: 999,
              transition: 'all 180ms ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = '#7C3AED08'
              el.style.borderColor = '#7C3AED70'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'transparent'
              el.style.borderColor = '#7C3AED30'
            }}
          >
            View all 16 templates →
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 479px) {
          .templates-grid-wrap { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 480px) and (max-width: 899px) {
          .templates-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
