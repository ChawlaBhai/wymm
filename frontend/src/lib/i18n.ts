import { useCallback } from 'react'
import { useAppStore } from '@/store/appStore'

type Translations = Record<string, Record<'en' | 'hi', string>>

export const translations: Translations = {

  'templates.title': { en: 'Choose your template', hi: 'अपना टेम्प्लेट चुनें' },
  'templates.subtitle': { en: 'Find the perfect design for your biodata.', hi: 'अपने बायोडाटा के लिए सही डिज़ाइन खोजें।' },
  'filter.all': { en: 'All', hi: 'सभी' },
  'filter.modern': { en: 'Modern', hi: 'आधुनिक' },
  'filter.classic': { en: 'Classic', hi: 'क्लासिक' },
  'filter.elegant': { en: 'Elegant', hi: 'सुरुचिपूर्ण' },
  'filter.premium': { en: 'Premium', hi: 'प्रीमियम' },
  'templates.use': { en: 'Use Template', hi: 'टेम्प्लेट का उपयोग करें' },
  'templates.preview': { en: 'Preview', hi: 'प्रीव्यू' },


  'about.badge': { en: 'Our Story', hi: 'हमारी कहानी' },
  'about.title_prefix': { en: 'Four words that', hi: 'चार शब्द जो' },
  'about.title_highlight': { en: 'change everything.', hi: 'सब कुछ बदल देते हैं।' },
  'about.title_full': { en: 'Four words that change everything.', hi: 'चार शब्द जो सब कुछ बदल देते हैं।' },
  'about.subtitle': { en: 'Will You Marry Me? — wymm was built for the journey that leads to that question.', hi: 'क्या तुम मुझसे शादी करोगी? — wymm उस सफ़र के लिए बनाया गया है जो इस सवाल तक ले जाता है।' },
  'about.why_badge': { en: 'Why wymm?', hi: 'wymm ही क्यों?' },
  'about.p1': { en: 'wymm stands for Will You Marry Me? — the four words that change everything. The question every arranged marriage journey is quietly building towards. We named our platform after that moment because we believe every step of the journey deserves the same intention and care as that question itself.', hi: 'wymm का अर्थ है Will You Marry Me? — वो चार शब्द जो सब कुछ बदल देते हैं। वो सवाल जिसकी ओर हर अरेंज्ड मैरिज का सफ़र चुपचाप बढ़ता है। हमने अपने प्लेटफ़ॉर्म का नाम इसी पल पर रखा है क्योंकि हमारा मानना है कि सफ़र का हर कदम उसी इरादे और देखभाल का हक़दार है जितना वो सवाल।' },
  'about.p2': { en: 'When a biodata reaches a family, it carries the weight of that question before it\'s ever asked. We wanted to make that first impression worthy of what it represents.', hi: 'जब एक बायोडाटा किसी परिवार तक पहुँचता है, तो यह उस सवाल का वज़न लेकर जाता है जो कभी पूछा ही नहीं गया। हम चाहते थे कि वह पहली छाप उसके योग्य हो जिसका वह प्रतिनिधित्व करता है।' },
  'about.p3': { en: 'wymm was built by Sahaj Chawla — with the belief that every person stepping into this journey deserves a first impression that truly represents them.', hi: 'wymm को सहज चावला ने बनाया है — इस विश्वास के साथ कि इस सफ़र में कदम रखने वाले हर व्यक्ति को एक ऐसी पहली छाप का अधिकार है जो सच में उनका प्रतिनिधित्व करे।' },
  'about.p4': { en: 'Most biodata formats in India are treated as administrative forms. Stiff, generic Word documents that strip away personality. We found that people spend months looking for a life partner, but only 5 minutes making the document that represents them to every family.', hi: 'भारत में अधिकांश बायोडाटा प्रारूपों को प्रशासनिक रूपों के रूप में माना जाता है। कठोर, सामान्य Word दस्तावेज़ जो व्यक्तित्व को छीन लेते हैं। हमने पाया कि लोग जीवनसाथी की तलाश में महीनों बिताते हैं, लेकिन उस दस्तावेज़ को बनाने में केवल 5 मिनट लगाते हैं जो उन्हें हर परिवार के सामने प्रस्तुत करता है।' },
  'about.p5': { en: 'We built wymm to change that. Not by adding complexity, but by removing everything that shouldn\'t be there — and replacing it with intention. A well-designed biodata isn\'t vanity. It\'s respect for yourself and the families receiving it.', hi: 'हमने इसे बदलने के लिए wymm बनाया। जटिलता बढ़ाकर नहीं, बल्कि हर उस चीज़ को हटाकर जिसे वहाँ नहीं होना चाहिए — और उसे इरादे के साथ बदलकर। एक अच्छी तरह से डिज़ाइन किया गया बायोडाटा कोई दिखावा नहीं है। यह आपके और इसे प्राप्त करने वाले परिवारों के लिए सम्मान है।' },
  'about.what_built': { en: 'What we built', hi: 'हमने क्या बनाया है' },
  'about.what_title': { en: 'Simple to use. Nothing like what you\'ve seen.', hi: 'उपयोग में आसान। ऐसा कुछ जो आपने पहले कभी नहीं देखा।' },
  'about.values_title': { en: 'What we stand for', hi: 'हमारा दृष्टिकोण' },
  'about.cta_text': { en: 'If you\'ve ever felt your biodata didn\'t do you justice — we made wymm for you.', hi: 'अगर आपको कभी लगा है कि आपका बायोडाटा आपके साथ न्याय नहीं करता — तो हमने आपके लिए wymm बनाया है।' },
  'about.cta_btn': { en: 'Create Your Biodata →', hi: 'अपना बायोडाटा बनाएं →' },

  'how.badge': { en: 'How it works', hi: 'यह कैसे काम करता है' },
  'how.step1.title': { en: 'Choose your canvas', hi: 'अपना कैनवास चुनें' },
  'how.step1.desc': { en: 'Five templates, five personalities. Modern Minimal, Refined Elegance, Professional Premium, Cultural Grace, The Modernist. Pick the one that feels like you.', hi: 'पाँच टेम्प्लेट, पाँच व्यक्तित्व। मॉडर्न मिनिमल, रिफाइंड एलिगेंस, प्रोफेशनल प्रीमियम, कल्चरल ग्रेस, द मॉडर्निस्ट। उसे चुनें जो आपको सही लगे।' },
  'how.step2.title': { en: 'Tell your story', hi: 'अपनी कहानी बताएं' },
  'how.step2.desc': { en: 'A guided six-step builder that asks the right questions — not a generic form, but a thoughtful conversation about who you are.', hi: 'छह-चरणों वाला बिल्डर जो सही सवाल पूछता है — एक सामान्य फॉर्म नहीं, बल्कि इस बारे में एक विचारशील बातचीत कि आप कौन हैं।' },
  'how.step3.title': { en: 'Share with confidence', hi: 'विश्वास के साथ साझा करें' },
  'how.step3.desc': { en: 'Get a beautiful link and QR code in seconds. Share on WhatsApp, email it to families, print it — however you reach people.', hi: 'सेकंड में एक सुंदर लिंक और QR कोड प्राप्त करें। व्हाट्सएप पर साझा करें, परिवारों को ईमेल करें, प्रिंट करें — जैसे भी आप लोगों तक पहुँचें।' },

  'why.badge': { en: 'Why it matters', hi: 'यह क्यों मायने रखता है' },
  'why.title': { en: 'Because first impressions write futures.', hi: 'क्योंकि पहली छाप भविष्य लिखती है।' },
  'why.p1': { en: 'In India, a biodata travels farther than a resume. It reaches parents in distant cities, relatives you\'ve never met, families who will judge a person by a page. Most biodatas look like they were made in a hurry — because they were. Generic templates. Misaligned fonts. Information without soul.', hi: 'भारत में, एक बायोडाटा रेज़्यूमे से भी आगे तक जाता है। यह दूर के शहरों में माता-पिता, ऐसे रिश्तेदारों तक पहुँचता है जिनसे आप कभी नहीं मिले, ऐसे परिवार जो एक पन्ने से व्यक्ति का न्याय करेंगे। ज़्यादातर बायोडाटा ऐसे लगते हैं जैसे वे जल्दी में बनाए गए हों — क्योंकि वे थे। सामान्य टेम्प्लेट। गलत फॉन्ट। बिना आत्मा के जानकारी।' },
  'why.p2': { en: 'wymm is different. We built templates that tell your story with the elegance it deserves. Not a form. Not a PDF. A first impression you\'d actually be proud of.', hi: 'wymm अलग है। हमने ऐसे टेम्प्लेट बनाए हैं जो आपकी कहानी उस सुंदरता के साथ बताते हैं जिसकी वह हक़दार है। एक फॉर्म नहीं। एक PDF नहीं। एक पहली छाप जिस पर आपको सच में गर्व होगा।' },
  'why.before': { en: 'Before wymm', hi: 'wymm से पहले' },
  'why.with': { en: 'With wymm', hi: 'wymm के साथ' },
  'why.vs': { en: 'vs', hi: 'बनाम' },

  'templates.badge': { en: 'Templates', hi: 'टेम्प्लेट्स' },
  'templates.title_home': { en: 'Choose from 16 beautiful templates', hi: '16 खूबसूरत टेम्प्लेट में से चुनें' },
  'templates.subtitle_home': { en: 'Every design is fully animated and shareable. Not a PDF — a living profile.', hi: 'हर डिज़ाइन पूरी तरह से एनिमेटेड और साझा करने योग्य है। एक पीडीएफ नहीं — एक जीवंत प्रोफ़ाइल।' },
  'testimonials.badge': { en: 'Testimonials', hi: 'प्रशंसापत्र' },
  'testimonials.title': { en: 'Your story is worth telling well.', hi: 'आपकी कहानी अच्छे से बताने लायक है।' },
  'testimonials.subtitle': { en: 'Free forever. No account needed. Ready in minutes.', hi: 'हमेशा के लिए मुफ़्त। किसी खाते की आवश्यकता नहीं है। मिनटों में तैयार।' },

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

  const t = useCallback((key: string): string => {
    const translation = translations[key]
    if (!translation) {
      console.warn(`Missing translation key: ${key}`)
      return key
    }
    return translation[language] || translation.en
  }, [language])

  return { t, language }
}
