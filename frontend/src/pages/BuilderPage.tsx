import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useBiodataStore } from '@/store/biodataStore'
import { STEP_LABELS, TEMPLATE_META } from '@/types/biodata'
import type { FormStep, TemplateId } from '@/types/biodata'
import { DEMO_BIODATA } from '@/data/demoData'
import { useTranslation } from '@/lib/i18n'
import StepBasicInfo from '@/components/form/StepBasicInfo'
import StepFamily from '@/components/form/StepFamily'
import StepEducationCareer from '@/components/form/StepEducationCareer'
import StepPersonalInterests from '@/components/form/StepPersonalInterests'
import StepMatchPreferences from '@/components/form/StepMatchPreferences'
import StepMedia from '@/components/form/StepMedia'
import TemplateModernMinimal from '@/components/templates/TemplateModernMinimal'
import TemplateRefinedElegance from '@/components/templates/TemplateRefinedElegance'
import TemplateProfessionalPremium from '@/components/templates/TemplateProfessionalPremium'
import TemplateCulturalGrace from '@/components/templates/TemplateCulturalGrace'
import TemplateTheModernist from '@/components/templates/TemplateTheModernist'
import TemplateMountainSoul from '@/components/templates/TemplateMountainSoul'
import TemplateVintageWarmth from '@/components/templates/TemplateVintageWarmth'
import TemplateAuroraGlass from '@/components/templates/TemplateAuroraGlass'
import TemplateOceanBreeze from '@/components/templates/TemplateOceanBreeze'
import TemplateRoyalMajestic from '@/components/templates/TemplateRoyalMajestic'
import TemplateBotanicalFresh from '@/components/templates/TemplateBotanicalFresh'
import TemplateCelestialNight from '@/components/templates/TemplateCelestialNight'
import TemplateRoseGoldLuxe from '@/components/templates/TemplateRoseGoldLuxe'
import TemplateZenMinimal from '@/components/templates/TemplateZenMinimal'
import TemplatePastelDreams from '@/components/templates/TemplatePastelDreams'
import TemplateHeritageSplendor from '@/components/templates/TemplateHeritageSplendor'

const STEPS: FormStep[] = [1, 2, 3, 4, 5, 6]

const TEMPLATE_IDS: TemplateId[] = [
  'modern-minimal', 'refined-elegance', 'professional-premium', 'cultural-grace',
  'the-modernist', 'mountain-soul', 'vintage-warmth', 'aurora-glass',
  'ocean-breeze', 'royal-majestic', 'botanical-fresh', 'celestial-night',
  'rose-gold-luxe', 'zen-minimal', 'pastel-dreams', 'heritage-splendor',
]

function isStepValid(step: FormStep, biodata: ReturnType<typeof useBiodataStore>['biodata']): boolean {
  if (step === 1) {
    const b = biodata.basicInfo
    return !!(b.fullName.trim() && b.dateOfBirth && b.religion && b.city && b.state)
  }
  return true
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 })}

function TemplateRenderer({ templateId, biodata }: {
  templateId: TemplateId
  biodata: ReturnType<typeof useBiodataStore>['biodata']
}) {
  switch (templateId) {
    case 'modern-minimal': return <TemplateModernMinimal biodata={biodata} />
    case 'refined-elegance': return <TemplateRefinedElegance biodata={biodata} />
    case 'professional-premium': return <TemplateProfessionalPremium biodata={biodata} />
    case 'cultural-grace': return <TemplateCulturalGrace biodata={biodata} />
    case 'the-modernist': return <TemplateTheModernist biodata={biodata} />
    case 'mountain-soul': return <TemplateMountainSoul biodata={biodata} />
    case 'vintage-warmth': return <TemplateVintageWarmth biodata={biodata} />
    case 'aurora-glass': return <TemplateAuroraGlass biodata={biodata} />
    case 'ocean-breeze': return <TemplateOceanBreeze biodata={biodata} />
    case 'royal-majestic': return <TemplateRoyalMajestic biodata={biodata} />
    case 'botanical-fresh': return <TemplateBotanicalFresh biodata={biodata} />
    case 'celestial-night': return <TemplateCelestialNight biodata={biodata} />
    case 'rose-gold-luxe': return <TemplateRoseGoldLuxe biodata={biodata} />
    case 'zen-minimal': return <TemplateZenMinimal biodata={biodata} />
    case 'pastel-dreams': return <TemplatePastelDreams biodata={biodata} />
    case 'heritage-splendor': return <TemplateHeritageSplendor biodata={biodata} />
    default: return <TemplateModernMinimal biodata={biodata} />
  }
}

export default function BuilderPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { biodata, currentStep, nextStep, prevStep, setStep, setTemplate, updateBasicInfo, updateFamilyInfo, updateEducation, updateCareer, updatePersonalInterests, updateMatchPreferences, updateMedia, resetBiodata } = useBiodataStore()
  const [direction, setDirection] = useState(1)
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false)

  useEffect(() => {
    const isDemo = sessionStorage.getItem('demo-mode') === 'true'
    const templateId = sessionStorage.getItem('selected-template-id')
    if (isDemo && templateId) {
      resetBiodata()
      setTimeout(() => {
        updateBasicInfo(DEMO_BIODATA.basicInfo)
        updateFamilyInfo(DEMO_BIODATA.familyInfo)
        updateEducation(DEMO_BIODATA.education)
        updateCareer(DEMO_BIODATA.career)
        updatePersonalInterests(DEMO_BIODATA.personalInterests)
        updateMatchPreferences(DEMO_BIODATA.matchPreferences)
        updateMedia(DEMO_BIODATA.media)
        setTemplate(templateId as TemplateId)
      }, 0)
      sessionStorage.removeItem('demo-mode')
      sessionStorage.removeItem('selected-template-id')
    } else if (templateId) {
      setTemplate(templateId as TemplateId)
      sessionStorage.removeItem('selected-template-id')
    }
  }, [])

  function goNext() {
    setDirection(1)
    if (currentStep === 6) {
      navigate('/preview')
    } else {
      nextStep()
    }
  }

  function goPrev() {
    setDirection(-1)
    prevStep()
  }

  function goToStep(step: FormStep) {
    setDirection(step > currentStep ? 1 : -1)
    setStep(step)
  }

  const canProceed = isStepValid(currentStep, biodata)
  const isLastStep = currentStep === 6

  const stepComponents: Record<FormStep, React.ReactNode> = {
    1: <StepBasicInfo />,
    2: <StepFamily />,
    3: <StepEducationCareer />,
    4: <StepPersonalInterests />,
    5: <StepMatchPreferences />,
    6: <StepMedia />}

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300" style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'inherit' }}>

      {/* ===== LEFT PANEL — Form ===== */}
      <div className="bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 builder-left-panel transition-colors duration-300" style={{
        width: '50%',
        minWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
        zIndex: 10}}>
        {/* Top bar */}
        <div className="border-b border-gray-100 dark:border-slate-800" style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <Link to="/" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500, transition: 'color 150ms' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Link>
          <span style={{ fontFamily: 'inherit', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            wymm
          </span>
          {/* Mobile preview toggle */}
          <button
            type="button"
            onClick={() => setMobilePreviewOpen(true)}
            className="mobile-preview-btn bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-300"
            style={{ display: 'none', padding: '6px 14px', borderRadius: '8px', borderWidth: '1px', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
          >
            Preview
          </button>
        </div>

        {/* Step progress */}
        <div className="border-b border-gray-100 dark:border-slate-800" style={{ padding: '20px 32px 16px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', position: 'relative' }}>
            {/* Progress line */}
            <div className="bg-gray-100 dark:bg-slate-800" style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', height: '2px', zIndex: 0 }} />
            <div style={{
              position: 'absolute', top: '14px', left: '14px', height: '2px', background: 'linear-gradient(90deg, #7C3AED, #A855F7)',
              width: `${((currentStep - 1) / 5) * 100}%`,
              transition: 'width 400ms cubic-bezier(0.23,1,0.32,1)',
              zIndex: 1}} />
            {STEPS.map((step) => {
              const done = step < currentStep
              const active = step === currentStep
              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => step <= currentStep && goToStep(step)}
                  style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    background: 'none', border: 'none', cursor: step <= currentStep ? 'pointer' : 'default',
                    padding: 0, position: 'relative', zIndex: 2}}
                  aria-label={`Step ${step}: ${STEP_LABELS[step]}`}
                >
                  <div className={`transition-all duration-300 ${active ? 'bg-white dark:bg-slate-900' : done ? 'bg-purple-600' : 'bg-gray-100 dark:bg-slate-800'}`} style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    border: active ? '2.5px solid #7C3AED' : done ? '2.5px solid #7C3AED' : '2px solid var(--color-border)',
                    borderColor: (!active && !done) ? 'var(--color-gray-200)' : '',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: active ? '0 0 0 4px rgba(124,58,237,0.12)' : 'none'}}>
                    {done ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span className={active ? 'text-purple-600' : 'text-gray-400 dark:text-gray-500'} style={{ fontSize: '11px', fontWeight: 700 }}>{step}</span>
                    )}
                  </div>
                  <span className={`step-label ${active || done ? 'text-purple-600' : 'text-gray-400 dark:text-gray-500'}`} style={{ fontSize: '10px', fontWeight: active ? 700 : 500, letterSpacing: '0.03em', whiteSpace: 'nowrap' as const, textTransform: 'uppercase' }}>
                    {STEP_LABELS[step]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Form area — scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 32px 24px', position: 'relative' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            >
              {stepComponents[currentStep]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors duration-300" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <button
            type="button"
            className="btn-ghost dark:text-gray-300 dark:hover:bg-slate-800"
            onClick={goPrev}
            disabled={currentStep === 1}
            style={{ opacity: currentStep === 1 ? 0.3 : 1, pointerEvents: currentStep === 1 ? 'none' : 'auto' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Previous
          </button>

          <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: '12px', fontWeight: 500 }}>
            Step {currentStep} of 6
          </span>

          <button
            type="button"
            className="btn-primary"
            onClick={goNext}
            disabled={!canProceed}
            style={{
              opacity: canProceed ? 1 : 0.4,
              pointerEvents: canProceed ? 'auto' : 'none',
              padding: '11px 24px',
              fontSize: '14px'}}
          >
            {isLastStep ? 'Preview' : 'Next'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* ===== RIGHT PANEL — Preview ===== */}
      <div className="bg-gray-50 dark:bg-slate-950 builder-right-panel transition-colors duration-300" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'}}>
        {/* Template selector */}
        <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' as const }}>
          <span className="text-gray-400 dark:text-gray-500" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '4px' }}>{t('builder.template')}</span>
          {TEMPLATE_IDS.map(id => {
            const meta = TEMPLATE_META[id]
            const active = biodata.templateId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTemplate(id)}
                className={`transition-all duration-150 ${active ? '' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700'}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '7px 14px', borderRadius: '10px',
                  borderWidth: '1.5px',
                  borderColor: active ? meta.accent : '',
                  background: active ? `${meta.accent}14` : '',
                  color: active ? meta.accent : '',
                  fontFamily: 'inherit', fontSize: '13px', fontWeight: active ? 700 : 500,
                  cursor: 'pointer'}}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: meta.accent, flexShrink: 0 }} />
                {meta.name}
              </button>
            )
          })}
        </div>

        {/* Preview frame */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          {/* Live label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px', alignSelf: 'flex-start' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span className="text-gray-500 dark:text-gray-400" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t('builder.livepreview')}</span>
          </div>

          {/* Scaled preview container */}
          <div className="bg-white dark:bg-black border-gray-200 dark:border-slate-800 transition-colors duration-300" style={{
            flex: 1, width: '100%', overflow: 'hidden',
            borderRadius: '16px', borderWidth: '1px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            position: 'relative'}}>
            <div style={{
              position: 'absolute', inset: 0,
              overflowY: 'auto',
              transformOrigin: 'top left'}}>
              <div style={{
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                width: '200%',
                pointerEvents: 'none'}}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={biodata.templateId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TemplateRenderer templateId={biodata.templateId} biodata={biodata} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile preview overlay */}
      {mobilePreviewOpen && (
        <div className="bg-white dark:bg-slate-900 transition-colors duration-300" style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', flexDirection: 'column' }}>
          <div className="border-b border-gray-200 dark:border-slate-700" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-gray-900 dark:text-white" style={{ fontFamily: 'inherit', fontSize: '16px', fontWeight: 700 }}>{t('builder.livepreview')}</span>
            <button type="button" onClick={() => setMobilePreviewOpen(false)} className="text-gray-600 dark:text-gray-300" style={{ background: 'none', border: 'none', fontSize: '15px', cursor: 'pointer', padding: '4px 8px' }}>
              Close
            </button>
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <div style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '167%', pointerEvents: 'none' }}>
              <TemplateRenderer templateId={biodata.templateId} biodata={biodata} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 768px) {
          .builder-left-panel { width: 100% !important; }
          .builder-right-panel { display: none !important; }
          .mobile-preview-btn { display: flex !important; }
          .step-label { display: none !important; }
        }
      `}</style>
    </div>
  )
}
