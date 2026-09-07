import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const CORAL = '#FF6B6B'
const TURQUOISE = '#0ABFBC'
const SANDY = '#FDFAF3'
const DARK_CORAL = '#C94B4B'

export default function TemplateOceanBreeze({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: SANDY, minHeight: '100vh', color: '#1A1A1A' }}>

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', background: SANDY, position: 'relative', overflow: 'hidden', padding: '80px 6vw 0' }}>
        {/* Coral top strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${CORAL} 0%, ${TURQUOISE} 100%)` }} />

        {/* Background wave SVG */}
        <svg
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', pointerEvents: 'none' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z"
            fill={CORAL}
            fillOpacity="0.2"
          />
        </svg>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap', paddingBottom: 80 }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: TURQUOISE, marginBottom: 20 }}
            >
              Marriage Biodata
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: DARK_CORAL, marginBottom: 20 }}
            >
              {basicInfo.fullName || 'Your Name'}
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
              style={{ height: 2, width: 80, background: `linear-gradient(90deg, ${CORAL}, ${TURQUOISE})`, transformOrigin: 'left', marginBottom: 20 }}
            />
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
              style={{ fontSize: 14, color: '#888', letterSpacing: '0.06em' }}
            >
              {[career.currentDesignation, basicInfo.city, basicInfo.state].filter(Boolean).join(' · ')}
            </motion.p>
          </div>

          {/* Profile photo with turquoise ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
            style={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', border: `4px solid ${TURQUOISE}`, boxShadow: `0 0 0 8px ${TURQUOISE}20`, flexShrink: 0 }}
          >
            {media.profilePhoto ? (
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${CORAL}15` }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 52, fontWeight: 700, color: CORAL }}>{initials}</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '60px 6vw' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ background: 'white', borderLeft: `4px solid ${TURQUOISE}`, borderRadius: '0 12px 12px 0', padding: '28px 32px', background: `${SANDY}` }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: TURQUOISE, marginBottom: 12 }}>About Me</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.8, color: '#444', fontStyle: 'italic' }}>
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
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, marginBottom: 24 }}
          >
            At a Glance
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}
          >
            {[
              { label: 'Age', value: basicInfo.age ? `${basicInfo.age} years` : '' },
              { label: 'Height', value: basicInfo.height },
              { label: 'Religion', value: basicInfo.religion },
              { label: 'Caste', value: basicInfo.caste },
              { label: 'Mother Tongue', value: basicInfo.motherTongue },
              { label: 'Location', value: [basicInfo.city, basicInfo.state].filter(Boolean).join(', ') },
              { label: 'Blood Group', value: basicInfo.bloodGroup },
              { label: 'Country', value: basicInfo.country },
            ].filter(x => x.value).map(({ label, value }) => (
              <motion.div key={label} variants={fadeUp}
                style={{ background: 'white', border: `1.5px solid ${CORAL}30`, borderRadius: 12, padding: '20px 20px' }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: CORAL, marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '60px 6vw', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, marginBottom: 24 }}
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
                style={{ padding: 24, border: `1.5px solid ${TURQUOISE}30`, borderRadius: 12, background: `${SANDY}` }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: TURQUOISE, marginBottom: 8 }}>{relation}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{name}</p>
                {profession && <p style={{ fontSize: 14, color: CORAL, fontWeight: 500 }}>{profession}{company ? ` · ${company}` : ''}</p>}
              </motion.div>
            ))}
          </motion.div>
          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '6px 14px', border: `1px solid ${CORAL}40`, borderRadius: 999, fontSize: 13, color: CORAL }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER */}
      <section style={{ padding: '60px 6vw', background: SANDY }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, marginBottom: 36 }}
          >
            Education & Career
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {education.highestQualification && (
              <motion.div variants={fadeUp} style={{ background: 'white', border: `1px solid ${CORAL}20`, borderRadius: 12, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: `${TURQUOISE}15`, color: TURQUOISE, borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Education</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{education.highestQualification}</p>
                {education.field && <p style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{education.field}</p>}
                {education.institution && <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{education.institution} · {education.yearOfCompletion}</p>}
              </motion.div>
            )}
            {career.currentDesignation && (
              <motion.div variants={fadeUp} style={{ background: 'white', border: `1px solid ${CORAL}20`, borderRadius: 12, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: `${CORAL}15`, color: CORAL, borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Career</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{career.currentDesignation}</p>
                {career.company && <p style={{ fontSize: 14, color: CORAL, fontWeight: 500, marginTop: 4 }}>{career.company} · {career.industry}</p>}
                {career.yearsOfExperience > 0 && <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{career.yearsOfExperience} years experience</p>}
                {career.showIncome && career.annualIncome && <p style={{ fontSize: 13, color: '#10B981', marginTop: 4, fontWeight: 600 }}>{career.annualIncome} per annum</p>}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '60px 6vw', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, marginBottom: 24 }}
          >
            Interests & Personality
          </motion.h2>
          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.span key={i} variants={fadeUp}
                  whileHover={{ background: CORAL, color: 'white' }}
                  style={{ padding: '8px 18px', border: `1.5px solid ${CORAL}60`, borderRadius: 999, fontSize: 14, fontWeight: 500, color: CORAL, transition: 'all 0.2s' }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          )}
          {personalInterests.languages.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {personalInterests.languages.map((l, i) => (
                <span key={i} style={{ padding: '5px 14px', background: `${TURQUOISE}15`, borderRadius: 999, fontSize: 13, color: TURQUOISE, fontWeight: 500 }}>{l}</span>
              ))}
            </div>
          )}
          {personalInterests.personalityTraits.length > 0 && (
            <p style={{ fontSize: 14, color: '#888', fontStyle: 'italic' }}>{personalInterests.personalityTraits.join(' · ')}</p>
          )}
        </div>
      </section>

      {/* GALLERY — POLAROID FILMSTRIP */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px 0', background: SANDY, overflow: 'hidden' }}>
          <div style={{ padding: '0 6vw', marginBottom: 24 }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL }}>Gallery</h2>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingLeft: '6vw', paddingRight: '6vw', paddingBottom: 16, scrollbarWidth: 'none' }}>
            {media.galleryPhotos.map((photo, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, rotate: i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : -1 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                viewport={{ once: true }}
                onClick={() => setLightbox(photo)}
                style={{
                  flexShrink: 0, width: 180, background: 'white', padding: 8, paddingBottom: 36,
                  boxShadow: `0 4px 20px ${CORAL}25, 0 2px 8px rgba(0,0,0,0.08)`,
                  border: `2px solid ${CORAL}30`,
                  cursor: 'pointer',
                  transform: `rotate(${i % 3 === 0 ? -3 : i % 3 === 1 ? 2 : -1}deg)`}}
              >
                <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      <section style={{ padding: '60px 6vw', background: 'white' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: CORAL, marginBottom: 20 }}
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
      <footer style={{ background: SANDY, padding: '40px 6vw', borderTop: `4px solid ${CORAL}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, color: DARK_CORAL }}>{basicInfo.fullName}</p>
            <p style={{ fontSize: 13, color: '#999', marginTop: 4 }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
          </div>
        </div>
      </footer>
      {basicInfo.socialLinks && Object.values(basicInfo.socialLinks).some(Boolean) && (
        <section style={{ padding: '40px 6vw', background: SANDY, borderTop: `1px solid ${CORAL}20` }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: TURQUOISE, marginBottom: 16 }}>Connect</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
              {([
                { key: 'instagram', icon: '📸', label: 'Instagram' },
                { key: 'linkedin',  icon: '🔗', label: 'LinkedIn' },
                { key: 'facebook',  icon: '👥', label: 'Facebook' },
                { key: 'twitter',   icon: '🐦', label: 'Twitter / X' },
                { key: 'website',   icon: '🌐', label: 'Website' },
              ] as { key: keyof NonNullable<typeof basicInfo.socialLinks>; icon: string; label: string }[])
                .filter(({ key }) => basicInfo.socialLinks?.[key])
                .map(({ key, icon, label }) => (
                  <a key={key} href={`https://${basicInfo.socialLinks![key]!.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', border: `1.5px solid ${CORAL}`, borderRadius: 999, fontSize: 13, fontWeight: 600, color: DARK_CORAL, textDecoration: 'none', background: 'white', transition: 'all 0.2s' }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{ background: SANDY, padding: '40px 6vw', borderTop: `1px solid ${CORAL}20` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, color: DARK_CORAL }}>{basicInfo.fullName}</p>
            <p style={{ fontSize: 13, color: '#999', marginTop: 4 }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
          </div>
          <p style={{ fontSize: 11, color: TURQUOISE, letterSpacing: '0.12em', fontWeight: 600 }}>CREATED WITH WYMM</p>
        </div>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ padding: '60px 6vw', background: '#FFF8F0' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: TURQUOISE, marginBottom: 20 }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: `1.5px solid ${CORAL}30`, borderRadius: 12, background: 'white', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: DARK_CORAL, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{doc.name}</p>
                      <span style={{ fontSize: 10, fontWeight: 700, color: doc.type === 'pdf' ? '#DC2626' : TURQUOISE, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightbox(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: CORAL, border: 'none', borderRadius: 8, color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', width: '100%' }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'pointer' }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 4 }} />
        </motion.div>
      )}
    </div>
  )
}
