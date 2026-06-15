import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const FEATURE_CARDS = [
  {
    icon: '✦',
    title: 'Five crafted templates',
    description: 'Not themes, not skins. Five distinct design personalities built for five types of people. Each one considered, each one deliberate.',
    accent: '#7C3AED',
    bg: 'rgba(124,58,237,0.06)',
  },
  {
    icon: '⚡',
    title: 'Share in seconds',
    description: 'A link your family can send. A QR code for the phone screen. No app downloads, no registrations. Just a beautiful page that travels with you.',
    accent: '#EC4899',
    bg: 'rgba(236,72,153,0.06)',
  },
  {
    icon: '∞',
    title: 'Free, always',
    description: 'We believe beautiful things shouldn\'t be gated behind a paywall when something as important as marriage is at stake.',
    accent: '#10B981',
    bg: 'rgba(16,185,129,0.06)',
  },
]

const VALUES = [
  {
    title: 'Dignity',
    body: 'Every person deserves a profile that represents them with the respect they carry. We don\'t cut corners on that.',
  },
  {
    title: 'Simplicity',
    body: 'The best technology disappears. You should never notice the tool, only the result.',
  },
  {
    title: 'Inclusivity',
    body: 'We support all communities, all religions, all languages. This is for every Indian family.',
  },
]

function FadeInSection({
  children,
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const xInit = direction === 'left' ? -40 : direction === 'right' ? 40 : 0
  const yInit = direction === 'up' ? 32 : 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xInit, y: yInit }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh' }}>

      {/* HERO SECTION */}
      <section style={{
        background: '#FFFFFF',
        paddingTop: 140,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Aurora gradient background */}
        <motion.div
          aria-hidden="true"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: [
              'radial-gradient(ellipse 70% 50% at 15% 25%, rgba(124,58,237,0.08) 0%, transparent 55%)',
              'radial-gradient(ellipse 60% 45% at 85% 65%, rgba(236,72,153,0.07) 0%, transparent 55%)',
            ].join(', '),
            backgroundSize: '200% 200%',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div ref={heroRef}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              style={{ marginBottom: 28 }}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 16px',
                background: 'rgba(124,58,237,0.07)',
                border: '1px solid rgba(124,58,237,0.14)',
                borderRadius: 99,
                fontSize: 12,
                fontWeight: 700,
                color: '#7C3AED',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                Our Story
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 60px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#1A1A1A',
                marginBottom: 28,
              }}
            >
              Four words that{' '}
              <span style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                change everything.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(16px, 1.8vw, 20px)',
                color: '#555',
                lineHeight: 1.75,
                maxWidth: 640,
                margin: '0 auto',
              }}
            >
              Will You Marry Me? — wymm was built for the journey that leads to that question.
            </motion.p>
          </div>
        </div>
      </section>

      {/* WHY WYMM SECTION */}
      <section style={{
        background: '#FFFFFF',
        padding: '96px 0',
        borderTop: '1px solid #F0F0F0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background watermark */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(40px, 8vw, 96px)',
            letterSpacing: '-0.03em',
            color: 'transparent',
            backgroundImage: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            opacity: 0.08,
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}>
            Will You Marry Me?
          </span>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <FadeInSection>
            <div style={{ marginBottom: 14 }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#7C3AED',
              }}>
                Why wymm?
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(26px, 4vw, 40px)',
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              marginBottom: 40,
            }}>
              Four words that change everything.
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: '#444',
              lineHeight: 1.85,
              marginBottom: 28,
            }}>
              wymm stands for <strong style={{ color: '#1A1A1A' }}>Will You Marry Me?</strong> — the four words that change everything.
              The question every arranged marriage journey is quietly building towards. We named our platform after that moment
              because we believe every step of the journey deserves the same intention and care as that question itself.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: '#444',
              lineHeight: 1.85,
              marginBottom: 28,
            }}>
              When a biodata reaches a family, it carries the weight of that question before it's ever asked.
              We wanted to make that first impression worthy of what it represents.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: '#444',
              lineHeight: 1.85,
            }}>
              wymm was built by <strong style={{ color: '#1A1A1A' }}>Sahaj Chawla</strong> — with the belief that
              every person stepping into this journey deserves a first impression that truly represents them.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section style={{
        background: '#FAFAFA',
        padding: '96px 0',
        borderTop: '1px solid #F0F0F0',
        borderBottom: '1px solid #F0F0F0',
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 64,
            alignItems: 'start',
          }}>
            {/* Left: Pullquote */}
            <FadeInSection direction="left">
              <blockquote style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: '#1A1A1A',
                margin: 0,
                padding: 0,
                borderLeft: '4px solid',
                borderImage: 'linear-gradient(180deg, #7C3AED, #EC4899) 1',
                paddingLeft: 28,
              }}>
                "Your biodata travels farther than you do."
              </blockquote>
            </FadeInSection>

            {/* Right: Body copy */}
            <FadeInSection direction="right" delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(15px, 1.6vw, 17px)',
                  color: '#444',
                  lineHeight: 1.85,
                  margin: 0,
                }}>
                  In India, arranged marriages still begin with a document. A page, sometimes
                  two. That page travels to families in cities you've never visited, reaches
                  parents who've never met you, and forms the first judgment before any
                  conversation begins. It is, quietly, one of the most consequential pieces of
                  communication in a person's life.
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(15px, 1.6vw, 17px)',
                  color: '#444',
                  lineHeight: 1.85,
                  margin: 0,
                }}>
                  And yet, most biodatas look like they were made in fifteen minutes on a
                  borrowed laptop. The format hasn't changed in decades. The presentation is
                  an afterthought. The people behind them — layered, warm, extraordinary
                  people — are reduced to a table of facts.
                </p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(15px, 1.6vw, 17px)',
                  color: '#444',
                  lineHeight: 1.85,
                  margin: 0,
                }}>
                  We built wymm to change that. Not by adding complexity, but by removing
                  everything that shouldn't be there — and replacing it with intention.
                  A well-designed biodata isn't vanity. It's respect for yourself and the
                  families receiving it.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILT SECTION */}
      <section style={{ background: '#FFFFFF', padding: '96px 0' }}>
        <div className="container">
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#7C3AED',
              }}>
                What we built
              </span>
            </div>
            <h2 style={{
              textAlign: 'center',
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(26px, 4vw, 40px)',
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              marginBottom: 56,
            }}>
              Simple to use. Nothing like what you've seen.
            </h2>
          </FadeInSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24,
          }}>
            {FEATURE_CARDS.map((card, i) => (
              <FadeInSection key={card.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 40px rgba(124,58,237,0.12)',
                    transition: { duration: 0.22 },
                  }}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 16,
                    padding: '32px 28px',
                    border: '1px solid #E8E8E8',
                    height: '100%',
                  }}
                >
                  {/* Icon bubble */}
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: card.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    color: card.accent,
                    fontWeight: 700,
                    fontFamily: 'Sora, sans-serif',
                    marginBottom: 20,
                  }}>
                    {card.icon}
                  </div>

                  <h3 style={{
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: '-0.02em',
                    color: '#1A1A1A',
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}>
                    {card.title}
                  </h3>

                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 15,
                    color: '#666',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {card.description}
                  </p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section style={{
        background: '#FAFAFA',
        padding: '96px 0',
        borderTop: '1px solid #F0F0F0',
      }}>
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          <FadeInSection>
            <h2 style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(26px, 4vw, 40px)',
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              marginBottom: 56,
              textAlign: 'center',
            }}>
              What we stand for
            </h2>
          </FadeInSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {VALUES.map((v, i) => (
              <FadeInSection key={v.title} delay={i * 0.1}>
                <div style={{
                  display: 'flex',
                  gap: 40,
                  alignItems: 'flex-start',
                  padding: '40px 0',
                  borderBottom: i < VALUES.length - 1 ? '1px solid #EBEBEB' : 'none',
                }}>
                  {/* Index */}
                  <div style={{
                    fontFamily: 'Sora, sans-serif',
                    fontWeight: 800,
                    fontSize: 13,
                    color: '#7C3AED',
                    opacity: 0.5,
                    letterSpacing: '0.08em',
                    flexShrink: 0,
                    paddingTop: 4,
                    width: 28,
                    textAlign: 'right',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: 'Sora, sans-serif',
                      fontWeight: 700,
                      fontSize: 20,
                      letterSpacing: '-0.02em',
                      color: '#1A1A1A',
                      marginBottom: 10,
                    }}>
                      {v.title}
                    </h3>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 16,
                      color: '#666',
                      lineHeight: 1.75,
                      margin: 0,
                    }}>
                      {v.body}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{
        background: '#FFFFFF',
        padding: '96px 0 120px',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: 640, margin: '0 auto' }}>
          <FadeInSection>
            {/* Decorative gradient line */}
            <div style={{
              width: 48,
              height: 3,
              background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
              borderRadius: 99,
              margin: '0 auto 40px',
            }} />

            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(22px, 3.5vw, 32px)',
              lineHeight: 1.35,
              letterSpacing: '-0.02em',
              color: '#1A1A1A',
              marginBottom: 40,
            }}>
              If you've ever felt your biodata didn't do you justice — we made wymm for you.
            </p>

            <Link
              to="/create"
              className="btn-primary"
              style={{ fontSize: 16, padding: '14px 36px' }}
            >
              Create Your Biodata →
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* LEGAL FOOTER */}
      <section style={{
        background: '#FAFAFA',
        borderTop: '1px solid #F0F0F0',
        padding: '28px 0',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 12,
            color: '#BBBBBB',
            lineHeight: 1.6,
            margin: 0,
          }}>
            wymm is a product of Sahaj Chawla, a sole proprietorship registered in Ayodhya, Uttar Pradesh, India.
          </p>
        </div>
      </section>
    </main>
  )
}
