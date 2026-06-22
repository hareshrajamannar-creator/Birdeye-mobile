# CLAUDE.md — Birdeye Mobile

Root instructions for AI coding sessions on this repo. Keep this file under 200 lines.

## Package manager
npm (not yarn or pnpm)

## Run commands
```bash
npm start          # Expo dev server
npm run ios        # iOS simulator
npm run android    # Android emulator
npm test           # Jest watch mode
npm run lint       # ESLint
npm run type-check # TypeScript (no emit)
```

## Key directories
- `src/tokens/` — ALL colors, font sizes, spacing come from here. Never hardcode values.
- `src/components/` — Reusable components. Each in its own folder with index export.
- `src/screens/Social/` — Current feature in scope.
- `app/(tabs)/` — Expo Router tabs. One file per tab.

## Off-limits paths
- `node_modules/` — never read or modify
- `.expo/` — generated, never touch
- `dist/` — generated build output

## Coding rules (summary)
- Use design tokens from `src/tokens/index.ts` for ALL styling values
- Components must be typed — no `any`, no implicit types
- StyleSheet.create() for all styles (no inline objects in JSX)
- Platform-specific code uses `Platform.select()` or `.ios.tsx`/`.android.tsx` extensions
- New components go in `src/components/<ComponentName>/<ComponentName>.tsx`
- Exports barrel via `src/components/index.ts`

## Compact instructions
When compacting, preserve: error messages, component interfaces, token values.
Discard: file listings, intermediate reasoning, repeated code snippets.

## Social module context
- SocialScreen owns view-mode state (`list` | `month`)
- Header calendar icon toggles between views
- PostCard is the primary list item — matches Figma node 14169:5880
- Design source: https://www.figma.com/design/s1aSnK7z8qQrEM2Z03YR4y/Social?node-id=14169-5810
