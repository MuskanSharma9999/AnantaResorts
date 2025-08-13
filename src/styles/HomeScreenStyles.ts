import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

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

  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },

  roomCard: {
    width: 200,
    marginRight: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  roomImagePlaceholder: {
    height: 120,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  roomName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    padding: 10,
    paddingBottom: 5,
  },

  roomPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E86AB',
    paddingHorizontal: 10,
  },

  bookButton: {
    backgroundColor: '#2E86AB',
    margin: 10,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },

  bookButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  amenityCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  amenityText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: '#C89B5E', // gold active
    width: 40, // elongated like screenshot
    borderRadius: 20,
  },

  inactiveDot: {
    backgroundColor: '#D3D3D3', // grey inactive
  },
});

export default styles;
