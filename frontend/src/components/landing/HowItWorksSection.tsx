import { useRef } from 'react'
import { useTranslation } from '@/lib/i18n'
import { motion, useInView } from 'framer-motion'

function TemplatesThumbnails() {
  const colors = ['#7C3AED', '#EC4899', '#0EA5E9', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#F472B6']
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8,
      width: '100%',
      maxWidth: 240}}>
      {colors.map((c, i) => (
        <div key={i} style={{
          height: 72,
          borderRadius: 10,
          border: `1.5px solid ${c}33`,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
          <div style={{ height: 4, background: c }} />
          <div style={{ padding: '8px 8px 6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: `${c}22`, border: `1px solid ${c}44` }} />
              <div>
                <div style={{ height: 4, background: '#1A1A1A', borderRadius: 2, width: 36, marginBottom: 3 }} />
                <div style={{ height: 3, background: '#E5E5E5', borderRadius: 2, width: 24 }} />
              </div>
            </div>
            <div style={{ height: 3, background: '#F0F0F0', borderRadius: 2, width: '80%', marginBottom: 3 }} />
            <div style={{ height: 3, background: '#F0F0F0', borderRadius: 2, width: '60%' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function BuilderIllustration() {
  const steps = ['Basic Info', 'Family', 'Education', 'Interests', 'Preferences', 'Photos']
  return (
    <div style={{
      width: '100%',
      maxWidth: 240,
      borderRadius: 12,
      border: '1px solid #E5E5E5',
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0,0,0,0.06)'}}>
      <div style={{ height: 3, background: '#F0F0F0', position: 'relative' }}>
        <div style={{ height: '100%', width: '50%', background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }} />
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{
          width: 90,
          
          borderRight: '1px solid #F0F0F0',
          padding: '10px 0'}}>
          {steps.map((s, i) => (
            <div key={i} style={{ padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                border: `1.5px solid ${i < 3 ? '#7C3AED' : '#E5E5E5'}`,
                background: i < 3 ? '#7C3AED' : 'transparent',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>
                {i < 3 && <div style={{ width: 5, height: 5, borderRadius: '50%'}} />}
              </div>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 9,
                color: i < 3 ? '#7C3AED' : '#AAA',
                fontWeight: i === 2 ? 600 : 400,
                whiteSpace: 'nowrap'}}>
                {s}
              </span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, padding: 10 }}>
          <div style={{ height: 5, background: '#7C3AED', borderRadius: 3, width: '55%', marginBottom: 8, opacity: 0.2 }} />
          {(['70%', '55%', '80%', '60%'] as const).map((w, i) => (
            <div key={i} style={{
              height: 18,
              borderRadius: 5,
              background: '#F8F9FB',
              border: '1px solid #E5E5E5',
              width: w,
              marginBottom: 6}} />
          ))}
          <div style={{
            marginTop: 8,
            height: 20,
            borderRadius: 99,
            background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            width: '70%'}} />
        </div>
      </div>
    </div>
  )
}

function ShareIllustration() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, maxWidth: 200 }}>
      <div style={{
        width: 110,
        background: '#1C1C1E',
        borderRadius: 18,
        padding: '8px 6px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'}}>
        <div style={{ width: 36, height: 5, background: '#333', borderRadius: 3, margin: '0 auto 6px' }} />
        <div style={{ borderRadius: 10, overflow: 'hidden', padding: '10px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'linear-gradient(135deg, #E8DFF5, #FCE8EB)' }} />
            <div>
              <div style={{ height: 4, background: '#1A1A1A', borderRadius: 2, width: 40, marginBottom: 2 }} />
              <div style={{ height: 3, background: '#E5E5E5', borderRadius: 2, width: 28 }} />
            </div>
          </div>
          <div style={{ height: 1, background: '#F0F0F0', marginBottom: 6 }} />
          <div style={{
            width: '100%',
            height: 48,
            background: '#F8F9FB',
            borderRadius: 6,
            border: '1px dashed #D0D0D0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 6}}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, opacity: 0.5 }}>
              {[1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1].map((on, i) => (
                <div key={i} style={{
                  width: 6,
                  height: 6,
                  borderRadius: 1,
                  background: on ? '#1A1A1A' : 'transparent'}} />
              ))}
            </div>
          </div>
          <div style={{
            height: 16,
            borderRadius: 99,
            background: 'linear-gradient(90deg, #25D366, #128C7E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'}}>
            <span style={{ fontSize: 7, color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>WhatsApp</span>
          </div>
        </div>
        <div style={{ width: 40, height: 3, background: '#444', borderRadius: 2, margin: '6px auto 0' }} />
      </div>
    </div>
  )
}

export default function HowItWorksSection() {
  const { t } = useTranslation()
  const STEPS = [
{
    number: '01',
    title: t('how.step1.title') || 'Choose your canvas',
    description: t('how.step1.desc') || 'Five templates, five personalities. Modern Minimal, Refined Elegance, Professional Premium, Cultural Grace, The Modernist. Pick the one that feels like you.',
    visual: <TemplatesThumbnails />,
    accent: '#7C3AED'},
  {
    number: '02',
    title: t('how.step2.title') || 'Tell your story',
    description: t('how.step2.desc') || 'A guided six-step builder that asks the right questions — not a generic form, but a thoughtful conversation about who you are.',
    visual: <BuilderIllustration />,
    accent: '#EC4899'},
  {
    number: '03',
    title: t('how.step3.title') || 'Share with confidence',
    description: t('how.step3.desc') || 'Get a beautiful link and QR code in seconds. Share on WhatsApp, email it to families, print it — however you reach people.',
    visual: <ShareIllustration />,
    accent: '#7C3AED'},
  ]

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="how-it-works"
      ref={ref}
      style={{ padding: '104px 0', background: '#F8F9FB' }}
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
            color: '#EC4899'}}>
            How it works
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
            fontSize: 'clamp(26px, 4vw, 42px)',
            letterSpacing: '-0.02em',
            marginBottom: 80}}
        >
          Three minutes. One beautiful biodata.
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 1
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="how-step"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10%',
                  flexDirection: isEven ? 'row-reverse' : 'row'}}
              >
                {/* Text side — always 45% on desktop */}
                <div className="how-step-col" style={{ width: '45%', flexShrink: 0, minWidth: 0, position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: -20,
                    left: -10,
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 800,
                    fontSize: 120,
                    lineHeight: 1,
                    letterSpacing: '-0.05em',
                    background: `linear-gradient(135deg, ${step.accent} 0%, #EC4899 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 0.06,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 0}}>
                    {step.number}
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                      <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: `${step.accent}15`,
                        border: `1.5px solid ${step.accent}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Sora, sans-serif',
                        fontSize: 12,
                        fontWeight: 700,
                        color: step.accent}}>
                        {parseInt(step.number)}
                      </div>
                      <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                        color: step.accent}}>
                        Step {step.number}
                      </span>
                    </div>
                    <h3 style={{
                      fontFamily: 'Sora, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(22px, 3vw, 30px)',
                      letterSpacing: '-0.02em',
                      marginBottom: 16}}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 16,
                      lineHeight: 1.75,
                      maxWidth: 400,
                      textAlign: 'left'}}>
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Visual side — always 45% on desktop */}
                <div className="how-step-col" style={{
                  width: '45%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                  padding: 32,
                  
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                  minHeight: 200}}>
                  {step.visual}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .how-step {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .how-step-col {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
