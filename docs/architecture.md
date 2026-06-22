# Architecture

## Overview

Birdeye Mobile is a single-codebase Expo app targeting iOS and Android. Navigation is file-based via Expo Router v4. The app is structured around feature modules (Social, Inbox, Reviews, etc.), each living under `src/screens/<Module>/`.

## Navigation

```
app/
  _layout.tsx          ← Root: SafeAreaProvider, GestureHandlerRootView
  (tabs)/
    _layout.tsx         ← Bottom tab bar (5 tabs matching Figma)
    inbox.tsx
    reviews.tsx
    social.tsx          ← Social module entry point
    more.tsx
```

Expo Router maps each file in `app/` to a URL-addressable route. Deep links use the `birdeye://` scheme.

## State Management

No global state manager (Redux, Zustand) in scope for the Social MVP. State is local to each screen with props drilling to children. If state needs to be shared across tabs, evaluate Zustand or Context at that point.

## Design System

All visual values come from `src/tokens/index.ts`:
- `Colors` — brand, semantic, platform palette
- `Typography` — font sizes, weights, line heights
- `Spacing` — 4px-grid spacing scale
- `BorderRadius` — consistent corner radii
- `Shadows` — elevation shadows (iOS + Android)

Components consume tokens directly. There are no CSS variables or theme providers — tokens are plain TypeScript objects.

## Data Layer

Current: mock data in `src/data/mockPosts.ts`. Production will call Birdeye's existing REST API. Components consume typed `Post[]` — swap mock for API without touching UI code.

## Platform Considerations

- iOS: uses SF Pro system font automatically via `fontFamily: 'System'`
- Android: uses Roboto by default
- Both: `Platform.select()` for platform-specific style overrides
- Safe areas handled via `react-native-safe-area-context`

## Social Module Architecture

```
SocialScreen
  ├── TopBar (title, view toggle, filters)
  ├── [mode === 'list']  → ListView
  │     └── SectionList
  │           ├── SectionHeader (date + day name)
  │           └── PostCard (platform, status, content, media thumb)
  └── [mode === 'month'] → CalendarMonthView
        ├── MonthHeader (< Month Year >)
        ├── CalendarGrid (7×6 day grid with post dots)
        └── DayDetailList (posts for selected day)
              └── PostCard
```
