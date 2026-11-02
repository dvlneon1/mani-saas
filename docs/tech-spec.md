# Tech Spec — Projeto Mani (SaaS para Nail Designers)

**Versão:** 1.0 (FASE 1.4)
**Projeto:** Mani — SaaS de agendamento e gestão para manicures/estúdios de unhas
**Stack:** Expo SDK 58 (mobile), Next.js 16.4 (admin web), Supabase, NativeWind v4, TypeScript strict, Turborepo
**Idioma:** Português do Brasil (pt-BR)
**Moeda:** BRL

---

## 1. Visão Geral

SaaS multi-tenant onde cada profissional (nail designer / estúdio) é um tenant isolado. Funcionalidades: agendamentos, anamnese, galeria de fotos (antes/depois), feed de inspiração, financeiro, notificações e pagamentos via PIX/cartão/boleto (Asaas) com WhatsApp (Evolution).

Fluxo de estados do agendamento:
`AGENDADO → CONFIRMADO → EM_ATENDIMENTO → FINALIZADO` (com `CANCELLED` e `NO_SHOW` como terminais).

---

## 2. Arquitetura Monorepo (Turborepo)

Monorepo Turborepo com 5 pacotes sob `apps/` e `packages/`:

| Pacote | Local | Responsabilidade | Stack |
|--------|-------|------------------|-------|
| **mobile** | `apps/mobile` | App cliente do profissional (agenda, clientes, anamnese, galeria, financeiro, perfil) | Expo SDK 58, React Native 0.88, expo-router, NativeWind v4, Zustand, TanStack Query, MMKV |
| **admin-web** | `apps/admin-web` | Painel administrativo web (mesmo escopo do mobile em tela grande) | Next.js 16.4 (App Router), React 19, Tailwind CSS v4, TanStack Query, Zustand |
| **design-system** | `packages/design-system` | Tokens, tema, componentes base compartilhados (mobile + web) | NativeWind v4, Tailwind CSS, class-variance-authority, clsx, tailwind-merge |
| **shared** | `packages/shared` | Tipos TypeScript, schemas Zod, constantes, utilitários puros compartilhados | TypeScript, Zod |
| **supabase-schema** | `packages/supabase-schema` | Migrações SQL, seeds, políticas RLS, tipos gerados do banco | PostgreSQL 16 (Supabase), PL/pgSQL |

Graph de dependências de build (turbo.json): `build` de cada pacote depende de `^build` (dependências de pacote primeiro).

---

## 3. Stack por Pacote

### mobile (Expo SDK 58)
- Expo 58, React Native 0.88.0, React 19.3.0
- expo-router ~5.0 (navegação baseada em arquivos, stack + tabs)
- NativeWind v4.1 (Tailwind para React Native)
- @tanstack/react-query ^5.62 (estado de servidor)
- zustand ^5.0 (estado local)
- react-hook-form + zod (formulários/validação)
- react-native-mmkv (offline queue, storage síncrono rápido)
- expo-camera / expo-image-picker (fotos antes/depois, assinatura)
- Supabase JS client (@supabase/supabase-js)

### admin-web (Next.js 16.4)
- Next.js 16.4.3 (App Router, Turbopack)
- React 19.3.0, React DOM 19.3.0
- Tailwind CSS v4 (@tailwindcss/turbopack)
- @tanstack/react-query, zustand, react-hook-form, zod
- Supabase JS client (browser)

### design-system
- Tokens em `tokens.json` (cores, tipografia, spacing, radius, sombras)
- NativeWind v4 tailwind.config.ts
- CVA + clsx + tailwind-merge para variantes de componente

### shared
- Tipos TS (`src/types/index.ts`), schemas Zod (`src/schemas/index.ts`), constantes (`src/constants/index.ts`), utilitários (`src/utils/index.ts`)
- Exportado como `@mani/shared` (ESM)

### supabase-schema
- Migração `001_initial_schema.sql` (12 tabelas, 6 enums, índices, triggers `updated_at`, RLS)
- Seeds `seed_initial_data.sql` (pastas de feed + template de anamnese por default)
- Tipos gerados `src/types/database.types.ts`

---

## 4. Banco de Dados

**Provedor:** Supabase (PostgreSQL 16)
**Local:** `packages/supabase-schema/migrations/001_initial_schema.sql`

### 4.1 Enums (6)

| Enum | Valores |
|------|---------|
| `appointment_status` | scheduled, confirmed, in_progress, completed, cancelled, no_show |
| `payment_status` | pending, partial, paid, refunded |
| `location_type` | studio, home_visit, online |
| `feed_source` | instagram, pinterest, manual |
| `member_role` | owner, manager, professional |
| `plan_type` | free, starter, pro, enterprise |

### 4.2 Tabelas (12)

| Tabela | Descrição | Chave tenant |
|--------|-----------|--------------|
| `professionals` | Tenant (nail designer / estúdio) | `id` |
| `members` | Equipe do estúdio (multi-usuário) | `professional_id` |
| `clients` | Clientes finais | `professional_id` |
| `services` | Catálogo de serviços | `professional_id` |
| `appointments` | Agendamentos (core) | `professional_id` |
| `appointment_photos` | Fotos antes/depois | via `appointments` |
| `supplies` | Estoque de produtos | `professional_id` |
| `transactions` | Lançamentos financeiros | `professional_id` |
| `feed_folders` | Pastas de inspiração | `professional_id` |
| `feed_posts` | Posts salvos (IG/Pinterest) | `professional_id` |
| `anamnese_templates` | Templates de anamnese | `professional_id` |
| `notifications` | Notificações do app | `professional_id` |

### 4.3 Índices

Índices em todas as colunas `professional_id`, `appointments(scheduled_start, status, client_id)`, `transactions(transaction_date)`, `feed_posts(folder_id)`, `appointment_photos(appointment_id)`, `members(email)`.

### 4.4 Triggers

- `update_updated_at_column()` — trigger `BEFORE UPDATE` em todas as tabelas com `updated_at`.
- `create_default_feed_folders()` — `AFTER INSERT` on `professionals` (4 pastas default).
- `create_default_anamnese_template()` — `AFTER INSERT` on `professionals` (template padrão com 8 campos).

### 4.5 RLS (Row Level Security)

Todas as 12 tabelas têm RLS habilitado. Função helper `auth.professional_id()` extrai `professional_id` dos claims do JWT (`request.jwt.claims`). Policies nomeadas por tabela (`*_select`, `*_insert`, `*_update`, `*_delete`). `appointment_photos` isola via relacionamento com `appointments`. `notifications` sem policy de INSERT (criado por triggers/sistema). `transactions` sem UPDATE (imutabilidade para auditoria). Service role bypassa RLS (backend/webhooks apenas, chave nunca exposta ao cliente).

### 4.6 Seeds

Execução após criação de professional: 4 pastas de feed (`Para fazer`, `Cores favoritas`, `Técnicas para aprender`, `Inspiração geral`) + template `Anamnese Padrão` (8 campos: condições de saúde, alergias, medicamentos, condição das unhas, tratamentos anteriores, estilo desejado, frequência de manutenção, observações).

---

## 5. Auth

**Provedor:** Supabase Auth (email + senha, magic link opcional).

### 5.1 Modelo
- `auth.users` gerido pelo Supabase.
- Tabela `professionals` espelha o usuário autenticado (`id` = `auth.users.id`, email único).
- JWT inclui claim customizado `professional_id` (configurado no Supabase Dashboard / Auth Hooks).

### 5.2 Tokens
- Access token (JWT) usado em requisições do cliente e para resolver RLS.
- Refresh token rotacionado automaticamente pelo supabase-js.
- Sessão persistida: AsyncStorage (mobile) / localStorage (web).

### 5.3 Fluxo
1. Cadastro/login via Supabase Auth.
2. Após confirmar email, criar registro em `professionals` (trigger cria pastas de feed + anamnese).
3. JWT claim `professional_id` injetado via Auth Hook / Edge Function no signup.
4. Logout encerra sessão e limpa storage local + MMKV queue pendente (sincroniza primeiro se houver conexão).

---

## 6. Storage

**Provedor:** Supabase Storage.

| Bucket | Uso | Visibilidade |
|--------|-----|--------------|
| `gallery` | Fotos antes/depois de atendimento | Privada (signed URLs) |
| `anamneses` | PDF de anamnese assinado pelo cliente | Privada |
| `signatures` | Assinatura digital do cliente (anamnese) | Privada |

Signed URLs com expiração curta geradas no backend/Edge Function; cliente nunca recebe URL direta permanente. Limite de upload: 10 MB por arquivo; tipos aceitos: `image/*` (gallery, signatures), `application/pdf` (anamneses).

---

## 7. Webhooks

Endpoints internos hospedados no Next.js (admin-web) ou Supabase Edge Functions:

### 7.1 Asaas (pagamentos)
Eventos: `payment.created`, `payment.confirmed`, `payment.overdue`, `payment.refunded`, `installment.created`.
- Endpoint: `POST /webhooks/asaas`
- Assinatura: header `access_token` (token do Asaas) + validação do HMAC quando disponível.
- Ação: atualizar `appointments.payment_status` / `transactions` e disparar notificação ao profissional.

### 7.2 Evolution (WhatsApp)
Eventos: `messages.upsert`, `messages.update`, `connection.update`.
- Endpoint: `POST /webhooks/evolution`
- Assinatura: header de assinatura da Evolution (chave compartilhada configurada).
- Ação: gravar mensagem recebida, disparar fluxo de confirmação de agendamento por WhatsApp.

### 7.3 Contrato
Detalhado em `docs/api/openapi.yaml` e `docs/api/contract.md`.

---

## 8. Realtime

**Provedor:** Supabase Realtime (PostgreSQL replication via websocket).

Canais por tenant (`professional_id`):
- `appointments` — atualizações de agenda em tempo real (confirmação, início, finalização).
- `notifications` — notificações push/in-app novas.
- `clients` — criação/edição de clientes.

Inscrição filtrada por `professional_id` (garante isolamento de tenant no Realtime).

---

## 9. Offline (Mobile)

**Estratégia:** Offline-first com fila de sincronização.

- **MMKV** (react-native-mmkv) — storage síncrono, chave-valor, para cache de dados e fila de operações pendentes.
- Fila de ações pendentes (create/update/delete) registradas localmente com timestamp e idempotency key.
- Sincronização em background quando conexão é restaurada (expo-netInfo + AppState).
- Reconciliação servidor-vence (server timestamp); conflitos resolvidos por `updated_at` mais recente.
- Leituras servem do cache MMKV enquanto offline; writes vão para a fila e são replicados ao voltar online.

---

## 10. Deploy

| Alvo | Provedor | Pipeline |
|------|----------|----------|
| Web (admin-web) | Vercel | Conexão Git → build `next build` → deploy automático em push na `main` |
| Mobile | EAS Build | `eas build` (Android APK/AAB, iOS) → distribuição via EAS Submit / stores |
| Banco | Supabase CLI | `supabase migration up` / `supabase db push` para aplicar migrações de `packages/supabase-schema/migrations` |

Variáveis de ambiente (ambos ambientes): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ASAAS_WEBHOOK_SECRET`, `EVOLUTION_WEBHOOK_SECRET`, `ASAAS_API_KEY`, `EVOLUTION_API_URL`.

---

## 11. Segurança

| Camada | Medida |
|--------|--------|
| **RLS** | Todas as tabelas tenant-isoladas via `auth.professional_id()` (veja §4.5) |
| **Auth** | Supabase Auth + JWT com claim `professional_id`; refresh token rotacionado; service role key apenas no servidor |
| **Rate limiting** | Middleware Next.js (IP + endpoint) nos webhooks e rotas de auth; limite padrão 100 req/min por IP |
| **CORS** | Apenas origens do domínio da app (Vercel + expo web); webhooks não exigem CORS (servidor-para-servidor) |
| **Webhook signatures** | Asaas: validação de `access_token`/HMAC; Evolution: validação de assinatura de chave compartilhada; rejeitar 401 se inválido |
| **Storage** | Buckets privados; signed URLs com TTL curto; validação de tipo e tamanho no upload |
| **Secrets** | Nunca commitar `.env`; service role key nunca no cliente mobile/web |

---

## 12. Observabilidade e Logs

- Logs estruturados em Edge Functions e API routes (req ID, professional_id, evento, status, latência).
- Supabase Dashboard para métricas do banco e Realtime.
- EAS Build logs para builds mobile; Vercel analytics para web.

---

*Fim da especificação técnica (FASE 1.4).*
