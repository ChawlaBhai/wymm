import { useBiodataStore } from '@/store/biodataStore'

const QUALIFICATIONS = [
  '10th', '12th', 'Diploma', 'B.E./B.Tech', 'B.Sc', 'B.Com', 'B.A.',
  'M.Tech', 'M.Sc', 'MBA', 'MBBS', 'CA', 'LLB', 'PhD', 'Other',
]

const INDUSTRIES = [
  'IT/Software', 'Healthcare', 'Finance', 'Education',
  'Business/Entrepreneur', 'Government', 'Legal', 'Other',
]

const INCOME_OPTIONS = [
  'Prefer not to say', 'Below 5 LPA', '5–10 LPA', '10–20 LPA', '20–40 LPA', '40+ LPA',
]

export default function StepEducationCareer() {
  const { biodata, updateEducation, updateCareer } = useBiodataStore()
  const { education, career } = biodata

  function setEdu(field: string, value: string) {
    updateEducation({ [field]: value } as never)
  }

  function setCareer(field: string, value: string | number | boolean) {
    updateCareer({ [field]: value } as never)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Education & career
        </p>
        <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>
          Your qualifications and professional background — important for potential matches.
        </p>
      </div>

      {/* Education section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #E8DFF5, #F3EFFE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🎓</div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Education</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="Highest Qualification">
              <select className="form-input" value={education.highestQualification} onChange={e => setEdu('highestQualification', e.target.value)}>
                <option value="">Select qualification</option>
                {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </Field>
            <Field label="Field of Study">
              <input className="form-input" placeholder="e.g. Computer Science" value={education.field} onChange={e => setEdu('field', e.target.value)} />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="Institution Name">
              <input className="form-input" placeholder="e.g. IIT Bombay" value={education.institution} onChange={e => setEdu('institution', e.target.value)} />
            </Field>
            <Field label="Year of Completion">
              <input className="form-input" placeholder="e.g. 2018" value={education.yearOfCompletion} onChange={e => setEdu('yearOfCompletion', e.target.value)} />
            </Field>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#F0F0F0' }} />

      {/* Career section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #E8DFF5, #F3EFFE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>💼</div>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Career</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="Current Designation">
              <input className="form-input" placeholder="e.g. Senior Software Engineer" value={career.currentDesignation} onChange={e => setCareer('currentDesignation', e.target.value)} />
            </Field>
            <Field label="Company Name">
              <input className="form-input" placeholder="e.g. Infosys" value={career.company} onChange={e => setCareer('company', e.target.value)} />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Field label="Industry">
              <select className="form-input" value={career.industry} onChange={e => setCareer('industry', e.target.value)}>
                <option value="">Select industry</option>
                {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </Field>
            <Field label="Years of Experience">
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 4"
                min={0}
                value={career.yearsOfExperience || ''}
                onChange={e => setCareer('yearsOfExperience', Number(e.target.value))}
              />
            </Field>
          </div>

          {/* Annual Income — free text input */}
          <Field label="Annual Income">
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                placeholder="e.g. 18 LPA, 2.4 CR, 85,000 USD"
                value={career.annualIncome ?? ''}
                onChange={e => setCareer('annualIncome', e.target.value)}
                style={{ paddingRight: '90px' }}
              />
              <span style={{
                position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '12px', fontWeight: 600, color: '#AAAAAA', pointerEvents: 'none',
              }}>per annum</span>
            </div>
          </Field>

          {/* Show income toggle */}
          {career.annualIncome && career.annualIncome !== 'Prefer not to say' && (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#F8F9FB', borderRadius: '10px', border: '1px solid #E5E5E5', cursor: 'pointer' }}
              onClick={() => setCareer('showIncome', !career.showIncome)}
            >
              <div style={{
                width: '40px', height: '22px', borderRadius: '99px',
                background: career.showIncome ? '#7C3AED' : '#D1D5DB',
                position: 'relative', transition: 'background 200ms ease', flexShrink: 0,
              }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%', background: 'white',
                  position: 'absolute', top: '3px',
                  left: career.showIncome ? '21px' : '3px',
                  transition: 'left 200ms ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} />
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>Show income on biodata</p>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '1px' }}>Currently {career.showIncome ? 'visible' : 'hidden'} to viewers</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  )
}
