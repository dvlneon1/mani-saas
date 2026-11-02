# Fluxo de Galeria

Upload fotos → Tags → Comparação antes/depois

```mermaid
flowchart TD
    A[Tela Cliente - Aba Galeria] --> B[Botão + Adicionar Fotos]
    B --> C[Seletor: Câmera / Galeria / Arquivos]
    C --> D[Multi-select até 10 fotos]
    D --> E[Pré-visualização Grid]
    E --> F[Editar Metadados por Foto]
    F --> G[Tags: Antes/Durante/Depois, Serviço, Técnica, Cor]
    G --> H[Legenda Opcional]
    H --> I[Salvar no Supabase Storage]
    I --> J[Processar Thumbnails]
    J --> K[Timeline Atualizada]
    K --> L[Auto-agrupar por Data/Serviço]
    L --> M[Visualização Timeline]
    M --> N{Comparar Antes/Depois?}
    N -->|Sim| O[Selecionar Foto Antes]
    O --> P[Selecionar Foto Depois]
    P --> Q[Modal Comparação Slider]
    Q --> R[Compartilhar Comparação]
    R --> S[WhatsApp/Instagram/Download]
    N -->|Não| T[Filtrar por Tag/Serviço/Data]
    T --> U[Grid Filtrado]
    U --> V[Toque Foto -> Detalhe]
    V --> W[Zoom + Metadados + Ações]
    W --> X[Editar Tags/Legenda]
    W --> Y[Excluir Foto]
    W --> Z[Marcar Como Capa Serviço]

    style A fill:#8B5CF6,color:#fff
    style B fill:#EC4899,color:#fff
    style I fill:#10B981,color:#fff
    style Q fill:#F97316,color:#fff
    style M fill:#EC4899,color:#fff
```

## Legendas

### Estados
| Código | Descrição |
|--------|-----------|
| `UPLOADING` | Fotos selecionadas, processando thumbnails |
| `SALVA` | Foto persistida no Storage + metadados |
| `CAPA_SERVICO` | Foto marcada como representação do serviço |

### Tags Obrigatórias (pelo menos uma)
| Categoria | Valores |
|-----------|---------|
| **Momento** | `ANTES`, `DURANTE`, `DEPOIS` |
| **Serviço** | Lista dinâmica dos serviços da designer |
| **Técnica** | `GEL`, `ACRYLIC`, `FIBRA`, `ESMALTE`, `NAIL_ART`, `OUTRO` |
| **Cor** | Paleta pré-definida + personalizada |

### Decisões
| Nó | Pergunta | Sim | Não |
|----|----------|-----|-----|
| N | Comparar Antes/Depois? | Modal Slider | Filtros Normais |

### Ações Principais
- **Multi-select**: Até 10 fotos por upload (câmera/galeria/arquivos)
- **Metadados por foto**: Tags obrigatórias (momento + serviço) + opcionais (técnica, cor, legenda)
- **Auto-agrupamento**: Timeline por data + agrupamento por serviço
- **Comparação Slider**: Duas fotos (ANTES + DEPOIS) → slider interativo → share WhatsApp/Instagram/Download
- **Capa do Serviço**: Marca foto como thumbnail do serviço na lista