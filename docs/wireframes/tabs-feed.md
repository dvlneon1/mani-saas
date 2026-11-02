# tabs-feed.md — Feed de Inspiração (Grid + Filtros + Pastas + 'Quero esta')

## Layout ASCII — Mobile 375px

### Grid Principal
```
┌─────────────────────────────────────┐
│ Feed              🔍  📁  ⋯      │ ← Top Bar + search + folders
├─────────────────────────────────────┤
│ [Todas] [Fibra] [Gel] [Arte] [⋯]  │ ← Filter chips horizontal scroll
├─────────────────────────────────────┤
│ ██████████ ██████████ ██████████  │ ← Masonry grid 2 col
│ ██████████ ██████████ ██████████  │   4:5 ratio, blurhash loading
│ ██████████ ██████████ ██████████  │
│ ██████████ ██████████ ██████████  │
│ ██████████ ██████████ ██████████  │
└─────────────────────────────────────┘
← Pull-to-refresh | Infinite scroll
```

### Post Card (Grid Item)
```
┌──────────────────┐  ┌──────────────────┐
│ ████████████████ │  │ ████████████████ │
│ ████████████████ │  │ ████████████████ │  ← Image 4:5
│ ████████████████ │  │ ████████████████ │
│ ████████████████ │  │ ████████████████ │
├──────────────────┤  ├──────────────────┤
│ 💅 Fibra  🎨 Nude│  │ 💅 Gel    🎨 Rosa│  ← Tags line
│ 12 min  R$ 280-350│  │ 90 min  R$ 180-250│
│ 🤍 24  📌 8  📤 3 │  │ 🤍 18  📌 5  📤 1 │
│ [Quero esta ▸]   │  │ [Quero esta ▸]   │  ← CTA primário
└──────────────────┘  └──────────────────┘
```

### Detalhe Post (Modal Fullscreen)
```
┌─────────────────────────────────────┐
│ ✕                              📤  │
├─────────────────────────────────────┤
│ ██████████████████████████████████ │ ← Full image pinch zoom
│ ██████████████████████████████████ │
│ ██████████████████████████████████ │
├─────────────────────────────────────┤
│ Alongamento Fibra Encapsulada Nude │
│ 💅 Fibra Vidro  🎨 Nude  ✨ Clean  │ ← Tags clicáveis
│ ⏱ 120 min  💰 R$ 300-380          │
│ 👩‍🎨 @nailartist_maria             │
├─────────────────────────────────────┤
│ Produtos usados:                    │
│ • Gel Construtor Risqué Clear      │
│ • Fibra de Vidro 3mm Bella Bird    │
│ • Top Coat Brilho Intenso          │
│ [🔗 Comprar] [🔗 Comprar] [🔗 Comprar]│
├─────────────────────────────────────┤
│ [🤍 Salvar] [📤 Compartilhar]       │
│ [💬 Quero esta ▸] ← CTA DESTAQUE    │
└─────────────────────────────────────┘
```

### "Quero esta" → Pré-Agenda (Modal)
```
┌─────────────────────────────────────┐
│ Agendar esta inspiração        ✕   │
├─────────────────────────────────────┤
│ ██████████████████████████████████ │ ← Thumb inspiração
├─────────────────────────────────────┤
│ Cliente *                           │
│ [Maria Silva ▼]  [+ Novo cliente]  │
├─────────────────────────────────────┤
│ Serviço pré-preenchido ✓            │
│ Alongamento Fibra Encapsulada Nude  │
│ Duração: 120 min  •  Preço: R$ 350 │
├─────────────────────────────────────┤
│ 📅 Sugestão: Janela manutenção     │
│    18-21 dias → 02/02 a 05/02      │
│ [Ver agenda ▸]                      │
├─────────────────────────────────────┤
│ Sinal (30%): R$ 105,00              │
│ [Confirmar agendamento]             │
└─────────────────────────────────────┘
```

### Pastas (BottomSheet)
```
┌─────────────────────────────────────┐
│ Minhas Pastas                  ✕   │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ 💅 Para fazer              (12) │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🎨 Cores favoritas           (8)│ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 📚 Técnicas para aprender    (5)│ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ✨ Inspiração geral            (23)│ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [+ Nova pasta]                      │
└─────────────────────────────────────┘
```

### Filtros Avançados (Drawer)
```
┌─────────────────────────────────────┐
│ Filtros                       ✕    │
├─────────────────────────────────────┤
│ Técnica                             │
│ [☑] Fibra vidro  [☑] Gel  [☐] Poly │
│ [☐] Acrílico  [☐] Blindagem        │
├─────────────────────────────────────┤
│ Cor                                 │
│ [☑] Nude  [☑] Rosa  [☐] Vermelho   │
│ [☐] Preto  [☐] Branco  [☐] Glitter │
├─────────────────────────────────────┤
│ Estilo                              │
│ [☐] Minimalista  [☐] Clean Girl    │
│ [☐] Francesa  [☐] Encapsulada      │
├─────────────────────────────────────┤
│ Duração: [30 min] — [180 min]      │ ← Range slider
│ Preço:  [R$ 50] — [R$ 500]         │
├─────────────────────────────────────┤
│ Fonte: [☑] Oficial  [☑] UGC        │
├─────────────────────────────────────┤
│       [Limpar]      [Aplicar (12)]  │
└─────────────────────────────────────┘
```

## Componentes
- FeedGrid (FlashList masonry, 2 col, 4:5)
- PostCard (image, tags, engagement, CTA)
- PostDetailModal (fullscreen, zoom, products)
- QuieroEstaModal (client select, pre-filled service)
- FolderBottomSheet (list + create)
- FilterDrawer (technique, color, style, range)
- TagChip (filterable, selectable)

## Estados
- Loading: Blurhash → Low-res → Full (progressive)
- Empty: "Nenhuma inspiração" + [Ver sugestões]
- Error: Placeholder + retry
- Offline: Cached posts + sync badge

## Ações Thumb Zone
- "Quero esta" (CTA primário — destaque visual)
- Salvar na pasta (long press ou swipe)
- Compartilhar
- Filtrar (chips topo)
- Ver pastas (ícone topo)
