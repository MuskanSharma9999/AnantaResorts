// src/screens/SignupScreenStyle.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background for status bar transition
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  imageSection: {
    height: height * 0.25,
    width: '100%',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#111', // Deep black
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginTop: -20, // Slight overlap with image
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F5C97B', // Gold heading
    textAlign: 'center',
    fontFamily: "Cormorant-Bold",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rememberText: {
    color: '#fff',
    fontSize: 12,
  },
  forgotText: {
    color: '#F5C97B',
    fontSize: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 8,
  },
  signUp: {
    color: '#F5C97B',
    fontWeight: '500',
  },
  termsText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#F5C97B',
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  checkboxChecked: {
    backgroundColor: '#F5C97B',
    borderColor: '#F5C97B',
  },
  checkmark: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  passwordContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 10,
  paddingHorizontal: 10,
  marginBottom: 10,
},
passwordInput: {
  flex: 1,
  paddingVertical: 12,
  fontSize: 14,
  color: '#000',
},
eyeIconContainer: {
  padding: 5,
},

});
