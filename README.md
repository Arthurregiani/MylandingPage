# Arthur José Regiani — Solarized Landing

Experiência pessoal construída em Next.js (App Router) com tema Solarized Dark, animações Framer Motion, smooth scroll com Lenis e backend de contato via Nodemailer. A página foi desenhada para ser facilmente estendida com novos projetos e futuros estudos de arquitetura de soluções.

## Stack & Principais recursos
- **Next.js 16** com App Router e fontes Geist.
- **Tailwind CSS v4** + utilitários customizados para glassmorphism e parallax.
- **Framer Motion** para transições de entrada, modal de projetos e microinterações.
- **Lenis** garantindo scroll suave global.
- **shadcn/ui** (Button, Input, Textarea) adaptados ao tema Solarized.
- **API `/api/contact`** com validação `zod` e envio via `nodemailer`.

## Como rodar localmente
```bash
npm install          # instala dependências
npm run dev          # inicia em http://localhost:3000
npm run lint         # opcional, executa ESLint
npm run build        # gera build otimizada
npm start            # serve a build gerada
```

## Variáveis de ambiente
Copie `.env.example` para `.env.local` e preencha:

```
SMTP_HOST=smtp.seuprovedor.com
SMTP_PORT=465
SMTP_USER=contato@dominio.com
SMTP_PASS=senha-super-secreta
CONTACT_EMAIL_TO=arthurregiani@gmail.com # opcional, usa SMTP_USER por padrão
```

> O endpoint `/api/contact` falhará em produção se qualquer uma das credenciais SMTP estiver ausente.

## Deploy na Vercel
1. Faça login em [vercel.com](https://vercel.com/).
2. Importar o repositório e selecionar o framework **Next.js** (config padrão).
3. Informar as variáveis de ambiente acima em *Project Settings › Environment Variables*.
4. Deploy. A Vercel detecta automaticamente `npm run build` e `npm start`.

## Próximos passos sugeridos
- Adicionar novos cards em `app/components/Projects.tsx` com links reais.
- Criar a rota `/project/coffeehub` usando mesma linguagem visual.
- Conectar serviços de observabilidade (Sentry/Logtail) para monitorar o formulário de contato.
