import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

const ACCENT_COLORS = ['#7C3AED', '#EC4899', '#0EA5E9', '#F59E0B', '#10B981', '#EF4444']
function getAccent(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return ACCENT_COLORS[Math.abs(h) % ACCENT_COLORS.length]
}

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

export default function TemplateTheModernist({ biodata }: { biodata: BiodataRecord }) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const accent = getAccent(basicInfo.fullName || 'wymm')
  const initials = basicInfo.fullName.split(' ').map(n => n[0] || '').join('').slice(0, 2).toUpperCase() || '??'
  const firstName = basicInfo.fullName.split(' ')[0] || basicInfo.fullName || 'Your'
  const restName = basicInfo.fullName.split(' ').slice(1).join(' ')
  const photos = media.galleryPhotos || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      style={{
        fontFamily: 'Inter, sans-serif',
        background: '#0A0A0A',
        minHeight: '100vh',
        color: '#F5F5F5',
        /* subtle dot texture */
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '20px 20px'}}
    >

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '80px 6vw', position: 'relative', overflow: 'hidden' }}>
        {/* grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        {/* large accent circle decoration */}
        <div style={{ position: 'absolute', top: '10%', right: '-15%', width: '650px', height: '650px', borderRadius: '50%', border: `1px solid ${accent}18`, background: `radial-gradient(circle, ${accent}12 0%, transparent 65%)`, pointerEvents: 'none' }} />
        {/* diagonal accent line */}
        <div style={{ position: 'absolute', bottom: '15%', left: '-4%', width: '340px', height: '2px', background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`, transform: 'rotate(-35deg)', pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, marginBottom: '16px' }}>
              Marriage Biodata
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(72px, 14vw, 160px)', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 0.88, color: '#FFFFFF', marginBottom: '8px', textShadow: `0 0 120px ${accent}25` }}>
              {firstName}
            </motion.h1>
            {restName && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.5 }}
                style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#FFFFFF', marginBottom: '32px' }}>
                {restName}
              </motion.p>
            )}
            {/* manifesto quote from aboutMe in hero */}
            {basicInfo.aboutMe && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7 }}
                style={{ fontStyle: 'italic', fontSize: 'clamp(15px, 1.8vw, 19px)', lineHeight: 1.65, color: 'rgba(255,255,255,0.7)', maxWidth: '600px', marginBottom: '32px' }}
              >
                "{basicInfo.aboutMe}"
              </motion.p>
            )}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
              style={{ height: '1px', background: 'rgba(255,255,255,0.12)', transformOrigin: 'left', marginBottom: '24px' }} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.8 }}
              style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#AAAAAA' }}>
              {[career.currentDesignation, basicInfo.city, basicInfo.religion].filter(Boolean).join(' · ')}
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
            style={{ width: '200px', height: '200px', overflow: 'hidden', border: `2px solid rgba(255,255,255,0.12)`, flexShrink: 0, borderRadius: '4px', boxShadow: `0 0 60px ${accent}20` }}>
            {media.profilePhoto ? (
              <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' }}>
                <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '52px', fontWeight: 800, color: accent }}>{initials}</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT — shown separately below hero only if hero already shows manifesto */}
      {basicInfo.aboutMe && (
        <section style={{ padding: '80px 6vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            style={{ maxWidth: '800px', margin: '0 auto', borderLeft: `3px solid ${accent}`, paddingLeft: '28px' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: '16px' }}>About</p>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#CCCCCC' }}>{basicInfo.aboutMe}</p>
          </motion.div>
        </section>
      )}

      {/* STATS */}
      <section style={{ padding: '60px 6vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {[
              { label: 'Age', value: basicInfo.age ? `${basicInfo.age}` : '' },
              { label: 'Height', value: basicInfo.height },
              { label: 'Religion', value: basicInfo.religion },
              { label: 'Caste', value: basicInfo.caste },
              { label: 'City', value: basicInfo.city },
              { label: 'Experience', value: career.yearsOfExperience > 0 ? `${career.yearsOfExperience} yrs` : '' },
            ].filter(x => x.value).map(({ label, value }) => (
              <motion.div key={label} variants={fadeUp} style={{ background: '#0A0A0A', padding: '24px 20px' }}>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#444', marginBottom: '8px' }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#F5F5F5' }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CAREER & EDUCATION */}
      {(career.currentDesignation || education.highestQualification) && (
        <section style={{ padding: '80px 6vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ position: 'relative', marginBottom: '40px' }}>
              <span style={{ position: 'absolute', top: '-36px', left: 0, fontFamily: 'Sora, sans-serif', fontSize: '100px', fontWeight: 800, color: 'rgba(255,255,255,0.025)', lineHeight: 1 }}>CAREER</span>
              <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, position: 'relative' }}>Career & Education</h2>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {career.currentDesignation && (
                <motion.div variants={fadeUp} style={{ background: '#111', borderRadius: '10px', padding: '24px', borderLeft: `3px solid ${accent}` }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: '10px' }}>Current</p>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#F5F5F5' }}>{career.currentDesignation}</p>
                  {career.company && (
                    <>
                      <p style={{ fontSize: '14px', color: accent, marginTop: '4px' }}>{career.company}</p>
                      {/* "Currently building at" callout */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '12px', padding: '7px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: '6px' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 6px #10B981', animation: 'modernist-blink 1.4s ease-in-out infinite' }} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#10B981', letterSpacing: '0.02em' }}>Currently building at {career.company}</span>
                      </div>
                      <style>{`@keyframes modernist-blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
                    </>
                  )}
                  {career.industry && <p style={{ fontSize: '13px', color: '#555', marginTop: '8px' }}>{career.industry}{career.yearsOfExperience > 0 ? ` · ${career.yearsOfExperience} yrs` : ''}</p>}
                  {career.showIncome && career.annualIncome && <p style={{ fontSize: '13px', color: '#10B981', marginTop: '8px', fontWeight: 600 }}>{career.annualIncome} per annum</p>}
                </motion.div>
              )}
              {education.highestQualification && (
                <motion.div variants={fadeUp} style={{ background: '#111', borderRadius: '10px', padding: '24px', borderLeft: '3px solid rgba(255,255,255,0.10)' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#444', marginBottom: '10px' }}>Education</p>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#F5F5F5' }}>{education.highestQualification}</p>
                  {education.field && <p style={{ fontSize: '14px', color: '#888', marginTop: '4px' }}>{education.field}</p>}
                  {education.institution && <p style={{ fontSize: '13px', color: '#444', marginTop: '2px' }}>{education.institution} · {education.yearOfCompletion}</p>}
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* INTERESTS */}
      {(personalInterests.hobbies.length > 0 || personalInterests.languages.length > 0) && (
        <section style={{ padding: '80px 6vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: '28px' }}>Interests</h2>
            {personalInterests.hobbies.length > 0 && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                {personalInterests.hobbies.map((h, i) => (
                  <motion.span key={i} variants={fadeUp} whileHover={{ borderColor: accent, color: accent }}
                    style={{ padding: '8px 16px', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '4px', fontSize: '13px', color: '#888', cursor: 'default', transition: 'all 0.2s' }}>
                    {h}
                  </motion.span>
                ))}
              </motion.div>
            )}
            {personalInterests.languages.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {personalInterests.languages.map((l, i) => (
                  <span key={i} style={{ padding: '4px 12px', background: accent + '20', borderRadius: '4px', fontSize: '12px', color: accent, fontWeight: 600 }}>{l}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* GALLERY — FULL BLEED SLIDESHOW */}
      {photos.length > 0 && (
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'relative', height: '420px', overflow: 'hidden', background: '#000' }}>
            <AnimatePresence mode="wait">
              <motion.img key={galleryIndex} src={photos[galleryIndex]} alt={`Photo ${galleryIndex + 1}`}
                initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                onClick={() => setLightbox(photos[galleryIndex])} />
            </AnimatePresence>
            <button onClick={() => setGalleryIndex(i => (i - 1 + photos.length) % photos.length)}
              style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ←
            </button>
            <button onClick={() => setGalleryIndex(i => (i + 1) % photos.length)}
              style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              →
            </button>
            <div style={{ position: 'absolute', bottom: '16px', right: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.1em' }}>
              0{galleryIndex + 1} / 0{photos.length}
            </div>
          </div>
          {/* Dot thumbnails */}
          {photos.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '14px 0', background: '#0A0A0A' }}>
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`Go to photo ${i + 1}`}
                  style={{
                    width: i === galleryIndex ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === galleryIndex ? accent : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease',
                    flexShrink: 0}}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* FAMILY */}
      {(familyInfo.fatherName || familyInfo.motherName) && (
        <section style={{ padding: '80px 6vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: '28px' }}>Family</h2>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {[
                { role: 'Father', name: familyInfo.fatherName, detail: familyInfo.fatherProfession },
                { role: 'Mother', name: familyInfo.motherName, detail: familyInfo.motherProfession },
                ...(familyInfo.siblings || []).map(s => ({ role: 'Sibling', name: s.name, detail: s.profession || '' })),
              ].filter(x => x.name).map((m, i) => (
                <motion.div key={i} variants={fadeUp} style={{ background: '#111', borderRadius: '8px', padding: '18px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#444', marginBottom: '6px' }}>{m.role}</p>
                  <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 700, color: '#F5F5F5' }}>{m.name}</p>
                  {m.detail && <p style={{ fontSize: '12px', color: '#555', marginTop: '3px' }}>{m.detail}</p>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* PREFERENCES */}
      <section style={{ padding: '80px 6vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: accent, marginBottom: '20px' }}>Looking For</p>
            <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#AAAAAA' }}>
              Between {matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years
              {matchPreferences.location && matchPreferences.location.length > 0 ? `, based in ${matchPreferences.location.join(' or ')}` : ''}.
            </p>
            {matchPreferences.expectations && (
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#666', fontStyle: 'italic', marginTop: '16px', borderLeft: `3px solid ${accent}`, paddingLeft: '20px' }}>
                "{matchPreferences.expectations}"
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      {basicInfo.socialLinks && Object.values(basicInfo.socialLinks).some(Boolean) && (
        <section style={{ padding: '40px 6vw', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#333', marginBottom: '16px' }}>Connect</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '10px' }}>
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
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 16px', border: `1px solid ${accent}`, borderRadius: '4px', fontSize: '13px', fontWeight: 600, color: accent, textDecoration: 'none', background: 'transparent', transition: 'all 0.2s' }}>
                    <span>{icon}</span> {label}
                  </a>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ padding: '48px 6vw', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 800, color: accent }}>{basicInfo.fullName}</p>
          <p style={{ fontSize: '12px', color: '#333', marginTop: '3px' }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
        </div>
        <p style={{ fontSize: '10px', color: '#222', letterSpacing: '0.2em', textTransform: 'uppercase' }}>WYMM</p>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ padding: '60px 6vw', background: 'rgba(255,255,255,0.03)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#333', marginBottom: '20px' }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: `1px solid ${accent}30`, borderRadius: '8px', background: 'rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{doc.name}</p>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: doc.type === 'pdf' ? '#F87171' : accent, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightbox(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: accent, border: 'none', borderRadius: '4px', color: 'white', fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '100%', letterSpacing: '0.06em' }}
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
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.96)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'pointer' }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} />
        </motion.div>
      )}
    </motion.div>
  )
}
