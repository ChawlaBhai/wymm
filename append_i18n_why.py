with open('frontend/src/lib/i18n.ts', 'r') as f:
    content = f.read()

new_translations = """
  'why.badge': { en: 'Why it matters', hi: 'यह क्यों मायने रखता है' },
  'why.title': { en: 'Because first impressions write futures.', hi: 'क्योंकि पहली छाप भविष्य लिखती है।' },
  'why.p1': { en: 'In India, a biodata travels farther than a resume. It reaches parents in distant cities, relatives you\\'ve never met, families who will judge a person by a page. Most biodatas look like they were made in a hurry — because they were. Generic templates. Misaligned fonts. Information without soul.', hi: 'भारत में, एक बायोडाटा रेज़्यूमे से भी आगे तक जाता है। यह दूर के शहरों में माता-पिता, ऐसे रिश्तेदारों तक पहुँचता है जिनसे आप कभी नहीं मिले, ऐसे परिवार जो एक पन्ने से व्यक्ति का न्याय करेंगे। ज़्यादातर बायोडाटा ऐसे लगते हैं जैसे वे जल्दी में बनाए गए हों — क्योंकि वे थे। सामान्य टेम्प्लेट। गलत फॉन्ट। बिना आत्मा के जानकारी।' },
  'why.p2': { en: 'wymm is different. We built templates that tell your story with the elegance it deserves. Not a form. Not a PDF. A first impression you\\'d actually be proud of.', hi: 'wymm अलग है। हमने ऐसे टेम्प्लेट बनाए हैं जो आपकी कहानी उस सुंदरता के साथ बताते हैं जिसकी वह हक़दार है। एक फॉर्म नहीं। एक PDF नहीं। एक पहली छाप जिस पर आपको सच में गर्व होगा।' },
  'why.before': { en: 'Before wymm', hi: 'wymm से पहले' },
  'why.with': { en: 'With wymm', hi: 'wymm के साथ' },
  'why.vs': { en: 'vs', hi: 'vs' },
"""

content = content.replace("export const translations: Record<string, Record<Language, string>> = {", f"export const translations: Record<string, Record<Language, string>> = {{{new_translations}")

with open('frontend/src/lib/i18n.ts', 'w') as f:
    f.write(content)
