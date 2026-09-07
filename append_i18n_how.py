with open('frontend/src/lib/i18n.ts', 'r') as f:
    content = f.read()

new_translations = """
  'how.badge': { en: 'How it works', hi: 'यह कैसे काम करता है' },
  'how.step1.title': { en: 'Choose your canvas', hi: 'अपना कैनवास चुनें' },
  'how.step1.desc': { en: 'Five templates, five personalities. Modern Minimal, Refined Elegance, Professional Premium, Cultural Grace, The Modernist. Pick the one that feels like you.', hi: 'पाँच टेम्प्लेट, पाँच व्यक्तित्व। मॉडर्न मिनिमल, रिफाइंड एलिगेंस, प्रोफेशनल प्रीमियम, कल्चरल ग्रेस, द मॉडर्निस्ट। उसे चुनें जो आपको सही लगे।' },
  'how.step2.title': { en: 'Tell your story', hi: 'अपनी कहानी बताएं' },
  'how.step2.desc': { en: 'A guided six-step builder that asks the right questions — not a generic form, but a thoughtful conversation about who you are.', hi: 'छह-चरणों वाला बिल्डर जो सही सवाल पूछता है — एक सामान्य फॉर्म नहीं, बल्कि इस बारे में एक विचारशील बातचीत कि आप कौन हैं।' },
  'how.step3.title': { en: 'Share with confidence', hi: 'विश्वास के साथ साझा करें' },
  'how.step3.desc': { en: 'Get a beautiful link and QR code in seconds. Share on WhatsApp, email it to families, print it — however you reach people.', hi: 'सेकंड में एक सुंदर लिंक और QR कोड प्राप्त करें। व्हाट्सएप पर साझा करें, परिवारों को ईमेल करें, प्रिंट करें — जैसे भी आप लोगों तक पहुँचें।' },
"""

content = content.replace("export const translations: Record<string, Record<Language, string>> = {", f"export const translations: Record<string, Record<Language, string>> = {{{new_translations}")

with open('frontend/src/lib/i18n.ts', 'w') as f:
    f.write(content)
