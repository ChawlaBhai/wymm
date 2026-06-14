import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useBiodataStore } from '@/store/biodataStore'
import { RELIGIONS, INDIAN_STATES } from '@/types/biodata'

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  height: z.string().optional(),
  religion: z.string().min(1, 'Religion is required'),
  caste: z.string().optional(),
  motherTongue: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  aboutMe: z.string().max(300, 'Max 300 characters').optional(),
})

type FormValues = z.infer<typeof schema>

function calcAge(dob: string): number {
  if (!dob) return 0
  const today = new Date()
  const birth = new Date(dob)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age > 0 ? age : 0
}

export default function StepBasicInfo() {
  const { biodata, updateBasicInfo } = useBiodataStore()
  const { basicInfo } = biodata

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: basicInfo.fullName,
      dateOfBirth: basicInfo.dateOfBirth,
      height: basicInfo.height,
      religion: basicInfo.religion,
      caste: basicInfo.caste,
      motherTongue: basicInfo.motherTongue,
      city: basicInfo.city,
      state: basicInfo.state,
      aboutMe: basicInfo.aboutMe,
    },
    mode: 'onChange',
  })

  const values = watch()
  const aboutMeVal = watch('aboutMe') ?? ''

  useEffect(() => {
    const age = calcAge(values.dateOfBirth ?? '')
    updateBasicInfo({
      fullName: values.fullName ?? '',
      dateOfBirth: values.dateOfBirth ?? '',
      age,
      height: values.height ?? '',
      religion: values.religion ?? '',
      caste: values.caste ?? '',
      motherTongue: values.motherTongue ?? '',
      city: values.city ?? '',
      state: values.state ?? '',
      aboutMe: values.aboutMe ?? '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values.fullName, values.dateOfBirth, values.height, values.religion,
    values.caste, values.motherTongue, values.city, values.state, values.aboutMe,
  ])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Tell us about yourself
        </p>
        <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>
          This forms the core of your biodata. Fill in as much as you can — it updates the preview live.
        </p>
      </div>

      {/* Full Name */}
      <Field label="Full Name *" error={errors.fullName?.message}>
        <input className="form-input" placeholder="e.g. Priya Sharma" {...register('fullName')} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Date of Birth */}
        <Field label="Date of Birth *" error={errors.dateOfBirth?.message}>
          <input type="date" className="form-input" {...register('dateOfBirth')} />
          {values.dateOfBirth && (
            <p style={{ fontSize: '12px', color: '#7C3AED', marginTop: '4px', fontWeight: 500 }}>
              Age: {calcAge(values.dateOfBirth)} years
            </p>
          )}
        </Field>

        {/* Height */}
        <Field label="Height" error={errors.height?.message}>
          <input className="form-input" placeholder='e.g. 5&apos;6"' {...register('height')} />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Religion */}
        <Field label="Religion *" error={errors.religion?.message}>
          <select className="form-input" {...register('religion')}>
            <option value="">Select religion</option>
            {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </Field>

        {/* Caste */}
        <Field label="Caste" error={errors.caste?.message}>
          <input className="form-input" placeholder="e.g. Brahmin" {...register('caste')} />
        </Field>
      </div>

      {/* Mother Tongue */}
      <Field label="Mother Tongue" error={errors.motherTongue?.message}>
        <input className="form-input" placeholder="e.g. Hindi, Marathi" {...register('motherTongue')} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* City */}
        <Field label="City *" error={errors.city?.message}>
          <input className="form-input" placeholder="e.g. Mumbai" {...register('city')} />
        </Field>

        {/* State */}
        <Field label="State *" error={errors.state?.message}>
          <select className="form-input" {...register('state')}>
            <option value="">Select state</option>
            {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      {/* About Me */}
      <Field label="About Me" error={errors.aboutMe?.message}>
        <div style={{ position: 'relative' }}>
          <textarea
            className="form-input"
            rows={4}
            maxLength={300}
            placeholder="Write a short intro about yourself — your personality, values, what makes you unique..."
            style={{ resize: 'vertical' }}
            {...register('aboutMe')}
          />
          <span style={{ position: 'absolute', bottom: '10px', right: '14px', fontSize: '11px', color: '#AAA' }}>
            {aboutMeVal.length}/300
          </span>
        </div>
      </Field>

      {/* Social Links */}
      <div style={{ paddingTop: '8px' }}>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>
          Social Links <span style={{ fontWeight: 400, color: '#AAA', fontSize: '13px' }}>(optional)</span>
        </p>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px', lineHeight: 1.5 }}>
          Add your social profiles — they'll appear on your biodata.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {([
            { key: 'instagram', icon: '📸', label: 'Instagram', placeholder: 'instagram.com/username' },
            { key: 'linkedin',  icon: '🔗', label: 'LinkedIn',  placeholder: 'linkedin.com/in/username' },
            { key: 'facebook',  icon: '👥', label: 'Facebook',  placeholder: 'facebook.com/username' },
            { key: 'twitter',   icon: '🐦', label: 'Twitter / X', placeholder: 'x.com/username' },
            { key: 'website',   icon: '🌐', label: 'Personal Website', placeholder: 'yourwebsite.com' },
          ] as { key: keyof NonNullable<typeof basicInfo.socialLinks>; icon: string; label: string; placeholder: string }[]).map(({ key, icon, label, placeholder }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px', flexShrink: 0, width: '24px', textAlign: 'center' }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <label className="form-label" style={{ fontSize: '12px', marginBottom: '4px', display: 'block' }}>{label}</label>
                <input
                  className="form-input"
                  placeholder={placeholder}
                  value={basicInfo.socialLinks?.[key] ?? ''}
                  onChange={e => updateBasicInfo({ socialLinks: { ...basicInfo.socialLinks, [key]: e.target.value } })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {error && <p style={{ fontSize: '12px', color: '#DC2626', marginTop: '4px' }}>{error}</p>}
    </div>
  )
}
