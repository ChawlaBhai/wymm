import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#F8F9FB', borderTop: '1px solid #E8E8E8', padding: '56px 0 36px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>💍</span>
              <span className="text-gradient-purple" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: '-0.03em' }}>wymm</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#888', lineHeight: 1.65, maxWidth: 220 }}>
              The biodata that speaks for you.
            </p>
          </div>

          {/* Product */}
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#AAA', marginBottom: 16 }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Templates', to: '/templates' },
                { label: 'How it works', to: '/#how-it-works' },
                { label: 'Manage Profiles', to: '/manage' },
                { label: 'About', to: '/about' },
              ].map(link => (
                <Link key={link.label} to={link.to} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#666', textDecoration: 'none', fontWeight: 500 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7C3AED')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#AAA', marginBottom: 16 }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Terms of Service', to: '/terms' },
                { label: 'Refund Policy', to: '/refund' },
              ].map(link => (
                <Link key={link.label} to={link.to} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#666', textDecoration: 'none', fontWeight: 500 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#7C3AED')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#AAA', marginBottom: 16 }}>Contact</div>
            <Link to="/contact" style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#666', textDecoration: 'none', fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#7C3AED')}
              onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
              Get in touch
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #E8E8E8', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#BBBBBB' }}>
            Made with ♥ in India · © 2025 wymm
          </span>
        </div>
      </div>
    </footer>
  )
}
