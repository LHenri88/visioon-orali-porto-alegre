import { GoogleGenAI } from '@google/genai';
const CLINIC = {
  "slug": "orali-porto-alegre",
  "name": "Orali Clínica Odontológica",
  "tagline": "30+ anos cuidando do sorriso gaúcho",
  "chat_persona": "Sou o Theo, da Orali. Posso simular implantes unitários, próteses totais e clarear suas dúvidas — sem pressa.",
  "tone_of_voice": "Acolhedor-experiente, gaúcho discreto. Mistura tradição (30+ anos) com modernidade.",
  "icp": "40-65 anos, decisores reabilitadores, valorizam tradição e segurança.",
  "procedures": [
    "implante-dentario",
    "facetas-porcelana",
    "clareamento"
  ]
};
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY_MISSING' });
  const systemPrompt = `Você é ${CLINIC.chat_persona}
Clínica: ${CLINIC.name} — ${CLINIC.tagline}
Tom: ${CLINIC.tone_of_voice}
ICP: ${CLINIC.icp}
Procedimentos: ${CLINIC.procedures.join(', ')}
Regras: PT-BR, máx 3 parágrafos curtos, nunca prometer resultado, sugerir agendamento no #schedule.`.trim();
  try {
    const ai = new GoogleGenAI({ apiKey });
    const history = (messages||[]).map(m => `${m.role==='user'?'Paciente':'Você'}: ${m.content}`).join('\n');
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: { parts: [{ text: `${systemPrompt}\n\nConversa:\n${history}\n\nVocê:` }] },
    });
    const text = response?.candidates?.[0]?.content?.parts?.find?.(p=>p.text)?.text || response?.text || 'Desculpe, tive um problema.';
    return res.status(200).json({ ok: true, text });
  } catch (err) { return res.status(500).json({ error: err.message }); }
}
