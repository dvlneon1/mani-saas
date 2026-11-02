# Tech Spec — Atualizado (Firebase)

## BaaS: Firebase (substitui Supabase)

| Camada | Tecnologia |
|--------|------------|
| Auth | Firebase Auth (Email/Password) |
| Banco | Cloud Firestore (NoSQL) |
| Storage | Firebase Storage |
| Realtime | Firestore onSnapshot |
| Offline | Firestore local persistence |
| Deploy | Vercel (web) + EAS Build (mobile) |

## Mudanças em relação ao Supabase

| Item | Supabase (planejado) | Firebase (atual) |
|------|---------------------|------------------|
| Auth | Supabase Auth + JWT | Firebase Auth |
| Banco | PostgreSQL + RLS | Firestore + Regras de segurança |
| Schema | SQL migrations | Coleções NoSQL |
| Realtime | Supabase Realtime | Firestore onSnapshot |
| Storage | Supabase Storage | Firebase Storage |
| Client | @supabase/supabase-js | firebase + @react-native-firebase/* |

## Pacotes do Monorepo

| Pacote | Dependências Firebase |
|--------|----------------------|
| `apps/mobile` | firebase, @react-native-firebase/app, auth, firestore, storage |
| `packages/shared` | Tipos TypeScript compartilhados (mesmos tipos de coleção) |

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| FIREBASE_API_KEY | Chave da API Firebase |
| FIREBASE_AUTH_DOMAIN | Domínio de autenticação |
| FIREBASE_PROJECT_ID | ID do projeto |
| FIREBASE_STORAGE_BUCKET | Bucket de storage |
| FIREBASE_MESSAGING_SENDER_ID | ID do remetente FCM |
| FIREBASE_APP_ID | ID do app Firebase |
