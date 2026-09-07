import re

with open('frontend/src/components/landing/HowItWorksSection.tsx', 'r') as f:
    content = f.read()

# Add translations
content = content.replace("Choose your canvas", "{t('how.step1.title') || 'Choose your canvas'}")
content = content.replace("Five templates, five personalities. Modern Minimal, Refined Elegance, Professional Premium, Cultural Grace, The Modernist. Pick the one that feels like you.", "{t('how.step1.desc') || 'Five templates, five personalities. Modern Minimal, Refined Elegance, Professional Premium, Cultural Grace, The Modernist. Pick the one that feels like you.'}")

content = content.replace("Tell your story", "{t('how.step2.title') || 'Tell your story'}")
content = content.replace("A guided six-step builder that asks the right questions — not a generic form, but a thoughtful conversation about who you are.", "{t('how.step2.desc') || 'A guided six-step builder that asks the right questions — not a generic form, but a thoughtful conversation about who you are.'}")

content = content.replace("Share with confidence", "{t('how.step3.title') || 'Share with confidence'}")
content = content.replace("Get a beautiful link and QR code in seconds. Share on WhatsApp, email it to families, print it — however you reach people.", "{t('how.step3.desc') || 'Get a beautiful link and QR code in seconds. Share on WhatsApp, email it to families, print it — however you reach people.'}")

content = content.replace(">How it works<", ">{t('how.badge') || 'How it works'}<")

with open('frontend/src/components/landing/HowItWorksSection.tsx', 'w') as f:
    f.write(content)
