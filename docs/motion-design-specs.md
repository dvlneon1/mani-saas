# Motion Design Specifications — Projeto Mani

## Overview
All animations use **Reanimated 3** with worklet-based animations for 60fps performance on React Native.

---

## 1. Tab Transition
**Component:** `BottomTabBar`
**Duration:** 200ms
**Easing:** `Easing.out(Easing.cubic)`

```typescript
// Slide + Fade
const translateX = useSharedValue(0);
const opacity = useSharedValue(1);

// On tab change:
translateX.value = withTiming(newIndex * tabWidth, { duration: 200, easing: Easing.out(Easing.cubic) });
opacity.value = withTiming(0, { duration: 100 }, () => {
  opacity.value = withTiming(1, { duration: 100 });
});
```

**Spec:**
- Active indicator slides smoothly between tabs
- Icon scales 1.1x on press (100ms)
- Label color transitions with tab

---

## 2. Modal Enter/Exit
**Component:** `Modal`
**Duration:** 250ms
**Easing:** `Easing.out(Easing.back(1.2))` (spring)

```typescript
const scale = useSharedValue(0.9);
const opacity = useSharedValue(0);

// Enter:
scale.value = withSpring(1, { damping: 15, stiffness: 150 });
opacity.value = withTiming(1, { duration: 200 });

// Exit:
scale.value = withSpring(0.9, { damping: 15, stiffness: 150 });
opacity.value = withTiming(0, { duration: 150 });
```

**Spec:**
- Backdrop fades in/out (200ms)
- Content scales from 0.9 → 1.0 with slight overshoot
- Keyboard-aware: slides up if keyboard opens

---

## 3. BottomSheet
**Component:** `BottomSheet` / `FolderDrawer` / `FilterDrawer`
**Snap Points:** 30%, 50%, 70%, 90%
**Gesture:** Pan gesture with velocity-based snap

```typescript
const translateY = useSharedValue(snapPoints[1]); // Start at medium

const gesture = useAnimatedGestureHandler({
  onStart: (_, ctx: any) => { ctx.startY = translateY.value; },
  onActive: (event, ctx: any) => {
    translateY.value = ctx.startY + event.translationY;
  },
  onEnd: (event) => {
    const velocity = event.velocityY;
    const nextSnap = findNearestSnap(translateY.value, velocity);
    translateY.value = withSpring(nextSnap, { damping: 20, stiffness: 200 });
  },
});
```

**Spec:**
- Drag handle always visible
- Backdrop opacity: 0 → 0.5 based on height
- Haptic feedback on snap
- Dismiss on drag down past threshold (100px)

---

## 4. Card Press
**Component:** `Card` (interactive variant), `AppointmentCard`, `ClientCard`, `PostCard`
**Duration:** 100ms

```typescript
const scale = useSharedValue(1);

const pressIn = () => { scale.value = withTiming(0.98, { duration: 50 }); };
const pressOut = () => { scale.value = withTiming(1, { duration: 50, easing: Easing.out(Easing.cubic) }); };

// Style:
transform: [{ scale: scale.value }];
```

**Spec:**
- Scale to 0.98 on press
- Spring back with slight bounce
- Ripple effect on Android (native)

---

## 5. Pull-to-Refresh
**Component:** `ScrollView` / `FlatList` (FeedGrid, PhotoGrid)
**Duration:** 300ms spinner + 400ms bounce

```typescript
const progress = useSharedValue(0);
const spin = useSharedValue(0);

// On pull:
progress.value = withTiming(Math.min(pullDistance / 80, 1), { duration: 50 });
spin.value = withTiming(spin.value + 1, { duration: 1000, easing: Easing.linear });

// On release (refreshing):
progress.value = withSpring(1, { damping: 15, stiffness: 150 });
// After refresh:
progress.value = withSpring(0, { damping: 20, stiffness: 200 });
```

**Spec:**
- Custom spinner (3 dots pulsing)
- Content overscroll with resistance
- Bounce back animation on complete

---

## 6. PhotoGrid Load
**Component:** `PhotoGrid`
**Stagger:** 50ms per item
**Duration:** 300ms per item

```typescript
const opacity = useSharedValue(0);
const translateY = useSharedValue(20);

// Staggered entrance:
items.forEach((item, index) => {
  item.opacity.value = withDelay(index * 50, withTiming(1, { duration: 300 }));
  item.translateY.value = withDelay(index * 50, withSpring(0, { damping: 20, stiffness: 200 }));
});
```

**Spec:**
- Progressive image load: blurhash → low quality → full
- Skeleton shimmer while loading (1.5s loop)
- Staggered fade-in + slide-up

---

## 7. Toast
**Component:** `Toast`
**Enter:** Slide up + fade (300ms spring)
**Exit:** Slide down + fade (200ms)
**Auto-dismiss:** 4s default

```typescript
const translateY = useSharedValue(100);
const opacity = useSharedValue(0);

// Enter:
translateY.value = withSpring(0, { damping: 20, stiffness: 200 });
opacity.value = withTiming(1, { duration: 200 });

// Exit:
translateY.value = withTiming(100, { duration: 200 });
opacity.value = withTiming(0, { duration: 200 });
```

**Spec:**
- Enters from bottom safe area
- Swipe to dismiss gesture
- Stack multiple toasts with gap

---

## 8. Skeleton Shimmer
**Component:** `Skeleton` (used in PhotoGrid, FeedGrid, lists)
**Duration:** 1.5s loop
**Easing:** `Easing.linear`

```typescript
const translateX = useSharedValue(-100);

translateX.value = withTiming(100, {
  duration: 1500,
  easing: Easing.linear,
}, () => {
  translateX.value = -100;
  // Loop
});

// Gradient mask:
<LinearGradient
  colors={['#E5E7EB', '#F3F4F6', '#E5E7EB']}
  locations={[
    translateX.value.interpolate({ inputRange: [-100, 100], outputRange: [0, 0.3] }),
    translateX.value.interpolate({ inputRange: [-100, 100], outputRange: [0.3, 0.7] }),
    translateX.value.interpolate({ inputRange: [-100, 100], outputRange: [0.7, 1] }),
  ]}
  start={{ x: 0, y: 0.5 }}
  end={{ x: 1, y: 0.5 }}
/>
```

**Spec:**
- Left-to-right shimmer wave
- Colors: border → surface → border
- Applied to all skeleton placeholders

---

## 9. Navigation Transitions (Stack)
**Screen Transitions:** 300ms
**Easing:** `Easing.out(Easing.cubic)`

```typescript
// Push:
cardStyleInterpolator: ({ current: { progress } }) => ({
  cardStyle: {
    transform: [
      { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [width, 0] }) },
    ],
    overlay: { opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 0.5] }) },
  },
});

// Pop:
cardStyleInterpolator: ({ current: { progress } }) => ({
  cardStyle: {
    transform: [
      { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, width] }) },
    ],
  },
});
```

---

## 10. Micro-interactions

| Interaction | Component | Duration | Easing |
|-------------|-----------|----------|--------|
| Button press | `Button` | 50ms scale | `Easing.out(Easing.quad)` |
| Switch toggle | `Switch` | 150ms | Native spring |
| Checkbox check | `Checkbox` | 100ms | `Easing.out(Easing.back(1.5))` |
| Badge dismiss | `Badge` | 200ms | `Easing.in(Easing.quad)` |
| Accordion expand | `Accordion` | 250ms | `Easing.out(Easing.cubic)` |
| Tooltip show | `Tooltip` | 150ms | `Easing.out(Easing.quad)` |
| Dropdown open | `Select` | 200ms | `Easing.out(Easing.cubic)` |

---

## Performance Guidelines

1. **Use `useSharedValue` + `useAnimatedStyle`** — keep animations on UI thread
2. **Minimize re-renders** — pass animated styles via `animatedProps` or style prop
3. **Batch updates** — use `runOnUI` for complex calculations
4. **Reduce worklet size** — extract constants outside worklets
5. **Test on low-end devices** — target 60fps on 5-year-old phones

---

## Accessibility

- **Reduce Motion:** Respect `reduceMotionEnabled` from `react-native-reanimated` / system settings
- **Disable animations** when `prefersReducedMotion` is true
- **Provide instant transitions** for accessibility mode

```typescript
const { reduceMotionEnabled } = useReducedMotion();

const duration = reduceMotionEnabled ? 0 : 250;
const easing = reduceMotionEnabled ? Easing.linear : Easing.out(Easing.cubic);
```

---

## Implementation Checklist

- [ ] Tab transition (slide + fade)
- [ ] Modal enter/exit (scale + fade spring)
- [ ] BottomSheet drag gesture + snap points
- [ ] Card press scale (0.98)
- [ ] Pull-to-refresh (spinner + bounce)
- [ ] PhotoGrid staggered load
- [ ] Toast slide up + auto-dismiss
- [ ] Skeleton shimmer (1.5s loop)
- [ ] Stack navigation transitions
- [ ] All micro-interactions
- [ ] Reduce motion support
- [ ] Performance profiling on device