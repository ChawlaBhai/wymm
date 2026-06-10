import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await supabase.from('contact_submissions').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        createdAt: new Date().toISOString(),
        read: false,
      })
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error('[ContactPage] submit error:', err)
      setStatus('error')
    }
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '60px 24px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 34,
          fontWeight: 800,
          color: '#1A1A1A',
          letterSpacing: '-0.03em',
          marginBottom: 10,
        }}>
          Get in touch
        </h1>
        <p style={{ fontSize: 16, color: '#666', lineHeight: 1.65, marginBottom: 40 }}>
          Have a question, a bug report, or just want to say hello? Fill in the form and we'll get back to you.
        </p>

        {status === 'success' ? (
          <div style={{
            background: '#F0FDF4',
            border: '1.5px solid #86EFAC',
            borderRadius: 14,
            padding: '28px 28px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
            <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 18, fontWeight: 700, color: '#16A34A', marginBottom: 6 }}>
              Message sent!
            </p>
            <p style={{ fontSize: 15, color: '#555' }}>
              Thank you! We'll get back to you soon.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              style={{
                marginTop: 20,
                padding: '10px 24px',
                borderRadius: 8,
                border: '1.5px solid #E5E5E5',
                background: 'white',
                color: '#333',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle} htmlFor="contact-name">Name *</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="form-input"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle} htmlFor="contact-email">Email *</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="form-input"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle} htmlFor="contact-phone">
                Phone <span style={{ color: '#AAA', fontWeight: 400 }}>(optional)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="form-input"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <label style={labelStyle} htmlFor="contact-message">Message *</label>
              <textarea
                id="contact-message"
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={5}
                className="form-input"
                style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
              />
            </div>

            {status === 'error' && (
              <p style={{
                fontSize: 14,
                color: '#DC2626',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: 8,
                padding: '10px 14px',
                marginBottom: 20,
              }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                fontSize: 15,
                opacity: status === 'loading' ? 0.7 : 1,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              }}
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: '#444',
  marginBottom: 6,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  border: '1.5px solid #E5E5E5',
  fontFamily: 'Inter, sans-serif',
  fontSize: 15,
  color: '#1A1A1A',
  outline: 'none',
  boxSizing: 'border-box',
  background: '#FAFAFA',
  transition: 'border-color 150ms ease',
}
