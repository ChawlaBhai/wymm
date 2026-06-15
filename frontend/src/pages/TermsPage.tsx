export default function TermsPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '60px 24px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontSize: 13, color: '#AAA', marginBottom: 8 }}>Effective date: 1 June 2025</p>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 34, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.03em', marginBottom: 12 }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 40 }}>
          These Terms &amp; Conditions ("Terms") govern your use of the wymm service ("Service") operated by
          Sahaj Chawla, trading as wymm, a Sole Proprietorship registered in Ram Nagar Colony, Ayodhya,
          Uttar Pradesh, India ("we", "us", "our"). By accessing or using the Service, you agree to be bound
          by these Terms. If you do not agree, please do not use the Service.
        </p>

        <Section title="1. Acceptance of terms">
          <p>
            By creating an account, filling out a biodata form, making a payment, or otherwise accessing the Service,
            you confirm that you have read, understood, and agree to these Terms and our{' '}
            <a href="/privacy" style={linkStyle}>Privacy Policy</a>. If you are using the Service on behalf of
            another person (e.g., creating a profile for a family member), you represent that you have obtained
            that person's explicit consent.
          </p>
          <p>
            We reserve the right to update these Terms at any time. The updated Terms will be effective from the
            date posted on this page. Continued use of the Service after changes are posted constitutes acceptance
            of the updated Terms.
          </p>
        </Section>

        <Section title="2. Description of the service">
          <p>
            wymm is an online platform that allows individuals to create, customise, preview, share, and download
            marriage biodata profiles — structured personal profiles used in Indian matrimonial introductions.
            The Service provides:
          </p>
          <ul>
            <li>A multi-step form editor for entering biodata information.</li>
            <li>Multiple professionally designed templates for presenting biodata.</li>
            <li>A live preview of the completed biodata.</li>
            <li>A shareable public profile link (upon payment and publication).</li>
            <li>A QR code linked to the public profile.</li>
            <li>A PDF download of the biodata.</li>
          </ul>
          <p>
            wymm is a self-service tool. We do <strong>not</strong> act as a matchmaking agency, matrimonial
            bureau, or introduction service, and we do not connect, introduce, or facilitate contact between users.
          </p>
        </Section>

        <Section title="3. Eligibility">
          <p>
            You must be at least 18 years of age to use wymm. By using the Service, you confirm that you meet
            this requirement. Profiles created for minors will be removed without notice.
          </p>
        </Section>

        <Section title="4. User responsibilities">
          <p>You are solely responsible for the content you submit to the Service. You agree to:</p>
          <ul>
            <li>
              <strong>Provide accurate information</strong> — all details you enter must be truthful and accurate
              to the best of your knowledge. Deliberately false or misleading information is strictly prohibited.
            </li>
            <li>
              <strong>Use appropriate photos</strong> — photos must be decent, recent, and of the person the
              profile is about. Do not upload photos of other people without their explicit consent.
            </li>
            <li>
              <strong>Respect others' privacy</strong> — do not enter personal details of other individuals
              (family members, references) without their knowledge and consent.
            </li>
            <li>
              <strong>Maintain account security</strong> — keep your login credentials secure and notify us
              immediately if you become aware of any unauthorised use of your account.
            </li>
          </ul>
        </Section>

        <Section title="5. Prohibited content and uses">
          <p>You may not use the Service to:</p>
          <ul>
            <li>Create fake, fraudulent, or misleading biodata profiles.</li>
            <li>Impersonate any person, entity, or organisation.</li>
            <li>Upload obscene, sexually explicit, pornographic, or adult content.</li>
            <li>Upload content that is defamatory, harassing, threatening, or discriminatory.</li>
            <li>Stalk, harass, or harm any individual.</li>
            <li>Scrape, crawl, or programmatically collect data from the Service.</li>
            <li>Attempt to gain unauthorised access to our systems, databases, or another user's profile.</li>
            <li>
              Distribute, republish, or commercially exploit any content from the Service without our prior
              written permission.
            </li>
            <li>
              Use the Service for any purpose that is unlawful under Indian law or applicable international law.
            </li>
          </ul>
          <p>
            We reserve the right to remove profiles, suspend accounts, and terminate access for any violation of
            these rules, without prior notice and without liability.
          </p>
        </Section>

        <Section title="6. Payment terms">
          <p>
            The Service offers a free preview and PDF download. Publishing a profile online (generating a
            shareable public link) requires a one-time payment as described below.
          </p>
          <ul>
            <li>
              <strong>Publication fee</strong> — each published profile link costs{' '}
              <strong>₹20 (twenty Indian Rupees)</strong>. This is a one-time fee per profile link; there are no
              recurring charges or subscriptions.
            </li>
            <li>
              <strong>Payment processor</strong> — all payments are processed by Razorpay Payment Solutions Pvt.
              Ltd. By making a payment, you agree to Razorpay's Terms of Service and Privacy Policy. We do not
              store your payment card or bank account details.
            </li>
            <li>
              <strong>Price changes</strong> — we reserve the right to change the publication fee at any time.
              Price changes will be communicated on the Service before taking effect and will not apply
              retroactively to already-published profiles.
            </li>
            <li>
              <strong>Taxes</strong> — the published price is inclusive of all applicable taxes unless otherwise
              stated. You are responsible for any additional taxes that may apply based on your jurisdiction.
            </li>
          </ul>
          <p>
            For our refund and cancellation policy, please see our{' '}
            <a href="/refund" style={linkStyle}>Refund &amp; Cancellation Policy</a>.
          </p>
        </Section>

        <Section title="7. Intellectual property">
          <p>
            <strong>Your content</strong> — you retain full ownership of all biodata content, photos, and
            information you submit. By submitting a profile, you grant us a limited, non-exclusive,
            royalty-free licence to store, process, and display your content solely for the purpose of
            providing the Service (including showing your biodata at its shareable link). This licence ends
            when you delete your profile.
          </p>
          <p>
            <strong>Our platform</strong> — the platform code, templates, UI design, logo, brand name "wymm",
            and all other intellectual property of the Service belong exclusively to Sahaj Chawla / wymm. You
            may not copy, reproduce, modify, or create derivative works of any part of our platform without
            our prior written consent.
          </p>
        </Section>

        <Section title="8. Profile removal">
          <p>
            We may remove or unpublish a profile at our discretion if it violates these Terms, contains
            unlawful content, or is the subject of a credible complaint from a third party. Where possible,
            we will notify the profile owner before taking action.
          </p>
          <p>
            You may delete your own profile at any time from the{' '}
            <a href="/manage" style={linkStyle}>/manage</a> page. No refund is issued for deleted profiles;
            see our <a href="/refund" style={linkStyle}>Refund Policy</a>.
          </p>
        </Section>

        <Section title="9. Service availability">
          <p>
            We aim to keep wymm available and reliable, but we do not guarantee uninterrupted, error-free, or
            secure access at all times. The Service is provided on an <strong>"as-is"</strong> and{' '}
            <strong>"as-available"</strong> basis. We may update, modify, suspend, or discontinue features at
            any time with or without notice.
          </p>
        </Section>

        <Section title="10. Disclaimer of warranties">
          <p>
            To the fullest extent permitted by applicable law, the Service is provided without any warranty,
            express or implied, including but not limited to warranties of merchantability, fitness for a
            particular purpose, non-infringement, or accuracy of information. We do not warrant that the
            Service will be uninterrupted, timely, secure, or free of errors or viruses.
          </p>
          <p>
            We make no representations regarding matrimonial outcomes, compatibility, or the suitability of
            any profile viewed through the Service.
          </p>
        </Section>

        <Section title="11. Limitation of liability">
          <p>
            To the fullest extent permitted by applicable law, wymm and its proprietor Sahaj Chawla shall not
            be liable for any indirect, incidental, special, consequential, or punitive damages arising out of
            or in connection with your use of the Service. This includes, without limitation, damages for loss
            of data, loss of goodwill, business interruption, or any matrimonial outcome.
          </p>
          <p>
            Our total cumulative liability to you for any claim arising from or related to the Service shall
            not exceed the total amount you paid us in the twelve (12) months preceding the claim — or{' '}
            <strong>₹20</strong> if no payment was made.
          </p>
        </Section>

        <Section title="12. Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless wymm and its proprietor Sahaj Chawla from and
            against any claims, liabilities, damages, losses, costs, and expenses (including reasonable legal
            fees) arising from: (a) your use of the Service; (b) your content; (c) your violation of these
            Terms; or (d) your violation of any rights of a third party.
          </p>
        </Section>

        <Section title="13. Governing law and jurisdiction">
          <p>
            These Terms are governed by and construed in accordance with the laws of India. Any dispute,
            controversy, or claim arising out of or relating to these Terms or the Service shall be subject
            to the exclusive jurisdiction of the courts located in Ayodhya, Uttar Pradesh, India.
          </p>
        </Section>

        <Section title="14. Changes to these terms">
          <p>
            We may update these Terms from time to time. When we do, we will update the effective date at the
            top of this page. If the changes are material, we will make reasonable efforts to notify active
            users. Continued use of the Service after changes are posted means you accept the updated Terms.
          </p>
        </Section>

        <Section title="15. Contact">
          <p>
            Questions about these Terms? Reach us through our{' '}
            <a href="/contact" style={linkStyle}>contact form</a>.
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
