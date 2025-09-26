import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
  },
  imageSection: {
    flex: 1,
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomSection: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
    minHeight: height * 0.35,
  },
  otpAlert: {
    fontSize: isSmallDevice ? 22 : 24,
    fontWeight: '700',
    color: '#FBCF9C',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'sens-serif',
  },
  otpInstructions: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 15,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#D4AF37',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 700,
    color: '#4c4f53ff',
    backgroundColor: '#F6F6F6',
  },
  continueButton: {
    backgroundColor: '#D4AF37',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  resendButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    color: '#999',
    fontSize: 14,
  },
  resendHighlight: {
    fontWeight: '600',
    color: '#7AC678',
  },
});

export default styles;
