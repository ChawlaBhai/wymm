import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BiodataRecord, FormStep, TemplateId } from '@/types/biodata'

const defaultBiodata: BiodataRecord = {
  templateId: 'modern-minimal',
  basicInfo: {
    fullName: '',
    dateOfBirth: '',
    age: 0,
    height: '',
    religion: '',
    caste: '',
    motherTongue: '',
    city: '',
    state: '',
    country: 'India',
    aboutMe: '',
  },
  familyInfo: {
    fatherName: '',
    fatherProfession: '',
    motherName: '',
    motherProfession: '',
    siblings: [],
    familyType: 'nuclear',
  },
  education: {
    highestQualification: '',
    field: '',
    institution: '',
    yearOfCompletion: '',
    additionalCertifications: [],
  },
  career: {
    currentDesignation: '',
    company: '',
    industry: '',
    yearsOfExperience: 0,
    annualIncome: '',
    showIncome: false,
  },
  personalInterests: {
    hobbies: [],
    languages: [],
    dietaryPreference: 'vegetarian',
    smokingHabit: 'no',
    drinkingHabit: 'no',
    personalityTraits: [],
    interests: [],
  },
  matchPreferences: {
    ageRangeMin: 22,
    ageRangeMax: 32,
    expectations: '',
  },
  media: {
    profilePhoto: undefined,
    galleryPhotos: [],
    resume: undefined,
  },
  isPublic: true,
}

interface BiodataStore {
  biodata: BiodataRecord
  currentStep: FormStep
  isSaving: boolean
  savedSlug: string | null

  setTemplate: (id: TemplateId) => void
  updateBasicInfo: (data: Partial<BiodataRecord['basicInfo']>) => void
  updateFamilyInfo: (data: Partial<BiodataRecord['familyInfo']>) => void
  updateEducation: (data: Partial<BiodataRecord['education']>) => void
  updateCareer: (data: Partial<BiodataRecord['career']>) => void
  updatePersonalInterests: (data: Partial<BiodataRecord['personalInterests']>) => void
  updateMatchPreferences: (data: Partial<BiodataRecord['matchPreferences']>) => void
  updateMedia: (data: Partial<BiodataRecord['media']>) => void
  setStep: (step: FormStep) => void
  nextStep: () => void
  prevStep: () => void
  setSaving: (v: boolean) => void
  setSavedSlug: (slug: string) => void
  resetBiodata: () => void
}

export const useBiodataStore = create<BiodataStore>()(
  persist(
    (set, get) => ({
      biodata: defaultBiodata,
      currentStep: 1,
      isSaving: false,
      savedSlug: null,

      setTemplate: (id) => set((s) => ({ biodata: { ...s.biodata, templateId: id } })),

      updateBasicInfo: (data) =>
        set((s) => ({ biodata: { ...s.biodata, basicInfo: { ...s.biodata.basicInfo, ...data } } })),

      updateFamilyInfo: (data) =>
        set((s) => ({ biodata: { ...s.biodata, familyInfo: { ...s.biodata.familyInfo, ...data } } })),

      updateEducation: (data) =>
        set((s) => ({ biodata: { ...s.biodata, education: { ...s.biodata.education, ...data } } })),

      updateCareer: (data) =>
        set((s) => ({ biodata: { ...s.biodata, career: { ...s.biodata.career, ...data } } })),

      updatePersonalInterests: (data) =>
        set((s) => ({
          biodata: { ...s.biodata, personalInterests: { ...s.biodata.personalInterests, ...data } },
        })),

      updateMatchPreferences: (data) =>
        set((s) => ({
          biodata: { ...s.biodata, matchPreferences: { ...s.biodata.matchPreferences, ...data } },
        })),

      updateMedia: (data) =>
        set((s) => ({ biodata: { ...s.biodata, media: { ...s.biodata.media, ...data } } })),

      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(6, s.currentStep + 1) as FormStep })),
      prevStep: () => set((s) => ({ currentStep: Math.max(1, s.currentStep - 1) as FormStep })),
      setSaving: (v) => set({ isSaving: v }),
      setSavedSlug: (slug) => set({ savedSlug: slug }),
      resetBiodata: () => {
        // Clear persisted localStorage so hydration doesn't overwrite the reset
        try { localStorage.removeItem('wymm-biodata-draft') } catch (_) {}
        set({ biodata: defaultBiodata, currentStep: 1, savedSlug: null })
      },
    }),
    { name: 'wymm-biodata-draft' }
  )
)
