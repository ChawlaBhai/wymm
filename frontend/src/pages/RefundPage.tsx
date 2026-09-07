export default function RefundPage() {
  return (
    <div style={{ background: '#fff', minHeight: '100vh', padding: '60px 24px 80px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontSize: 13, color: '#AAA', marginBottom: 8 }}>Effective date: 1 June 2025</p>
        <h1 style={{ fontFamily: 'Sora, sans-serif', fontSize: 34, fontWeight: 800,  letterSpacing: '-0.03em', marginBottom: 12 }}>
          Refund &amp; Cancellation Policy
        </h1>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 40 }}>
          This Refund &amp; Cancellation Policy applies to all purchases made on wymm (wymm.store), operated
          by Sahaj Chawla, a Sole Proprietorship based in Ram Nagar Colony, Ayodhya, Uttar Pradesh, India.
          Please read this policy carefully before making a payment.
        </p>

        <Section title="1. Nature of the service">
          <p>
            wymm provides a digital service: upon payment, we generate and publish a permanent shareable link
            for your marriage biodata profile. Because the service is delivered digitally and instantly upon
            successful payment, special conditions apply to refunds as described below.
          </p>
        </Section>

        <Section title="2. Publication fee — non-refundable">
          <p>
            The one-time publication fee of <strong>₹20 (twenty Indian Rupees)</strong> per profile link is
            generally <strong>non-refundable</strong> once the profile has been successfully published and the
            shareable link has been generated.
          </p>
          <p>
            This policy exists because the digital service is fulfilled immediately upon payment — the
            shareable link, QR code, and live profile page are all made available to you at the moment of
            successful payment. There is no physical good to return.
          </p>
        </Section>

        <Section title="3. Circumstances in which a refund may be considered">
          <p>
            Notwithstanding the above, we will consider a refund request in the following limited circumstances:
          </p>
          <ul>
            <li>
              <strong>Technical failure</strong> — a technical error on our end prevented your profile from
              being published after payment was successfully deducted. (Note: if payment failed at the gateway
              level, no charge was made and no refund is needed.)
            </li>
            <li>
              <strong>Duplicate payment</strong> — you were charged more than once for the same profile due to
              a payment processing error.
            </li>
          </ul>
          <p>
            Refund requests based on a change of mind, dissatisfaction with the template, or after the profile
            has been actively used (shared, viewed, or downloaded) will not be entertained.
          </p>
        </Section>

        <Section title="4. How to request a refund">
          <p>If you believe you qualify for a refund under the circumstances above, please follow these steps:</p>
          <ol>
            <li>
              Visit our <a href="/contact" style={linkStyle}>contact form</a> at wymm.store/contact.
            </li>
            <li>
              Include your <strong>Razorpay Payment ID</strong> (provided in the payment confirmation screen
              or your email receipt), your <strong>registered email address</strong>, and a brief
              <strong> description of the issue</strong>.
            </li>
            <li>
              Submit the form. We will acknowledge your request within 2 business days.
            </li>
          </ol>
          <p>
            Refund requests must be submitted within <strong>7 days</strong> of the original payment date.
            Requests submitted after this window may not be considered.
          </p>
        </Section>

        <Section title="5. Refund processing">
          <p>
            If your refund request is approved after our review:
          </p>
          <ul>
            <li>
              The refund will be processed within <strong>5–7 business days</strong> of approval.
            </li>
            <li>
              The refund will be credited to the <strong>original payment method</strong> used at the time of
              purchase (credit/debit card, UPI, net banking, or wallet as applicable).
            </li>
            <li>
              Depending on your bank or payment provider, the credited amount may take an additional 3–5
              business days to appear in your account after we initiate the refund via Razorpay.
            </li>
          </ul>
          <p>
            Refunds are processed through Razorpay Payment Solutions Pvt. Ltd. We are not responsible for
            delays caused by your bank or payment provider after we initiate the refund.
          </p>
        </Section>

        <Section title="6. Cancellation of published profiles">
          <p>
            You may delete your published profile at any time by visiting the{' '}
            <a href="/manage" style={linkStyle}>/manage</a> page and selecting "Delete Profile". Deleting a
            profile will:
          </p>
          <ul>
            <li>Immediately unpublish the profile link (it will no longer be accessible to anyone).</li>
            <li>Permanently remove all associated data from our servers.</li>
          </ul>
          <p>
            Deleting a profile does not entitle you to a refund of the publication fee unless the deletion
            is due to a qualifying technical error as described in Section 3.
          </p>
        </Section>

        <Section title="7. Payments not captured by us">
          <p>
            If your payment was declined, failed, or abandoned before completion, no amount is charged to
            your account. In such cases, no refund is applicable. If you see a pending charge that was not
            completed, it will typically be released by your bank within 5–7 business days.
          </p>
        </Section>

        <Section title="8. Contact us">
          <p>
            For any questions about this policy or to submit a refund request, please contact us through our{' '}
            <a href="/contact" style={linkStyle}>contact form</a>.
          </p>
          <p style={{ marginTop: 12,  fontSize: 14 }}>
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
  fontWeight: 500}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: 'Sora, sans-serif', fontSize: 20, fontWeight: 700,  marginBottom: 12, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      <div style={{ fontSize: 15,  lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}
