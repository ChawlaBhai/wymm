import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const GREEN = '#2D6A4F'
const SAGE = '#B7E4C7'
const LIGHT_BG = '#F0FAF5'

export default function TemplateBotanicalFresh({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FFFFFF', minHeight: '100vh', color: '#1A1A1A' }}>

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', background: '#FFFFFF', position: 'relative', overflow: 'hidden', padding: '80px 6vw' }}>

        {/* Abstract leaf SVG in background */}
        <svg
          style={{ position: 'absolute', top: '-5%', right: '-8%', width: '55vw', maxWidth: 700, pointerEvents: 'none', opacity: 0.08 }}
          viewBox="0 0 400 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200,480 C200,480 380,350 380,200 C380,50 280,20 200,20 C120,20 20,50 20,200 C20,350 200,480 200,480 Z"
            fill={SAGE}
          />
          <path
            d="M200,480 C200,480 200,300 200,20"
            stroke={GREEN}
            strokeWidth="3"
            fill="none"
          />
          <path d="M200,200 C200,200 300,150 350,100" stroke={GREEN} strokeWidth="1.5" fill="none" />
          <path d="M200,280 C200,280 100,230 60,170" stroke={GREEN} strokeWidth="1.5" fill="none" />
        </svg>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: GREEN, marginBottom: 20 }}
            >
              Marriage Biodata
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: GREEN, marginBottom: 20 }}
            >
              {basicInfo.fullName || 'Your Name'}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
              style={{ height: 2, width: 80, background: SAGE, transformOrigin: 'left', marginBottom: 20 }}
            />
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
              style={{ fontSize: 14, color: '#888', letterSpacing: '0.06em' }}
            >
              {[career.currentDesignation, basicInfo.city, basicInfo.state].filter(Boolean).join(' · ')}
            </motion.p>
          </div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
            style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', border: `3px solid ${GREEN}30`, flexShrink: 0 }}
          >
            {media.profilePhoto ? (
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: LIGHT_BG }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 52, fontWeight: 700, color: GREEN }}>{initials}</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '60px 6vw', background: '#FFFFFF' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: LIGHT_BG, borderRadius: 16, padding: '32px 36px' }}
            >
              <p style={{ fontSize: 28, marginBottom: 12 }}>🌿</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.85, color: '#333', fontStyle: 'italic' }}>
                {basicInfo.aboutMe}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* INFO GRID */}
      <section style={{ padding: '40px 6vw 60px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, marginBottom: 24 }}
          >
            At a Glance
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}
          >
            {[
              { label: 'Age', value: basicInfo.age ? `${basicInfo.age} years` : '' },
              { label: 'Height', value: basicInfo.height },
              { label: 'Religion', value: basicInfo.religion },
              { label: 'Caste', value: basicInfo.caste },
              { label: 'Mother Tongue', value: basicInfo.motherTongue },
              { label: 'Location', value: [basicInfo.city, basicInfo.state].filter(Boolean).join(', ') },
              { label: 'Blood Group', value: basicInfo.bloodGroup },
              { label: 'Gotra', value: basicInfo.gotra },
            ].filter(x => x.value).map(({ label, value }) => (
              <motion.div key={label} variants={fadeUp}
                style={{ background: '#FFFFFF', border: `1.5px solid ${GREEN}25`, borderRadius: 12, padding: '18px 20px' }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '60px 6vw', background: LIGHT_BG }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, marginBottom: 24 }}
          >
            Family
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}
          >
            {[
              { relation: 'Father', name: familyInfo.fatherName, profession: familyInfo.fatherProfession, company: familyInfo.fatherCompany },
              { relation: 'Mother', name: familyInfo.motherName, profession: familyInfo.motherProfession },
            ].filter(x => x.name).map(({ relation, name, profession, company }) => (
              <motion.div key={relation} variants={fadeUp}
                style={{ padding: 24, background: '#FFFFFF', border: `1px solid ${GREEN}20`, borderRadius: 12 }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GREEN, marginBottom: 8 }}>{relation}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{name}</p>
                {profession && <p style={{ fontSize: 14, color: GREEN, fontWeight: 500 }}>{profession}{company ? ` · ${company}` : ''}</p>}
              </motion.div>
            ))}
          </motion.div>
          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '6px 14px', background: '#FFFFFF', border: `1px solid ${GREEN}30`, borderRadius: 999, fontSize: 13, color: GREEN }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER */}
      <section style={{ padding: '60px 6vw', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, marginBottom: 36 }}
          >
            Education & Career
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {education.highestQualification && (
              <motion.div variants={fadeUp} style={{ background: LIGHT_BG, borderRadius: 12, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: `${GREEN}15`, color: GREEN, borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Education</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{education.highestQualification}</p>
                {education.field && <p style={{ fontSize: 14, color: '#555', marginTop: 4 }}>{education.field}</p>}
                {education.institution && <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{education.institution} · {education.yearOfCompletion}</p>}
              </motion.div>
            )}
            {career.currentDesignation && (
              <motion.div variants={fadeUp} style={{ background: LIGHT_BG, borderRadius: 12, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: `${GREEN}25`, color: GREEN, borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Career</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{career.currentDesignation}</p>
                {career.company && <p style={{ fontSize: 14, color: GREEN, fontWeight: 500, marginTop: 4 }}>{career.company} · {career.industry}</p>}
                {career.yearsOfExperience > 0 && <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{career.yearsOfExperience} years experience</p>}
                {career.showIncome && career.annualIncome && <p style={{ fontSize: 13, color: '#10B981', marginTop: 4, fontWeight: 600 }}>{career.annualIncome}</p>}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '60px 6vw', background: LIGHT_BG }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, marginBottom: 24 }}
          >
            Interests & Personality
          </motion.h2>
          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.span key={i} variants={fadeUp}
                  whileHover={{ background: GREEN, color: 'white' }}
                  style={{ padding: '8px 18px', border: `1.5px solid ${GREEN}50`, borderRadius: 999, fontSize: 14, fontWeight: 500, color: GREEN, transition: 'all 0.2s' }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          )}
          {personalInterests.languages.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {personalInterests.languages.map((l, i) => (
                <span key={i} style={{ padding: '5px 14px', background: `${GREEN}15`, borderRadius: 999, fontSize: 13, color: GREEN, fontWeight: 500 }}>{l}</span>
              ))}
            </div>
          )}
          {personalInterests.personalityTraits.length > 0 && (
            <p style={{ fontSize: 14, color: '#888', fontStyle: 'italic' }}>{personalInterests.personalityTraits.join(' · ')}</p>
          )}
        </div>
      </section>

      {/* GALLERY — PINBOARD */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px 6vw', background: '#FFFFFF' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, marginBottom: 24 }}
            >
              Gallery
            </motion.h2>
            <div style={{ columns: '3 180px', gap: 12 }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  onClick={() => setLightbox(photo)}
                  style={{
                    background: 'white',
                    padding: 8,
                    boxShadow: '0 2px 12px rgba(45,106,79,0.10)',
                    marginBottom: 12,
                    breakInside: 'avoid',
                    cursor: 'pointer',
                    borderRadius: 4,
                  }}
                >
                  <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', display: 'block', borderRadius: 2 }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      <section style={{ padding: '60px 6vw', background: LIGHT_BG }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: GREEN, marginBottom: 20 }}
          >
            What I'm Looking For
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 17, lineHeight: 1.8, color: '#444' }}
          >
            Looking for someone between {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years
            {matchPreferences.location && matchPreferences.location.length > 0 ? `, based in ${matchPreferences.location.join(' or ')}` : ''}.
            {matchPreferences.expectations && <span> {matchPreferences.expectations}</span>}
          </motion.p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#FFFFFF', padding: '40px 6vw', borderTop: `2px solid ${GREEN}20` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, color: GREEN }}>{basicInfo.fullName}</p>
            <p style={{ fontSize: 13, color: '#999', marginTop: 4 }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
          </div>
          <p style={{ fontSize: 11, color: GREEN, letterSpacing: '0.12em', fontWeight: 600 }}>🌱 CREATED WITH WYMM</p>
        </div>
      </footer>

      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'pointer' }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 4 }} />
        </motion.div>
      )}
    </div>
  )
}
