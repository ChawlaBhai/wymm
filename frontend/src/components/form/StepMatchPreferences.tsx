import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useBiodataStore } from '@/store/biodataStore'

const QUALIFICATION_OPTIONS = [
  '10th', '12th', 'Diploma', 'B.E./B.Tech', 'B.Sc', 'B.Com', 'B.A.',
  'M.Tech', 'M.Sc', 'MBA', 'MBBS', 'CA', 'LLB', 'PhD', 'Other',
]

const INDUSTRY_OPTIONS = [
  'IT/Software', 'Healthcare', 'Finance', 'Education',
  'Business/Entrepreneur', 'Government', 'Legal', 'Other',
]

function TagInput({
  tags,
  placeholder,
  onAdd,
  onRemove}: {
  tags: string[]
  placeholder: string
  onAdd: (t: string) => void
  onRemove: (t: string) => void
}) {
  const [input, setInput] = useState('')

  function add(val: string) {
    const t = val.trim()
    if (!t || tags.includes(t)) return
    onAdd(t)
    setInput('')
  }

  return (
    <div>
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          {tags.map(tag => (
            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 12px', background: '#F3EFFE', color: '#7C3AED', borderRadius: '99px', fontSize: '13px', fontWeight: 500 }}>
              {tag}
              <button type="button" onClick={() => onRemove(tag)} style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', fontSize: '14px', lineHeight: 1, padding: 0 }}>×</button>
            </span>
          ))}
        </div>
      )}
      <input
        className="form-input"
        placeholder={placeholder}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input) } }}
      />
    </div>
  )
}

function MultiCheckbox({
  options,
  selected,
  onChange}: {
  options: string[]
  selected: string[]
  onChange: (v: string[]) => void
}) {
  function toggle(opt: string) {
    if (selected.includes(opt)) onChange(selected.filter(s => s !== opt))
    else onChange([...selected, opt])
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {options.map(opt => {
        const checked = selected.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: `1.5px solid ${checked ? '#7C3AED' : '#E5E5E5'}`,
              background: checked ? 'rgba(124,58,237,0.08)' : 'white',
              color: checked ? '#7C3AED' : '#666',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: checked ? 600 : 400,
              cursor: 'pointer',
              transition: 'all 150ms ease'}}
          >
            {checked && <span style={{ marginRight: '4px' }}>✓</span>}
            {opt}
          </button>
        )
      })}
    </div>
  )
}

export default function StepMatchPreferences() {
  const { t } = useTranslation()
  const { biodata, updateMatchPreferences } = useBiodataStore()
  const { matchPreferences } = biodata

  const expectations = matchPreferences.expectations ?? ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: 'inherit', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Partner preferences
        </p>
        <p style={{ fontSize: '14px', color: 'inherit', lineHeight: 1.6 }}>
          What are you looking for in a life partner? This helps families understand your expectations.
        </p>
      </div>

      {/* Age Range */}
      <div>
        <label className="form-label">Preferred Age Range</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', color: 'inherit', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Min Age</label>
            <input
              type="number"
              className="form-input"
              min={18}
              max={70}
              value={matchPreferences.ageRangeMin}
              onChange={e => updateMatchPreferences({ ageRangeMin: Number(e.target.value) })}
            />
          </div>
          <span style={{ color: 'inherit', marginTop: '20px', fontSize: '18px' }}>—</span>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '11px', color: 'inherit', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Max Age</label>
            <input
              type="number"
              className="form-input"
              min={18}
              max={70}
              value={matchPreferences.ageRangeMax}
              onChange={e => updateMatchPreferences({ ageRangeMax: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* Location Preference */}
      <div>
        <label className="form-label">Location Preference</label>
        <TagInput
          tags={matchPreferences.location ?? []}
          placeholder="Add a city or state, then press Enter"
          onAdd={t => updateMatchPreferences({ location: [...(matchPreferences.location ?? []), t] })}
          onRemove={t => updateMatchPreferences({ location: (matchPreferences.location ?? []).filter(l => l !== t) })}
        />
      </div>

      {/* Education Preference */}
      <div>
        <label className="form-label">Education Preference <span style={{ fontWeight: 400, textTransform: 'none', color: 'inherit', letterSpacing: 0, fontSize: '11px' }}>(select all that apply)</span></label>
        <MultiCheckbox
          options={QUALIFICATION_OPTIONS}
          selected={matchPreferences.education ?? []}
          onChange={v => updateMatchPreferences({ education: v })}
        />
      </div>

      {/* Profession Preference */}
      <div>
        <label className="form-label">Profession Preference <span style={{ fontWeight: 400, textTransform: 'none', color: 'inherit', letterSpacing: 0, fontSize: '11px' }}>(select all that apply)</span></label>
        <MultiCheckbox
          options={INDUSTRY_OPTIONS}
          selected={matchPreferences.profession ?? []}
          onChange={v => updateMatchPreferences({ profession: v })}
        />
      </div>

      {/* Expectations */}
      <div>
        <label className="form-label">
          Expectations
          <span style={{ fontWeight: 400, textTransform: 'none', color: 'inherit', marginLeft: '8px', letterSpacing: 0, fontSize: '11px' }}>max 400 characters</span>
        </label>
        <div style={{ position: 'relative' }}>
          <textarea
            className="form-input"
            rows={4}
            maxLength={400}
            placeholder="Describe what you're looking for in a life partner — values, personality, background..."
            style={{ resize: 'vertical' }}
            value={expectations}
            onChange={e => updateMatchPreferences({ expectations: e.target.value })}
          />
          <span style={{ position: 'absolute', bottom: '10px', right: '14px', fontSize: '11px', color: 'inherit' }}>
            {expectations.length}/400
          </span>
        </div>
      </div>
    </div>
  )
}
