import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { useBiodataStore } from '@/store/biodataStore'

type LifestyleOption = 'no' | 'occasionally' | 'yes'
type DietOption = 'vegetarian' | 'non-vegetarian' | 'vegan' | 'eggetarian'

const HOBBY_SUGGESTIONS = ['Reading', 'Cooking', 'Travelling', 'Music', 'Sports', 'Yoga', 'Photography', 'Painting', 'Dancing', 'Gaming']
const LANGUAGE_SUGGESTIONS = ['Hindi', 'English', 'Marathi', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Gujarati', 'Punjabi']
const PERSONALITY_OPTIONS = ['Ambitious', 'Creative', 'Caring', 'Humorous', 'Spiritual', 'Family-oriented', 'Adventurous', 'Intellectual', 'Calm', 'Outgoing']

const DIET_OPTIONS: { value: DietOption; label: string; emoji: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian', emoji: '🥗' },
  { value: 'non-vegetarian', label: 'Non-Veg', emoji: '🍗' },
  { value: 'vegan', label: 'Vegan', emoji: '🌱' },
  { value: 'eggetarian', label: 'Eggetarian', emoji: '🥚' },
]

const LIFESTYLE_OPTIONS: { value: LifestyleOption; label: string }[] = [
  { value: 'no', label: 'No' },
  { value: 'occasionally', label: 'Occasionally' },
  { value: 'yes', label: 'Yes' },
]

function TagInput({
  tags,
  suggestions,
  placeholder,
  onAdd,
  onRemove}: {
  tags: string[]
  suggestions: string[]
  placeholder: string
  onAdd: (tag: string) => void
  onRemove: (tag: string) => void
}) {
  const [input, setInput] = useState('')

  function add(val: string) {
    const trimmed = val.trim()
    if (!trimmed || tags.includes(trimmed)) return
    onAdd(trimmed)
    setInput('')
  }

  const unusedSuggestions = suggestions.filter(s => !tags.includes(s))

  return (
    <div>
      {/* Current tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
          {tags.map(tag => (
            <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(124,58,237,0.1)', color: '#7C3AED', borderRadius: '99px', fontSize: '13px', fontWeight: 500 }}>
              {tag}
              <button type="button" onClick={() => onRemove(tag)} style={{ background: 'none', border: 'none', color: '#A78BFA', cursor: 'pointer', fontSize: '14px', lineHeight: 1, padding: 0 }}>×</button>
            </span>
          ))}
        </div>
      )}
      {/* Input */}
      <input
        className="form-input"
        placeholder={placeholder}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input) } }}
        style={{ marginBottom: '10px' }}
      />
      {/* Suggestions */}
      {unusedSuggestions.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {unusedSuggestions.map(s => (
            <button key={s} type="button" onClick={() => onAdd(s)} style={{ padding: '4px 12px', background: '#F8F9FB', color: 'inherit', border: '1px solid #E5E5E5', borderRadius: '99px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', transition: 'all 150ms ease' }}>
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PillGroup<T extends string>({
  options,
  value,
  onChange}: {
  options: { value: T; label: string; emoji?: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          style={{
            padding: '9px 18px',
            borderRadius: '10px',
            border: `1.5px solid ${value === opt.value ? '#7C3AED' : '#E5E5E5'}`,
            background: value === opt.value ? 'rgba(124,58,237,0.08)' : 'white',
            color: value === opt.value ? '#7C3AED' : '#666',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: value === opt.value ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 150ms ease'}}
        >
          {opt.emoji && <span style={{ marginRight: '6px' }}>{opt.emoji}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function StepPersonalInterests() {
  const { t } = useTranslation()
  const { biodata, updatePersonalInterests } = useBiodataStore()
  const { personalInterests } = biodata

  function addHobby(tag: string) { updatePersonalInterests({ hobbies: [...personalInterests.hobbies, tag] }) }
  function removeHobby(tag: string) { updatePersonalInterests({ hobbies: personalInterests.hobbies.filter(h => h !== tag) }) }
  function addLanguage(tag: string) { updatePersonalInterests({ languages: [...personalInterests.languages, tag] }) }
  function removeLanguage(tag: string) { updatePersonalInterests({ languages: personalInterests.languages.filter(l => l !== tag) }) }

  function toggleTrait(trait: string) {
    const current = personalInterests.personalityTraits
    if (current.includes(trait)) {
      updatePersonalInterests({ personalityTraits: current.filter(t => t !== trait) })
    } else if (current.length < 5) {
      updatePersonalInterests({ personalityTraits: [...current, trait] })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      <div>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: 'inherit', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          Interests & lifestyle
        </p>
        <p style={{ fontSize: '14px', color: 'inherit', lineHeight: 1.6 }}>
          Let your personality shine through. Type and press Enter to add your own, or pick from suggestions.
        </p>
      </div>

      {/* Hobbies */}
      <div>
        <label className="form-label">Hobbies</label>
        <TagInput tags={personalInterests.hobbies} suggestions={HOBBY_SUGGESTIONS} placeholder="Type a hobby and press Enter" onAdd={addHobby} onRemove={removeHobby} />
      </div>

      {/* Languages */}
      <div>
        <label className="form-label">Languages Known</label>
        <TagInput tags={personalInterests.languages} suggestions={LANGUAGE_SUGGESTIONS} placeholder="Type a language and press Enter" onAdd={addLanguage} onRemove={removeLanguage} />
      </div>

      {/* Dietary Preference */}
      <div>
        <label className="form-label">Dietary Preference</label>
        <PillGroup
          options={DIET_OPTIONS}
          value={personalInterests.dietaryPreference}
          onChange={v => updatePersonalInterests({ dietaryPreference: v })}
        />
      </div>

      {/* Smoking */}
      <div>
        <label className="form-label">Smoking</label>
        <PillGroup
          options={LIFESTYLE_OPTIONS}
          value={personalInterests.smokingHabit}
          onChange={v => updatePersonalInterests({ smokingHabit: v })}
        />
      </div>

      {/* Drinking */}
      <div>
        <label className="form-label">Drinking</label>
        <PillGroup
          options={LIFESTYLE_OPTIONS}
          value={personalInterests.drinkingHabit}
          onChange={v => updatePersonalInterests({ drinkingHabit: v })}
        />
      </div>

      {/* Personality Traits */}
      <div>
        <label className="form-label">
          Personality Traits
          <span style={{ fontWeight: 400, textTransform: 'none', color: 'inherit', marginLeft: '8px', letterSpacing: 0, fontSize: '11px' }}>
            ({personalInterests.personalityTraits.length}/5 selected)
          </span>
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
          {PERSONALITY_OPTIONS.map(trait => {
            const selected = personalInterests.personalityTraits.includes(trait)
            const maxed = personalInterests.personalityTraits.length >= 5 && !selected
            return (
              <button
                key={trait}
                type="button"
                onClick={() => toggleTrait(trait)}
                disabled={maxed}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: `1.5px solid ${selected ? '#7C3AED' : '#E5E5E5'}`,
                  background: selected ? 'rgba(124,58,237,0.1)' : 'white',
                  color: selected ? '#7C3AED' : maxed ? '#CCC' : '#666',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: selected ? 600 : 400,
                  cursor: maxed ? 'not-allowed' : 'pointer',
                  transition: 'all 150ms ease'}}
              >
                {trait}
              </button>
            )
          })}
        </div>
        {personalInterests.personalityTraits.length >= 5 && (
          <p style={{ fontSize: '12px', color: 'inherit', marginTop: '8px' }}>Maximum 5 traits selected</p>
        )}
      </div>
    </div>
  )
}
