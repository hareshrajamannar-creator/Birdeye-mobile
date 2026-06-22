# Coding Rules

These are enforced on every PR. Non-compliance = request changes.

## Styling
- **No hardcoded values.** All colors, font sizes, spacing, and radii must come from `src/tokens/index.ts`.
  - ❌ `color: '#1976D2'`
  - ✅ `color: Colors.primary`
- Use `StyleSheet.create()` for all styles. No inline style objects in JSX except truly dynamic values.
- Never use `px` — React Native uses unitless numbers.

## TypeScript
- `strict: true` is enforced. Fix type errors; don't suppress with `// @ts-ignore`.
- No `any`. Use `unknown` + type narrowing if the type is genuinely unknown.
- All component props must have an explicit interface or type alias.
- Avoid implicit `void` returns in event handlers — be explicit.

## Components
- One component per file.
- Component file goes in `src/components/<ComponentName>/<ComponentName>.tsx`.
- Export via `src/components/index.ts` barrel.
- Props interface named `<ComponentName>Props`.
- Default export the component.

## Naming
- Files: PascalCase for components (`PostCard.tsx`), camelCase for utils (`dateUtils.ts`).
- Variables: camelCase. Constants: UPPER_SNAKE_CASE only for module-level non-exported constants.
- Boolean props: prefix with `is`, `has`, or `can` (e.g., `isSelected`, `hasImage`).

## Imports
- Group: (1) React/RN, (2) third-party, (3) internal with `@/` alias, (4) relative.
- Use path aliases (`@components/PostCard`) not deep relative paths (`../../../../components/PostCard`).

## Testing
- Every new component gets at least one unit test in `tests/unit/`.
- Test file named `<ComponentName>.test.tsx`.
- Tests must cover: renders without crashing, key conditional rendering branches.

## Platform-specific code
- Use `Platform.select({ ios: ..., android: ... })` for style differences.
- Use `.ios.tsx` / `.android.tsx` file extensions only for substantially different implementations.

## Performance
- Memoize list items with `React.memo` when used in `FlatList`/`SectionList`.
- Use `keyExtractor` that returns a stable unique key (post ID, not index).
- Avoid anonymous functions in render — define handlers outside JSX.
