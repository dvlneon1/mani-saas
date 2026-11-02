# Fluxo de Onboarding

Primeiro acesso → 3 serviços + 1 cliente + 1 agendamento

```mermaid
flowchart TD
    A[App Launch] --> B{First Access?}
    B -->|Yes| C[Welcome Screen]
    B -->|No| D[Home - Hoje Tab]
    C --> E[Onboarding Step 1: Perfil]
    E --> F[Nome, Telefone, Instagram]
    F --> G[Onboarding Step 2: Serviços]
    G --> H[Criar 3 Serviços Mínimos]
    H --> I[Nome, Preço, Duração, Cor]
    I --> J[Onboarding Step 3: Primeiro Cliente]
    J --> K[Nome, Telefone, Anamnese Básica]
    K --> L[Onboarding Step 4: Primeiro Agendamento]
    L --> M[Selecionar Cliente + Serviço + Horário]
    M --> N[Confirmar Agendamento]
    N --> O[Status: AGENDADO]
    O --> P[Onboarding Step 5: Tour Guiado]
    P --> Q[Tabs: Hoje, Agenda, Clientes, Financeiro, Feed, Perfil]
    Q --> R[Tooltip: Próximo Agendamento]
    R --> S[Tooltip: Adicionar Cliente]
    S --> T[Tooltip: Lançamento Rápido]
    T --> U[Concluir Onboarding]
    U --> D
    D --> V[Estado Vazio: CTA Criar Serviço]
    V --> W[Estado Vazio: CTA Adicionar Cliente]
    W --> X[Estado Vazio: CTA Agendar]

    style A fill:#8B5CF6,color:#fff
    style U fill:#10B981,color:#fff
    style D fill:#EC4899,color:#fff
    style V fill:#F59E0B,color:#fff
    style W fill:#F59E0B,color:#fff
    style X fill:#F59E0B,color:#fff
```

## Legendas

### Estados
| Código | Descrição |
|--------|-----------|
| `AGENDADO` | Agendamento criado, aguardando confirmação do cliente |

### Decisões
| Nó | Pergunta | Sim | Não |
|----|----------|-----|-----|
| B | First Access? | Welcome Screen | Home - Hoje Tab |

### Ações Principais
- **Criar 3 Serviços Mínimos**: Nome, preço, duração, cor por serviço
- **Primeiro Cliente**: Nome, telefone, anamnese básica
- **Primeiro Agendamento**: Selecionar cliente + serviço + horário → Status AGENDADO
- **Tour Guiado**: 3 tooltips sequenciais nas tabs principais