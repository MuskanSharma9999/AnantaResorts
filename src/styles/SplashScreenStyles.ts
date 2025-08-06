// src/styles/SplashScreenStyles.ts
import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, CommonStyles } from './Colors';

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.container,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoText: {
    fontSize: Typography.fontSize.display,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary, // Gold color
    letterSpacing: 3,
    textShadowColor: Colors.gold30,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subText: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary, // White color
    letterSpacing: 6,
    marginTop: Spacing.xs,
    opacity: 0.9,
  },
  tagline: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textMuted, // Light gray
    fontStyle: 'italic',
    opacity: 0.8,
  },
});

export default styles;
