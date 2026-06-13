const PROCEDURE_PROMPTS = {
  "implante-dentario": "BEFORE→AFTER clinical simulation. The input photo is the BEFORE state showing missing teeth. Render the AFTER state of the SAME person with dental implant crowns in place. VISIBLE CHANGES: missing tooth gaps are filled with natural-looking porcelain crowns matching the shade, size and shape of surrounding teeth; the smile looks complete and healthy. PRESERVE EXACTLY: same face, skin tone, gum color, lip shape, eye color, hair, expression, background. Only the missing teeth are now present. Ultra-photorealistic portrait showing a natural smile.",
  "facetas-porcelana": "BEFORE→AFTER clinical simulation. The input photo is the BEFORE state. Render the AFTER state of the SAME person with professional porcelain veneers. VISIBLE CHANGES: all 8 upper front teeth are visibly transformed — bright white (shade A1/BL1), perfectly shaped with natural translucency at the edges; the smile is dramatically improved and beautiful. PRESERVE EXACTLY: same face, gum line, lip position and shape, skin tone, eyes, hair, expression, background. Only tooth color and shape changed. Ultra-photorealistic portrait clearly showing the smile.",
  "clareamento": "BEFORE→AFTER clinical simulation. The input photo is the BEFORE state. Render the AFTER state of the SAME person after professional in-office teeth whitening. VISIBLE CHANGES: teeth are noticeably whiter (3-4 shades brighter, uniform), healthy shine, radiant smile — natural-looking white, not artificial. PRESERVE EXACTLY: same tooth shape, alignment, gum line, lips, face, skin tone, eyes, hair, expression, background. Only tooth color changed. Ultra-photorealistic portrait clearly showing the brighter smile."
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
    form.append('quality', 'high');
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
