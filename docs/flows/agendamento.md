# Fluxo de Agendamento

Criar → Confirmar → Check-in → Finalizar → Pagamento

```mermaid
flowchart TD
    A[Botão + Agendar] --> B[Tela Agenda Semana]
    B --> C[Selecionar Dia]
    C --> D[Tela Agenda Dia - Slots Livres]
    D --> E[Selecionar Horário]
    E --> F[Modal Criar Agendamento]
    F --> G[Selecionar Cliente]
    G --> H{Cliente Existe?}
    H -->|Não| I[Criar Cliente Rápido]
    I --> J[Nome + Telefone]
    J --> K[Salvar Cliente]
    K --> F
    H -->|Sim| F
    F --> L[Selecionar Serviço(s)]
    L --> M[Adicionar Observação Opcional]
    M --> N[Confirmar Agendamento]
    N --> O[Criar no Supabase]
    O --> P[Notificação Push/In-App]
    P --> Q[Status: AGENDADO]
    Q --> R[Tela Detalhe Agendamento]
    R --> S{Cliente Confirmou?}
    S -->|Sim| T[Status: CONFIRMADO]
    S -->|Não| U[Aguardar Confirmação]
    U --> S
    T --> V[Botão Check-in]
    V --> W[Status: EM_ATENDIMENTO]
    W --> X[Tela Atendimento]
    X --> Y[Timer Iniciado]
    Y --> Z[Checklist Serviço]
    Z --> AA[Fotos Antes/Durante]
    AA --> AB[Finalizar Atendimento]
    AB --> AC[Modal Pagamento]
    AC --> AD{Tipo Pagamento}
    AD -->|PIX| AE[QR Code PIX]
    AD -->|Cartão| AF[Link Stripe/SumUp]
    AD -->|Dinheiro| AG[Confirmar Recebido]
    AD -->|Parcelado| AH[Definir Parcelas]
    AH --> AI[Gerar Parcelas no Financeiro]
    AE --> AJ[Confirmar Pagamento]
    AF --> AJ
    AG --> AJ
    AI --> AJ
    AJ --> AK[Status: FINALIZADO]
    AK --> AL[Gerar Comprovante PDF]
    AL --> AM[Notificar Cliente WhatsApp]
    AM --> AN[Volta para Hoje Tab]

    style A fill:#8B5CF6,color:#fff
    style N fill:#10B981,color:#fff
    style T fill:#3B82F6,color:#fff
    style V fill:#F97316,color:#fff
    style AB fill:#10B981,color:#fff
    style AJ fill:#10B981,color:#fff
    style AK fill:#10B981,color:#fff
    style AN fill:#EC4899,color:#fff
```

## Legendas

### Estados do Agendamento (conforme CLAUDE.md §4.1)
| Código | Descrição | Próximo |
|--------|-----------|---------|
| `AGENDADO` | Criado, aguardando cliente confirmar | CONFIRMADO |
| `CONFIRMADO` | Cliente confirmou presença | EM_ATENDIMENTO |
| `EM_ATENDIMENTO` | Check-in feito, serviço em andamento | FINALIZADO |
| `FINALIZADO` | Serviço concluído + pagamento confirmado | — |

### Decisões
| Nó | Pergunta | Opções |
|----|----------|--------|
| H | Cliente Existe? | Criar Rápido / Selecionar Existente |
| S | Cliente Confirmou? | Sim → CONFIRMADO / Não → Aguardar |
| AD | Tipo Pagamento | PIX / Cartão / Dinheiro / Parcelado |

### Ações Principais
- **Criar Cliente Rápido**: Apenas nome + telefone (on-the-fly)
- **Confirmar Agendamento**: Gera registro no Supabase + notificação
- **Check-in**: Transição AGENDADO → CONFIRMADO → EM_ATENDIMENTO
- **Finalizar + Pagamento**: Modal com 4 opções, parcelado gera lançamentos futuros
- **Comprovante PDF + WhatsApp**: Envio automático ao finalizar