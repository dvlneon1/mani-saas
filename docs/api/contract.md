# Contrato Frontend ↔ Backend — Projeto Mani

**Versão:** 1.0 (FASE 1.4)
**Escopo:** Integração entre apps (mobile Exo 58, admin-web Next.js 16.4) e backend Supabase + Edge Functions
**Idioma:** Português do Brasil

---

## 1. Tipos Compartilhados (`packages/shared/types/`)

Todo tipo compartilhado entre frontend e backend vive em `@mani/shared`:

```
packages/shared/
  src/
    types/
      index.ts          <- re-export de todos os tipos
    schemas/
      index.ts          <- schemas Zod de validação
    constants/
      index.ts          <- APP_NAME, DATE_FORMAT, CURRENCY, LOCALE, statuses
    utils/
      index.ts          <- utilitários puros
```

### 1.1 Tipos de domínio (extraídos do esquema do banco)

| Tipo | Origem | Uso |
|------|--------|-----|
| `Professional` | `database.types.ts` | Perfil do profissional/tenant |
| `Member` | `database.types.ts` | Usuário da equipe |
| `Client` | `database.types.ts` | Cliente final |
| `Service` | `database.types.ts` | Serviço do catálogo |
| `Appointment` | `database.types.ts` | Agendamento |
| `AppointmentPhoto` | `database.types.ts` | Foto antes/depois |
| `Supply` | `database.types.ts` | Item de estoque |
| `Transaction` | `database.types.ts` | Lançamento financeiro |
| `Notification` | `database.types.ts` | Notificação in-app |
| `FeedFolder` / `FeedPost` | `database.types.ts` | Feed de inspiração |
| `AnamneseTemplate` | `database.types.ts` | Template de anamnese |

### 1.2 Enums compartilhados

| Enum | Valores (banco) | Rótulos PT-BR (UI) |
|------|-----------------|-------------------|
| `appointment_status` | scheduled, confirmed, in_progress, completed, cancelled, no_show | Agendado, Confirmado, Em atendimento, Finalizado, Cancelado, Não compareceu |
| `payment_status` | pending, partial, paid, refunded | Pendente, Parcial, Pago, Estornado |
| `location_type` | studio, home_visit, online | Estúdio, Visita domiciliar, Online |
| `member_role` | owner, manager, professional | Dono, Gerente, Profissional |
| `plan_type` | free, starter, pro, enterprise | Grátis, Inicial, Profissional, Empresarial |

### 1.3 Schemas Zod de validação (`packages/shared/src/schemas/`)

- `phoneSchema` — `(DD) NNNN-NNNN` ou `(DD) NNNNN-NNNN`
- `cpfSchema`, `cnpjSchema`
- `emailSchema`, `passwordSchema` (mín. 8)
- `clientSchema` — nome obrigatório, telefone, email opcional, notas

Todos os schemas são exportados e consumidos tanto no mobile (React Native Form) quanto no web (React Hook Form).

---

## 2. Supabase Client Config

### 2.1 Mobile (Expo SDK 58)

Arquivo: `apps/mobile/src/lib/supabase.ts`

```ts
import { createClient } from '@supabase/supabase-js';
import MMKV from 'react-native-mmkv';

const storage = new MMKV();

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: {
        getItem: (key) => storage.getString(key) ?? null,
        setItem: (key, value) => storage.set(key, value),
        removeItem: (key) => storage.delete(key),
      },
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        'X-Client-Platform': 'mobile',
        'X-App-Version': '1.0.0',
      },
    },
  },
);
```

### 2.2 Web (Next.js 16.4)

Cliente de servidor (`apps/admin-web/lib/supabase/server.ts`) com `SUPABASE_SERVICE_ROLE_KEY` (apenas backend) e cliente de browser (`apps/admin-web/lib/supabase/browser.ts`) com `NEXT_PUBLIC_SUPABASE_ANON_KEY`, cookies via `cookies()`/`headers()` do Next.js.

Middleware Next.js valida sessão em rotas protegidas e injeta `professional_id` nos claims JWT quando disponível.

---

## 3. Funções Edge (Supabase Edge Functions)

Hospedadas no Supabase, escritas em TypeScript (Deno), acessadas via `https://<ref>.supabase.co/functions/v1/<name>`.

| Função | Rota | Responsabilidade | Auth |
|--------|------|------------------|------|
| `webhook-asaas` | `/functions/v1/webhook-asaas` | Recebe eventos Asaas, atualiza pagamentos, dispara notificações | Service role (webhook server-to-server) |
| `webhook-evolution` | `/functions/v1/webhook-evolution` | Recebe eventos Evolution, processa mensagens WhatsApp | Service role |
| `auth-signup-hook` | `/functions/v1/auth-signup-hook` | Inseri claim `professional_id` no JWT após signup | Supabase Auth |
| `send-whatsapp` | `/functions/v1/send-whatsapp` | Envia mensagem via Evolution API | Service role |
| `sync-offline` | `/functions/v1/sync-offline` | Recebe fila MMKV do mobile e aplica no banco | JWT do usuário |

Todas validam assinatura de webhook (Asaas `access_token`, Evolution chave compartilhada) e retornam `200` `{ status: 'ok' }` ou `400/401` com corpo de erro.

---

## 4. Triggers DB

### 4.1 Transição de estados do agendamento

Trigger `appointments_status_transition()` (BEFORE UPDATE on `appointments`):
- `AGENDADO → CONFIRMADO`: grava `confirmed_at`, envia notificação + WhatsApp ao cliente.
- `CONFIRMADO → EM_ATENDIMENTO`: grava `actual_start`, notifica profissional.
- `EM_ATENDIMENTO → FINALIZADO`: grava `actual_end`, cria transação financeira (`type: 'income'`), solicita avaliação/galeria.
- Transições inválidas (pular estados, voltar para trás) são rejeitadas com exceção PL/pgSQL.

### 4.2 Notificações

Trigger `notify_on_appointment_change()` (AFTER UPDATE on `appointments`): insere linha em `notifications` quando o status muda, para Realtime avisar o profissional.

Trigger `notify_on_new_client()` (AFTER INSERT on `clients`): notificação de novo cliente cadastrado.

### 4.3 Imutabilidade financeira

Trigger bloqueia `UPDATE` em `transactions` (apenas INSERT permitido) para integridade de auditoria.

### 4.4 Seeds automáticas

Triggers `create_default_feed_folders()` e `create_default_anamnese_template()` disparam no `AFTER INSERT` de `professionals`.

---

## 5. Error Handling Padrão

Todas as respostas de erro da API seguem o formato:

```ts
interface ApiError {
  error: string;      // código de erro (snake_case)
  message: string;    // descrição legível pt-BR
  statusCode: number; // HTTP status
}
```

Códigos padrão:
| Código | HTTP | Significado |
|--------|------|-------------|
| `validation_error` | 400 | Campos inválidos (Zod) |
| `unauthorized` | 401 | Sessão inválida/expirada |
| `forbidden` | 403 | Sem permissão (RLS/tenant) |
| `not_found` | 404 | Recurso não existe |
| `conflict` | 409 | Estado inválido (ex: transição de agendamento não permitida) |
| `too_many_requests` | 429 | Rate limiting |
| `webhook_invalid_signature` | 401 | Assinatura de webhook inválida |
| `internal_error` | 500 | Erro inesperado |

Frontend trata erros globalmente via TanStack Query `queryError` / `mutationError` e exibe toast com `message`.

---

## 6. Versionamento de API

- **Versão atual:** `v1`
- Versionamento por caminho: `/functions/v1/<name>` (Edge Functions) e `/webhooks/<provider>`
- Mudanças quebrantes (breaking) incrementam a versão (`v2`) e mantêm a anterior por pelo menos 1 ciclo de release.
- Adição de campos opcionais em respostas não é considerado breaking.
- Clientes mobile devem declarar versão mínima suportada; builds antigas que não suportam a versão corrente são notificadas para atualizar na loja.

---

## 7. Contrato de Webhooks (resumo)

Detalhado em `docs/api/openapi.yaml`:

| Endpoint | Provedor | Eventos | Header de assinatura |
|----------|----------|---------|----------------------|
| `POST /webhooks/asaas` | Asaas | payment.created, payment.confirmed, payment.overdue, payment.refunded, installment.created | `access_token` |
| `POST /webhooks/evolution` | Evolution | messages.upsert, messages.update, connection.update | `x-evolution-signature` |

Respostas: `200 { status: 'ok' }`, `400` payload inválido, `401` assinatura inválida, `500` erro interno.

---

*Fim do contrato (FASE 1.4).*
