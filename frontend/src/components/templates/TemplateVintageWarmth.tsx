import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }

const C = {
  bg: '#FDF8F2',
  text: '#2D1B0E',
  brown: '#8B4513',
  terra: '#C4856A',
  peach: '#F5E6D3',
  border: '#E8D5C0',
}

function Ornament() {
  return (
    <span style={{ display: 'inline-block', margin: '0 10px', color: C.brown, opacity: 0.6 }}>✦</span>
  )
}

function ClassicRule() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
      <div style={{ flex: 1, height: '1px', background: C.border }} />
      <div style={{ width: '6px', height: '6px', background: C.brown, opacity: 0.4, transform: 'rotate(45deg)' }} />
      <div style={{ flex: 1, height: '1px', background: C.border }} />
    </div>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
      style={{ textAlign: 'center', marginBottom: '36px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
        <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: C.border }} />
        <Ornament />
        <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: C.border }} />
      </div>
      <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 400, color: C.text, letterSpacing: '0.05em', margin: 0 }}>
        {children}
      </h2>
    </motion.div>
  )
}

const photoRotations = [-1.5, 1, -0.8, 1.2, -1]

export default function TemplateVintageWarmth({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '?'

  const dietLabel: Record<string, string> = {
    vegetarian: 'Vegetarian',
    'non-vegetarian': 'Non-Vegetarian',
    vegan: 'Vegan',
    eggetarian: 'Eggetarian',
  }

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: C.bg, minHeight: '100vh', color: C.text }}>

      {/* HERO */}
      <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(24px, 8vw, 100px)', position: 'relative', textAlign: 'center' }}>
        {/* Vintage double border */}
        <div style={{
          position: 'absolute', inset: '20px',
          border: `1px solid ${C.border}`,
          borderRadius: '4px',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: '28px',
          border: `1px solid ${C.border}`,
          borderRadius: '2px',
          pointerEvents: 'none',
          opacity: 0.5,
        }} />

        {/* Large decorative swash */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '320px', color: C.brown, opacity: 0.05, pointerEvents: 'none',
          fontFamily: 'Georgia, serif', lineHeight: 1, userSelect: 'none',
        }}>❦</div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 1 }}>

          {/* Profile photo */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
            style={{ margin: '0 auto 28px', display: 'inline-block' }}>
            {media.profilePhoto ? (
              <div style={{
                width: '140px', height: '175px', overflow: 'hidden',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                boxShadow: `0 0 0 8px ${C.bg}, 0 0 0 10px ${C.border}, 0 0 0 14px ${C.bg}, 0 0 0 16px ${C.border}`,
              }}>
                <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{
                width: '140px', height: '175px',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                background: `linear-gradient(160deg, ${C.peach} 0%, ${C.border} 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 0 8px ${C.bg}, 0 0 0 10px ${C.border}, 0 0 0 14px ${C.bg}, 0 0 0 16px ${C.border}`,
              }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '48px', fontWeight: 700, color: C.brown }}>{initials}</span>
              </div>
            )}
          </motion.div>

          {/* Name */}
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 400, letterSpacing: '0.06em', color: C.text, margin: '0 0 16px', lineHeight: 1 }}>
            {basicInfo.fullName || 'Your Name'}
          </motion.h1>

          <ClassicRule />

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
            style={{ fontStyle: 'italic', fontSize: '18px', color: C.terra, letterSpacing: '0.04em', margin: '0 0 8px' }}>
            Seeking a soul that matches mine
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}
            style={{ fontSize: '14px', color: '#A08060', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {[career.currentDesignation, basicInfo.city].filter(Boolean).join(' · ')}
          </motion.p>
        </motion.div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '60px clamp(24px, 8vw, 120px)', background: C.bg }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <SectionHeader>About Me</SectionHeader>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ borderLeft: `3px solid ${C.terra}`, paddingLeft: '28px' }}>
              {/* Drop cap first letter */}
              <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.9, fontStyle: 'italic', color: C.text }}>
                <span style={{
                  float: 'left', fontFamily: 'Georgia, serif', fontSize: '64px', fontWeight: 700,
                  lineHeight: '0.75', marginRight: '8px', marginTop: '8px', color: C.brown,
                }}>
                  {basicInfo.aboutMe.charAt(0)}
                </span>
                {basicInfo.aboutMe.slice(1)}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* INFO GRID */}
      <section style={{ padding: '60px clamp(24px, 8vw, 120px)', background: C.peach }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <SectionHeader>A Little About Me</SectionHeader>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            {[
              { label: 'Age', value: basicInfo.age > 0 ? `${basicInfo.age} years` : '' },
              { label: 'Height', value: basicInfo.height },
              { label: 'Religion', value: basicInfo.religion },
              { label: 'Caste', value: basicInfo.caste },
              { label: 'Mother Tongue', value: basicInfo.motherTongue },
              { label: 'From', value: [basicInfo.city, basicInfo.state].filter(Boolean).join(', ') },
              { label: 'Diet', value: dietLabel[personalInterests.dietaryPreference] || personalInterests.dietaryPreference },
              { label: 'Family Type', value: basicInfo.motherTongue ? familyInfo.familyType : '' },
            ].filter(x => x.value).map(({ label, value }) => (
              <motion.div key={label} variants={fadeUp}
                style={{ background: C.bg, border: `1px dotted ${C.border}`, borderRadius: '8px', padding: '16px 18px' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: C.terra, marginBottom: '6px' }}>{label}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, color: C.text }}>{value}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '60px clamp(24px, 8vw, 120px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <SectionHeader>My Family</SectionHeader>
          {familyInfo.familyValues && (
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ textAlign: 'center', fontStyle: 'italic', fontSize: '16px', color: C.terra, marginBottom: '32px', marginTop: '-20px' }}>
              "A family of warmth and tradition"
            </motion.p>
          )}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            {[
              { role: 'Father', name: familyInfo.fatherName, detail: [familyInfo.fatherProfession, familyInfo.fatherCompany].filter(Boolean).join(', ') },
              { role: 'Mother', name: familyInfo.motherName, detail: familyInfo.motherProfession },
            ].map(({ role, name, detail }) => (
              <motion.div key={role} variants={fadeUp}
                style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '22px 24px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.terra, marginBottom: '8px' }}>{role}</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: C.text, marginBottom: '4px' }}>{name || '—'}</div>
                <div style={{ fontSize: '14px', color: C.brown, fontStyle: 'italic' }}>{detail}</div>
              </motion.div>
            ))}
          </motion.div>

          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: C.peach, border: `1px solid ${C.border}`, borderRadius: '8px', padding: '20px 24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.terra, marginBottom: '12px' }}>Siblings</div>
              {familyInfo.siblings.map((s, i) => (
                <div key={i} style={{ fontSize: '15px', color: C.text, marginBottom: '6px', fontStyle: 'italic' }}>
                  {s.name}{s.age ? `, ${s.age}` : ''}{s.profession ? ` — ${s.profession}` : ''}{s.married !== undefined ? ` (${s.married ? 'Married' : 'Unmarried'})` : ''}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER — editorial timeline */}
      <section style={{ padding: '60px clamp(24px, 8vw, 120px)', background: C.peach }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <SectionHeader>Education & Career</SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Education */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: C.brown, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '11px', fontWeight: 700, color: C.bg, textAlign: 'center', lineHeight: 1.2 }}>{education.yearOfCompletion || '—'}</span>
                </div>
              </div>
              <div style={{ flex: 1, paddingTop: '8px' }}>
                <div style={{ height: '1px', background: C.border, marginBottom: '12px' }} />
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '19px', fontWeight: 700, color: C.text }}>{education.highestQualification}</div>
                <div style={{ fontStyle: 'italic', fontSize: '15px', color: C.brown, marginTop: '4px' }}>{education.field} — {education.institution}</div>
                {education.additionalCertifications && education.additionalCertifications.length > 0 && (
                  <div style={{ marginTop: '8px', fontSize: '13px', color: '#9A7258', fontStyle: 'italic' }}>
                    Also: {education.additionalCertifications.join(', ')}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Career */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: C.terra, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 700, color: '#fff' }}>Now</span>
                </div>
              </div>
              <div style={{ flex: 1, paddingTop: '8px' }}>
                <div style={{ height: '1px', background: C.border, marginBottom: '12px' }} />
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '19px', fontWeight: 700, color: C.text }}>{career.currentDesignation}</div>
                <div style={{ fontStyle: 'italic', fontSize: '15px', color: C.brown, marginTop: '4px' }}>{career.company} · {career.industry}</div>
                <div style={{ fontSize: '13px', color: '#9A7258', marginTop: '4px' }}>
                  {career.yearsOfExperience > 0 && `${career.yearsOfExperience} years experience`}
                  {career.showIncome && career.annualIncome ? ` · ${career.annualIncome}` : ''}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '60px clamp(24px, 8vw, 120px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <SectionHeader>Passions & Interests</SectionHeader>

          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '28px', justifyContent: 'center' }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.div key={i} variants={fadeUp}
                  style={{ background: C.bg, border: `1px dotted ${C.border}`, borderRadius: '8px', padding: '10px 18px', fontSize: '14px', fontStyle: 'italic', color: C.text }}>
                  {h}
                </motion.div>
              ))}
            </motion.div>
          )}

          {personalInterests.languages.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ marginBottom: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.terra, marginBottom: '10px' }}>Languages</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {personalInterests.languages.map((l, i) => (
                  <span key={i} style={{ background: C.brown, color: C.bg, fontSize: '13px', borderRadius: '20px', padding: '4px 16px', fontFamily: 'Georgia, serif' }}>{l}</span>
                ))}
              </div>
            </motion.div>
          )}

          {personalInterests.personalityTraits.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.terra, marginBottom: '10px' }}>Personality</div>
              <p style={{ fontStyle: 'italic', fontSize: '17px', color: C.brown, lineHeight: 1.6 }}>
                {personalInterests.personalityTraits.map((t, i) => (
                  <span key={i}>{t}{i < personalInterests.personalityTraits.length - 1 ? <Ornament /> : null}</span>
                ))}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* GALLERY — photo album */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px clamp(24px, 8vw, 120px)', background: C.peach }}>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <SectionHeader>
              <span style={{ fontStyle: 'italic', letterSpacing: '0.12em' }}>Album</span>
            </SectionHeader>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i} variants={fadeUp}
                  animate={{ rotate: hoveredPhoto === i ? 0 : photoRotations[i % photoRotations.length] }}
                  whileHover={{ scale: 1.06, rotate: 0, zIndex: 10 }}
                  onHoverStart={() => setHoveredPhoto(i)}
                  onHoverEnd={() => setHoveredPhoto(null)}
                  onClick={() => setLightbox(photo)}
                  style={{
                    padding: '14px 14px 40px',
                    background: '#fff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    cursor: 'pointer',
                    width: '180px',
                    rotate: `${photoRotations[i % photoRotations.length]}deg`,
                    transformOrigin: 'center center',
                  }}>
                  <div style={{ width: '100%', aspectRatio: '1', overflow: 'hidden' }}>
                    <img src={photo} alt={`Memory ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '10px', fontStyle: 'italic', fontSize: '11px', color: C.terra, letterSpacing: '0.06em' }}>
                    memory {i + 1}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* PREFERENCES — love letter */}
      {matchPreferences.expectations && (
        <section style={{ padding: '60px clamp(24px, 8vw, 120px)' }}>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <SectionHeader>A Note for You</SectionHeader>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p style={{ fontStyle: 'italic', fontSize: '17px', color: C.terra, marginBottom: '16px' }}>
                To whoever reads this...
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.9, color: C.text, fontStyle: 'italic', marginBottom: '16px' }}>
                {matchPreferences.expectations}
              </p>
              <p style={{ fontSize: '14px', color: '#A08060', marginBottom: '20px' }}>
                Looking for someone between {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years
                {matchPreferences.location && matchPreferences.location.length > 0 ? `, from ${matchPreferences.location.join(' or ')}` : ''}
              </p>
              <Ornament />
            </motion.div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ background: C.bg, borderTop: `2px solid ${C.border}`, padding: '40px clamp(24px, 8vw, 120px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
            <span style={{ color: C.brown, fontSize: '18px' }}>——— ✦ ———</span>
            <div style={{ flex: 1, height: '1px', background: C.border }} />
          </div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 400, color: C.text, letterSpacing: '0.06em', margin: '0 0 6px' }}>
            {basicInfo.fullName}
          </h3>
          <p style={{ fontStyle: 'italic', fontSize: '14px', color: C.terra, margin: '0 0 20px' }}>
            With love and hope
          </p>
          <p style={{ fontSize: '11px', color: '#C0A88A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            made with wymm
          </p>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <img src={lightbox} alt="Gallery" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 0 0 12px rgba(255,255,255,0.08)' }} />
        </motion.div>
      )}
    </div>
  )
}
