import { useRef } from 'react'
import { useTranslation } from '@/lib/i18n'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

export default function CTABannerSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{ padding: '104px 0', background: 'white' }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          style={{
            borderRadius: 28,
            padding: 'clamp(52px, 8vw, 88px) clamp(32px, 6vw, 80px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            background: 'white',
            border: '1px solid rgba(124,58,237,0.10)',
          }}
        >
          {/* Animated aurora blobs */}
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.18, 0.12] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-30%',
              left: '-10%',
              width: '55%',
              height: '180%',
              background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.1, 1], opacity: [0.10, 0.16, 0.10] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            style={{
              position: 'absolute',
              bottom: '-25%',
              right: '-8%',
              width: '50%',
              height: '160%',
              background: 'radial-gradient(ellipse, rgba(236,72,153,0.20) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          <motion.div
            aria-hidden="true"
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.14, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            style={{
              position: 'absolute',
              top: '10%',
              left: '35%',
              width: '40%',
              height: '120%',
              background: 'radial-gradient(ellipse, rgba(168,85,247,0.18) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Decorative ring — large centered circle */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              height: 400,
              borderRadius: '50%',
              border: '1px solid rgba(124,58,237,0.20)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Floating icons */}
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
            style={{
              position: 'absolute',
              top: '18%',
              left: '8%',
              fontSize: 24,
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0.6,
            }}
          >
            💕
          </motion.div>
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            style={{
              position: 'absolute',
              bottom: '22%',
              right: '10%',
              fontSize: 22,
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0.6,
            }}
          >
            💍
          </motion.div>
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
            style={{
              position: 'absolute',
              top: '25%',
              right: '7%',
              fontSize: 20,
              pointerEvents: 'none',
              zIndex: 1,
              opacity: 0.5,
            }}
          >
            ✨
          </motion.div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4.5vw, 52px)',
                letterSpacing: '-0.03em',
                marginBottom: 18,
                lineHeight: 1.1,
              }}
            >
              {t('cta.title1')}{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t('cta.title2')}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(15px, 1.8vw, 18px)',
                color: 'var(--tw-prose-body)',
                lineHeight: 1.65,
                maxWidth: 420,
                margin: '0 auto 36px',
              }}
            >
              {t('cta.desc')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.45 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}
            >
              <Link
                to="/create"
                className="btn-primary"
                style={{ fontSize: 16, padding: '15px 44px' }}
              >
                {t('cta.btn')}
              </Link>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                color: 'var(--tw-prose-counters)',
                fontWeight: 500,
              }}>
                {t('cta.trust')}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
