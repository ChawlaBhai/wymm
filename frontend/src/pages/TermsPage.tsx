export default function TermsPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '60px 24px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontSize: 13, color: '#AAA', marginBottom: 8 }}>Effective date: 1 June 2025</p>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 34, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em', marginBottom: 12 }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 40 }}>
          By using wymm, you agree to these terms. They are straightforward — please read them.
        </p>

        <Section title="1. What wymm is">
          <p>
            wymm ("we", "us", "our") is an online tool that helps individuals create, preview, and share marriage biodata — a structured personal profile used in Indian matrimonial introductions. We provide templates, a form-based editor, and a shareable link for each profile.
          </p>
          <p>
            wymm is a self-service tool. We do not act as a matchmaking agency, and we do not connect or introduce users to one another.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <p>
            You must be at least 18 years old to use wymm. By using the service, you confirm that you meet this requirement. If you are creating a profile on behalf of a family member, you represent that you have their consent to do so.
          </p>
        </Section>

        <Section title="3. Your responsibilities">
          <ul>
            <li><strong>Accurate information</strong> — the details you enter must be truthful and accurate to the best of your knowledge. Deliberately false information (fake names, fabricated qualifications, misrepresented photos) is not permitted.</li>
            <li><strong>Appropriate photos</strong> — photos must be decent, recent, and of the person the profile is about. Do not upload photos of other people without their consent.</li>
            <li><strong>Your own data</strong> — you must only create profiles for yourself or with explicit consent of the person whose data you are entering.</li>
          </ul>
        </Section>

        <Section title="4. Prohibited uses">
          <p>You may not use wymm to:</p>
          <ul>
            <li>Create fake, misleading, or fraudulent profiles.</li>
            <li>Impersonate any person or entity.</li>
            <li>Harass, stalk, or harm other individuals.</li>
            <li>Scrape, crawl, or programmatically collect data from the service.</li>
            <li>Attempt to gain unauthorised access to our systems or another user's profile.</li>
            <li>Use the service for any illegal purpose under Indian or applicable international law.</li>
            <li>Distribute, republish, or commercially exploit any content from the service without our written permission.</li>
          </ul>
          <p>We reserve the right to remove profiles and terminate access for violations of these rules without prior notice.</p>
        </Section>

        <Section title="5. Content ownership">
          <p>
            You own the content you create on wymm. By submitting a profile, you grant us a limited, non-exclusive licence to store and display your content for the purpose of providing the service (e.g., showing your biodata at your shareable link). We will never claim ownership of your content or use it beyond operating the service.
          </p>
          <p>
            You can delete your profile — and revoke this licence — at any time from the <a href="/manage" style={linkStyle}>/manage</a> page.
          </p>
        </Section>

        <Section title="6. Profile removal">
          <p>
            We may remove or unpublish a profile at our discretion if it violates these terms, contains unlawful content, or is reported by a third party with a credible complaint. Where possible, we will notify the profile owner before taking action.
          </p>
        </Section>

        <Section title="7. Service availability">
          <p>
            We aim to keep wymm available and working well, but we do not guarantee uninterrupted access. The service is provided on an <strong>"as-is"</strong> and <strong>"as-available"</strong> basis. We may update, modify, or discontinue features at any time.
          </p>
        </Section>

        <Section title="8. No warranty">
          <p>
            To the fullest extent permitted by law, wymm is provided without any warranty, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the service will be error-free, secure, or available at all times.
          </p>
        </Section>

        <Section title="9. Limitation of liability">
          <p>
            In no event shall wymm or its creators be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of the service, including but not limited to damages for loss of data, loss of goodwill, or any matrimonial outcome. Our total liability to you for any claim shall not exceed the amount you paid us (if any) in the twelve months preceding the claim.
          </p>
        </Section>

        <Section title="10. Indemnification">
          <p>
            You agree to indemnify and hold harmless wymm and its creators from any claims, damages, or expenses (including reasonable legal fees) arising from your use of the service, your content, or your violation of these terms.
          </p>
        </Section>

        <Section title="11. Governing law">
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in India.
          </p>
        </Section>

        <Section title="12. Changes to these terms">
          <p>
            We may update these terms from time to time. When we do, we will update the effective date at the top of this page. Continued use of the service after changes are posted means you accept the updated terms. If the changes are significant, we will make reasonable efforts to notify active users.
          </p>
        </Section>

        <Section title="13. Contact">
          <p>
            Questions about these terms? Reach us through our <a href="/contact" style={linkStyle}>contact form</a>.
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
