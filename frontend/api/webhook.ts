import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  
  try {
    const payload = req.body
    
    // In a real production app, verify Dodo Payments webhook signature here using process.env.DODO_WEBHOOK_SECRET
    
    // Check if payment was successful
    // Assuming Dodo sends status: 'succeeded' or similar, and metadata contains our biodataId
    if (payload.status === 'succeeded' || payload.type === 'payment.succeeded') {
        const biodataId = payload.metadata?.biodataId || payload.data?.metadata?.biodataId
        
        if (biodataId) {
            // Update Supabase
            const supabase = createClient(
                process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL,
                process.env.SUPABASE_SERVICE_ROLE_KEY
            )
            
            await supabase
                .from('biodatas')
                .update({ is_paid: true })
                .eq('id', biodataId)
        }
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error.message })
  }
}
