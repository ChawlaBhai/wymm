import re

with open('frontend/src/components/landing/WhyMattersSection.tsx', 'r') as f:
    content = f.read()

# Replace hardcoded copy with translations
content = content.replace(">Why it matters<", ">{t('why.badge') || 'Why it matters'}<")
content = content.replace(">Because first impressions write futures.<", ">{t('why.title') || 'Because first impressions write futures.'}<")
content = content.replace("In India, a biodata travels farther than a resume. It reaches parents in distant cities, relatives you've never met, families who will judge a person by a page. Most biodatas look like they were made in a hurry — because they were. Generic templates. Misaligned fonts. Information without soul.", "{t('why.p1') || 'In India, a biodata travels farther than a resume. It reaches parents in distant cities, relatives you\\'ve never met, families who will judge a person by a page. Most biodatas look like they were made in a hurry — because they were. Generic templates. Misaligned fonts. Information without soul.'}")
content = content.replace("wymm is different. We built templates that tell your story with the elegance it deserves. Not a form. Not a PDF. A first impression you'd actually be proud of.", "{t('why.p2') || 'wymm is different. We built templates that tell your story with the elegance it deserves. Not a form. Not a PDF. A first impression you\\'d actually be proud of.'}")
content = content.replace(">Before wymm<", ">{t('why.before') || 'Before wymm'}<")
content = content.replace(">With wymm<", ">{t('why.with') || 'With wymm'}<")
content = content.replace(">vs<", ">{t('why.vs') || 'vs'}<")

with open('frontend/src/components/landing/WhyMattersSection.tsx', 'w') as f:
    f.write(content)
