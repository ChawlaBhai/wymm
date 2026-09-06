import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useTranslation } from '@/lib/i18n'

// Particle configuration
const PARTICLES = [
  { size: 40, color: '#7C3AED', top: '15%', left: '8%', duration: 10, dx: 30, dy: 20 },
  { size: 30, color: '#EC4899', top: '25%', left: '85%', duration: 13, dx: -20, dy: 30 },
  { size: 50, color: '#A855F7', top: '60%', left: '5%', duration: 15, dx: 25, dy: -25 },
  { size: 35, color: '#F472B6', top: '70%', left: '90%', duration: 9, dx: -30, dy: -20 },
  { size: 45, color: '#7C3AED', top: '80%', left: '20%', duration: 12, dx: 20, dy: -30 },
  { size: 28, color: '#EC4899', top: '10%', left: '55%', duration: 11, dx: -25, dy: 25 },
  { size: 38, color: '#C084FC', top: '45%', left: '92%', duration: 14, dx: -20, dy: 20 },
  { size: 32, color: '#F9A8D4', top: '35%', left: '2%', duration: 8, dx: 30, dy: -15 },
  { size: 42, color: '#8B5CF6', top: '90%', left: '70%', duration: 16, dx: -15, dy: -25 },
]

function BiodataMockup() {
  return (
    <div style={{
      width: '100%',
      maxWidth: 360,
      background: 'white',
      borderRadius: 20,
      boxShadow: '0 32px 80px rgba(124,58,237,0.14), 0 8px 24px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      border: '1px solid rgba(124,58,237,0.10)',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Gradient header bar */}
      <div style={{ height: 7, background: 'linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)' }} />

      {/* Top header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(232,223,245,0.5) 0%, rgba(252,232,235,0.4) 100%)',
        padding: '24px 24px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        borderBottom: '1px solid rgba(124,58,237,0.08)',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'linear-gradient(135deg, #E8DFF5 0%, #FCE8EB 100%)',
          border: '3px solid white',
          boxShadow: '0 4px 12px rgba(124,58,237,0.15)',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
        }}>🌸</div>
        <div style={{ flex: 1 }}>
          <div style={{ height: 11, background: '#1A1A1A', borderRadius: 6, width: '68%', marginBottom: 8 }} />
          <div style={{ height: 7, background: 'rgba(124,58,237,0.3)', borderRadius: 4, width: '45%', marginBottom: 6 }} />
          <div style={{ height: 6, background: '#E5E5E5', borderRadius: 4, width: '38%' }} />
        </div>
      </div>

      {/* Details body */}
      <div style={{ padding: '18px 24px' }}>
        <div style={{ height: 5, background: 'rgba(124,58,237,0.2)', borderRadius: 3, width: 48, marginBottom: 12 }} />
        {[{ labelW: '30%', valueW: '52%' }, { labelW: '38%', valueW: '60%' }, { labelW: '26%', valueW: '44%' }].map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ height: 5, background: 'rgba(124,58,237,0.35)', borderRadius: 3, width: row.labelW, flexShrink: 0 }} />
            <div style={{ height: 7, background: '#F0F0F0', borderRadius: 4, width: row.valueW }} />
          </div>
        ))}
        <div style={{ height: 1, background: '#F4F4F4', margin: '14px 0' }} />
        <div style={{ height: 5, background: 'rgba(236,72,153,0.2)', borderRadius: 3, width: 52, marginBottom: 12 }} />
        {[{ labelW: '34%', valueW: '55%' }, { labelW: '28%', valueW: '48%' }].map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ height: 5, background: 'rgba(236,72,153,0.3)', borderRadius: 3, width: row.labelW, flexShrink: 0 }} />
            <div style={{ height: 7, background: '#F0F0F0', borderRadius: 4, width: row.valueW }} />
          </div>
        ))}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <div style={{ flex: 2, height: 32, borderRadius: 99, background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)', opacity: 0.9 }} />
          <div style={{ flex: 1, height: 32, borderRadius: 99, background: '#F5F5F5', border: '1px solid #E5E5E5' }} />
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const { t } = useTranslation()
  const mockupRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const rotateY = useSpring(mouseX, { stiffness: 80, damping: 20 })

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const el = mockupRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      mouseX.set(dx * 10)
      mouseY.set(-dy * 10)
    }
    function onMouseLeave() {
      mouseX.set(0)
      mouseY.set(0)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <section
      className="bg-white dark:bg-slate-900 transition-colors duration-300"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 80,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative gradient strip at top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #7C3AED 0%, #EC4899 50%, #6B7F6E 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />
      {/* Aurora animated background */}
      <motion.div
        aria-hidden="true"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(124,58,237,0.07) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 50% at 80% 70%, rgba(236,72,153,0.06) 0%, transparent 60%)',
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,85,247,0.04) 0%, transparent 60%)',
          ].join(', '),
          backgroundSize: '200% 200%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floating particle dots */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className={i >= 4 ? 'hero-particle-hide' : ''}
          animate={{
            x: [0, p.dx, 0, -p.dx, 0],
            y: [0, p.dy, 0, -p.dy, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            filter: 'blur(20px)',
            opacity: 0.15,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-inner-flex" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 72,
          flexWrap: 'wrap',
        }}>
          {/* Left: Copy */}
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{ marginBottom: 32 }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '7px 16px',
                background: 'rgba(124,58,237,0.07)',
                border: '1px solid rgba(124,58,237,0.14)',
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 600,
                color: '#7C3AED',
                fontFamily: 'inherit',
                letterSpacing: '-0.01em',
              }}>
                ✦ Trusted by families across India
              </span>
            </motion.div>

            {/* H1 with word stagger */}
            <h1 className="hero-h1 text-gray-900 dark:text-white" style={{
              fontSize: 'clamp(38px, 5.5vw, 68px)',
              fontFamily: 'inherit',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: 28,
            }}>
              {/* Line 1 */}
              <div style={{ display: 'block' }}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{ display: 'inline-block', marginRight: '0.28em' }}
                >
                  {t('landing.title1')}
                </motion.span>
              </div>
              {/* Line 2 */}
              <div style={{ display: 'block' }}>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.50, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {t('landing.title2')}
                </motion.span>
              </div>
            </h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.60, duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="text-gray-600 dark:text-gray-300"
              style={{
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                fontFamily: 'inherit',
                fontWeight: 400,
                lineHeight: 1.7,
                maxWidth: 500,
                marginBottom: 40,
              }}
            >
              {t('landing.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="hero-cta-wrap"
              style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}
            >
              <Link to="/create" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
                {t('landing.cta')} →
              </Link>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="dark:border-slate-700 dark:text-gray-300 dark:hover:border-purple-500 dark:hover:text-purple-400"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '13px 24px',
                  borderRadius: 99,
                  fontSize: 15,
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  color: '#555',
                  background: 'transparent',
                  border: '1.5px solid #E0E0E0',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  letterSpacing: '-0.01em',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = '#7C3AED'
                  el.style.color = '#7C3AED'
                  el.style.background = 'rgba(124,58,237,0.04)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = ''
                  el.style.color = ''
                  el.style.background = 'transparent'
                }}
              >
                {t('nav.howItWorks')}
              </a>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.88, duration: 0.4 }}
              style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
              {[t('hero.signal1'), t('hero.signal2'), t('hero.signal3')].map((signal, i) => (
                <span key={signal} style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'inherit',
                    fontSize: 13,
                    color: 'var(--tw-prose-counters, #888)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}>
                    {signal}
                  </span>
                  {i < 2 && (
                    <span style={{ margin: '0 10px', color: '#D0D0D0', fontSize: 12 }}>·</span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Mockup with parallax tilt */}
          <motion.div
            ref={mockupRef}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
            style={{
              flex: '0 1 400px',
              display: 'flex',
              justifyContent: 'center',
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 800,
              position: 'relative',
            }}
          >
            {/* Floating heart — top right */}
            <motion.div
              aria-hidden="true"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
              style={{
                position: 'absolute',
                top: -16,
                right: -20,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#EC4899" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>

            {/* Floating sparkle — bottom left */}
            <motion.div
              aria-hidden="true"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
              style={{
                position: 'absolute',
                bottom: 40,
                left: -24,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#7C3AED" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z"/>
              </svg>
            </motion.div>

            {/* Floating ring — middle right */}
            <motion.div
              aria-hidden="true"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              style={{
                position: 'absolute',
                top: '45%',
                right: -28,
                pointerEvents: 'none',
                zIndex: 2,
                fontSize: 22,
                lineHeight: 1,
              }}
            >
              💍
            </motion.div>
            <div style={{ width: '100%', maxWidth: 420 }}>
              {/* Screen bezel */}
              <div style={{
                background: '#1C1C1E',
                borderRadius: '14px 14px 0 0',
                padding: '12px 12px 0',
                boxShadow: '0 0 0 1px #333',
              }}>
                {/* Top bar with dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10, paddingLeft: 4 }}>
                  {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                {/* Floating screen */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: 'var(--tw-prose-body, #F8F9FB)',
                    borderRadius: '6px 6px 0 0',
                    padding: '16px 14px',
                    minHeight: 300,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  <BiodataMockup />
                </motion.div>
              </div>
              {/* Laptop base */}
              <div style={{
                height: 14,
                background: 'linear-gradient(180deg, #2A2A2C 0%, #1A1A1C 100%)',
                borderRadius: '0 0 4px 4px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }} />
              <div style={{
                height: 6,
                background: '#111',
                borderRadius: '0 0 8px 8px',
                width: '80%',
                margin: '0 auto',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 767px) {
          .hero-inner-flex { flex-direction: column !important; gap: 40px !important; }
          .hero-inner-flex > div:first-child { flex: 1 1 auto !important; width: 100% !important; }
          .hero-inner-flex > div:last-child { flex: 0 1 auto !important; width: 100% !important; max-width: 340px !important; margin: 0 auto !important; }
          .hero-h1 { font-size: clamp(32px, 10vw, 52px) !important; }
          .hero-cta-wrap { flex-direction: column !important; align-items: stretch !important; }
          .hero-cta-wrap > * { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; text-align: center !important; }
          .hero-particle-hide { display: none !important; }
        }
      `}</style>
    </section>
  )
}
