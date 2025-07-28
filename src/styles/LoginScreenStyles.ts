// src/styles/LoginScreenStyles.ts
import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from './Colors';

const { width, height } = Dimensions.get('window');

// Responsive dimensions
const isSmallDevice = width < 375;
const isLargeDevice = width > 414;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  keyboardAvoidingView: {
    flex: 1,
  },

  scrollViewContent: {
    flexGrow: 1,
  },

  // Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    paddingTop: 50, // Will be overridden by safe area
  },
  logo: {
    fontSize: isSmallDevice ? Typography.fontSize.h3 : Typography.fontSize.h2,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    letterSpacing: 2,
  },
  logoSubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginTop: 2,
  },

  // Image Section
  imageSection: {
    height: height * 0.65, // 65% of screen height
    position: 'relative',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#8B7355', // Desert color placeholder
  },
  imageGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: height * 0.15, // Space for form
  },
  locationBadge: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  locationTitle: {
    fontSize: isSmallDevice ? Typography.fontSize.h3 : Typography.fontSize.h2,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    letterSpacing: 2,
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: Typography.fontSize.md,
    color: Colors.textPrimary,
    letterSpacing: 1,
  },

  // Bottom Section
  bottomSection: {
    minHeight: height * 0.4, // Minimum 40% of screen height
    justifyContent: 'flex-end',
  },
  formContainer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },

  // Welcome Text
  welcomeText: {
    fontSize: isSmallDevice ? Typography.fontSize.h2 : Typography.fontSize.h1,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  subText: {
    fontSize: isSmallDevice ? Typography.fontSize.md : Typography.fontSize.lg,
    color: Colors.textMuted,
    marginBottom: Spacing.xxl,
  },

  // Input Container
  inputContainer: {
    marginBottom: Spacing.xxl,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundCard,
    minHeight: 56, // Ensure proper touch target
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    minWidth: 80,
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
    marginRight: Spacing.sm,
  },
  dropdownIcon: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
    minHeight: 56,
  },

  // Submit Button
  submitButton: {
    width: '100%',
    marginBottom: Spacing.lg,
  },
});

export default styles;
