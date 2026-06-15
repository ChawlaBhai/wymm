import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }

const PURPLE = '#3B0764'
const GOLD = '#D4AF37'
const CREAM = '#FEF9EC'

export default function TemplateRoyalMajestic({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: CREAM, minHeight: '100vh', color: '#1A1A1A' }}>

      {/* HERO */}
      <section style={{ background: PURPLE, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 6vw' }}>

        {/* Corner geometric decorations — nested squares rotated 45° */}
        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => (
          <div key={i} style={{ position: 'absolute', ...pos, width: 60, height: 60, border: `2px solid ${GOLD}40`, transform: 'rotate(45deg)' }}>
            <div style={{ position: 'absolute', inset: 6, border: `1px solid ${GOLD}25` }} />
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', maxWidth: 800, width: '100%' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${GOLD}AA`, marginBottom: 32 }}
          >
            Marriage Biodata
          </motion.p>

          {/* Profile photo in gold ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
            style={{ width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', border: `4px solid ${GOLD}`, boxShadow: `0 0 0 8px ${GOLD}20, 0 0 40px ${GOLD}15`, margin: '0 auto 36px' }}
          >
            {media.profilePhoto ? (
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${PURPLE}` }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 48, fontWeight: 700, color: GOLD }}>{initials}</span>
              </div>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, color: GOLD, marginBottom: 20 }}
          >
            {basicInfo.fullName || 'Your Name'}
          </motion.h1>

          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
            style={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, transformOrigin: 'center', marginBottom: 20, maxWidth: 400, margin: '0 auto 20px' }}
          />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
            style={{ fontSize: 14, color: `${GOLD}99`, letterSpacing: '0.1em' }}
          >
            {[career.currentDesignation, basicInfo.city, basicInfo.state].filter(Boolean).join(' · ')}
          </motion.p>
        </motion.div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '80px 6vw', background: CREAM }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD, marginBottom: 20 }}>About</p>
              {/* Gold accent line */}
              <div style={{ height: 1, width: 60, background: GOLD, marginBottom: 24 }} />
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.85, color: '#333', fontStyle: 'italic' }}>
                {basicInfo.aboutMe}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* INFO GRID */}
      <section style={{ padding: '40px 6vw 60px', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}
          >
            At a Glance
          </motion.h2>
          <div style={{ height: 2, width: 40, background: GOLD, marginBottom: 28 }} />
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
            ].filter(x => x.value).map(({ label, value }) => (
              <motion.div key={label} variants={fadeUp}
                style={{ background: CREAM, border: `1px solid ${GOLD}40`, borderRadius: 8, padding: '20px 20px' }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 600, color: PURPLE }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '60px 6vw', background: CREAM }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}
          >
            Family
          </motion.h2>
          <div style={{ height: 2, width: 40, background: GOLD, marginBottom: 28 }} />
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}
          >
            {[
              { relation: 'Father', name: familyInfo.fatherName, profession: familyInfo.fatherProfession, company: familyInfo.fatherCompany },
              { relation: 'Mother', name: familyInfo.motherName, profession: familyInfo.motherProfession },
            ].filter(x => x.name).map(({ relation, name, profession, company }) => (
              <motion.div key={relation} variants={fadeUp}
                style={{ padding: 24, background: 'white', border: `1px solid ${GOLD}30`, borderRadius: 8, borderTop: `3px solid ${GOLD}` }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: GOLD, marginBottom: 8 }}>{relation}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: PURPLE, marginBottom: 4 }}>{name}</p>
                {profession && <p style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>{profession}{company ? ` · ${company}` : ''}</p>}
              </motion.div>
            ))}
          </motion.div>
          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '6px 16px', border: `1px solid ${GOLD}50`, borderRadius: 4, fontSize: 13, color: PURPLE, background: 'white' }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER — TIMELINE */}
      <section style={{ padding: '60px 6vw', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}
          >
            Education & Career
          </motion.h2>
          <div style={{ height: 2, width: 40, background: GOLD, marginBottom: 40 }} />
          {/* Gold vertical timeline line */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${GOLD}, ${GOLD}40)` }} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ paddingLeft: 36, display: 'flex', flexDirection: 'column', gap: 40 }}>
              {education.highestQualification && (
                <motion.div variants={fadeUp} style={{ position: 'relative' }}>
                  {/* Purple dot badge */}
                  <div style={{ position: 'absolute', left: -42, top: 4, width: 12, height: 12, borderRadius: '50%', background: PURPLE, border: `2px solid ${GOLD}` }} />
                  <span style={{ display: 'inline-block', padding: '3px 12px', background: PURPLE, color: GOLD, borderRadius: 2, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>{education.yearOfCompletion || 'Education'}</span>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 19, fontWeight: 700, color: PURPLE }}>{education.highestQualification}</p>
                  {education.field && <p style={{ fontSize: 14, color: '#555', marginTop: 4 }}>{education.field}</p>}
                  {education.institution && <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{education.institution}</p>}
                </motion.div>
              )}
              {career.currentDesignation && (
                <motion.div variants={fadeUp} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -42, top: 4, width: 12, height: 12, borderRadius: '50%', background: GOLD, border: `2px solid ${PURPLE}` }} />
                  <span style={{ display: 'inline-block', padding: '3px 12px', background: GOLD, color: PURPLE, borderRadius: 2, fontSize: 11, fontWeight: 700, marginBottom: 10 }}>Current</span>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 19, fontWeight: 700, color: PURPLE }}>{career.currentDesignation}</p>
                  {career.company && <p style={{ fontSize: 14, color: GOLD, fontWeight: 600, marginTop: 4 }}>{career.company}</p>}
                  {career.yearsOfExperience > 0 && <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{career.yearsOfExperience} years · {career.industry}</p>}
                  {career.showIncome && career.annualIncome && <p style={{ fontSize: 13, color: '#10B981', marginTop: 4, fontWeight: 600 }}>{career.annualIncome} per annum</p>}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '60px 6vw', background: CREAM }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}
          >
            Interests & Personality
          </motion.h2>
          <div style={{ height: 2, width: 40, background: GOLD, marginBottom: 24 }} />
          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.span key={i} variants={fadeUp}
                  whileHover={{ background: PURPLE, color: GOLD }}
                  style={{ padding: '7px 18px', border: `1px solid ${GOLD}50`, borderRadius: 2, fontSize: 14, fontWeight: 500, color: PURPLE, background: 'white', transition: 'all 0.2s' }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          )}
          {personalInterests.languages.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {personalInterests.languages.map((l, i) => (
                <span key={i} style={{ padding: '5px 14px', background: `${GOLD}15`, borderRadius: 2, fontSize: 13, color: GOLD, fontWeight: 600 }}>{l}</span>
              ))}
            </div>
          )}
          {personalInterests.personalityTraits.length > 0 && (
            <p style={{ fontSize: 14, color: '#777', fontStyle: 'italic' }}>{personalInterests.personalityTraits.join(' · ')}</p>
          )}
        </div>
      </section>

      {/* GALLERY — GOLD FRAMED */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px 6vw', background: 'white' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}
            >
              Gallery
            </motion.h2>
            <div style={{ height: 2, width: 40, background: GOLD, marginBottom: 28 }} />
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20 }}
            >
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ scale: 1.03, boxShadow: `0 12px 40px ${GOLD}40` }}
                  onClick={() => setLightbox(photo)}
                  style={{
                    border: `8px solid ${GOLD}`,
                    boxShadow: `0 4px 20px ${GOLD}25`,
                    cursor: 'pointer',
                    borderRadius: 2,
                    overflow: 'hidden',
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
      <section style={{ padding: '60px 6vw', background: CREAM }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: PURPLE, marginBottom: 8 }}
          >
            Partner Expectations
          </motion.h2>
          <div style={{ height: 2, width: 40, background: GOLD, marginBottom: 20 }} />
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
      {/* SOCIAL LINKS */}
      {basicInfo.socialLinks && Object.values(basicInfo.socialLinks).some(Boolean) && (
        <section style={{ padding: '40px 6vw', background: PURPLE, borderTop: `1px solid ${GOLD}20` }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: `${GOLD}80`, marginBottom: 16 }}>Connect</p>
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 16px', border: `1px solid ${GOLD}60`, borderRadius: 4, fontSize: 13, fontWeight: 500, color: GOLD, textDecoration: 'none', background: `${GOLD}10`, transition: 'all 0.2s' }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{ background: PURPLE, padding: '48px 6vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 26, fontWeight: 700, color: GOLD }}>{basicInfo.fullName}</p>
            <p style={{ fontSize: 13, color: `${GOLD}70`, marginTop: 4 }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
          </div>
          <p style={{ fontSize: 11, color: `${GOLD}80`, letterSpacing: '0.14em', fontWeight: 600 }}>CREATED WITH WYMM</p>
        </div>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ padding: '60px 6vw', background: CREAM }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: `${GOLD}80`, marginBottom: 20 }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: `1px solid ${GOLD}30`, borderRadius: 8, background: 'white', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: PURPLE, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{doc.name}</p>
                      <span style={{ fontSize: 10, fontWeight: 700, color: doc.type === 'pdf' ? '#DC2626' : GOLD, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightbox(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: PURPLE, border: 'none', borderRadius: 4, color: GOLD, fontSize: 12, fontWeight: 600, cursor: 'pointer', width: '100%' }}
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
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 2, border: `4px solid ${GOLD}` }} />
        </motion.div>
      )}
    </div>
  )
}
