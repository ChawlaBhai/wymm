export default function PrivacyPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '60px 24px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontSize: 13, color: '#AAA', marginBottom: 8 }}>Effective date: 1 June 2025</p>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 34, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em', marginBottom: 12 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 40 }}>
          At wymm, we believe your personal information belongs to you. This policy explains exactly what we collect, how we use it, and the rights you have over it. We keep it short and plain — no legal jargon.
        </p>

        <Section title="1. What data we collect">
          <p>We only collect information you give us directly:</p>
          <ul>
            <li><strong>Profile information</strong> — your name, age, height, religion, caste, education, profession, city, family details, and any other fields you fill in on the biodata form.</li>
            <li><strong>Photos</strong> — any photo you upload to appear on your biodata.</li>
            <li><strong>Email address</strong> — if you sign in to save or manage your profile.</li>
            <li><strong>Contact form submissions</strong> — your name, email, phone number, and message if you reach out via our contact form.</li>
          </ul>
          <p>We do <strong>not</strong> collect browser fingerprints, device identifiers, or any information beyond what you explicitly provide.</p>
        </Section>

        <Section title="2. How we use your data">
          <ul>
            <li>To generate and display your biodata profile at its shareable link.</li>
            <li>To allow you to edit or delete your profile from the <a href="/manage" style={linkStyle}>/manage</a> page.</li>
            <li>To respond to messages you send us through the contact form.</li>
            <li>To understand how the service is used in aggregate (e.g., which templates are most popular) so we can improve it. This analysis is done on anonymised data.</li>
          </ul>
          <p>We will never use your information for automated profiling, advertising, or any purpose not listed here.</p>
        </Section>

        <Section title="3. Data storage and security">
          <p>
            Your data is stored in <strong>Google Firebase</strong>, with Firestore and Firebase Storage configured in the <strong>Asia South region (Mumbai, India)</strong>. Firebase enforces encryption at rest and in transit using industry-standard TLS.
          </p>
          <p>
            Photos you upload are stored in Firebase Storage. Profile data is stored in Firestore. Access is restricted by Firebase security rules — only you (when signed in) and our admin can read or modify your data.
          </p>
        </Section>

        <Section title="4. Data sharing">
          <p>
            We do <strong>not</strong> sell, rent, or share your personal data with any third party for commercial purposes. The only third-party service that handles your data is Google Firebase (our storage and database provider), which is bound by Google's data processing terms.
          </p>
          <p>We have no advertising partners, no tracking pixels, and no analytics SDKs that send your data to external servers.</p>
        </Section>

        <Section title="5. Your rights">
          <ul>
            <li><strong>Access</strong> — you can view all data on your biodata profile at any time.</li>
            <li><strong>Correction</strong> — you can edit any field in your profile from <a href="/create" style={linkStyle}>/create</a>.</li>
            <li><strong>Deletion</strong> — you can permanently delete your profile and all associated data from the <a href="/manage" style={linkStyle}>/manage</a> page. Deletion is immediate and irreversible.</li>
            <li><strong>Portability</strong> — your biodata can be downloaded as a PDF at any time.</li>
          </ul>
          <p>If you need further assistance exercising any of these rights, contact us at <a href="/contact" style={linkStyle}>/contact</a>.</p>
        </Section>

        <Section title="6. Cookies">
          <p>
            wymm uses only essential browser storage (localStorage) to remember your in-progress biodata form across sessions. We do not use tracking cookies or third-party cookies of any kind.
          </p>
        </Section>

        <Section title="7. Children's privacy">
          <p>
            wymm is intended for adults seeking marriage matches. We do not knowingly collect data from anyone under 18. If you believe a minor has submitted data, please contact us and we will delete it promptly.
          </p>
        </Section>

        <Section title="8. Changes to this policy">
          <p>
            If we make material changes to this policy, we will update the effective date at the top of this page. Continued use of the service after changes are posted constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            Questions about this privacy policy? Reach us through our <a href="/contact" style={linkStyle}>contact form</a>.
          </p>
        </Section>
      </div>
    </div>
  )
}

const linkStyle: React.CSSProperties = {
  color: '#7C3AED',
  textDecoration: 'none',
  fontWeight: 500,
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 12, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, color: '#444', lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}
