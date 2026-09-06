import os
import re

files_and_replacements = {
    'frontend/src/components/form/StepBasicInfo.tsx': [
        ('Tell us about yourself', "{t('builder.step.basic')}"),
    ],
    'frontend/src/components/form/StepFamily.tsx': [
        ('Family Details', "{t('builder.step.family')}"),
    ],
    'frontend/src/components/form/StepEducationCareer.tsx': [
        ('Education & Career', "{t('builder.step.education')}"),
    ],
    'frontend/src/components/form/StepPersonalInterests.tsx': [
        ('Personal Interests', "{t('builder.step.interests')}"),
    ],
    'frontend/src/components/form/StepMatchPreferences.tsx': [
        ('Match Preferences', "{t('builder.step.preferences')}"),
    ],
    'frontend/src/components/form/StepMedia.tsx': [
        ('Photos', "{t('builder.step.media')}"),
    ],
    'frontend/src/pages/BuilderPage.tsx': [
        ('Preview My Biodata', "{t('builder.preview')}"),
        ('>Preview<', ">{t('builder.preview')}<"),
        ('Live Preview', "{t('builder.livepreview')}"),
        ('>Template<', ">{t('builder.template')}<"),
    ]
}

for filepath, replacements in files_and_replacements.items():
    if not os.path.exists(filepath): continue
    with open(filepath, 'r') as f:
        content = f.read()

    # Add useTranslation import if not there
    if 'useTranslation' not in content:
        content = re.sub(
            r"(import.*from 'react')",
            r"\1\nimport { useTranslation } from '@/lib/i18n'",
            content
        )
        if 'useTranslation' not in content:
            content = "import { useTranslation } from '@/lib/i18n'\n" + content
    
    # Insert const { t } = useTranslation() inside the component
    if 'const { t } =' not in content:
        content = re.sub(
            r"(export default function \w+\(\) {)",
            r"\1\n  const { t } = useTranslation()",
            content
        )

    for old, new in replacements:
        content = content.replace(old, new)

    with open(filepath, 'w') as f:
        f.write(content)

print("Translated forms")
