export const Colors = {
  primary: '#1976D2',
  primaryLight: '#E3F2FD',
  textPrimary: '#212121',
  textSecondary: '#8A898E',
  white: '#FFFFFF',
  background: '#F5F5F5',
  divider: '#EAEAEA',
  statusErrorBg: '#FEECEB',
  statusErrorText: '#F44336',
  statusWarningBg: '#FEF3D6',
  statusWarningText: '#F57C00',
  statusNeutralBg: '#F0F0F0',
  statusNeutralText: '#555555',
  platformX: '#14171A',
  platformFacebook: '#1877F2',
  platformInstagram: '#E1306C',
  platformLinkedIn: '#0A66C2',
  platformYouTube: '#FF0000',
  grey03: '#E9E9EB',
};

export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 17,
  lg: 20,
  xl: 24,
};

export const Spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, xxl: 32 };

export const Radius = { sm: 4, md: 8, lg: 12, xl: 16, full: 999 };

export const StatusConfig = {
  post_expired:     { label: 'Post expired',     bg: Colors.statusErrorBg,   color: Colors.statusErrorText,   icon: 'schedule' },
  pending_approval: { label: 'Pending approval', bg: Colors.statusWarningBg, color: Colors.statusWarningText, icon: 'schedule' },
  rejected:         { label: 'Rejected',          bg: Colors.statusErrorBg,   color: Colors.statusErrorText,   icon: 'block' },
  scheduled:        { label: 'Scheduled',         bg: Colors.statusNeutralBg, color: Colors.statusNeutralText, icon: 'schedule' },
} as const;
