# tabs-financeiro.md — Financeiro (Caixa + Lançamento + Relatórios)

## Layout ASCII — Mobile 375px

### Caixa (Dashboard Principal)
```
┌─────────────────────────────────────┐
│ Financeiro           📊  ⋯       │ ← Top Bar
├─────────────────────────────────────┤
│ Hoje ▸ Semana ▸ Mês        │       │ ← Segmented period
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │  Saldo do Dia          R$ 1.250│ │ ← Card destaque
│ │  Entradas: R$ 1.800            │ │
│ │  Saídas:    R$ 550             │ │
│ └─────────────────────────────────┘ │
│ ┌─────────┬─────────┬─────────────┐ │
│ │  PIX    │ Dinheiro│ Cartão      │ │ ← Métodos chips
│ │ R$ 800  │ R$ 450  │ R$ 550      │ │
│ └─────────┴─────────┴─────────────┘ │
├─────────────────────────────────────┤
│ Lançamentos Recentes                │
│ ┌─────────────────────────────────┐ │
│ │ 09:30  Maria Silva  +R$ 350,00 │ │ ← ListItem transação
│ │       Alongamento Fibra  PIX ✓  │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 10:15  Ana Costa    +R$ 180,00 │ │
│ │       Manutenção        Dinh. ⏳│ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 14:20  Estoque      -R$ 120,00 │ │
│ │       Gel construtor    Débito ✓│ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [+ Lançamento Rápido]  ← FAB primário│
└─────────────────────────────────────┘
```

### Lançamento Rápido (BottomSheet Modal)
```
┌─────────────────────────────────────┐
│ Novo Lançamento               ✕    │
├─────────────────────────────────────┤
│ Tipo:  [Receita ▼]  [Despesa ▼]    │ ← Segmented
├─────────────────────────────────────┤
│ Categoria: [Atendimento ▼]         │
│    Atendimento | Produto | Aluguel  │
│    Transporte | Curso | Marketing  │
│    Outros                          │
├─────────────────────────────────────┤
│ Descrição *                         │
│ [Alongamento Fibra - Maria Silva]  │
├─────────────────────────────────────┤
│ Valor *                             │
│ R$ [350,00____________________]     │
├─────────────────────────────────────┤
│ Método: [PIX ▼]                    │
│    PIX | Dinheiro | Cartão Créd.   │
│    Cartão Déb. | Boleto | Transf.  │
├─────────────────────────────────────┤
│ Parcelado: [Não ▼]                 │
│    [Sim] → Entrada: R$ [150,00]    │
│           2x R$ [100,00] (30d, 60d)│
├─────────────────────────────────────┤
│ Data: [Hoje ▼]  [15/01/2025]       │
├─────────────────────────────────────┤
│       [Cancelar]  [Salvar] [Salvar+]│ ← Thumb zone
└─────────────────────────────────────┘
```

### Relatórios (5 Abas)
```
┌─────────────────────────────────────┐
│ Relatórios    DRE ▸ Lucro ▸ Ocup ▸ │ ← Top tabs scroll
│ Top Clientes ▸ Imposto             │
├─────────────────────────────────────┤
│ 📊 DRE Mensal — Jan 2025           │
│ ┌─────────────────────────────────┐ │
│ │ Receitas Totais        R$ 12.500│ │
│ │   Atendimentos         R$ 11.200│ │
│ │   Produtos             R$ 1.300 │ │
│ ├─────────────────────────────────┤ │
│ │ Custos Variáveis      -R$ 2.800│ │
│ │   Insumos (gel, fibra) -R$ 2.800│ │
│ ├─────────────────────────────────┤ │
│ │ Custos Fixos          -R$ 1.500│ │
│ │   Aluguel             -R$ 1.000│ │
│ │   Transporte          -R$ 300  │ │
│ │   Cursos              -R$ 200  │ │
│ ├─────────────────────────────────┤ │
│ │ Impostos (MEI)        -R$ 625  │ │
│ │   INSS 5%             -R$ 550  │ │
│ │   ISS fixo            -R$ 75   │ │
│ ├─────────────────────────────────┤ │
│ │ LUCRO LÍQUIDO         = R$ 7.575│ │ ← Destaque
│ │ Margem: 60.6%                    │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [Exportar PDF] [Compartilhar]       │
└─────────────────────────────────────┘
```

```
┌─────────────────────────────────────┐
│ Relatórios    Lucro por Técnica    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Alongamento Fibra               │ │
│ │ Receita: R$ 7.000  Custo: R$1.400│ │
│ │ Margem: 80%  ████████████████░░  │ │
│ ├─────────────────────────────────┤ │
│ │ Manutenção                      │ │
│ │ Receita: R$ 2.400  Custo: R$ 480│ │
│ │ Margem: 80%  ████████████████░░  │ │
│ ├─────────────────────────────────┤ │
│ │ Blindagem                       │ │
│ │ Receita: R$ 1.200  Custo: R$ 360│ │
│ │ Margem: 70%  ██████████████░░░░  │ │
│ ├─────────────────────────────────┤ │
│ │ Esmaltação Simples              │ │
│ │ Receita: R$ 600  Custo: R$ 180  │ │
│ │ Margem: 70%  ██████████████░░░░  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

```
┌─────────────────────────────────────┐
│ Relatórios    Imposto Reservado    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 🏦 Bolso Imposto                │ │
│ │ Saldo atual:      R$ 2.150,00  │ │
│ │ Projeção mês:     R$ 3.200,00  │ │
│ │ Vencimento DAS:   20/02/2025   │ │
│ ├─────────────────────────────────┤ │
│ │ Composição:                     │ │
│ │ INSS 5% receitas:  R$ 1.800    │ │
│ │ ISS fixo/mês:       R$ 350     │ │
│ └─────────────────────────────────┘ │
│ [Transferir agora] [Ver histórico]  │
└─────────────────────────────────────┘
```

## Componentes
- PeriodSegmented (Hoje/Semana/Mês)
- BalanceCard (saldo, entradas, saídas)
- MethodChips (PIX, Dinheiro, Cartão)
- TransactionListItem (tipo, valor, status)
- LaunchBottomSheet (form completo)
- ReportTabs (5 abas scroll horizontal)
- DRECard (hierarquia visual)
- TechniqueMarginBar (barras margem)
- TaxReserveCard (bolso imposto)

## Estados
- Loading: Skeleton cards
- Empty: "Nenhum lançamento" + [Primeiro lançamento]
- Error: Toast + retry
- Offline: Badge "Pendente sync" + queue

## Ações Thumb Zone
- Lançamento rápido (FAB principal)
- Alternar período
- Ver relatórios (tabs)
- Exportar PDF
- Transferir reserva imposto
