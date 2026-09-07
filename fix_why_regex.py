import re

with open('frontend/src/components/landing/WhyMattersSection.tsx', 'r') as f:
    content = f.read()

content = re.sub(r">\s*Why it matters\s*<", ">{t('why.badge')}<", content)
content = re.sub(r">\s*Before wymm\s*<", ">{t('why.before')}<", content)
content = re.sub(r">\s*With wymm\s*<", ">{t('why.with')}<", content)
content = re.sub(r">\s*vs\s*<", ">{t('why.vs')}<", content)

with open('frontend/src/components/landing/WhyMattersSection.tsx', 'w') as f:
    f.write(content)
