// ResortDetails.styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {},
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 24,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  resortTitle: {
    color: 'white',
    fontSize: 36,
    fontWeight: '300',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  locationText: {
    color: '#D1D5DB',
    fontSize: 14,
    marginLeft: 8,
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
  sectionTitle: {
    color: '#FBCF9C',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Cormorant',
    marginBottom: 12,
  },
  descriptionText: {
    color: '#D1D5DB',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Montserrat',
  },
  amenityTag: {
    backgroundColor: 'rgba(224, 196, 143, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(224, 196, 143, 0.3)',
  },
  amenityTagText: {
    color: '#E0C48F',
    fontSize: 12,
    fontFamily: 'Montserrat',
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
  serviceItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  serviceTitle: {
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  serviceDescription: {
    color: '#6B7280',
    lineHeight: 20,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  navigationTabsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 16,
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '500',
    fontSize: 14,
  },
  activeTabText: {
    color: '#FBCF9C',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000000',
  },
  reviewsContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  reviewsMainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 24,
    fontFamily: 'Inter-Bold',
  },
  reviewCard: {
    marginBottom: 24,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'Inter-SemiBold',
  },
  reviewTime: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  verifiedContainer: {
    backgroundColor: '#F0FDF4',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  verifiedText: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#000000',
    fontFamily: 'Inter-Bold',
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  showMoreText: {
    color: '#3B82F6',
    fontSize: 14,
    marginBottom: 12,
    fontFamily: 'Inter-Medium',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Inter-Regular',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  clientsSayTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginTop: 8,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  clientsSaySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  galleryList: {
    padding: 8,
    justifyContent: 'center',
  },
  galleryItem: {
    flex: 1,
    margin: 2,
    alignItems: 'center',
    borderRadius: 14,
   
  },
  galleryImage: {
    width: 120,
    height: 120,
     margin: 2,
    alignItems: 'center',
    borderRadius: 14,
    
    borderWidth: 1,
    borderColor: 'gold',
    resizeMode: 'cover',
  },


});
