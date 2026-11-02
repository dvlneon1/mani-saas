# tabs-hoje.md — Dashboard Dia (Mobile 375px)

## Layout ASCII

```
┌─────────────────────────────────────┐
│ ◀  Hoje          🔔  ⚙️            │  ← Top Bar (56px)
├─────────────────────────────────────┤
│ ▸ Próximos  ▸ Ações Rápidas         │  ← Segmented Control
├─────────────────────────────────────┤
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 09:00  Maria Silva            │  │  ← Card Agendamento
│  │ 💅 Unha Gel + 🎨 Francesinha  │  │     Status: Confirmado
│  │ R$ 85,00  ●●●  90min          │  │
│  │ [Iniciar] [Reagendar] [⋮]     │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 11:30  Ana Costa              │  │
│  │ 💅 Unha Acrílica              │  │
│  │ R$ 120,00  ●●●  120min        │  │
│  │ [Iniciar] [Reagendar] [⋮]     │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │ 14:00  VAGO                   │  │  ← Slot Vago (Ghost)
│  │ [+ Novo Agendamento]          │  │
│  └───────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ 🏠  📅  👥  💰  📱  👤             │  ← Bottom Nav (72px)
└─────────────────────────────────────┘
```

## Componentes Identificados

| Componente | Tipo | Estados |
|------------|------|---------|
| Top Bar | Header fixo | Default, Com notificação |
| Segmented Control | Tabs | `Próximos` (ativo), `Ações Rápidas` |
| Card Agendamento | List item | Confirmado, Em andamento, Concluído, Cancelado, Vago |
| Ações Rápidas | Grid 2x2 | Default, Loading |
| Bottom Nav | Navigation | 5 tabs, 1 ativo |

## Estados

### Loading
```
│  ┌───────────────────────────────┐  │
│  │ ████████  ████████████        │  │  ← Skeleton
│  │ ████████  ████████            │  │
│  └───────────────────────────────┘  │
```

### Empty (Sem agendamentos hoje)
```
│                                     │
│        📅                           │
│     Nenhum agendamento hoje         │
│                                     │
│     [+ Novo Agendamento]            │  ← Primary CTA thumb zone
│                                     │
```

### Error (Falha ao carregar)
```
│                                     │
│        ⚠️                           │
│   Não foi possível carregar         │
│   seus agendamentos                 │
│                                     │
│     [Tentar Novamente]              │
│                                     │
```

## Ações Primárias (Thumb Zone - Bottom 120px)

| Ação | Posição | Tipo |
|------|---------|------|
| + Novo Agendamento | FAB Bottom Right / Empty State CTA | Primary |
| Iniciar Atendimento | Card Agendamento (esquerda) | Primary |
| Reagendar | Card Agendamento (centro) | Secondary |
| Menu Ações (⋮) | Card Agendamento (direita) | Ghost |

---

**Notas:**
- Cards usam `touch-target` mínimo 48x48px
- Scroll vertical para lista de agendamentos
- Pull-to-refresh habilitado
- Swipe left no card → ações rápidas (Cancelar, Reagendar)