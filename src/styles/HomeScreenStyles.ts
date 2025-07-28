import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heroSection: {
    height: 250,
    marginBottom: 20,
  },
  heroImagePlaceholder: {
    flex: 1,
    backgroundColor: '#2E86AB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  heroSubtext: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#2E86AB',
    fontWeight: '600',
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
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'justify',
  },
});

export default styles;
