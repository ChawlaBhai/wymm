import { useAppStore } from '@/store/appStore'

type Translations = Record<string, Record<'en' | 'hi', string>>

export const translations: Translations = {
  // Navbar
  'nav.templates': { en: 'Templates', hi: 'टेम्पलेट्स' },
  'nav.howItWorks': { en: 'How it works', hi: 'यह कैसे काम करता है' },
  'nav.about': { en: 'About', hi: 'हमारे बारे में' },
  'nav.manage': { en: 'Manage', hi: 'मैनेज करें' },
  'nav.createBiodata': { en: 'Create Biodata', hi: 'अपना बायोडाटा बनाएं' },
  'nav.login': { en: 'Log in', hi: 'लॉग इन' },
  'nav.logout': { en: 'Log out', hi: 'लॉग आउट' },

  // Landing Page
  'landing.title1': { en: 'Beautiful biodatas,', hi: 'खूबसूरत बायोडाटा,' },
  'landing.title2': { en: 'crafted with elegance.', hi: 'एलिगेंस के साथ तैयार किए गए।' },
  'landing.subtitle': { en: 'Create stunning, professional profiles for your marriage proposals in minutes. Free, secure, and easily shareable.', hi: 'शादी के प्रस्तावों के लिए मिनटों में शानदार, प्रोफेशनल प्रोफाइल बनाएं। मुफ्त, सुरक्षित और आसानी से साझा करने योग्य।' },
  'landing.cta': { en: 'Create your biodata now', hi: 'अभी अपना बायोडाटा बनाएं' },
  'landing.viewTemplates': { en: 'View all templates', hi: 'सभी टेम्पलेट्स देखें' },
  'landing.stats.created': { en: 'Profiles created', hi: 'बनाए गए प्रोफाइल' },
  'landing.stats.templates': { en: 'Premium designs', hi: 'प्रीमियम डिज़ाइन्स' },
  
  // Templates Page
  'templates.title': { en: 'All Templates', hi: 'सभी टेम्पलेट्स' },
  'templates.subtitle': { en: '16 carefully crafted designs. One for every personality.', hi: '16 सावधानी से तैयार किए गए डिज़ाइन। हर व्यक्तित्व के लिए एक।' },
  'templates.use': { en: 'Use this template', hi: 'इस टेम्पलेट का उपयोग करें' },
  'templates.preview': { en: 'Preview demo', hi: 'डेमो देखें' },
  
  // General
  'btn.save': { en: 'Save', hi: 'सेव करें' },
  'btn.next': { en: 'Next step', hi: 'अगला कदम' },
  'btn.back': { en: 'Back', hi: 'पीछे' },
  'btn.download': { en: 'Download PDF', hi: 'PDF डाउनलोड करें' },
  'btn.share': { en: 'Share Profile', hi: 'प्रोफाइल साझा करें' },
  'btn.edit': { en: 'Edit', hi: 'एडिट करें' },

  // Add more as needed...
}

export function useTranslation() {
  const language = useAppStore((state) => state.language)

  function t(key: string): string {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Missing translation key: ${key}`)
      return key
    }
    return translation[language] || translation.en
  }

  return { t, language }
}
