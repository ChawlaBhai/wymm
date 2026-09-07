import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { TEMPLATE_META, type TemplateId, type BiodataRecord } from '@/types/biodata'
import { useBiodataStore } from '@/store/biodataStore'
import { useTranslation } from '@/lib/i18n'

// Lazy load templates for performance
const TemplateModernMinimal = lazy(() => import('@/components/templates/TemplateModernMinimal'))
const TemplateRefinedElegance = lazy(() => import('@/components/templates/TemplateRefinedElegance'))
const TemplateProfessionalPremium = lazy(() => import('@/components/templates/TemplateProfessionalPremium'))
const TemplateCulturalGrace = lazy(() => import('@/components/templates/TemplateCulturalGrace'))
const TemplateTheModernist = lazy(() => import('@/components/templates/TemplateTheModernist'))
const TemplateMountainSoul = lazy(() => import('@/components/templates/TemplateMountainSoul'))
const TemplateVintageWarmth = lazy(() => import('@/components/templates/TemplateVintageWarmth'))
const TemplateAuroraGlass = lazy(() => import('@/components/templates/TemplateAuroraGlass'))
const TemplateOceanBreeze = lazy(() => import('@/components/templates/TemplateOceanBreeze'))
const TemplateRoyalMajestic = lazy(() => import('@/components/templates/TemplateRoyalMajestic'))
const TemplateBotanicalFresh = lazy(() => import('@/components/templates/TemplateBotanicalFresh'))
const TemplateCelestialNight = lazy(() => import('@/components/templates/TemplateCelestialNight'))
const TemplateRoseGoldLuxe = lazy(() => import('@/components/templates/TemplateRoseGoldLuxe'))
const TemplateZenMinimal = lazy(() => import('@/components/templates/TemplateZenMinimal'))
const TemplatePastelDreams = lazy(() => import('@/components/templates/TemplatePastelDreams'))
const TemplateHeritageSplendor = lazy(() => import('@/components/templates/TemplateHeritageSplendor'))

const TEMPLATE_CATEGORIES: Record<TemplateId, string> = {
  'modern-minimal': 'Minimal', 'refined-elegance': 'Elegant', 'professional-premium': 'Premium',
  'cultural-grace': 'Cultural', 'the-modernist': 'Dark', 'mountain-soul': 'Nature',
  'vintage-warmth': 'Warm', 'aurora-glass': 'Glass', 'ocean-breeze': 'Nature',
  'royal-majestic': 'Premium', 'botanical-fresh': 'Nature', 'celestial-night': 'Dark',
  'rose-gold-luxe': 'Elegant', 'zen-minimal': 'Minimal', 'pastel-dreams': 'Soft',
  'heritage-splendor': 'Cultural'}

const CATEGORY_FILTERS = ['All', 'Light', 'Dark', 'Cultural', 'Nature', 'Minimal', 'Elegant', 'Premium', 'Warm', 'Glass', 'Soft']

const FILTER_MAP: Record<string, string[]> = {
  All: [],
  Light: ['Minimal', 'Elegant', 'Premium', 'Warm', 'Glass', 'Soft', 'Nature', 'Cultural'],
  Dark: ['Dark'], Cultural: ['Cultural'], Nature: ['Nature'], Minimal: ['Minimal'],
  Elegant: ['Elegant'], Premium: ['Premium'], Warm: ['Warm'], Glass: ['Glass'], Soft: ['Soft']}

const TEMPLATE_DEMO_SLUGS: Partial<Record<TemplateId, string>> = {
  'modern-minimal': 'demo1', 'refined-elegance': 'demo2', 'professional-premium': 'demo3',
  'cultural-grace': 'demo4', 'the-modernist': 'demo5', 'mountain-soul': 'demo6',
  'vintage-warmth': 'demo7', 'aurora-glass': 'demo8', 'ocean-breeze': 'demo9',
  'royal-majestic': 'demo10', 'botanical-fresh': 'demo11', 'celestial-night': 'demo12',
  'rose-gold-luxe': 'demo13', 'zen-minimal': 'demo14', 'pastel-dreams': 'demo15',
  'heritage-splendor': 'demo16'}

const DARK_TEMPLATES: TemplateId[] = ['the-modernist', 'celestial-night']
const TEMPLATE_IDS = Object.keys(TEMPLATE_META) as TemplateId[]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } }}
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

// Helper to render the correct template component
function LiveTemplateRenderer({ templateId, biodata }: { templateId: TemplateId, biodata: BiodataRecord }) {
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

function LivePreviewCard({ id, meta, biodata }: { id: TemplateId, meta: any, biodata: BiodataRecord }) {
  const [isHovered, setIsHovered] = useState(false)
  const isDark = DARK_TEMPLATES.includes(id)

  return (
    <div 
      style={{
        background: isDark ? '#0A0A0A' : '#FFFFFF',
        borderRadius: 8,
        flex: 1,
        border: `1px solid ${isDark ? '#2A2A2A' : '#F0F0F0'}`,
        overflow: 'hidden',
        position: 'relative'}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ height: 4, background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}90)`, zIndex: 10, position: 'absolute', top: 0, left: 0, right: 0 }} />
      
      {/* Scaled down container */}
      <div style={{ 
        width: '400%', 
        height: '400%', 
        transform: 'scale(0.25)', 
        transformOrigin: 'top left',
        position: 'absolute',
        top: 4,
        left: 0}}>
        <div style={{
          width: '100%',
          height: 'max-content',
          transition: 'transform 8s linear',
          transform: isHovered ? 'translateY(calc(-100% + 700px))' : 'translateY(0)'}}>
          <Suspense fallback={<div style={{ width: '100%', height: 800, background: isDark ? '#111' : '#f9f9f9' }} />}>
            <LiveTemplateRenderer templateId={id} biodata={biodata} />
          </Suspense>
        </div>
      </div>
      
      {/* Overlay to catch clicks and prevent interaction with the scaled template */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'transparent' }} />
    </div>
  )
}

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  Minimal: { bg: '#F3F4F6', color: '#374151' }, Elegant: { bg: '#FDF2F8', color: '#9D174D' },
  Premium: { bg: '#FFFBEB', color: '#92400E' }, Cultural: { bg: '#FFF7ED', color: '#C2410C' },
  Dark: { bg: '#1F2937', color: '#9CA3AF' }, Nature: { bg: '#F0FDF4', color: '#166534' },
  Warm: { bg: '#FFF8F1', color: '#92400E' }, Glass: { bg: '#EEF2FF', color: '#3730A3' },
  Soft: { bg: '#F5F3FF', color: '#6D28D9' }}

function CategoryBadge({ category }: { category: string }) {
  const style = BADGE_STYLES[category] || { bg: '#F3F4F6', color: '#374151' }
  return (
    <span style={{
      padding: '2px 8px', background: style.bg, color: style.color, borderRadius: 999,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
      fontFamily: 'Inter, sans-serif', flexShrink: 0}}>
      {category}
    </span>
  )
}

export default function TemplatesPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })
  
  // Get dummy biodata for live preview
  const defaultBiodata = useBiodataStore(s => s.biodata)
  // Fill it with some nice demo data so it looks good
  const demoBiodata: BiodataRecord = {
    ...defaultBiodata,
    basicInfo: {
      ...defaultBiodata.basicInfo,
      fullName: 'Aarav Sharma', age: 28, height: "5'10\"", city: 'Mumbai', state: 'MH',
      religion: 'Hindu', caste: 'Brahmin', motherTongue: 'Hindi',
      aboutMe: 'I am a software engineer who loves traveling, photography, and spending time with family.'
    },
    career: { ...defaultBiodata.career, currentDesignation: 'Senior Developer', company: 'Google', industry: 'IT' },
    education: { ...defaultBiodata.education, highestQualification: 'B.Tech', institution: 'IIT Bombay' }}

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
    const demoSlug = TEMPLATE_DEMO_SLUGS[id]
    if (demoSlug) {
      window.open(`/pr/${demoSlug}`, '_blank')
    } else {
      sessionStorage.setItem('selected-template-id', id)
      sessionStorage.setItem('demo-mode', 'true')
      navigate('/create')
    }
  }

  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300" style={{ minHeight: '100vh', fontFamily: 'inherit' }}>

      {/* PAGE HEADER */}
      <div className="bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300" style={{ padding: '60px 6vw 36px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Link to="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" style={{ fontSize: 13, textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#DDDDDD', fontSize: 13 }}>/</span>
            <span className="text-gray-900 dark:text-gray-100" style={{ fontSize: 13 }}>Templates</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-gray-900 dark:text-white"
            style={{
              fontFamily: 'inherit',
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 12,
              lineHeight: 1.1}}
          >
            {t('templates.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
            className="text-gray-500 dark:text-gray-400"
            style={{ fontSize: 'clamp(15px, 1.6vw, 17px)', lineHeight: 1.6, maxWidth: 480 }}
          >
            {t('templates.subtitle')}
          </motion.p>
        </div>
      </div>

      {/* FILTER TABS — sticky */}
      <div className="bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300" style={{ padding: '0 6vw', position: 'sticky', top: 64, zIndex: 40, boxShadow: '0 1px 0 rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}
            style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', padding: '12px 0' }}
          >
            {CATEGORY_FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0 ${
                  activeFilter === filter
                    ? 'bg-purple-600 text-white border-1.5 border-purple-600'
                    : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 border-1.5 border-gray-200 dark:border-slate-700 hover:border-purple-300'
                }`}
                style={{ fontFamily: 'inherit' }}
              >
                {t(`filter.${filter.toLowerCase()}`) !== `filter.${filter.toLowerCase()}` ? t(`filter.${filter.toLowerCase()}`) : filter}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* TEMPLATE GRID */}
      <div className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300" style={{ padding: '36px 6vw 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }} ref={gridRef}>
          {filteredTemplates.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }} className="text-gray-400">
              <p style={{ fontSize: 15 }}>No templates found for this filter.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="tpl-page-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}
            >
              {filteredTemplates.map((id) => {
                const meta = TEMPLATE_META[id]
                const category = TEMPLATE_CATEGORIES[id]
                const isDark = DARK_TEMPLATES.includes(id)

                return (
                  <motion.div
                    key={id}
                    variants={cardVariants}
                    whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.15)', transition: { duration: 0.2 } }}
                    className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 transition-colors duration-300"
                    style={{
                      borderRadius: 16,
                      overflow: 'hidden',
                      borderWidth: '1px',
                      display: 'flex',
                      flexDirection: 'column',
                      height: 380, // Taller to show live preview nicely
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'}}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${meta.accent}80` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '' }}
                  >
                    {/* Live Preview Container */}
                    <div style={{ padding: '16px 16px 0', flex: 1, display: 'flex', overflow: 'hidden' }}>
                      <LivePreviewCard id={id} meta={meta} biodata={{...demoBiodata, templateId: id}} />
                    </div>

                    {/* Footer */}
                    <div className="bg-white dark:bg-slate-800 transition-colors duration-300" style={{ padding: '14px 16px 16px', flexShrink: 0, zIndex: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                        <span className="text-gray-900 dark:text-white" style={{
                          fontFamily: 'inherit',
                          fontWeight: 700,
                          fontSize: 14,
                          letterSpacing: '-0.01em',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap' as const,
                          flex: 1}}>
                          {meta.name}
                        </span>
                        <CategoryBadge category={category} />
                      </div>
                      <p className="text-gray-400 dark:text-gray-400" style={{
                        fontSize: 12,
                        fontStyle: 'italic',
                        marginBottom: 12,
                        fontFamily: 'inherit',
                        lineHeight: 1.4,
                        whiteSpace: 'nowrap' as const,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'}}>
                        {meta.tagline}
                      </p>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => useTemplate(id)}
                          style={{
                            flex: 1,
                            padding: '8px 10px',
                            background: meta.accent,
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            transition: 'opacity 150ms ease'}}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
                        >
                          {t('templates.use')}
                        </button>
                        <button
                          onClick={() => previewTemplate(id)}
                          className="dark:text-gray-300"
                          style={{
                            flex: 1,
                            padding: '8px 10px',
                            background: 'transparent',
                            color: meta.accent,
                            border: `1.5px solid ${meta.accent}45`,
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            transition: 'all 150ms ease'}}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLButtonElement
                            el.style.background = `${meta.accent}15`
                            el.style.borderColor = meta.accent
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLButtonElement
                            el.style.background = 'transparent'
                            el.style.borderColor = `${meta.accent}45`
                          }}
                        >
                          {t('templates.preview')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          <p className="text-gray-400 dark:text-gray-500" style={{ textAlign: 'center', marginTop: 36, fontSize: 13, fontFamily: 'inherit' }}>
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
