import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const LILAC = '#EDE7F6'
const PEACH = '#FFE0B2'
const MINT = '#E0F2F1'
const PURPLE = '#9C27B0'

const SECTION_COLORS = [LILAC, PEACH, MINT, LILAC, PEACH]

export default function TemplatePastelDreams({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FFFFFF', minHeight: '100vh', color: '#1A1A1A' }}>

      {/* HERO */}
      <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', position: 'relative', overflow: 'hidden', padding: '80px 6vw' }}>

        {/* Soft radial gradient blobs */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${LILAC}88 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '-8%', right: '-8%', width: '45vw', height: '45vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${PEACH}88 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: 700, width: '100%', position: 'relative', zIndex: 1 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 28 }}
          >
            Marriage Biodata
          </motion.p>

          {/* Profile photo with alternating lilac/peach box-shadow border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              width: 150, height: 150, borderRadius: '50%', overflow: 'hidden',
              boxShadow: `0 0 0 4px ${LILAC}, 0 0 0 8px ${PEACH}, 0 0 0 12px ${LILAC}60`,
              margin: '0 auto 28px',
            }}
          >
            {media.profilePhoto ? (
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: LILAC }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 44, fontWeight: 600, color: PURPLE }}>{initials}</span>
              </div>
            )}
          </motion.div>

          {/* Small SVG heart and flower near name */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={PEACH} xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C12 21 3 14 3 8C3 5.24 5.24 3 8 3C9.74 3 11.28 3.9 12 5.27C12.72 3.9 14.26 3 16 3C18.76 3 21 5.24 21 8C21 14 12 21 12 21Z"/>
            </svg>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(36px, 6vw, 72px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                background: `linear-gradient(135deg, ${PURPLE}, #CE93D8, ${PURPLE})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {basicInfo.fullName || 'Your Name'}
            </motion.h1>
            {/* Flower SVG */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill={LILAC} xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" fill={PURPLE}/>
              <ellipse cx="12" cy="6" rx="2.5" ry="4" fill={PEACH}/>
              <ellipse cx="12" cy="18" rx="2.5" ry="4" fill={MINT}/>
              <ellipse cx="6" cy="12" rx="4" ry="2.5" fill={PEACH}/>
              <ellipse cx="18" cy="12" rx="4" ry="2.5" fill={MINT}/>
            </svg>
          </div>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
            style={{ height: 2, width: 60, background: `linear-gradient(90deg, ${LILAC}, ${PEACH})`, transformOrigin: 'center', margin: '16px auto 20px', borderRadius: 999 }}
          />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
            style={{ fontSize: 13, color: '#BBAACC', letterSpacing: '0.08em' }}
          >
            {[career.currentDesignation, basicInfo.city, basicInfo.state].filter(Boolean).join(' · ')}
          </motion.p>
        </motion.div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '60px 6vw', background: SECTION_COLORS[0] }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 16 }}>About Me</p>
              <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.85, color: '#555', fontStyle: 'italic' }}>
                {basicInfo.aboutMe}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* INFO GRID */}
      <section style={{ padding: '40px 6vw 60px', background: SECTION_COLORS[1] }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 24 }}
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
                style={{ background: 'white', border: `1px solid ${LILAC}`, borderRadius: 14, padding: '18px 20px' }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${PURPLE}70`, marginBottom: 6 }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 16, fontWeight: 600, color: PURPLE }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '60px 6vw', background: SECTION_COLORS[2] }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 24 }}
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
                style={{ padding: 24, background: 'white', border: `1px solid ${PEACH}`, borderRadius: 14 }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 8 }}>{relation}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>{name}</p>
                {profession && <p style={{ fontSize: 14, color: '#888' }}>{profession}{company ? ` · ${company}` : ''}</p>}
              </motion.div>
            ))}
          </motion.div>
          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '6px 14px', background: 'white', border: `1px solid ${LILAC}`, borderRadius: 999, fontSize: 13, color: PURPLE }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER */}
      <section style={{ padding: '60px 6vw', background: SECTION_COLORS[3] }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 36 }}
          >
            Education & Career
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {education.highestQualification && (
              <motion.div variants={fadeUp} style={{ background: 'white', border: `1px solid ${PEACH}`, borderRadius: 14, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: PEACH, color: '#7B3D00', borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Education</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{education.highestQualification}</p>
                {education.field && <p style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{education.field}</p>}
                {education.institution && <p style={{ fontSize: 13, color: '#AAAAAA', marginTop: 2 }}>{education.institution} · {education.yearOfCompletion}</p>}
              </motion.div>
            )}
            {career.currentDesignation && (
              <motion.div variants={fadeUp} style={{ background: 'white', border: `1px solid ${MINT}`, borderRadius: 14, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '3px 12px', background: MINT, color: '#004D40', borderRadius: 999, fontSize: 11, fontWeight: 600, marginBottom: 10 }}>Career</span>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>{career.currentDesignation}</p>
                {career.company && <p style={{ fontSize: 14, color: '#888', fontWeight: 500, marginTop: 4 }}>{career.company} · {career.industry}</p>}
                {career.yearsOfExperience > 0 && <p style={{ fontSize: 13, color: '#AAAAAA', marginTop: 2 }}>{career.yearsOfExperience} years experience</p>}
                {career.showIncome && career.annualIncome && <p style={{ fontSize: 13, color: '#10B981', marginTop: 4, fontWeight: 600 }}>{career.annualIncome} per annum</p>}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '60px 6vw', background: SECTION_COLORS[4] }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 24 }}
          >
            Interests & Personality
          </motion.h2>
          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.span key={i} variants={fadeUp}
                  whileHover={{ background: PURPLE, color: 'white' }}
                  style={{ padding: '8px 18px', border: `1px solid ${PURPLE}30`, borderRadius: 999, fontSize: 14, fontWeight: 500, color: PURPLE, background: 'white', transition: 'all 0.2s' }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          )}
          {personalInterests.languages.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {personalInterests.languages.map((l, i) => (
                <span key={i} style={{ padding: '5px 14px', background: MINT, borderRadius: 999, fontSize: 13, color: '#004D40', fontWeight: 500 }}>{l}</span>
              ))}
            </div>
          )}
          {personalInterests.personalityTraits.length > 0 && (
            <p style={{ fontSize: 14, color: '#BBAACC', fontStyle: 'italic' }}>{personalInterests.personalityTraits.join(' · ')}</p>
          )}
        </div>
      </section>

      {/* GALLERY — masonry */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px 6vw', background: '#FFFFFF' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 24 }}
            >
              Gallery
            </motion.h2>
            <div style={{ columns: '3 160px', gap: 8 }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => setLightbox(photo)}
                  style={{ marginBottom: 8, breakInside: 'avoid', cursor: 'pointer', borderRadius: 12, overflow: 'hidden' }}
                >
                  <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', display: 'block', borderRadius: 12 }} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      <section style={{ padding: '60px 6vw', background: MINT }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: `${PURPLE}80`, marginBottom: 20 }}
          >
            What I'm Looking For
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
        <section style={{ background: 'white', padding: '40px 6vw', borderTop: `2px solid ${LILAC}` }}>
          <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: `${PURPLE}70`, marginBottom: 16 }}>Connect</p>
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 18px', border: `1.5px solid ${PURPLE}40`, borderRadius: 999, fontSize: 13, fontWeight: 500, color: PURPLE, textDecoration: 'none', background: LILAC, transition: 'all 0.2s' }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ background: 'white', padding: '48px 6vw', borderTop: `2px solid ${LILAC}` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700,
            background: `linear-gradient(135deg, ${PURPLE}, #CE93D8)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>{basicInfo.fullName}</p>
          <p style={{ fontSize: 11, color: `${PURPLE}50`, letterSpacing: '0.12em', fontWeight: 600 }}>CREATED WITH WYMM</p>
        </div>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ background: LILAC, padding: '60px 6vw' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: `${PURPLE}70`, marginBottom: 20, textAlign: 'center' }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: `1px solid ${PURPLE}20`, borderRadius: 16, background: 'white', display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 24 }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: PURPLE, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{doc.name}</p>
                      <span style={{ fontSize: 10, fontWeight: 700, color: doc.type === 'pdf' ? '#DC2626' : PURPLE, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightbox(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: `linear-gradient(135deg, ${PURPLE}, #CE93D8)`, border: 'none', borderRadius: 999, color: 'white', fontSize: 12, fontWeight: 600, cursor: 'pointer', width: '100%' }}
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
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, cursor: 'pointer' }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 12 }} />
        </motion.div>
      )}
    </div>
  )
}
