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

  
  // Hero Section Signals
  'hero.signal1': { en: '16 premium templates', hi: '16 प्रीमियम थीम्स' },
  'hero.signal2': { en: 'Share in seconds', hi: 'सेकंडों में शेयर करें' },
  'hero.signal3': { en: 'Free preview', hi: 'मुफ़्त प्रीव्यू' },

  // Landing Page Hero
  'landing.title1': { en: 'Beautiful biodatas,', hi: 'खूबसूरत बायोडाटा,' },
  'landing.title2': { en: 'crafted with elegance.', hi: 'एलिगेंस के साथ तैयार किए गए।' },
  'landing.subtitle': { en: 'Create stunning, professional profiles for your marriage proposals in minutes. Free, secure, and easily shareable.', hi: 'शादी के प्रस्तावों के लिए मिनटों में शानदार, प्रोफेशनल प्रोफाइल बनाएं। मुफ्त, सुरक्षित और आसानी से साझा करने योग्य।' },
  'landing.cta': { en: 'Create your biodata now', hi: 'अभी अपना बायोडाटा बनाएं' },
  'landing.viewTemplates': { en: 'View all templates', hi: 'सभी टेम्पलेट्स देखें' },
  
  // Landing Page Stats
  'landing.stats.created': { en: 'Profiles created', hi: 'बनाए गए प्रोफाइल' },
  'landing.stats.templates': { en: 'Premium designs', hi: 'प्रीमियम डिज़ाइन्स' },

  // Why Matters Section
  'why.subtitle': { en: 'OUR STORY', hi: 'हमारी कहानी' },
  'why.title1': { en: 'Four words that ', hi: 'चार शब्द जो ' },
  'why.title2': { en: 'change everything.', hi: 'सब कुछ बदल देते हैं।' },
  'why.desc': { en: 'Will You Marry Me? — wymm was built for the journey that leads to that question.', hi: 'क्या तुम मुझसे शादी करोगी? — wymm उस सफर के लिए बनाया गया था जो इस सवाल तक ले जाता है।' },

  // How It Works Section
  'how.subtitle': { en: 'HOW IT WORKS', hi: 'यह कैसे काम करता है' },
  'how.title': { en: 'Three minutes. One beautiful biodata.', hi: 'तीन मिनट। एक खूबसूरत बायोडाटा।' },
  'how.step1.title': { en: '1. Tell us about yourself', hi: '1. अपने बारे में बताएं' },
  'how.step1.desc': { en: 'Fill out a simple, intuitive form with your personal, professional, and family details.', hi: 'एक सरल फॉर्म में अपनी व्यक्तिगत, पेशेवर और पारिवारिक जानकारी भरें।' },
  'how.step2.title': { en: '2. Choose a design', hi: '2. डिज़ाइन चुनें' },
  'how.step2.desc': { en: 'Select from 16 premium templates crafted by professional designers to suit every personality.', hi: 'हर व्यक्तित्व के अनुरूप पेशेवर डिजाइनरों द्वारा तैयार किए गए 16 प्रीमियम टेम्पलेट्स में से चुनें।' },
  'how.step3.title': { en: '3. Download & Share', hi: '3. डाउनलोड और शेयर' },
  'how.step3.desc': { en: 'Get an instant, pixel-perfect PDF or a private web link to share securely with families.', hi: 'तत्काल, पिक्सेल-परफेक्ट पीडीएफ या निजी वेब लिंक प्राप्त करें और परिवारों के साथ सुरक्षित रूप से साझा करें।' },

  // Features Section
  'features.subtitle': { en: 'WHY WYMM?', hi: 'WYMM क्यों?' },
  'features.title': { en: 'Thoughtfully designed for modern Indian families.', hi: 'आधुनिक भारतीय परिवारों के लिए सोच-समझकर डिज़ाइन किया गया।' },
  'features.f1.title': { en: 'Privacy First', hi: 'प्राइवेसी सबसे पहले' },
  'features.f1.desc': { en: 'Your data is encrypted. You control who sees your profile and when to take it down.', hi: 'आपका डेटा एन्क्रिप्टेड है। आप तय करते हैं कि आपकी प्रोफाइल कौन देखेगा।' },
  'features.f2.title': { en: '16 Premium Themes', hi: '16 प्रीमियम थीम्स' },
  'features.f2.desc': { en: 'From minimalist to deeply cultural. We have a design that perfectly represents you.', hi: 'मिनिमलिस्ट से लेकर पारंपरिक तक। हमारे पास एक ऐसा डिज़ाइन है जो आपको पूरी तरह से प्रस्तुत करता है।' },
  'features.f3.title': { en: 'Always Free', hi: 'हमेशा मुफ़्त' },
  'features.f3.desc': { en: 'No watermarks. No hidden charges. Create and download your biodata for absolutely free.', hi: 'कोई वॉटरमार्क नहीं। कोई छिपा हुआ चार्ज नहीं। अपना बायोडाटा बिल्कुल मुफ़्त में बनाएं और डाउनलोड करें।' },

  // Templates Section
  'templates.subtitle': { en: 'OUR TEMPLATES', hi: 'हमारे टेम्पलेट्स' },
  'templates.title': { en: 'A design for every personality.', hi: 'हर व्यक्तित्व के लिए एक डिज़ाइन।' },
  'templates.desc': { en: 'Whether you prefer modern minimalism or cultural elegance, find the perfect canvas for your story.', hi: 'चाहे आप आधुनिक अतिसूक्ष्मवाद पसंद करते हों या सांस्कृतिक लालित्य, अपनी कहानी के लिए सही कैनवास खोजें।' },
  'templates.btn': { en: 'Browse all templates', hi: 'सभी टेम्पलेट्स ब्राउज़ करें' },

  // Testimonials Section
  'testimonials.title': { en: 'Loved by families across India.', hi: 'पूरे भारत में परिवारों द्वारा पसंद किया गया।' },
  'testimonials.t1': { en: '"The templates are incredibly elegant. It made sharing my profile with families feel so much more professional and respectful."', hi: '"टेम्पलेट्स बेहद खूबसूरत हैं। इसने परिवारों के साथ मेरी प्रोफाइल साझा करने को बहुत अधिक पेशेवर बना दिया।"' },
  'testimonials.t2': { en: '"I loved how easy it was to use. Created a beautiful PDF on my phone in 5 minutes while commuting!"', hi: '"मुझे यह बहुत पसंद आया कि इसका उपयोग करना कितना आसान था। केवल 5 मिनट में फोन पर एक सुंदर पीडीएफ बनाया!"' },

  // CTA Section
  'cta.title1': { en: 'Your story is worth ', hi: 'आपकी कहानी ' },
  'cta.title2': { en: 'telling well.', hi: 'बताने लायक है।' },
  'cta.desc': { en: 'Free forever. No account needed. Ready in minutes.', hi: 'हमेशा मुफ़्त। किसी अकाउंट की आवश्यकता नहीं। मिनटों में तैयार।' },
  'cta.btn': { en: 'Create My Biodata →', hi: 'मेरा बायोडाटा बनाएं →' },
  'cta.trust': { en: 'Join thousands of families across India', hi: 'पूरे भारत के हजारों परिवारों से जुड़ें' },

  // Footer
  'footer.desc': { en: 'The biodata that speaks for you.', hi: 'वह बायोडाटा जो आपके लिए बोलता है।' },
  'footer.product': { en: 'Product', hi: 'उत्पाद' },
  'footer.legal': { en: 'Legal', hi: 'कानूनी' },
  'footer.contact': { en: 'Contact', hi: 'संपर्क करें' },
  'footer.templates': { en: 'Templates', hi: 'टेम्पलेट्स' },
  'footer.how': { en: 'How it works', hi: 'यह कैसे काम करता है' },
  'footer.manage': { en: 'Manage Profiles', hi: 'प्रोफाइल मैनेज करें' },
  'footer.about': { en: 'About', hi: 'हमारे बारे में' },
  'footer.privacy': { en: 'Privacy Policy', hi: 'प्राइवेसी पॉलिसी' },
  'footer.terms': { en: 'Terms of Service', hi: 'सेवा की शर्तें' },
  'footer.refund': { en: 'Refund Policy', hi: 'रिफंड पॉलिसी' },
  'footer.getintouch': { en: 'Get in touch', hi: 'संपर्क करें' },
  'footer.madein': { en: 'Made with ♥ in India · © 2025 wymm', hi: 'भारत में ♥ के साथ बनाया गया · © 2025 wymm' },
  
  // Templates Page
  'templates.page.title': { en: 'All Templates', hi: 'सभी टेम्पलेट्स' },
  'templates.page.subtitle': { en: '16 carefully crafted designs. One for every personality.', hi: '16 सावधानी से तैयार किए गए डिज़ाइन। हर व्यक्तित्व के लिए एक।' },
  'templates.use': { en: 'Use this template', hi: 'इस टेम्पलेट का उपयोग करें' },
  'templates.preview': { en: 'Preview demo', hi: 'डेमो देखें' },
  
  // Builder Page & Form Steps
  'btn.save': { en: 'Save', hi: 'सेव करें' },
  'btn.next': { en: 'Next step', hi: 'अगला कदम' },
  'btn.back': { en: 'Back', hi: 'पीछे' },
  'btn.download': { en: 'Download PDF', hi: 'PDF डाउनलोड करें' },
  'btn.share': { en: 'Share Profile', hi: 'प्रोफाइल साझा करें' },
  'btn.edit': { en: 'Edit', hi: 'एडिट करें' },

  'builder.step.basic': { en: 'Basic Info', hi: 'मूल जानकारी' },
  'builder.step.family': { en: 'Family', hi: 'परिवार' },
  'builder.step.education': { en: 'Edu & Career', hi: 'शिक्षा और करियर' },
  'builder.step.interests': { en: 'Interests', hi: 'रुचियां' },
  'builder.step.preferences': { en: 'Preferences', hi: 'प्राथमिकताएं' },
  'builder.step.media': { en: 'Photos', hi: 'तस्वीरें' },
  
  'builder.preview': { en: 'Preview', hi: 'प्रीव्यू' },
  'builder.livepreview': { en: 'Live Preview', hi: 'लाइव प्रीव्यू' },
  'builder.template': { en: 'Template', hi: 'टेम्पलेट' },
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
