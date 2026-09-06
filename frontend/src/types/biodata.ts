// Core biodata data types

export interface BasicInfo {
  fullName: string
  dateOfBirth: string
  age: number
  height: string // e.g. "5'8\""
  weight?: string
  complexion?: string
  bloodGroup?: string
  religion: string
  caste: string
  subCaste?: string
  gotra?: string
  motherTongue: string
  city: string
  state: string
  country: string
  aboutMe?: string
  socialLinks?: {
    instagram?: string
    linkedin?: string
    facebook?: string
    twitter?: string
    website?: string
  }
  _email?: string          // CRM: collected at account/email prompt
  _phone?: string          // CRM: optional phone
  _createdBy?: string      // Firebase Auth UID if logged in
  _sessionToken?: string   // nanoid for anonymous sessions
}

export interface FamilyMember {
  name: string
  profession: string
  company?: string
}

export interface Sibling {
  name: string
  age?: number
  profession?: string
  married?: boolean
}

export interface FamilyInfo {
  fatherName: string
  fatherProfession: string
  fatherCompany?: string
  motherName: string
  motherProfession: string
  siblings: Sibling[]
  familyType: 'nuclear' | 'joint' | 'extended'
  familyValues?: string
  nativePlace?: string
}

export interface Education {
  highestQualification: string
  field: string
  institution: string
  yearOfCompletion: string
  additionalCertifications?: string[]
}

export interface Career {
  currentDesignation: string
  company: string
  industry: string
  yearsOfExperience: number
  annualIncome?: string
  showIncome: boolean
  workLocation?: string
}

export interface PersonalInterests {
  hobbies: string[]
  languages: string[]
  dietaryPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'eggetarian'
  smokingHabit: 'no' | 'occasionally' | 'yes'
  drinkingHabit: 'no' | 'occasionally' | 'yes'
  physicalDisability?: string
  personalityTraits: string[]
  interests: string[]
}

export interface MatchPreferences {
  ageRangeMin: number
  ageRangeMax: number
  heightMin?: string
  religion?: string
  caste?: string
  education?: string[]
  profession?: string[]
  location?: string[]
  expectations?: string
}

export interface MediaInfo {
  profilePhoto?: string // URL or base64
  galleryPhotos: string[] // URLs or base64, max 5
  resume?: string // URL
  documents?: {
    name: string      // e.g. "Kundli", "Horoscope", "Birth Certificate"
    url: string       // base64 or URL
    type: 'pdf' | 'image'
  }[]
}

export type TemplateId = 'modern-minimal' | 'refined-elegance' | 'professional-premium' | 'cultural-grace' | 'the-modernist' | 'mountain-soul' | 'vintage-warmth' | 'aurora-glass' | 'ocean-breeze' | 'royal-majestic' | 'botanical-fresh' | 'celestial-night' | 'rose-gold-luxe' | 'zen-minimal' | 'pastel-dreams' | 'heritage-splendor'

export interface BiodataRecord {
  id?: string
  slug?: string
  templateId: TemplateId
  basicInfo: BasicInfo
  familyInfo: FamilyInfo
  education: Education
  career: Career
  personalInterests: PersonalInterests
  matchPreferences: MatchPreferences
  media: MediaInfo
  createdAt?: string
  updatedAt?: string
  isPublic: boolean
  isPaid?: boolean
  paymentSessionId?: string
  // CRM fields — stored at top level for Firestore querying
  _createdBy?: string | null
  _email?: string | null
  _sessionToken?: string | null
  _createdAt?: string
}

export type FormStep = 1 | 2 | 3 | 4 | 5 | 6

export const STEP_LABELS: Record<FormStep, string> = {
  1: 'Basic Info',
  2: 'Family',
  3: 'Education & Career',
  4: 'Interests',
  5: 'Preferences',
  6: 'Photos',
}

export const TEMPLATE_META: Record<TemplateId, { name: string; tagline: string; accent: string; preview: string }> = {
  'modern-minimal': {
    name: 'Modern Minimal',
    tagline: 'For the quietly confident',
    accent: '#7C3AED',
    preview: '/templates/modern-minimal-preview.jpg',
  },
  'refined-elegance': {
    name: 'Refined Elegance',
    tagline: 'For the warmly sophisticated',
    accent: '#EC4899',
    preview: '/templates/refined-elegance-preview.jpg',
  },
  'professional-premium': {
    name: 'Professional Premium',
    tagline: 'For the high-achiever',
    accent: '#0EA5E9',
    preview: '/templates/professional-premium-preview.jpg',
  },
  'cultural-grace': {
    name: 'Cultural Grace',
    tagline: 'For those who carry heritage with pride',
    accent: '#F59E0B',
    preview: '/templates/cultural-grace-preview.jpg',
  },
  'the-modernist': {
    name: 'The Modernist',
    tagline: 'For the bold and unconventional',
    accent: '#EC4899',
    preview: '/templates/the-modernist-preview.jpg',
  },
  'mountain-soul': {
    name: 'Mountain Soul',
    tagline: 'For the one who belongs to the peaks',
    accent: '#3D6B47',
    preview: '/templates/mountain-soul-preview.jpg',
  },
  'vintage-warmth': {
    name: 'Vintage Warmth',
    tagline: 'For the keeper of traditions',
    accent: '#8B4513',
    preview: '/templates/vintage-warmth-preview.jpg',
  },
  'aurora-glass': {
    name: 'Aurora Glass',
    tagline: 'For the beautifully modern soul',
    accent: '#7C3AED',
    preview: '/templates/aurora-glass-preview.jpg',
  },
  'ocean-breeze': { name: 'Ocean Breeze', tagline: 'For the free spirit by the sea', accent: '#FF6B6B', preview: '/templates/ocean-breeze-preview.jpg' },
  'royal-majestic': { name: 'Royal Majestic', tagline: 'For those who command respect', accent: '#D4AF37', preview: '/templates/royal-majestic-preview.jpg' },
  'botanical-fresh': { name: 'Botanical Fresh', tagline: 'For the nature lover at heart', accent: '#2D6A4F', preview: '/templates/botanical-fresh-preview.jpg' },
  'celestial-night': { name: 'Celestial Night', tagline: 'For the poetic, philosophical soul', accent: '#6B7FD7', preview: '/templates/celestial-night-preview.jpg' },
  'rose-gold-luxe': { name: 'Rose Gold Luxe', tagline: 'For the elegantly feminine', accent: '#D4AF37', preview: '/templates/rose-gold-luxe-preview.jpg' },
  'zen-minimal': { name: 'Zen Minimal', tagline: 'For the ultra-minimalist', accent: '#1A1A1A', preview: '/templates/zen-minimal-preview.jpg' },
  'pastel-dreams': { name: 'Pastel Dreams', tagline: 'For the soft, dreamy soul', accent: '#9C27B0', preview: '/templates/pastel-dreams-preview.jpg' },
  'heritage-splendor': { name: 'Heritage Splendor', tagline: 'For those who celebrate culture boldly', accent: '#FF8C00', preview: '/templates/heritage-splendor-preview.jpg' },
}

export const RELIGIONS = [
  'Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist', 'Parsi', 'Jewish', 'Other',
]

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh',
]
