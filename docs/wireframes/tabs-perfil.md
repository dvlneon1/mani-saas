# tabs-perfil.md — Perfil (Configurações + Plano + Notificações + WhatsApp + Equipe)

## Layout ASCII — Mobile 375px

### Perfil Principal
```
┌─────────────────────────────────────┐
│ Perfil                      ✎      │ ← Top Bar + edit
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 👤 Maria Santos                 │ │
│ │ @maria.nails  •  Plano Pro     │ │ ← Badge plano
│ │ 📍 São Paulo, SP               │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 📊 Minhas Métricas                  │
│ ┌─────────┬─────────┬─────────────┐ │
│ │ Clientes│Agend./s │ Ticket Méd. │ │
│ │   47    │   12    │   R$ 285    │ │
│ └─────────┴─────────┴─────────────┘ │
├─────────────────────────────────────┤
│ ⚙️ Configurações                    │
│ ┌─────────────────────────────────┐ │
│ │ 🔔 Notificações        ▸        │ │
│ │ 📱 WhatsApp            ▸        │ │
│ │ 🎨 Tema                ▸        │ │
│ │ 🔒 Privacidade         ▸        │ │
│ │ 💳 Plano e Cobrança    ▸        │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ 👥 Equipe (Plano Studio)            │
│ ┌─────────────────────────────────┐ │
│ │ + Convidar profissional         │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ ❓ Ajuda e Suporte                  │
│ ┌─────────────────────────────────┐ │
│ │ Central de Ajuda                │ │
│ │ Falar com Suporte (WhatsApp)    │ │
│ │ Sugerir Melhoria                │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [Sair da conta]  ← Destructive      │
└─────────────────────────────────────┘
```

### Notificações
```
┌─────────────────────────────────────┐
│ ◀ Notificações               ✕     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ [🔔] Push                       │ │
│ │     Receber notificações push   │ │
│ ├─────────────────────────────────┤ │
│ │ [📧] E-mail                     │ │
│ │     Resumos semanais + alertas  │ │
│ ├─────────────────────────────────┤ │
│ │ [💬] WhatsApp                   │ │
│ │     Lembretes + confirmações    │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Lembretes Automáticos               │
│ ┌─────────────────────────────────┐ │
│ │ [☑] 24h antes                   │ │
│ │ [☑] 2h antes                    │ │
│ │ [☑] Pós-atendimento (+2h)       │ │
│ │ [☑] Reativação 45d sem agendar  │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Marketing                           │
│ ┌─────────────────────────────────┐ │
│ │ [☑] Novidades e dicas           │ │
│ │ [☐] Promoções parceiros         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### WhatsApp (Evolution API)
```
┌─────────────────────────────────────┐
│ ◀ WhatsApp                   ✕     │
├─────────────────────────────────────┤
│ Status: 🟢 Conectado                │
│ Instância: maria-nails              │
├─────────────────────────────────────┤
│ Templates Aprovados (Meta)          │
│ ┌─────────────────────────────────┐ │
│ │ ✅ Confirmação Agendamento      │ │
│ │    "Olá {{cliente_nome}}, seu   │ │
│ │    agendamento para {{data}}..." │ │
│ ├─────────────────────────────────┤ │
│ │ ✅ Lembrete 24h                 │ │
│ │    "Oi {{cliente_nome}}, lembre │ │
│ │    te de seu agendamento amanhã"│ │
│ ├─────────────────────────────────┤ │
│ │ ✅ Lembrete 2h                  │ │
│ │    "{{cliente_nome}}, seu       │ │
│ │    agendamento é em 2h!"        │ │
│ ├─────────────────────────────────┤ │
│ │ ⏳ Pós-atendimento              │ │
│ │    Aguardando aprovação Meta    │ │
│ ├─────────────────────────────────┤ │
│ │ ⏳ Reativação 45d               │ │
│ │    Em revisão                   │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [Testar conexão] [Reconectar QR]    │
│ [Solicitar novo template]           │
└─────────────────────────────────────┘
```

### Plano e Cobrança
```
┌─────────────────────────────────────┐
│ ◀ Plano Pro                   ✕     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 💎 PRO       R$ 49,90/mês       │ │
│ │ Próxima cobrança: 01/02/2025    │ │
│ │ [Gerenciar assinatura]          │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Incluído no Pro:                    │
│ ┌─────────────────────────────────┐ │
│ │ ☑ Agendamentos ilimitados       │ │
│ │ ☑ Anamnese digital + PDF        │ │
│ │ ☑ Galeria ilimitada             │ │
│ │ ☑ Feed inspiração + pastas      │ │
│ │ ☑ Financeiro completo + DRE     │ │
│ │ ☑ WhatsApp (500 msgs/mês)       │ │
│ │ ☑ Backup nuvem + Sync           │ │
│ │ ☑ Suporte prioritário           │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [Upgrade Studio]  [Cancelar plano]  │
└─────────────────────────────────────┘
```

### Equipe (Plano Studio)
```
┌─────────────────────────────────────┐
│ ◀ Minha Equipe                ✕     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 👑 Maria Santos (Owner)         │ │
│ │    Acesso total                 │ │
│ ├─────────────────────────────────┤ │
│ │ 👤 Ana Costa (Professional)     │ │
│ │    Agenda + Clientes + Galeria  │ │
│ ├─────────────────────────────────┤ │
│ │ 👤 Julia Lima (Receptionist)    │ │
│ │    Agenda + Clientes (leitura)  │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [+ Convidar membro]                 │
│    Email: [____________]            │
│    Role: [Profissional ▼]           │
│    Permissões: [Personalizar ▸]     │
│    [Enviar convite]                 │
└─────────────────────────────────────┘
```

### Tema
```
┌─────────────────────────────────────┐
│ ◀ Aparência                   ✕     │
├─────────────────────────────────────┤
│ Tema do App                         │
│ ┌─────────────────────────────────┐ │
│ │ ☐ Sistema (automático)          │ │
│ │ ☑ Claro                         │ │
│ │ ☐ Escuro                        │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Cor de Destaque                     │
│ ┌─────────────────────────────────┐ │
│ │ 🟣 Roxo (padrão)  🩷 Coral      │ │
│ │ 🔵 Azul  🟢 Verde  🟠 Laranja   │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Componentes
- ProfileHeader (avatar, nome, handle, plano badge)
- MetricsRow (3 KPIs)
- SettingsList (navegação ícones + chevron)
- ToggleSwitch (on/off animado)
- TemplateCard (status badge, preview)
- PlanCard (preço, features, CTA)
- TeamMemberCard (avatar, role, permissions)
- InviteMemberForm (email, role select, permissions)
- ThemeSelector (radio cards)

## Estados
- Loading: Skeleton profile
- WhatsApp desconectado: Badge vermelho + [Conectar]
- Plano trial: Badge "14 dias grátis" + countdown
- Convite pendente: Badge "Pendente" no membro

## Ações Thumb Zone
- Editar perfil
- Toggle notificações
- Testar WhatsApp
- Gerenciar assinatura
- Convidar equipe
- Sair conta (destructive, confirmação)
