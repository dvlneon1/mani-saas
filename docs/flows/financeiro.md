# Fluxo Financeiro

Lançamento rápido → Parcelado → DRE → Reserva imposto

```mermaid
flowchart TD
    A[Aba Financeiro - Dashboard] --> B[Cards: Saldo, Entradas, Saídas, Impostos]
    B --> C[Botão + Lançamento Rápido]
    C --> D[Modal Lançamento]
    D --> E[Tipo: Entrada / Saída / Transferência]
    E --> F[Categoria: Serviço, Produto, Aluguel, Material, Imposto, Outro]
    F --> G[Valor + Data + Descrição]
    G --> H{Parcelado?}
    H -->|Sim| I[Definir Parcelas: Qtd, Intervalo, Juros]
    I --> J[Gerar Lançamentos Futuros]
    H -->|Não| K[Lançamento Único]
    J --> L[Salvar no Supabase]
    K --> L
    L --> M[Atualizar Dashboard Real-time]
    M --> N[Toast: Lançamento Salvo]

    A --> O[Aba Relatórios]
    O --> P[DRE Mensal: Receitas - Custos = Lucro]
    P --> Q[Filtro: Mês/Ano, Categoria]
    Q --> R[Gráfico Barras: Entradas vs Saídas]
    R --> S[Tabela Detalhada]
    S --> T[Exportar CSV/PDF]

    O --> U[Reserva Imposto]
    U --> V[Configurar %: Simples Nacional / MEI]
    V --> W[Cálculo Automático por Entrada]
    W --> X[Lançamento Automático Saída: Reserva Imposto]
    X --> Y[Saldo Disponível = Saldo - Reserva]
    Y --> Z{Reserva Baixa?}
    Z -->|Sim| AA[Alerta: Reserva Baixa]
    Z -->|Não| AB[OK]

    A --> AC[Aba Caixa Diário]
    AC --> AD[Lista Lançamentos do Dia]
    AD --> AE[Editar/Excluir Lançamento]
    AE --> AF[Conciliação: Marcar Confirmado]
    AF --> AG[Fechar Caixa Diário]
    AG --> AH[Resumo: Total Entradas, Saídas, Saldo Final]

    style A fill:#8B5CF6,color:#fff
    style C fill:#EC4899,color:#fff
    style L fill:#10B981,color:#fff
    style P fill:#EC4899,color:#fff
    style W fill:#F97316,color:#fff
    style Y fill:#EF4444,color:#fff
    style AG fill:#10B981,color:#fff
```

## Legendas

### Estados
| Código | Descrição |
|--------|-----------|
| `PENDENTE` | Lançamento criado, aguardando conciliação |
| `CONFIRMADO` | Marcar confirmado no caixa diário |
| `PARCELADO` | Lançamento pai + filhos futuros gerados |
| `RESERVA_IMPOSTO` | Saída automática calculada sobre entradas |

### Categorias
| Tipo | Categorias |
|------|------------|
| **Entrada** | `SERVIÇO`, `PRODUTO`, `OUTRO` |
| **Saída** | `ALUGUEL`, `MATERIAL`, `IMPOSTO`, `OUTRO` |
| **Transferência** | Entre contas/caixas da designer |

### Regimes de Imposto (configuração Reserva)
| Regime | % Padrão | Base Cálculo |
|--------|----------|--------------|
| `MEI` | Fixo mensal (DAS) | Não automático |
| `SIMPLES_NACIONAL` | 6% - 19% (anexo) | Sobre receita bruta mensal |
| `LUCRO_PRESUMIDO` | ~13.33% + 3.65% | Sobre receita bruta |
| `LUCRO_REAL` | Variável | Sobre lucro apurado |

### Decisões
| Nó | Pergunta | Sim | Não |
|----|----------|-----|-----|
| H | Parcelado? | Definir qtd/intervalo/juros → Gerar futuros | Lançamento único |
| Z | Reserva Baixa? | Alerta vermelho no dashboard | OK |

### Ações Principais
- **Lançamento Rápido**: Modal simplificado (tipo, categoria, valor, data, descrição)
- **Parcelado**: Gera lançamentos filhos com datas futuras + juros opcional
- **Real-time Dashboard**: Cards atualizam instantaneamente via Supabase Realtime
- **DRE Mensal**: Receitas (serviço+produto) - Custos (fixos+variáveis) = Lucro + export CSV/PDF
- **Reserva Imposto Automática**: % configurado → calcula sobre cada entrada → cria saída `RESERVA_IMPOSTO` → Saldo Disponível = Saldo Total - Reserva
- **Caixa Diário**: Lista do dia + editar/excluir + conciliação (marcar confirmado) + fechar caixa → resumo final