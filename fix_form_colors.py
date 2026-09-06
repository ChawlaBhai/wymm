import glob
import re

files = glob.glob('frontend/src/components/form/Step*.tsx')
for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Remove hardcoded text colors in favor of global cascading or classes
    content = re.sub(r"color:\s*'(#1A1A1A|#888|#666|#AAA|#333)'", "color: 'inherit'", content)
    content = re.sub(r"color:\s*\"(#1A1A1A|#888|#666|#AAA|#333)\"", "color: 'inherit'", content)
    
    # Give the parent a nice dark-mode compatible class
    content = content.replace("<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>", "<div className=\"text-gray-900 dark:text-gray-100\" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>")

    with open(filepath, 'w') as f:
        f.write(content)

print("Fixed colors in form steps")
