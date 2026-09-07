import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useBiodataStore } from '@/store/biodataStore'
import type { Sibling } from '@/types/biodata'

type FamilyType = 'nuclear' | 'joint' | 'extended'

const FAMILY_TYPES: { value: FamilyType; label: string; desc: string }[] = [
  { value: 'nuclear', label: 'Nuclear', desc: 'Parents & children' },
  { value: 'joint', label: 'Joint', desc: 'Extended family together' },
  { value: 'extended', label: 'Extended', desc: 'Close-knit wider family' },
]

export default function StepFamily() {
  const { t } = useTranslation()
  const { biodata, updateFamilyInfo } = useBiodataStore()
  const { familyInfo } = biodata

  const [newSibling, setNewSibling] = useState<Sibling>({ name: '', age: undefined, profession: '' })

  function update(field: string, value: string) {
    updateFamilyInfo({ [field]: value } as never)
  }

  function addSibling() {
    if (!newSibling.name.trim()) return
    updateFamilyInfo({ siblings: [...familyInfo.siblings, { ...newSibling }] })
    setNewSibling({ name: '', age: undefined, profession: '' })
  }

  function removeSibling(idx: number) {
    updateFamilyInfo({ siblings: familyInfo.siblings.filter((_, i) => i !== idx) })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: 'inherit', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Your family
        </p>
        <p style={{ fontSize: '14px', color: 'inherit', lineHeight: 1.6 }}>
          Family background is an important part of a marriage biodata. Add as much detail as you are comfortable with.
        </p>
      </div>

      {/* Parents */}
      <div>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '14px' }}>Parents</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <Field label="Father's Name">
            <input className="form-input" placeholder="Full name" value={familyInfo.fatherName} onChange={e => update('fatherName', e.target.value)} />
          </Field>
          <Field label="Father's Profession">
            <input className="form-input" placeholder="e.g. Retired IAS Officer" value={familyInfo.fatherProfession} onChange={e => update('fatherProfession', e.target.value)} />
          </Field>
          <Field label="Mother's Name">
            <input className="form-input" placeholder="Full name" value={familyInfo.motherName} onChange={e => update('motherName', e.target.value)} />
          </Field>
          <Field label="Mother's Profession">
            <input className="form-input" placeholder="e.g. Homemaker, Teacher" value={familyInfo.motherProfession} onChange={e => update('motherProfession', e.target.value)} />
          </Field>
        </div>
      </div>

      {/* Family Type */}
      <div>
        <label className="form-label">Family Type</label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
          {FAMILY_TYPES.map(ft => (
            <button
              key={ft.value}
              type="button"
              onClick={() => updateFamilyInfo({ familyType: ft.value })}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                border: `1.5px solid ${familyInfo.familyType === ft.value ? '#7C3AED' : '#E5E5E5'}`,
                background: familyInfo.familyType === ft.value ? 'rgba(124,58,237,0.08)' : 'white',
                color: familyInfo.familyType === ft.value ? '#7C3AED' : '#666',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: familyInfo.familyType === ft.value ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 150ms ease',
                textAlign: 'left' as const}}
            >
              <span style={{ display: 'block', fontWeight: 600, fontSize: '14px' }}>{ft.label}</span>
              <span style={{ display: 'block', fontSize: '11px', color: familyInfo.familyType === ft.value ? '#A78BFA' : '#AAA', marginTop: '2px' }}>{ft.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Native Place */}
      <Field label="Native Place">
        <input className="form-input" placeholder="e.g. Nashik, Maharashtra" value={familyInfo.nativePlace ?? ''} onChange={e => update('nativePlace', e.target.value)} />
      </Field>

      {/* Family Values */}
      <Field label="Family Values">
        <textarea
          className="form-input"
          rows={3}
          placeholder="Describe your family's values, traditions, and what you hold dear..."
          style={{ resize: 'vertical' }}
          value={familyInfo.familyValues ?? ''}
          onChange={e => update('familyValues', e.target.value)}
        />
      </Field>

      {/* Siblings */}
      <div>
        <label className="form-label">Siblings</label>

        {familyInfo.siblings.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px', marginTop: '8px' }}>
            {familyInfo.siblings.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#F8F9FB', borderRadius: '10px', border: '1px solid #E5E5E5' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'inherit' }}>{s.name}</span>
                  {s.age && <span style={{ fontSize: '13px', color: 'inherit', marginLeft: '8px' }}>{s.age} yrs</span>}
                  {s.profession && <span style={{ fontSize: '13px', color: 'inherit', marginLeft: '8px' }}>· {s.profession}</span>}
                </div>
                <button
                  type="button"
                  onClick={() => removeSibling(i)}
                  style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '0 4px' }}
                  aria-label="Remove sibling"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add sibling form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '10px', alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'inherit', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Name</label>
            <input
              className="form-input"
              placeholder="Sibling's name"
              value={newSibling.name}
              onChange={e => setNewSibling(s => ({ ...s, name: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addSibling()}
              style={{ padding: '10px 12px', fontSize: '14px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'inherit', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Age</label>
            <input
              type="number"
              className="form-input"
              placeholder="Age"
              value={newSibling.age ?? ''}
              onChange={e => setNewSibling(s => ({ ...s, age: e.target.value ? Number(e.target.value) : undefined }))}
              style={{ padding: '10px 12px', fontSize: '14px', width: '80px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'inherit', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '5px' }}>Profession</label>
            <input
              className="form-input"
              placeholder="Profession"
              value={newSibling.profession ?? ''}
              onChange={e => setNewSibling(s => ({ ...s, profession: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && addSibling()}
              style={{ padding: '10px 12px', fontSize: '14px', width: '130px' }}
            />
          </div>
          <button
            type="button"
            onClick={addSibling}
            disabled={!newSibling.name.trim()}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1.5px solid #7C3AED',
              background: 'rgba(124,58,237,0.08)',
              color: '#7C3AED',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              cursor: newSibling.name.trim() ? 'pointer' : 'not-allowed',
              opacity: newSibling.name.trim() ? 1 : 0.4,
              whiteSpace: 'nowrap' as const}}
          >
            + Add
          </button>
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
