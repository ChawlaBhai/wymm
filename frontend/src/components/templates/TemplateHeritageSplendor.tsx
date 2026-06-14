import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const SAFFRON = '#FF8C00'
const RED = '#8B0000'
const IVORY = '#FFFFF0'

// Diamond SVG border pattern
function DiamondBorder({ color }: { color: string }) {
  return (
    <svg width="100%" height="20" viewBox="0 0 400 20" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 20 }, (_, i) => (
        <polygon key={i} points={`${i * 20 + 10},2 ${i * 20 + 18},10 ${i * 20 + 10},18 ${i * 20 + 2},10`} fill="none" stroke={color} strokeWidth="1.5" />
      ))}
    </svg>
  )
}

export default function TemplateHeritageSplendor({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: IVORY, minHeight: '100vh', color: '#1A1A1A' }}>

      {/* HERO */}
      <section style={{ background: RED, minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 6vw' }}>

        {/* Corner bracket decorations using box-shadow on small absolute divs */}
        <div style={{ position: 'absolute', top: 28, left: 28, width: 50, height: 50, borderTop: `3px solid ${SAFFRON}`, borderLeft: `3px solid ${SAFFRON}` }} />
        <div style={{ position: 'absolute', top: 28, right: 28, width: 50, height: 50, borderTop: `3px solid ${SAFFRON}`, borderRight: `3px solid ${SAFFRON}` }} />
        <div style={{ position: 'absolute', bottom: 28, left: 28, width: 50, height: 50, borderBottom: `3px solid ${SAFFRON}`, borderLeft: `3px solid ${SAFFRON}` }} />
        <div style={{ position: 'absolute', bottom: 28, right: 28, width: 50, height: 50, borderBottom: `3px solid ${SAFFRON}`, borderRight: `3px solid ${SAFFRON}` }} />

        {/* Inner decorative ring */}
        <div style={{ position: 'absolute', top: 48, left: 48, width: 30, height: 30, borderTop: `1px solid ${SAFFRON}60`, borderLeft: `1px solid ${SAFFRON}60` }} />
        <div style={{ position: 'absolute', top: 48, right: 48, width: 30, height: 30, borderTop: `1px solid ${SAFFRON}60`, borderRight: `1px solid ${SAFFRON}60` }} />
        <div style={{ position: 'absolute', bottom: 48, left: 48, width: 30, height: 30, borderBottom: `1px solid ${SAFFRON}60`, borderLeft: `1px solid ${SAFFRON}60` }} />
        <div style={{ position: 'absolute', bottom: 48, right: 48, width: 30, height: 30, borderBottom: `1px solid ${SAFFRON}60`, borderRight: `1px solid ${SAFFRON}60` }} />

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}
          style={{ textAlign: 'center', maxWidth: 700, width: '100%', position: 'relative', zIndex: 1 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: `${SAFFRON}AA`, marginBottom: 32 }}
          >
            Marriage Biodata
          </motion.p>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              width: 160, height: 160, borderRadius: '50%', overflow: 'hidden',
              border: `4px solid ${SAFFRON}`,
              boxShadow: `0 0 0 8px ${SAFFRON}20`,
              margin: '0 auto 36px',
            }}
          >
            {media.profilePhoto ? (
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: RED }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 48, fontWeight: 700, color: SAFFRON }}>{initials}</span>
              </div>
            )}
          </motion.div>

          {/* Gold horizontal line above name */}
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
            style={{ height: 1, background: `linear-gradient(90deg, transparent, ${SAFFRON}, transparent)`, transformOrigin: 'center', marginBottom: 20, maxWidth: 300, margin: '0 auto 20px' }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(38px, 6.5vw, 80px)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.05, color: SAFFRON, marginBottom: 16 }}
          >
            {basicInfo.fullName || 'Your Name'}
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
            style={{ height: 1, background: `linear-gradient(90deg, transparent, ${SAFFRON}, transparent)`, transformOrigin: 'center', marginBottom: 20, maxWidth: 300, margin: '0 auto 20px' }}
          />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
            style={{ fontSize: 13, color: `${SAFFRON}99`, letterSpacing: '0.1em' }}
          >
            {[career.currentDesignation, basicInfo.city, basicInfo.state].filter(Boolean).join(' · ')}
          </motion.p>
        </motion.div>
      </section>

      {/* CULTURAL BANNER with diamond border */}
      <section style={{ background: IVORY, padding: '0 0 0' }}>
        <DiamondBorder color={SAFFRON} />
        <div style={{ padding: '36px 6vw', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(13px, 1.6vw, 16px)', color: RED, fontStyle: 'italic', letterSpacing: '0.04em', maxWidth: 600, margin: '0 auto' }}>
            {[basicInfo.religion, basicInfo.caste, basicInfo.motherTongue].filter(Boolean).join(' · ')} · {[basicInfo.city, basicInfo.state, basicInfo.country].filter(Boolean).join(', ')}
          </p>
        </div>
        <DiamondBorder color={SAFFRON} />
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '60px 6vw', background: IVORY }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ borderLeft: `4px solid ${SAFFRON}`, paddingLeft: 28 }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: SAFFRON, marginBottom: 12 }}>About</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.85, color: '#444', fontStyle: 'italic' }}>
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
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, marginBottom: 24 }}
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
            ].filter(x => x.value).map(({ label, value }) => (
              <motion.div key={label} variants={fadeUp}
                style={{ background: IVORY, borderTop: `3px solid ${SAFFRON}`, borderRadius: '0 0 8px 8px', padding: '18px 20px' }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: RED, marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 600, color: '#1A1A1A' }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY — two columns Paternal / Maternal */}
      <section style={{ padding: '60px 6vw', background: IVORY }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 700, color: RED, marginBottom: 32, textAlign: 'center', letterSpacing: '0.02em' }}
          >
            Family
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}
          >
            {/* Father's side */}
            <motion.div variants={fadeUp} style={{ background: 'white', borderRadius: 8, padding: 28 }}>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: RED, letterSpacing: '0.06em', marginBottom: 20, textTransform: 'uppercase' }}>Paternal</p>
              {familyInfo.fatherName && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: SAFFRON, marginBottom: 4 }}>Father</p>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>{familyInfo.fatherName}</p>
                  {familyInfo.fatherProfession && <p style={{ fontSize: 13, color: '#666' }}>{familyInfo.fatherProfession}{familyInfo.fatherCompany ? ` · ${familyInfo.fatherCompany}` : ''}</p>}
                </div>
              )}
              {familyInfo.nativePlace && <p style={{ fontSize: 13, color: '#999', marginTop: 12 }}>Native: {familyInfo.nativePlace}</p>}
            </motion.div>

            {/* Mother's side */}
            <motion.div variants={fadeUp} style={{ background: 'white', borderRadius: 8, padding: 28 }}>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700, color: RED, letterSpacing: '0.06em', marginBottom: 20, textTransform: 'uppercase' }}>Maternal</p>
              {familyInfo.motherName && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: SAFFRON, marginBottom: 4 }}>Mother</p>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 17, fontWeight: 700, color: '#1A1A1A' }}>{familyInfo.motherName}</p>
                  {familyInfo.motherProfession && <p style={{ fontSize: 13, color: '#666' }}>{familyInfo.motherProfession}</p>}
                </div>
              )}
              {familyInfo.familyType && <p style={{ fontSize: 13, color: '#999', marginTop: 12 }}>Family Type: {familyInfo.familyType}</p>}
            </motion.div>
          </motion.div>

          {/* Siblings */}
          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}
            >
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '6px 16px', background: 'white', border: `1px solid ${SAFFRON}40`, borderRadius: 4, fontSize: 13, color: RED }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER */}
      <section style={{ padding: '60px 6vw', background: 'white' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, marginBottom: 36 }}
          >
            Education & Career
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {education.highestQualification && (
              <motion.div variants={fadeUp} style={{ background: IVORY, borderTop: `3px solid ${SAFFRON}`, borderRadius: '0 0 8px 8px', padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: `${SAFFRON}20`, color: SAFFRON, borderRadius: 4, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Education</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{education.highestQualification}</p>
                {education.field && <p style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{education.field}</p>}
                {education.institution && <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{education.institution} · {education.yearOfCompletion}</p>}
              </motion.div>
            )}
            {career.currentDesignation && (
              <motion.div variants={fadeUp} style={{ background: IVORY, borderTop: `3px solid ${RED}`, borderRadius: '0 0 8px 8px', padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: `${RED}10`, color: RED, borderRadius: 4, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Career</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{career.currentDesignation}</p>
                {career.company && <p style={{ fontSize: 14, color: SAFFRON, fontWeight: 500, marginTop: 4 }}>{career.company} · {career.industry}</p>}
                {career.yearsOfExperience > 0 && <p style={{ fontSize: 13, color: '#999', marginTop: 2 }}>{career.yearsOfExperience} years experience</p>}
                {career.showIncome && career.annualIncome && <p style={{ fontSize: 13, color: '#10B981', marginTop: 4, fontWeight: 600 }}>{career.annualIncome}</p>}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '60px 6vw', background: IVORY }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, marginBottom: 24 }}
          >
            Interests & Personality
          </motion.h2>
          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.span key={i} variants={fadeUp}
                  whileHover={{ background: RED, color: 'white', borderColor: RED }}
                  style={{ padding: '8px 18px', border: `1px solid ${SAFFRON}60`, borderRadius: 4, fontSize: 14, fontWeight: 500, color: RED, background: 'white', transition: 'all 0.2s' }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          )}
          {personalInterests.languages.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {personalInterests.languages.map((l, i) => (
                <span key={i} style={{ padding: '5px 14px', background: `${SAFFRON}20`, borderRadius: 4, fontSize: 13, color: SAFFRON, fontWeight: 600 }}>{l}</span>
              ))}
            </div>
          )}
          {personalInterests.personalityTraits.length > 0 && (
            <p style={{ fontSize: 14, color: '#888', fontStyle: 'italic' }}>{personalInterests.personalityTraits.join(' · ')}</p>
          )}
        </div>
      </section>

      {/* GALLERY — POLAROID WITH IVORY BORDER + SAFFRON FRAME */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px 6vw', background: 'white', overflow: 'hidden' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, marginBottom: 24 }}
            >
              Gallery
            </motion.h2>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 20 }}
            >
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ y: -4, boxShadow: `0 12px 32px ${SAFFRON}30` }}
                  onClick={() => setLightbox(photo)}
                  style={{
                    background: IVORY,
                    padding: 10,
                    paddingBottom: 32,
                    boxShadow: `0 4px 16px rgba(0,0,0,0.10)`,
                    border: `2px solid ${SAFFRON}60`,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      <section style={{ padding: '60px 6vw', background: IVORY }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: RED, marginBottom: 20 }}
          >
            Partner Expectations
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 17, lineHeight: 1.8, color: '#555' }}
          >
            Looking for someone between {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years
            {matchPreferences.location && matchPreferences.location.length > 0 ? `, based in ${matchPreferences.location.join(' or ')}` : ''}.
            {matchPreferences.expectations && <span> {matchPreferences.expectations}</span>}
          </motion.p>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      {basicInfo.socialLinks && Object.values(basicInfo.socialLinks).some(Boolean) && (
        <section style={{ background: IVORY, padding: '40px 6vw', borderTop: `1px solid ${SAFFRON}30` }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: `${SAFFRON}80`, marginBottom: 16 }}>Connect</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10, justifyContent: 'center' }}>
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 18px', border: `1.5px solid ${SAFFRON}`, borderRadius: 4, fontSize: 13, fontWeight: 600, color: RED, textDecoration: 'none', background: `${SAFFRON}15`, transition: 'all 0.2s' }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ background: RED, padding: '48px 6vw' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Diamond border at top of footer */}
          <div style={{ marginBottom: 24 }}>
            <DiamondBorder color={`${SAFFRON}60`} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 26, fontWeight: 700, color: SAFFRON }}>{basicInfo.fullName}</p>
              <p style={{ fontSize: 13, color: `${SAFFRON}80`, marginTop: 4 }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 12, color: `${SAFFRON}70`, letterSpacing: '0.08em', fontStyle: 'italic', marginBottom: 4 }}>With blessings from both families</p>
              <p style={{ fontSize: 11, color: `${SAFFRON}50`, letterSpacing: '0.12em', fontWeight: 600 }}>CREATED WITH WYMM</p>
            </div>
          </div>
        </div>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ background: IVORY, padding: '60px 6vw' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: `${SAFFRON}80`, marginBottom: 20, textAlign: 'center' }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: `1.5px solid ${SAFFRON}40`, borderRadius: 8, background: 'white', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: RED, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{doc.name}</p>
                      <span style={{ fontSize: 10, fontWeight: 700, color: doc.type === 'pdf' ? '#DC2626' : SAFFRON, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightbox(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: RED, border: 'none', borderRadius: 4, color: SAFFRON, fontSize: 12, fontWeight: 600, cursor: 'pointer', width: '100%' }}
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
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 4, border: `3px solid ${SAFFRON}` }} />
        </motion.div>
      )}
    </div>
  )
}
