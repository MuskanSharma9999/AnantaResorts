import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions for scaling (based on iPhone 12 width 375px, height 812px)
const baseWidth = 375;
const baseHeight = 812;

// Helper functions
const scaleSize = size => (width / baseWidth) * size;
const scaleFont = size => Math.round(scaleSize(size));
const verticalScale = size => (height / baseHeight) * size;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },

  titleSlide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaleSize(20),
  },

  carousel: {
    flexGrow: 0,
  },

  onboardingImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),
  },

  textContainer: {
    alignItems: 'center',
    paddingHorizontal: scaleSize(32),
  },

  title: {
    fontSize: scaleFont(28),
    fontFamily: 'Cormorant-Bold',
    color: '#E3C47A',
    textAlign: 'center',
    marginBottom: verticalScale(10),
    lineHeight: scaleFont(34),
  },

  subtitle: {
    fontSize: scaleFont(15),
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginBottom: verticalScale(25),
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },

  paginationDot: {
    height: scaleSize(8),
    borderRadius: scaleSize(4),
    marginHorizontal: scaleSize(4),
  },

  activeDot: {
    width: scaleSize(50),
    backgroundColor: '#C39E65',
  },

  inactiveDot: {
    width: scaleSize(9),
    backgroundColor: '#D9D9D9',
  },

  button: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#C3A485',
    marginTop: verticalScale(20),
    marginBottom: Platform.OS === 'ios' ? verticalScale(80) : verticalScale(60),
    borderRadius: scaleSize(25),
    overflow: 'hidden',
  },

  buttonGradient: {
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleSize(25),
  },

  buttonText: {
    color: '#FFF',
    fontSize: scaleFont(17),
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default styles;
