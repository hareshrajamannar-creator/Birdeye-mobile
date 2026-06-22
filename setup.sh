#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# Birdeye Mobile — First-time setup & GitHub push
# Run this from inside the project folder after copying all files.
# ─────────────────────────────────────────────────────────────────────────────

set -e

echo "→ Installing dependencies..."
npm install

echo "→ Initializing git repo..."
git init
git branch -M main

echo "→ Connecting to GitHub remote..."
git remote add origin https://github.com/hareshrajamannar-creator/Birdeye-mobile.git

echo "→ Creating placeholder asset files..."
mkdir -p assets
touch assets/icon.png assets/splash-icon.png assets/adaptive-icon.png assets/favicon.png

echo "→ Staging all files..."
git add .

echo "→ Creating initial commit..."
git commit -m "feat: initial project setup — Social List + Calendar Month views

- Expo SDK 52 + React Native 0.76 + TypeScript (strict)
- Expo Router v4 for file-based navigation (5 tabs: Inbox, Reviews, Quick send, Social, More)
- Design system with tokens extracted from Figma (colors, typography, spacing)
- Component library: PlatformIcon, StatusChip, PostCard, SectionHeader, CalendarGrid, FAB, EmptyState
- Social module: List view (SectionList grouped by date)
- Social module: Calendar Month view (month grid + day detail list) — new feature
- AI-native repo structure: README, CLAUDE.md, docs/, guardrails/, .github/
- Unit tests: StatusChip, PostCard

Figma: https://www.figma.com/design/s1aSnK7z8qQrEM2Z03YR4y/Social?node-id=14169-5810"

echo "→ Pushing to GitHub..."
git push -u origin main

echo "✓ Done! Visit: https://github.com/hareshrajamannar-creator/Birdeye-mobile"
