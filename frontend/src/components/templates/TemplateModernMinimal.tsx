import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

export default function TemplateModernMinimal({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const filmRef = useRef<HTMLDivElement>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'
  const descriptors = [career.currentDesignation, basicInfo.city, [basicInfo.religion, basicInfo.caste].filter(Boolean).join(' / ')].filter(Boolean).join(' · ')

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FFFFFF', minHeight: '100vh', color: '#1A1A1A' }}>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 6vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '45vw', height: '45vw', borderRadius: '50%', border: '1px solid #E5E5E5' }} />
          <div style={{ position: 'absolute', top: '15%', right: 0, width: '35vw', height: '35vw', borderRadius: '50%', border: '1px solid #F0F0F0' }} />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
              style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '24px', fontFamily: 'Inter, sans-serif' }}>
              Marriage Biodata
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#1A1A1A', marginBottom: '20px' }}>
              {basicInfo.fullName || 'Your Name'}
            </motion.h1>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{ height: '1px', background: '#1A1A1A', transformOrigin: 'left', marginBottom: '20px' }} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.5 }}
              style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', fontFamily: 'Inter, sans-serif' }}>
              {descriptors}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '8px', color: '#AAAAAA', fontSize: '12px' }}>
              <span style={{ display: 'inline-block', width: '1px', height: '40px', background: '#1A1A1A', opacity: 0.2 }} />
              <span style={{ writingMode: 'vertical-rl', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '10px' }}>scroll</span>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.7 }}
            style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #1A1A1A', flexShrink: 0 }}>
            {media.profilePhoto ? (
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9FB' }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '52px', fontWeight: 700, color: '#1A1A1A' }}>{initials}</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '80px 6vw', maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '40px', left: '5vw', fontFamily: 'Sora, sans-serif', fontSize: '200px', fontWeight: 800, color: '#F0F0F0', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>"</div>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(18px, 2.5vw, 24px)', lineHeight: 1.8, fontStyle: 'italic', color: '#333', position: 'relative', zIndex: 1, maxWidth: '700px' }}>
            {basicInfo.aboutMe}
          </motion.p>
        </section>
      )}

      {/* INFO GRID */}
      <section style={{ padding: '60px 6vw' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '32px' }}>
            At a glance
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0' }}>
            {[
              { label: 'Age', value: basicInfo.age ? `${basicInfo.age} years` : '' },
              { label: 'Height', value: basicInfo.height },
              { label: 'Religion', value: basicInfo.religion },
              { label: 'Caste', value: basicInfo.caste },
              { label: 'Mother Tongue', value: basicInfo.motherTongue },
              { label: 'Location', value: [basicInfo.city, basicInfo.state].filter(Boolean).join(', ') },
            ].filter(x => x.value).map(({ label, value }) => (
              <motion.div key={label} variants={fadeUp}
                style={{ padding: '24px 20px', borderBottom: '1px solid #E5E5E5', borderRight: '1px solid #E5E5E5' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '6px' }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '17px', fontWeight: 600, color: '#1A1A1A' }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '80px 6vw' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ position: 'relative', marginBottom: '48px' }}>
            <span style={{ position: 'absolute', top: '-20px', left: 0, fontFamily: 'Sora, sans-serif', fontSize: '80px', fontWeight: 800, color: '#F0F0F0', lineHeight: 1, pointerEvents: 'none' }}>Family</span>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAAAAA', position: 'relative', zIndex: 1, paddingTop: '20px' }}>Family</h2>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {[
              { relation: 'Father', name: familyInfo.fatherName, profession: familyInfo.fatherProfession, company: familyInfo.fatherCompany },
              { relation: 'Mother', name: familyInfo.motherName, profession: familyInfo.motherProfession },
            ].filter(x => x.name).map(({ relation, name, profession, company }) => (
              <motion.div key={relation} variants={fadeUp}
                style={{ padding: '24px', border: '1px solid #E5E5E5', borderRadius: '12px' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '8px' }}>{relation}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>{name}</p>
                {profession && <p style={{ fontSize: '14px', color: '#7C3AED', fontWeight: 500 }}>{profession}{company ? ` · ${company}` : ''}</p>}
              </motion.div>
            ))}
          </motion.div>
          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '6px 14px', border: '1px solid #E5E5E5', borderRadius: '999px', fontSize: '13px', color: '#666' }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER TIMELINE */}
      <section style={{ padding: '80px 6vw', background: '#F8F9FB' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '40px' }}>
            Education & Career
          </motion.h2>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: '#1A1A1A' }} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {education.highestQualification && (
                <motion.div variants={fadeUp} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-37px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: '#1A1A1A' }} />
                  <span style={{ display: 'inline-block', padding: '2px 10px', background: '#1A1A1A', color: 'white', borderRadius: '999px', fontSize: '11px', fontWeight: 600, marginBottom: '10px' }}>{education.yearOfCompletion}</span>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>{education.highestQualification}</p>
                  {education.field && <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{education.field}</p>}
                  {education.institution && <p style={{ fontSize: '13px', color: '#AAAAAA', marginTop: '2px' }}>{education.institution}</p>}
                </motion.div>
              )}
              {career.currentDesignation && (
                <motion.div variants={fadeUp} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-37px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: '#7C3AED' }} />
                  <span style={{ display: 'inline-block', padding: '2px 10px', background: '#7C3AED', color: 'white', borderRadius: '999px', fontSize: '11px', fontWeight: 600, marginBottom: '10px' }}>Current</span>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>{career.currentDesignation}</p>
                  {career.company && <p style={{ fontSize: '14px', color: '#7C3AED', fontWeight: 500, marginTop: '4px' }}>{career.company}</p>}
                  {career.yearsOfExperience > 0 && <p style={{ fontSize: '13px', color: '#AAAAAA', marginTop: '2px' }}>{career.yearsOfExperience} years experience · {career.industry}</p>}
                  {career.showIncome && career.annualIncome && <p style={{ fontSize: '13px', color: '#10B981', marginTop: '4px', fontWeight: 600 }}>{career.annualIncome} per annum</p>}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '80px 6vw' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '32px' }}>
            Interests & Personality
          </motion.h2>
          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.span key={i} variants={fadeUp}
                  style={{ padding: '8px 18px', border: '1.5px solid #1A1A1A', borderRadius: '999px', fontSize: '14px', fontWeight: 500, cursor: 'default', transition: 'all 0.2s' }}
                  whileHover={{ background: '#1A1A1A', color: '#FFFFFF' }}>
                  {h}
                </motion.span>
              ))}
            </motion.div>
          )}
          {personalInterests.languages.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
              {personalInterests.languages.map((l, i) => (
                <motion.span key={i} variants={fadeUp}
                  style={{ padding: '5px 14px', background: '#E8DFF5', borderRadius: '999px', fontSize: '13px', color: '#7C3AED', fontWeight: 500 }}>
                  {l}
                </motion.span>
              ))}
            </motion.div>
          )}
          {personalInterests.personalityTraits.length > 0 && (
            <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
              {personalInterests.personalityTraits.join(' · ')}
            </p>
          )}
        </div>
      </section>

      {/* GALLERY — FILMSTRIP */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '60px 0', overflow: 'hidden' }}>
          <div style={{ padding: '0 6vw', marginBottom: '24px' }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAAAAA' }}>Gallery</h2>
          </div>
          <div ref={filmRef} style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingLeft: '6vw', paddingRight: '6vw', paddingBottom: '16px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {media.galleryPhotos.map((photo, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1 }}
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
                viewport={{ once: true }}
                onClick={() => setLightbox(photo)}
                style={{ flexShrink: 0, width: '200px', height: '260px', background: 'white', padding: '8px', paddingBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.10)', cursor: 'pointer', rotate: `${i % 2 === 0 ? -2 : 2}deg`, transition: 'rotate 0.3s' }}>
                <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '11px', color: '#AAAAAA', marginTop: '12px', letterSpacing: '0.1em' }}>◀ scroll ▶</p>
        </section>
      )}

      {/* PREFERENCES */}
      <section style={{ padding: '80px 6vw' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '24px' }}>
            What I'm looking for
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ fontSize: '17px', lineHeight: 1.8, color: '#444' }}>
            I'm looking for someone between {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years
            {matchPreferences.location && matchPreferences.location.length > 0 ? `, based in ${matchPreferences.location.join(' or ')}` : ''}.
            {matchPreferences.expectations && <span> {matchPreferences.expectations}</span>}
          </motion.p>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      {basicInfo.socialLinks && Object.values(basicInfo.socialLinks).some(Boolean) && (
        <section style={{ padding: '40px 6vw', borderTop: '1px solid #E5E5E5' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '16px' }}>Connect</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 16px', border: '1.5px solid #1A1A1A', borderRadius: '999px', fontSize: '13px', fontWeight: 500, color: '#1A1A1A', textDecoration: 'none', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1A1A1A'; (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#1A1A1A' }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ padding: '60px 6vw', borderTop: '1px solid #E5E5E5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '24px', fontWeight: 700, color: '#1A1A1A' }}>{basicInfo.fullName}</p>
          <p style={{ fontSize: '13px', color: '#AAAAAA', marginTop: '4px' }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
        </div>
        <p style={{ fontSize: '12px', color: '#DDDDDD', letterSpacing: '0.1em' }}>CREATED WITH WYMM</p>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ padding: '60px 6vw', background: '#F8F9FB' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '20px' }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: '1px solid #E5E5E5', borderRadius: '12px', background: 'white', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</p>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: doc.type === 'pdf' ? '#DC2626' : '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightbox(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: '#1A1A1A', border: 'none', borderRadius: '6px', color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer', width: '100%' }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LIGHTBOX */}
      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'pointer' }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px' }} />
        </motion.div>
      )}
    </div>
  )
}
