// Run from project root: node scripts/seed-demos.mjs
import { readFileSync } from 'fs'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env
try {
  const env = readFileSync(join(__dirname, '../frontend/.env'), 'utf8')
  env.split('\n').forEach(line => {
    const [k, ...rest] = line.split('=')
    if (k?.trim()) process.env[k.trim()] = rest.join('=').trim()
  })
} catch {}

// Load supabase from frontend node_modules
const require = createRequire(join(__dirname, '../frontend/package.json'))
const { createClient } = require('@supabase/supabase-js')

// Load .env manually
try {
  const env = readFileSync('./frontend/.env', 'utf8')
  env.split('\n').forEach(line => {
    const [k, v] = line.split('=')
    if (k && v) process.env[k.trim()] = v.trim()
  })
} catch {}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

const DEMO_BASE = {
  basicInfo: {
    fullName: 'Priya Sharma', dateOfBirth: '1997-03-15', age: 27, height: "5'5\"",
    religion: 'Hindu', caste: 'Brahmin', motherTongue: 'Hindi',
    city: 'Mumbai', state: 'Maharashtra', country: 'India', bloodGroup: 'B+',
    aboutMe: 'A product designer who believes in the power of beautiful things done well. I love hiking on weekends, cooking elaborate Sunday meals, and getting lost in bookshops. Looking for a partner who is curious about the world and kind to people.',
  },
  familyInfo: {
    fatherName: 'Rajesh Sharma', fatherProfession: 'Chartered Accountant', fatherCompany: 'Sharma & Associates',
    motherName: 'Sunita Sharma', motherProfession: 'School Principal',
    siblings: [{ name: 'Rohan Sharma', age: 24, profession: 'Software Engineer', married: false }],
    familyType: 'nuclear', familyValues: 'Grounded in tradition, open to the world.', nativePlace: 'Jaipur, Rajasthan',
  },
  education: { highestQualification: 'B.Des', field: 'Product Design', institution: 'National Institute of Design, Ahmedabad', yearOfCompletion: '2019' },
  career: { currentDesignation: 'Senior Product Designer', company: 'Zomato', industry: 'IT/Software', yearsOfExperience: 5, annualIncome: '20-40 LPA', showIncome: false },
  personalInterests: {
    hobbies: ['Photography', 'Hiking', 'Cooking', 'Reading', 'Travel'],
    languages: ['Hindi', 'English', 'Marathi', 'Gujarati'],
    dietaryPreference: 'vegetarian', smokingHabit: 'no', drinkingHabit: 'occasionally',
    personalityTraits: ['Creative', 'Adventurous', 'Family-oriented', 'Intellectual', 'Calm'],
    interests: ['Design', 'Mountains', 'Food', 'Books'],
  },
  matchPreferences: {
    ageRangeMin: 27, ageRangeMax: 33,
    location: ['Mumbai', 'Pune', 'Bengaluru', 'Delhi'],
    education: ['B.Tech', 'MBA', 'M.Tech'],
    profession: ['IT/Software', 'Finance', 'Business/Entrepreneur'],
    expectations: 'Someone who is ambitious but grounded, values family while building their own path.',
  },
  media: {
    profilePhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&q=80',
    galleryPhotos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&h=400&fit=crop&q=80',
    ],
  },
  isPublic: true,
}

const TEMPLATES = [
  'modern-minimal','refined-elegance','professional-premium','cultural-grace',
  'the-modernist','mountain-soul','vintage-warmth','aurora-glass',
  'ocean-breeze','royal-majestic','botanical-fresh','celestial-night',
  'rose-gold-luxe','zen-minimal','pastel-dreams','heritage-splendor',
]

async function seed() {
  console.log('Seeding demo profiles...')
  for (let i = 0; i < TEMPLATES.length; i++) {
    const templateId = TEMPLATES[i]
    const slug = `demo${i + 1}`
    const biodata = { ...DEMO_BASE, templateId, id: slug, slug, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    // Delete first if exists, then insert fresh (bypasses update RLS policy)
    await supabase.from('biodatas').delete().eq('id', slug)
    const { error } = await supabase.from('biodatas').insert({
      id: slug,
      biodata,
      isPublic: true,
      _createdBy: null,
      _email: null,
      _sessionToken: null,
      _createdAt: new Date().toISOString(),
    })
    if (error) console.error(`✗ demo${i+1} (${templateId}):`, error.message)
    else console.log(`✓ demo${i+1} → willyoumarry-me.vercel.app/demo${i+1} (${templateId})`)
  }
  console.log('\nDone! All 16 demos seeded.')
}

seed().catch(console.error)
