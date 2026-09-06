import re
import os

def rewrite_file(filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Add useTranslation import if not there
    if 'useTranslation' not in content:
        content = re.sub(
            r"(import.*from 'react')",
            r"\1\nimport { useTranslation } from '@/lib/i18n'",
            content
        )
        if 'useTranslation' not in content:
            content = "import { useTranslation } from '@/lib/i18n'\n" + content
    
    # Insert { t } = useTranslation() if not there
    if 'const { t } =' not in content:
        content = re.sub(
            r"(export default function \w+\(\) {)",
            r"\1\n  const { t } = useTranslation()",
            content
        )
        
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w') as f:
        f.write(content)

# WhyMattersSection.tsx
rewrite_file('frontend/src/components/landing/WhyMattersSection.tsx', [
    ('background: \'#FAFAFA\'', 'background: \'#FAFAFA\''), # Handled via classes
    ('className="py-24"', 'className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-300"'),
    ('color: \'#7C3AED\'', 'color: \'#A855F7\''), # better contrast maybe? Keep it
    ('>OUR STORY<', '>{t(\'why.subtitle\')}<'),
    ('Four words that ', '{t(\'why.title1\')}'),
    ('change<br />everything.', '{t(\'why.title2\')}'),
    ('color: \'#1A1A1A\'', ''), # Let class handle it
    ('color: \'#666\'', ''), # let class handle it
    ('className="text-center"', 'className="text-center text-gray-900 dark:text-white transition-colors"'),
    ('className="text-lg md:text-xl text-gray-600', 'className="text-lg md:text-xl text-gray-600 dark:text-gray-300 transition-colors'),
    ('Will You Marry Me? — wymm was built for the journey that leads to that question.', '{t(\'why.desc\')}'),
])

# HowItWorksSection.tsx
rewrite_file('frontend/src/components/landing/HowItWorksSection.tsx', [
    ('background: \'white\'', ''),
    ('className="py-24 relative overflow-hidden"', 'className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"'),
    ('>HOW IT WORKS<', '>{t(\'how.subtitle\')}<'),
    ('>Three minutes. One beautiful biodata.<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'how.title\')}<'),
    ('>1. Tell us about yourself<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'how.step1.title\')}<'),
    ('>Fill out a simple, intuitive form with your personal, professional, and family details.<', ' className="text-gray-600 dark:text-gray-400 transition-colors">{t(\'how.step1.desc\')}<'),
    ('>2. Choose a design<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'how.step2.title\')}<'),
    ('>Select from 16 premium templates crafted by professional designers to suit every personality.<', ' className="text-gray-600 dark:text-gray-400 transition-colors">{t(\'how.step2.desc\')}<'),
    ('>3. Download & Share<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'how.step3.title\')}<'),
    ('>Get an instant, pixel-perfect PDF or a private web link to share securely with families.<', ' className="text-gray-600 dark:text-gray-400 transition-colors">{t(\'how.step3.desc\')}<'),
    ('color: \'#1A1A1A\'', ''),
    ('color: \'#666\'', ''),
])

# FeaturesSection.tsx
rewrite_file('frontend/src/components/landing/FeaturesSection.tsx', [
    ('className="py-24 bg-gray-50"', 'className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-300"'),
    ('>WHY WYMM?<', '>{t(\'features.subtitle\')}<'),
    ('>Thoughtfully designed for modern Indian families.<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'features.title\')}<'),
    ('>Privacy First<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'features.f1.title\')}<'),
    ('>Your data is encrypted. You control who sees your profile and when to take it down.<', ' className="text-gray-600 dark:text-gray-400 transition-colors">{t(\'features.f1.desc\')}<'),
    ('>16 Premium Themes<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'features.f2.title\')}<'),
    ('>From minimalist to deeply cultural. We have a design that perfectly represents you.<', ' className="text-gray-600 dark:text-gray-400 transition-colors">{t(\'features.f2.desc\')}<'),
    ('>Always Free<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'features.f3.title\')}<'),
    ('>No watermarks. No hidden charges. Create and download your biodata for absolutely free.<', ' className="text-gray-600 dark:text-gray-400 transition-colors">{t(\'features.f3.desc\')}<'),
    ('color: \'#1A1A1A\'', ''),
    ('color: \'#666\'', ''),
    ('background: \'white\'', ''),
    ('boxShadow: \'0 12px 32px rgba(0,0,0,0.04)\'', 'boxShadow: \'0 12px 32px rgba(0,0,0,0.04)\', background: \'var(--tw-bg-opacity, 1) rgba(255, 255, 255, var(--tw-bg-opacity))\''), # Let dark mode handle it by adding className
    ('style={{ padding: 40, borderRadius: 24,', 'className="bg-white dark:bg-slate-800 transition-colors duration-300" style={{ padding: 40, borderRadius: 24, border: \'1px solid rgba(124,58,237,0.1)\','),
])

# TemplatesSection.tsx
rewrite_file('frontend/src/components/landing/TemplatesSection.tsx', [
    ('className="py-24 relative overflow-hidden"', 'className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"'),
    ('>OUR TEMPLATES<', '>{t(\'templates.subtitle\')}<'),
    ('>A design for every personality.<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'templates.title\')}<'),
    ('>Whether you prefer modern minimalism or cultural elegance, find the perfect canvas for your story.<', ' className="text-gray-600 dark:text-gray-400 transition-colors">{t(\'templates.desc\')}<'),
    ('>Browse all templates →<', '>{t(\'templates.btn\')}<'),
    ('color: \'#1A1A1A\'', ''),
    ('color: \'#666\'', ''),
])

# TestimonialsSection.tsx
rewrite_file('frontend/src/components/landing/TestimonialsSection.tsx', [
    ('background: \'#FAFAFA\'', ''),
    ('className="py-24"', 'className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-300"'),
    ('>Loved by families across India.<', ' className="text-gray-900 dark:text-white transition-colors">{t(\'testimonials.title\')}<'),
    ('>"The templates are incredibly elegant. It made sharing my profile with families feel so much more professional and respectful."<', ' className="text-gray-700 dark:text-gray-300 transition-colors">{t(\'testimonials.t1\')}<'),
    ('>"I loved how easy it was to use. Created a beautiful PDF on my phone in 5 minutes while commuting!"<', ' className="text-gray-700 dark:text-gray-300 transition-colors">{t(\'testimonials.t2\')}<'),
    ('background: \'white\'', ''),
    ('style={{ padding: 40, borderRadius: 24,', 'className="bg-white dark:bg-slate-800 transition-colors duration-300" style={{ padding: 40, borderRadius: 24,'),
    ('color: \'#1A1A1A\'', ''),
    ('color: \'#666\'', ''),
    ('color: \'#333\'', ''),
])

# CTABannerSection.tsx
rewrite_file('frontend/src/components/landing/CTABannerSection.tsx', [
    ('className="py-24 relative overflow-hidden"', 'className="py-24 relative overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300"'),
    ('Your story is worth', '{t(\'cta.title1\')}'),
    ('telling well.', '{t(\'cta.title2\')}'),
    ('Free forever. No account needed. Ready in minutes.', '{t(\'cta.desc\')}'),
    ('Create My Biodata →', '{t(\'cta.btn\')}'),
    ('Join thousands of families across India', '{t(\'cta.trust\')}'),
    ('color: \'#1A1A1A\'', ''),
    ('color: \'#666\'', 'color: \'var(--tw-prose-body)\''),
    ('color: \'#AAA\'', 'color: \'var(--tw-prose-counters)\''),
])

# Footer.tsx
rewrite_file('frontend/src/components/landing/Footer.tsx', [
    ('background: \'#F8F9FB\'', ''),
    ('<footer style={{', '<footer className="bg-gray-50 dark:bg-slate-900 transition-colors duration-300" style={{'),
    ('The biodata that speaks for you.', '{t(\'footer.desc\')}'),
    ('>Product<', '>{t(\'footer.product\')}<'),
    ('>Legal<', '>{t(\'footer.legal\')}<'),
    ('>Contact<', '>{t(\'footer.contact\')}<'),
    ('{label: \'Templates\',', '{label: t(\'footer.templates\'),'),
    ('{label: \'How it works\',', '{label: t(\'footer.how\'),'),
    ('{label: \'Manage Profiles\',', '{label: t(\'footer.manage\'),'),
    ('{label: \'About\',', '{label: t(\'footer.about\'),'),
    ('{label: \'Privacy Policy\',', '{label: t(\'footer.privacy\'),'),
    ('{label: \'Terms of Service\',', '{label: t(\'footer.terms\'),'),
    ('{label: \'Refund Policy\',', '{label: t(\'footer.refund\'),'),
    ('>Get in touch<', '>{t(\'footer.getintouch\')}<'),
    ('Made with ♥ in India · © 2025 wymm', '{t(\'footer.madein\')}'),
    ('borderTop: \'1px solid #E8E8E8\'', 'borderTop: \'1px solid rgba(150,150,150,0.2)\''),
])

print("Finished rewriting files")
