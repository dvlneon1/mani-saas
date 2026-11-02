# Fase 3 — Integração Firebase (substitui Supabase)

## Visão Geral

A Fase 0–3 originalmente planejava Supabase como BaaS. Decidimos migrar para **Firebase** devido a:
- Melhor suporte nativo a React Native (Expo SDK 58)
- Autenticação mais simples (Auth + Email/Password)
- Firestore com sincronização em tempo real
- Storage integrado para fotos de unhas
- Offline-first nativo no Firestore

## Pacotes Instalados

| Pacote | Função |
|--------|--------|
| `firebase` | SDK principal |
| `@react-native-firebase/app` | Inicialização |
| `@react-native-firebase/auth` | Autenticação |
| `@react-native-firebase/firestore` | Banco NoSQL + Realtime |
| `@react-native-firebase/storage` | Armazenamento de fotos |

## Estrutura

```
apps/mobile/src/firebase/
├── config.ts       — Inicialização Firebase (app, auth, db, storage)
├── hooks.ts        — AuthProvider + helpers Firestore/Storage
├── auth-wrapper.tsx| — withAuth HOC + AuthProvider export
└── index.ts        — Re-exports
```

## Autenticação

- **Provedor:** Email/Password
- **Coleção:** `profissionais` (uid, name, email, role, createdAt)
- **Hook:** `useAuth()` retorna `{ user, loading, signIn, signUp, signOut, resetPassword }`
- **Wrapper:** `withAuth(Componente)` protege telas que exigem login

## Firestore — Coleções

### `profissionais`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| uid | string | ID do Firebase Auth |
| name | string | Nome profissional |
| email | string | Email |
| role | string | 'profissional' |
| createdAt | timestamp | Data de cadastro |

### `clientes`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| uid | string | ID automático |
| profissionalId | string | Referência ao profissional |
| name | string | Nome da cliente |
| phone | string | Telefone |
| services | array | Serviços realizados |
| createdAt | timestamp | Data de cadastro |

### `agendamentos`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| uid | string | ID automático |
| profissionalId | string | Referência ao profissional |
| clienteId | string | Referência à cliente |
| service | string | Serviço agendado |
| dateTime | timestamp | Data/hora |
| status | string | agendado\|confirmado\|finalizado\|cancelado |
| price | number | Valor |
| createdAt | timestamp | Data de criação |

### `financeiro`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| uid | string | ID automático |
| profissionalId | string | Referência ao profissional |
| tipo | string | 'income'\|'expense' |
| descricao | string | Descrição |
| valor | number | Valor |
| metodo | string | 'pix'\|'dinheiro'\|'cartão' |
| status | string | 'completed'\|'pending' |
| createdAt | timestamp | Data |

### `anamneses`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| uid | string | ID automático |
| clienteId | string | Referência à cliente |
| profissionalId | string | Referência ao profissional |
| dados | object | Dados pessoais |
| saude | object | Informações de saúde |
| assinatura | string | URL da assinatura |
| termo | boolean | Termo aceito |
| createdAt | timestamp | Data |

## Storage

- **Bucket:** Fotos de unhas (antes/durante/depois)
- **Caminho:** `anamneses/{clienteId}/{fase}/{nomeArquivo}`
- **Função:** `uploadImagem(uri, path)` → retorna download URL

## Regras de Segurança (Firestore)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.profissionalId;
    }
  }
}
```

## Regras de Segurança (Storage)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Offline-First

Firestore está configurado para persistência local automática. Dados são sincronizados quando a conexão é restaurada.

## Integração com o App

```tsx
// app/_layout.tsx
import { AuthProvider } from '@/src/firebase';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
      <BottomTabBar ... />
    </AuthProvider>
  );
}
```

## Próximos Passos

1. Configurar `google-services.json` (Android) e `GoogleService-Info.plist` (iOS)
2. Configurar variáveis de ambiente (`.env`)
3. Conectar telas do mobile ao Firebase (substituir mock data)
4. Implementar sincronização offline com MMKV
5. Implementar notificações push (Firebase Cloud Messaging)
