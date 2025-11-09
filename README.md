# Profile LandingPage — Next.js + Docker + Cloudflare Tunnel

Landing page pessoal construída em Next.js (App Router) com tema Solarized Dark/Light, animações com Framer Motion, smooth scroll (Lenis) e backend de contato via Nodemailer. O projeto foi desenhado para rodar localmente e em produção com Docker e Cloudflare Tunnel — sem expor portas públicas.

Demo de produção: https://me.tutsdev.com.br

## Stack & Recursos
- Next.js 16 (App Router, output standalone)
- Tailwind CSS v4
- Framer Motion
- Lenis (scroll suave)
- shadcn/ui (inputs básicos)
- API `/api/contact` com validação zod e envio via nodemailer

## Requisitos
- Node.js 20+ (para desenvolvimento)
- Docker + Docker Compose (para produção)

## Como rodar localmente
```bash
npm install           # instala dependências
npm run dev           # http://localhost:3000
# opcional
npm run lint          # ESLint
npm run build && npm start
```

Opcionalmente crie `.env.local` para testar o envio de e‑mail localmente (use um SMTP de teste como Mailtrap para evitar bloqueios):
```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=seu_email@gmail.com
SMTP_PASS=senha_app_ou_de_teste
CONTACT_EMAIL_TO=seu_email@gmail.com
```

> Em produção, use um App Password do Gmail (conta com 2FA habilitada). Ver seção "Produção".

## API de Contato
- Endpoint: `POST /api/contact`
- Body (JSON):
  ```json
  { "name": "Seu Nome", "email": "voce@exemplo.com", "message": "Olá!" }
  ```
- Respostas:
  - 200 `{ success: true, message: "Mensagem enviada." }`
  - 400 `{ success: false, message: "Dados inválidos." }`
  - 500 `{ success: false, message: "Configuração de email ausente." | "Erro interno ao enviar sua mensagem." }`
- Variáveis usadas pelo servidor: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL_TO`

## Produção — Arquitetura
- Domínio gerenciado no Cloudflare.
- Subdomínio público: `me.tutsdev.com.br`.
- Cloudflare Tunnel (Zero Trust) encaminhando `me.tutsdev.com.br` → `http://landing:3000` (service dentro da rede Docker).
- App Next.js empacotada via Docker (imagem standalone) e orquestrada por Docker Compose.
- Nenhuma porta HTTP/HTTPS exposta no host — somente conexões de saída do `cloudflared`.

Diagrama (simplificado):
```
Navegador ⇄ Cloudflare Edge ⇄ Cloudflare Tunnel ⇄ (rede Docker) ⇄ landing:3000 (Next.js)
```

## Produção — Passo a passo
1) Cloudflare (zona do domínio)
- Adicione o domínio ao Cloudflare e troque os nameservers no Registro.br.
- Em SSL/TLS: Encryption mode = Full; Ative Always Use HTTPS e TLS 1.3.

2) Cloudflare Tunnel
- Zero Trust → Networks → Tunnels → Create a tunnel (Cloudflared). Copie o token (TUNNEL_TOKEN).
- No túnel, em Public Hostnames: crie `me.tutsdev.com.br` com Service `HTTP` e URL de origem `http://landing:3000`.

3) Servidor Ubuntu (exemplo de estrutura)
```bash
sudo mkdir -p /opt/projectLanding/MylandingPage
sudo chown -R $USER:$USER /opt/projectLanding
cd /opt/projectLanding/MylandingPage
# clone do repositório aqui
```

4) Arquivos de configuração
- `docker-compose.yml` (exemplo):
```yaml
services:
  landing:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: landing
    restart: unless-stopped
    env_file:
      - .env.production
    environment:
      - NODE_ENV=production
      - PORT=3000
    expose:
      - "3000"
    networks:
      - web

  tunnel:
    image: cloudflare/cloudflared:latest
    container_name: tunnel
    restart: unless-stopped
    env_file:
      - .env
    command: tunnel --no-autoupdate run --token ${CLOUDFLARE_TUNNEL_TOKEN}
    networks:
      - web
    depends_on:
      - landing

networks:
  web:
    driver: bridge
```
- `.env` (não versionar):
```dotenv
CLOUDFLARE_TUNNEL_TOKEN=cole_o_token_do_tunel_aqui
```
- `.env.production` (não versionar):
```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=seu_email@gmail.com
SMTP_PASS=senha_app_16_caracteres
CONTACT_EMAIL_TO=seu_email@gmail.com
```
> Com `SMTP_PORT=465`, o servidor usa conexão segura (SSL) automaticamente.

5) Build e deploy
```bash
# no diretório do projeto
docker compose build
docker compose up -d

# status e logs
docker compose ps
docker compose logs -f landing
docker compose logs -f tunnel
```
- O túnel deve aparecer como "Connected" no painel Zero Trust.
- Acesse `https://me.tutsdev.com.br`.

## Operação
- Atualizar código e publicar:
```bash
git pull
docker compose up -d --build
```
- Reiniciar apenas a app (após mudar `.env.production`):
```bash
docker compose restart landing
```
- Logs:
```bash
docker compose logs -f landing
```

## Segurança e Boas práticas
- Não versione `.env` e `.env.production`.
- Use Gmail App Password (conta com 2FA) — não use a senha da conta.
- Não é necessário abrir portas públicas; todo acesso é via Tunnel.

## Troubleshooting
- 535 Invalid login (Gmail):
  - Gere e use uma App Password (16 caracteres). Reinicie a app: `docker compose restart landing`.
- Túnel "Inactive":
  - Verifique `CLOUDFLARE_TUNNEL_TOKEN` e os logs do serviço `tunnel`.
- 502/404 no domínio:
  - Confirme o Public Hostname `me.tutsdev.com.br` → `http://landing:3000`.
- Porta 3000 ocupada no host:
  - Não afeta o deploy — a app expõe 3000 apenas na rede do Docker (sem bind no host).

---

Este projeto usa Next.js com `output: "standalone"` (ver `next.config.ts`) e Dockerfile multi-stage para imagem leve em produção.
