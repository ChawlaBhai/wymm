import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } } }
const fadeLeft = { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } } }
const fadeRight = { hidden: { opacity: 0, x: 36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const HOBBY_EMOJI: Record<string, string> = {
  reading: '📚', cooking: '🍳', travel: '✈️', music: '🎵', art: '🎨',
  photography: '📸', fitness: '💪', yoga: '🧘', dance: '💃', writing: '✍️',
  gaming: '🎮', movies: '🎬', hiking: '🥾', cycling: '🚴', swimming: '🏊',
  singing: '🎤', painting: '🖌️', gardening: '🌱', cricket: '🏏', chess: '♟️',
  baking: '🧁', fashion: '👗', sports: '⚽', theatre: '🎭', volunteering: '🤝',
}
function getEmoji(hobby: string): string {
  const lower = hobby.toLowerCase()
  for (const [k, v] of Object.entries(HOBBY_EMOJI)) { if (lower.includes(k)) return v }
  return '✨'
}

export default function TemplateRefinedElegance({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '?'
  const essence = personalInterests.personalityTraits.slice(0, 3).join(' · ') || 'Thoughtful · Warm · Genuine'

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FDFCFF', minHeight: '100vh', color: '#1A1A1A' }}>
      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px clamp(24px,6vw,80px)', textAlign: 'center', position: 'relative', background: 'radial-gradient(ellipse at 12% 10%, rgba(196,181,253,0.12) 0%, transparent 55%), radial-gradient(ellipse at 88% 90%, rgba(251,207,232,0.10) 0%, transparent 50%), #FDFCFF', overflow: 'hidden' }}>
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} style={{ marginBottom: '24px' }}>
          <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
            <line x1="0" y1="14" x2="24" y2="0" stroke="#EC4899" strokeWidth="1.2" strokeOpacity="0.45"/>
            <line x1="0" y1="14" x2="24" y2="28" stroke="#EC4899" strokeWidth="1.2" strokeOpacity="0.45"/>
            <line x1="60" y1="14" x2="36" y2="0" stroke="#EC4899" strokeWidth="1.2" strokeOpacity="0.45"/>
            <line x1="60" y1="14" x2="36" y2="28" stroke="#EC4899" strokeWidth="1.2" strokeOpacity="0.45"/>
            <circle cx="30" cy="14" r="3" fill="#EC4899" fillOpacity="0.6"/>
          </svg>
        </motion.div>
        {media.profilePhoto ? (
          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.23,1,0.32,1] }}
            style={{ marginBottom: '28px', position: 'relative', display: 'inline-block' }}>
            <div style={{ width: '220px', height: '220px', borderRadius: '50%', border: '1px solid rgba(236,72,153,0.3)', padding: '6px', display: 'inline-block' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '4px solid white', boxShadow: '0 8px 32px rgba(236,72,153,0.15)' }}>
                <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '8px', right: '-4px', width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #EC4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(124,58,237,0.3)' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '14px', fontWeight: 800, color: 'white' }}>{basicInfo.age > 0 ? basicInfo.age : initials}</span>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.23,1,0.32,1] }}
            style={{ marginBottom: '28px', width: '220px', height: '220px', borderRadius: '50%', border: '1px solid rgba(236,72,153,0.3)', padding: '6px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #EDE9FE, #FCE7F3)', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(124,58,237,0.1)' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '60px', fontWeight: 800, background: 'linear-gradient(135deg, #7C3AED, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{initials}</span>
            </div>
          </motion.div>
        )}
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.23,1,0.32,1] }}
          style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(40px,7vw,72px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#1A1A1A', lineHeight: 1.05, margin: 0, marginBottom: '16px' }}>
          {basicInfo.fullName || 'Your Name'}
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.55, ease: [0.23,1,0.32,1] }}
          style={{ width: '200px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', transformOrigin: 'center' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.5))' }}/>
          <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="#EC4899" fillOpacity="0.7"/></svg>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(236,72,153,0.5), transparent)' }}/>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.75 }}
          style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontStyle: 'italic', color: '#888', margin: 0, marginBottom: '10px', letterSpacing: '0.02em' }}>
          {essence}
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.88 }}
          style={{ fontSize: '13px', color: '#BBB', margin: 0, letterSpacing: '0.06em' }}>
          {[basicInfo.city, basicInfo.state].filter(Boolean).join(', ')}{basicInfo.religion ? ` · ${basicInfo.religion}` : ''}
        </motion.p>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: '36px' }}>
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" style={{ opacity: 0.3 }}>
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="#EC4899" strokeWidth="1.5"/>
            <rect x="9" y="7" width="2" height="6" rx="1" fill="#EC4899"/>
          </svg>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px clamp(24px,6vw,80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '60px', alignItems: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeLeft}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {media.profilePhoto ? (
              <div style={{ width: '260px', height: '300px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(124,58,237,0.14)' }}>
                <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ width: '260px', height: '300px', borderRadius: '20px', background: 'linear-gradient(135deg, #EDE9FE, #FCE7F3)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 24px 60px rgba(124,58,237,0.1)' }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '80px', fontWeight: 800, background: 'linear-gradient(135deg, #7C3AED, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{initials}</span>
              </div>
            )}
            {([
              { l: 'Age', v: basicInfo.age > 0 ? `${basicInfo.age} years` : '' },
              { l: 'Religion', v: basicInfo.religion },
              { l: 'Mother Tongue', v: basicInfo.motherTongue },
              { l: 'Height', v: basicInfo.height },
            ] as {l:string;v:string}[]).filter(x => x.v).map(({ l, v }) => (
              <div key={l} style={{ display: 'flex', gap: '10px', alignItems: 'baseline', width: '260px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C4B5E8', minWidth: '100px' }}>{l}</span>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>{v}</span>
              </div>
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeRight}>
            {basicInfo.aboutMe && (
              <div style={{ borderLeft: '3px solid', borderImage: 'linear-gradient(180deg,#7C3AED,#EC4899) 1', paddingLeft: '24px', marginBottom: '28px' }}>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(16px,2vw,20px)', lineHeight: 2, color: '#444', fontStyle: 'italic' }}>
                  "{basicInfo.aboutMe}"
                </p>
              </div>
            )}
            {personalInterests.personalityTraits.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {personalInterests.personalityTraits.slice(0, 4).map((t, i) => (
                  <span key={i} style={{ padding: '6px 16px', background: 'rgba(196,181,253,0.18)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '999px', fontSize: '13px', color: '#7C3AED', fontWeight: 500 }}>{t}</span>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '80px clamp(24px,6vw,80px)', background: 'linear-gradient(180deg, rgba(252,231,243,0.08) 0%, transparent 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B5E8', marginBottom: '8px' }}>The family behind</p>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(24px,3vw,32px)', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em', margin: 0 }}>
              {basicInfo.fullName.split(' ')[0]}'s Family
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginTop: '12px' }}>
              <div style={{ flex: '0 0 60px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(236,72,153,0.4))' }}/>
              <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="#EC4899" fillOpacity="0.6"/></svg>
              <div style={{ flex: '0 0 60px', height: '1px', background: 'linear-gradient(90deg,rgba(236,72,153,0.4),transparent)' }}/>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '20px', marginBottom: familyInfo.siblings.length > 0 ? '28px' : '0' }}>
            {[
              { label: 'Father', name: familyInfo.fatherName, sub: familyInfo.fatherProfession, co: familyInfo.fatherCompany, grad: 'linear-gradient(135deg,rgba(124,58,237,0.07),rgba(124,58,237,0.02))', tag: '#7C3AED' },
              { label: 'Mother', name: familyInfo.motherName, sub: familyInfo.motherProfession, co: undefined, grad: 'linear-gradient(135deg,rgba(236,72,153,0.07),rgba(236,72,153,0.02))', tag: '#EC4899' },
            ].filter(x => x.name).map(({ label, name, sub, co, grad, tag }) => (
              <motion.div key={label} variants={fadeUp}
                style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', background: 'white' }}>
                <div style={{ height: '48px', background: grad }} />
                <div style={{ padding: '20px 24px 24px', marginTop: '-16px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: tag, marginBottom: '6px' }}>{label}</p>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>{name}</p>
                  {sub && <p style={{ fontSize: '14px', color: '#888' }}>{sub}{co ? ` · ${co}` : ''}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>
          {familyInfo.siblings.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4B5E8', marginBottom: '12px' }}>Siblings</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {familyInfo.siblings.map((s, i) => (
                  <span key={i} style={{ padding: '6px 16px', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '999px', fontSize: '13px', color: '#92400E', fontWeight: 500 }}>
                    {s.name}{s.profession ? ` · ${s.profession}` : ''}{s.married ? ' (Married)' : ''}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
          {familyInfo.familyValues && (
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ textAlign: 'center', fontSize: '15px', color: '#888', fontStyle: 'italic', marginTop: '28px' }}>
              "{familyInfo.familyValues}"
            </motion.p>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px clamp(24px,6vw,80px)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B5E8', marginBottom: '6px' }}>Building a life</p>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em', margin: 0 }}>Education & Career</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '24px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeLeft}>
            <div style={{ background: '#EFF6FF', borderRadius: '20px', padding: '32px', height: '100%' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>📚</div>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#60A5FA', marginBottom: '10px' }}>Education</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1E3A5F', marginBottom: '6px' }}>{education.highestQualification || '—'}</p>
              <p style={{ fontSize: '15px', color: '#3B82F6', fontWeight: 500, marginBottom: '4px' }}>{education.field}</p>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>{education.institution}{education.yearOfCompletion ? ` · ${education.yearOfCompletion}` : ''}</p>
              {education.additionalCertifications && education.additionalCertifications.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                  {education.additionalCertifications.map((c, i) => (
                    <span key={i} style={{ padding: '3px 10px', background: 'rgba(59,130,246,0.1)', color: '#3B82F6', borderRadius: '999px', fontSize: '12px', fontWeight: 500 }}>{c}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeRight}>
            <div style={{ background: '#FFFBEB', borderRadius: '20px', padding: '32px', height: '100%' }}>
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>💼</div>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F59E0B', marginBottom: '10px' }}>Career</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#78350F', marginBottom: '6px' }}>{career.currentDesignation || '—'}</p>
              <p style={{ fontSize: '15px', color: '#D97706', fontWeight: 500, marginBottom: '4px' }}>{career.company}</p>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>{career.industry}{career.yearsOfExperience > 0 ? ` · ${career.yearsOfExperience} yrs` : ''}</p>
              {career.showIncome && career.annualIncome && (
                <p style={{ fontSize: '13px', color: '#D97706', fontWeight: 600, marginTop: '10px' }}>{career.annualIncome} p.a.</p>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '80px clamp(24px,6vw,80px)', background: 'radial-gradient(ellipse at 50% 0%, rgba(196,181,253,0.07) 0%, transparent 60%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B5E8', marginBottom: '6px' }}>What makes her/him</p>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em', margin: 0 }}>Interests & Life</h2>
          </motion.div>
          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px,1fr))', gap: '16px', marginBottom: '40px' }}>
              {personalInterests.hobbies.slice(0, 8).map((h, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(124,58,237,0.1)' }}
                  style={{ background: 'white', borderRadius: '16px', padding: '22px 12px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(124,58,237,0.06)', cursor: 'default', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '30px', marginBottom: '8px' }}>{getEmoji(h)}</div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#555', margin: 0 }}>{h}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '28px' }}>
            {personalInterests.languages.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4B5E8', marginBottom: '12px' }}>Languages</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {personalInterests.languages.map((l, i) => (
                    <span key={i} style={{ padding: '6px 16px', background: '#EFF6FF', color: '#3B82F6', borderRadius: '999px', fontSize: '14px', fontWeight: 500 }}>{l}</span>
                  ))}
                </div>
              </motion.div>
            )}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4B5E8', marginBottom: '12px' }}>Lifestyle</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { label: personalInterests.dietaryPreference, color: '#86EFAC', bg: '#F0FDF4' },
                  { label: `Smoking: ${personalInterests.smokingHabit}`, color: '#94A3B8', bg: '#F8FAFC' },
                  { label: `Drinking: ${personalInterests.drinkingHabit}`, color: '#94A3B8', bg: '#F8FAFC' },
                ].filter(x => x.label).map((item, i) => (
                  <span key={i} style={{ padding: '6px 14px', background: item.bg, color: item.color, borderRadius: '999px', fontSize: '13px', fontWeight: 500, textTransform: 'capitalize' }}>{item.label}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY — POLAROID WALL */}
      {media.galleryPhotos.length > 0 && (
        <section style={{ padding: '80px clamp(24px,6vw,80px)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B5E8', marginBottom: '6px' }}>A glimpse</p>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em', margin: 0 }}>Gallery</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: '24px', justifyItems: 'center' }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, rotate: i % 2 === 0 ? 10 : -10 }}
                  whileInView={{ opacity: 1, rotate: i % 2 === 0 ? 2 : -2 }}
                  whileHover={{ rotate: 0, scale: 1.06, boxShadow: '0 20px 48px rgba(0,0,0,0.16)', zIndex: 10 }}
                  viewport={{ once: true }}
                  onClick={() => setLightbox(photo)}
                  style={{ background: 'white', padding: '10px 10px 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.10)', cursor: 'pointer', width: '160px', rotate: `${i % 2 === 0 ? 2 : -2}deg`, transition: 'all 0.3s ease' }}>
                  <div style={{ width: '140px', height: '140px', overflow: 'hidden' }}>
                    <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ height: '16px' }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* MATCH PREFERENCES */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(24px,6vw,80px) 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B5E8', marginBottom: '6px' }}>A letter to the universe</p>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em', margin: 0 }}>Looking For</h2>
        </div>
        <div style={{ position: 'relative', background: 'white', borderRadius: '24px', padding: '40px 44px', boxShadow: '0 8px 48px rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.08)' }}>
          <div style={{ position: 'absolute', top: '16px', left: '24px', fontFamily: 'Sora, sans-serif', fontSize: '100px', fontWeight: 800, color: '#7C3AED', opacity: 0.06, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>
          <p style={{ fontSize: 'clamp(15px,2vw,17px)', lineHeight: 2, color: '#555', fontStyle: 'italic', position: 'relative', zIndex: 1, margin: 0, marginBottom: matchPreferences.expectations ? '20px' : '0' }}>
            I am looking for someone between{' '}
            <strong style={{ color: '#7C3AED', fontStyle: 'normal' }}>{matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years</strong>
            {matchPreferences.location && matchPreferences.location.length > 0 && (
              <>, preferably from <strong style={{ color: '#7C3AED', fontStyle: 'normal' }}>{matchPreferences.location.join(', ')}</strong></>
            )}
            {matchPreferences.education && matchPreferences.education.length > 0 && (
              <>, with a background in <strong style={{ color: '#7C3AED', fontStyle: 'normal' }}>{matchPreferences.education.join(' or ')}</strong></>
            )}
            {matchPreferences.profession && matchPreferences.profession.length > 0 && (
              <>, working as <strong style={{ color: '#7C3AED', fontStyle: 'normal' }}>{matchPreferences.profession.join(' or ')}</strong></>
            )}.
          </p>
          {matchPreferences.expectations && (
            <p style={{ fontSize: '16px', color: '#888', lineHeight: 1.85, fontStyle: 'italic', borderTop: '1px solid rgba(124,58,237,0.08)', paddingTop: '20px', margin: 0 }}>
              {matchPreferences.expectations}
            </p>
          )}
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer style={{ background: 'linear-gradient(180deg,rgba(232,223,245,0.1) 0%,rgba(252,231,243,0.08) 100%)', borderTop: '1px solid rgba(124,58,237,0.08)', padding: '60px clamp(24px,6vw,80px) 48px', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 700, background: 'linear-gradient(135deg,#7C3AED,#EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0, marginBottom: '12px' }}>
            {basicInfo.fullName}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '12px' }}>
            <div style={{ flex: '0 0 40px', height: '1px', background: 'linear-gradient(90deg,transparent,rgba(236,72,153,0.4))' }}/>
            <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="#EC4899" fillOpacity="0.6"/></svg>
            <div style={{ flex: '0 0 40px', height: '1px', background: 'linear-gradient(90deg,rgba(236,72,153,0.4),transparent)' }}/>
          </div>
          <p style={{ fontSize: '13px', color: '#AAA', margin: 0, marginBottom: '24px' }}>
            {[basicInfo.city, basicInfo.state, basicInfo.country].filter(Boolean).join(', ')}
          </p>
          <p style={{ fontSize: '11px', color: '#CCC', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Profile on wymm</p>
        </motion.div>
      </footer>

      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'pointer' }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} />
        </motion.div>
      )}
    </div>
  )
}
