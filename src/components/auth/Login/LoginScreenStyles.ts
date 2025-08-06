// src/styles/LoginScreenStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

 
  logo: {
    alignSelf: 'center',
    width: '100%',
  },
  brandName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D4AF37', // Gold color
    letterSpacing: 2,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#D4AF37',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 2,
  },

  // Image Section
  imageSection: {
    flex: 1,
    position: 'relative',
  },
  carouselItem: {
    flex: 1,
    position: 'relative',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  // Location Badge
  locationBadge: {
    position: 'absolute',
    left: 20,
    bottom: 150, // Position above the form
    zIndex: 5,
  },
  locationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D4AF37', // Gold color
    letterSpacing: 3,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  locationSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  bottomSection: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    minHeight: height * 0.35,
    justifyContent: 'flex-end',
  },

  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },

  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  formContainer: {
    gap: 30,
  },

  // Welcome Text
  welcomeText: {
    fontSize: isSmallDevice ? 28 : 32,
    fontWeight: '400', // Lighter weight to match the design
    color: '#FBCF9C', // Gold color
    fontFamily: 'Cormorant-Bold', // You might want to use a custom serif font
  },
  subText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 40,
    fontWeight: '300',
  },

  phoneInputContainer: {
    backgroundColor: 'transparent',
    color: '#6B6B6B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#6B6B6B',

    borderRadius: 8,
    paddingHorizontal: 12,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    color: '#6B6B6B',
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 4,
    color: '#6B6B6B',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#666',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: '#6B6B6B',
  },
});

export default styles;
