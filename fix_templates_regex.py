import re

with open('frontend/src/components/landing/TemplatesSection.tsx', 'r') as f:
    content = f.read()

content = re.sub(r">\s*Templates\s*<", ">{t('templates.badge')}<", content)
content = re.sub(r">\s*Choose from 16 beautiful templates\s*<", ">{t('templates.title_home')}<", content)
content = re.sub(r">\s*Every design is fully animated and shareable. Not a PDF — a living profile.\s*<", ">{t('templates.subtitle_home')}<", content)
content = re.sub(r">\s*Try demo\s*<", ">{t('templates.try_demo') || 'Try demo'}<", content)
content = re.sub(r">\s*View all 16 templates →\s*<", ">{t('templates.view_all') || 'View all 16 templates →'}<", content)

content = content.replace("<motion.p\n          initial={{ opacity: 0, y: 10 }}", "<motion.p\n          className=\"text-gray-600 dark:text-gray-300\"\n          initial={{ opacity: 0, y: 10 }}")

# Handle dark mode backgrounds for the cards
content = content.replace("background: isDark ? '#0A0A0A' : 'white',", "background: isDark ? '#0A0A0A' : 'var(--card-bg, white)',")
content = content.replace("color: isDark ? '#FFFFFF' : '#1A1A1A',", "color: isDark ? '#FFFFFF' : 'var(--card-text, #1A1A1A)',")

with open('frontend/src/components/landing/TemplatesSection.tsx', 'w') as f:
    f.write(content)
