/**
 * Birdeye Mobile Design Tokens
 *
 * Source of truth for all visual values.
 * Extracted from Figma: https://www.figma.com/design/s1aSnK7z8qQrEM2Z03YR4y/Social?node-id=14169-5810
 *
 * Rules:
 * - NEVER hardcode colors/sizes/spacing in components.
 * - Import from here: `import { Colors, Typography, Spacing } from '@/tokens';`
 */

// ─── Colors ──────────────────────────────────────────────────────────────────

export const Colors = {
  // Brand
  primary: '#1976D2',
  primaryLight: '#E3F2FD',

  // Text
  textPrimary: '#212121',
  textSecondary: '#8A898E',
  textAction: '#1976D2',
  textOnDark: '#FFFFFF',
  textOnPrimary: '#FFFFFF',

  // Surfaces
  white: '#FFFFFF',
  background: '#F5F5F5',
  surfaceCard: '#FFFFFF',

  // Borders & Dividers
  divider: '#EAEAEA',
  line: '#DBDBDB',
  borderGrey: '#E9E9EB',

  // Status — Post expired & Rejected
  statusError: '#F44336',
  statusErrorBg: '#FEECEB',
  statusErrorText: '#F44336',

  // Status — Pending approval
  statusWarning: '#F57C00',
  statusWarningBg: '#FEF3D6',
  statusWarningText: '#F57C00',

  // Status — Scheduled (neutral)
  statusNeutral: '#8A898E',
  statusNeutralBg: '#F0F0F0',
  statusNeutralText: '#555555',

  // Social platform palette
  platformX: '#14171A',
  platformFacebook: '#1877F2',
  platformInstagram: '#E1306C',
  platformLinkedIn: '#0A66C2',
  platformYouTube: '#FF0000',
  platformTikTok: '#000000',
  platformPinterest: '#E60023',

  // Neutral greys
  grey03: '#E9E9EB',
  grey04: '#3A3A3C',
  grey05: '#8A898E',

  // Overlay
  scrim: 'rgba(0, 0, 0, 0.4)',

  // Transparent
  transparent: 'transparent',
} as const;

export type ColorToken = keyof typeof Colors;

// ─── Typography ───────────────────────────────────────────────────────────────

export const Typography = {
  /**
   * Font family — system default per platform
   * iOS uses SF Pro, Android uses Roboto
   */
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  /** Font sizes (sp) */
  size: {
    xs: 10,   // Bottom nav labels, captions
    sm: 12,   // Small body, metadata
    base: 14, // Body text, post content
    md: 17,   // Section headers, body/bold
    lg: 20,   // Screen titles
    xl: 24,   // Large headers
  },

  /** Font weights */
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  /** Line heights (multiplier) */
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

// ─── Spacing ──────────────────────────────────────────────────────────────────

/**
 * 4px grid spacing scale.
 * Use these for margins, paddings, and gaps.
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// ─── Border Radius ────────────────────────────────────────────────────────────

export const BorderRadius = {
  sm: 4,
  md: 8,   // Default mobile (from Figma variable Corner Radius/md)
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 999, // Pill / circle
} as const;

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const Shadows = {
  sm: {
    shadowColor: '#212121',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4, // Android
  },
  md: {
    shadowColor: '#212121',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

// ─── Layout ───────────────────────────────────────────────────────────────────

export const Layout = {
  screenHorizontalPadding: Spacing.lg, // 20px side padding (matches Figma)
  topBarHeight: 56,
  bottomTabHeight: 60,
  cardBorderRadius: BorderRadius.md,
  thumbnailSize: 70,
  platformIconSize: 16,
  statusChipHeight: 22,
} as const;

// ─── Status chip config ───────────────────────────────────────────────────────

export const StatusConfig = {
  post_expired: {
    label: 'Post expired',
    backgroundColor: Colors.statusErrorBg,
    textColor: Colors.statusErrorText,
    icon: 'schedule',
  },
  pending_approval: {
    label: 'Pending approval',
    backgroundColor: Colors.statusWarningBg,
    textColor: Colors.statusWarningText,
    icon: 'schedule',
  },
  rejected: {
    label: 'Rejected',
    backgroundColor: Colors.statusErrorBg,
    textColor: Colors.statusErrorText,
    icon: 'block',
  },
  scheduled: {
    label: 'Scheduled',
    backgroundColor: Colors.statusNeutralBg,
    textColor: Colors.statusNeutralText,
    icon: 'schedule',
  },
  published: {
    label: 'Published',
    backgroundColor: Colors.primaryLight,
    textColor: Colors.textAction,
    icon: 'check-circle',
  },
} as const;

// ─── Calendar ────────────────────────────────────────────────────────────────

export const CalendarTokens = {
  daySize: 36,          // Diameter of day circle
  dotSize: 6,           // Post indicator dot diameter
  dotSpacing: 3,        // Gap between dots
  maxDotsPerDay: 3,     // Before showing "+N"
  headerHeight: 48,
  dayRowHeight: 44,     // Height of each week row
} as const;
