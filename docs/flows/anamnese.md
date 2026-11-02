# Fluxo de Anamnese

Link WhatsApp → 3 steps → PDF assinado → Notificação

```mermaid
flowchart TD
    A[Tela Cliente - Botão Anamnese] --> B{Anamnese Existe?}
    B -->|Não| C[Gerar Link Único + Token]
    B -->|Sim| D[Visualizar/Editar Existente]
    C --> E[Compartilhar WhatsApp]
    E --> F[Cliente Abre Link no Mobile]
    F --> G[Tela Boas-vindas Anamnese]
    G --> H[Step 1: Dados Pessoais]
    H --> I[Nome, CPF, Data Nasc, Telefone, Email]
    I --> J[Validação CPF/Telefone]
    J --> K[Step 2: Saúde & Alergias]
    K --> L[Alergias, Medicamentos, Patologias, Gravidez]
    L --> M[Checkbox: Termos LGPD]
    M --> N[Step 3: Preferências & Consentimento]
    N --> O[Formato Unha, Comprimento, Estilo, Cor Favorita]
    O --> P[Consentimento Fotos Redes Sociais]
    P --> Q[Assinatura Digital Canvas]
    Q --> R[Salvar Assinatura + Timestamp]
    R --> S[Gerar PDF Anamnese]
    S --> T[Salvar no Supabase Storage]
    T --> U[Notificação Push Designer]
    U --> V[Tela Cliente - Badge: Anamnese Completa]
    V --> W[Botão Ver PDF]
    W --> X[Visualizar/Download PDF]

    D --> Y[Editar Step 1/2/3]
    Y --> Z{Alterou Dados Saúde?}
    Z -->|Sim| AA[Re-assinar Obrigatório]
    AA --> Q
    Z -->|Não| S

    style A fill:#8B5CF6,color:#fff
    style C fill:#F97316,color:#fff
    style Q fill:#EC4899,color:#fff
    style S fill:#10B981,color:#fff
    style U fill:#8B5CF6,color:#fff
    style V fill:#10B981,color:#fff
```

## Legendas

### Estados
| Código | Descrição |
|--------|-----------|
| `PENDENTE` | Link gerado, aguardando cliente preencher |
| `EM_PREENCHIMENTO` | Cliente acessou, preenchendo steps |
| `ASSINADO` | Assinatura digital capturada + timestamp |
| `CONCLUÍDA` | PDF gerado, salvo, designer notificado |

### Decisões
| Nó | Pergunta | Sim | Não |
|----|----------|-----|-----|
| B | Anamnese Existe? | Visualizar/Editar | Gerar Link Novo |
| J | Validação CPF/Telefone | Próximo Step | Erro + Retentar |
| Z | Alterou Dados Saúde? | Re-assinar Obrigatório | Gerar PDF Direto |

### Steps (3 etapas obrigatórias)
1. **Dados Pessoais**: Nome, CPF, data nasc, telefone, email + validação
2. **Saúde & Alergias**: Alergias, medicamentos, patologias, gravidez + LGPD checkbox
3. **Preferências & Consentimento**: Formato/comprimento/estilo/cor + consentimento fotos

### Ações Principais
- **Link Único + Token**: Expiração 7 dias, uso único
- **Assinatura Digital**: Canvas touch, salva timestamp + IP
- **PDF**: Gera com todos os 3 steps + assinatura + metadados
- **Notificação Designer**: Push in-app + badge no cliente