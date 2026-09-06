with open('frontend/src/components/form/StepMedia.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "Gallery {t('builder.step.media')} (up to 5)" in line:
        lines[i] = line.replace("{t('builder.step.media')}", "Photos")
    if "{t('builder.step.media')} are compressed automatically" in line:
        lines[i] = line.replace("{t('builder.step.media')}", "Photos")

with open('frontend/src/components/form/StepMedia.tsx', 'w') as f:
    f.writelines(lines)
