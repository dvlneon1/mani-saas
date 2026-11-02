# usability-test-plan.md — Plano Testes Usabilidade Mani

## Objetivos

1. **Validar fluxos core** — Onboarding, Agendamento, Anamnese, Galeria, Financeiro
2. **Identificar friction points** — Onde usuárias travam, erram ou desistem
3. **Medir baseline métricas** — Task success rate, time-to-complete, error rate, NPS
4. **Coletar feedback qualitativo** — Dor, expectativa, sugestões, linguagem

---

## Participantes

### Perfil (3 nail designers autônomas)
| Critério | Detalhe |
|----------|---------|
| Experiência | > 6 meses como nail designer autônoma |
| Gestão atual | Usa WhatsApp + papel / Google Calendar / caderno |
| Tech | Smartphone Android ou iOS (uso diário) |
| SaaS atual | **Não usa** nenhum SaaS de salão (Trinks, Belasis, etc.) |
| Localização | São Paulo (presencial) ou remoto (screen share) |
| Faixa etária | 22-45 anos |

### Recrutamento
- **Canal:** Indicação rede profissional, grupos WhatsApp nail designers
- **Compensação:** R$ 100/hora (sessão 1.5h = R$ 150)
- **Agendamento:** Calendly link, 2 semanas antecedência
- **Backup:** 1 participante reserva

---

## Cenários (5 Tarefas Críticas)

### Tarefa 1: Onboarding Completo
**Objetivo:** Criar conta → perfil → 3 serviços → 1 cliente → 1 agendamento
**Tempo alvo:** < 8 min
**Passos esperados:**
1. Baixar app → "Começar grátis"
2. Preencher perfil (foto, nome, telefone, cidade, especialidades)
3. Cadastrar 3 serviços (ex: Alongamento Fibra, Manutenção, Esmaltação)
4. Cadastrar 1 cliente (nome, telefone)
5. Agendar cliente para serviço amanhã 10h
**Métricas:**
- Success: Sim/Não (completou todos passos)
- Time: Segundos (início → agendamento confirmado)
- Errors: Count (validação, navegação, dúvida)
- Satisfaction: 1-5 (pós-tarefa)

### Tarefa 2: Agendamento Recorrente + Check-in/out
**Objetivo:** Agendar manutenção quinzenal × 3 → Check-in → Check-out
**Tempo alvo:** < 5 min
**Passos esperados:**
1. Abrir Agenda → Semana → Novo agendamento
2. Selecionar cliente existente → Serviço "Manutenção"
3. Definir recorrência: "Toda 2ª semana, 3ª ou 4ª feira, manhã"
4. Confirmar 3 datas propostas pelo sistema
5. No dia: Check-in (QR/botão) → Atendimento → Check-out
**Métricas:** Success, Time, Errors, Satisfaction

### Tarefa 3: Anamnese Digital via WhatsApp
**Objetivo:** Enviar link → Cliente preenche 3 steps → PDF assinado → Notificação pro
**Tempo alvo:** < 6 min (lado pro)
**Passos esperados (Pro):**
1. Cliente sem anamnese → "Enviar anamnese WhatsApp"
2. Aguardar notificação "Anamnese concluída"
3. Abrir → Ver PDF → Verificar assinatura + hash
**Passos esperados (Cliente - simulado):**
1. Receber link → Abrir no navegador
2. Step 1: Dados + LGPD → Próximo
3. Step 2: Saúde (diabetes → campo extra) → Próximo
4. Step 3: Foto unha + Assinatura canvas + Termo → Finalizar
**Métricas:** Success (ambos lados), Time (pro), Errors, Satisfaction

### Tarefa 4: Upload Galeria + Tags + Portfolio
**Objetivo:** Adicionar 5 fotos (antes/durante/depois) → Tags → Marcar portfolio
**Tempo alvo:** < 4 min
**Passos esperados:**
1. Cliente → Galeria → + Adicionar fotos
2. Selecionar fase "DEPOIS" → Câmera/Galeria (5 fotos)
3. Tags: Técnica Fibra, Cor Nude, Marca Risqué, Estilo Francesinha
4. "Aplicar a todas" → Portfolio ON → Watermark ON → Enviar
5. Ver na timeline + Compartilhar link (30d)
**Métricas:** Success, Time, Errors, Satisfaction

### Tarefa 5: Financeiro Parcelado + DRE
**Objetivo:** Lançar receita parcelada (entrada + 2x) → Ver DRE mensal
**Tempo alvo:** < 4 min
**Passos esperados:**
1. Financeiro → + Lançamento rápido
2. Receita → Atendimento → "Alongamento - Maria" → R$ 350
3. Parcelado: Sim → Entrada R$ 150 + 2x R$ 100 (30d, 60d)
4. Método: PIX → Salvar
5. Relatórios → DRE → Ver Lucro Líquido + Margem por técnica
**Métricas:** Success, Time, Errors, Satisfaction

---

## Métricas

### Por Tarefa
| Métrica | Tipo | Coleta |
|---------|------|--------|
| Task Success | Binário (0/1) | Observador |
| Time-on-task | Segundos | Cronômetro |
| Error Count | Inteiro | Observador (validação, navegação, sistema) |
| Satisfaction | Likert 1-5 | Pós-tarefa verbal |

### Gerais (Pós-sessão)
| Métrica | Ferramenta |
|---------|------------|
| SUS Score | Questionário 10 itens |
| NPS | "Recomendaria 0-10?" |
| Task Success Rate | % tarefas sucess/5 |
| Avg Time | Média segundos |
| Error Rate | Total errors / total tarefas |

---

## Script Moderador (1.5h)

### 0. Preparação (5 min)
- Gravação tela + áudio (consentimento assinado)
- Testar protótipo no device da participante
- Explicar: "Não teste você, teste o app. Pense alto."

### 1. Intro & Consentimento (5 min)
- Apresentação, objetivo, duração
- Termo consentimento (LGPD, gravação, anonimato)
- Perguntas demográficas (experiência, ferramentas atuais)

### 2. Tarefas 1-5 (60 min = ~12 min cada)
Para cada tarefa:
- Ler cenário (cartão impresso)
- "Comece quando quiser"
- Observar + anotar (não ajudar a menos que trave total)
- Pós-tarefa: "Quão fácil? 1-5. O que travou? O que esperava?"

### 3. Debrief & Questionários (15 min)
- SUS (10 perguntas)
- NPS + "Por que essa nota?"
- "O que mais gostou? O que mudaria?"
- "Faltou algo que você faz hoje?"

### 4. Encerramento (5 min)
- Pagamento (Pix na hora)
- Agradecimento + contato para dúvidas futuras

---

## Gravação & Dados

| Dado | Formato | Armazenamento |
|------|---------|---------------|
| Tela + áudio | MP4 (1080p) | Google Drive criptografado |
| Anotações observador | Markdown | Notion / Linear |
| Questionários | Google Forms | Sheets |
| Consentimento assinado | PDF | Drive |

---

## Análise & Entregável

### Affinity Mapping (Pós-sessões)
1. Transcrever quotes-chave por tarefa
2. Agrupar por tema: Navegação, Validação, Linguagem, Fluxo, Visual
3. Severidade:
   - **Crítico:** Impede conclusão da tarefa
   - **Alto:** Erro frequente / frustração alta
   - **Médio:** Hesitação / workaround necessário
   - **Baixo:** Sugestão melhoria / preferência

### Relatório Final (PDF)
- Resumo executivo (1 pág)
- Métricas quantitativas (tabela + gráficos)
- Top 10 issues priorizadas (severidade + frequência)
- Quotes representativas por issue
- Recomendações de design (wireframe annotations)
- Próximos passos (sprint backlog)

### Timeline
| Atividade | Prazo |
|-----------|-------|
| Recrutamento confirmado | T-14 dias |
| Protótipo pronto | T-7 dias |
| Sessões (3 dias) | T-0 a T+2 |
| Análise + Relatório | T+5 |
| Design Review gate | T+7 |

---

## Critérios de Aprovação (Gate Fase 1.2)

| Métrica | Mínimo |
|---------|--------|
| Task Success Rate (média 5 tarefas) | ≥ 80% |
| Avg Time Tarefa 1 (Onboarding) | ≤ 10 min |
| Avg Time Tarefa 3 (Anamnese) | ≤ 8 min |
| SUS Score | ≥ 68 |
| NPS | ≥ 30 |
| Zero issues Críticos não resolvidos | ✓ |

---

## Riscos & Mitigação

| Risco | Prob. | Impacto | Mitigação |
|-------|-------|---------|-----------|
| No-show participante | Média | Alto | 1 reserva agendada, reagendar 24h antes |
| Protótipo buga | Baixa | Alto | Test smoke 1h antes, backup Figma mirror |
| Participante nervosa | Média | Médio | Ambiente casual, "teste o app não você" |
| Viés moderador | Baixa | Médio | Script fixo, não liderar respostas |
| Dados sensíveis (anamnese sim) | Baixa | Alto | Dados fictícios no protótipo, LGPD explicado |

---

## Aprovação

- [ ] **UI/UX Designer:** Plano validado
- [ ] **Product Owner:** Critérios aceitos
- [ ] **Front-end Dev:** Protótipo viável tecnicamente

---

*Versão 1.0 — 2025-11-02*
