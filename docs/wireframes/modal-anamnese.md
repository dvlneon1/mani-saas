# modal-anamnese.md — Anamnese Digital (3 Steps Progressivos)

## Layout ASCII — Mobile 375px (BottomSheet/Modal Fullscreen)

### Step 1: Dados Pessoais + LGPD
```
┌─────────────────────────────────────┐
│ Anamnese Digital          ✕        │
├─────────────────────────────────────┤
│ ● Dados Pessoais   ○ Saúde  ○ Termo │ ← Stepper (3 steps)
├─────────────────────────────────────┤
│                                     │
│  DADOS PESSOAIS *                   │
│  ┌─────────────────────────────────┐│
│  │ Nome completo                   ││
│  │ [Maria Silva__________________] ││
│  ├─────────────────────────────────┤│
│  │ CPF                             ││
│  │ [123.456.789-00______________] ││  ← Mask 999.999.999-99
│  ├─────────────────────────────────┤│
│  │ Telefone                        ││
│  │ [(11) 99999-9999_____________] ││  ← Mask (99) 99999-9999
│  ├─────────────────────────────────┤│
│  │ Data de nascimento              ││
│  │ [28/03/1996__________________] ││  ← DatePicker
│  ├─────────────────────────────────┤│
│  │ Email (opcional)                ││
│  │ [maria@email.com______________] ││
│  └─────────────────────────────────┘│
│                                     │
│  LGPD *                             │
│  ┌─────────────────────────────────┐│
│  │ ☑ Autorizo o tratamento dos     ││
│  │   meus dados pessoais conforme  ││
│  │   a LGPD para fins de           ││
│  │   agendamento e anamnese.       ││
│  │   [Ler política completa ▸]     ││
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│              [Próximo ▸]            │ ← Thumb zone, disabled se inválido
└─────────────────────────────────────┘
```

### Step 2: Saúde (Condicional)
```
┌─────────────────────────────────────┐
│ Anamnese Digital          ✕        │
├─────────────────────────────────────┤
│ ○ Dados Pessoais   ● Saúde   ○ Termo│
├─────────────────────────────────────┤
│                                     │
│  SAÚDE *                            │
│                                     │
│  Alergias conhecidas                │
│  ┌─────────────────────────────────┐│
│  │ [☐] Nenhuma conhecida           ││
│  │ [☐] Esmalte / componentes       ││
│  │ [☐] Gel / acrílico              ││
│  │ [☐] Adesivos / fitas            ││
│  │ [☐] Látex                       ││
│  │ [☐] Outras: [________________]  ││
│  └─────────────────────────────────┘│
│                                     │
│  Doenças pré-existentes             │
│  ┌─────────────────────────────────┐│
│  │ [☐] Diabetes                    ││  ← Se ☑ → campo extra
│  │ [☐] Micose / fungos unhas       ││
│  │ [☐] Psoríase                    ││
│  │ [☐] Hipotireoidismo             ││
│  │ [☐] Hipertensão                 ││
│  │ [☐] Outras: [________________]  ││
│  └─────────────────────────────────┘│
│                                     │
│  Medicamentos de uso contínuo       │
│  ┌─────────────────────────────────┐│
│  │ [______________________________]││  ← TextArea
│  └─────────────────────────────────┘│
│                                     │
│  [☐] Uso de Isotretinoína (Roacutan)│ ← Crítico para alongamento
│  [☐] Uso de Anticoagulantes         │
│                                     │
│  Gravidez: [☐] Sim  [☐] Não         │
│  Semanas: [___]  (se sim)           │
│                                     │
│  Cirurgias recentes (30 dias):      │
│  [☐] Sim  [☐] Não                   │
│  Detalhes: [______________________] │
│                                     │
│  Histórico de unhas                 │
│  ┌─────────────────────────────────┐│
│  │ Alongamento anterior: [☐] Sim   ││
│  │ Tipo: [Fibra ▼] Gel Polygel...  ││
│  │ Último: [____________________]  ││
│  │ Problemas atuais:               ││
│  │ [☐] Quebra  [☐] Descolamento   ││
│  │ [☐] Fungos  [☐] Sensibilidade  ││
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│    [Voltar]            [Próximo ▸]  │
└─────────────────────────────────────┘
```

### Step 3: Foto "Antes" + Assinatura + Termo
```
┌─────────────────────────────────────┐
│ Anamnese Digital          ✕        │
├─────────────────────────────────────┤
│ ○ Dados Pessoais   ○ Saúde   ● Termo│
├─────────────────────────────────────┤
│                                     │
│  FOTO "ANTES" OBRIGATÓRIA *         │
│  ┌─────────────────────────────────┐│
│  │                                 ││
│  │     📷  Câmera    🖼  Galeria   ││  ← ImagePicker
│  │                                 ││
│  │   (Mín. 1 foto unha natural)    ││
│  └─────────────────────────────────┘│
│  Preview: ████████ ████████ ████████ │ ← Thumbnails
│                                     │
│  ASSINATURA DIGITAL *               │
│  ┌─────────────────────────────────┐│
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ││  ← SignaturePad canvas
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ││     Touch/mouse draw
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ││
│  │                    [Limpar]     ││
│  └─────────────────────────────────┘│
│                                     │
│  TERMO DE CONSENTIMENTO *           │
│  ┌─────────────────────────────────┐│
│  │ ☑ Li e concordo com o Termo de  ││
│  │   Consentimento e Responsabili- ││
│  │   dade Técnica (v1.2 - 2025).   ││
│  │   Inclui: LGPD, Anvisa, uso de  ││
│  │   imagens, responsabilidades.   ││
│  │   [Ler termo completo ▸]        ││
│  └─────────────────────────────────┘│
│                                     │
│  Versão termo: v1.2  |  IP: 192.x.x│
│                                     │
├─────────────────────────────────────┤
│    [Voltar]        [Finalizar ✓]    │ ← Gera PDF + Upload + Notifica
└─────────────────────────────────────┘
```

### Sucesso / PDF Gerado
```
┌─────────────────────────────────────┐
│ ✓  Anamnese Concluída!         ✕   │
├─────────────────────────────────────┤
│                                     │
│     ✅                              │
│                                     │
│  Anamnese de Maria Silva salva      │
│  com sucesso.                       │
│                                     │
│  📄 PDF gerado e assinado           │
│  🔒 Hash SHA-256: a1b2c3d4...       │
│  📅 15/01/2025 14:32                │
│                                     │
│  Profissional notificada.           │
│                                     │
│  [Ver PDF]  [Fechar]                │
│                                     │
└─────────────────────────────────────┘
```

## Componentes
- AnamneseStepper (progress indicator, 3 steps)
- FormField (label, input, mask, validation)
- CheckboxGroup (single/multi select)
- ConditionalField (show if diabetes → extra)
- DatePicker (native)
- ImagePicker (camera + gallery, multi)
- SignaturePad (canvas, clear, stroke config)
- TermoAccordion (expandible, versioned)
- PDFGenerator (html → print → upload)

## Validações (Zod)
- Step 1: nome, cpf (11 díg), telefone, data nasc, LGPD
- Step 2: pelo menos 1 alergia ou "nenhuma", doenças, isotretinoina boolean
- Step 3: foto_antes (mín 1), assinatura (mín 100 chars base64), termo aceito

## Estados
- Loading: Step transition 200ms
- Validating: Inline error vermelho
- Submitting: Spinner no botão "Finalizar"
- Success: Modal sucesso + auto-close 3s
- Error: Toast + mantém no step atual
- Offline: Salva local (MMKV) + sync queue

## Ações Thumb Zone
- Próximo / Voltar (navegação stepper)
- Câmera / Galeria (foto)
- Canvas assinatura (desenho)
- Finalizar (gera PDF + notifica profissional)
