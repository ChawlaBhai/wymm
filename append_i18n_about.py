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
  'about.p1': { en: 'wymm stands for <strong>Will You Marry Me?</strong> — the four words that change everything. The question every arranged marriage journey is quietly building towards. We named our platform after that moment because we believe every step of the journey deserves the same intention and care as that question itself.', hi: 'wymm का अर्थ है <strong>Will You Marry Me?</strong> — वो चार शब्द जो सब कुछ बदल देते हैं। वो सवाल जिसकी ओर हर अरेंज्ड मैरिज का सफ़र चुपचाप बढ़ता है। हमने अपने प्लेटफ़ॉर्म का नाम इसी पल पर रखा है क्योंकि हमारा मानना है कि सफ़र का हर कदम उसी इरादे और देखभाल का हक़दार है जितना वो सवाल।' },
  'about.p2': { en: 'When a biodata reaches a family, it carries the weight of that question before it\\'s ever asked. We wanted to make that first impression worthy of what it represents.', hi: 'जब एक बायोडाटा किसी परिवार तक पहुँचता है, तो यह उस सवाल का वज़न लेकर जाता है जो कभी पूछा ही नहीं गया। हम चाहते थे कि वह पहली छाप उसके योग्य हो जिसका वह प्रतिनिधित्व करता है।' },
  'about.p3': { en: 'wymm was built by <strong>Sahaj Chawla</strong> — with the belief that every person stepping into this journey deserves a first impression that truly represents them.', hi: 'wymm को <strong>सहज चावला</strong> ने बनाया है — इस विश्वास के साथ कि इस सफ़र में कदम रखने वाले हर व्यक्ति को एक ऐसी पहली छाप का अधिकार है जो सच में उनका प्रतिनिधित्व करे।' },
  'about.p4': { en: 'Most biodata formats in India are treated as administrative forms. Stiff, generic Word documents that strip away personality. We found that people spend months looking for a life partner, but only 5 minutes making the document that represents them to every family.', hi: 'भारत में अधिकांश बायोडाटा प्रारूपों को प्रशासनिक रूपों के रूप में माना जाता है। कठोर, सामान्य Word दस्तावेज़ जो व्यक्तित्व को छीन लेते हैं। हमने पाया कि लोग जीवनसाथी की तलाश में महीनों बिताते हैं, लेकिन उस दस्तावेज़ को बनाने में केवल 5 मिनट लगाते हैं जो उन्हें हर परिवार के सामने प्रस्तुत करता है।' },
  'about.p5': { en: 'We built wymm to change that. Not by adding complexity, but by removing everything that shouldn\\'t be there — and replacing it with intention. A well-designed biodata isn\\'t vanity. It\\'s respect for yourself and the families receiving it.', hi: 'हमने इसे बदलने के लिए wymm बनाया। जटिलता बढ़ाकर नहीं, बल्कि हर उस चीज़ को हटाकर जिसे वहाँ नहीं होना चाहिए — और उसे इरादे के साथ बदलकर। एक अच्छी तरह से डिज़ाइन किया गया बायोडाटा कोई दिखावा नहीं है। यह आपके और इसे प्राप्त करने वाले परिवारों के लिए सम्मान है।' },
  'about.what_built': { en: 'What we built', hi: 'हमने क्या बनाया है' },
  'about.what_title': { en: 'Simple to use. Nothing like what you\\'ve seen.', hi: 'उपयोग में आसान। ऐसा कुछ जो आपने पहले कभी नहीं देखा।' },
  'about.values_title': { en: 'What we stand for', hi: 'हमारा दृष्टिकोण' },
  'about.cta_text': { en: 'If you\\'ve ever felt your biodata didn\\'t do you justice — we made wymm for you.', hi: 'अगर आपको कभी लगा है कि आपका बायोडाटा आपके साथ न्याय नहीं करता — तो हमने आपके लिए wymm बनाया है।' },
  'about.cta_btn': { en: 'Create Your Biodata →', hi: 'अपना बायोडाटा बनाएं →' },
"""

content = content.replace("export const translations: Record<string, Record<Language, string>> = {", f"export const translations: Record<string, Record<Language, string>> = {{{new_translations}")

with open('frontend/src/lib/i18n.ts', 'w') as f:
    f.write(content)
