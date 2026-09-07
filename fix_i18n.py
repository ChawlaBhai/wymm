import re

with open('frontend/src/lib/i18n.ts', 'r') as f:
    content = f.read()

new_translations = """
  'about.badge': { en: 'Our Story', hi: 'हमारी कहानी' },
  'about.title_prefix': { en: 'Four words that', hi: 'चार शब्द जो' },
  'about.title_highlight': { en: 'change everything.', hi: 'सब कुछ बदल देते हैं।' },
  'about.title_full': { en: 'Four words that change everything.', hi: 'चार शब्द जो सब कुछ बदल देते हैं।' },
  'about.subtitle': { en: 'Will You Marry Me? — wymm was built for the journey that leads to that question.', hi: 'क्या तुम मुझसे शादी करोगी? — wymm उस सफ़र के लिए बनाया गया है जो इस सवाल तक ले जाता है।' },
  'about.why_badge': { en: 'Why wymm?', hi: 'wymm ही क्यों?' },
  'about.p1': { en: 'wymm stands for Will You Marry Me? — the four words that change everything. The question every arranged marriage journey is quietly building towards. We named our platform after that moment because we believe every step of the journey deserves the same intention and care as that question itself.', hi: 'wymm का अर्थ है Will You Marry Me? — वो चार शब्द जो सब कुछ बदल देते हैं। वो सवाल जिसकी ओर हर अरेंज्ड मैरिज का सफ़र चुपचाप बढ़ता है। हमने अपने प्लेटफ़ॉर्म का नाम इसी पल पर रखा है क्योंकि हमारा मानना है कि सफ़र का हर कदम उसी इरादे और देखभाल का हक़दार है जितना वो सवाल।' },
  'about.p2': { en: 'When a biodata reaches a family, it carries the weight of that question before it\\'s ever asked. We wanted to make that first impression worthy of what it represents.', hi: 'जब एक बायोडाटा किसी परिवार तक पहुँचता है, तो यह उस सवाल का वज़न लेकर जाता है जो कभी पूछा ही नहीं गया। हम चाहते थे कि वह पहली छाप उसके योग्य हो जिसका वह प्रतिनिधित्व करता है।' },
  'about.p3': { en: 'wymm was built by Sahaj Chawla — with the belief that every person stepping into this journey deserves a first impression that truly represents them.', hi: 'wymm को सहज चावला ने बनाया है — इस विश्वास के साथ कि इस सफ़र में कदम रखने वाले हर व्यक्ति को एक ऐसी पहली छाप का अधिकार है जो सच में उनका प्रतिनिधित्व करे।' },
  'about.p4': { en: 'Most biodata formats in India are treated as administrative forms. Stiff, generic Word documents that strip away personality. We found that people spend months looking for a life partner, but only 5 minutes making the document that represents them to every family.', hi: 'भारत में अधिकांश बायोडाटा प्रारूपों को प्रशासनिक रूपों के रूप में माना जाता है। कठोर, सामान्य Word दस्तावेज़ जो व्यक्तित्व को छीन लेते हैं। हमने पाया कि लोग जीवनसाथी की तलाश में महीनों बिताते हैं, लेकिन उस दस्तावेज़ को बनाने में केवल 5 मिनट लगाते हैं जो उन्हें हर परिवार के सामने प्रस्तुत करता है।' },
  'about.p5': { en: 'We built wymm to change that. Not by adding complexity, but by removing everything that shouldn\\'t be there — and replacing it with intention. A well-designed biodata isn\\'t vanity. It\\'s respect for yourself and the families receiving it.', hi: 'हमने इसे बदलने के लिए wymm बनाया। जटिलता बढ़ाकर नहीं, बल्कि हर उस चीज़ को हटाकर जिसे वहाँ नहीं होना चाहिए — और उसे इरादे के साथ बदलकर। एक अच्छी तरह से डिज़ाइन किया गया बायोडाटा कोई दिखावा नहीं है। यह आपके और इसे प्राप्त करने वाले परिवारों के लिए सम्मान है।' },
  'about.what_built': { en: 'What we built', hi: 'हमने क्या बनाया है' },
  'about.what_title': { en: 'Simple to use. Nothing like what you\\'ve seen.', hi: 'उपयोग में आसान। ऐसा कुछ जो आपने पहले कभी नहीं देखा।' },
  'about.values_title': { en: 'What we stand for', hi: 'हमारा दृष्टिकोण' },
  'about.cta_text': { en: 'If you\\'ve ever felt your biodata didn\\'t do you justice — we made wymm for you.', hi: 'अगर आपको कभी लगा है कि आपका बायोडाटा आपके साथ न्याय नहीं करता — तो हमने आपके लिए wymm बनाया है।' },
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
  'why.p1': { en: 'In India, a biodata travels farther than a resume. It reaches parents in distant cities, relatives you\\'ve never met, families who will judge a person by a page. Most biodatas look like they were made in a hurry — because they were. Generic templates. Misaligned fonts. Information without soul.', hi: 'भारत में, एक बायोडाटा रेज़्यूमे से भी आगे तक जाता है। यह दूर के शहरों में माता-पिता, ऐसे रिश्तेदारों तक पहुँचता है जिनसे आप कभी नहीं मिले, ऐसे परिवार जो एक पन्ने से व्यक्ति का न्याय करेंगे। ज़्यादातर बायोडाटा ऐसे लगते हैं जैसे वे जल्दी में बनाए गए हों — क्योंकि वे थे। सामान्य टेम्प्लेट। गलत फॉन्ट। बिना आत्मा के जानकारी।' },
  'why.p2': { en: 'wymm is different. We built templates that tell your story with the elegance it deserves. Not a form. Not a PDF. A first impression you\\'d actually be proud of.', hi: 'wymm अलग है। हमने ऐसे टेम्प्लेट बनाए हैं जो आपकी कहानी उस सुंदरता के साथ बताते हैं जिसकी वह हक़दार है। एक फॉर्म नहीं। एक PDF नहीं। एक पहली छाप जिस पर आपको सच में गर्व होगा।' },
  'why.before': { en: 'Before wymm', hi: 'wymm से पहले' },
  'why.with': { en: 'With wymm', hi: 'wymm के साथ' },
  'why.vs': { en: 'vs', hi: 'बनाम' },

  'templates.badge': { en: 'Templates', hi: 'टेम्प्लेट्स' },
  'templates.title_home': { en: 'Choose from 16 beautiful templates', hi: '16 खूबसूरत टेम्प्लेट में से चुनें' },
  'templates.subtitle_home': { en: 'Every design is fully animated and shareable. Not a PDF — a living profile.', hi: 'हर डिज़ाइन पूरी तरह से एनिमेटेड और साझा करने योग्य है। एक पीडीएफ नहीं — एक जीवंत प्रोफ़ाइल।' },
  'testimonials.badge': { en: 'Testimonials', hi: 'प्रशंसापत्र' },
  'testimonials.title': { en: 'Your story is worth telling well.', hi: 'आपकी कहानी अच्छे से बताने लायक है।' },
  'testimonials.subtitle': { en: 'Free forever. No account needed. Ready in minutes.', hi: 'हमेशा के लिए मुफ़्त। किसी खाते की आवश्यकता नहीं है। मिनटों में तैयार।' },
"""

content = content.replace("export const translations: Translations = {", f"export const translations: Translations = {{\n{new_translations}")

with open('frontend/src/lib/i18n.ts', 'w') as f:
    f.write(content)
