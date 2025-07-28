// src/components/GoldButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from '../styles/Colors';

interface GoldButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
}

const GoldButton: React.FC<GoldButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  size = 'large',
  variant = 'primary',
}) => {
  const getButtonStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'medium':
        return styles.mediumButton;
      case 'large':
      default:
        return styles.largeButton;
    }
  };

  const getTextStyle = () => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'medium':
        return styles.mediumText;
      case 'large':
      default:
        return styles.largeText;
    }
  };

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        style={[
          styles.baseButton,
          getButtonStyle(),
          styles.secondaryButton,
          disabled && styles.disabledButton,
          style,
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text style={[getTextStyle(), styles.secondaryText, textStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.baseButton, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={
          disabled
            ? [Colors.textDisabled, Colors.textDisabled]
            : [Colors.primary, Colors.primaryLight, Colors.accent]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, getButtonStyle()]}
      >
        <Text style={[getTextStyle(), styles.primaryText, textStyle]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.gold,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.xl,
  },

  // Size variants
  smallButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minHeight: 44,
    borderRadius: BorderRadius.lg,
  },
  mediumButton: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xxl,
    minHeight: 50,
    borderRadius: BorderRadius.xl,
  },
  largeButton: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.xxxl,
    minHeight: 56,
    borderRadius: BorderRadius.xl,
  },

  // Secondary button style
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  // Text styles
  smallText: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semiBold,
  },
  mediumText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semiBold,
  },
  largeText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },

  primaryText: {
    color: Colors.secondary, // Black text on gold button
    textAlign: 'center',
  },
  secondaryText: {
    color: Colors.primary, // Gold text on transparent button
    textAlign: 'center',
  },

  disabledButton: {
    opacity: 0.5,
  },
});

export default GoldButton;
