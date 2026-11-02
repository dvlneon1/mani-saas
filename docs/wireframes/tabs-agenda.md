# tabs-agenda.md — Agenda (Semana + Dia + Detalhe)

## Layout ASCII — Mobile 375px

### Semana
```
┌─────────────────────────────────────┐
│ ◀ Agenda  📅  ⋯   │ ← Top Bar (56px)
├─────────────────────────────────────┤
│ Sem  │ Seg │ Ter │ Qua │ Qui │ Sex │ ← Week header scroll horiz
├──────┼─────┼─────┼─────┼─────┼─────┤
│ 08:00│     │ ●   │     │ ●   │     │
│ 09:00│ ███ │ ███ │     │ ███ │     │ ← AppointmentCard compact
│ 10:00│ ███ │     │ ███ │     │ ███ │
│ 11:00│     │ ███ │ ███ │     │     │
│ 12:00│     │     │     │     │     │
│ 13:00│ ███ │     │ ███ │     │ ███ │
│ 14:00│ ███ │ ███ │     │ ███ │     │
│ 15:00│     │ ███ │ ███ │     │     │
│ 16:00│ ███ │     │     │ ███ │ ███ │
│ 17:00│ ███ │     │ ███ │     │     │
│ 18:00│     │ ███ │     │     │ ███ │
└──────┴─────┴─────┴─────┴─────┴─────┘
← Touch: swipe horiz semana, tap dia → Dia
```

### Dia
```
┌─────────────────────────────────────┐
│ ◀ 15 Jan  📅  ⋯   │ ← Top Bar + date picker
├─────────────────────────────────────┤
│ 08:00 ──────────────────────────── │
│ 09:00 ┌─────────────────────────┐   │
│       │ 💅 Maria Silva          │   │ ← AppointmentCard full
│       │ Alongamento Fibra Nude  │   │
│       │ 09:00-11:30  ● Confirmado│   │
│       └─────────────────────────┘   │
│ 10:00 │                           │   │
│ 11:00 ┌─────────────────────────┐   │
│       │ 💅 Ana Costa            │   │
│       │ Manutenção + Francesa   │   │
│       │ 11:00-12:30  ⬤ Agendado │   │
│       └─────────────────────────┘   │
│ 12:00 ──────────────────────────── │
│ 13:00 ┌─────────────────────────┐   │
│       │ 💅 Julia Santos         │   │
│       │ Blindagem + Esmaltação  │   │
│       │ 13:00-14:30  ● Confirmado│   │
│       └─────────────────────────┘   │
│ 14:00 ──────────────────────────── │
└─────────────────────────────────────┘
```

### Detalhe Agendamento (Modal/BottomSheet)
```
┌─────────────────────────────────────┐
│ Detalhe                    ✕       │
├─────────────────────────────────────┤
│ 💅 Maria Silva          ● Confirmado│
│ Alongamento Fibra Nude              │
│ 📅 15 Jan 2025  09:00-11:30        │
│ 📍 Studio                           │
├─────────────────────────────────────┤
│ [Check-in]     [Reagendar]          │ ← Thumb zone ações
├─────────────────────────────────────┤
│ 📋 Anamnese        [Ver]            │ ← Bloqueia check-in se pendente
│ 💰 Pagamento       R$ 350,00        │
│    Sinal: R$ 105,00 (30%)           │
│    Restante: R$ 245,00              │
├─────────────────────────────────────┤
│ 📷 Fotos                          │
│    [+ Antes]  [+ Durante]           │
│    [+ Depois] [+ Manutenção 15d]    │
├─────────────────────────────────────┤
│ 📝 Notas privadas                   │
│ _________________________________  │
│ [Salvar]                            │
├─────────────────────────────────────┤
│ [Cancelar agendamento]  ← Destructive│
└─────────────────────────────────────┘
```

## Componentes
- WeekView (FlashList horizontal, snap today)
- AppointmentCard (compact/full/detail variants)
- TimeSlot grid 15min
- ConflictIndicator (borda vermelha sutil)
- BottomSheet actions

## Estados
- Loading: Skeleton cards
- Empty: "Nenhum agendamento" + [Novo agendamento]
- Error: Toast "Falha ao carregar" + retry
- Conflito: Borda vermelha + tooltip

## Ações Thumb Zone
- Check-in/Check-out (primária)
- Reagendar (secundária)
- Ver anamnese
- Adicionar fotos
- Registrar pagamento
