import re

with open('frontend/src/components/landing/HowItWorksSection.tsx', 'r') as f:
    content = f.read()

# Extract the STEPS array
match = re.search(r'const STEPS = \[\s*(.*?)\s*\]\n\nexport default function HowItWorksSection\(\) \{', content, flags=re.DOTALL)
if match:
    steps_content = match.group(0)
    # Remove it from global scope
    content = content.replace(steps_content, "export default function HowItWorksSection() {")
    
    # Inject it inside the component
    steps_declaration = "const STEPS = [\n" + match.group(1) + "\n  ]\n"
    
    replacement = f"export default function HowItWorksSection() {{\n  const {{ t }} = useTranslation()\n  {steps_declaration}"
    content = content.replace("export default function HowItWorksSection() {\n  const { t } = useTranslation()", replacement)

with open('frontend/src/components/landing/HowItWorksSection.tsx', 'w') as f:
    f.write(content)
