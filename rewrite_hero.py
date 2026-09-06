import re

with open('frontend/src/components/landing/HeroSection.tsx', 'r') as f:
    content = f.read()

content = content.replace("['16 premium templates', 'Share in seconds', 'Free preview']", "[t('hero.signal1'), t('hero.signal2'), t('hero.signal3')]")
content = content.replace("background: '#F8F9FB'", "background: 'var(--tw-prose-body, #F8F9FB)'")
content = content.replace("color: '#888'", "color: 'var(--tw-prose-counters, #888)'")

with open('frontend/src/components/landing/HeroSection.tsx', 'w') as f:
    f.write(content)
