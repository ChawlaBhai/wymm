import re

with open('frontend/src/pages/PreviewPage.tsx', 'r') as f:
    content = f.read()

# Add logic for paywall and Dodo checkout
imports_and_state = """
import { useNavigate, useLocation } from 'react-router-dom'

// Inside PreviewPage
"""

# Let's just use string replacement carefully
content = content.replace("export default function PreviewPage() {", """
export default function PreviewPage() {
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // If returning from payment success
    const params = new URLSearchParams(location.search)
    if (params.get('payment') === 'success') {
       // Ideally we'd poll or wait for webhook to update the DB,
       // but for UI sake, we can show a success toast or reload
       setTimeout(() => window.location.reload(), 2000)
    }
  }, [location.search])

  async function handleCheckout() {
    try {
      setCheckoutLoading(true)
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ biodataId: slug })
      })
      const data = await res.json()
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        alert('Failed to initiate checkout: ' + (data.error || 'Unknown error'))
      }
    } catch (err) {
      alert('Error initiating checkout. Please try again.')
    } finally {
      setCheckoutLoading(false)
    }
  }

  function handleActionCheck(actionCallback: () => void) {
    if (!biodata?.isPaid) {
      setPaywallOpen(true)
      return
    }
    actionCallback()
  }
""")

content = content.replace("onClick={handleShare}", "onClick={() => handleActionCheck(handleShare)}")
content = content.replace("onClick={() => window.open(publishedUrl, '_blank')}", "onClick={() => handleActionCheck(() => window.open(publishedUrl, '_blank'))}")
content = content.replace("onClick={handleDownload}", "onClick={() => handleActionCheck(handleDownload)}")

paywall_modal = """
      {/* Paywall Modal */}
      {paywallOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl relative">
            <button onClick={() => setPaywallOpen(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
              ✕
            </button>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✨</div>
              <h3 style={{ fontFamily: 'Sora, sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 8 }} className="text-gray-900 dark:text-white">Publish your Biodata</h3>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6 }} className="dark:text-gray-400">
                Unlock high-quality PDF downloads and a live shareable link for just <b>₹20</b>.
              </p>
            </div>
            <button 
              onClick={handleCheckout} 
              disabled={checkoutLoading}
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 16 }}
            >
              {checkoutLoading ? 'Loading...' : 'Pay ₹20 to Unlock'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
"""

content = content.replace("</>\n  )\n}", paywall_modal)

with open('frontend/src/pages/PreviewPage.tsx', 'w') as f:
    f.write(content)
