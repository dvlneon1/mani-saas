# Design Review Handoff Checklist — FASE 1.3

## Overview
**Project:** Projeto Mani — SaaS Nail Designers
**Phase:** 1.3 Hi-Fi Design System
**Date:** 2026-11-02
**Gate:** Design Review (UI/UX + Front-end Dev + PO)

---

## ✅ Deliverables Checklist

### 1. Figma Library
- [ ] **File published:** `Mani Design System v1.0.0-hi-fi`
- [ ] **Structure organized:**
  - [ ] Foundations (Colors, Typography, Spacing, Border Radius, Shadows, Breakpoints)
  - [ ] Atoms (Button, Input, Card, Badge, Avatar, Divider, Spinner, Icon, Checkbox, Radio, Switch, Slider)
  - [ ] Molecules (AppointmentCard, ClientCard, PostCard, MetricCard, TransactionItem, Stepper, FilterChips, TagInput, FormField, SearchBar, PhaseChips, ListItem, Toast, EmptyState)
  - [ ] Organisms (BottomTabBar, TopBar, Modal, BottomSheet, Calendar, PhotoGrid, SignaturePad, ImagePicker, FeedGrid, FolderDrawer, FilterDrawer)
  - [ ] Templates (ScreenLayout, FormLayout, ListLayout, DashboardLayout, DetailLayout)
  - [ ] Pages (Hoje, AgendaSemana, AgendaDia, AgendaDetalhe, ClientesLista, ClientePerfil, Anamnese, Galeria, FinanceiroCaixa, Lancamento, Relatorios, FeedGrid, FeedDetalhe, FeedPastas, Perfil, Configuracoes, WhatsApp, Plano, Equipe, Tema)
- [ ] **All components have:**
  - [ ] Variants documented
  - [ ] States documented (default, hover, active, focus, disabled, loading, error)
  - [ ] Props table in description
  - [ ] Link to code component
  - [ ] Accessibility notes

### 2. Design System Package (`packages/design-system/`)
- [ ] **Tokens:** `tokens.json` (source of truth)
- [ ] **Tailwind Config:** `tailwind.config.ts` (maps tokens)
- [ ] **Atoms:** 13 components exported
  - [ ] Button, Input, Textarea, Card, Badge, Avatar, Divider, Spinner
  - [ ] Checkbox, Radio, RadioGroup, Switch, Slider, Select
  - [ ] Icon (50+ Lucide icons)
- [ ] **Molecules:** 14 components exported
  - [ ] AppointmentCard (3 variants)
  - [ ] ClientCard
  - [ ] PostCard
  - [ ] MetricCard
  - [ ] TransactionItem
  - [ ] Stepper (anamnese 3 steps)
  - [ ] FilterChips
  - [ ] TagInput
  - [ ] FormField
  - [ ] SearchBar
  - [ ] PhaseChips
  - [ ] ListItem
  - [ ] Toast
  - [ ] EmptyState (4 illustrations)
- [ ] **Organisms:** 11 components exported
  - [ ] BottomTabBar
  - [ ] TopBar
  - [ ] Modal
  - [ ] BottomSheet
  - [ ] Calendar (month/week/day, drag-drop)
  - [ ] PhotoGrid (masonry 2-col, progressive load)
  - [ ] SignaturePad
  - [ ] ImagePicker
  - [ ] FeedGrid
  - [ ] FolderDrawer
  - [ ] FilterDrawer
- [ ] **Build passes:** `npm run build` in design-system ✓
- [ ] **Types exported:** All components have TypeScript types

### 3. Motion Design Specs (`docs/motion-design-specs.md`)
- [ ] Tab transition (slide + fade 200ms)
- [ ] Modal enter/exit (scale + fade 250ms spring)
- [ ] BottomSheet (drag gesture, snap points)
- [ ] Card press (scale 0.98, 100ms)
- [ ] Pull-to-refresh (spinner + bounce)
- [ ] PhotoGrid load (staggered fade-in)
- [ ] Toast (slide up + auto-dismiss)
- [ ] Skeleton shimmer (1.5s loop)
- [ ] Stack navigation transitions
- [ ] Micro-interactions table
- [ ] Reduce motion support
- [ ] Performance guidelines

### 4. Assets (`docs/brand-assets.md`)
- [ ] Logo final (primary, dark, mono-light, mono-dark, icon)
- [ ] Paleta aplicada (Purple #8B5CF6 + Coral #EC4899)
- [ ] Tipografia Inter (display/headline/body/label scales)
- [ ] Tom de voz visual documentado
- [ ] Icons (Lucide set, 24px stroke 2) - mapped in code
- [ ] Illustrations empty states (4) - specified
- [ ] Splash screens templates (iOS/Android) - specified
- [ ] Store screenshots templates (6.5", 5.5", tablet) - specified

### 5. Figma → Code Sync
- [ ] **Style Dictionary config:** `style-dictionary.config.json`
- [ ] **Component mapping table:** `docs/figma-handoff.md`
- [ ] **Handoff annotations:** Spacing, states, responsive breakpoints
- [ ] **Variable mapping:** Colors, Typography, Spacing, Border Radius, Shadows

### 6. Documentation
- [ ] `docs/motion-design-specs.md`
- [ ] `docs/figma-handoff.md`
- [ ] `docs/brand-assets.md`
- [ ] `style-dictionary.config.json`
- [ ] Updated `packages/design-system/README.md`

---

## 🔍 Quality Gates

### Visual Design Review (UI/UX)
- [ ] **Color contrast:** All text ≥ 4.5:1, UI elements ≥ 3:1 (both modes)
- [ ] **Touch targets:** All interactive ≥ 48dp, primary ≥ 56dp
- [ ] **Dark mode:** All components render correctly in dark theme
- [ ] **Spacing consistency:** 4px base scale used throughout
- [ ] **Border radius consistency:** 12px cards, 9999px pills, 8px inputs
- [ ] **Shadow hierarchy:** xs/sm for cards, md for elevated, lg for modals
- [ ] **Typography scale:** Consistent across all components
- [ ] **Icon consistency:** 24px, 2px stroke, Lucide style
- [ ] **Empty states:** 4 illustrations match brand tone
- [ ] **Photo-first focus:** UI recedes, photos are hero
- [ ] **Responsive:** Breakpoints at 640px, 1024px documented

### Technical Review (Front-end Dev)
- [ ] **Build passes:** `npm run build` ✓ in design-system
- [ ] **TypeScript:** Strict mode, no `any`, all props typed
- [ ] **NativeWind v4:** Classes map to tokens correctly
- [ ] **cva usage:** Variants use class-variance-authority
- [ ] **Reanimated 3:** Motion specs use worklets, UI thread
- [ ] **Accessibility:** All components have `accessibilityRole`, `Label`, `State`
- [ ] **Performance:** No layout thrashing, animations on UI thread
- [ ] **Tree-shaking:** Components export individually
- [ ] **Peer deps:** react-native, react, nativewind, cva, reanimated
- [ ] **Platform support:** iOS + Android tested

### Product Review (PO)
- [ ] **Brand alignment:** Purple/coral palette, Inter typography, sophisticated tone
- [ ] **Feature coverage:** All priority compounds implemented
- [ ] **AppointmentCard:** 3 variants (compact/semana, full/dia, detail/modal) ✓
- [ ] **ClientCard:** Avatar, badges, LTV, actions ✓
- [ ] **PostCard:** 4:5 image, tags, engagement, "Quero esta" CTA ✓
- [ ] **PhotoGrid:** Masonry 2-col, progressive blurhash→low→full ✓
- [ ] **Calendar:** Month/week/day, drag-drop, conflict indicator ✓
- [ ] **SignaturePad:** Canvas, clear, stroke config, save ✓
- [ ] **Stepper:** Anamnese 3 steps, validation per step ✓
- [ ] **FilterChips:** Horizontal scroll, multi-select, clear ✓
- [ ] **TagInput:** Select + custom, chips removable ✓
- [ ] **FolderDrawer:** Bottom sheet, create/edit/delete ✓
- [ ] **MetricCard:** Icon, value, label, trend ✓
- [ ] **TransactionItem:** Type badge, value, status, method ✓
- [ ] **Scope complete:** No missing priority components

---

## 📋 Sign-off

| Role | Name | Approved | Date | Comments |
|------|------|----------|------|----------|
| UI/UX Designer | | ☐ | | |
| Front-end Developer | | ☐ | | |
| Product Owner | | ☐ | | |

---

## 🚀 Next Steps (Post-Gate)

1. **Figma Library** → Share link with team, enable library in project files
2. **Style Dictionary** → Run `npx style-dictionary build` to generate Figma tokens
3. **Storybook** → Set up Storybook for design-system package (optional)
4. **Integration** → Start consuming components in `apps/mobile`
5. **Testing** → Visual regression tests for all components
6. **Documentation** → Publish to internal docs site

---

## 📁 File Inventory

```
docs/
├── motion-design-specs.md      # Motion specifications
├── figma-handoff.md            # Component mapping + handoff annotations
├── brand-assets.md             # Brand guidelines + asset specs
└── design-review-checklist.md  # This file

packages/design-system/
├── src/
│   ├── components/
│   │   ├── atoms/              # 13 components
│   │   ├── molecules/          # 14 components
│   │   └── organisms/          # 11 components
│   ├── theme.ts                # Token exports
│   └── index.ts                # Main exports
├── tokens.json                 # Source tokens
├── tailwind.config.ts          # Tailwind mapping
├── package.json
└── README.md

style-dictionary.config.json    # Figma sync config
```

---

## ⚠️ Known Limitations / Follow-ups

1. **SignaturePad** — Uses simplified PanResponder; production needs `react-native-signature-canvas`
2. **PhotoGrid blurhash** — Placeholder only; needs `blurhash` package integration
3. **Calendar drag-drop** — Basic implementation; needs `react-native-draggable-flatlist` for production
4. **ImagePicker** — Mock implementation; needs `expo-image-picker` integration
5. **Animations** — Specs documented; implementation in consuming app
6. **Icons** — Text-based fallback; replace with `lucide-react-native` package

---

*Generated for FASE 1.3 Design Review Gate*