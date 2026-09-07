import re

with open('frontend/src/lib/i18n.ts', 'r') as f:
    content = f.read()

new_translations = """
  'templates.title': { en: 'Choose your template', hi: 'अपना टेम्प्लेट चुनें' },
  'templates.subtitle': { en: 'Find the perfect design for your biodata.', hi: 'अपने बायोडाटा के लिए सही डिज़ाइन खोजें।' },
  'filter.all': { en: 'All', hi: 'सभी' },
  'filter.modern': { en: 'Modern', hi: 'आधुनिक' },
  'filter.classic': { en: 'Classic', hi: 'क्लासिक' },
  'filter.elegant': { en: 'Elegant', hi: 'सुरुचिपूर्ण' },
  'filter.premium': { en: 'Premium', hi: 'प्रीमियम' },
  'templates.use': { en: 'Use Template', hi: 'टेम्प्लेट का उपयोग करें' },
  'templates.preview': { en: 'Preview', hi: 'प्रीव्यू' },
"""
content = content.replace("export const translations: Translations = {", f"export const translations: Translations = {{\n{new_translations}")

with open('frontend/src/lib/i18n.ts', 'w') as f:
    f.write(content)
