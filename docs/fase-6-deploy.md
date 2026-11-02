# Fase 6 — Deploy e Publicação

## Visão Geral

O projeto Mani está configurado para deploy em duas plataformas:
- **Admin Web:** Vercel (Next.js 16.4)
- **Mobile:** EAS Build (Expo SDK 58)

Ambos usam Firebase como BaaS (Auth, Firestore, Storage).

## Pré-requisitos

### Contas Necessárias

| Serviço | Propósito | Gratuito? |
|---------|-----------|-----------|
| Firebase | BaaS (Auth, Firestore, Storage) | Spark (grátis) |
| Vercel | Hospedagem web | Hobby (grátis) |
| Expo | Build mobile | Grátis |
| GitHub | Repositório e CI/CD | Grátis |

### Variáveis de Ambiente Necessárias

#### Admin Web (`.env.production`)

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

#### Mobile (`.env`)

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

## Passo a Passo — Deploy

### 1. Firebase — Criar Projeto

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Crie um novo projeto: "mani-app"
3. Ative:
   - **Authentication** → Email/Password
   - **Firestore Database** → Modo de teste (para desenvolvimento)
   - **Storage** → Ativado
4. No ícone de engrenagem → Configurações do projeto → Geral
5. Copie as credenciais para os arquivos `.env`

### 2. Firebase — Regras de Segurança

No Console do Firebase:

**Firestore Rules:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.profissionalId;
    }
  }
}
```

**Storage Rules:**
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Admin Web — Deploy no Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Fazer deploy
cd apps/admin-web
vercel
```

Ou conectar o repositório GitHub diretamente no [vercel.com](https://vercel.com):
1. Conectar repositório GitHub
2. Selecionar pasta `apps/admin-web`
3. Adicionar variáveis de ambiente (`.env.production`)
4. Deploy automático em cada push

### 4. Mobile — Deploy via EAS Build

```bash
# Instalar EAS CLI
npm i -g eas-cli

# Fazer login
eas login

# Inicializar projeto
cd apps/mobile
eas init

# Criar build
eas build --platform all

# Enviar para lojas (opcional)
eas submit --platform all
```

**Configuração `eas.json`:**
```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### 5. CI/CD — GitHub Actions

O arquivo `.github/workflows/ci-cd.yml` está configurado com:

1. **Type Check** — Verificação TypeScript em todo o monorepo
2. **Build Mobile** — Export estático do Expo
3. **Deploy Web** — Deploy automático no Vercel (apenas branch `main`)
4. **Deploy Mobile** — Build via EAS Build (apenas branch `main`)

**Secrets necessários no GitHub:**

| Secret | Valor |
|--------|-------|
| `VERCEL_TOKEN` | Token do Vercel |
| `VERCEL_ORG_ID` | ID da organização Vercel |
| `VERCEL_PROJECT_ID` | ID do projeto Vercel |
| `EXPO_TOKEN` | Token do Expo |
| `NEXT_PUBLIC_FIREBASE_*` | Variáveis do Firebase (web) |
| `EXPO_PUBLIC_FIREBASE_*` | Variáveis do Firebase (mobile) |

### 6. Verificação Pós-Deploy

| URL | O que verificar |
|-----|-----------------|
| `https://seu-app.vercel.app/login` | Tela de login carrega |
| `https://seu-app.vercel.app/dashboard` | Dashboard carrega após login |
| `https://seu-app.vercel.app/clientes` | Lista de clientes |
| `https://seu-app.vercel.app/agendamentos` | Lista de agendamentos |
| `https://seu-app.vercel.app/financeiro` | Dashboard financeiro |
| `https://seu-app.vercel.app/configuracoes` | Configurações de conta |

### 7. Troubleshooting

| Problema | Solução |
|----------|---------|
| Erro de build no Vercel | Verificar variáveis de ambiente no dashboard do Vercel |
| Erro de CORS no mobile | Verificar se o domínio do web está nas origens permitidas do Firebase |
| Erro de autenticação | Verificar se o Firebase Auth está ativado no console |
| Erro de build do Expo | Verificar se `eas.json` está configurado corretamente |

### 8. Monitoramento

- **Firebase Console:** Monitorar uso do Firestore, Storage e Auth
- **Vercel Dashboard:** Monitorar desempenho e erros do web
- **Expo Dashboard:** Monitorar builds e distribuições do mobile

---

## 📋 Checklist de Deploy

- [ ] Projeto Firebase criado
- [ ] Regras de segurança configuradas
- [ ] Variáveis de ambiente configuradas
- [ ] Admin Web deployado no Vercel
- [ ] App mobile buildado via EAS
- [ ] CI/CD configurado no GitHub
- [ ] Domínio personalizado configurado (opcional)
- [ ] Teste de login em produção
- [ ] Teste de CRUD em todas as telas
