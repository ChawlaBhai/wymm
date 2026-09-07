import re

with open('frontend/src/pages/AboutPage.tsx', 'r') as f:
    content = f.read()

# Make sure useTranslation is imported
if 'import { useTranslation } from' not in content:
    content = content.replace("import { Link } from 'react-router-dom'", "import { Link } from 'react-router-dom'\nimport { useTranslation } from '@/lib/i18n'")

# Ensure useTranslation is inside AboutPage component
if 'const { t } = useTranslation()' not in content:
    content = content.replace("export default function AboutPage() {", "export default function AboutPage() {\n  const { t } = useTranslation()")

# Now replace hardcoded texts.
# Wait, I can just inject t() wrapping around literal strings in the tsx.
content = content.replace('Our Story', "{t('about.badge') || 'Our Story'}")
content = content.replace('Four words that <span className="text-gradient-purple">change everything.</span>', "{t('about.title_prefix') || 'Four words that'} <span className=\"text-gradient-purple\">{t('about.title_highlight') || 'change everything.'}</span>")
content = content.replace('Four words that change everything.', "{t('about.title_full') || 'Four words that change everything.'}")
content = content.replace('Will You Marry Me? — wymm was built for the journey that leads to that question.', "{t('about.subtitle') || 'Will You Marry Me? — wymm was built for the journey that leads to that question.'}")
content = content.replace('Why wymm?', "{t('about.why_badge') || 'Why wymm?'}")
content = content.replace('wymm stands for <strong>Will You Marry Me?</strong> — the four words that change everything. The question every arranged marriage journey is quietly building towards. We named our platform after that moment because we believe every step of the journey deserves the same intention and care as that question itself.', "{t('about.p1') || 'wymm stands for <strong>Will You Marry Me?</strong> — the four words that change everything. The question every arranged marriage journey is quietly building towards. We named our platform after that moment because we believe every step of the journey deserves the same intention and care as that question itself.'}")
content = content.replace("When a biodata reaches a family, it carries the weight of that question before it's ever asked. We wanted to make that first impression worthy of what it represents.", "{t('about.p2') || 'When a biodata reaches a family, it carries the weight of that question before it\\'s ever asked. We wanted to make that first impression worthy of what it represents.'}")
content = content.replace("wymm was built by <strong>Sahaj Chawla</strong> — with the belief that every person stepping into this journey deserves a first impression that truly represents them.", "{t('about.p3') || 'wymm was built by <strong>Sahaj Chawla</strong> — with the belief that every person stepping into this journey deserves a first impression that truly represents them.'}")
content = content.replace("Most biodata formats in India are treated as administrative forms. Stiff, generic Word documents that strip away personality. We found that people spend months looking for a life partner, but only 5 minutes making the document that represents them to every family.", "{t('about.p4') || 'Most biodata formats in India are treated as administrative forms. Stiff, generic Word documents that strip away personality. We found that people spend months looking for a life partner, but only 5 minutes making the document that represents them to every family.'}")
content = content.replace("We built wymm to change that. Not by adding complexity, but by removing everything that shouldn't be there — and replacing it with intention. A well-designed biodata isn't vanity. It's respect for yourself and the families receiving it.", "{t('about.p5') || 'We built wymm to change that. Not by adding complexity, but by removing everything that shouldn\\'t be there — and replacing it with intention. A well-designed biodata isn\\'t vanity. It\\'s respect for yourself and the families receiving it.'}")

content = content.replace('What we built', "{t('about.what_built') || 'What we built'}")
content = content.replace("Simple to use. Nothing like you've seen.", "{t('about.what_title') || 'Simple to use. Nothing like you\\'ve seen.'}")
content = content.replace("Simple to use. Nothing like what you've seen.", "{t('about.what_title') || 'Simple to use. Nothing like what you\\'ve seen.'}")

content = content.replace('What we stand for', "{t('about.values_title') || 'What we stand for'}")
content = content.replace("If you've ever felt your biodata didn't do you justice — we made wymm for you.", "{t('about.cta_text') || 'If you\\'ve ever felt your biodata didn\\'t do you justice — we made wymm for you.'}")
content = content.replace('Create Your Biodata →', "{t('about.cta_btn') || 'Create Your Biodata →'}")

with open('frontend/src/pages/AboutPage.tsx', 'w') as f:
    f.write(content)
