# microcopy.md — Baseline Textos Mani

## Botões

### Primários (Ação Principal)
| Contexto | Texto | Caracteres |
|----------|-------|------------|
| Salvar formulário | Salvar | 6 |
| Confirmar agendamento | Confirmar | 9 |
| Finalizar anamnese | Finalizar | 9 |
| Enviar fotos | Enviar (X) | 8+ |
| Novo agendamento | Novo agendamento | 16 |
| Novo cliente | Novo cliente | 12 |
| Novo lançamento | Novo lançamento | 15 |
| Agendar | Agendar | 7 |
| Check-in | Check-in | 8 |
| Check-out | Check-out | 9 |
| Pagar | Pagar | 5 |
| Concluir | Concluir | 8 |

### Secundários (Ação Alternativa)
| Contexto | Texto |
|----------|-------|
| Salvar e novo | Salvar + Novo |
| Reagendar | Reagendar |
| Editar | Editar |
| Ver detalhes | Ver detalhes |
| Ver galeria | Ver galeria |
| Ver relatório | Ver relatório |
| Exportar PDF | Exportar PDF |
| Compartilhar | Compartilhar |
| Duplicar | Duplicar |

### Destrutivos (Irreversível)
| Contexto | Texto |
|----------|-------|
| Excluir cliente | Excluir cliente |
| Cancelar agendamento | Cancelar agendamento |
| Excluir foto | Excluir foto |
| Excluir lançamento | Excluir lançamento |
| Sair da conta | Sair da conta |
| Resetar dados | Resetar dados |
| Desconectar WhatsApp | Desconectar |
| Cancelar assinatura | Cancelar plano |

### Ghost / Link (Baixa ênfase)
| Contexto | Texto |
|----------|-------|
| Ler termo completo | Ler termo completo ▸ |
| Ver política LGPD | Ver política completa ▸ |
| Esqueci senha | Esqueci minha senha |
| Criar conta | Criar conta grátis |
| Pular etapa | Pular |
| Talvez depois | Talvez depois |
| Ver todos | Ver todos (X) |

---

## Estados Vazios (Empty States)

### 1. Sem Agendamentos (Hoje / Agenda)
**Título:** Nenhum agendamento hoje
**Subtítulo:** Aproveite o tempo livre ou agende seu primeiro cliente
**CTA Primário:** [+ Novo agendamento]
**CTA Secundário:** [Ver agenda da semana]

### 2. Sem Clientes
**Título:** Nenhum cliente cadastrado
**Subtítulo:** Cadastre seu primeiro cliente para começar a agendar
**CTA Primário:** [+ Cadastrar cliente]
**CTA Secundário:** [Importar do WhatsApp]

### 3. Sem Fotos (Galeria)
**Título:** Nenhuma foto ainda
**Subtítulo:** Registre o antes, durante e depois dos atendimentos
**CTA Primário:** [+ Adicionar fotos]
**CTA Secundário:** —

### 4. Sem Posts (Feed)
**Título:** Nenhuma inspiração encontrada
**Subtítulo:** Ajuste os filtros ou explore as pastas oficiais
**CTA Primário:** [Limpar filtros]
**CTA Secundário:** [Ver pastas]

### 5. Sem Transações (Financeiro)
**Título:** Nenhum lançamento este período
**Subtítulo:** Registre suas entradas e saídas para ver o caixa
**CTA Primário:** [+ Lançamento rápido]
**CTA Secundário:** [Ver relatórios]

### 6. Sem Resultados (Busca Global)
**Título:** Nenhum resultado para "termo"
**Subtítulo:** Tente buscar por nome, telefone, serviço ou tag
**CTA Primário:** [Limpar busca]
**CTA Secundário:** —

---

## Erros (Toasts/Alerts)

### 1. Rede / Conexão
**Título:** Sem conexão
**Mensagem:** Verifique sua internet e tente novamente. Alterações salvas localmente.
**Ação:** [Tentar novamente]

### 2. Autenticação
**Título:** Sessão expirada
**Mensagem:** Faça login novamente para continuar.
**Ação:** [Entrar]

### 3. Validação (Formulário)
**Título:** Verifique os campos
**Mensagem:** Campos obrigatórios não preenchidos ou inválidos.
**Inline:** "Campo obrigatório" | "CPF inválido" | "Telefone inválido" | "Data inválida" | "Valor mínimo R$ 1,00"

### 4. Permissão
**Título:** Acesso negado
**Mensagem:** Você não tem permissão para esta ação.
**Ação:** [Voltar]

### 5. Servidor (5xx)
**Título:** Erro no servidor
**Mensagem:** Algo deu errado. Nossa equipe foi avisada. Tente novamente em instantes.
**Ação:** [Tentar novamente]

### 6. Offline / Sync
**Título:** Modo offline
**Mensagem:** Você está offline. Alterações serão sincronizadas ao reconectar.
**Badge:** "X pendentes" (persistente)

### 7. Conflito Agendamento
**Título:** Horário indisponível
**Mensagem:** Já existe agendamento neste horário. Escolha outro horário ou recurso.
**Ação:** [Ver agenda]

### 8. Upload Falhou
**Título:** Falha no upload
**Mensagem:** Não foi possível enviar a foto. Verifique a conexão ou tente arquivo menor.
**Ação:** [Reenviar] [Escolher outra]

---

## Placeholders Inputs

| Campo | Placeholder |
|-------|-------------|
| Nome completo | Maria Silva |
| CPF | 123.456.789-00 |
| Telefone | (11) 99999-9999 |
| Email | maria@email.com |
| Data nascimento | DD/MM/AAAA |
| Serviço | Alongamento Fibra |
| Preço | 350,00 |
| Duração (min) | 120 |
| Busca clientes | Nome, telefone, tag... |
| Busca feed | Técnica, cor, estilo... |
| Tags | Digite e Enter para adicionar |
| Observações | Observações privadas... |
| Descrição lançamento | Alongamento Fibra - Maria Silva |

---

## Onboarding (5 Steps)

### Step 1: Boas-vindas
**Título:** Bem-vinda ao Mani 💅
**Texto:** O ateliê digital da nail designer. Agenda, clientes, galeria, financeiro e inspiração em um só lugar.
**CTA:** [Começar grátis]

### Step 2: Perfil Profissional
**Título:** Seu perfil profissional
**Texto:** Como suas clientes vão te conhecer. Foto, nome, especialidades e localização.
**Campos:** Foto, Nome, Telefone, Cidade/Estado, Especialidades (chips)
**CTA:** [Continuar]

### Step 3: Serviços
**Título:** Seus serviços
**Texto:** Cadastre até 3 serviços para começar. Pode editar depois.
**Lista:** [+ Adicionar serviço] → Nome, Categoria, Duração, Preço
**CTA:** [Continuar] (mín 1 serviço)

### Step 4: Primeiro Cliente
**Título:** Primeira cliente
**Texto:** Cadastre uma cliente para testar o agendamento.
**Campos:** Nome, Telefone, Email (opcional)
**CTA:** [Continuar] / [Pular]

### Step 5: Primeiro Agendamento
**Título:** Primeiro agendamento
**Texto:** Agende agora e veja como funciona.
**Fluxo:** Cliente → Serviço → Data/Hora → Confirmar
**CTA:** [Agendar] / [Finalizar depois]

---

## Tooltips / Help (Ícone ⓘ)

| Contexto | Texto |
|----------|-------|
| Buffer (agenda) | Tempo extra entre atendimentos para preparação/limpeza. Padrão: 15 min. |
| Janela manutenção | Dias ideais para retorno da cliente (ex: 18-21 dias). Sistema sugere agendamento automático. |
| Sinal | Valor pago na reserva. Padrão: 30% para alongamento, 0% para manicure. Configurável por serviço. |
| Reserva imposto | % automático separado para DAS MEI (INSS 5% + ISS fixo). Não disponível para saque. |
| Anamnese obrigatória | Exigida por lei (Anvisa) para alongamentos. Bloqueia check-in se incompleta. |
| Portfolio opt-in | Cliente autoriza foto no seu feed público. Link expira em 30 dias. Watermark automático. |
| Parcelado | Entrada + parcelas futuras. Cria lançamentos "previstos" no financeiro. |
| Sincronização | Dados salvos localmente → nuvem. Badge "Pendente" = aguardando conexão. |

---

## Confirmações (Modais Destrutivos)

### 1. Excluir Cliente
**Título:** Excluir Maria Silva?
**Texto:** Esta ação remove o cliente, agendamentos, fotos, anamnese e histórico financeiro. Não pode ser desfeita.
**Checkbox:** [☐] Confirmo que quero excluir permanentemente
**CTA Primário:** [Excluir] (destructive)
**CTA Secundário:** [Cancelar]

### 2. Cancelar Agendamento
**Título:** Cancelar agendamento?
**Texto:** A cliente será notificada. Política: Grátis até 24h, 50% sinal 24-2h, 100% <2h. Exceção: atestado médico.
**Seleção:** Motivo: [Cliente cancelou ▼] [Profissional cancelou] [Outro]
**CTA Primário:** [Confirmar cancelamento] (destructive)
**CTA Secundário:** [Manter agendamento]

### 3. Excluir Foto
**Título:** Excluir esta foto?
**Texto:** Será removida da galeria e do portfolio (se pública). Não afeta outras fotos do atendimento.
**CTA Primário:** [Excluir] (destructive)
**CTA Secundário:** [Cancelar]

### 4. Sair da Conta
**Título:** Sair da conta?
**Texto:** Você será desconectado. Dados locais mantidos. Login necessário para acessar novamente.
**CTA Primário:** [Sair] (destructive)
**CTA Secundário:** [Cancelar]

### 5. Resetar Dados
**Título:** Resetar todos os dados?
**Texto:** **IRREVERSÍVEL.** Apaga clientes, agendamentos, fotos, financeiro, configurações. Mantém apenas conta/login.
**Digite:** "RESETAR" para confirmar: [__________]
**CTA Primário:** [Resetar agora] (destructive, disabled até match)
**CTA Secundário:** [Cancelar]

### 6. Confirmar Pagamento
**Título:** Confirmar recebimento?
**Texto:** Marcar como "Recebido" move para caixa do dia e atualiza relatórios. Parcela futura (se houver) mantém status "Previsto".
**Detalhes:** R$ 350,00 • PIX • Maria Silva • Alongamento Fibra
**CTA Primário:** [Confirmar recebido] (success)
**CTA Secundário:** [Cancelar]

---

## Sucessos (Toasts Verdes)

| Ação | Mensagem |
|------|----------|
| Cliente salvo | Cliente salvo com sucesso |
| Agendamento criado | Agendamento confirmado para 15/01 09:00 |
| Check-in feito | Check-in registrado 09:00 |
| Check-out feito | Atendimento finalizado 11:30 |
| Anamnese concluída | Anamnese da Maria concluída ✓ PDF gerado |
| Fotos enviadas | 8 fotos adicionadas à galeria |
| Lançamento salvo | Lançamento de R$ 350,00 registrado |
| Pagamento confirmado | Pagamento de R$ 350,00 confirmado |
| Configuração salva | Preferências atualizadas |
| Convite enviado | Convite enviado para ana@email.com |
| Sync concluído | Tudo sincronizado ✓ |

---

## Textos de Navegação / Labels

### Tabs Principais
- Hoje
- Agenda
- Clientes
- Financeiro
- Feed
- Perfil

### Sub-navegação (Segmented)
- Semana / Dia / Lista
- Hoje / Semana / Mês
- Receitas / Despesas / Todos
- Todas / Fibra / Gel / Arte / ...
- Resumo / Anamnese / Galeria / Financeiro

### Ações Rápidas (Hoje)
- Novo agendamento
- Novo cliente
- Novo lançamento
- Ver anamnese pendente

---

## Acessibilidade (Screen Reader)

### Labels ARIA
- Botão "Menu": "Abrir menu principal"
- Botão "Notificações": "Notificações, 3 não lidas"
- Input "Busca": "Buscar clientes por nome ou telefone"
- Chip "Fibra": "Filtrar por técnica Fibra, selecionado"
- Botão "Quero esta": "Agendar este design para uma cliente"
- Botão "Check-in": "Registrar chegada da cliente Maria Silva"
- Progresso upload: "Enviando foto 3 de 8, 45 por cento"

### Live Regions
- Toast sucesso: `aria-live="polite"`
- Toast erro: `aria-live="assertive"`
- Status sync: `aria-live="polite"`
- Validação inline: `aria-live="polite"`

---

## Tom de Voz (Voice & Tone)

### Princípios
- **Direto:** "Salvar" não "Clique aqui para salvar"
- **Humano:** "Bem-vinda" não "Usuário cadastrado com sucesso"
- **Confiante:** "Agendamento confirmado" não "Seu agendamento foi confirmado"
- **Útil:** Erros explicam *como* corrigir, não apenas *o que* errado

### Evitar
- "Por favor," no início de tudo
- "Com sucesso" em todo toast (implícito)
- Jargão técnico ("CRUD", "endpoint", "payload")
- Culpa do usuário ("Você errou", "Dados inválidos")

### Preferir
- Imperativo afirmativo: "Salvar", "Confirmar", "Agendar"
- Segunda pessoa: "Sua agenda", "Seus clientes"
- Contexto: "Agendamento para 15/01 às 09:00 confirmado"
- Ação sugerida no erro: "Verifique o CPF e tente novamente"

---

## Versionamento

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0.0 | 2025-11-02 | Baseline completo v1 |

---

## Checklist Uso

- [ ] Botões usam textos da tabela "Primários/Secundários/Destrutivos"
- [ ] Estados vazios têm título + subtítulo + CTA
- [ ] Erros têm título + mensagem + ação
- [ ] Placeholders seguem tabela
- [ ] Onboarding 5 steps textos aprovados
- [ ] Tooltips cobrem 8 conceitos-chave
- [ ] Confirmações destrutivas têm checkbox/texto digitação
- [ ] Toasts sucesso usam padrões
- [ ] Labels ARIA em componentes interativos
- [ ] Tom de voz aplicado em revisão
