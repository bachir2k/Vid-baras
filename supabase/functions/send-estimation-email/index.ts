import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not set')
    }

    const { email, name, service_type, estimated_price } = await req.json()

    // Envoi de l'email au client
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Vidébarras <Contact@vidédarras.fr>', // TODO: Assurez-vous que ce domaine est vérifié sur Resend
        to: [email],
        reply_to: 'contact@vidédarras.fr',
        subject: `Récapitulatif de votre estimation pour un débarras (${service_type})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #2563eb;">Bonjour ${name},</h1>
            <p>Merci d'avoir utilisé notre simulateur d'estimation sur <strong>Vidébarras</strong>.</p>
            <p>Vous avez demandé une estimation pour un débarras de type : <strong>${service_type}</strong>.</p>
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">Estimation indicative</p>
              <p style="margin: 10px 0 0 0; color: #2563eb; font-size: 32px; font-weight: bold;">${estimated_price}</p>
            </div>
            <p><em>Cette estimation est donnée à titre indicatif et pourra être ajustée après visite technique gratuite.</em></p>
            <p>Un membre de notre équipe vous contactera sous 24h ouvrées pour confirmer cette estimation et planifier une intervention.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 12px; color: #666;">
              Cordialement,<br/>
              L'unité Vidébarras<br/>
              <a href="https://vidédarras.fr" style="color: #2563eb; text-decoration: none;">www.vidédarras.fr</a>
            </p>
          </div>
        `,
      }),
    })

    const data = await res.json()
    console.log('Réponse de Resend:', JSON.stringify(data))

    if (!res.ok) {
      throw new Error(`Erreur Resend: ${JSON.stringify(data)}`)
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
