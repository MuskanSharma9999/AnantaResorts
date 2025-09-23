import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
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
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
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
    // ❌ 'background' is invalid in RN
    // background: 'linear-gradient(...)'
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
  joinClubContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },

  // Reviews styles
  reviewsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  clientsSayTitle: {
    color: '#FBCF9C',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Cormorant-Bold',
  },
  clientsSaySubtitle: {
    color: '#D1D5DB',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Montserrat',
  },
  videoCard: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  videoImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -25,
    marginLeft: -25,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 16,
    color: '#000',
    marginLeft: 3,
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#000',
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
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Montserrat',
  },
  userHandle: {
    fontSize: 13,
    color: '#FBCF9C',
    fontFamily: 'Montserrat',
  },
  verifiedContainer: {
    backgroundColor: '#FBCF9C',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  verifiedText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewComment: {
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 8,
    lineHeight: 20,
    fontFamily: 'Montserrat',
  },
  showMoreText: {
    color: '#FBCF9C',
    fontSize: 13,
    marginBottom: 8,
    fontFamily: 'Montserrat',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Montserrat',
  },

  // Service styles
  serviceItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'rgba(251, 207, 156, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.2)',
  },
  serviceTitle: {
    fontWeight: '600',
    color: '#FBCF9C',
    marginBottom: 6,
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  serviceDescription: {
    color: '#D1D5DB',
    lineHeight: 20,
    fontSize: 14,
    fontFamily: 'Montserrat',
  },

  // Legacy styles (kept for compatibility)
  scrollView: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageBackground: {
    height: 320,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 16,
  },
  imageOverlay: {
    padding: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  resortTitle: {
    color: '#FBCF9C',
    fontSize: 36,
    fontWeight: '300',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: -100,
  },
  amenityItem: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(250, 247, 247, 1)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  amenityText: {
    color: '#D1D5DB',
    fontSize: 12,
    textAlign: 'center',
  },
  bottomIndicator: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  indicatorLine: {
    width: 128,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  navigationTabsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000000',
  },
  reviewsMainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 24,
    fontFamily: 'Inter-Bold',
  },
  reviewTime: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter-Bold',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
});
