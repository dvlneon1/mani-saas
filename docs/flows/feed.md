# Fluxo de Feed

Scroll → Salvar pasta → 'Quero esta' → Pré-agenda

```mermaid
flowchart TD
    A[Aba Feed - Grid Inspiração] --> B[Infinite Scroll]
    B --> C[Cards: Imagem + Autor + Tags + Curtidas]
    C --> D[Pull-to-Refresh]
    D --> E[Filtros Topo: Estilo, Cor, Técnica, Ocasião]
    E --> F[Aplicar Filtros]
    F --> G[Grid Filtrado]
    G --> H[Toque Card -> Detalhe Post]
    H --> I[Imagem Full + Metadados Completos]
    I --> J[Ações: Salvar / Quero Esta / Compartilhar]
    J --> K{Salvar em Pasta}
    K -->|Nova Pasta| L[Criar Pasta: Nome + Cor]
    K -->|Existente| M[Selecionar Pasta]
    L --> N[Salvo com Sucesso Toast]
    M --> N
    N --> O[Badge Contador na Pasta]
    I --> P{Quero Esta}
    P --> Q[Modal Pré-Agenda]
    Q --> R[Selecionar Cliente]
    R --> S[Sugerir Serviços Baseado no Post]
    S --> T[Definir Data/Horário Preferencial]
    T --> U[Criar Rascunho Agendamento]
    U --> V[Status: PRÉ-AGENDADO]
    V --> W[Notificação: Converter em Agendamento Real]
    W --> X[Link para Tela Agendamento]

    A --> Y[Abas: Para Você / Salvas / Pastas]
    Y --> Z[Feed Personalizado Algoritmo]
    Z --> AA[Interações -> Atualizar Perfil Interesse]

    style A fill:#8B5CF6,color:#fff
    style J fill:#EC4899,color:#fff
    style P fill:#F97316,color:#fff
    style U fill:#10B981,color:#fff
    style V fill:#F59E0B,color:#fff
```

## Legendas

### Estados
| Código | Descrição |
|--------|-----------|
| `PRÉ-AGENDADO` | Rascunho criado a partir de inspiração, aguarda confirmação |
| `SALVO` | Post salvo em pasta pessoal da designer |

### Abas do Feed
| Aba | Fonte |
|-----|-------|
| `Para Você` | Algoritmo baseado em interações (curtidas, salvos, 'quero esta') |
| `Salvas` | Posts salvos pela designer (flat list) |
| `Pastas` | Organização hierárquica por pastas criadas |

### Decisões
| Nó | Pergunta | Opções |
|----|----------|--------|
| K | Salvar em Pasta? | Nova Pasta (nome+cor) / Existente (select) |
| P | Quero Esta? | Abre Modal Pré-Agenda / Não faz nada |

### Ações Principais
- **Infinite Scroll + Pull-to-Refresh**: Paginação automática + atualização manual
- **Filtros**: Estilo, Cor, Técnica, Ocasião (chips no topo)
- **Salvar**: Organiza em pastas coloridas com badge contador
- **'Quero Esta'**: Fluxo direto para pré-agenda → seleciona cliente → sugere serviços baseados nas tags do post → define data/horário → cria rascunho `PRÉ-AGENDADO`
- **Notificação Conversão**: Push para transformar pré-agenda em agendamento real (link direto)
- **Algoritmo**: Interações (curtir, salvar, quero esta) atualizam perfil de interesse → feed personalizado