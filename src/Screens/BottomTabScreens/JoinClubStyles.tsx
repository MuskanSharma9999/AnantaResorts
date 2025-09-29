import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  headerContainer: {
    position: 'relative',
    height: 220,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  arrowContainer: {
    position: 'absolute',
    top: 16,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    padding: 4,
    zIndex: 2,
  },
  arrowIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    color: '#FFE2B8',
    fontWeight: '600',
    fontFamily: 'Cormorant',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    fontFamily: 'serif',
  },
  card: {
    backgroundColor: '#19191A',
    borderRadius: 18,
    marginHorizontal: 12,
    marginTop: 16,
    padding: 16,
    borderColor: '#FFE2B8',
    borderWidth: 1,
  },
  cardTitle: {
    color: '#FFE2B8',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Cormorant',
    marginBottom: 8,
  },
  cardBody: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '400',
    fontFamily: 'Montserrat',
  },
  cardSubTitle: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 6,
    fontWeight: '500',
    fontFamily: 'Cormorant',
  },
  listItem: {
    color: '#FFE2B8',
    fontSize: 13,
    marginBottom: 3,
    fontWeight: '700',
    fontFamily: 'Montserrat-Regular',
  },
  tabScrollView: {
    flexGrow: 0,
  },
  tabBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  tabItem: {
    width: 300,
    marginRight: 12,
  },
  tabContentContainer: {
    backgroundColor: '#222222',
    padding: 16,
    borderRadius: 12,
    borderColor: '#FFE2B8',
    borderWidth: 1,
  },
  tabContentTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tabContentText: {
    color: '#FFE2B8',
    fontFamily: 'montserrat',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
  },
  tabItemSelected: {
    borderColor: '#FFE2B8',
    borderWidth: 2,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fixedButton: {
    width: 350,
  },
  bottomPadding: {
    height: 80,
  },
});
