import re

with open('frontend/src/components/landing/HowItWorksSection.tsx', 'r') as f:
    content = f.read()

# Fix BuilderIllustration card background
content = content.replace("background: 'white',", "background: 'var(--card-bg, white)',")

# Fix ShareIllustration card background
content = content.replace("background: '#1C1C1E'", "background: 'var(--phone-bg, #1C1C1E)'")

with open('frontend/src/components/landing/HowItWorksSection.tsx', 'w') as f:
    f.write(content)
