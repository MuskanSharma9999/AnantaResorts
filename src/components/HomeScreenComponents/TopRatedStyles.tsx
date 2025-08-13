import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  topRatedContainer: {
    backgroundColor: '#000',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },

  topRatedText: {
    fontFamily: 'Cormorant',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.2,
    color: '#FBCF9C',
    paddingHorizontal: 0,
  },

  topRatedSubText: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    color: '#9C9C9C',
    paddingTop: 4,
    paddingHorizontal: 0,
  },
});

export default styles;
