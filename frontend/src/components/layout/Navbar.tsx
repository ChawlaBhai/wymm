import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Languages } from 'lucide-react'
import { useAppStore } from '@/store/appStore'
import { useTranslation } from '@/lib/i18n'

const NAV_LINKS = [
  { key: 'nav.templates', sectionId: null, href: '/templates' },
  { key: 'nav.howItWorks', sectionId: 'how-it-works', href: null },
  { key: 'nav.about', sectionId: null, href: '/about' },
  { key: 'nav.manage', sectionId: null, href: '/manage' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  
  const { theme, language, toggleTheme, toggleLanguage } = useAppStore()
  const { t } = useTranslation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function scrollTo(sectionId: string) {
    setMenuOpen(false)
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const isDark = theme === 'dark'

  return (
    <>
      <motion.header
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
        animate={{
          backgroundColor: scrolled 
            ? (isDark ? 'rgba(15, 23, 42, 0.92)' : 'rgba(255,255,255,0.92)') 
            : 'rgba(0,0,0,0)',
          boxShadow: scrolled
            ? (isDark ? '0 1px 0 rgba(255,255,255,0.1), 0 4px 16px rgba(0,0,0,0.2)' : '0 1px 0 rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)')
            : '0 1px 0 rgba(0,0,0,0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span style={{ fontSize: 20 }}>💍</span>
            <span
              className="text-gradient-purple"
              style={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: '-0.03em',
              }}
            >
              wymm
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {NAV_LINKS.map((link) => (
              link.href ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="btn-ghost dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800"
                  style={{ fontSize: 14, fontFamily: 'inherit', textDecoration: 'none' }}
                >
                  {t(link.key)}
                </Link>
              ) : (
                <button
                  key={link.sectionId!}
                  onClick={() => scrollTo(link.sectionId!)}
                  className="btn-ghost dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800"
                  style={{ fontSize: 14, fontFamily: 'inherit' }}
                >
                  {t(link.key)}
                </button>
              )
            ))}
          </nav>

          {/* Desktop CTA & Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-cta">
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Toggle Language"
            >
              <span className="font-semibold text-sm">{language === 'en' ? 'HI' : 'EN'}</span>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/create"
              className="btn-primary"
              style={{ padding: '9px 20px', fontSize: 14 }}
            >
              {t('nav.createBiodata')}
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions flex md:hidden items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              <span className="font-semibold text-sm">{language === 'en' ? 'HI' : 'EN'}</span>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-600 dark:text-gray-300"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                alignItems: 'flex-end',
              }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7, width: 22 } : { rotate: 0, y: 0, width: 22 }}
                style={{ display: 'block', height: 2, background: isDark ? '#fff' : '#1A1A1A', borderRadius: 2, width: 22, transformOrigin: 'center' }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                style={{ display: 'block', height: 2, background: isDark ? '#fff' : '#1A1A1A', borderRadius: 2, width: 16 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7, width: 22 } : { rotate: 0, y: 0, width: 22 }}
                style={{ display: 'block', height: 2, background: isDark ? '#fff' : '#1A1A1A', borderRadius: 2, width: 22, transformOrigin: 'center' }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              style={{
                overflow: 'hidden',
                borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)',
                background: isDark ? 'rgba(15, 23, 42, 0.97)' : 'rgba(255,255,255,0.97)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="container" style={{ paddingTop: 16, paddingBottom: 20 }}>
                {NAV_LINKS.map((link, i) => (
                    <motion.div
                      key={link.href ?? link.sectionId!}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      {link.href ? (
                        <Link
                          to={link.href}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '12px 0',
                            borderBottom: isDark ? '1px solid #334155' : '1px solid #F0F0F0',
                            fontFamily: 'inherit',
                            fontSize: 16,
                            color: isDark ? '#F8FAFC' : '#1A1A1A',
                            fontWeight: 500,
                            textDecoration: 'none',
                          }}
                        >
                          {t(link.key)}
                        </Link>
                      ) : (
                        <button
                          onClick={() => scrollTo(link.sectionId!)}
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '12px 0',
                            background: 'none',
                            border: 'none',
                            borderBottom: isDark ? '1px solid #334155' : '1px solid #F0F0F0',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontSize: 16,
                            color: isDark ? '#F8FAFC' : '#1A1A1A',
                            fontWeight: 500,
                          }}
                        >
                          {t(link.key)}
                        </button>
                      )}
                    </motion.div>
                  ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.2 }}
                  style={{ marginTop: 16 }}
                >
                  <Link
                    to="/create"
                    className="btn-primary"
                    onClick={() => setMenuOpen(false)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {t('nav.createBiodata')}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Responsive styles injected inline */}
      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
        }
        @media (min-width: 768px) {
          .mobile-actions { display: none !important; }
        }
      `}</style>
    </>
  )
}
