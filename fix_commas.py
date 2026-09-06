import glob
import re

files = glob.glob('frontend/src/components/landing/*.tsx')
for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Match lines that only contain whitespace and a comma
    content = re.sub(r'\n\s*,\s*\n', '\n', content)
    # Also handle style={{ , ... }}
    content = re.sub(r'style=\{\{\s*,', 'style={{', content)

    with open(filepath, 'w') as f:
        f.write(content)
