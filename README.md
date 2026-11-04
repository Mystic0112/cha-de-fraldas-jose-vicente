# Chá de Fraldas do José Vicente · Pequeno Marinheiro

Site oficial para os convidados escolherem presentes do chá de fraldas do José Vicente. Cada presente escolhido é reservado no nome do convidado e sai da lista para os demais em tempo real.

- **Tema**: Pequeno Marinheiro (Cores náuticas, timão, âncora, farol, fonte MedievalSharp).
- **Página pública** (`/#/`): lista náutica de presentes agrupada por categoria, com banner e modal de presentes via PIX.
- **Painel do organizador** (`/#/admin`): login para o organizador Felipe, resumo, reservas (com exportação CSV e cancelamento) e gerenciador de presentes.

Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + Supabase (Postgres, RLS, Auth e Realtime). Hospedagem automática no GitHub Pages.

---

## 1. Configuração do Banco de Dados no Supabase

1. No painel do seu projeto no Supabase, abra o menu **SQL Editor** > **New query**.
2. Copie e cole o conteúdo de [`supabase/schema.sql`](supabase/schema.sql) e clique em **Run** (caso seja a primeira vez).
3. Para inserir a lista oficial do José Vicente, copie e execute o arquivo [`supabase/seed.sql`](supabase/seed.sql) ou [`supabase/update_to_jose_vicente.sql`](supabase/update_to_jose_vicente.sql).

## 2. Configuração do PIX

As credenciais do PIX podem ser configuradas no arquivo `src/config/pix.ts` ou via variáveis de ambiente no arquivo `.env`:

```env
VITE_SUPABASE_URL=sua-url-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anon
VITE_PIX_KEY=sua-chave-pix-aqui
VITE_PIX_KEY_TYPE=E-mail # ou CPF, Celular, Aleatória
VITE_PIX_RECEIVER=Felipe
VITE_PIX_CITY=SAO PAULO
```

Ao confirmar um mimo em PIX, os dados do convidado (nome, telefone opcional e recado carinhoso) são gravados no Supabase e a tela exibe o QR Code dinâmico do Banco Central, a chave PIX e os botões de copiar chave e código Pix Copia e Cola.

## 3. Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço informado no terminal (ex.: `http://localhost:5173`).

Para testar o build de produção:

```bash
npm run build
```

## 4. Deploy no GitHub Pages

O projeto conta com GitHub Actions em `.github/workflows/deploy.yml`. Ao fazer push na branch `main`, a compilação e publicação acontecem automaticamente.
