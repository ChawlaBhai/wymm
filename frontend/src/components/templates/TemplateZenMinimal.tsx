import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function TemplateZenMinimal({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FAFAFA', minHeight: '100vh', color: '#1A1A1A' }}>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', padding: '80px 6vw', flexDirection: 'column', textAlign: 'center' }}>
        {/* No border on photo — just the circle */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}
          style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', background: '#EEEEEE', marginBottom: 60, flexShrink: 0 }}
        >
          {media.profilePhoto ? (
            <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 36, fontWeight: 300, color: '#BBBBBB' }}>{initials}</span>
            </div>
          )}
        </motion.div>

        {/* Name — enormous, ultra-light */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(48px, 10vw, 96px)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            lineHeight: 1,
            color: '#1A1A1A',
            marginBottom: 28,
          }}
        >
          {basicInfo.fullName || 'Your Name'}
        </motion.h1>

        {/* Single horizontal line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.9 }}
          style={{ height: 1, width: 80, background: '#1A1A1A', transformOrigin: 'center', marginBottom: 28 }}
        />

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
          style={{ fontSize: 12, color: '#AAAAAA', letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          {[career.currentDesignation, basicInfo.city, basicInfo.state].filter(Boolean).join('  ·  ')}
        </motion.p>
      </section>

      {/* ABOUT — just text, no card */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '80px 6vw' }}>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(17px, 2vw, 22px)', lineHeight: 1.9, fontStyle: 'italic', color: '#555', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}
          >
            {basicInfo.aboutMe}
          </motion.p>
        </section>
      )}

      {/* INFO */}
      <section style={{ padding: '60px 6vw' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0' }}
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
                style={{ padding: '24px 16px', borderBottom: '1px solid #E8E8E8' }}
              >
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 8 }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 400, color: '#1A1A1A' }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '80px 6vw' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 36 }}
          >
            Family
          </motion.h2>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, marginBottom: 20 }}
          >
            {[
              { relation: 'Father', name: familyInfo.fatherName, profession: familyInfo.fatherProfession, company: familyInfo.fatherCompany },
              { relation: 'Mother', name: familyInfo.motherName, profession: familyInfo.motherProfession },
            ].filter(x => x.name).map(({ relation, name, profession, company }) => (
              <motion.div key={relation} variants={fadeUp}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 8 }}>{relation}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 400, color: '#1A1A1A', marginBottom: 4 }}>{name}</p>
                {profession && <p style={{ fontSize: 14, color: '#888' }}>{profession}{company ? ` · ${company}` : ''}</p>}
              </motion.div>
            ))}
          </motion.div>
          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ fontSize: 14, color: '#999' }}>
                  {s.name}{s.profession ? `, ${s.profession}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER */}
      <section style={{ padding: '80px 6vw', background: '#F5F5F5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 40 }}
          >
            Education & Career
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {education.highestQualification && (
              <motion.div variants={fadeUp}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 10 }}>Education</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 400, color: '#1A1A1A', marginBottom: 4 }}>{education.highestQualification}</p>
                {education.field && <p style={{ fontSize: 15, color: '#888', marginBottom: 2 }}>{education.field}</p>}
                {education.institution && <p style={{ fontSize: 13, color: '#BBBBBB' }}>{education.institution}{education.yearOfCompletion ? ` · ${education.yearOfCompletion}` : ''}</p>}
              </motion.div>
            )}
            {career.currentDesignation && (
              <motion.div variants={fadeUp}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 10 }}>Career</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 400, color: '#1A1A1A', marginBottom: 4 }}>{career.currentDesignation}</p>
                {career.company && <p style={{ fontSize: 15, color: '#888', marginBottom: 2 }}>{career.company} · {career.industry}</p>}
                {career.yearsOfExperience > 0 && <p style={{ fontSize: 13, color: '#BBBBBB' }}>{career.yearsOfExperience} years</p>}
                {career.showIncome && career.annualIncome && <p style={{ fontSize: 13, color: '#10B981', marginTop: 4 }}>{career.annualIncome}</p>}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '80px 6vw' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 24 }}
          >
            Interests
          </motion.h2>
          {personalInterests.hobbies.length > 0 && (
            <p style={{ fontSize: 16, color: '#555', lineHeight: 1.9, marginBottom: 16 }}>
              {personalInterests.hobbies.join(', ')}
            </p>
          )}
          {personalInterests.languages.length > 0 && (
            <p style={{ fontSize: 13, color: '#AAAAAA', marginBottom: 12, letterSpacing: '0.06em' }}>
              Languages: {personalInterests.languages.join(', ')}
            </p>
          )}
          {personalInterests.personalityTraits.length > 0 && (
            <p style={{ fontSize: 14, color: '#BBBBBB', fontStyle: 'italic' }}>{personalInterests.personalityTraits.join(' · ')}</p>
          )}
        </div>
      </section>

      {/* GALLERY — zero decoration grid */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px 6vw', background: '#F5F5F5' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 20 }}
            >
              Gallery
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 4 }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  onClick={() => setLightbox(photo)}
                  style={{ cursor: 'pointer', overflow: 'hidden' }}
                >
                  <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      <section style={{ padding: '80px 6vw' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#CCCCCC', marginBottom: 20 }}
          >
            Looking For
          </motion.h2>
          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: 16, lineHeight: 1.9, color: '#888' }}
          >
            {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years
            {matchPreferences.location && matchPreferences.location.length > 0 ? ` · ${matchPreferences.location.join(', ')}` : ''}
            {matchPreferences.expectations ? `. ${matchPreferences.expectations}` : ''}
          </motion.p>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      {basicInfo.socialLinks && Object.values(basicInfo.socialLinks).some(Boolean) && (
        <section style={{ padding: '40px 6vw', borderTop: '1px solid #E8E8E8' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#CCCCCC', marginBottom: '16px' }}>Connect</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '10px', justifyContent: 'center' }}>
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 16px', border: '1px solid #1A1A1A', borderRadius: '2px', fontSize: '12px', fontWeight: 500, color: '#1A1A1A', textDecoration: 'none', letterSpacing: '0.04em', transition: 'all 0.2s' }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ padding: '60px 6vw', borderTop: '1px solid #E8E8E8', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 22, fontWeight: 300, letterSpacing: '0.08em', color: '#1A1A1A', marginBottom: 8 }}>{basicInfo.fullName}</p>
        <p style={{ fontSize: 12, color: '#CCCCCC', letterSpacing: '0.1em' }}>CREATED WITH WYMM</p>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ padding: '60px 6vw', background: '#F5F5F5' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#CCCCCC', marginBottom: '20px', textAlign: 'center' }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: '1px solid #E8E8E8', borderRadius: '2px', background: 'white', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{doc.name}</p>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: doc.type === 'pdf' ? '#DC2626' : '#1A1A1A', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightbox(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: '#1A1A1A', border: 'none', borderRadius: '2px', color: 'white', fontSize: '12px', fontWeight: 500, cursor: 'pointer', width: '100%', letterSpacing: '0.06em' }}
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
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </motion.div>
      )}
    </div>
  )
}
