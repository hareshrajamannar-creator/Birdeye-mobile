# Birdeye Mobile

Birdeye's native mobile app built with Expo + React Native (TypeScript).

## Product Intent

Birdeye Mobile brings the full Birdeye platform to iOS and Android. The first module in scope is **Social** — enabling businesses to view, schedule, and manage social media posts across platforms. The goal is feature parity with the web app, optimized for mobile-native interactions.

## Current Scope: Social Module

- **List View** — posts grouped by date with platform, status, and content preview
- **Calendar Month View** — month grid with post-density indicators, tap a day to see its posts (new feature)

### Planned views
- Week view
- Post detail / bottom sheet
- Create / schedule post flow

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Expo SDK 52 (React Native 0.76) |
| Language | TypeScript (strict) |
| Navigation | Expo Router v4 (file-based) |
| Styling | StyleSheet API + design token system |
| Date handling | dayjs |
| Icons | @expo/vector-icons (MaterialIcons + Ionicons) |
| Animation | React Native Reanimated 3 |
| Testing | Jest + React Native Testing Library |

## Setup

```bash
# Install dependencies
npm install

# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

Requires Node 20+ and Expo CLI (`npm install -g expo-cli`).

## Project Structure

```
src/
  tokens/         # Design tokens: colors, typography, spacing, radii
  types/          # Shared TypeScript types
  utils/          # Pure utility functions (dates, formatters)
  data/           # Mock data (replace with real API calls)
  components/     # Reusable component library (one folder per component)
  screens/        # Feature screens organized by module
    Social/
      SocialScreen.tsx        # Container — owns view-mode state
      ListView.tsx            # Chronological grouped list
      CalendarMonthView.tsx   # Month grid + day detail list
app/              # Expo Router: file = route
  _layout.tsx     # Root layout (safe area, gesture handler)
  (tabs)/         # Bottom tab group
    _layout.tsx   # Tab bar definition
    social.tsx    # Social entry point
docs/             # Architecture decisions and system diagrams
guardrails/       # Coding standards and review checklist
tests/            # Unit and integration tests
```

## Key Workflows

**Switching views (List ↔ Calendar):** Tap the calendar icon in the Social header toolbar. State is owned by `SocialScreen` and passed down.

**Navigating months (Calendar view):** Use the `<` and `>` arrows in the calendar header. Selected day defaults to today on mount.

**Post status chips:** `StatusChip` renders contextual labels — `Post expired` (red), `Pending approval` (yellow), `Rejected` (red with block icon), `Scheduled` (grey).

## Contributing

See [guardrails/coding-rules.md](guardrails/coding-rules.md) for standards and [.github/pull_request_template.md](.github/pull_request_template.md) for PR expectations.
