import re

with open('frontend/src/lib/i18n.ts', 'r') as f:
    content = f.read()

repl = """
  // Hero Section Signals
  'hero.signal1': { en: '16 premium templates', hi: '16 प्रीमियम थीम्स' },
  'hero.signal2': { en: 'Share in seconds', hi: 'सेकंडों में शेयर करें' },
  'hero.signal3': { en: 'Free preview', hi: 'मुफ़्त प्रीव्यू' },
"""

content = content.replace("// Landing Page Hero", repl + "\n  // Landing Page Hero")

with open('frontend/src/lib/i18n.ts', 'w') as f:
    f.write(content)
