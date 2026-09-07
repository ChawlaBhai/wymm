import glob
import re

files = glob.glob('frontend/src/**/*.tsx', recursive=True)

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Clean up the weird comments and commas
    content = re.sub(r'/\*.*?\*/\s*,', '', content)
    content = re.sub(r'\{\{\s*,', '{{', content)
    content = re.sub(r',\s*\}', '}', content)

    # For any remaining inline comments that break style objects
    content = re.sub(r'style=\{\{\s*/\*.*?\*/', 'style={{', content)

    with open(filepath, 'w') as f:
        f.write(content)
