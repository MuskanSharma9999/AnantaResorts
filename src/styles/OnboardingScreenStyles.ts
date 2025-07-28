import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from './Colors';

const { width, height } = Dimensions.get('window');

// Responsive dimensions
const isSmallDevice = width < 375;
const isLargeDevice = width > 414;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Slides Container - takes most of the space
  slidesContainer: {
    flex: 1,
  },

  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: height * 0.08, // 8% of screen height
    paddingBottom: Spacing.xl,
  },

  // Diamond Grid Layout
  diamondGrid: {
    width: width * 0.8,
    height: height * (isSmallDevice ? 0.35 : 0.4), // Reduced height to make room for text
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  diamondContainer: {
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  diamondImage: {
    width: isSmallDevice ? 60 : isLargeDevice ? 80 : 70, // Smaller diamonds
    height: isSmallDevice ? 60 : isLargeDevice ? 80 : 70,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    transform: [{ rotate: '-45deg' }],
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  // Diamond positions (arranged in a diamond pattern)
  'top-left': {
    top: '10%',
    left: '15%',
  },
  'top-center': {
    top: '5%',
    left: '42.5%',
  },
  'top-right': {
    top: '10%',
    right: '15%',
  },
  'middle-left': {
    top: '30%',
    left: '5%',
  },
  center: {
    top: '35%',
    left: '42.5%',
    transform: [{ rotate: '45deg' }, { scale: isSmallDevice ? 1.1 : 1.2 }], // Adjust scale for device size
  },
  'middle-right': {
    top: '30%',
    right: '5%',
  },
  'bottom-left': {
    bottom: '20%',
    left: '15%',
  },
  'bottom-center': {
    bottom: '15%',
    left: '42.5%',
  },

  // Text Content
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    flex: 1,
    justifyContent: 'center',
    maxWidth: width * 0.9,
  },
  title: {
    fontSize: isSmallDevice ? Typography.fontSize.h3 : Typography.fontSize.h2,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight:
      (isSmallDevice ? Typography.fontSize.h3 : Typography.fontSize.h2) * 1.2,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: isSmallDevice ? Typography.fontSize.md : Typography.fontSize.lg,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight:
      (isSmallDevice ? Typography.fontSize.md : Typography.fontSize.lg) * 1.4,
  },

  // Fixed Bottom Container - positioned absolute but limited height
  fixedBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.xl,
    paddingBottom: height * 0.05, // Responsive bottom padding
    backgroundColor: 'transparent',
    maxHeight: height * 0.2, // Maximum 20% of screen height
  },

  // Pagination
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: Colors.white30,
  },

  // Button Container - center aligned with fixed width
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default styles;
