# modal-galeria.md — Galeria Upload (Múltiplo + Tags + Fases)

## Layout ASCII — Mobile 375px (BottomSheet/Modal Fullscreen)

### Seletor de Fase (Entry Point)
```
┌─────────────────────────────────────┐
│ Adicionar Fotos             ✕      │
├─────────────────────────────────────┤
│ Selecione a fase:                   │
│ ┌────────┬────────┬────────┬──────┐ │
│ │ 📸 ANTES│ 🔄 DURANTE│ ✨ DEPOIS│15D │ ← Phase chips
│ └────────┴────────┴────────┴──────┘ │
│ ┌────────┐                           │
│ │ 🔧 REPARO│                         │
│ └────────┘                           │
├─────────────────────────────────────┤
│ Cliente: Maria Silva ▼              │
│ Serviço: Alongamento Fibra Nude     │
│ Data: 15/01/2025                    │
├─────────────────────────────────────┤
│ [Continuar]                         │
└─────────────────────────────────────┘
```

### Upload Múltiplo (Grid + Progress)
```
┌─────────────────────────────────────┐
│ Upload — Fase: DEPOIS         ✕    │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │  +  +  +  +  +  +  +  +  +  +  │ │ ← Grid 3col + add button
│ │  ██  ██  ██  ██  ██  ██  ██  ██ │ │
│ │  ██  ██  ██  ██  ██  ██  ██  ██ │ │
│ │  ██  ██  ██  ██  ██  ██  ██  ██ │ │
│ │  45% ████████░░  ✓  ✓  ⏳  ⏳   │ │ ← Progress bars
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Selecionadas: 8  |  Enviadas: 3    │
│ [📷 Câmera]  [🖼 Galeria]  [✕ Limpar]│
├─────────────────────────────────────┤
│ Tags obrigatórias (mín. 1 por foto) │
│ ┌─────────────────────────────────┐ │
│ │ Técnica: [Fibra Vidro ▼]  +     │ │ ← Select + add custom
│ │ Cor:     [Nude ▼]  +            │ │
│ │ Marca:   [Risqué ▼]  +          │ │
│ │ Estilo:  [Francesinha ▼]  +     │ │
│ └─────────────────────────────────┘ │
│ Aplicar a todas selecionadas ☐     │
├─────────────────────────────────────┤
│ Portfolio: [☐] Público no feed     │
│ Watermark: [☑] Aplicar logo        │
├─────────────────────────────────────┤
│       [Cancelar]   [Enviar (8)]     │ ← Thumb zone
└─────────────────────────────────────┘
```

### Preview/Edição Individual (Tap foto)
```
┌─────────────────────────────────────┐
│ Editar Foto                 ✕      │
├─────────────────────────────────────┤
│ ██████████████████████████████████ │ ← Full preview pinch zoom
│ ██████████████████████████████████ │
├─────────────────────────────────────┤
│ Fase: [DEPOIS ▼]                    │
├─────────────────────────────────────┤
│ Tags:                               │
│ 💅 Fibra Vidro  🎨 Nude             │
│ 🏷️ Risqué      ✨ Francesinha       │
│ [+ Adicionar tag]                   │
├─────────────────────────────────────┤
│ Legenda:                            │
│ [Finalização com top coat brilho...]│
├─────────────────────────────────────┤
│ Portfolio: [☑] Público              │
│ Watermark: [☑] Logo                 │
├─────────────────────────────────────┤
│ [🗑 Excluir]      [Salvar]          │
└─────────────────────────────────────┘
```

### Sucesso / Galeria Atualizada
```
┌─────────────────────────────────────┐
│ ✓  8 fotos enviadas!          ✕    │
├─────────────────────────────────────┤
│                                     │
│     ✅                              │
│                                     │
│  Fotos adicionadas à galeria de     │
│  Maria Silva — 15/01/2025.          │
│                                     │
│  Fase DEPOIS: 8 fotos               │
│  Tags aplicadas: Fibra, Nude,       │
│  Risqué, Francesinha                │
│  Portfolio: 5 públicas, 3 privadas  │
│                                     │
│  [Ver na galeria]  [Fechar]         │
│                                     │
└─────────────────────────────────────┘
```

### Comparação Antes/Depois (Galeria Timeline)
```
┌─────────────────────────────────────┐
│ Comparar — Maria Silva         ✕   │
├─────────────────────────────────────┤
│ ANTES (15/01)        DEPOIS (15/01) │
│ ┌───────────────┐   ┌───────────────┐│
│ │ ████████████  │   │ ████████████  ││
│ │ ████████████  │   │ ████████████  ││
│ │ ████████████  │   │ ████████████  ││
│ └───────────────┘   └───────────────┘│
│                                     │
│ MANUTENÇÃO 15D (30/01)              │
│ ┌───────────────┐                   │
│ │ ████████████  │                   │
│ └───────────────┘                   │
│                                     │
│ [◀ Anterior]  [Próximo ▶]           │
│ [Compartilhar comparação]           │
└─────────────────────────────────────┘
```

## Componentes
- PhaseSelectorChips (horizontal scroll, required)
- MultiImagePicker (camera + gallery, max 20)
- UploadGrid (3 col, progress overlay, retry)
- ProgressBar (circular/linear per image)
- TagInput (select + custom, chips, min 1)
- ApplyToAllCheckbox (bulk tags)
- PortfolioToggle + WatermarkToggle
- ImageEditorModal (zoom, tags, caption, delete)
- ComparisonView (side-by-side, swipe nav)

## Compressão & Upload
- Client-side: Expo ImageManipulator
- WebP 85%, max 1.5MB, max 1920px
- Blurhash 20x20 gerado no upload
- Presigned URL → Supabase Storage direto
- Background upload (MMKV queue + retry exponencial)

## Estados
- Loading: Blurhash → Low-res → Full
- Uploading: Progress bar per image
- Success: Checkmark verde + contador
- Error: Badge vermelho + [Reenviar]
- Offline: "Pendente sync" + queue badge
- Empty: "Nenhuma foto" + [Câmera] [Galeria]

## Ações Thumb Zone
- Câmera / Galeria (add)
- Selecionar fase (chips topo)
- Tags (select + custom)
- Enviar (CTA primário)
- Editar individual (tap)
- Comparar (galeria timeline)
