import re

with open('frontend/src/lib/i18n.ts', 'r') as f:
    content = f.read()

if "import { useCallback } from 'react'" not in content:
    content = "import { useCallback } from 'react'\n" + content

content = content.replace("function t(key: string): string {", "const t = useCallback((key: string): string => {")
content = content.replace("    return translation[language] || translation.en\n  }", "    return translation[language] || translation.en\n  }, [language])")

with open('frontend/src/lib/i18n.ts', 'w') as f:
    f.write(content)
