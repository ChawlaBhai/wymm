import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }

const C = {
  bg: '#FAFAF8',
  text: '#1C2B1E',
  pine: '#3D6B47',
  sage: '#6B8F71',
  amber: '#C4956A',
  stone: '#F0EDE6',
  border: '#E8E4DC',
  hero: '#1C2B1E',
}

function SectionLeaf() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '10px' }}>
      <path d="M14 3 C14 3 6 8 6 16 C6 21 9.5 24.5 14 25 C18.5 24.5 22 21 22 16 C22 8 14 3 14 3Z" fill="#3D6B47" fillOpacity="0.7" />
      <line x1="14" y1="25" x2="14" y2="10" stroke="#1C2B1E" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
      <SectionLeaf />
      <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '22px', fontWeight: 700, color: C.text, letterSpacing: '-0.01em', margin: 0 }}>
        {children}
      </h2>
    </motion.div>
  )
}

function InfoCell({ label, value }: { label: string; value: string }) {
  if (!value || value === '—') return null
  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: '10px', padding: '16px 20px', minWidth: '120px' }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.sage, marginBottom: '6px' }}>{label}</div>
      <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '17px', fontWeight: 700, color: C.text }}>{value}</div>
    </div>
  )
}

export default function TemplateMountainSoul({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '?'

  const dietLabel: Record<string, string> = {
    vegetarian: 'Vegetarian',
    'non-vegetarian': 'Non-Vegetarian',
    vegan: 'Vegan',
    eggetarian: 'Eggetarian',
  }

  const hobbyEmojis: Record<string, string> = {
    hiking: '🏔️', trekking: '🥾', reading: '📚', cooking: '🍳', music: '🎵', travel: '✈️',
    photography: '📸', yoga: '🧘', fitness: '🏋️', cycling: '🚴', swimming: '🏊', painting: '🎨',
    gardening: '🌱', movies: '🎬', gaming: '🎮', dancing: '💃', writing: '✍️', sports: '⚽',
    meditation: '🧘', chess: '♟️',
  }

  function getEmoji(hobby: string) {
    const lower = hobby.toLowerCase()
    for (const key of Object.keys(hobbyEmojis)) {
      if (lower.includes(key)) return hobbyEmojis[key]
    }
    return '🌿'
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: C.bg, minHeight: '100vh', color: C.text }}>

      {/* HERO */}
      <section style={{ background: C.hero, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 6vw 120px' }}>

        {/* Aurora shimmer */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <motion.div
            animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', top: '10%', left: '15%', width: '380px', height: '280px', background: 'radial-gradient(ellipse, rgba(61,107,71,0.35) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, -25, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            style={{ position: 'absolute', top: '40%', right: '10%', width: '300px', height: '220px', background: 'radial-gradient(ellipse, rgba(107,143,113,0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(50px)' }} />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
            style={{ position: 'absolute', bottom: '25%', left: '5%', width: '260px', height: '200px', background: 'radial-gradient(ellipse, rgba(20,60,30,0.4) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(45px)' }} />
        </div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 1, textAlign: 'center' }}>

          {/* Profile photo */}
          {media.profilePhoto ? (
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: `3px solid ${C.amber}`, boxShadow: `0 0 0 6px rgba(196,149,106,0.18)` }}>
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #2D5A35 0%, #3D6B47 100%)', border: `3px solid ${C.amber}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 6px rgba(196,149,106,0.18)` }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '40px', fontWeight: 800, color: 'white' }}>{initials}</span>
            </div>
          )}

          <div>
            <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, margin: 0, marginBottom: '14px' }}>
              {basicInfo.fullName || 'Your Name'}
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', margin: 0, letterSpacing: '0.04em' }}>
              {[career.currentDesignation, basicInfo.city].filter(Boolean).join(' · ')}
            </p>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
            style={{ marginTop: '16px', color: 'rgba(255,255,255,0.38)', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'lowercase' }}>
            explore ↓
          </motion.div>
        </motion.div>

        {/* Mountain silhouette */}
        <svg viewBox="0 0 1440 200" style={{ position: 'absolute', bottom: 0, width: '100%', left: 0 }} preserveAspectRatio="none">
          <path d="M0,200 L0,120 L180,40 L360,110 L540,20 L720,90 L900,10 L1080,80 L1260,30 L1440,70 L1440,200 Z" fill={C.bg} />
        </svg>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '80px 6vw' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <SectionHeader>About Me</SectionHeader>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: C.stone, borderLeft: `3px solid ${C.pine}`, borderRadius: '0 12px 12px 0', padding: '32px 36px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '16px', left: '20px', fontFamily: 'Georgia, serif', fontSize: '80px', color: C.pine, opacity: 0.18, lineHeight: 1, userSelect: 'none' }}>"</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', lineHeight: 1.8, color: C.text, margin: 0, position: 'relative', zIndex: 1 }}>
                {basicInfo.aboutMe}
              </p>
              <div style={{ position: 'absolute', bottom: '16px', right: '24px', fontFamily: 'Georgia, serif', fontSize: '80px', color: C.pine, opacity: 0.18, lineHeight: 1, userSelect: 'none' }}>"</div>
            </motion.div>
          </div>
        </section>
      )}

      {/* INFO GRID */}
      <section style={{ padding: '0 6vw 80px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SectionHeader>Quick Details</SectionHeader>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {[
              { label: 'Age', value: basicInfo.age > 0 ? `${basicInfo.age} yrs` : '' },
              { label: 'Height', value: basicInfo.height },
              { label: 'Religion', value: basicInfo.religion },
              { label: 'Caste', value: basicInfo.caste },
              { label: 'Mother Tongue', value: basicInfo.motherTongue },
              { label: 'Location', value: [basicInfo.city, basicInfo.state].filter(Boolean).join(', ') },
              { label: 'Diet', value: dietLabel[personalInterests.dietaryPreference] || personalInterests.dietaryPreference },
              { label: 'Blood Group', value: basicInfo.bloodGroup || '' },
            ].map(({ label, value }) =>
              value ? (
                <motion.div key={label} variants={fadeUp}>
                  <InfoCell label={label} value={value} />
                </motion.div>
              ) : null
            )}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '0 6vw 80px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SectionHeader>Family</SectionHeader>
          {familyInfo.familyValues && (
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ fontStyle: 'italic', color: C.sage, fontSize: '15px', marginBottom: '28px', marginTop: '-12px' }}>
              {familyInfo.familyValues}
            </motion.p>
          )}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { role: 'Father', name: familyInfo.fatherName, profession: familyInfo.fatherProfession, company: familyInfo.fatherCompany },
              { role: 'Mother', name: familyInfo.motherName, profession: familyInfo.motherProfession },
            ].map(({ role, name, profession, company }) => (
              <motion.div key={role} variants={fadeUp}
                style={{ background: C.stone, border: `1px solid ${C.border}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.sage, marginBottom: '8px' }}>{role}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: C.text, marginBottom: '4px' }}>{name || '—'}</div>
                <div style={{ fontSize: '14px', color: C.pine }}>{profession}{company ? ` · ${company}` : ''}</div>
              </motion.div>
            ))}
          </motion.div>

          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: '12px', padding: '20px 24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.sage, marginBottom: '12px' }}>Siblings</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {familyInfo.siblings.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: C.text }}>
                    <span style={{ color: C.pine, fontSize: '10px' }}>🌲</span>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                    {s.age && <span style={{ color: C.sage }}>, {s.age} yrs</span>}
                    {s.profession && <span style={{ color: '#888' }}>· {s.profession}</span>}
                    {s.married !== undefined && <span style={{ color: s.married ? C.amber : C.sage, fontSize: '12px' }}>{s.married ? '(Married)' : '(Unmarried)'}</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {familyInfo.nativePlace && (
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ marginTop: '16px', fontSize: '14px', color: C.sage }}>
              Native Place: <span style={{ color: C.text, fontWeight: 600 }}>{familyInfo.nativePlace}</span>
            </motion.p>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER — trekker's log */}
      <section style={{ padding: '0 6vw 80px', background: C.stone }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', paddingTop: '80px' }}>
          <SectionHeader>Trail Log</SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Education */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div style={{ flexShrink: 0, width: '72px', textAlign: 'right' }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, color: C.amber }}>{education.yearOfCompletion || '—'}</span>
              </div>
              <div style={{ position: 'relative', paddingLeft: '28px', borderLeft: `2px solid ${C.border}`, paddingBottom: '32px' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: C.amber }} />
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.sage, marginBottom: '4px' }}>Education</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: C.text }}>{education.highestQualification}</div>
                <div style={{ fontSize: '14px', color: C.pine, marginTop: '2px' }}>{education.field} — {education.institution}</div>
                {education.additionalCertifications && education.additionalCertifications.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {education.additionalCertifications.map((c, i) => (
                      <span key={i} style={{ fontSize: '12px', background: '#fff', border: `1px solid ${C.border}`, borderRadius: '20px', padding: '3px 10px', color: C.sage }}>{c}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Career */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: '72px', textAlign: 'right' }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '13px', fontWeight: 700, color: C.pine }}>Now</span>
              </div>
              <div style={{ position: 'relative', paddingLeft: '28px', borderLeft: `2px solid ${C.border}`, paddingBottom: '32px' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: C.pine }} />
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.sage, marginBottom: '4px' }}>Career</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: C.text }}>{career.currentDesignation}</div>
                <div style={{ fontSize: '14px', color: C.pine, marginTop: '2px' }}>
                  🌲 Currently at {career.company} · {career.industry}
                </div>
                <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                  {career.yearsOfExperience > 0 && `${career.yearsOfExperience} years experience`}
                  {career.showIncome && career.annualIncome ? ` · ${career.annualIncome}` : ''}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '80px 6vw' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SectionHeader>Interests & Passions</SectionHeader>

          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px' }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.div key={i} variants={fadeUp}
                  style={{ background: C.stone, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>{getEmoji(h)}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: C.text }}>{h}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {personalInterests.languages.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.sage, marginBottom: '10px' }}>Languages</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {personalInterests.languages.map((l, i) => (
                  <span key={i} style={{ background: C.pine, color: '#fff', fontSize: '13px', fontWeight: 600, borderRadius: '20px', padding: '4px 14px' }}>{l}</span>
                ))}
              </div>
            </motion.div>
          )}

          {personalInterests.personalityTraits.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.sage, marginBottom: '10px' }}>Personality</div>
              <p style={{ fontStyle: 'italic', fontSize: '17px', color: C.text, lineHeight: 1.6 }}>
                {personalInterests.personalityTraits.join(' · ')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '0 6vw 80px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <SectionHeader>Trail Memories</SectionHeader>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '16px', paddingBottom: '12px' }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setLightbox(photo)}
                  style={{ flexShrink: 0, width: '240px', aspectRatio: '3/2', borderRadius: '10px', overflow: 'hidden', border: `2px solid ${C.amber}`, cursor: 'pointer', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)' }}>
                  <img src={photo} alt={`Memory ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      {matchPreferences.expectations && (
        <section style={{ padding: '0 6vw 80px', background: C.stone }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', paddingTop: '80px', paddingBottom: '80px' }}>
            <SectionHeader>Looking For</SectionHeader>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: '12px', padding: '32px' }}>
              <p style={{ fontStyle: 'italic', fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                Looking for a fellow traveller who shares the same love for life's journey...
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: C.text }}>
                {matchPreferences.expectations}
              </p>
              <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: C.sage }}>Age: {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} yrs</span>
                {matchPreferences.location && matchPreferences.location.length > 0 && (
                  <span style={{ fontSize: '13px', color: C.sage }}>· {matchPreferences.location.join(', ')}</span>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ background: C.hero, position: 'relative', overflow: 'hidden', padding: '60px 6vw 48px' }}>
        {/* Inverted mountain */}
        <svg viewBox="0 0 1440 200" style={{ position: 'absolute', top: 0, width: '100%', left: 0 }} preserveAspectRatio="none">
          <path d="M0,0 L0,80 L180,160 L360,90 L540,180 L720,110 L900,190 L1080,120 L1260,170 L1440,130 L1440,0 Z" fill={C.stone} />
        </svg>
        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '80px' }}>
          <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '32px', fontWeight: 700, color: '#fff', margin: 0, marginBottom: '8px' }}>
            {basicInfo.fullName}
          </h3>
          <p style={{ color: C.amber, fontSize: '15px', margin: 0 }}>
            {[basicInfo.city, basicInfo.state].filter(Boolean).join(', ')}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', marginTop: '32px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            made with wymm
          </p>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <img src={lightbox} alt="Gallery" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} />
        </motion.div>
      )}
    </div>
  )
}
