import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const purple = '#7C3AED', pink = '#EC4899', cyan = '#06B6D4'

const glass: React.CSSProperties = {
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.4)',
  boxShadow: '0 8px 32px rgba(124,58,237,0.08)',
  borderRadius: '20px',
  padding: '32px'}

const blobs = [
  { c: purple, x: '8%',  y: '15%', s: 320, d: 12, delay: 0 },
  { c: pink,   x: '72%', y: '8%',  s: 260, d: 9,  delay: 3 },
  { c: cyan,   x: '58%', y: '65%', s: 210, d: 11, delay: 6 },
  { c: '#8B5CF6', x: '15%', y: '72%', s: 180, d: 14, delay: 2 },
]

function GradBar() {
  return <div style={{ height: '2px', width: '40px', background: `linear-gradient(90deg,${purple},${pink})`, borderRadius: '2px', marginTop: '8px' }} />
}

function SecHead({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '28px' }}>
      <h2 style={{ fontFamily: 'Sora,sans-serif', fontSize: '22px', fontWeight: 700, color: '#1A1A1A', margin: 0 }}>{children}</h2>
      <GradBar />
    </motion.div>
  )
}

const dietLabel: Record<string, string> = { vegetarian: 'Vegetarian', 'non-vegetarian': 'Non-Vegetarian', vegan: 'Vegan', eggetarian: 'Eggetarian' }

export default function TemplateAuroraGlass({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightbox, setLightbox] = useState<string | null>(null)
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '?'

  return (
    <div style={{ fontFamily: 'Inter,sans-serif', background: '#fff', minHeight: '100vh', color: '#1A1A1A', overflowX: 'hidden', position: 'relative' }}>

      {/* Global aurora bg */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'linear-gradient(135deg,rgba(124,58,237,0.05) 0%,rgba(236,72,153,0.04) 50%,rgba(6,182,212,0.04) 100%)' }} />

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '80px 6vw', zIndex: 1 }}>
        {blobs.map((b, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
            style={{ position: 'absolute', left: b.x, top: b.y, width: b.s, height: b.s, borderRadius: '50%', background: b.c, opacity: 0.15, filter: 'blur(60px)', pointerEvents: 'none' }} />
        ))}

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>

          {/* Photo */}
          <div style={{ position: 'relative', width: '140px', height: '140px' }}>
            <div style={{ position: 'absolute', inset: '-12px', borderRadius: '50%', background: 'rgba(124,58,237,0.1)', backdropFilter: 'blur(6px)', border: '1px solid rgba(124,58,237,0.2)' }} />
            {media.profilePhoto ? (
              <div style={{ width: '140px', height: '140px', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: 'linear-gradient(135deg,#EDE9FE,#FCE7F3)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '44px', fontWeight: 800, background: `linear-gradient(135deg,${purple},${pink})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{initials}</span>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <h1 style={{ fontFamily: 'Sora,sans-serif', fontSize: 'clamp(44px,7.5vw,80px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 14px', background: `linear-gradient(135deg,${purple},${pink})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {basicInfo.fullName || 'Your Name'}
            </h1>
            <p style={{ fontSize: '16px', color: purple, margin: 0, fontWeight: 500 }}>
              {[career.currentDesignation, basicInfo.city].filter(Boolean).join(' · ')}
            </p>
          </div>

          {/* Quick pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[basicInfo.age > 0 ? `${basicInfo.age} yrs` : null, basicInfo.height, basicInfo.religion].filter(Boolean).map((v, i) => (
              <span key={i} style={{ ...glass, padding: '7px 18px', borderRadius: '40px', fontSize: '13px', fontWeight: 600 }}>{v}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '60px 6vw', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <SecHead>About Me</SecHead>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={glass}>
              <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#333', margin: 0 }}>{basicInfo.aboutMe}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* INFO GRID */}
      <section style={{ padding: '0 6vw 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SecHead>Quick Details</SecHead>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '12px' }}>
            {[
              { l: 'Age', v: basicInfo.age > 0 ? `${basicInfo.age} yrs` : '' },
              { l: 'Height', v: basicInfo.height },
              { l: 'Religion', v: basicInfo.religion },
              { l: 'Caste', v: basicInfo.caste },
              { l: 'Mother Tongue', v: basicInfo.motherTongue },
              { l: 'City', v: [basicInfo.city, basicInfo.state].filter(Boolean).join(', ') },
              { l: 'Diet', v: dietLabel[personalInterests.dietaryPreference] || personalInterests.dietaryPreference },
              { l: 'Blood Group', v: basicInfo.bloodGroup || '' },
            ].filter(x => x.v).map(({ l, v }) => (
              <motion.div key={l} variants={fadeUp} style={{ ...glass, padding: '18px 20px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: purple, marginBottom: '6px' }}>{l}</div>
                <div style={{ fontFamily: 'Sora,sans-serif', fontSize: '16px', fontWeight: 700 }}>{v}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY */}
      <section style={{ padding: '0 6vw 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SecHead>Family</SecHead>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '14px', marginBottom: '16px' }}>
            {[
              { role: 'Father', name: familyInfo.fatherName, detail: [familyInfo.fatherProfession, familyInfo.fatherCompany].filter(Boolean).join(' · ') },
              { role: 'Mother', name: familyInfo.motherName, detail: familyInfo.motherProfession },
            ].map(({ role, name, detail }) => (
              <motion.div key={role} variants={fadeUp} style={{ ...glass, overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg,${purple}4D,${pink}4D)`, borderRadius: '20px 20px 0 0' }} />
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: purple, marginBottom: '8px' }}>{role}</div>
                <div style={{ fontFamily: 'Sora,sans-serif', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{name || '—'}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{detail}</div>
              </motion.div>
            ))}
          </motion.div>

          {familyInfo.siblings && familyInfo.siblings.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ ...glass }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: purple, marginBottom: '12px' }}>Siblings</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {familyInfo.siblings.map((s, i) => (
                  <div key={i} style={{ fontSize: '15px', color: '#333' }}>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                    {s.age ? <span style={{ color: '#666' }}>, {s.age} yrs</span> : null}
                    {s.profession ? <span style={{ color: '#888' }}> · {s.profession}</span> : null}
                    {s.married !== undefined ? <span style={{ color: purple, fontSize: '12px' }}> ({s.married ? 'Married' : 'Unmarried'})</span> : null}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* EDUCATION & CAREER timeline */}
      <section style={{ padding: '0 6vw 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SecHead>Education & Career</SecHead>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { year: education.yearOfCompletion || '—', title: education.highestQualification, sub: `${education.field} — ${education.institution}`, tags: education.additionalCertifications || [], color: pink },
              { year: 'Now', title: career.currentDesignation, sub: `${career.company} · ${career.industry}${career.yearsOfExperience > 0 ? ` · ${career.yearsOfExperience} yrs` : ''}${career.showIncome && career.annualIncome ? ` · ${career.annualIncome}` : ''}`, tags: [], color: purple },
            ].map((item, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginBottom: i === 0 ? '0' : '0' }}>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg,${item.color},${pink})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Sora,sans-serif', fontSize: '11px', fontWeight: 700, color: '#fff', textAlign: 'center' }}>{item.year}</span>
                  </div>
                  {i === 0 && <div style={{ width: '2px', height: '32px', background: `linear-gradient(${purple},${pink})`, opacity: 0.3 }} />}
                </div>
                <motion.div whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(124,58,237,0.14)' }} style={{ ...glass, flex: 1, marginBottom: '16px', transition: 'all 0.3s ease' }}>
                  <div style={{ fontFamily: 'Sora,sans-serif', fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: item.tags.length ? '10px' : 0 }}>{item.sub}</div>
                  {item.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.tags.map((t, ti) => (
                        <span key={ti} style={{ fontSize: '12px', background: `rgba(124,58,237,0.08)`, border: `1px solid rgba(124,58,237,0.15)`, borderRadius: '20px', padding: '3px 10px', color: purple }}>{t}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ padding: '0 6vw 60px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <SecHead>Interests & Personality</SecHead>

          {personalInterests.hobbies.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
              {personalInterests.hobbies.map((h, i) => (
                <motion.span key={i} variants={fadeUp} style={{ ...glass, padding: '8px 18px', borderRadius: '40px', fontSize: '14px', fontWeight: 500, boxShadow: `0 0 0 1.5px ${purple}22, 0 4px 16px rgba(124,58,237,0.08)` }}>{h}</motion.span>
              ))}
            </motion.div>
          )}

          {personalInterests.languages.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: purple, marginBottom: '10px' }}>Languages</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {personalInterests.languages.map((l, i) => (
                  <span key={i} style={{ background: `linear-gradient(135deg,${purple},${pink})`, color: '#fff', fontSize: '13px', fontWeight: 600, borderRadius: '20px', padding: '5px 16px' }}>{l}</span>
                ))}
              </div>
            </motion.div>
          )}

          {personalInterests.personalityTraits.length > 0 && (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: purple, marginBottom: '10px' }}>Personality</div>
              <p style={{ fontStyle: 'italic', fontSize: '17px', background: `linear-gradient(135deg,${purple},${pink})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.6, margin: 0 }}>
                {personalInterests.personalityTraits.join(' · ')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      {media.galleryPhotos && media.galleryPhotos.length > 0 && (
        <section style={{ padding: '0 6vw 60px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <SecHead>Gallery</SecHead>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '16px' }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i} variants={fadeUp}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(124,58,237,0.18)' }}
                  onClick={() => setLightbox(photo)}
                  style={{ ...glass, padding: '8px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                  <div style={{ borderRadius: '14px', overflow: 'hidden', aspectRatio: '1' }}>
                    <img src={photo} alt={`Photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      {matchPreferences.expectations && (
        <section style={{ padding: '0 6vw 80px', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <SecHead>Looking For</SecHead>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              style={{ ...glass, background: 'linear-gradient(135deg,rgba(124,58,237,0.06),rgba(236,72,153,0.05))', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,${purple},${pink},${cyan})` }} />
              <p style={{ fontStyle: 'italic', fontSize: '16px', color: purple, marginBottom: '12px', marginTop: '4px' }}>
                {matchPreferences.expectations}
              </p>
              <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                Age: {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} yrs
                {matchPreferences.location && matchPreferences.location.length > 0 ? ` · ${matchPreferences.location.join(', ')}` : ''}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* SOCIAL LINKS */}
      {basicInfo.socialLinks && Object.values(basicInfo.socialLinks).some(Boolean) && (
        <section style={{ position: 'relative', zIndex: 1, padding: '40px 6vw', borderTop: '1px solid rgba(124,58,237,0.1)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#bbb', marginBottom: '16px' }}>Connect</p>
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 18px', border: `1px solid rgba(124,58,237,0.3)`, borderRadius: '999px', fontSize: '13px', fontWeight: 500, color: `${purple}`, textDecoration: 'none', background: 'rgba(124,58,237,0.06)', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(124,58,237,0.1)', padding: '48px 6vw' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg,transparent,${purple},${pink},${cyan},transparent)` }} />
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Sora,sans-serif', fontSize: '28px', fontWeight: 800, margin: '0 0 6px', background: `linear-gradient(135deg,${purple},${pink})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {basicInfo.fullName}
          </h3>
          <p style={{ color: '#888', fontSize: '14px', margin: '0 0 24px' }}>
            {[basicInfo.city, basicInfo.state, basicInfo.country].filter(Boolean).join(', ')}
          </p>
          <p style={{ fontSize: '11px', color: '#bbb', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>made with wymm</p>
        </div>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ position: 'relative', zIndex: 1, padding: '60px 6vw', background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(12px)' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#bbb', marginBottom: '20px', textAlign: 'center' }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '16px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{doc.name}</p>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: doc.type === 'pdf' ? '#DC2626' : purple, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightbox(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: `linear-gradient(135deg,${purple},${pink})`, border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer', width: '100%' }}
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
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={lightbox} alt="Full view"
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 40px 80px rgba(0,0,0,0.4)' }} />
        </motion.div>
      )}
    </div>
  )
}
