export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const { biodataId } = req.body
    
    // We are creating a checkout session
    const response = await fetch('https://test.dodopayments.com/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DODO_PAYMENTS_API_KEY}`,
      },
      body: JSON.stringify({
        product_cart: [
          {
            product_id: process.env.DODO_PRODUCT_ID || 'pdt_dummy', 
            quantity: 1
          }
        ],
        // Pass the biodataId in the return url or as metadata to track it
        metadata: {
            biodataId: biodataId
        },
        return_url: `https://wymm.store/preview/${biodataId}?payment=success`,
      }),
    })
    
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Dodo API Error: ${text}`);
    }

    const session = await response.json()
    return res.status(200).json({ checkout_url: session.checkout_url })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}
