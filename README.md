# Arthur José Regiani — Solarized Landing

Experiência pessoal construída em Next.js (App Router) com tema Solarized Dark, animações Framer Motion, smooth scroll com Lenis e backend de contato via Nodemailer. A página foi desenhada para ser facilmente estendida com novos projetos e futuros estudos de arquitetura de soluções.

## Stack & Principais recursos
- **Next.js 16** com App Router e fontes Geist.
- **Tailwind CSS v4** + utilitários customizados para glassmorphism e parallax.
- **Framer Motion** para transições de entrada, modal de projetos e microinterações.
- **Lenis** garantindo scroll suave global.
- **shadcn/ui** (Button, Input, Textarea) adaptados ao tema Solarized.
- **API `/api/contact`** com validação `zod` e envio via `nodemailer`.
- **Toggle Solarized** com troca em tempo real entre Dark e Light diretamente no layout.

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
CONTACT_EMAIL_TO= # opcional, usa SMTP_USER por padrão
```

> O endpoint `/api/contact` falhará em produção se qualquer uma das credenciais SMTP estiver ausente.

## Deploy via Docker
1. Gere um arquivo de variáveis para produção (`cp .env.example .env.production`) e ajuste os valores SMTP.
2. Monte a imagem: `docker build -t my-landing-page .`
3. Suba o container expondo a porta 3000 (ajuste conforme necessário):
   ```bash
   docker run -d --name landing-page -p 3000:3000 --env-file .env.production my-landing-page
   ```
4. Atualizações: `docker stop landing-page && docker rm landing-page && docker build ...` antes de rodar novamente.
5. Para logs em produção: `docker logs -f landing-page`.

Para acessar minha landingpage: https://me.tutsdev.com.br

## Favicons

O projeto fornece um SVG (`public/favicon.svg`) como fonte da marca. Para garantir compatibilidade entre navegadores (Chrome, Firefox, Safari, Edge e iOS) geramos também PNGs e um `favicon.ico` multi-res.

Como regenerar os ícones a partir do SVG:

1. Instale dependências dev (caso ainda não tenha):

```bash
npm install --save-dev sharp to-ico
```

2. Rode o script de geração (já adicionado ao `package.json`):

```bash
npm run generate-favicons
```

Isso cria em `public/`:
- `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `favicon-180.png`
- `apple-touch-icon.png`
- `favicon.ico`

Notas:
- Limpe o cache do navegador ou use uma aba anônima para ver alterações imediatamente.
- O `favicon.svg` é mantido como `mask-icon` no layout para navegadores que suportam SVGs vetoriais.
- Se for usar em CI/CD (ex.: Docker), instale as dependências nativas necessárias para `sharp` no ambiente de build.
