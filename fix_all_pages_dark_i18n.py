import os
import re

# We will just strip inline colors and backgrounds that conflict with dark mode
# and rely on the global text-slate-900 dark:text-white

def strip_hardcoded_colors(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace specific hardcoded styles that break dark mode
    content = content.replace("background: '#FFFFFF'", "/* bg-white */")
    content = content.replace("background: '#FAFAFA'", "/* bg-gray-50 */")
    content = content.replace("background: '#F8F5FF'", "/* bg-purple-50 */")
    content = content.replace("color: '#1A1A1A'", "/* text-gray-900 */")
    content = content.replace("color: '#444'", "/* text-gray-700 */")
    content = content.replace("color: '#666'", "/* text-gray-500 */")
    content = content.replace("color: '#888'", "/* text-gray-400 */")
    content = content.replace("border: '1px solid #E8E8E8'", "/* border-gray-200 */")
    content = content.replace("borderTop: '1px solid #F0F0F0'", "/* border-gray-100 */")
    content = content.replace("borderBottom: '1px solid #EBEBEB'", "/* border-gray-100 */")

    # Add dark mode Tailwind classes to the sections
    content = re.sub(r'<section style=\{\{\s*/\* bg-white \*/', r'<section className="bg-white dark:bg-slate-950 transition-colors" style={{', content)
    content = re.sub(r'<section style=\{\{\s*/\* bg-gray-50 \*/', r'<section className="bg-gray-50 dark:bg-slate-900 transition-colors" style={{', content)
    content = re.sub(r'<section style=\{\{\s*/\* bg-purple-50 \*/', r'<section className="bg-purple-50 dark:bg-slate-900 transition-colors" style={{', content)
    
    # We also need to add generic dark mode text classes to specific inline elements that used them
    # But since body has text-slate-900 dark:text-white, stripping them will let them inherit!
    # For h1, h2, h3, let's just make sure they inherit or use standard classes if they were explicitly dark.
    
    with open(filepath, 'w') as f:
        f.write(content)

pages_to_fix = [
    'frontend/src/pages/AboutPage.tsx',
    'frontend/src/pages/ContactPage.tsx',
    'frontend/src/pages/TermsPage.tsx',
    'frontend/src/pages/PrivacyPage.tsx',
    'frontend/src/pages/RefundPage.tsx',
    'frontend/src/components/landing/HowItWorksSection.tsx',
    'frontend/src/components/landing/WhyMattersSection.tsx',
    'frontend/src/components/landing/TemplatesSection.tsx'
]

for p in pages_to_fix:
    strip_hardcoded_colors(p)

