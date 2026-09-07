import { useRef } from 'react'
import { useTranslation } from '@/lib/i18n'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'We sent Priya\'s wymm biodata to 12 families. Three responded within the same day. The design made us look serious.',
    name: 'Ravi K.',
    city: 'Mumbai',
    initials: 'RK',
    avatarColor: '#7C3AED'},
  {
    quote: 'My biodata always felt like a resume. This finally feels like me.',
    name: 'Ananya S.',
    city: 'Bengaluru',
    initials: 'AS',
    avatarColor: '#EC4899'},
  {
    quote: 'Our son got married 8 months after we shared his wymm profile. The response was unlike anything we expected.',
    name: 'Meera & Suresh P.',
    city: 'Delhi',
    initials: 'MP',
    avatarColor: '#F59E0B'},
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } }}

export default function TestimonialsSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="bg-gray-50 dark:bg-slate-900" style={{ padding: '104px 0' }}
    >
      <div className="container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          style={{ textAlign: 'center', marginBottom: 14 }}
        >
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#EC4899'}}>{t('testimonials.badge')}</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.08 }}
          style={{
            textAlign: 'center',
            fontFamily: 'Sora, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(26px, 4vw, 42px)',
            letterSpacing: '-0.02em',
            marginBottom: 56}}
        >{t('testimonials.title')}</motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24}}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{
                y: -4,
                boxShadow: '0 16px 40px rgba(124,58,237,0.12)',
                transition: { duration: 0.22 }}}
              style={{
                borderRadius: 16,
                padding: '28px 28px 24px',
                
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                position: 'relative',
                overflow: 'hidden',
                // Gradient left border via box-shadow trick
                borderLeft: '3px solid transparent',
                className: "testimonial-card",
                // backgroundImage
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'}}
            >
              {/* Decorative large quote mark */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 16,
                  fontFamily: 'Georgia, serif',
                  fontSize: 72,
                  lineHeight: 1,
                  color: '#7C3AED',
                  opacity: 0.08,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  zIndex: 0}}
              >
                ❝
              </div>

              {/* Stars */}
              <div style={{ color: '#F59E0B', fontSize: 14, letterSpacing: 1, position: 'relative', zIndex: 1 }}>
                ★★★★★
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                lineHeight: 1.75,
                flex: 1,
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 1}}>
                "{t.quote}"
              </p>

              {/* Attribution with avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
                {/* Initials avatar */}
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `${t.avatarColor}18`,
                  border: `2px solid ${t.avatarColor}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  color: t.avatarColor,
                  flexShrink: 0}}>
                  {t.initials}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 2}}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    color: '#AAA'}}>
                    {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Illustrative disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            fontSize: 11,
            color: '#BBBBBB',
            marginTop: 28,
            letterSpacing: '0.04em'}}
        >{t('testimonials.subtitle')}</motion.p>
      </div>
    </section>
  )
}
