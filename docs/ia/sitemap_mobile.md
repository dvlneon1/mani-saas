# Sitemap Mobile - App Nail Designers

## Estrutura de Tabs Principal (Bottom Navigation)

```
┌─────────────────────────────────────────────────────────────┐
│                        APP MOBILE                            │
├─────────────────────────────────────────────────────────────┤
│  [HOJE] [AGENDA] [CLIENTES] [FINANCEIRO] [FEED] [PERFIL]   │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. TAB HOJE (Home/Dashboard)
```
HOJE
├── Próximo Agendamento (Hero Card)
│   ├── Detalhe Agendamento → AGENDA > Detalhe
│   ├── Check-in → Status EM_ATENDIMENTO
│   └── Ver Todos → AGENDA > Semana
├── Ações Rápidas (Grid 2x2)
│   ├── + Agendar → AGENDA > Criar
│   ├── + Cliente → CLIENTES > Criar
│   ├── + Lançamento → FINANCEIRO > Lançamento
│   └── + Foto Galeria → CLIENTES > Galeria
├── Resumo Financeiro Dia
│   ├── Entradas / Saídas / Saldo
│   └── Ver Detalhes → FINANCEIRO > Dashboard
├── Feed Inspiração (Carousel 3 cards)
│   ├── Ver Mais → FEED
│   └── Salvar → FEED > Pastas
└── Alertas/Notificações
    ├── Anamnese Pendente → CLIENTES > Anamnese
    ├── Pagamento Pendente → AGENDA > Detalhe
    └── Imposto Vencendo → FINANCEIRO > Impostos
```

---

## 2. TAB AGENDA
```
AGENDA
├── Semana (Default)
│   ├── Header: Navegação Semana (◀ Sem Atual ▶)
│   ├── Grid Dias (Seg-Dom) - Slots 30min
│   │   ├── Slot Livre → Tap: Criar Agendamento
│   │   ├── Slot Ocupado → Tap: Detalhe Agendamento
│   │   └── Drag-to-resize (futuro)
│   ├── Filtro: Profissional (futuro multi-prof)
│   └── Filtro: Status (Todos/Agendado/Em Atendimento/Finalizado)
├── Dia (Tap no dia da semana)
│   ├── Lista Horária Completa
│   ├── Header: Data + Total Agendamentos + Receita Prevista
│   ├── Empty State: "Nenhum agendamento. Toque + para criar."
│   └── Ações: Reordenar, Copiar para outro dia
├── Criar Agendamento (Modal/Sheet)
│   ├── Cliente (Buscar/Criar Novo)
│   ├── Serviço(s) (Multi-select)
│   ├── Data/Hora (Picker)
│   ├── Observações
│   └── Confirmar → Push Notification
├── Detalhe Agendamento
│   ├── Cliente (Tap → Perfil Cliente)
│   ├── Serviços + Preço Total + Duração
│   ├── Status Badge + Ações por Status
│   │   ├── AGENDADO: Check-in, Reagendar, Cancelar
│   │   ├── EM_ATENDIMENTO: Timer, Checklist, Fotos, Finalizar
│   │   ├── FINALIZADO: Pagamento, Comprovante, Reagendar
│   │   └── CANCELADO: Reativar, Excluir
│   ├── Histórico Alterações
│   └── Anamnese Link (se cliente)
└── Configurações Agenda
    ├── Horário Funcionamento
    ├── Intervalo Padrão (30/60min)
    ├── Buffer Entre Atendimentos
    └── Cores por Serviço
```

---

## 3. TAB CLIENTES
```
CLIENTES
├── Lista (Default)
│   ├── Busca (Nome, Telefone, Tag)
│   ├── Filtros: Status (Ativo/Inativo), Tem Anamnese, Última Visita
│   ├── Ordenação: Alfabética, Recente, Frequência, Valor Total
│   ├── Empty State: "Nenhum cliente. Toque + para adicionar."
│   └── Pull-to-Refresh
├── Criar Cliente (Modal/Sheet)
│   ├── Nome* + Telefone* (WhatsApp)
│   ├── Email, Instagram, Data Nascimento
│   ├── Tags Personalizadas
│   ├── Observações
│   └── Salvar → Abre Perfil
├── Perfil Cliente
│   ├── Header: Foto, Nome, Telefone, Tags, Status
│   ├── Ações: Ligar, WhatsApp, Editar, Arquivar
│   ├── Abas: Resumo | Agendamentos | Galeria | Anamnese | Financeiro
│   │   ├── Resumo: Total Gasto, Frequência, Última Visita, Próximo
│   │   ├── Agendamentos: Lista Histórico + Próximos
│   │   ├── Galeria: Timeline Fotos (Ver Fluxo Galeria)
│   │   ├── Anamnese: Status + Link WhatsApp + Ver PDF
│   │   └── Financeiro: Débitos, Créditos, Histórico Pagamentos
│   └── Empty States por Aba com CTAs Contextuais
├── Anamnese Digital (Ver Fluxo Anamnese)
│   ├── Gerar Link
│   ├── Compartilhar WhatsApp
│   ├── Visualizar PDF
│   └── Histórico Versões
└── Importar Contatos (Futuro)
    ├── WhatsApp Business API
    ├── CSV/Excel
    └── Google Contacts
```

---

## 4. TAB FINANCEIRO
```
FINANCEIRO
├── Dashboard (Default)
│   ├── Cards Resumo: Saldo, Entradas Mês, Saídas Mês, Reserva Imposto
│   ├── Gráfico: Entradas vs Saídas (Últimos 6 meses)
│   ├── Top 5 Categorias Entrada/Saída
│   ├── Alertas: Imposto Vencendo, Caixa Negativo, Parcelas Atrasadas
│   └── Acesso Rápido: + Lançamento, DRE, Caixa Diário
├── Lançamentos
│   ├── Lista com Filtros: Tipo, Categoria, Período, Status
│   ├── Busca: Descrição, Valor
│   ├── + Lançamento Rápido (Modal)
│   │   ├── Tipo: Entrada/Saída/Transferência
│   │   ├── Categoria (Select com Ícones)
│   │   ├── Valor + Data + Descrição
│   │   ├── Parcelado: Sim/Não → Se Sim: Qtd, Intervalo, Juros
│   │   ├── Vincular: Agendamento/Cliente (Opcional)
│   │   └── Salvar
│   ├── Editar/Excluir (Swipe Actions)
│   └── Conciliação: Marcar Confirmado/Bancarizado
├── Relatórios
│   ├── DRE Mensal/Anual
│   │   ├── Receitas por Categoria
│   │   ├── Custos Fixos/Variáveis
│   │   ├── Lucro Bruto/Líquido
│   │   └── Exportar PDF/CSV
│   ├── Fluxo de Caixa
│   │   ├── Diário/Semanal/Mensal
│   │   ├── Projeção 30/60/90 dias
│   │   └── Alertas Projetados
│   ├── Por Cliente
│   │   ├── Top 10 Clientes
│   │   ├── Ticket Médio
│   │   └── LTV (Lifetime Value)
│   └── Por Serviço
│       ├── Mais Vendidos
│       ├── Maior Margem
│       └── Ocupação Agenda
├── Impostos
│   ├── Configuração: MEI / Simples Nacional / Lucro Presumido
│   ├── % Automático por Entrada
│   ├── Reserva Atual vs Necessária
│   ├── DAS/Guias: Gerar, Pagar, Comprovantes
│   └── Calendário Obrigações
└── Caixa Diário
    ├── Lista Lançamentos do Dia
    ├── Totalizadores: Entradas, Saídas, Saldo Final
    ├── Fechar Caixa (Bloqueia Edição)
    ├── Histórico Fechamentos
    └── Diferença: Esperado vs Real
```

---

## 5. TAB FEED
```
FEED
├── Abas: Para Você | Salvas | Pastas
├── Para Você (Default - Algoritmo)
│   ├── Grid 2 Colunas (Mobile) / 3-4 (Tablet)
│   ├── Card: Imagem + Autor + Tags + Curtidas/Comentários
│   ├── Infinite Scroll + Pull-to-Refresh
│   ├── Filtros Topo (Chips Horizontais Scroll)
│   │   ├── Estilo: Francesa, Baby Boomer, Decorada, Minimalista...
│   │   ├── Cor: Nude, Vermelho, Rosa, Preto, Colorido...
│   │   ├── Técnica: Gel, Acrílico, Fibra, Polygel, Esmaltação...
│   │   └── Ocasião: Casual, Festa, Noiva, Natal, Carnaval...
│   ├── Tap Card → Detalhe Post
│   └── Empty State: "Nenhuma inspiração. Ajuste filtros ou siga perfis."
├── Detalhe Post
│   ├── Imagem Full Screen (Zoom Pinch)
│   ├── Metadados: Autor, Data, Tags Completas, Descrição
│   ├── Ações: Curtir, Comentar, Compartilhar, Denunciar
│   ├── Salvar → Selecionar Pasta / Nova Pasta
│   ├── "Quero Esta" → Modal Pré-Agenda
│   │   ├── Selecionar Cliente
│   │   ├── Sugerir Serviços (IA baseado em tags)
│   │   ├── Data/Horário Preferencial
│   │   └── Criar Rascunho → Status PRÉ-AGENDADO
│   └── Produtos Usados (Futuro: Links Afiliados)
├── Salvas
│   ├── Grid Posts Salvos
│   ├── Filtro por Pasta
│   └── Ações: Remover, Mover Pasta, Quero Esta
├── Pastas
│   ├── Lista Pastas: Nome + Cor + Contador + Capa
│   ├── + Nova Pasta: Nome + Cor + Descrição
│   ├── Tap Pasta → Grid Posts da Pasta
│   ├── Editar/Excluir Pasta (Long Press)
│   └── Compartilhar Pasta (Link Público)
└── Explorar/Descobrir (Futuro)
    ├── Perfis Recomendados
    ├── Hashtags Trending
    └── Coleções Curadas
```

---

## 6. TAB PERFIL
```
PERFIL
├── Header: Foto, Nome, Telefone, Email, Plano (Free/Pro)
├── Meu Estúdio
│   ├── Nome Estúdio + Logo
│   ├── Endereço + Mapa
│   ├── Horário Funcionamento
│   ├── Redes Sociais (Instagram, WhatsApp Business)
│   └── Configurar Página Pública (Futuro)
├── Minha Conta
│   ├── Dados Pessoais
│   ├── Alterar Senha
│   ├── Autenticação 2FA
│   ├── Dispositivos Conectados
│   └── Excluir Conta
├── Assinatura/Plano
│   ├── Plano Atual + Benefícios
│   ├── Upgrade/Downgrade
│   ├── Histórico Faturas
│   └── Forma Pagamento
├── Configurações App
│   ├── Notificações (Push, Email, WhatsApp)
│   ├── Tema: Claro/Escuro/Sistema
│   ├── Idioma: PT/EN/ES
│   ├── Unidades: Métrico/Imperial
│   ├── Backup/Sincronização
│   └── Modo Offline
├── Suporte
│   ├── Central Ajuda (FAQ)
│   ├── Chat Suporte
│   ├── Reportar Bug
│   ├── Sugerir Melhoria
│   └── Termos/Privacidade
├── Sobre
│   ├── Versão App
│   ├── Créditos
│   ├── Licenças Open Source
│   └── Changelog
└── Sair (Logout)
```

---

## Navegação Profunda (Deep Links)

```
manidesigners://today                    → Tab Hoje
manidesigners://agenda/week              → Agenda Semana
manidesigners://agenda/day/2025-01-15    → Agenda Dia Específico
manidesigners://agenda/create            → Criar Agendamento
manidesigners://agenda/detail/{id}       → Detalhe Agendamento
manidesigners://clients                  → Lista Clientes
manidesigners://clients/create           → Criar Cliente
manidesigners://clients/{id}             → Perfil Cliente
manidesigners://clients/{id}/anamnese    → Anamnese Cliente
manidesigners://clients/{id}/gallery     → Galeria Cliente
manidesigners://finance/dashboard        → Financeiro Dashboard
manidesigners://finance/launch           → Lançamento Rápido
manidesigners://finance/dre              → DRE
manidesigners://finance/tax              → Impostos
manidesigners://feed                     → Feed Para Você
manidesigners://feed/saved               → Feed Salvas
manidesigners://feed/folders             → Pastas
manidesigners://feed/post/{id}           → Detalhe Post
manidesigners://feed/prebook/{postId}    → Pré-Agenda do Post
manidesigners://profile                  → Perfil
manidesigners://settings                 → Configurações
manidesigners://onboarding               → Onboarding (se não completado)
manidesigners://anamnese/{token}         → Anamnese Pública (Cliente)
```

---

## Modal Stacks (Navegação Modal)

```
Stack Principal (Tabs)
├── Stack Agenda
│   ├── Semana → Dia → Detalhe → Criar/Editar
│   └── Check-in → Atendimento → Pagamento → Comprovante
├── Stack Clientes
│   ├── Lista → Perfil → (Abas: Resumo|Agendamentos|Galeria|Anamnese|Financeiro)
│   ├── Criar/Editar Cliente
│   └── Anamnese → Link WhatsApp → PDF
├── Stack Financeiro
│   ├── Dashboard → Lançamento → Relatórios → Impostos → Caixa
│   └── Editar Lançamento → Parcelamento
├── Stack Feed
│   ├── Grid → Detalhe → Salvar/Quero Esta → Pré-Agenda
│   └── Pastas → Grid Pasta → Detalhe
└── Stack Perfil
    ├── Perfil → Configurações → Sub-configurações
    └── Plano → Checkout → Sucesso
```

---

## Regras de Navegação

1. **Back Button Hardware/Android**: Volta no stack atual, não troca tab
2. **Swipe Back iOS**: Funciona em todos os modals/sheets
3. **Deep Link**: Abre stack completo, mantém histórico
4. **Notificação Push**: Abre deep link correspondente
5. **Offline**: Navegação local funciona, sync quando online
6. **Onboarding Incompleto**: Intercepta navegação, força fluxo onboarding
```