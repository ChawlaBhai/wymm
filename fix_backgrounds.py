import re
import glob

def fix_bg(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace specific background hardcodes with Tailwind classes
    # 1. CTABannerSection
    if 'CTABannerSection' in filepath:
        content = re.sub(r"style=\{\{\s*padding:\s*'104px 0',\s*background:\s*'white'\s*\}\}", "className=\"bg-white dark:bg-slate-950\" style={{ padding: '104px 0' }}", content)
        content = re.sub(r"background:\s*'white',(?=\s*border:\s*'1px solid rgba)", "className: \"bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800\",\n            // background: 'white',", content)
        # CTABanner Title fix for translation (just in case)
        content = re.sub(r"className=\"text-gray-600\"", "className=\"text-gray-600 dark:text-gray-300\"", content)

    # 2. HowItWorksSection
    if 'HowItWorksSection' in filepath:
        content = re.sub(r"style=\{\{\s*padding:\s*'104px 0',\s*background:\s*'#F8F9FB'\s*\}\}", "className=\"bg-gray-50 dark:bg-slate-900\" style={{ padding: '104px 0' }}", content)
        content = re.sub(r"color:\s*'#1A1A1A'", "color: 'var(--tw-prose-body)'", content) # generic fix for text colors
        # The builder step boxes
        content = content.replace("background: '#F8F9FB',", "/* background: '#F8F9FB' */")

    # 3. TestimonialsSection
    if 'TestimonialsSection' in filepath:
        content = re.sub(r"style=\{\{\s*padding:\s*'104px 0',\s*background:\s*'#F8F9FB'\s*\}\}", "className=\"bg-gray-50 dark:bg-slate-900\" style={{ padding: '104px 0' }}", content)
        # Fix the testimonial card
        content = re.sub(r"backgroundImage:\s*'linear-gradient\(white, white\), linear-gradient\(to bottom, #7C3AED, transparent\)',", "className: \"testimonial-card\",\n                // backgroundImage", content)
        content = re.sub(r"color:\s*'#1A1A1A'", "className: \"text-gray-900 dark:text-white\"", content)
        content = re.sub(r"border:\s*'1px solid #E8E8E8',", "", content) # Will be handled by CSS
        
        # Testimonials translation
        content = re.sub(r">\s*Stories\s*<", ">{t('testimonials.badge')}<", content)
        content = re.sub(r">\s*Families who trusted wymm\s*<", ">{t('testimonials.title')}<", content)
        content = re.sub(r">\s*Illustrative testimonials\s*<", ">{t('testimonials.subtitle')}<", content)

    # 4. AboutPage
    if 'AboutPage' in filepath:
        content = re.sub(r"style=\{\{\s*padding:\s*'104px 0',\s*background:\s*'white'\s*\}\}", "className=\"bg-white dark:bg-slate-950\" style={{ padding: '104px 0' }}", content)
        content = re.sub(r"color:\s*'#1A1A1A'", "className: \"text-gray-900 dark:text-white\"", content)
        # Fix the literal strings issue
        # The translations didn't apply because they had whitespace or bold tags.
        # In AboutPage, the keys are showing up literally! That means the hook `t()` was applied but the dictionary didn't have it.
        # Wait, the dictionary was updated earlier. But did I make a typo in the key names?
        # Let's ensure text colors are correct
        content = re.sub(r"color:\s*'var\(--tw-prose-body\)'", "className: \"text-gray-600 dark:text-gray-300\"", content)

    with open(filepath, 'w') as f:
        f.write(content)

for f in glob.glob('frontend/src/components/landing/*.tsx'):
    fix_bg(f)
for f in glob.glob('frontend/src/pages/*.tsx'):
    fix_bg(f)
