# Figma → Code Handoff — Projeto Mani

## Component Mapping Table

| Figma Component | React Component | Path | Variants | States |
|-----------------|-----------------|------|----------|--------|
| **Foundations** |
| Color/Primary | `tokens.colors.primary` | `tokens.json` | light/dark | default, hover |
| Color/Secondary | `tokens.colors.secondary` | `tokens.json` | light/dark | default, hover |
| Color/Background | `tokens.colors.background` | `tokens.json` | light/dark | - |
| Color/Surface | `tokens.colors.surface` | `tokens.json` | light/dark | default, elevated |
| Color/Text | `tokens.colors.text*` | `tokens.json` | light/dark | primary, secondary, muted, inverse |
| Typography/Display-Large | `text-display-lg` | `tailwind.config.ts` | - | - |
| Typography/Headline-Medium | `text-headline-md` | `tailwind.config.ts` | - | - |
| Typography/Body-Large | `text-body-lg` | `tailwind.config.ts` | - | - |
| Typography/Label-Large | `text-label-lg` | `tailwind.config.ts` | - | - |
| Spacing/4 | `spacing-4` (16px) | `tokens.json` | - | - |
| BorderRadius/lg | `rounded-lg` (12px) | `tokens.json` | - | - |
| Shadow/md | `shadow-md` | `tokens.json` | - | - |
| **Atoms** |
| Button/Primary | `Button` | `atoms/Button.tsx` | default, secondary, outline, ghost, destructive, link | default, hover, active, disabled, loading |
| Button/Secondary | `Button` (variant=secondary) | | | |
| Button/Outline | `Button` (variant=outline) | | | |
| Button/Ghost | `Button` (variant=ghost) | | | |
| Button/Destructive | `Button` (variant=destructive) | | | |
| Button/Icon | `Button` (size=icon) | | | |
| Input/Default | `Input` | `atoms/Input.tsx` | text, email, password, number, tel, url | default, focus, error, disabled, filled |
| Input/Search | `Input` + Icon | | | |
| Textarea/Default | `Textarea` | `atoms/Textarea.tsx` | - | default, focus, error, disabled |
| Select/Default | `Select` | `atoms/Select.tsx` | - | default, open, focus, error, disabled |
| Card/Default | `Card` | `atoms/Card.tsx` | default, elevated, outlined, interactive | default, hover, pressed |
| Badge/Default | `Badge` | `atoms/Badge.tsx` | default, secondary, outline, destructive | default |
| Badge/WithCount | `Badge` (with count) | | | |
| Avatar/Default | `Avatar` | `atoms/Avatar.tsx` | xs, sm, md, lg, xl | default, with image, with initials |
| Divider/Default | `Divider` | `atoms/Divider.tsx` | horizontal, vertical | default |
| Spinner/Default | `Spinner` | `atoms/Spinner.tsx` | sm, md, lg | default |
| Checkbox/Default | `Checkbox` | `atoms/Checkbox.tsx` | - | unchecked, checked, indeterminate, disabled |
| Radio/Default | `Radio` | `atoms/Radio.tsx` | - | unchecked, checked, disabled |
| RadioGroup/Default | `RadioGroup` | `atoms/RadioGroup.tsx` | vertical, horizontal | - |
| Switch/Default | `Switch` | `atoms/Switch.tsx` | - | off, on, disabled |
| Slider/Default | `Slider` | `atoms/Slider.tsx` | - | default, disabled |
| Icon/Default | `Icon` | `atoms/Icon.tsx` | xs, sm, md, lg, xl, 2xl | default |
| **Molecules** |
| AppointmentCard/Compact | `AppointmentCard` (variant=compact) | `molecules/AppointmentCard.tsx` | compact, full, detail | default, current, pressed |
| AppointmentCard/Full | `AppointmentCard` (variant=full) | | | |
| AppointmentCard/Detail | `AppointmentCard` (variant=detail) | | | |
| ClientCard/Default | `ClientCard` | `molecules/ClientCard.tsx` | default, compact | default, pressed |
| PostCard/Feed | `PostCard` | `molecules/PostCard.tsx` | feed, detail | default, pressed, liked, saved |
| MetricCard/Default | `MetricCard` | `molecules/MetricCard.tsx` | default, compact, elevated | default, loading |
| TransactionItem/Default | `TransactionItem` | `molecules/TransactionItem.tsx` | default, compact, detailed | default, pressed |
| Stepper/Anamnese | `Stepper` | `molecules/Stepper.tsx` | vertical, horizontal | default, validating, completed |
| FilterChips/Default | `FilterChips` | `molecules/FilterChips.tsx` | default, outline | default, selected, scrollable |
| TagInput/Default | `TagInput` | `molecules/TagInput.tsx` | - | default, focused, with suggestions |
| FormField/Default | `FormField` | `molecules/FormField.tsx` | text, email, password, textarea, select, switch, checkbox, radio, slider, tags | default, error, disabled |
| SearchBar/Default | `SearchBar` | `molecules/SearchBar.tsx` | - | default, focused, with filter |
| PhaseChips/Default | `PhaseChips` | `molecules/PhaseChips.tsx` | agendado, atendimento, finalizacao, pagamento, concluido, cancelado | default, active |
| ListItem/Default | `ListItem` | `molecules/ListItem.tsx` | - | default, pressed |
| Toast/Default | `Toast` | `molecules/Toast.tsx` | default, success, error, warning | enter, exit, dismissing |
| EmptyState/Default | `EmptyState` | `molecules/EmptyState.tsx` | no-appointments, no-clients, no-photos, no-posts | default |
| **Organisms** |
| BottomTabBar/Default | `BottomTabBar` | `organisms/BottomTabBar.tsx` | default, floating | default, active |
| TopBar/Default | `TopBar` | `organisms/TopBar.tsx` | default, transparent, elevated | default, hidden (scroll) |
| Modal/Default | `Modal` | `organisms/Modal.tsx` | - | enter, exit, open |
| BottomSheet/Default | `BottomSheet` | `organisms/BottomSheet.tsx` | small, medium, large, full | closed, half, full |
| Calendar/Month | `Calendar` | `organisms/Calendar.tsx` | month, week, day | default, selected, today, event |
| PhotoGrid/Default | `PhotoGrid` | `organisms/PhotoGrid.tsx` | 1, 2, 3 columns | default, loading, skeleton |
| SignaturePad/Default | `SignaturePad` | `organisms/SignaturePad.tsx` | - | default, drawing, signed |
| ImagePicker/Default | `ImagePicker` | `organisms/ImagePicker.tsx` | default, modal | default, selecting |
| FeedGrid/Default | `FeedGrid` | `organisms/FeedGrid.tsx` | 1, 2, 3 columns | default, loading, empty, refreshing |
| FolderDrawer/Default | `FolderDrawer` | `organisms/FolderDrawer.tsx` | small, medium, large, full | closed, open, editing |
| FilterDrawer/Default | `FilterDrawer` | `organisms/FilterDrawer.tsx` | small, medium, large, full | closed, open |
| **Templates** |
| ScreenLayout/Default | `ScreenLayout` | `templates/ScreenLayout.tsx` | - | - |
| FormLayout/Default | `FormLayout` | `templates/FormLayout.tsx` | - | - |
| ListLayout/Default | `ListLayout` | `templates/ListLayout.tsx` | - | - |
| DashboardLayout/Default | `DashboardLayout` | `templates/DashboardLayout.tsx` | - | - |
| DetailLayout/Default | `DetailLayout` | `templates/DetailLayout.tsx` | - | - |

---

## Figma Variable Mapping

### Colors (Collections: Primitives, Semantics)

| Figma Variable | Token Path | Type |
|----------------|------------|------|
| `primitives/purple/500` | `colors.light.primary` | Color |
| `primitives/purple/600` | `colors.light.primaryHover` | Color |
| `primitives/pink/500` | `colors.light.secondary` | Color |
| `primitives/pink/600` | `colors.light.secondaryHover` | Color |
| `primitives/slate/50` | `colors.light.background` | Color |
| `primitives/white` | `colors.light.surface` | Color |
| `primitives/slate/200` | `colors.light.border` | Color |
| `primitives/slate/900` | `colors.light.textPrimary` | Color |
| `primitives/purple/400` | `colors.dark.primary` | Color |
| `primitives/purple/500` | `colors.dark.primaryHover` | Color |
| `primitives/pink/400` | `colors.dark.secondary` | Color |
| `primitives/pink/500` | `colors.dark.secondaryHover` | Color |
| `primitives/slate/950` | `colors.dark.background` | Color |
| `primitives/slate/800` | `colors.dark.surface` | Color |
| `primitives/slate/700` | `colors.dark.border` | Color |
| `primitives/slate/50` | `colors.dark.textPrimary` | Color |

### Typography (Collection: Typography)

| Figma Variable | Token Path |
|----------------|------------|
| `display-large/font-family` | `typography.displayLarge.fontFamily` |
| `display-large/font-size` | `typography.displayLarge.fontSize` |
| `display-large/font-weight` | `typography.displayLarge.fontWeight` |
| `display-large/line-height` | `typography.displayLarge.lineHeight` |
| `display-large/letter-spacing` | `typography.displayLarge.letterSpacing` |
| `headline-medium/font-family` | `typography.headlineMedium.fontFamily` |
| `headline-medium/font-size` | `typography.headlineMedium.fontSize` |
| `headline-medium/font-weight` | `typography.headlineMedium.fontWeight` |
| `headline-medium/line-height` | `typography.headlineMedium.lineHeight` |
| `body-large/font-family` | `typography.bodyLarge.fontFamily` |
| `body-large/font-size` | `typography.bodyLarge.fontSize` |
| `body-large/font-weight` | `typography.bodyLarge.fontWeight` |
| `body-large/line-height` | `typography.bodyLarge.lineHeight` |
| `label-large/font-family` | `typography.labelLarge.fontFamily` |
| `label-large/font-size` | `typography.labelLarge.fontSize` |
| `label-large/font-weight` | `typography.labelLarge.fontWeight` |
| `label-large/line-height` | `typography.labelLarge.lineHeight` |

### Spacing (Collection: Spacing)

| Figma Variable | Token Path |
|----------------|------------|
| `spacing/1` | `spacing.1` (4px) |
| `spacing/2` | `spacing.2` (8px) |
| `spacing/3` | `spacing.3` (12px) |
| `spacing/4` | `spacing.4` (16px) |
| `spacing/5` | `spacing.5` (20px) |
| `spacing/6` | `spacing.6` (24px) |
| `spacing/8` | `spacing.8` (32px) |
| `spacing/10` | `spacing.10` (40px) |
| `spacing/12` | `spacing.12` (48px) |
| `spacing/16` | `spacing.16` (64px) |

### Border Radius (Collection: Border Radius)

| Figma Variable | Token Path |
|----------------|------------|
| `radius/none` | `borderRadius.none` (0) |
| `radius/sm` | `borderRadius.sm` (4) |
| `radius/md` | `borderRadius.md` (8) |
| `radius/lg` | `borderRadius.lg` (12) |
| `radius/xl` | `borderRadius.xl` (16) |
| `radius/2xl` | `borderRadius.2xl` (24) |
| `radius/full` | `borderRadius.full` (9999) |

### Shadows (Collection: Shadows)

| Figma Variable | Token Path |
|----------------|------------|
| `shadow/xs` | `shadows.xs` |
| `shadow/sm` | `shadows.sm` |
| `shadow/md` | `shadows.md` |
| `shadow/lg` | `shadows.lg` |
| `shadow/xl` | `shadows.xl` |
| `shadow/2xl` | `shadows.2xl` |

---

## Handoff Annotations

### Responsive Breakpoints
| Breakpoint | Width | Tailwind | Usage |
|------------|-------|----------|-------|
| Mobile | < 640px | default | All components |
| Tablet | 640px - 1023px | `md:` | Grid columns, padding |
| Desktop | ≥ 1024px | `lg:` | Sidebar layouts |

### Component States (All Interactive Components)

| State | Visual Change | Tailwind Class |
|-------|---------------|----------------|
| Default | Base style | - |
| Hover | `opacity-80` / `bg-opacity-90` | `hover:opacity-80` |
| Active/Pressed | `scale-[0.98]` / `bg-darker` | `active:scale-[0.98]` |
| Focus | `ring-2 ring-[#8B5CF6] ring-offset-2` | `focus:ring-2 focus:ring-[#8B5CF6] focus:ring-offset-2` |
| Disabled | `opacity-50` + `cursor-not-allowed` | `disabled:opacity-50 disabled:cursor-not-allowed` |
| Loading | Spinner replaces content | Custom |
| Error | `border-[#EF4444]` + error text | `border-[#EF4444]` |
| Selected | `bg-[#8B5CF6]` / `border-[#8B5CF6]` | Custom per component |

### Spacing Scale Usage
- **xs (4px):** Icon gaps, badge padding
- **sm (8px):** Button padding, card gaps
- **md (12px):** Form field gaps
- **lg (16px):** Card padding, screen margins
- **xl (24px):** Section gaps
- **2xl (32px):** Major section gaps
- **3xl (48px):** Page-level gaps
- **4xl (64px):** Layout-level gaps

### Touch Targets
- **Minimum:** 48×48dp (`min-h-[48px] min-w-[48px]`)
- **Comfortable:** 56×56dp for primary actions
- **All interactive elements** must meet minimum

### Dark Mode
- All colors defined in `tokens.json` with `light`/`dark` objects
- Use semantic color tokens (`primary`, `surface`, `textPrimary`) not primitive values
- Test all components in both modes

### Accessibility Checklist
- [ ] Color contrast ≥ 4.5:1 (text), ≥ 3:1 (UI elements)
- [ ] Touch targets ≥ 48dp
- [ ] Focus indicators visible
- [ ] Screen reader labels (`accessibilityLabel`)
- [ ] State announcements (`accessibilityState`)
- [ ] Reduce motion support
- [ ] Dynamic type support (font scaling)

---

## Export Checklist for Figma

### Assets to Export
- [ ] All icons (24px stroke 2) → SVG
- [ ] Empty state illustrations (4) → SVG + PNG @2x/@3x
- [ ] Splash screens → PNG @2x/@3x (iOS/Android)
- [ ] Store screenshots templates → Figma frames
- [ ] Logo variants → SVG (primary, monochrome, icon)

### Component Library
- [ ] Publish all components to Figma Library
- [ ] Add descriptions to each component
- [ ] Link to code component in description
- [ ] Mark deprecated components
- [ ] Version: `v1.0.0-hi-fi`

### Tokens
- [ ] Publish color variables (primitives + semantics)
- [ ] Publish typography variables
- [ ] Publish spacing variables
- [ ] Publish border radius variables
- [ ] Publish shadow variables