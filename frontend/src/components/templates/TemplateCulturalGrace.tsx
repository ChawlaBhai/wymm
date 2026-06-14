import { useState } from 'react'
import { motion } from 'framer-motion'
import type { BiodataRecord } from '@/types/biodata'

// Religion-aware greeting system
const RELIGION_GREETINGS: Record<string, { greeting: string; symbol: string; color: string; bgColor: string }> = {
  hindu:     { greeting: 'Namaste',           symbol: '🙏',  color: '#D97706', bgColor: 'rgba(245,158,11,0.10)' },
  muslim:    { greeting: 'As-salamu alaykum', symbol: '☪️',  color: '#166534', bgColor: 'rgba(22,101,52,0.10)' },
  christian: { greeting: 'Greetings',         symbol: '✝️',  color: '#1E40AF', bgColor: 'rgba(30,64,175,0.10)' },
  sikh:      { greeting: 'Sat Sri Akal',      symbol: '☬',   color: '#B45309', bgColor: 'rgba(180,83,9,0.10)' },
  jain:      { greeting: 'Jai Jinendra',      symbol: '🕉️',  color: '#6B21A8', bgColor: 'rgba(107,33,168,0.10)' },
  buddhist:  { greeting: 'Namo Buddhaya',     symbol: '☸️',  color: '#0F766E', bgColor: 'rgba(15,118,110,0.10)' },
  parsi:     { greeting: 'Asho Farohar',      symbol: '🔥',  color: '#9A3412', bgColor: 'rgba(154,52,18,0.10)' },
}

function getReligionInfo(religion: string) {
  const key = religion?.toLowerCase().trim() || ''
  return RELIGION_GREETINGS[key] || { greeting: 'Welcome', symbol: '✦', color: '#7C3AED', bgColor: 'rgba(124,58,237,0.10)' }
}

interface Props {
  biodata: BiodataRecord
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const HOBBY_EMOJI: Record<string, string> = {
  reading: '📚', cooking: '🍳', travel: '✈️', music: '🎵', art: '🎨',
  photography: '📸', fitness: '💪', yoga: '🧘', dance: '💃', writing: '✍️',
  gaming: '🎮', movies: '🎬', hiking: '🥾', cycling: '🚴', swimming: '🏊',
  singing: '🎤', painting: '🖌️', gardening: '🌱', cricket: '🏏', chess: '♟️',
  temple: '🛕', puja: '🪔', music_classical: '🎶', cooking_traditional: '🫕',
}
function getEmoji(hobby: string): string {
  const lower = hobby.toLowerCase()
  for (const [key, emoji] of Object.entries(HOBBY_EMOJI)) {
    if (lower.includes(key)) return emoji
  }
  return '✦'
}

function LotusOrnament() {
  return (
    <div style={{ textAlign: 'center', color: '#F59E0B', fontSize: '18px', letterSpacing: '0.4em', margin: '16px 0', opacity: 0.7 }}>
      ✦ ✦ ✦
    </div>
  )
}

function SectionTitle({ children, accent = '#F59E0B' }: { children: React.ReactNode; accent?: string }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <LotusOrnament />
      <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: '28px', fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em' }}>{children}</h2>
      <div style={{ width: '60px', height: '3px', background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, margin: '12px auto 0', borderRadius: '999px' }} />
    </div>
  )
}

export default function TemplateCulturalGrace({ biodata }: Props) {
  const { basicInfo, familyInfo, education, career, personalInterests, matchPreferences, media } = biodata
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null)
  const ri = getReligionInfo(basicInfo.religion)
  const POLAROID_ROTATIONS = [-2.5, 1.8, -1.2, 2.1, -1.8]
  const initials = basicInfo.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FFFDF5', minHeight: '100vh', color: '#1A1A1A' }}>
      {/* TOP ORNAMENT */}
      <div style={{ background: `linear-gradient(90deg, ${ri.color}, #EC4899, ${ri.color})`, height: '4px' }} />

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center', position: 'relative', background: 'linear-gradient(160deg, rgba(245,158,11,0.07) 0%, rgba(252,232,235,0.10) 50%, rgba(245,158,11,0.05) 100%)' }}>
        <div style={{ position: 'absolute', top: '-8%', left: '-4%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-8%', right: '-4%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: ri.bgColor, border: `1px solid ${ri.color}33`, borderRadius: '999px', padding: '6px 16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '16px' }}>{ri.symbol}</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: ri.color, letterSpacing: '0.04em' }}>{ri.greeting}</span>
          </div>
          <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#1A1A1A', lineHeight: 1.05, marginBottom: '8px' }}>
            {basicInfo.fullName || 'Your Name'}
          </h1>
          <LotusOrnament />
          <p style={{ fontSize: '16px', color: '#92400E', fontWeight: 500, marginTop: '8px' }}>
            {basicInfo.religion}{basicInfo.caste ? ` · ${basicInfo.caste}` : ''}
          </p>
          <p style={{ fontSize: '14px', color: '#B45309', marginTop: '8px' }}>
            {basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}{basicInfo.age ? ` · ${basicInfo.age} years` : ''}
          </p>
        </motion.div>
      </section>

      {/* PROFILE RING */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ position: 'relative' }}>
          <div style={{ width: '180px', height: '180px', borderRadius: '50%', padding: '5px', background: 'linear-gradient(135deg, #F59E0B, #EC4899, #F59E0B)', boxShadow: '0 0 0 4px rgba(245,158,11,0.12), 0 12px 40px rgba(245,158,11,0.18)' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#FEF3C7' }}>
              {media.profilePhoto ? (
                <img src={media.profilePhoto} alt={basicInfo.fullName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}>
                  <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '52px', fontWeight: 700, color: '#92400E' }}>{initials}</span>
                </div>
              )}
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${ri.color}, #EC4899)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${ri.color}60` }}>
            <span style={{ fontSize: '18px' }}>{ri.symbol}</span>
          </div>
        </motion.div>
        {basicInfo.aboutMe && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ maxWidth: '600px', textAlign: 'center', padding: '32px 40px', background: 'rgba(245,158,11,0.05)', borderRadius: '20px', border: '1px solid rgba(245,158,11,0.15)' }}>
            <p style={{ fontSize: '18px', lineHeight: 1.85, color: '#78350F', fontStyle: 'italic' }}>"{basicInfo.aboutMe}"</p>
          </motion.div>
        )}
      </section>

      {/* OUR VALUES */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, rgba(245,158,11,0.05) 0%, transparent 100%)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><SectionTitle>Our Values</SectionTitle></motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { icon: ri.symbol, label: 'Religion', value: basicInfo.religion },
              { icon: '🪷', label: 'Caste', value: basicInfo.caste },
              { icon: '✦', label: 'Gotra', value: basicInfo.religion?.toLowerCase() === 'hindu' ? basicInfo.gotra : undefined },
              { icon: '🏠', label: 'Family Type', value: familyInfo.familyType ? familyInfo.familyType.charAt(0).toUpperCase() + familyInfo.familyType.slice(1) : '' },
              { icon: '🌍', label: 'Native Place', value: familyInfo.nativePlace },
              { icon: '💛', label: 'Values', value: familyInfo.familyValues },
            ].filter(x => x.value).map(({ icon, label, value }) => (
              <motion.div key={label} variants={fadeUp} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid rgba(245,158,11,0.15)', boxShadow: '0 2px 12px rgba(245,158,11,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{icon}</div>
                <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#D97706', marginBottom: '4px' }}>{label}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '15px', fontWeight: 600, color: '#1A1A1A' }}>{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAMILY TREE */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><SectionTitle>Family</SectionTitle></motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeLeft}
            style={{ background: 'linear-gradient(160deg, rgba(245,158,11,0.06), rgba(252,211,77,0.04))', borderRadius: '20px', padding: '32px', border: '1px solid rgba(245,158,11,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '22px' }}>👨‍👩‍👧</span>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 700, color: '#92400E' }}>Father's Side</h3>
            </div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>{familyInfo.fatherName}</p>
            <p style={{ fontSize: '14px', color: '#78350F', marginTop: '4px' }}>{familyInfo.fatherProfession}</p>
            {familyInfo.fatherCompany && <p style={{ fontSize: '13px', color: '#B45309', marginTop: '3px' }}>{familyInfo.fatherCompany}</p>}
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeRight}
            style={{ background: 'linear-gradient(160deg, rgba(236,72,153,0.05), rgba(252,232,235,0.06))', borderRadius: '20px', padding: '32px', border: '1px solid rgba(236,72,153,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '22px' }}>👩‍👧</span>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: '16px', fontWeight: 700, color: '#9D174D' }}>Mother's Side</h3>
            </div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '18px', fontWeight: 700, color: '#1A1A1A' }}>{familyInfo.motherName}</p>
            <p style={{ fontSize: '14px', color: '#9D174D', marginTop: '4px' }}>{familyInfo.motherProfession}</p>
          </motion.div>
        </div>
        {familyInfo.siblings.length > 0 && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginTop: '28px', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D97706', marginBottom: '12px' }}>Siblings</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {familyInfo.siblings.map((s, i) => (
                <span key={i} style={{ padding: '8px 18px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '999px', fontSize: '14px', color: '#92400E', fontWeight: 500 }}>
                  {s.name}{s.profession ? ` · ${s.profession}` : ''}{s.married ? ' (Married)' : ''}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* EDUCATION & CAREER */}
      <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, rgba(245,158,11,0.04) 0%, transparent 100%)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><SectionTitle>Education & Career</SectionTitle></motion.div>
          <div style={{ position: 'relative', paddingLeft: '36px', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '11px', top: '8px', bottom: '8px', width: '2px', background: 'linear-gradient(180deg, #F59E0B, #EC4899)' }} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '40px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-30px', top: '8px', width: '14px', height: '14px', borderRadius: '50%', background: '#F59E0B', border: '3px solid white', boxShadow: '0 0 0 3px #F59E0B' }} />
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px 28px', border: '1px solid rgba(245,158,11,0.15)', boxShadow: '0 4px 20px rgba(245,158,11,0.08)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D97706', marginBottom: '8px' }}>Education · {education.yearOfCompletion}</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1A1A1A' }}>{education.highestQualification}</p>
                <p style={{ fontSize: '15px', color: '#78350F', marginTop: '4px' }}>{education.field}</p>
                <p style={{ fontSize: '13px', color: '#B45309', marginTop: '3px' }}>{education.institution}</p>
                {education.additionalCertifications && education.additionalCertifications.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                    {education.additionalCertifications.map((c, i) => <span key={i} style={{ padding: '4px 12px', background: 'rgba(245,158,11,0.1)', color: '#92400E', borderRadius: '999px', fontSize: '12px', fontWeight: 500 }}>{c}</span>)}
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-30px', top: '8px', width: '14px', height: '14px', borderRadius: '50%', background: '#EC4899', border: '3px solid white', boxShadow: '0 0 0 3px #EC4899' }} />
              <div style={{ background: 'white', borderRadius: '16px', padding: '24px 28px', border: '1px solid rgba(236,72,153,0.12)', boxShadow: '0 4px 20px rgba(236,72,153,0.06)' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#BE185D', marginBottom: '8px' }}>Career · {career.yearsOfExperience} yrs experience</p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1A1A1A' }}>{career.currentDesignation}</p>
                <p style={{ fontSize: '15px', color: '#9D174D', marginTop: '4px' }}>{career.company}</p>
                <p style={{ fontSize: '13px', color: '#BE185D', marginTop: '3px' }}>{career.industry}</p>
                {career.showIncome && career.annualIncome && <p style={{ fontSize: '13px', color: '#F59E0B', marginTop: '8px', fontWeight: 600 }}>{career.annualIncome} per annum</p>}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><SectionTitle>Interests & Lifestyle</SectionTitle></motion.div>
        {personalInterests.hobbies.length > 0 && (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '14px', marginBottom: '36px' }}>
            {personalInterests.hobbies.map((hobby, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ background: 'linear-gradient(160deg, rgba(245,158,11,0.08), rgba(252,211,77,0.05))', borderRadius: '16px', padding: '20px 12px', textAlign: 'center', border: '1px solid rgba(245,158,11,0.12)' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{getEmoji(hobby)}</div>
                <p style={{ fontSize: '12px', fontWeight: 500, color: '#78350F' }}>{hobby}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {personalInterests.languages.length > 0 && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D97706', marginBottom: '10px' }}>Languages</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {personalInterests.languages.map((l, i) => <span key={i} style={{ padding: '7px 16px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '999px', fontSize: '14px', color: '#92400E', fontWeight: 500 }}>{l}</span>)}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D97706' }}>Diet</p>
              <p style={{ fontSize: '14px', color: '#78350F', fontWeight: 500, marginTop: '4px', textTransform: 'capitalize' }}>{personalInterests.dietaryPreference}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* GALLERY — polaroid style */}
      {media.galleryPhotos.length > 0 && (
        <section style={{ padding: '80px 24px', background: 'linear-gradient(180deg, rgba(245,158,11,0.04) 0%, transparent 100%)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><SectionTitle>Moments</SectionTitle></motion.div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
              {media.galleryPhotos.map((photo, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, rotate: POLAROID_ROTATIONS[i % POLAROID_ROTATIONS.length], y: 20 }}
                  whileInView={{ opacity: 1, rotate: POLAROID_ROTATIONS[i % POLAROID_ROTATIONS.length], y: 0 }}
                  whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => setLightboxPhoto(photo)}
                  style={{ background: 'white', padding: '10px 10px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', cursor: 'pointer', flexShrink: 0 }}>
                  <div style={{ width: '180px', height: '150px', overflow: 'hidden' }}>
                    <img src={photo} alt={`Moment ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPECTATIONS */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp}
        style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px 80px' }}>
        <SectionTitle>Seeking a Life Partner</SectionTitle>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', border: '1px solid rgba(245,158,11,0.15)', boxShadow: '0 8px 40px rgba(245,158,11,0.08)' }}>
          <p style={{ fontSize: '16px', lineHeight: 1.85, color: '#444' }}>
            Seeking a life partner who is between <strong style={{ color: '#92400E' }}>{matchPreferences.ageRangeMin}–{matchPreferences.ageRangeMax} years</strong>
            {matchPreferences.location && matchPreferences.location.length > 0 && <>, from <strong style={{ color: '#92400E' }}>{matchPreferences.location.join(', ')}</strong></>}
            {matchPreferences.education && matchPreferences.education.length > 0 && <>, with <strong style={{ color: '#92400E' }}>{matchPreferences.education.join(' or ')}</strong> education</>}
            {matchPreferences.profession && matchPreferences.profession.length > 0 && <>, working as <strong style={{ color: '#92400E' }}>{matchPreferences.profession.join(' or ')}</strong></>}.
          </p>
          {matchPreferences.expectations && (
            <p style={{ fontSize: '15px', color: '#78350F', lineHeight: 1.8, marginTop: '20px', fontStyle: 'italic', borderTop: '1px solid rgba(245,158,11,0.12)', paddingTop: '20px' }}>
              "{matchPreferences.expectations}"
            </p>
          )}
        </div>
      </motion.section>

      {/* SOCIAL LINKS */}
      {basicInfo.socialLinks && Object.values(basicInfo.socialLinks).some(Boolean) && (
        <section style={{ textAlign: 'center', padding: '40px 24px', borderTop: `1px solid ${ri.color}20`, background: `${ri.bgColor}` }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: ri.color, marginBottom: '16px' }}>Connect</p>
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
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 18px', border: `1.5px solid ${ri.color}`, borderRadius: '999px', fontSize: '13px', fontWeight: 500, color: ri.color, textDecoration: 'none', background: 'white', transition: 'all 0.2s' }}>
                  <span>{icon}</span> {label}
                </a>
              ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '60px 24px 48px', borderTop: `1px solid ${ri.color}20`, background: `linear-gradient(180deg, transparent, ${ri.bgColor})` }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>{ri.symbol}</div>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, color: ri.color }}>{basicInfo.fullName}</h2>
          <LotusOrnament />
          <p style={{ fontSize: '14px', color: '#78716C', marginTop: '8px' }}>{basicInfo.city}{basicInfo.state ? `, ${basicInfo.state}` : ''}</p>
          <p style={{ fontSize: '13px', color: ri.color, marginTop: '20px', fontStyle: 'italic' }}>With blessings from the family ✦</p>
        </motion.div>
      </footer>

      {/* DOCUMENTS */}
      {media.documents && media.documents.length > 0 && (
        <section style={{ padding: '60px 24px', background: '#FAFAF7' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: ri.color, marginBottom: '20px', textAlign: 'center' }}>Other Documents</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
              {media.documents.map((doc, i) => (
                <div key={i} style={{ padding: '18px 20px', border: `1.5px solid ${ri.color}30`, borderRadius: '12px', background: 'white', display: 'flex', flexDirection: 'column' as const, gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{doc.type === 'pdf' ? '📄' : '🖼️'}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#333', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{doc.name}</p>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: doc.type === 'pdf' ? '#DC2626' : ri.color, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{doc.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (doc.type === 'image') setLightboxPhoto(doc.url); else window.open(doc.url, '_blank') }}
                    style={{ padding: '6px 0', background: ri.color, border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer', width: '100%' }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {lightboxPhoto && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setLightboxPhoto(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'pointer' }}>
          <img src={lightboxPhoto} alt="Full size" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} />
        </motion.div>
      )}
    </div>
  )
}
