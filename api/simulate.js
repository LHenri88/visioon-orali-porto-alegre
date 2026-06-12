const PROCEDURE_PROMPTS = {
  "implante-dentario": "Realistic dental implant simulation. Fill missing teeth gaps with anatomically correct prosthetic crowns matching the surrounding teeth in shade, shape and alignment. Respect natural occlusion and arch curve. PRESERVE: gum tissue, lip support, smile line, all facial features. Photorealistic output.",
  "facetas-porcelana": "Realistic dental aesthetic preview. Render natural-looking porcelain veneers on the front upper teeth (canine to canine). Maintain perfect tooth proportions (golden ratio, central incisor slightly dominant), translucent enamel edges, subtle texture, natural gum line. PRESERVE: lip shape, skin tone, facial features, lighting. DO NOT whiten artificially — target a natural BL2-BL3 shade. Output as a photorealistic before/after of the SAME person.",
  "clareamento": "Professional teeth whitening simulation. Move teeth shade up by 3-4 tabs on the Vita scale to a natural BL2 tone, preserving micro-texture and translucency. PRESERVE: gums, lips, skin, lighting. Avoid bleached/painted look."
};
const CLINIC = { slug: 'orali-porto-alegre', name: "Orali Clínica Odontológica", tone: "Acolhedor-experiente, gaúcho discreto. Mistura tradição (30+ anos) com modernidade." };

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { userB64, userMime, procedure } = req.body || {};
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY_MISSING' });
  const basePrompt = PROCEDURE_PROMPTS[procedure];
  if (!basePrompt) return res.status(400).json({ error: 'Procedure not supported' });
  const fullPrompt = [basePrompt, `Preview for ${CLINIC.name}.`, 'CRITICAL: photorealistic clinical preview, preserve patient identity perfectly.'].join('\n');
  try {
    const form = new FormData();
    form.append('model', 'gpt-image-2');
    form.append('prompt', fullPrompt);
    form.append('quality', 'medium');
    // retrato 1024x1536 — classe Full HD (~1.6MP), formato adequado a fotos frontais
    form.append('size', '1024x1536');
    form.append('image', new Blob([Buffer.from(userB64, 'base64')], { type: userMime || 'image/png' }), 'photo.png');
    const r = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
    const j = await r.json();
    if (!r.ok) {
      const code = j?.error?.code || '';
      if (r.status === 429 || code === 'insufficient_quota' || code === 'rate_limit_exceeded') {
        return res.status(503).json({ error: 'QUOTA_EXCEEDED', userMessage: 'O simulador está temporariamente indisponível por limite de uso. Agende uma consulta para ver o resultado ao vivo com nossa equipe!' });
      }
      return res.status(500).json({ error: j?.error?.message || 'OpenAI error' });
    }
    const b64 = j?.data?.[0]?.b64_json;
    if (!b64) return res.status(500).json({ error: 'No image in response' });
    return res.status(200).json({ ok: true, clinic: CLINIC.name, procedure, image: { mimeType: 'image/png', data: b64 } });
  } catch (err) { return res.status(500).json({ error: err.message }); }
}
