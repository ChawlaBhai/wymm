import { useRef } from 'react'
import { useTranslation } from '@/lib/i18n'
import { motion, useInView } from 'framer-motion'

function BadBiodata() {
  return (
    <div style={{
      background: '#F5F5F5',
      border: '1px solid #CCCCCC',
      borderRadius: 6,
      overflow: 'hidden',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: 10,
      padding: 12,
      height: 240,
      position: 'relative'}}>
      {/* Red ✗ badge top-right */}
      <div style={{
        position: 'absolute',
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: '#EF4444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 11,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1,
        zIndex: 1}}>
        ✗
      </div>

      {/* Ugly centered title */}
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div style={{ height: 10, background: '#1A1A1A', width: '60%', margin: '0 auto 4px', borderRadius: 1 }} />
        <div style={{ height: 7, background: '#444', width: '40%', margin: '0 auto', borderRadius: 1 }} />
      </div>

      {/* Horizontal rule */}
      <div style={{ borderTop: '2px double #999', margin: '8px 0' }} />

      {/* Ugly table layout */}
      {[
        { lw: '38%', vw: '55%' },
        { lw: '42%', vw: '50%' },
        { lw: '35%', vw: '58%' },
        { lw: '40%', vw: '52%' },
        { lw: '36%', vw: '60%' },
        { lw: '44%', vw: '48%' },
      ].map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, paddingLeft: 4 }}>
          <div style={{ height: 6, background: '#666', borderRadius: 1, width: row.lw, flexShrink: 0 }} />
          <div style={{ height: 6, background: '#333', borderRadius: 1, width: row.vw }} />
        </div>
      ))}

      {/* Another horizontal rule */}
      <div style={{ borderTop: '1px solid #CCC', margin: '8px 0' }} />

      {/* More rows, misaligned */}
      {[
        { lw: '30%', vw: '62%' },
        { lw: '48%', vw: '44%' },
        { lw: '38%', vw: '54%' },
      ].map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, paddingLeft: 4 }}>
          <div style={{ height: 6, background: '#666', borderRadius: 1, width: row.lw, flexShrink: 0 }} />
          <div style={{ height: 6, background: '#333', borderRadius: 1, width: row.vw }} />
        </div>
      ))}
    </div>
  )
}

function GoodBiodata() {
  return (
    <div style={{
      background: 'white',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(124,58,237,0.15), 0 2px 8px rgba(0,0,0,0.06)',
      border: '1px solid rgba(124,58,237,0.10)',
      height: 240,
      position: 'relative'}}>
      {/* Green ✓ badge top-right */}
      <div style={{
        position: 'absolute',
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: '50%',
        background: '#10B981',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 11,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1,
        zIndex: 1}}>
        ✓
      </div>

      {/* Purple gradient header strip */}
      <div style={{ height: 5, background: 'linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)' }} />

      {/* Profile header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(232,223,245,0.4) 0%, rgba(252,232,235,0.3) 100%)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12}}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E8DFF5, #FCE8EB)',
          border: '2px solid white',
          boxShadow: '0 2px 8px rgba(124,58,237,0.12)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Sora, sans-serif',
          fontSize: 18}}>
          🌸
        </div>
        <div>
          <div style={{ height: 8, background: '#1A1A1A', borderRadius: 4, width: 80, marginBottom: 5, fontFamily: 'Sora, sans-serif' }} />
          <div style={{ height: 5, background: 'rgba(124,58,237,0.35)', borderRadius: 3, width: 56, marginBottom: 4 }} />
          <div style={{ height: 5, background: '#E5E5E5', borderRadius: 3, width: 44 }} />
        </div>
      </div>

      {/* Info rows */}
      <div style={{ padding: '12px 16px' }}>
        {[
          { labelW: '28%', valueW: '50%', accent: '#7C3AED' },
          { labelW: '36%', valueW: '58%', accent: '#7C3AED' },
          { labelW: '30%', valueW: '46%', accent: '#EC4899' },
          { labelW: '34%', valueW: '52%', accent: '#EC4899' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ height: 4, background: `${row.accent}55`, borderRadius: 3, width: row.labelW, flexShrink: 0 }} />
            <div style={{ height: 6, background: '#F0F0F0', borderRadius: 3, width: row.valueW }} />
          </div>
        ))}
        {/* CTA */}
        <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
          <div style={{ flex: 2, height: 22, borderRadius: 99, background: 'linear-gradient(135deg, #7C3AED, #A855F7)', opacity: 0.85 }} />
          <div style={{ flex: 1, height: 22, borderRadius: 99, background: '#F5F5F5', border: '1px solid #E5E5E5' }} />
        </div>
      </div>
    </div>
  )
}

export default function WhyMattersSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="why-it-matters"
      ref={ref}
      style={{ padding: '104px 0', /* bg-purple-50 */ }}
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
            color: '#A855F7'}}>{t('why.badge')}</span>
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
            marginBottom: 72}}
        >
          {t('why.title')}
        </motion.h2>

        {/* Two-column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 64,
          alignItems: 'center'}}>
          {/* Left: Emotional copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-gray-600 dark:text-gray-300" style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              
              lineHeight: 1.85,
              marginBottom: 32}}>
              {t('why.p1')}
            </p>

            <div style={{
              width: 40,
              height: 2,
              background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
              borderRadius: 99,
              marginBottom: 32,
              opacity: 0.4}} />

            <p className="text-gray-600 dark:text-gray-300" style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.6vw, 17px)',
              
              lineHeight: 1.85}}>
              {t('why.p2')}
            </p>
          </motion.div>

          {/* Right: Before/after visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <div style={{
              
              borderRadius: 16,
              padding: 24,
              border: '1px solid rgba(124,58,237,0.10)',
              position: 'relative'}}>
              {/* Labels row */}
              <div style={{ display: 'flex', marginBottom: 12 }}>
                <div style={{
                  flex: 1,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#AAA',
                  textAlign: 'center'}}>{t('why.before')}</div>
                {/* Spacer for the vs badge */}
                <div style={{ width: 48 }} />
                <div style={{
                  flex: 1,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#A855F7',
                  textAlign: 'center'}}>{t('why.with')}</div>
              </div>

              {/* Cards row with floating vs badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                {/* Before card */}
                <div style={{ flex: 1 }}>
                  <BadBiodata />
                </div>

                {/* Floating vs badge */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'white',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Sora, sans-serif',
                  fontWeight: 800,
                  fontSize: 11,
                  flexShrink: 0,
                  margin: '0 8px',
                  zIndex: 1,
                  position: 'relative'}}>{t('why.vs')}</div>

                {/* After card */}
                <div style={{ flex: 1 }}>
                  <GoodBiodata />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
