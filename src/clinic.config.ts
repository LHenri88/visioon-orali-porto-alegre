export const CLINIC = {
  "slug": "orali-porto-alegre",
  "name": "Orali Clínica Odontológica",
  "tagline": "30+ anos cuidando do sorriso gaúcho",
  "slogan": "Um sorriso saudável começa aqui!",
  "hero_headline_real": "Implante Dentário, Clareamento Dental, Ortodontia",
  "domain": "orali.com.br",
  "email": "atendimento@orali.com.br",
  "city": "Porto Alegre · RS",
  "category": "Odontologia Multidisciplinar",
  "primary_procedure": "implante-dentario",
  "brand": {
    "primary": "#1F3A5F",
    "secondary": "#7FB3D5",
    "accent": "#F2B33D",
    "ink": "#101A2A",
    "paper": "#FFFFFF",
    "font_display": "'Playfair Display', serif",
    "font_body": "'DM Sans', sans-serif",
    "logo_glyph": "O"
  },
  "tone_of_voice": "Acolhedor-experiente, gaúcho discreto. Mistura tradição (30+ anos) com modernidade.",
  "icp": "40-65 anos, decisores reabilitadores, valorizam tradição e segurança.",
  "sections": [
    "Hero",
    "History",
    "Procedures",
    "Doctor",
    "Gallery",
    "Simulator",
    "Testimonials",
    "Schedule",
    "Footer",
    "ChatWidget"
  ],
  "hero": {
    "kicker": "Há mais de 30 anos em Porto Alegre",
    "headline": "Seu sorriso saudável começa aqui. Visualizado antes da consulta.",
    "sub": "Equipe multidisciplinar, ambiente acolhedor e tecnologia de ponta — agora com pré-visualização clínica do seu sorriso final."
  },
  "cta_primary": "Quero ver meu resultado",
  "chat_persona": "Sou o Theo, da Orali. Posso simular implantes unitários, próteses totais e clarear suas dúvidas — sem pressa.",
  "procedures": [
    "implante-dentario",
    "facetas-porcelana",
    "clareamento"
  ],
  "procedure_details": [
    {
      "id": "implante-dentario",
      "name": "Implante Dentário",
      "desc": "Solução completa para reabilitação oral.",
      "img": "/img/implante-dentario-f3ee19.jpg"
    },
    {
      "id": "facetas-porcelana",
      "name": "Facetas & All-on-Four",
      "desc": "Estética dental e reabilitação completa em arco.",
      "img": "/img/All-on-Four-f92f6d.jpg"
    },
    {
      "id": "clareamento",
      "name": "Clareamento Dental",
      "desc": "Sorriso mais branco e brilhante em protocolo clínico.",
      "img": "/img/Clareamento-Dental-103ef4.jpg"
    }
  ],
  "history": {
    "title": "30+ anos de história em Porto Alegre",
    "milestones": [
      {
        "year": "1994",
        "text": "Fundação da Orali pela Dra. Adriana B. Martins (CRO-RS 10092)."
      },
      {
        "year": "2005",
        "text": "Pioneira em implantes na região, com tecnologia importada."
      },
      {
        "year": "2018",
        "text": "Adoção de scanner intraoral e planejamento digital."
      },
      {
        "year": "2026",
        "text": "Pré-visualização clínica com IA, em parceria com a VISIOON."
      }
    ]
  },
  "doctor": {
    "name": "Dra. Adriana B. Martins",
    "title": "CRO-RS 10092 · Fundadora da Orali",
    "bio": "Há mais de 30 anos referência em odontologia em Porto Alegre. Especialista em reabilitação oral e implantodontia.",
    "avatar": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400"
  },
  "testimonials_real": [
    {
      "text": "Fui muito bem atendido, muito profissionalismo.",
      "author": "Andre Lumertz"
    },
    {
      "text": "Aparelho anti-ronco que mudou a qualidade do meu sono.",
      "author": "Carla Fabbrin"
    },
    {
      "text": "Adriana, na minha opinião, é imbatível como dentista!",
      "author": "Ricardo Moreira"
    }
  ],
  "images": {
    "hero": "/img/2-google-GMN-1200x1200-ee4478.jpg",
    "procedures": {
      "implante-dentario": "/img/implante-dentario-f3ee19.jpg",
      "facetas-porcelana": "/img/All-on-Four-f92f6d.jpg",
      "clareamento": "/img/Clareamento-Dental-103ef4.jpg"
    },
    "testimonials": {
      "Andre Lumertz": "/img/Andre-Lumertz-cbbd5f.jpg",
      "Carla Fabbrin": "/img/Carla-Fabbrin-380b06.jpg",
      "Ricardo Moreira": "/img/Ricardo-Moreira-3f7a5b.jpg"
    },
    "insta_feed": [
      "/img/INSTA-011-459f6a.jpg",
      "/img/INSTA-021-1df7e9.jpg",
      "/img/INSTA-031-76305e.jpg",
      "/img/INSTA-041-eaa415.jpg",
      "/img/INSTA-05-27007d.jpg",
      "/img/INSTA-06-b0cc24.jpg"
    ]
  }
} as const;
export type ClinicConfig = typeof CLINIC;
