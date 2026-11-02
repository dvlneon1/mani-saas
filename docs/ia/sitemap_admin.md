# Sitemap Admin Web - Painel Gestão Nail Designers

## Estrutura Global (Sidebar + Topbar)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ☰  MANI DESIGNERS ADMIN          [Busca Global]  [Notificações]  [Perfil]  │
├──────────────────┬──────────────────────────────────────────────────────────┤
│                  │                                                          │
│   NAVEGAÇÃO      │          CONTEÚDO PRINCIPAL                              │
│   (Sidebar)      │                                                          │
│                  │                                                          │
│  📊 Dashboard    │                                                          │
│  📅 Agenda       │                                                          │
│  👥 Clientes     │                                                          │
│  💰 Financeiro   │                                                          │
│  🖼️ Galeria      │                                                          │
│  📱 Feed         │                                                          │
│  ⚙️ Configurações│                                                          │
│                  │                                                          │
└──────────────────┴──────────────────────────────────────────────────────────┘
```

---

## 1. DASHBOARD (Visão Geral Executiva)
```
DASHBOARD
├── KPIs Principais (Row 4 Cards)
│   ├── Agendamentos Hoje | Semana | Mês
│   ├── Receita Hoje | Semana | Mês | Mês Anterior
│   ├── Clientes Ativos | Novos Mês | Churn Rate
│   └── Ocupação Agenda % | Ticket Médio
├── Gráficos (Row 2 Charts)
│   ├── Receita 30 Dias (Linha) + Meta
│   └── Agendamentos por Status (Donut)
├── Tabelas Resumo
│   ├── Próximos Agendamentos (5) → Link Agenda
│   ├── Clientes Aniversariantes (5) → Link Clientes
│   ├── Lançamentos Pendentes Conciliação (5) → Link Financeiro
│   └── Top 5 Serviços Mais Vendidos
├── Alertas Críticos
│   ├── Caixa Negativo Projetado
│   ├── Imposto Vencendo (3 dias)
│   ├── Clientes Sem Visita > 60 dias
│   └── Anamneses Pendentes > 7 dias
└── Ações Rápidas (Floating/Bottom)
    ├── + Agendamento
    ├── + Cliente
    ├── + Lançamento
    └── Fechar Caixa Dia
```

---

## 2. AGENDA (Gestão Completa)
```
AGENDA
├── Visualizações (Tabs Topo)
│   ├── Semana (Default) - Grid Profissionais x Horários
│   ├── Dia - Lista Detalhada Horária
│   ├── Mês - Calendário Densidade
│   └── Lista - Todos Agendamentos (Filtros Avançados)
├── Barra Superior
│   ├── Navegação Data (◀ Hoje ▶)
│   ├── Filtros: Profissional, Status, Serviço, Sala
│   ├── Busca: Cliente, Telefone, Observação
│   ├── View: Compact/Confortável
│   └── Exportar: PDF/CSV/ICS
├── Grid Semana/Dia
│   ├── Slot: Cliente + Serviço + Duração + Status Badge
│   ├── Cores: Por Serviço / Por Profissional / Por Status
│   ├── Drag & Drop: Mover Horário, Trocar Profissional, Estender
│   ├── Click → Side Panel Detalhe (Não Modal)
│   └── Contexto Vazio: "Arraste aqui para agendar" / "+ Novo"
├── Side Panel Detalhe (Direita - 400px)
│   ├── Cliente: Nome, Telefone, Tags, Histórico Rápido
│   ├── Serviços: Lista + Preço Total + Tempo Total
│   ├── Status: Badge + Dropdown Ações
│   ├── Checklist Atendimento (Templates por Serviço)
│   ├── Fotos Antes/Durante/Depois (Miniaturas)
│   ├── Pagamento: Status + Valor + Método + Parcelas
│   ├── Observações Internas / Cliente
│   ├── Histórico: Log Alterações + Quem/Quando
│   └── Ações: Editar, Duplicar, Cancelar, Reagendar, Imprimir
├── Modal Criar/Editar Agendamento
│   ├── Multi-select Clientes (Busca + Criar Rápido)
│   ├── Multi-select Serviços (Com Auto-duração/Preço)
│   ├── Data/Hora Início + Duração Calculada
│   ├── Profissional + Sala/Recurso
│   ├── Recorrência: Nenhuma/Semanal/Quinzenal/Mensal
│   ├── Lembretes: 24h/2h/30min (Push/Whatsapp/Email)
│   ├── Observações + Checklist Inicial
│   └── Salvar → Conflito Check → Confirmação
├── Gestão Recursos (Sub-menu)
│   ├── Profissionais: CRUD, Horários, Comissão, Férias
│   ├── Salas/Estações: CRUD, Equipamentos, Capacidade
│   └── Serviços: CRUD, Preço, Duração, Cor, Comissão %
└── Relatórios Agenda
    ├── Ocupação por Profissional/Sala/Período
    ├── Tempo Ocioso vs Produtivo
    ├── No-show Rate por Cliente/Profissional
    └── Receita por Horário (Heatmap)
```

---

## 3. CLIENTES (CRM Completo)
```
CLIENTES
├── Lista Principal (Data Table Avançada)
│   ├── Colunas: Foto, Nome, Telefone, Email, Tags, Status, Última Visita, Total Gasto, Frequência, Ações
│   ├── Filtros Sidebar: Status, Tags, Faixa Valor, Última Visita, Anamnese, Fonte
│   ├── Busca Global: Nome, Telefone, Email, CPF, Instagram
│   ├── Ordenação: Qualquer Coluna (Multi-sort)
│   ├── Seleção Múltipla: Ações em Lote (Tag, Exportar, WhatsApp, Arquivar)
│   ├── Paginação: 25/50/100 | Virtual Scroll
│   └── Empty State: "Nenhum cliente. Importe contatos ou adicione manualmente."
├── Toolbar Superior
│   ├── + Novo Cliente
│   ├── Importar: CSV, WhatsApp Business, Google Contacts, Excel
│   ├── Exportar: CSV, Excel, PDF (Ficha Cliente)
│   ├── Segmentar: Criar Lista Dinâmica
│   └── Configurar Colunas
├── Detalhe Cliente (Drawer Direita / Página Dedicada)
│   ├── Header: Foto, Nome, Contatos, Tags, Status, Score Fidelidade
│   ├── Abas:
│   │   ├── Resumo: KPIs, Timeline Atividade, Próximos Agendamentos
│   │   ├── Agendamentos: Histórico Completo + Filtros + Exportar
│   │   ├── Galeria: Timeline Fotos + Comparação + Gerenciar
│   │   ├── Anamnese: Versões, PDF, Status, Enviar Link
│   │   ├── Financeiro: Extrato, Débitos, Créditos, Parcelas, Limite
│   │   ├── Comunicação: WhatsApp Log, Emails, SMS, Campanhas
│   │   ├── Preferências: Serviços Fav, Profissional Fav, Horários, Alergias
│   │   └── Notas Internas: CRM Notes, Tags Privadas, Alertas
│   └── Ações Flutuantes: Agendar, WhatsApp, Ligar, Editar, Arquivar
├── Modal Criar/Editar Cliente
│   ├── Básico: Nome*, Telefone*, Email, CPF, Data Nasc, Foto
│   ├── Contato: WhatsApp, Instagram, Endereço, Como Conheceu
│   ├── Preferências: Serviços, Profissional, Horários, Formato Unha
│   ├── Saúde: Alergias, Medicamentos, Patologias, Gestante
│   ├── Financeiro: Limite Crédito, Forma Pagto Preferida, Desconto %
│   ├── LGPD: Termos Aceitos, Data, Consentimento Fotos/Marketing
│   └── Tags: Sistema + Personalizadas (Cor + Ícone)
├── Segmentação/Listas Inteligentes
│   ├── Criar Segmento: Query Builder Visual
│   ├── Segmentos Sugeridos: VIP, Risco Churn, Aniversariantes, Inativos
│   ├── Ações: Campanha WhatsApp, Exportar, Tag, Agendar Lembrete
│   └── Automações: Gatilho → Ação (Ex: 30 dias sem visita → WhatsApp)
└── Importação/Exportação
    ├── Mapeamento Campos Visual
    ├── Validação Duplicatas (Telefone/CPF/Email)
    ├── Log Importações + Rollback
    └── Template CSV/Excel Download
```

---

## 4. FINANCEIRO (Gestão Financeira Completa)
```
FINANCEIRO
├── Dashboard Financeiro
│   ├── Cards: Saldo Total, A Receber, A Pagar, Reserva Imposto, Caixa Dia
│   ├── Gráficos: Fluxo Caixa 12M, DRE Resumido, Top Categorias
│   ├── Conciliação Pendente (Contador + Link)
│   └── Alertas: Vencimentos, Caixa Baixo, Imposto
├── Lançamentos (Contas a Pagar/Receber)
│   ├── Lista Unificada com Filtros: Tipo, Categoria, Status, Período, Cliente, Agendamento
│   ├── Toolbar: + Lançamento, + Recorrente, Importar OFX/CSV, Exportar
│   ├── Inline Edit: Status, Data Pagamento, Valor, Categoria
│   ├── Parcelamento: Visualizar Parcelas, Editar Individual, Baixa Parcial
│   ├── Vinculação: Agendamento, Cliente, Fornecedor (Opcional)
│   ├── Anexos: Comprovante, Nota Fiscal, Boleto (Upload/Visualizar)
│   └── Conciliação: Match Bancário (Manual/Automático OFX)
├── Lançamento Rápido (Modal/Slide-over)
│   ├── Tipo: Entrada / Saída / Transferência
│   ├── Categoria: Árvore Hierárquica (Serviços > Unhas > Gel)
│   ├── Valor + Data Competência + Data Pagamento
│   ├── Parcelado: Sim → Qtd, Intervalo, Juros, Primeira Parcela
│   ├── Cliente/Fornecedor (Autocomplete)
│   ├── Centro Custo / Tag Projeto
│   ├── Observação + Anexos (Drag Drop)
│   └── Recorrente: Mensal, Fixo, Fim/Indeterminado
├── DRE (Demonstrativo Resultado Exercício)
│   ├── Mensal/Trimestral/Anual + Comparativo Ano Anterior
│   ├── Estrutura: Receitas → Custos Diretos → Lucro Bruto → Despesas → Lucro Líquido
│   ├── Drill-down: Clicar Categoria → Lançamentos
│   ├── % sobre Receita / Variação %
│   ├── Exportar: PDF Formatado, Excel Raw, Imagem
│   └── Comentários/Notas por Período
├── Fluxo de Caixa
│   ├── Realizado vs Projetado (Base: Lançamentos + Recorrentes + Agendamentos Futuros)
│   ├── Visão: Diária, Semanal, Mensal
│   ├── Projeção: 30/60/90/180 dias
│   ├── Cenários: Otimista/Realista/Pessimista
│   └── Alertas: Saldo Negativo Projetado
├── Impostos
│   ├── Configuração Regime: MEI, Simples Nacional (Anexos), Lucro Presumido/Real
│   ├── Cálculo Automático: % por Entrada (Configurável por Categoria)
│   ├── Reserva: Saldo Atual vs Necessário (Barra Progresso)
│   ├── DAS/Guias: Gerar, Visualizar, Marcar Pago, Anexo Comprovante
│   ├── Calendário: Vencimentos Mensais + Avisos Antecipados
│   ├── Relatório: Apuração Mensal + Anual
│   └── Contador: Acesso Leitura/Escrita Convidado
├── Caixa Diário
│   ├── Abertura: Saldo Inicial + Sangria/Suprimento
│   ├── Lançamentos do Dia (Tempo Real)
│   ├── Fechamento: Contagem Espécie, Cartão, PIX, Total Sistema vs Real
│   ├── Diferença: Quebra Caixa (Registrar Motivo)
│   ├── Histórico Fechamentos + Assinatura Responsável
│   └── Relatório Diário PDF
├── Relatórios Gerenciais
│   ├── Por Cliente: Ticket Médio, LTV, Frequência, Última Compra
│   ├── Por Serviço: Quantidade, Receita, Margem, Ocupação
│   ├── Por Profissional: Produção, Comissão, Eficiência
│   ├── Por Categoria: Receitas/Despesas Detalhadas
│   ├── Inadimplência: Aging, Top Devedores, Ações Cobrança
│   └── Custom Report Builder (Arrastar Soltar)
└── Configurações Financeiro
    ├── Categorias: CRUD Hierárquico, Cores, Ícones, % Imposto
    ├── Formas Pagamento: PIX, Cartão (Taxas), Dinheiro, Boleto, Convênio
    ├── Contas Bancárias: CRUD, Saldo Inicial, Cor, Ícone
    ├── Centros Custo: CRUD
    ├── Automações: Lançamento Recorrente, Reserva Imposto, Comissão
    └── Permissões: Ver/Editar/Excluir por Role
```

---

## 5. GALERIA (Gestão Visual Centralizada)
```
GALERIA
├── Visão Global (Todos Clientes)
│   ├── Grid/Masonry: Fotos Recentes Primeiro
│   ├── Filtros: Cliente, Serviço, Tag, Data, Profissional, Público/Privado
│   ├── Busca: Legenda, Tags, Cliente
│   ├── Seleção Múltipla: Baixar ZIP, Mover, Tag, Excluir, Publicar Feed
│   └── Upload Múltiplo: Drag Drop + Progresso
├── Por Cliente (Link do CRM)
│   ├── Timeline Cronológica
│   ├── Agrupamento: Por Serviço / Por Mês
│   ├── Comparação Antes/Depois (Slider)
│   ├── Capa Perfil: Definir Foto Principal
│   └── Compartilhar: Link Público Cliente (Senha Opcional)
├── Metadados Foto
│   ├── EXIF: Data, Câmera, Local (Opcional)
│   ├── Tags: Sistema (Antes/Durante/Depois) + Personalizadas
│   ├── Serviço Vinculado
│   ├── Profissional
│   ├── Produtos Usados (Marcas/Cores)
│   ├── Legenda + Hashtags
│   ├── Visibilidade: Privado / Cliente / Público / Feed
│   └── Direitos: Autor, Consentimento Cliente Assinado
├── Editor Básico
│   ├── Cortar/Rotacionar
│   ├── Filtros: Clareza, Contraste, Saturação (Presets Unhas)
│   ├── Marca D'Água Automática (Logo Estúdio)
│   └── Redimensionar: Stories, Feed, Thumbnail
└── Integração Feed
    ├── Publicar no Feed Interno
    ├── Agendar Post Feed
    └── Hashtags Sugeridas por IA
```

---

## 6. FEED (Curadoria Inspiração)
```
FEED
├── Gestão Conteúdo (Admin)
│   ├── Fontes: Instagram Hashtags, Perfis, Upload Manual, IA Gerativo
│   ├── Moderação: Fila Aprovação (Pendente/Aprovado/Rejeitado)
│   ├── Categorização: Auto-tags IA + Manual
│   ├── Agendamento Posts: Data/Hora, Recorrência
│   └── Métricas: Visualizações, Saves, "Quero Esta", Compartilhamentos
├── Pastas Sistema
│   ├── Criar/Gerenciar Pastas Temáticas
│   ├── Pastas Públicas (Todas veem) vs Privadas (Admin)
│   ├── Capa + Descrição + Ordem
│   └── Compartilhar Link Público
├── Algoritmo "Para Você"
│   ├── Configurar Pesos: Curtidas, Saves, Tempo Visualização, Perfil Cliente
│   ├── Regras: Excluir Próprios, Priorizar Tendências, Diversidade
│   └── Teste A/B: Algoritmos Diferentes
└── Relatórios Feed
    ├── Engajamento por Categoria/Tag
    ├── Conversão "Quero Esta" → Agendamento
    ├── Top Posts Salvos
    └── Cobertura Tags vs Catálogo Serviços
```

---

## 7. CONFIGURAÇÕES (Admin Settings)
```
CONFIGURAÇÕES
├── Geral
│   ├── Estúdio: Nome, Logo, Cores, Favicon, Domínio Personalizado
│   ├── Contato: Telefone, Email, Endereço, WhatsApp Business, Redes
│   ├── Horário: Funcionamento, Férias, Feriados, Exceções
│   ├── Moeda/Idioma/Fuso Horário/Unidades
│   └── Backup: Automático Diário, Exportar Completo, Restaurar
├── Equipe & Acessos
│   ├── Usuários: CRUD, Roles (Owner, Admin, Gestor, Profissional, Financeiro, Suporte)
│   ├── Permissões Granulares por Módulo/Ação
│   ├── Convites: Email, Link, Expiração, Role Pré-definida
│   ├── Sessões Ativas: Ver, Revogar, Forçar 2FA
│   └── Log Auditoria: Quem, O Quê, Quando, IP
├── Profissionais
│   ├── CRUD: Dados, Foto, Especialidades, Comissão %, Meta
│   ├── Horários: Semanal, Exceções, Férias, Bloqueios
│   ├── Agenda: Visualização Própria vs Todos
│   └── Performance: Dashboard Individual
├── Serviços & Preços
│   ├── CRUD: Nome, Descrição, Duração, Preço, Cor, Ícone, Categoria
│   ├── Variações: Tamanho, Técnica, Material (Preço Diferenciado)
│   ├── Combos/Pacotes: Desconto %, Serviços Inclusos, Validade
│   ├── Tabela Preços: Versões, Vigência, Histórico
│   └── Comissão: Por Serviço / Por Profissional / Mista
├── Notificações & Comunicação
│   ├── Canais: Push, Email, WhatsApp (API), SMS
│   ├── Templates: Agendamento, Lembrete, Aniversário, Cobrança, NPS
│   ├── Gatilhos: Imediato, Agendado, Condicional
│   ├── Provedores: Configurar Twilio, SendGrid, WhatsApp Business, Firebase
│   ├── Opt-out: Gerenciar Preferências Cliente
│   └── Logs: Entregues, Falhas, Abertos, Clicados
├── Integrações
│   ├── WhatsApp Business API: Templates, Webhooks, Número
│   ├── Pagamentos: Stripe, Mercado Pago, Asaas, Gerencianet
│   ├── Contabilidade: ContaAzul, QuickBooks, Xero, API Custom
│   ├── Agenda Externa: Google Calendar, Outlook (Sync Bidirecional)
│   ├── Armazenamento: Supabase, S3, Cloudinary, Local
│   └── Analytics: GA4, Mixpanel, Amplitude, Meta Pixel
├── LGPD & Privacidade
│   ├── Política Privacidade/Termos (Editor + Versões)
│   ├── Consentimentos: Obrigatórios, Opcionais, Granulares
│   ├── Dados: Exportar (Portabilidade), Excluir (Direito Esquecimento)
│   ├── Retenção: Políticas por Tipo Dado
│   ├── DPO: Contato, Registro Processamentos
│   └── Cookies: Banner, Categorias, Preferências
├── Aparência (White Label)
│   ├── Tema: Claro/Escuro, Cores Primárias, Fonte, Border Radius
│   ├── Logo: App Mobile, Admin, Emails, Comprovantes, Página Pública
│   ├── CSS Customizado (Avançado)
│   └── Preview Tempo Real
└── Plano & Faturamento
    ├── Plano Atual: Limites, Features, Uso Atual
    ├── Upgrade/Downgrade: Prorrata, Confirmação
    ├── Faturas: Histórico, PDF, XML, Status
    ├── Forma Pagamento: Cartão, Boleto, PIX
    └── Cancelamento: Retenção, Feedback, Data Efetiva
```

---

## Deep Links Admin Web

```
https://admin.manidesigners.com/dashboard                    → Dashboard
https://admin.manidesigners.com/agenda?view=week&date=2025-01-15  → Agenda Semana
https://admin.manidesigners.com/agenda/day/2025-01-15        → Agenda Dia
https://admin.manidesigners.com/agenda/appointment/{id}      → Detalhe Agendamento
https://admin.manidesigners.com/agenda/create                → Novo Agendamento
https://admin.manidesigners.com/clients                      → Lista Clientes
https://admin.manidesigners.com/clients/create               → Novo Cliente
https://admin.manidesigners.com/clients/{id}                 → Detalhe Cliente
https://admin.manidesigners.com/clients/{id}/anamnese        → Anamnese Cliente
https://admin.manidesigners.com/finance                      → Financeiro Dashboard
https://admin.manidesigners.com/finance/launch               → Lançamento Rápido
https://admin.manidesigners.com/finance/dre                  → DRE
https://admin.manidesigners.com/finance/tax                  → Impostos
https://admin.manidesigners.com/finance/cashier              → Caixa Diário
https://admin.manidesigners.com/gallery                      → Galeria Global
https://admin.manidesigners.com/gallery/client/{id}          → Galeria Cliente
https://admin.manidesigners.com/feed                         → Gestão Feed
https://admin.manidesigners.com/feed/folders                 → Pastas Feed
https://admin.manidesigners.com/settings                     → Configurações
https://admin.manidesigners.com/settings/team                → Equipe
https://admin.manidesigners.com/settings/services            → Serviços
https://admin.manidesigners.com/settings/integrations        → Integrações
```

---

## Modal Stacks Admin

```
Nível 0: Páginas Principais (Tabs Sidebar)
Nível 1: Side Panels (Direita - 400px) - Detalhes, Edição Rápida
Nível 2: Modais Centralizados - Criar/Editar Complexo, Confirmações Críticas
Nível 3: Drawers (Bottom Mobile / Right Desktop) - Filtros Avançados, Importação
Nível 4: Toasts/Tooltips - Feedback, Avisos, Tours

Regras:
- Side Panel não bloqueia interação com grid (click fora fecha)
- Modal bloqueia tudo (focus trap, ESC fecha, backdrop click fecha)
- Drawer em mobile = bottom sheet, desktop = right panel
- Max 2 modais simultâneos (ex: Editar + Confirmação Excluir)
- Deep link abre Nível 0 + Nível 1 (Side Panel) se ID válido
```

---

## Responsive Breakpoints Admin

```
Desktop HD:     ≥1920px  - Sidebar fixa, Grid 4 colunas, Side Panel 400px
Desktop:        ≥1440px  - Sidebar fixa, Grid 3 colunas, Side Panel 380px
Laptop:         ≥1024px  - Sidebar colapsável (ícones), Grid 2 colunas, Side Panel 350px
Tablet Landscape: ≥768px   - Sidebar drawer, Grid 1-2 colunas, Modais full-width < 600px
Tablet Portrait: ≥600px    - Sidebar drawer, Stack vertical, Bottom Sheets
Mobile:         <600px     - Bottom Nav (5 tabs), Stack, Modais full-screen
```