import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    icon: '✨',
    title: 'Animated profiles',
    description: 'Not static PDFs — living, breathing pages that make a real impression.',
    gradientFrom: '#7C3AED',
    gradientTo: '#A855F7',
    accent: '#7C3AED',
  },
  {
    icon: '🔗',
    title: 'Instant sharing',
    description: 'A QR code and shareable link ready the moment you finish. Share via WhatsApp in one tap.',
    gradientFrom: '#EC4899',
    gradientTo: '#F472B6',
    accent: '#EC4899',
  },
  {
    icon: '🖨️',
    title: 'Print-ready PDF',
    description: 'One-click professional export. Pixel-perfect for printing or sending as an attachment.',
    gradientFrom: '#0EA5E9',
    gradientTo: '#38BDF8',
    accent: '#0EA5E9',
  },
  {
    icon: '📱',
    title: 'Mobile first',
    description: 'Designed to look perfect on every screen, from a phone to a desktop monitor.',
    gradientFrom: '#10B981',
    gradientTo: '#34D399',
    accent: '#10B981',
  },
  {
    icon: '🆓',
    title: 'Free forever',
    description: 'No hidden charges, no premium tiers, no subscriptions. Completely free, always.',
    gradientFrom: '#F59E0B',
    gradientTo: '#FCD34D',
    accent: '#F59E0B',
  },
  {
    icon: '🪔',
    title: 'Cultural templates',
    description: 'Designed specifically for Indian families — the right fields, the right feel.',
    gradientFrom: '#F43F5E',
    gradientTo: '#FB7185',
    accent: '#F43F5E',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
}

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: '96px 0', background: '#F8F9FB' as const }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          style={{ textAlign: 'center', marginBottom: 16 }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#10B981',
          }}>
            Why wymm
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
            fontSize: 'clamp(28px, 4vw, 42px)',
            letterSpacing: '-0.02em',
            color: '#1A1A1A',
            marginBottom: 56,
          }}
        >
          What makes wymm different
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="features-grid-wrap"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((feat) => (
            <motion.div
              key={feat.title}
              variants={tileVariants}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(124,58,237,0.12)',
                transition: { duration: 0.22 },
              }}
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '28px 24px',
                border: '1px solid #E5E5E5',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top-left accent dot */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: feat.accent,
                  opacity: 0.2,
                  pointerEvents: 'none',
                }}
              />

              {/* Gradient icon bubble */}
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${feat.gradientFrom} 0%, ${feat.gradientTo} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                marginBottom: 16,
              }}>
                {feat.icon}
              </div>

              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: '-0.02em',
                color: '#1A1A1A',
                marginBottom: 8,
              }}>
                {feat.title}
              </h3>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: '#666',
                lineHeight: 1.65,
              }}>
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 479px) {
          .features-grid-wrap { grid-template-columns: 1fr !important; }
          #about { padding: 48px 0 !important; }
        }
        @media (min-width: 480px) and (max-width: 899px) {
          .features-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 900px) {
          .features-grid-wrap { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
