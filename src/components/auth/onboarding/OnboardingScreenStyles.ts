import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },

  titleSlide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  carousel: {
    flexGrow: 0,
  },

  onboardingImage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },

  title: {
    fontSize: 28,
    fontFamily: 'Cormorant-Bold',
    color: '#E3C47A',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginBottom: 30,
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },

  activeDot: {
    width: 51,
    backgroundColor: '#C39E65',
  },

  inactiveDot: {
    width: 9,
    backgroundColor: '#D9D9D9',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#C3A485',
    marginTop: 30,
    marginBottom: 90, // adjust as needed for safe area
    borderRadius: 25,
    overflow: 'hidden',
  },

  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default styles;
