import re

with open('frontend/src/components/landing/HeroSection.tsx', 'r') as f:
    content = f.read()

content = content.replace("export default function HeroSection() {", "export default function HeroSection() {\n  const { t } = useTranslation()")
content = content.replace("<section style={{", "<section className=\"bg-white dark:bg-slate-950 transition-colors duration-300\" style={{")

content = content.replace(">Beautiful biodatas,<", " className=\"text-gray-900 dark:text-white\">{t('landing.title1')}<")
content = content.replace(">crafted with elegance.<", " className=\"text-gray-900 dark:text-white\">{t('landing.title2')}<")
content = content.replace("Create stunning, professional profiles for your marriage proposals in minutes. Free, secure, and easily shareable.", "{t('landing.subtitle')}")
content = content.replace(">Create your biodata now →<", ">{t('landing.cta')} →<")

with open('frontend/src/components/landing/HeroSection.tsx', 'w') as f:
    f.write(content)
