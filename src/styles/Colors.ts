// src/styles/Colors.ts
export const Colors = {
  // Primary Brand Colors
  primary: '#D4AF37', // Gold
  primaryDark: '#B8941F', // Darker gold
  primaryLight: '#E6C866', // Lighter gold

  // Secondary Colors
  secondary: '#000000', // Pure black
  secondaryLight: '#1A1A1A', // Very dark gray
  secondaryMedium: '#2D2D2D', // Dark gray

  // Background Colors
  background: '#000000', // Black background
  backgroundLight: '#0F0F0F', // Slightly lighter black
  backgroundCard: '#1A1A1A', // Card backgrounds
  backgroundOverlay: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay

  // Text Colors
  textPrimary: '#FFFFFF', // White text
  textSecondary: '#D4AF37', // Gold text
  textMuted: '#B0B0B0', // Light gray text
  textDisabled: '#666666', // Disabled text

  // Accent Colors
  accent: '#FFD700', // Bright gold accent
  accentLight: '#FFF4CC', // Very light gold

  // Status Colors
  success: '#4CAF50', // Green
  error: '#F44336', // Red
  warning: '#FF9800', // Orange
  info: '#2196F3', // Blue

  // UI Element Colors
  border: '#333333', // Border color
  borderLight: '#444444', // Lighter border
  shadow: 'rgba(0, 0, 0, 0.5)', // Shadow color

  // Gradient Colors
  gradientStart: '#D4AF37', // Gold start
  gradientEnd: '#B8941F', // Gold end
  gradientDark: ['#000000', '#1A1A1A'], // Dark gradient
  gradientGold: ['#D4AF37', '#FFD700'], // Gold gradient

  // Transparency variations
  gold10: 'rgba(212, 175, 55, 0.1)',
  gold20: 'rgba(212, 175, 55, 0.2)',
  gold30: 'rgba(212, 175, 55, 0.3)',
  gold50: 'rgba(212, 175, 55, 0.5)',
  gold70: 'rgba(212, 175, 55, 0.7)',
  gold90: 'rgba(212, 175, 55, 0.9)',

  black10: 'rgba(0, 0, 0, 0.1)',
  black20: 'rgba(0, 0, 0, 0.2)',
  black30: 'rgba(0, 0, 0, 0.3)',
  black50: 'rgba(0, 0, 0, 0.5)',
  black70: 'rgba(0, 0, 0, 0.7)',
  black90: 'rgba(0, 0, 0, 0.9)',

  white10: 'rgba(255, 255, 255, 0.1)',
  white20: 'rgba(255, 255, 255, 0.2)',
  white30: 'rgba(255, 255, 255, 0.3)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white70: 'rgba(255, 255, 255, 0.7)',
  white90: 'rgba(255, 255, 255, 0.9)',
};

// Typography scaling
export const Typography = {
  // Font Sizes - now responsive
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    h3: 24,
    h2: 28,
    h1: 32,
    display: 48,
  },

  // Font Weights
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },
};

// Responsive spacing system
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
};

// Responsive border radius
export const BorderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 50,
};

// Shadows
export const Shadows = {
  small: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  gold: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

// Common styles that can be reused
export const CommonStyles = {
  // Buttons
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...Shadows.medium,
  },

  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  // Cards
  card: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
  },

  // Input fields
  input: {
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
  },

  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Text styles
  primaryText: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.regular,
  },

  goldText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
  },

  heading: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.h2,
    fontWeight: Typography.fontWeight.bold,
  },
};

export default Colors;
