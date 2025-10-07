import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 40,
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },

  // Header styles
  headerContainer: {
    height: height * 0.5,
    position: 'relative',
  },
  headerImage: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerImageStyle: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 120,
    paddingHorizontal: 24,
    paddingBottom: 80,
    paddingTop: 10,
  },
  resortName: {
    color: '#FBCF9C',
    fontSize: 32,
    fontWeight: '300',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
    fontFamily: 'Montserrat',
  },

  // Amenities row styles
  amenitiesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: -160,
    backgroundColor: 'transparent',
    zIndex: 5,
  },
  amenityIconContainer: {
    alignItems: 'center',
    flex: 1,
  },
  amenityIconWrapper: {
    width: 44,
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  amenityLabel: {
    color: '#D1D5DB',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Montserrat',
    lineHeight: 14,
  },

  // Tab navigation styles
  tabViewStyle: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBarContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tabScrollContainer: {
    paddingRight: 16,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    position: 'relative',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  activeTabText: {
    color: '#FBCF9C',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -12,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: '#FBCF9C',
    borderRadius: 1,
  },

  // Content styles
  contentPadding: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    color: '#FBCF9C',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 16,
    marginTop: 8,
  },
  descriptionText: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Montserrat',
    marginBottom: 20,
  },
  amenityTag: {
    backgroundColor: 'rgba(251, 207, 156, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.3)',
  },
  amenityTagText: {
    color: '#FBCF9C',
    fontSize: 12,
    fontFamily: 'Montserrat',
  },

  // Gallery styles
  galleryContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  galleryList: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  galleryItem: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: (width - 56) / 3,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.3)',
  },

  // Reviews styles
  reviewsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'black',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(251, 207, 156, 0.2)',
  },
  ratingSummary: {
    alignItems: 'center',
  },
  averageRating: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FBCF9C',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  totalReviews: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 4,
  },
  addReviewButton: {
    backgroundColor: '#E0C48F',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addReviewButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  loadingIndicator: {
    marginTop: 40,
  },
  reviewCard: {
    backgroundColor: 'rgba(251, 207, 156, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  reviewUserInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    fontFamily: 'Montserrat',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FBCF9C',
    marginBottom: 8,
    fontFamily: 'Montserrat',
  },
  reviewComment: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
    fontFamily: 'Montserrat',
  },
  noReviewsContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noReviewsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FBCF9C',
    marginBottom: 8,
    fontFamily: 'Cormorant-Bold',
  },
  noReviewsSubtext: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },

  // Rooms styles
  roomsContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  roomsContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  roomsSubtitle: {
    color: '#D1D5DB',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  roomCard: {
    backgroundColor: 'rgba(251, 207, 156, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.2)',
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  roomNumber: {
    color: '#FBCF9C',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 4,
  },
  roomDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    color: '#D1D5DB',
    fontSize: 12,
    marginLeft: 6,
    fontFamily: 'Montserrat',
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    color: '#D1D5DB',
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
  price: {
    color: '#FBCF9C',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Cormorant-Bold',
  },
  noRoomsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noRoomsText: {
    color: '#FBCF9C',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 8,
  },
  noRoomsSubtext: {
    color: '#D1D5DB',
    fontSize: 14,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },

  // Modal Styles (Dark Theme)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  closeButton: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  ratingSection: {
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Montserrat',
  },
  starInput: {
    marginHorizontal: 5,
  },
  modalTitleInput: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    fontFamily: 'Montserrat',
  },
  modalCommentInput: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  modalSubmitButton: {
    backgroundColor: '#E0C48F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSubmitButtonDisabled: {
    backgroundColor: '#6B7280',
    opacity: 0.6,
  },
  modalSubmitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 300,
  },

  closeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },

  // Add these to your existing styles
  bookingRoomInfo: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  bookingRoomType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  bookingRoomPrice: {
    fontSize: 16,
    color: '#E0C48F',
    fontWeight: '600',
  },
  bookingField: {
    marginBottom: 15,
  },
  bookingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  bookingInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  bookingTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  bookingTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  bookingTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bookingTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0C48F',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: '#333',
  },
  modalScrollView: {
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bookingRoomInfo: {
    padding: 20,
    backgroundColor: '#2A2A2A',
    margin: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#E0C48F',
    borderWidth: 1,
    borderColor: '#333',
  },
  bookingRoomType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  bookingRoomPrice: {
    fontSize: 16,
    color: '#E0C48F',
    fontWeight: '600',
    marginBottom: 4,
  },
  bookingRoomCapacity: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  bookingSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0C48F',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bookingField: {
    marginBottom: 16,
  },
  bookingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CCCCCC',
    marginBottom: 10,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#2A2A2A',
  },
  dateInputDisabled: {
    opacity: 0.5,
    backgroundColor: '#222',
  },
  dateInputText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#888',
  },
  guestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#2A2A2A',
  },
  guestButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
  },
  guestButtonDisabled: {
    backgroundColor: '#222',
    borderColor: '#333',
    opacity: 0.5,
  },
  guestButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0C48F',
  },
  guestCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bookingInput: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#2A2A2A',
    color: '#FFFFFF',
  },
  bookingTextArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  priceValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  totalRow: {
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0C48F',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1A1A1A',
  },
  submitButton: {
    backgroundColor: '#E0C48F',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#E0C48F',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#333',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#1A1A1A',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
