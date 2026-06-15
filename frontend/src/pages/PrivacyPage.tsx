export default function PrivacyPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '60px 24px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontSize: 13, color: '#AAA', marginBottom: 8 }}>Effective date: 1 June 2025</p>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 34, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em', marginBottom: 12 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 40 }}>
          This Privacy Policy describes how wymm ("we", "us", "our"), operated by Sahaj Chawla, a Sole Proprietorship
          based in Ram Nagar Colony, Ayodhya, Uttar Pradesh, India, collects, uses, and protects your personal
          information when you use the wymm service at wymm.store. Please read this policy carefully. By using our
          service, you agree to the practices described here.
        </p>

        <Section title="1. Information we collect">
          <p>We collect only the information you provide directly to us:</p>
          <ul>
            <li>
              <strong>Biodata profile information</strong> — your name, age, date of birth, height, weight, complexion,
              religion, caste, sub-caste, mother tongue, marital status, education, profession, income, city, state,
              family details, horoscope information, and any other fields you fill in on the biodata form.
            </li>
            <li>
              <strong>Profile photo</strong> — any photograph you upload to appear on your biodata.
            </li>
            <li>
              <strong>Email address</strong> — if you sign in via Google or email to save or manage your profile.
            </li>
            <li>
              <strong>Payment information</strong> — when you pay to publish a profile, the transaction is processed
              entirely by Razorpay Payment Solutions Pvt. Ltd. We receive only a payment confirmation and a
              Razorpay payment ID. We do not store your card number, CVV, bank account details, or any other
              sensitive payment credentials.
            </li>
            <li>
              <strong>Contact form submissions</strong> — your name, email, and message if you reach out through our
              contact form at <a href="/contact" style={linkStyle}>/contact</a>.
            </li>
          </ul>
          <p>
            We do <strong>not</strong> collect browser fingerprints, device identifiers, IP addresses for profiling,
            or any information beyond what you explicitly provide to us.
          </p>
        </Section>

        <Section title="2. How we use your information">
          <p>We use the information we collect for the following purposes only:</p>
          <ul>
            <li>To generate, store, and display your biodata profile at its shareable link.</li>
            <li>To allow you to edit, update, or delete your profile at any time.</li>
            <li>To process payments for profile publication via Razorpay.</li>
            <li>To respond to messages you send through our contact form.</li>
            <li>
              To understand aggregate, anonymised usage patterns (e.g., which templates are most popular) in order
              to improve the service. No individual profile data is used for this analysis.
            </li>
            <li>To send you service-related communications (e.g., confirmation of profile publication).</li>
          </ul>
          <p>
            We will <strong>never</strong> use your information for automated profiling, targeted advertising,
            algorithmic matchmaking, or any purpose not listed above.
          </p>
        </Section>

        <Section title="3. Data storage and security">
          <p>
            Your biodata and profile data is stored in <strong>Supabase</strong>, a PostgreSQL-based cloud database
            hosted on secure cloud infrastructure with encryption at rest and in transit (TLS). Profile photos are
            stored in Supabase Storage.
          </p>
          <p>
            Access to your data is protected by row-level security policies — only you (when authenticated) and
            authorised administrators can read or modify your profile. We follow industry-standard security
            practices to safeguard your data against unauthorised access, disclosure, or destruction.
          </p>
          <p>
            While we take reasonable precautions, no system is completely secure. If you become aware of any
            security concern related to your account, please contact us immediately via{' '}
            <a href="/contact" style={linkStyle}>/contact</a>.
          </p>
        </Section>

        <Section title="4. Payment processing (Razorpay)">
          <p>
            Payments on wymm are processed by <strong>Razorpay Payment Solutions Pvt. Ltd.</strong>, a PCI-DSS
            compliant payment gateway regulated by the Reserve Bank of India. When you make a payment, you are
            subject to Razorpay's own Privacy Policy and Terms of Service in addition to ours.
          </p>
          <p>
            Razorpay may collect and process your payment details, device information, and transaction data as
            described in their privacy policy at{' '}
            <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              razorpay.com/privacy
            </a>. We do not store, log, or have access to your full payment card or bank account details.
          </p>
        </Section>

        <Section title="5. Data sharing">
          <p>
            We do <strong>not</strong> sell, rent, trade, or share your personal information with any third party
            for commercial, marketing, or advertising purposes — ever.
          </p>
          <p>The only circumstances in which we share data are:</p>
          <ul>
            <li>
              <strong>Service providers</strong> — Supabase (data storage) and Razorpay (payment processing) as
              described above, each bound by their own data processing agreements.
            </li>
            <li>
              <strong>Legal requirement</strong> — if we are required to disclose information by law, court order,
              or a valid request from a government authority under Indian law, we will do so and, where permitted,
              notify you.
            </li>
          </ul>
          <p>
            We have no advertising partners, no tracking pixels, no analytics SDKs that send your data to external
            servers, and no social login buttons that track you across the web.
          </p>
        </Section>

        <Section title="6. Cookies and local storage">
          <p>
            wymm uses <strong>session cookies</strong> set by Supabase solely for authentication — to keep you
            signed in during your session. These are essential cookies; without them the sign-in feature does not
            work.
          </p>
          <p>
            We also use <strong>browser localStorage</strong> to remember your in-progress biodata form across page
            reloads, so you do not lose your work. This data stays on your device and is never transmitted to our
            servers until you explicitly save or publish.
          </p>
          <p>
            We do <strong>not</strong> use tracking cookies, advertising cookies, or any third-party cookies of
            any kind.
          </p>
        </Section>

        <Section title="7. Your rights">
          <p>You have the following rights over your personal data:</p>
          <ul>
            <li>
              <strong>Access</strong> — you can view all data on your biodata profile at any time by visiting your
              profile or the <a href="/manage" style={linkStyle}>/manage</a> page.
            </li>
            <li>
              <strong>Correction</strong> — you can edit any field in your profile at any time.
            </li>
            <li>
              <strong>Deletion</strong> — you can permanently delete your profile and all associated data from the{' '}
              <a href="/manage" style={linkStyle}>/manage</a> page. Deletion is immediate and irreversible. To
              request deletion of your account and all associated data, contact us via{' '}
              <a href="/contact" style={linkStyle}>/contact</a>.
            </li>
            <li>
              <strong>Portability</strong> — your biodata can be downloaded as a PDF at any time from the preview
              page, free of charge.
            </li>
            <li>
              <strong>Withdrawal of consent</strong> — you may withdraw consent for us to process your data at any
              time by deleting your profile and contacting us to remove your account.
            </li>
          </ul>
          <p>
            To exercise any of these rights or to raise a concern about how we handle your data, please contact us
            via <a href="/contact" style={linkStyle}>/contact</a>. We will respond within a reasonable time.
          </p>
        </Section>

        <Section title="8. Children's privacy">
          <p>
            wymm is intended exclusively for adults who are 18 years of age or older. We do not knowingly collect
            personal information from anyone under 18. If you believe a minor has submitted data to our platform,
            please contact us immediately via <a href="/contact" style={linkStyle}>/contact</a> and we will delete
            it promptly.
          </p>
        </Section>

        <Section title="9. Data retention">
          <p>
            We retain your biodata profile and associated data for as long as your profile exists on our platform.
            If you delete your profile, all associated data is removed from our active databases immediately. Backup
            copies may persist for up to 30 days before being purged.
          </p>
          <p>
            Payment records (Razorpay payment IDs and transaction confirmation) are retained as required by
            applicable Indian accounting and tax laws, typically for 7 years.
          </p>
        </Section>

        <Section title="10. Governing law and jurisdiction">
          <p>
            This Privacy Policy is governed by and construed in accordance with the laws of India, including the
            Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and
            Procedures and Sensitive Personal Data or Information) Rules, 2011. Any disputes arising under this
            policy shall be subject to the exclusive jurisdiction of the courts in Uttar Pradesh, India.
          </p>
        </Section>

        <Section title="11. Changes to this policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable
            law. When we do, we will update the effective date at the top of this page. If we make material changes,
            we will make reasonable efforts to notify active users. Continued use of the service after changes are
            posted constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section title="12. Contact us">
          <p>
            For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please
            reach us through our <a href="/contact" style={linkStyle}>contact form</a> at wymm.store/contact.
          </p>
          <p style={{ marginTop: 12, color: '#888', fontSize: 14 }}>
            Business: wymm<br />
            Proprietor: Sahaj Chawla<br />
            Address: Ram Nagar Colony, Ayodhya, Uttar Pradesh, India
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
