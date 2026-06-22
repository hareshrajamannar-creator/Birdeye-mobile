# Architecture Decision Records

## ADR-001: Expo Router over React Navigation

**Date:** 2026-06-22  
**Status:** Accepted

**Decision:** Use Expo Router v4 for navigation.

**Reasons:** File-based routing aligns with web conventions, strong TypeScript support with `typedRoutes`, automatic deep link handling, and first-class Expo support. React Navigation remains an option if complex nested navigators are needed later.

---

## ADR-002: Design Tokens as plain TypeScript objects

**Date:** 2026-06-22  
**Status:** Accepted

**Decision:** Store all design tokens in `src/tokens/index.ts` as exported `const` objects. No theme provider or CSS-in-JS.

**Reasons:** React Native `StyleSheet.create()` is the fastest styling path. Tokens as constants give full TypeScript autocomplete and tree-shaking without runtime overhead. Theme switching (dark mode) deferred to future ADR.

---

## ADR-003: dayjs for date handling

**Date:** 2026-06-22  
**Status:** Accepted

**Decision:** Use `dayjs` (not `date-fns` or native `Date`).

**Reasons:** Tiny bundle (~2KB), immutable API, plugin system for timezone/locale when needed. The Social calendar view requires month navigation, day-of-week calculation, and date formatting — all covered by dayjs core.

---

## ADR-004: Month + List hybrid layout for Calendar view

**Date:** 2026-06-22  
**Status:** Accepted

**Decision:** Calendar Month View shows a month grid (fixed at top) with a scrollable list of posts for the selected day below — not a pure month grid.

**Reasons:** Pure month grids are too small for post content on mobile (confirmed by Hootsuite, Sprout Social, and Later patterns). Hybrid layout is the industry standard: grid for navigation/density overview, list for content consumption. This also reuses the existing `PostCard` component.

---

## ADR-005: No global state manager for Social MVP

**Date:** 2026-06-22  
**Status:** Accepted

**Decision:** Local component state + prop drilling for Social MVP. No Redux/Zustand/Context.

**Reasons:** Social module is self-contained. Adding a state manager for one feature adds complexity without benefit. Revisit when cross-tab state sharing is needed.
