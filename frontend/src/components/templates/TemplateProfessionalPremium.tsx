import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } } }
const fadeLeft = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function TemplateProfessionalPremium({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '?'

  function scrollGallery(dir: 'left' | 'right') {
    if (!galleryRef.current) return
    const card = 316
    const next = dir === 'right' ? activeSlide + 1 : activeSlide - 1
    const clamped = Math.max(0, Math.min(next, media.galleryPhotos.length - 1))
    setActiveSlide(clamped)
    galleryRef.current.scrollTo({ left: clamped * card, behavior: 'smooth' })
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FFFFFF', minHeight: '100vh', color: '#1A1A1A' }}>
      {/* DARK NAVY HEADER */}
      <section style={{ background: '#0F172A', padding: 'clamp(40px,6vw,72px) clamp(24px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 40px)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.23,1,0.32,1] }}
          style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'flex-start', gap: '36px', flexWrap: 'wrap', position: 'relative' }}>
          {media.profilePhoto ? (
            <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #0EA5E9', flexShrink: 0, boxShadow: '0 0 0 6px rgba(14,165,233,0.12)' }}>
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)', border: '3px solid #0EA5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 0 6px rgba(14,165,233,0.12)' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '52px', fontWeight: 800, color: 'white', letterSpacing: '-0.04em' }}>{initials}</span>
            </div>
          )}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: '#F1F5F9', letterSpacing: '-0.02em', lineHeight: 1.0, margin: 0, marginBottom: '12px' }}>
              {basicInfo.fullName || 'Your Name'}
            </h1>
            <p style={{ fontSize: '20px', color: '#0EA5E9', fontWeight: 600, margin: 0, marginBottom: '8px' }}>
              {career.currentDesignation || '—'}{career.company ? <> <span style={{ color: '#475569', fontWeight: 400 }}>at</span> {career.company}</> : null}
            </p>
            <p style={{ fontSize: '14px', color: '#64748B', margin: 0, letterSpacing: '0.04em' }}>
              {[basicInfo.city, basicInfo.state].filter(Boolean).join(', ')}{career.yearsOfExperience > 0 ? ` · ${career.yearsOfExperience} yrs experience` : ''}{career.industry ? ` · ${career.industry}` : ''}
            </p>
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(24px,6vw,80px)', display: 'flex', flexWrap: 'wrap' }}>
          {[
            { label: 'Age', value: basicInfo.age > 0 ? `${basicInfo.age}` : '—', unit: 'years', border: '#0EA5E9' },
            { label: 'Height', value: basicInfo.height || '—', unit: '', border: '#6366F1' },
            { label: 'Qualification', value: education.highestQualification || '—', unit: '', border: '#10B981' },
            { label: 'Experience', value: career.yearsOfExperience > 0 ? `${career.yearsOfExperience}` : '—', unit: 'years', border: '#F59E0B' },
          ].map(({ label, value, unit, border }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              style={{ flex: '1 1 120px', padding: '20px 24px', borderTop: `3px solid ${border}`, borderRight: '1px solid #E2E8F0' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '6px' }}>{label}</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {value}<span style={{ fontSize: '13px', fontWeight: 500, color: '#94A3B8', marginLeft: '4px' }}>{unit}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px clamp(24px,6vw,80px) 0' }}>
          <div style={{ background: '#F8FAFC', borderLeft: '4px solid #0EA5E9', borderRadius: '0 12px 12px 0', padding: '28px 32px' }}>
            <p style={{ fontSize: '17px', color: '#334155', lineHeight: 1.85, margin: 0 }}>
              <strong style={{ color: '#0F172A' }}>{basicInfo.fullName.split(' ')[0]}</strong> — {basicInfo.aboutMe}
            </p>
          </div>
        </motion.section>
      )}

      {/* CAREER TIMELINE */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px clamp(24px,6vw,80px) 0' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '28px' }}>Career</h2>
        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '3px', background: '#0EA5E9', borderRadius: '2px' }} />
          <motion.div variants={fadeLeft} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-27px', top: '14px', width: '14px', height: '14px', borderRadius: '50%', background: 'white', border: '3px solid #0EA5E9', boxShadow: '0 0 0 3px rgba(14,165,233,0.15)' }} />
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg,#0EA5E9,#6366F1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 800, color: 'white' }}>{(career.company || 'C')[0].toUpperCase()}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '19px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{career.currentDesignation || '—'}</p>
                      <p style={{ fontSize: '14px', color: '#0EA5E9', fontWeight: 600, margin: 0 }}>{career.company}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>{career.industry}{career.yearsOfExperience > 0 ? ` · ${career.yearsOfExperience} years` : ''}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <span style={{ padding: '4px 12px', background: '#EFF6FF', color: '#0EA5E9', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>Current</span>
                  {career.showIncome && career.annualIncome && (
                    <span style={{ padding: '4px 12px', background: '#F0FDF4', color: '#10B981', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>{career.annualIncome} p.a.</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* EDUCATION TIMELINE */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px clamp(24px,6vw,80px) 0' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '28px' }}>Education</h2>
        <div style={{ position: 'relative', paddingLeft: '32px' }}>
          <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '3px', background: '#10B981', borderRadius: '2px' }} />
          <motion.div variants={fadeLeft} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-27px', top: '14px', width: '14px', height: '14px', borderRadius: '50%', background: 'white', border: '3px solid #10B981', boxShadow: '0 0 0 3px rgba(16,185,129,0.15)' }} />
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '24px 28px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg,#10B981,#34D399)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: '20px' }}>🎓</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '19px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{education.highestQualification || '—'}</p>
                      <p style={{ fontSize: '14px', color: '#10B981', fontWeight: 600, margin: 0 }}>{education.field}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>{education.institution}{education.yearOfCompletion ? ` · ${education.yearOfCompletion}` : ''}</p>
                  {education.additionalCertifications && education.additionalCertifications.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                      {education.additionalCertifications.map((c, i) => (
                        <span key={i} style={{ padding: '3px 10px', background: '#ECFDF5', color: '#10B981', borderRadius: '999px', fontSize: '12px', fontWeight: 500 }}>{c}</span>
                      ))}
                    </div>
                  )}
                </div>
                {education.yearOfCompletion && (
                  <span style={{ padding: '4px 12px', background: '#ECFDF5', color: '#10B981', borderRadius: '999px', fontSize: '12px', fontWeight: 600, flexShrink: 0 }}>{education.yearOfCompletion}</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAMILY */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px clamp(24px,6vw,80px) 0' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '28px' }}>Family</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '16px', marginBottom: familyInfo.siblings.length > 0 ? '20px' : '0' }}>
          {[
            { label: 'Father', name: familyInfo.fatherName, sub: familyInfo.fatherProfession, co: familyInfo.fatherCompany },
            { label: 'Mother', name: familyInfo.motherName, sub: familyInfo.motherProfession, co: undefined },
            { label: 'Family Type', name: familyInfo.familyType ? familyInfo.familyType.charAt(0).toUpperCase() + familyInfo.familyType.slice(1) : '', sub: familyInfo.nativePlace ? `Native: ${familyInfo.nativePlace}` : '', co: undefined },
          ].filter(x => x.name).map(({ label, name, sub, co }) => (
            <motion.div key={label} variants={fadeUp}
              style={{ padding: '20px 22px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '8px' }}>{label}</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>{name}</p>
              {sub && <p style={{ fontSize: '13px', color: '#64748B' }}>{sub}{co ? ` · ${co}` : ''}</p>}
            </motion.div>
          ))}
        </div>
        {familyInfo.siblings.length > 0 && (
          <motion.div variants={fadeUp}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '10px' }}>Siblings</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '5px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', fontSize: '13px', color: '#334155', fontWeight: 500 }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}{s.married ? ' ✓' : ''}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* SKILLS & PERSONAL */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={stagger}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px clamp(24px,6vw,80px) 0' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '28px' }}>Skills & Personal</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '32px' }}>
          <motion.div variants={fadeLeft}>
            {personalInterests.languages.length > 0 && (
              <>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '10px' }}>Languages</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                  {personalInterests.languages.map((l, i) => (
                    <span key={i} style={{ padding: '5px 13px', background: '#EFF6FF', color: '#0EA5E9', borderRadius: '999px', fontSize: '13px', fontWeight: 600 }}>{l}</span>
                  ))}
                </div>
              </>
            )}
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '10px' }}>Lifestyle</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { l: personalInterests.dietaryPreference, bg: '#F0FDF4', c: '#16A34A' },
                { l: `Smoking: ${personalInterests.smokingHabit}`, bg: '#F8FAFC', c: '#64748B' },
                { l: `Drinking: ${personalInterests.drinkingHabit}`, bg: '#F8FAFC', c: '#64748B' },
              ].map((x, i) => x.l && (
                <span key={i} style={{ padding: '5px 13px', background: x.bg, color: x.c, borderRadius: '999px', fontSize: '12px', fontWeight: 500, textTransform: 'capitalize' }}>{x.l}</span>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeLeft}>
            {personalInterests.personalityTraits.length > 0 && (
              <>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '14px' }}>Personality</p>
                <ol style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {personalInterests.personalityTraits.map((t, i) => (
                    <li key={i} style={{ fontSize: '15px', color: '#334155', fontWeight: 500 }}>{t}</li>
                  ))}
                </ol>
              </>
            )}
            {personalInterests.hobbies.length > 0 && (
              <div style={{ marginTop: personalInterests.personalityTraits.length > 0 ? '20px' : '0' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '10px' }}>Hobbies</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {personalInterests.hobbies.map((h, i) => (
                    <span key={i} style={{ padding: '5px 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '999px', fontSize: '13px', color: '#334155', fontWeight: 500 }}>{h}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* GALLERY — HORIZONTAL SLIDE DECK */}
      {media.galleryPhotos.length > 0 && (
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
          style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px clamp(24px,6vw,80px) 0' }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: '20px' }}>Moments</h2>
          <div style={{ position: 'relative' }}>
            <div ref={galleryRef}
              style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', borderRadius: '12px', paddingBottom: '4px' }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i} whileHover={{ scale: 1.02 }} onClick={() => setLightbox(photo)}
                  style={{ flexShrink: 0, width: '300px', height: '169px', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <img src={photo} alt={`Moment ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </motion.div>
              ))}
            </div>
            {media.galleryPhotos.length > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => scrollGallery('left')} disabled={activeSlide === 0}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E2E8F0', background: 'white', cursor: activeSlide === 0 ? 'not-allowed' : 'pointer', fontSize: '14px', color: activeSlide === 0 ? '#CBD5E1' : '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    ◀
                  </button>
                  <button onClick={() => scrollGallery('right')} disabled={activeSlide === media.galleryPhotos.length - 1}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E2E8F0', background: 'white', cursor: activeSlide === media.galleryPhotos.length - 1 ? 'not-allowed' : 'pointer', fontSize: '14px', color: activeSlide === media.galleryPhotos.length - 1 ? '#CBD5E1' : '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    ▶
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {media.galleryPhotos.map((_, i) => (
                    <div key={i} onClick={() => { setActiveSlide(i); galleryRef.current?.scrollTo({ left: i * 312, behavior: 'smooth' }) }}
                      style={{ width: i === activeSlide ? '20px' : '6px', height: '6px', borderRadius: '3px', background: i === activeSlide ? '#0EA5E9' : '#E2E8F0', cursor: 'pointer', transition: 'all 0.3s ease' }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* PROFILE REQUIREMENTS */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px clamp(24px,6vw,80px) 60px' }}>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0EA5E9', marginBottom: '24px' }}>Profile Requirements</h2>
        <div style={{ background: '#F0F9FF', borderRadius: '14px', padding: '28px 32px', border: '1px solid #BAE6FD' }}>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#0F172A', fontSize: '15px', lineHeight: 2.1 }}>
            <li>Age between <strong>{matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years</strong></li>
            {matchPreferences.location && matchPreferences.location.length > 0 && (
              <li>Location: <strong>{matchPreferences.location.join(', ')}</strong></li>
            )}
            {matchPreferences.education && matchPreferences.education.length > 0 && (
              <li>Education: <strong>{matchPreferences.education.join(' / ')}</strong></li>
            )}
            {matchPreferences.profession && matchPreferences.profession.length > 0 && (
              <li>Profession: <strong>{matchPreferences.profession.join(' / ')}</strong></li>
            )}
          </ul>
          {matchPreferences.expectations && (
            <blockquote style={{ margin: '16px 0 0', paddingLeft: '16px', borderLeft: '3px solid #0EA5E9', fontSize: '14px', color: '#334155', lineHeight: 1.75, fontStyle: 'italic' }}>
              {matchPreferences.expectations}
            </blockquote>
          )}
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer style={{ background: '#0F172A', padding: '32px clamp(24px,6vw,80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '40px' }}>
        <div>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#F1F5F9', margin: 0 }}>{basicInfo.fullName}</p>
          <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px', margin: 0 }}>
            {[basicInfo.city, basicInfo.state].filter(Boolean).join(', ')}
          </p>
        </div>
        <p style={{ fontSize: '11px', color: '#334155', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Profile prepared on wymm</p>
      </footer>

      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'pointer' }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px' }} />
        </motion.div>
      )}
    </div>
  )
}
