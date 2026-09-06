import re

with open('frontend/src/pages/BuilderPage.tsx', 'r') as f:
    content = f.read()

# Make step numbers look better in dark mode
content = content.replace("border: active ? '2.5px solid #7C3AED' : done ? '2.5px solid #7C3AED' : '2px solid transparent',", "border: active ? '2.5px solid #7C3AED' : done ? '2.5px solid #7C3AED' : '2px solid var(--color-border)',")
# Replace any lingering `#AAA`
content = content.replace("color: '#AAA'", "color: 'inherit'")
content = content.replace("color: '#666'", "color: 'inherit'")
content = content.replace("color: '#888'", "color: 'inherit'")

with open('frontend/src/pages/BuilderPage.tsx', 'w') as f:
    f.write(content)
