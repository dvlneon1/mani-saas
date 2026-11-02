# tabs-clientes.md — Clientes (Lista + Perfil + Anamnese + Galeria)

## Layout ASCII — Mobile 375px

### Lista
```
┌─────────────────────────────────────┐
│ Clientes            🔍  ⋯        │ ← Top Bar + search
├─────────────────────────────────────┤
│ 📍 Perto de mim  ▼  [Filtros]      │ ← Segmented + filter chip
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 👤 Maria Silva          VIP    │ │ ← ListItem avatar + badge
│ │ 📱 (11) 99999-9999             │ │
│ │ ✂️ 12 agend.  •  Últ: 15/01    │ │
│ │ 💰 R$ 4.200 LTV                │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 👤 Ana Costa                  │ │
│ │ 📱 (11) 88888-8888             │ │
│ │ ✂️ 8 agend.  •  Últ: 02/01     │ │
│ │ 💰 R$ 2.800 LTV                │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 👤 Julia Santos           🔔   │ │ ← Badge notificação
│ │ 📱 (11) 77777-7777             │ │
│ │ ✂️ 3 agend.  •  Últ: 20/12     │ │
│ │ 💰 R$ 1.050 LTV                │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
← FAB: [+ Novo cliente]
```

### Perfil Cliente
```
┌─────────────────────────────────────┐
│ 👤 Maria Silva              ✎      │ ← Header + edit
│ 📱 (11) 99999-9999  📧 maria@...   │
│ 🎂 28/03/1996  🏷️ VIP, Alérgica    │
├─────────────────────────────────────┤
│ 📊 Resumo                           │
│  12 agendamentos  •  R$ 4.200 LTV  │
│  Frequência: 15 dias               │
│  Última visita: 15/01/2025         │
├─────────────────────────────────────┤
│ 📋 Anamnese          [Ver/Editar]  │ ← Card navegação
│ 📷 Galeria           [Ver 48 fotos] │
│ 💰 Financeiro        [Ver histórico]│
│ 📅 Próximos          [Ver 3]       │
├─────────────────────────────────────┤
│ [Nova anamnese]  [Novo agendamento] │ ← Thumb zone
│ [Compartilhar galeria]             │
└─────────────────────────────────────┘
```

### Anamnese (3 Steps Progressivo)
```
┌─────────────────────────────────────┐
│ Anamnese — Passo 1 de 3        ✕   │
├─────────────────────────────────────┤
│ ● Dados Pessoais   ○ Saúde  ○ Termo │ ← Stepper
├─────────────────────────────────────┤
│ Nome completo *                     │
│ [Maria Silva____________________]   │
│ CPF *                               │
│ [123.456.789-00________________]    │
│ Telefone *                          │
│ [(11) 99999-9999________________]   │
│ Data nascimento *                   │
│ [28/03/1996____________________]    │
│ Email                               │
│ [maria@email.com_________________]  │
│ LGPD: [☑] Autorizo uso dos dados   │
├─────────────────────────────────────┤
│                    [Próximo ▸]      │ ← Thumb zone
└─────────────────────────────────────┘
```

```
┌─────────────────────────────────────┐
│ Anamnese — Passo 2 de 3        ✕   │
├─────────────────────────────────────┤
│ ○ Dados Pessoais   ● Saúde   ○ Termo│
├─────────────────────────────────────┤
│ Alergias *                          │
│ [☐] Nenhuma  [☐] Esmalte  [☐] Gel  │
│ [☐] Acrílico [☐] Outros _________  │
│ Doenças pré-existentes *            │
│ [☐] Diabetes  [☐] Micose  [☐] Psor. │
│ [☐] Hipotireoid. [☐] Hipertensão    │
│ [☐] Outras _______________________  │
│ Medicamentos uso contínuo           │
│ [________________________________]  │
│ [☐] Isotretinoína  [☐] Anticoagul.  │
│ Gravidez: [☐] Sim  [☐] Não          │
│   Semanas: [___]                    │
│ Cirurgias recentes: [☐] Sim [☐] Não │
├─────────────────────────────────────┤
│       [Voltar]     [Próximo ▸]      │
└─────────────────────────────────────┘
```

```
┌─────────────────────────────────────┐
│ Anamnese — Passo 3 de 3        ✕   │
├─────────────────────────────────────┤
│ ○ Dados Pessoais   ○ Saúde   ● Termo│
├─────────────────────────────────────┤
│ Foto "Antes" *                      │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │ ← Camera/Gallery picker
│ │    [📷 Câmera]  [🖼 Galeria]     │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ Assinatura digital *                │
│ ┌─────────────────────────────────┐ │
│ │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ │ ← SignaturePad canvas
│ │                                 │ │
│ │              [Limpar]           │ │
│ └─────────────────────────────────┘ │
│ [☑] Li e aceito o termo de consent. │
├─────────────────────────────────────┤
│       [Voltar]   [Finalizar ✓]      │
└─────────────────────────────────────┘
```

### Galeria Timeline
```
┌─────────────────────────────────────┐
│ Galeria — Maria Silva          ✕   │
├─────────────────────────────────────┤
│ 📅 15/01/2025 — Alongamento Fibra  │
│ ┌─────┬─────┬─────┬─────┐           │
│ │ANTES│DURAN│DEPOI│15D  │ ← Phase chips
│ └─────┴─────┴─────┴─────┘           │
│ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █   │ ← PhotoGrid 1:1
│ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █ █   │
├─────────────────────────────────────┤
│ 📅 02/02/2025 — Manutenção         │
│ ┌─────┬─────┐                       │
│ │DEPOI│15D  │                       │
│ └─────┴─────┘                       │
│ █ █ █ █ █ █ █ █                     │
├─────────────────────────────────────┤
│ [+ Adicionar fotos]  [Comparar ◀▶]  │
└─────────────────────────────────────┘
```

## Componentes
- ClientListItem (avatar, badges, LTV)
- SearchBar + FilterChips
- ClientProfile (tabs: Resumo, Anamnese, Galeria, Financeiro)
- AnamneseStepper (3 steps, progressivo)
- SignaturePad (canvas touch)
- PhotoGrid (masonry/uniform)
- PhaseChips (antes/durante/depois/15d/reparo)

## Estados
- Loading: Skeleton list items
- Empty: "Nenhum cliente" + [Cadastrar primeiro]
- Error: Toast + retry
- Anamnese incompleta: Badge "Pendente" no perfil

## Ações Thumb Zone
- Novo cliente (FAB)
- Editar perfil
- Ver/Editar anamnese
- Upload galeria
- Novo agendamento
- Compartilhar galeria (link 30d)
