import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { styles } from './ResortDetailsStyle';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ApiList } from '../../../Api_List/apiList';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import GradientButton from '../../Buttons/GradientButton';
import { useSelector } from 'react-redux';
import ReviewModal from './ReviewModal';
import BookingModal from './BookingModal';

const { MapPin, Star, Users, Square } = LucideIcons;

const ResortDetails: React.FC = ({ navigation }) => {
  const route = useRoute();
  const { resortId } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const activeMembership = useSelector(state => state.user.activeMembership);

  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [submittingBooking, setSubmittingBooking] = useState(false);

  const layout = Dimensions.get('window');
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About Resort' },
    { key: 'gallery', title: 'Gallery' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'rooms', title: 'Rooms' },
  ]);

  const [rooms, setRooms] = useState([]);

  // Helper function to get Lucide icon component dynamically
  const getLucideIcon = iconName => {
    if (!iconName) return null;
    const IconComponent = LucideIcons[iconName];
    return IconComponent || LucideIcons.Circle;
  };

  // Helper function to render dynamic icon
  const renderDynamicIcon = (
    iconName,
    size = 20,
    stroke = 1,
    color = '#8B5A2B',
  ) => {
    const IconComponent = getLucideIcon(iconName);
    if (!IconComponent) {
      return <LucideIcons.Circle size={size} color={color} />;
    }
    return <IconComponent size={size} color={color} strokeWidth={stroke} />;
  };

  useEffect(() => {
    fetchResort();
    fetchRooms();
    fetchReviews();
  }, [resortId]);

  const openBookingModal = room => {
    setSelectedRoom(room);
    setBookingModalVisible(true);
  };

  const closeBookingModal = () => {
    setBookingModalVisible(false);
    setSelectedRoom(null);
  };

  const fetchResort = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(ApiList.GET_RESORT_BY_ID(resortId), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Resort API Response:', response);
      setResort(response.data?.data);
    } catch (err) {
      console.error('Failed to fetch resort details:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found. Aborting fetch.');
        return;
      }

      const response = await axios.get(
        `${ApiList.GET_ALL_ROOMS}?resort_id=${resortId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setRooms(response.data?.data || []);
    } catch (err) {
      console.error(
        'Failed to fetch rooms:',
        err.response?.data || err.message,
      );
      setRooms([]);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewLoading(true);
      const token = await AsyncStorage.getItem('token');

      const response = await axios.get(
        `${ApiList.SUBMIT_REVIEW}/${resortId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('fetch Reviews:', response);
      setReviews(response.data?.data.reviews || response.data || []);
    } catch (err) {
      console.error(
        'Failed to fetch reviews:',
        err.response?.data || err.message,
      );
      setReviews([]);
    } finally {
      setReviewLoading(false);
    }
  };

  const submitReview = async reviewData => {
    try {
      setSubmittingReview(true);
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(
        `${ApiList.SUBMIT_REVIEW}/${resortId}/reviews`,
        {
          rating: reviewData.rating.toString(),
          title: reviewData.title || 'Great experience',
          comment: reviewData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.success) {
        Alert.alert('Success', 'Review submitted successfully!');
        fetchReviews();
        return true;
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to submit review. Please try again.',
        );
        return false;
      }
    } catch (err) {
      console.error(
        'Failed to submit review:',
        err.response?.data || err.message,
      );
      Alert.alert(
        'Error',
        err.response?.data?.message ||
          'Failed to submit review. Please try again.',
      );
      return false;
    } finally {
      setSubmittingReview(false);
    }
  };

  const submitBooking = async bookingData => {
    try {
      setSubmittingBooking(true);
      const token = await AsyncStorage.getItem('token');

      if (!selectedRoom) {
        Alert.alert('Error', 'No room selected');
        return false;
      }

      if (!bookingData.checkIn || !bookingData.checkOut) {
        Alert.alert('Error', 'Please select check-in and check-out dates');
        return false;
      }

      if (!bookingData.contactPhone) {
        Alert.alert('Error', 'Please enter your contact phone number');
        return false;
      }

      const bookingPayload = {
        resort_id: resortId,
        room_id: selectedRoom?.id,
        room_type_id: selectedRoom?.roomType?.id,
        check_in_date: bookingData.checkIn,
        check_out_date: bookingData.checkOut,
        guests: parseInt(bookingData.guests),
        special_requests: bookingData.specialRequests || '',
        contact_phone: bookingData.contactPhone,
        payment_method: bookingData.paymentMethod || 'razorpay',
      };

      console.log('Booking Payload:', bookingPayload);

      const response = await axios.post(
        `${ApiList.CREATE_BOOKING}`,
        bookingPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.success) {
        Alert.alert('Success', 'Booking submitted successfully!');
        closeBookingModal();
        return true;
      } else {
        Alert.alert(
          'Error',
          response.data.message ||
            'Failed to submit booking. Please try again.',
        );
        return false;
      }
    } catch (err) {
      console.error('Booking Error:', err.response?.data || err.message);
      Alert.alert(
        'Error',
        err.response?.data?.message ||
          'Something went wrong while submitting your booking.',
      );
      return false;
    } finally {
      setSubmittingBooking(false);
    }
  };

  const getAmenities = () => {
    if (!resort?.amenities || !Array.isArray(resort.amenities)) return [];
    return resort.amenities;
  };

  const getGalleryImages = () => {
    if (!resort?.image_gallery || !Array.isArray(resort.image_gallery))
      return [];
    return resort.image_gallery.map(img => ({
      uri: img.url || 'https://via.placeholder.com/150',
    }));
  };

  if (loading) return <ActivityIndicator size="large" color="#E0C48F" />;
  if (!resort)
    return <Text style={styles.descriptionText}>Resort not found</Text>;

  const renderScene = SceneMap({
    about: () => (
      <ScrollView
        style={styles.contentPadding}
        contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>About {resort.name}</Text>
        <Text style={styles.descriptionText}>
          {resort.about || 'No description available'}
        </Text>
      </ScrollView>
    ),

    gallery: () => (
      <View style={styles.galleryContainer}>
        <FlatList
          data={getGalleryImages()}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={styles.galleryItem}>
              <Image source={{ uri: item.uri }} style={styles.galleryImage} />
            </View>
          )}
          contentContainerStyle={styles.galleryList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    ),

    reviews: () => (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.reviewsContainer}>
          {reviewLoading ? (
            <ActivityIndicator
              size="large"
              color="#E0C48F"
              style={styles.loadingIndicator}
            />
          ) : (
            <>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <View key={review.id || index} style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <Image
                        source={{
                          uri:
                            review.user_avatar ||
                            review.user?.avatar ||
                            'https://via.placeholder.com/40',
                        }}
                        style={styles.avatar}
                      />
                      <View style={styles.reviewUserInfo}>
                        <Text style={styles.userName}>
                          {review.user_name ||
                            review.user?.name ||
                            'Anonymous User'}
                        </Text>
                        <Text style={styles.reviewDate}>
                          {new Date(
                            review.created_at || review.date,
                          ).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.ratingContainer}>
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={16}
                            color={
                              starIndex < parseInt(review.rating)
                                ? '#FFD700'
                                : '#444'
                            }
                            fill={
                              starIndex < parseInt(review.rating)
                                ? '#FFD700'
                                : 'none'
                            }
                          />
                        ))}
                      </View>
                    </View>

                    {review.title && (
                      <Text style={styles.reviewTitle}>{review.title}</Text>
                    )}

                    <Text style={styles.reviewComment}>{review.comment}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.noReviewsContainer}>
                  <Text style={styles.noReviewsText}>No reviews yet</Text>
                  <Text style={styles.noReviewsSubtext}>
                    Be the first to share your experience!
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.floatingAddButton}
          onPress={() => setIsModalVisible(true)}
        >
          <LucideIcons.Plus color="#fff" size={28} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    ),

    rooms: () => (
      <ScrollView
        style={styles.roomsContainer}
        contentContainerStyle={styles.roomsContentContainer}
      >
        <Text style={styles.sectionTitle}>Available Rooms</Text>
        <Text style={styles.roomsSubtitle}>
          {rooms.length} rooms found at this resort
        </Text>

        {(rooms || []).map((room, index) => (
          <View key={room.id || index} style={styles.roomCard}>
            <View style={styles.roomHeader}>
              <View>
                <Text style={styles.roomNumber}>
                  {room.roomType?.room_type || 'Standard Room'}
                </Text>
              </View>
            </View>

            <View style={styles.roomDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Square size={16} color="#FBCF9C" />
                  <Text style={styles.detailText}>
                    {room.roomType?.max_occupancy || 2} guests
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Users size={16} color="#FBCF9C" />
                  <Text style={styles.detailText}>
                    Max: {room.roomType?.max_occupancy || 2}
                  </Text>
                </View>
              </View>

              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <MapPin size={16} color="#FBCF9C" />
                  <Text style={styles.detailText}>
                    {room.room_view?.replace(/_/g, ' ') || 'Garden view'}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailText}>
                    Floor: {room.floor_number || 1}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={styles.roomFooter}>
                <View>
                  <Text style={styles.priceLabel}>Price per night</Text>
                  <Text style={styles.price}>
                    ₹{room.roomType?.price_per_night || '0.00'}
                  </Text>
                </View>

                {activeMembership && (
                  <View style={styles.container}>
                    <GradientButton
                      title="Book"
                      style={styles.button}
                      onPress={() => openBookingModal(room)}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}

        {(rooms || []).length === 0 && (
          <View style={styles.noRoomsContainer}>
            <Text style={styles.noRoomsText}>No rooms available</Text>
            <Text style={styles.noRoomsSubtext}>
              Please check back later for availability
            </Text>
          </View>
        )}
      </ScrollView>
    ),
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.headerContainer}>
        <ImageBackground
          source={{
            uri:
              resort.image ||
              'http://103.191.132.144/uploads/resort-images/d3327d02-aee5-4c16-868d-1dcc082e2348_thumb.png',
          }}
          style={styles.headerImage}
          imageStyle={styles.headerImageStyle}
        >
          <View style={styles.headerOverlay}>
            <Text style={styles.resortName}>{resort.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#fff" />
              <Text style={styles.locationText}>{resort.location}</Text>
            </View>
            <View style={styles.amenitiesRow}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: 'row',
                  gap: 20,
                  paddingHorizontal: 10,
                }}
              >
                {getAmenities().length > 0 ? (
                  getAmenities().map((amenity, index) => (
                    <View
                      key={amenity.id || index}
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                      <View style={styles.amenityTag}>
                        <View style={styles.amenityTagIcon}>
                          {renderDynamicIcon(
                            amenity.icon_name,
                            26,
                            2,
                            '#8B5A2B',
                          )}
                        </View>
                      </View>
                      <Text style={styles.amenityTagText}>
                        {amenity.name || amenity.label}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.descriptionText}>
                    No amenities listed
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>

      <TabView
        navigationState={{ index: tabIndex, routes }}
        renderScene={renderScene}
        onIndexChange={setTabIndex}
        initialLayout={{ width: layout.width }}
        style={[styles.tabViewStyle, { flex: 1 }]}
        swipeEnabled={true}
        renderTabBar={({ navigationState, jumpTo }) => (
          <View style={styles.tabBarContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabScrollContainer}
            >
              {navigationState.routes.map((route, i) => {
                const isActive = i === tabIndex;
                return (
                  <TouchableOpacity
                    key={route.key}
                    onPress={() => jumpTo(route.key)}
                    style={[styles.tabItem, isActive && styles.activeTabItem]}
                  >
                    <Text
                      style={[styles.tabText, isActive && styles.activeTabText]}
                    >
                      {route.title}
                    </Text>
                    {isActive && <View style={styles.tabIndicator} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      />

      <ReviewModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={submitReview}
        submitting={submittingReview}
      />

      <BookingModal
        visible={bookingModalVisible}
        onClose={closeBookingModal}
        onSubmit={submitBooking}
        room={selectedRoom}
        submitting={submittingBooking}
      />
    </SafeAreaView>
  );
};

export default ResortDetails;

//  <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//       {getAmenities().map((amenity, index) => (
//         <View key={amenity.id || index} style={styles.amenityTag}>
//           <View style={styles.amenityTagIcon}>
//             {renderDynamicIcon(amenity.icon_name, 16, '#8B5A2B')}
//           </View>
//           <Text style={styles.amenityTagText}>{amenity.name}</Text>
//         </View>
//       ))}
//       {getAmenities().length === 0 && (
//         <Text style={styles.descriptionText}>No amenities listed</Text>
//       )}
//     </View>

{
  /* <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.submitButton,
                  (!bookingData.checkIn ||
                    !bookingData.checkOut ||
                    !bookingData.contactPhone ||
                    submitting) &&
                    styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={
                  submitting ||
                  !bookingData.checkIn ||
                  !bookingData.checkOut ||
                  !bookingData.contactPhone
                }
              >
                <Text style={styles.submitButtonText}>
                  {submitting
                    ? 'Processing...'
                    : `Book Now - ₹${calculateTotal()}`}
                </Text>
              </TouchableOpacity>
            </View> */
}
