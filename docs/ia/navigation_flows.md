# Fluxos de Navegação - Deep Links & Modal Stacks

## 1. Deep Link Schema

### Mobile App (Custom URL Scheme)
```
manidesigners://<tab>/<route>[?params]

Tabs: today | agenda | clients | finance | feed | profile
```

| Deep Link | Destino | Parâmetros |
|-----------|---------|------------|
| `manidesigners://today` | Tab Hoje | - |
| `manidesigners://agenda/week` | Agenda Semana | `date=YYYY-MM-DD` |
| `manidesigners://agenda/day/2025-01-15` | Agenda Dia | - |
| `manidesigners://agenda/create` | Criar Agendamento | `clientId`, `serviceId`, `date`, `time` |
| `manidesigners://agenda/detail/{id}` | Detalhe Agendamento | - |
| `manidesigners://agenda/checkin/{id}` | Check-in Direto | - |
| `manidesigners://clients` | Lista Clientes | `search`, `filter`, `sort` |
| `manidesigners://clients/create` | Novo Cliente | `phone`, `name` (prefill) |
| `manidesigners://clients/{id}` | Perfil Cliente | `tab=summary|appointments|gallery|anamnese|finance` |
| `manidesigners://clients/{id}/anamnese` | Anamnese Cliente | `mode=view|edit|share` |
| `manidesigners://clients/{id}/gallery` | Galeria Cliente | `filter=before|during|after` |
| `manidesigners://finance/dashboard` | Financeiro Dashboard | - |
| `manidesigners://finance/launch` | Lançamento Rápido | `type=income|expense`, `amount`, `categoryId`, `clientId` |
| `manidesigners://finance/dre` | DRE | `period=month|quarter|year`, `date=YYYY-MM` |
| `manidesigners://finance/tax` | Impostos | - |
| `manidesigners://feed` | Feed Para Você | `filter=style|color|technique|occasion` |
| `manidesigners://feed/saved` | Feed Salvas | `folderId` |
| `manidesigners://feed/folders` | Pastas | - |
| `manidesigners://feed/post/{id}` | Detalhe Post | - |
| `manidesigners://feed/prebook/{postId}` | Pré-Agenda do Post | `clientId` |
| `manidesigners://profile` | Perfil | `section=account|studio|plan|settings|support` |
| `manidesigners://onboarding` | Onboarding | `step=1|2|3|4|5` |
| `manidesigners://anamnese/{token}` | Anamnese Pública (Cliente) | `token` (JWT, expira 7 dias) |

### Admin Web (HTTPS)
```
https://admin.manidesigners.com/<module>/<route>[?params]
```

| Deep Link | Destino | Parâmetros |
|-----------|---------|------------|
| `/dashboard` | Dashboard | `period=7d|30d|90d` |
| `/agenda?view=week&date=2025-01-15` | Agenda Semana | `view=week|day|month|list`, `professionalId` |
| `/agenda/day/2025-01-15` | Agenda Dia | `professionalId` |
| `/agenda/appointment/{id}` | Detalhe Agendamento (Side Panel) | - |
| `/agenda/create` | Novo Agendamento (Modal) | `clientId`, `serviceId`, `date`, `time`, `professionalId` |
| `/clients` | Lista Clientes | `search`, `status`, `tags`, `sort`, `page` |
| `/clients/create` | Novo Cliente (Modal) | `phone`, `name` |
| `/clients/{id}` | Detalhe Cliente (Side Panel/Página) | `tab=summary|appointments|gallery|anamnese|finance|communication|preferences|notes` |
| `/clients/{id}/anamnese` | Anamnese (Modal) | `versionId` |
| `/finance` | Financeiro Dashboard | - |
| `/finance/launch` | Lançamento Rápido (Modal) | `type`, `amount`, `categoryId`, `clientId`, `appointmentId` |
| `/finance/dre` | DRE | `period`, `date`, `compare=true` |
| `/finance/tax` | Impostos | `regime=mei|simples|presumed` |
| `/finance/cashier` | Caixa Diário | `date=YYYY-MM-DD` |
| `/gallery` | Galeria Global | `clientId`, `serviceId`, `tags`, `dateFrom`, `dateTo` |
| `/gallery/client/{id}` | Galeria Cliente | `groupBy=date|service` |
| `/feed` | Gestão Feed | `status=pending|approved|rejected`, `source` |
| `/feed/folders` | Pastas Feed | - |
| `/settings` | Configurações | `section=general|team|professionals|services|notifications|integrations|lgpd|appearance|billing` |

---

## 2. Modal Stacks - Mobile

### Stack Principal (Tab Navigator)
```
Root: Tab Navigator (Hoje | Agenda | Clientes | Financeiro | Feed | Perfil)
  Cada tab = Stack Navigator independente
```

### Stack Agenda
```
AgendaStack:
├── AgendaWeek (Initial)          // Tela Semana
│   ├── AgendaDay                 // Push: Tap dia
│   │   ├── AppointmentDetail     // Push: Tap slot
│   │   │   ├── AppointmentEdit   // Modal Full: Editar
│   │   │   ├── CheckInFlow       // Modal: Check-in → Atendimento → Pagamento
│   │   │   │   ├── AttendanceScreen    // Timer, Checklist, Fotos
│   │   │   │   └── PaymentModal        // PIX/Cartão/Dinheiro/Parcelado
│   │   │   └── ReceiptPreview          // Modal: Comprovante PDF
│   │   └── CreateAppointment   // Modal Sheet: Novo Agendamento
│   │       ├── ClientSearch    // Modal: Buscar/Selecionar Cliente
│   │       │   └── CreateClient        // Modal: Criar Cliente Rápido
│   │       ├── ServiceSelect   // Modal: Multi-select Serviços
│   │       └── DateTimePicker  // Modal: Data/Hora
│   └── AppointmentCreate       // FAB: + Novo (Entry point alternativo)
└── SettingsAgenda              // Push: Configurações Agenda
```

### Stack Clientes
```
ClientsStack:
├── ClientsList (Initial)       // Lista com Busca/Filtros
│   ├── ClientProfile           // Push: Tap cliente
│   │   ├── ClientEdit          // Modal Sheet: Editar
│   │   ├── ClientAppointments  // Tab interno: Histórico
│   │   ├── ClientGallery       // Tab interno: Galeria (Ver GaleriaStack)
│   │   ├── ClientAnamnese      // Tab interno: Anamnese
│   │   │   ├── AnamneseShare   // Modal: Gerar Link + WhatsApp
│   │   │   ├── AnamnesePDF     // Modal: Visualizar PDF
│   │   │   └── AnamneseEdit    // Modal: Editar (3 Steps)
│   │   └── ClientFinance       // Tab interno: Financeiro
│   └── CreateClient            // Modal Sheet: Novo Cliente (FAB)
└── ImportContacts              // Push: Importar Contatos
```

### Stack Financeiro
```
FinanceStack:
├── FinanceDashboard (Initial)  // Cards + Gráficos + Alertas
│   ├── LaunchCreate            // Modal Sheet: Lançamento Rápido
│   │   ├── CategorySelect      // Modal: Árvore Categorias
│   │   ├── InstallmentConfig   // Modal: Parcelamento
│   │   └── AttachmentPicker    // Modal: Anexos
│   ├── FinanceReports          // Push: Relatórios
│   │   ├── DREScreen           // Push: DRE Detalhado
│   │   ├── CashFlowScreen      // Push: Fluxo Caixa
│   │   ├── ClientReportScreen  // Push: Por Cliente
│   │   └── ServiceReportScreen // Push: Por Serviço
│   ├── TaxScreen               // Push: Impostos
│   │   ├── TaxConfig           // Modal: Configurar Regime/% 
│   │   └── DASGenerator        // Modal: Gerar DAS
│   ├── CashierScreen           // Push: Caixa Diário
│   │   ├── CashierClose        // Modal: Fechar Caixa
│   │   └── CashierHistory      // Push: Histórico Fechamentos
│   └── FinanceSettings         // Push: Config Financeiro
```

### Stack Feed
```
FeedStack:
├── FeedHome (Initial)          // Tabs: Para Você | Salvas | Pastas
│   ├── PostDetail              // Push: Tap Card
│   │   ├── PostSaveModal       // Modal: Selecionar/Nova Pasta
│   │   ├── PreBookModal        // Modal: "Quero Esta" → Pré-Agenda
│   │   │   ├── ClientSelect    // Modal: Selecionar Cliente
│   │   │   ├── ServiceSuggest  // Modal: IA Sugere Serviços
│   │   │   └── DateTimePick    // Modal: Data/Horário
│   │   └── ShareSheet          // Native Share: WhatsApp/Instagram/Link
│   ├── FeedFolders             // Push: Aba Pastas
│   │   ├── FolderDetail        // Push: Tap Pasta
│   │   │   └── PostDetail      // Push: Tap Post na Pasta
│   │   └── FolderCreate        // Modal: Nova Pasta
│   └── FeedFilters             // Modal Bottom Sheet: Filtros (Chips)
```

### Stack Perfil
```
ProfileStack:
├── ProfileHome (Initial)       // Header + Menu Sections
│   ├── StudioSettings          // Push: Meu Estúdio
│   ├── AccountSettings         // Push: Minha Conta
│   │   ├── ChangePassword      // Modal: Alterar Senha
│   │   ├── TwoFactorSetup      // Modal: 2FA
│   │   └── Devices             // Push: Dispositivos
│   ├── PlanScreen              // Push: Assinatura/Plano
│   │   ├── Checkout            // Modal/WebView: Pagamento
│   │   └── InvoiceHistory      // Push: Faturas
│   ├── AppSettings             // Push: Configurações App
│   │   ├── NotificationsSettings // Push: Notificações
│   │   ├── ThemeSettings       // Modal: Tema/Idioma/Unidades
│   │   └── OfflineSettings     // Push: Modo Offline
│   ├── SupportScreen           // Push: Suporte
│   │   ├── HelpCenter          // Push: FAQ
│   │   ├── ChatSupport         // Modal: Chat
│   │   └── BugReport           // Modal: Reportar Bug
│   └── AboutScreen             // Push: Sobre
```

### Stack Onboarding (Linear, Bloqueia Navegação)
```
OnboardingStack:
├── WelcomeScreen (Initial)     // Não pode voltar
├── Step1Profile                // Next only
├── Step2Services               // Next only (min 3 serviços)
├── Step3FirstClient            // Next only
├── Step4FirstAppointment       // Next only
├── Step5GuidedTour             // Next only (Tooltips interativos)
└── OnboardingComplete          // Replace Root → Tab Navigator
```

---

## 3. Modal Stacks - Admin Web

### Navegação Principal (Sidebar + Content Area)
```
Layout: Sidebar (Fixed) + Topbar + Content Area
Content Area = Router Outlet (Páginas Principais)
```

### Side Panels (Right, 380-400px, Non-blocking)
```
Trigger: Click item em Data Table / Grid / Lista
Behavior: Slide right, overlay backdrop (click fora fecha), não bloqueia scroll principal
Máximo: 1 Side Panel aberto por vez

Exemplos:
- /agenda → Click appointment → Side Panel AppointmentDetail
- /clients → Click client → Side Panel ClientDetail (Tabs internos)
- /finance → Click launch → Side Panel LaunchDetail
- /gallery → Click photo → Side Panel PhotoDetail
```

### Modais Centralizados (Blocking, Focus Trap)
```
Trigger: Ações complexas, confirmações críticas, formulários multi-step
Behavior: Centered, backdrop blur, ESC/Backdrop click fecha (se não dirty), focus trap

Stack Modal (Máx 2 simultâneos):
Nível 1: Modal Principal (ex: Criar Agendamento)
Nível 2: Modal Filha (ex: Buscar Cliente dentro de Criar Agendamento)
Nível 3: Apenas Toasts/Alerts (Não modais)

Exemplos:
- CreateAppointmentModal
  └── ClientSearchModal
      └── CreateClientModal
- LaunchCreateModal
  └── CategoryTreeModal
  └── InstallmentConfigModal
- BulkActionConfirmModal (Excluir 50 clientes)
- AnamneseEditModal (3 Steps Wizard)
```

### Drawers (Bottom Sheet Mobile / Right Panel Desktop)
```
Trigger: Filtros avançados, Importação, Configurações complexas
Mobile: Bottom Sheet (50%/90%/full), swipe down fecha
Desktop: Right Panel (mesmo estilo Side Panel mas para formulários)

Exemplos:
- AdvancedFiltersDrawer (Agenda, Clientes, Financeiro, Galeria)
- ImportContactsDrawer (CSV Mapping, Preview, Confirm)
- FeedFiltersDrawer (Chips horizontais scroll)
```

### Toasts & Notificações (Non-blocking)
```
Position: Top-right (Desktop), Top-center (Mobile)
Types: Success, Error, Warning, Info, Action
Duration: 4s (auto-dismiss), Persistent se Action
Action: Undo, View, Dismiss

Stack: Máx 3 simultâneos, queue se mais
```

---

## 4. Navigation Guards & Interceptors

### Auth Guard (Todas Rotas Protegidas)
```
Mobile: Verifica token Supabase no storage
  - Válido → Permite
  - Expirado → Tenta refresh → Se falha → Redirect onboarding/login
  - Sem token → Redirect onboarding (se first) ou login

Admin: Verifica session NextAuth
  - Válida → Permite
  - Expirada → Redirect /auth/signin?callbackUrl=original
```

### Onboarding Guard (Mobile)
```
Intercepta: Qualquer navegação se onboarding incompleto
Verifica: AsyncStorage @manidesigners/onboarding_complete
Se false: Redirect manidesigners://onboarding (replace history)
Exceções: Deep link anamnese público (token válido)
```

### Role Guard (Admin)
```
Verifica: user.role no session
Rotas:
  - /settings/team, /settings/billing → owner, admin
  - /settings/integrations → owner, admin
  - /finance/tax → owner, admin, financeiro
  - /agenda → all (mas filtra por professionalId se role=profissional)
  - /clients → all (mas export/import → admin+)
```

### Offline Guard
```
Mobile: NetInfo listener global
Online → Sync queue → Toast "Sincronizado"
Offline → Banner persistente "Modo Offline" + Queue writes local
Navegação: Permite leitura cache, bloqueia writes server (com feedback)
```

### Deep Link Handler
```
Mobile (Linking):
  - App closed: Cold start → Parse URL → Navigate after auth/onboarding
  - App open: Foreground → Parse URL → Navigate (preserve stack se possível)
  - Anamnese token: Valida JWT → Abre fluxo público (sem auth)

Admin (Next.js):
  - Middleware: Parse params → Inject em pageProps
  - Client-side: Router.push com shallow=true se mesma página
```

---

## 5. State Preservation & Restoration

### Mobile (React Navigation + Persist)
```
Persist: AsyncStorage @manidesigners/nav_state
Inclui: Tab ativo, Stacks por tab (routes + params), Scroll position
Restore: App launch → Hydrate navigation state → Navega para rota salva
Limpeza: Logout → Clear persist → Reset root
```

### Admin (URL State + LocalStorage)
```
URL: Todos filtros, paginação, ordenação, view mode em query params
LocalStorage: 
  - Sidebar collapsed state
  - Table column visibility/order
  - Dashboard widget layout
  - Theme preference
Restore: Page load → Read URL → Apply filters → Read LS → Apply UI prefs
```

---

## 6. Transition Animations

### Mobile (React Navigation Defaults + Custom)
```
Tab Switch: Fade + Slide horizontal (300ms)
Stack Push: Slide from right (iOS) / Fade + Scale (Android) (250ms)
Modal: Slide up from bottom (300ms) + Backdrop fade
Side Panel (Drawer): Slide from right (250ms)
Bottom Sheet: Slide up with spring (400ms)
Dismiss: Reverse animations
Reduced Motion: Respeita preferência sistema (0ms)
```

### Admin (Framer Motion / CSS)
```
Page Transition: Fade 150ms + Slide Y 10px
Side Panel: Slide X 200ms cubic-bezier(0.4, 0, 0.2, 1)
Modal: Scale 0.95→1 + Fade 150ms + Backdrop blur
Drawer: Slide Y 300ms (mobile) / Slide X 200ms (desktop)
Toast: Slide X + Fade 200ms, exit Slide X + Fade 150ms
Loading: Skeleton screens (não spinner) para perceived performance
```

---

## 7. Accessibility Navigation

### Focus Management
```
Modal Open: Focus primeiro elemento focável (input, button, link)
Modal Close: Focus retorna trigger element
Side Panel: Focus primeiro heading (h1) ou close button
Tab Switch: Focus primeiro heading da nova tab
Deep Link: Focus elemento alvo (scroll into view + focus)
```

### Keyboard Navigation
```
Tab: Ordem lógica (topo→baixo, esquerda→direita)
Shift+Tab: Reverso
Enter/Space: Ativar botões/links
ESC: Fechar modal/drawer/side panel/backdrop
Arrow Keys: Navegar grids, tabs, selects, date pickers
Home/End: Início/fim listas
Page Up/Down: Scroll rápido
```

### Screen Reader
```
Live Regions: Toasts, loading states, erros de validação (polite)
ARIA Labels: Icon buttons, tabs, accordions, custom controls
Headings: Hierarquia h1-h6 sem pular níveis
Landmarks: main, nav, aside, header, footer, section
```

---

## 8. Error & Edge Case Navigation

| Cenário | Comportamento |
|---------|---------------|
| Deep link ID inexistente | Toast "Não encontrado" → Redirect lista correspondente |
| Token anamnese expirado | Tela erro amigável → Botão "Solicitar novo link" |
| Navegação offline (write) | Queue local + Toast "Salvo offline, sincronizará ao conectar" |
| Sessão expirada mid-flow | Salvar estado formulário → Redirect login → Restore estado |
| Conflito agendamento (drag) | Shake visual + Toast "Conflito com [Cliente] às HH:MM" + Revert |
| Modal sujo + Backdrop click | Confirm modal "Perder alterações?" → Sim: fecha + descarta |
| Múltiplos deep links rápidos | Queue → Processa sequencial (ultimo vence para mesma tab) |
| App kill mid-onboarding | Persist step → Resume no step ao reabrir |

---

## 9. Analytics Events (Navigation)

```typescript
// Eventos padrão para todos navegations
interface NavEvent {
  event: 'navigate';
  from: string;           // Rota origem
  to: string;             // Rota destino
  method: 'tap' | 'deeplink' | 'push' | 'back' | 'tab' | 'redirect';
  duration_ms?: number;   // Tempo transição
  payload?: Record<string, any>; // Params, IDs
}

// Exemplos
{ event: 'navigate', from: 'agenda_week', to: 'appointment_detail', method: 'tap', payload: { appointmentId: 'uuid' } }
{ event: 'navigate', from: 'external', to: 'anamnese_public', method: 'deeplink', payload: { token: 'jwt' } }
{ event: 'navigate', from: 'clients_list', to: 'client_profile', method: 'tap', payload: { clientId: 'uuid', tab: 'gallery' } }
```