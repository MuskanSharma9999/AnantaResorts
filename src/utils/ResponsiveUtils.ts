// src/utils/ResponsiveUtils.ts
import { Dimensions, Platform, PixelRatio } from 'react-native';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device breakpoints
export const DEVICE_BREAKPOINTS = {
  extraSmall: 320, // iPhone SE (1st gen)
  small: 375, // iPhone SE (2nd/3rd gen), iPhone 12 mini
  medium: 390, // iPhone 12, iPhone 13
  large: 414, // iPhone 12 Pro Max, iPhone 13 Pro Max
  tablet: 768, // iPad
  largeTablet: 1024, // iPad Pro
} as const;

// Screen size categories
export const getScreenSize = () => {
  if (screenWidth <= DEVICE_BREAKPOINTS.extraSmall) return 'extraSmall';
  if (screenWidth <= DEVICE_BREAKPOINTS.small) return 'small';
  if (screenWidth <= DEVICE_BREAKPOINTS.medium) return 'medium';
  if (screenWidth <= DEVICE_BREAKPOINTS.large) return 'large';
  if (screenWidth <= DEVICE_BREAKPOINTS.tablet) return 'tablet';
  return 'largeTablet';
};

// Device information object
export const deviceInfo = {
  screenWidth,
  screenHeight,
  screenSize: getScreenSize(),
  isSmallScreen: screenWidth <= DEVICE_BREAKPOINTS.small,
  isMediumScreen:
    screenWidth > DEVICE_BREAKPOINTS.small &&
    screenWidth <= DEVICE_BREAKPOINTS.medium,
  isLargeScreen:
    screenWidth > DEVICE_BREAKPOINTS.medium &&
    screenWidth <= DEVICE_BREAKPOINTS.large,
  isTablet: screenWidth > DEVICE_BREAKPOINTS.large,
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  pixelRatio: PixelRatio.get(),
  fontScale: PixelRatio.getFontScale(),

  // Device type helpers
  get isExtraSmallDevice() {
    return this.screenSize === 'extraSmall';
  },
  get isSmallDevice() {
    return this.screenSize === 'small' || this.screenSize === 'extraSmall';
  },
  get isMediumDevice() {
    return this.screenSize === 'medium';
  },
  get isLargeDevice() {
    return this.screenSize === 'large';
  },
  get isTabletDevice() {
    return this.screenSize === 'tablet' || this.screenSize === 'largeTablet';
  },

  // Aspect ratio helpers
  get aspectRatio() {
    return this.screenHeight / this.screenWidth;
  },
  get isLandscape() {
    return this.screenWidth > this.screenHeight;
  },
  get isPortrait() {
    return this.screenHeight > this.screenWidth;
  },

  // Common device checks
  get isIPhoneSE() {
    return this.isIOS && this.screenWidth <= 375 && this.screenHeight <= 667;
  },
  get isIPhoneX() {
    return this.isIOS && this.screenWidth === 375 && this.screenHeight === 812;
  },
  get hasNotch() {
    return this.isIOS && this.screenHeight >= 812;
  },
};

// Responsive scaling functions
export const scale = (size: number): number => {
  const baseWidth = 375; // iPhone X width as base
  return (screenWidth / baseWidth) * size;
};

export const verticalScale = (size: number): number => {
  const baseHeight = 812; // iPhone X height as base
  return (screenHeight / baseHeight) * size;
};

export const moderateScale = (size: number, factor: number = 0.5): number => {
  return size + (scale(size) - size) * factor;
};

// Font scaling that respects accessibility settings
export const scaledFontSize = (size: number): number => {
  const scaledSize = moderateScale(size);
  // Cap the font scale to prevent text from becoming too large
  const maxFontScale = 1.3;
  const fontScale = Math.min(deviceInfo.fontScale, maxFontScale);
  return scaledSize * fontScale;
};

// Button height calculator
export const getButtonHeight = (): number => {
  if (deviceInfo.isExtraSmallDevice) return 48;
  if (deviceInfo.isSmallDevice) return 52;
  if (deviceInfo.isMediumDevice) return 56;
  if (deviceInfo.isLargeDevice) return 58;
  return 60; // Tablet
};

// Input height calculator
export const getInputHeight = (): number => {
  if (deviceInfo.isExtraSmallDevice) return 44;
  if (deviceInfo.isSmallDevice) return 48;
  if (deviceInfo.isMediumDevice) return 52;
  return 56; // Large devices and tablets
};

// Spacing calculator based on screen size
export const getResponsiveSpacing = (base: number): number => {
  if (deviceInfo.isExtraSmallDevice) return base * 0.8;
  if (deviceInfo.isSmallDevice) return base * 0.9;
  if (deviceInfo.isTabletDevice) return base * 1.2;
  return base;
};

// Responsive spacing object
export const ResponsiveSpacing = {
  xs: getResponsiveSpacing(4),
  sm: getResponsiveSpacing(8),
  md: getResponsiveSpacing(12),
  lg: getResponsiveSpacing(16),
  xl: getResponsiveSpacing(20),
  xxl: getResponsiveSpacing(24),
  xxxl: getResponsiveSpacing(32),
};

// Header height calculator (considering safe area)
export const getHeaderHeight = (): number => {
  if (deviceInfo.hasNotch) return 88;
  if (deviceInfo.isIOS) return 64;
  return 56; // Android
};

// Tab bar height calculator
export const getTabBarHeight = (): number => {
  if (deviceInfo.hasNotch) return 83;
  if (deviceInfo.isIOS) return 49;
  return 56; // Android
};

// Safe area insets estimation (use react-native-safe-area-context for actual values)
export const getEstimatedSafeAreaInsets = () => {
  return {
    top: deviceInfo.hasNotch ? 44 : deviceInfo.isIOS ? 20 : 24,
    bottom: deviceInfo.hasNotch ? 34 : 0,
    left: 0,
    right: 0,
  };
};

// Responsive image dimensions
export const getImageDimensions = (aspectRatio: number = 16 / 9) => {
  const maxWidth = screenWidth * 0.9;
  const maxHeight = screenHeight * 0.4;

  const widthBasedHeight = maxWidth / aspectRatio;
  const heightBasedWidth = maxHeight * aspectRatio;

  if (widthBasedHeight <= maxHeight) {
    return {
      width: maxWidth,
      height: widthBasedHeight,
    };
  } else {
    return {
      width: heightBasedWidth,
      height: maxHeight,
    };
  }
};

// Card dimensions calculator
export const getCardDimensions = () => {
  const padding = ResponsiveSpacing.lg;
  const availableWidth = screenWidth - padding * 2;

  if (deviceInfo.isTabletDevice) {
    // Two columns on tablet
    return {
      width: (availableWidth - ResponsiveSpacing.md) / 2,
      minHeight: 200,
    };
  }

  return {
    width: availableWidth,
    minHeight: deviceInfo.isSmallDevice ? 150 : 180,
  };
};

// Grid layout calculator
export const getGridLayout = (itemCount: number) => {
  let columns = 1;

  if (deviceInfo.isTabletDevice) {
    columns = itemCount >= 6 ? 3 : 2;
  } else if (deviceInfo.isLargeDevice) {
    columns = itemCount >= 4 ? 2 : 1;
  }

  const spacing = ResponsiveSpacing.md;
  const totalSpacing = spacing * (columns - 1);
  const availableWidth = screenWidth - ResponsiveSpacing.lg * 2;
  const itemWidth = (availableWidth - totalSpacing) / columns;

  return {
    columns,
    itemWidth,
    spacing,
  };
};

// Orientation change helper
export const onOrientationChange = (
  callback: (orientation: 'portrait' | 'landscape') => void,
) => {
  const subscription = Dimensions.addEventListener('change', ({ window }) => {
    const orientation = window.width > window.height ? 'landscape' : 'portrait';
    callback(orientation);
  });

  return subscription;
};

// Typography scaling
export const getResponsiveTypography = () => {
  const baseScale = deviceInfo.isSmallDevice
    ? 0.9
    : deviceInfo.isTabletDevice
    ? 1.1
    : 1;

  return {
    h1: scaledFontSize(32 * baseScale),
    h2: scaledFontSize(28 * baseScale),
    h3: scaledFontSize(24 * baseScale),
    body: scaledFontSize(16 * baseScale),
    caption: scaledFontSize(14 * baseScale),
    small: scaledFontSize(12 * baseScale),
  };
};

// Export all utilities as default object
export default {
  deviceInfo,
  scale,
  verticalScale,
  moderateScale,
  scaledFontSize,
  getButtonHeight,
  getInputHeight,
  getResponsiveSpacing,
  ResponsiveSpacing,
  getHeaderHeight,
  getTabBarHeight,
  getEstimatedSafeAreaInsets,
  getImageDimensions,
  getCardDimensions,
  getGridLayout,
  onOrientationChange,
  getResponsiveTypography,
  DEVICE_BREAKPOINTS,
  getScreenSize,
};
