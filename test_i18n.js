import fs from 'fs'

const i18n = fs.readFileSync('frontend/src/lib/i18n.ts', 'utf-8')
if (i18n.includes("'about.badge': { en: 'Our Story'")) {
    console.log("Translations found in i18n.ts")
} else {
    console.log("Translations NOT found!")
}
