import re
with open('frontend/src/components/landing/HowItWorksSection.tsx', 'r') as f:
    content = f.read()

# Replace {t(...)} with t(...) in object literals
content = re.sub(r"title:\s*\{t\((.*?)\)\}", r"title: t(\1)", content)
content = re.sub(r"description:\s*\{t\((.*?)\)\}", r"description: t(\1)", content)
with open('frontend/src/components/landing/HowItWorksSection.tsx', 'w') as f:
    f.write(content)
