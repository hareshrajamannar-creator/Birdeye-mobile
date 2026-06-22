# PR Review Checklist

Use this when reviewing any pull request on Birdeye Mobile.

## Correctness
- [ ] Logic matches the linked Figma frame / acceptance criteria
- [ ] Edge cases handled: empty state, loading state, error state
- [ ] No hardcoded mock data in production code paths

## Design Fidelity
- [ ] Colors match Figma — verified via token names, not eyeballing hex
- [ ] Font sizes and weights match Figma variable definitions
- [ ] Spacing matches 4px grid (multiples of 4)
- [ ] Corner radii use `BorderRadius` tokens
- [ ] Touch targets are ≥ 44×44pt (iOS HIG / Material requirement)

## Code Quality
- [ ] No `any` types
- [ ] No inline style objects (except dynamic values)
- [ ] All tokens imported from `src/tokens/index.ts`
- [ ] Component folder structure followed (`src/components/Name/Name.tsx`)
- [ ] No console.log left in production code

## Tests
- [ ] New component has at least one test
- [ ] Tests cover happy path + one edge case
- [ ] `npm test` green

## Performance
- [ ] `FlatList`/`SectionList` items use `React.memo`
- [ ] `keyExtractor` uses stable IDs
- [ ] No expensive operations in render cycle

## Accessibility
- [ ] Interactive elements have `accessibilityLabel`
- [ ] Images have `accessibilityLabel` or `accessibilityRole="image"`
- [ ] Color is not the only indicator of state (use icon + color for status chips)

## Platform
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] Safe area insets respected
