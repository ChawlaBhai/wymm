import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const NAVY = '#0B0D21'
const NAVY2 = '#111630'
const SILVER = '#C0C0C0'
const SILVER_DIM = '#808080'

// Random star positions (deterministic via index seed)
const STARS = Array.from({ length: 20 }, (_, i) => ({
  top: `${((i * 17 + 7) % 90) + 2}%`,
  left: `${((i * 23 + 11) % 90) + 3}%`,
  size: i % 3 === 0 ? 3 : 2,
  duration: 2 + (i % 4),
  delay: (i * 0.3) % 3,
}))

export default function TemplateCelestialNight({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: NAVY, minHeight: '100vh', color: SILVER }}>
      <style>{`
        @keyframes starFlicker {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes silverShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: NAVY, position: 'relative', overflow: 'hidden', padding: '80px 6vw' }}>

        {/* Stars */}
        {STARS.map((star, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            background: 'white',
            animation: `starFlicker ${star.duration}s ease-in-out ${star.delay}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          style={{ textAlign: 'center', maxWidth: 800, width: '100%', position: 'relative', zIndex: 1 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 32 }}
          >
            Marriage Biodata
          </motion.p>

          {/* Profile photo: silver ring + glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              width: 160, height: 160, borderRadius: '50%', overflow: 'hidden',
              border: `3px solid ${SILVER}`,
              boxShadow: `0 0 0 6px ${SILVER}20, 0 0 40px ${SILVER}15, 0 0 80px ${SILVER}08`,
              margin: '0 auto 36px',
            }}
          >
            {media.profilePhoto ? (
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: NAVY2 }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 48, fontWeight: 700, color: SILVER }}>{initials}</span>
              </div>
            )}
          </motion.div>

          {/* Silver gradient name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 'clamp(36px, 6vw, 72px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #C0C0C0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 20,
            }}
          >
            {basicInfo.fullName || 'Your Name'}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
            style={{ height: 1, background: `linear-gradient(90deg, transparent, ${SILVER}60, transparent)`, transformOrigin: 'center', marginBottom: 20, maxWidth: 300, margin: '0 auto 20px' }}
          />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
            style={{ fontSize: 13, color: SILVER_DIM, letterSpacing: '0.1em' }}
          >
            {[career.currentDesignation, basicInfo.city, basicInfo.state].filter(Boolean).join(' · ')}
          </motion.p>
        </motion.div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '80px 6vw' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: NAVY2, borderLeft: `3px solid ${SILVER}50`, borderRadius: '0 12px 12px 0', padding: '28px 32px' }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 12 }}>About</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.85, color: '#CCCCCC', fontStyle: 'italic' }}>
                {basicInfo.aboutMe}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* INFO GRID */}
      <section style={{ padding: '40px 6vw 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 24 }}
          >
            At a Glance
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}
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
                style={{ background: NAVY2, border: `1px solid ${SILVER}15`, borderRadius: 10, padding: '18px 20px' }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 600, color: SILVER }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '60px 6vw', background: NAVY2 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 24 }}
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
                style={{ padding: 24, background: NAVY, border: `1px solid ${SILVER}15`, borderRadius: 12 }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 8 }}>{relation}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: SILVER, marginBottom: 4 }}>{name}</p>
                {profession && <p style={{ fontSize: 14, color: '#888', fontWeight: 500 }}>{profession}{company ? ` · ${company}` : ''}</p>}
              </motion.div>
            ))}
          </motion.div>
          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '6px 14px', background: NAVY, border: `1px solid ${SILVER}20`, borderRadius: 999, fontSize: 13, color: SILVER_DIM }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER */}
      <section style={{ padding: '60px 6vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 36 }}
          >
            Education & Career
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {education.highestQualification && (
              <motion.div variants={fadeUp} style={{ background: NAVY2, border: `1px solid ${SILVER}15`, borderRadius: 12, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: `${SILVER}15`, color: SILVER, borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Education</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: SILVER }}>{education.highestQualification}</p>
                {education.field && <p style={{ fontSize: 14, color: '#777', marginTop: 4 }}>{education.field}</p>}
                {education.institution && <p style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{education.institution} · {education.yearOfCompletion}</p>}
              </motion.div>
            )}
            {career.currentDesignation && (
              <motion.div variants={fadeUp} style={{ background: NAVY2, border: `1px solid ${SILVER}15`, borderRadius: 12, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: `${SILVER}25`, color: SILVER, borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Current Role</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: SILVER }}>{career.currentDesignation}</p>
                {career.company && <p style={{ fontSize: 14, color: '#999', fontWeight: 500, marginTop: 4 }}>{career.company} · {career.industry}</p>}
                {career.yearsOfExperience > 0 && <p style={{ fontSize: 13, color: '#555', marginTop: 2 }}>{career.yearsOfExperience} years experience</p>}
                {career.showIncome && career.annualIncome && <p style={{ fontSize: 13, color: '#10B981', marginTop: 4, fontWeight: 600 }}>{career.annualIncome}</p>}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '60px 6vw', background: NAVY2 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 24 }}
          >
            Interests & Personality
          </motion.h2>
          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.span key={i} variants={fadeUp}
                  whileHover={{ background: SILVER, color: NAVY }}
                  style={{ padding: '8px 18px', border: `1px solid ${SILVER}30`, borderRadius: 999, fontSize: 14, fontWeight: 500, color: SILVER, transition: 'all 0.2s' }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          )}
          {personalInterests.languages.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {personalInterests.languages.map((l, i) => (
                <span key={i} style={{ padding: '5px 14px', background: `${SILVER}10`, borderRadius: 999, fontSize: 13, color: SILVER, fontWeight: 500 }}>{l}</span>
              ))}
            </div>
          )}
          {personalInterests.personalityTraits.length > 0 && (
            <p style={{ fontSize: 14, color: '#666', fontStyle: 'italic' }}>{personalInterests.personalityTraits.join(' · ')}</p>
          )}
        </div>
      </section>

      {/* GALLERY — DARK FRAMES */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px 6vw' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 24 }}
            >
              Gallery
            </motion.h2>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}
            >
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ boxShadow: `0 0 20px ${SILVER}30`, scale: 1.02 }}
                  onClick={() => setLightbox(photo)}
                  style={{
                    background: NAVY2,
                    border: `1px solid ${SILVER}20`,
                    borderRadius: 4,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      <section style={{ padding: '60px 6vw', background: NAVY2 }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SILVER_DIM, marginBottom: 20 }}
          >
            What I'm Looking For
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 17, lineHeight: 1.8, color: '#888' }}
          >
            Looking for someone between {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years
            {matchPreferences.location && matchPreferences.location.length > 0 ? `, based in ${matchPreferences.location.join(' or ')}` : ''}.
            {matchPreferences.expectations && <span> {matchPreferences.expectations}</span>}
          </motion.p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: NAVY, padding: '40px 6vw', borderTop: `1px solid ${SILVER}15` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700,
              background: 'linear-gradient(135deg, #C0C0C0, #FFFFFF, #C0C0C0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>{basicInfo.fullName}</p>
            <p style={{ fontSize: 13, color: '#444', marginTop: 4 }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
          </div>
          <p style={{ fontSize: 11, color: SILVER_DIM, letterSpacing: '0.12em', fontWeight: 600 }}>CREATED WITH WYMM</p>
        </div>
      </footer>

      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'pointer' }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 4, border: `1px solid ${SILVER}30` }} />
        </motion.div>
      )}
    </div>
  )
}
