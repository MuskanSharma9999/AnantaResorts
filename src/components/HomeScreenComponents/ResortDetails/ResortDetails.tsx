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
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {
  Monitor,
  Bath,
  Wifi,
  Coffee,
  MapPin,
  ChevronLeft,
  Star,
  Users,
  Square,
} from 'lucide-react-native';
import { styles } from './ResortDetailsStyle';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ApiList } from '../../../Api_List/apiList';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Dimensions } from 'react-native';

const ResortDetails: React.FC = ({ navigation }) => {
  const route = useRoute();
  const { resortId } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const layout = Dimensions.get('window');
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About Resort' },
    { key: 'gallery', title: 'Gallery' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'rooms', title: 'Rooms' },
  ]);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchResort();
    fetchRooms();
    fetchReviews();
  }, [resortId]);

  const fetchResort = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(ApiList.GET_RESORT_BY_ID(resortId), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('??????????????????????????????', response);
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

      // Updated API endpoint for fetching reviews
      const response = await axios.get(
        `${ApiList.SUBMIT_REVIEW}/${resortId}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('fetch Reviewssssss ', response);

      setReviews(response.data?.data || response.data || []);
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

      // Updated API endpoint and payload structure
      const response = await axios.post(
        `${ApiList.SUBMIT_REVIEW}/${resortId}/reviews`,
        {
          rating: reviewData.rating.toString(), // Convert to string as per your payload
          title: reviewData.title || 'Great experience', // Add title field
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
        fetchReviews(); // Refresh reviews
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

  const getStatusColor = status => {
    switch (status) {
      case 'clean':
        return '#10B981';
      case 'dirty':
        return '#EF4444';
      case 'out_of_order':
        return '#F59E0B';
      case 'occupied':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const ReviewModal = ({ visible, onClose, onSubmit, submitting }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async () => {
      if (rating === 0 || !comment.trim()) {
        alert('Please provide both rating and comment');
        return;
      }

      const success = await onSubmit({
        rating,
        title: title.trim() || `Rating: ${rating} stars`, // Default title if empty
        comment,
      });

      if (success) {
        setRating(0);
        setTitle('');
        setComment('');
        onClose();
      }
    };

    const handleClose = () => {
      setRating(0);
      setTitle('');
      setComment('');
      onClose();
    };

    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Write a Review</Text>
              <TouchableOpacity onPress={handleClose} disabled={submitting}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Rating */}
            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>Rate your experience:</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setRating(star)}
                    disabled={submitting}
                  >
                    <Text
                      style={[
                        styles.starInput,
                        {
                          color: star <= rating ? '#FFD700' : '#CCC',
                          fontSize: 40,
                        },
                      ]}
                    >
                      ★
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Title Input */}
            <TextInput
              style={styles.modalTitleInput}
              placeholder="Review title (optional)"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
              editable={!submitting}
            />

            {/* Comment Input */}
            <TextInput
              style={styles.modalCommentInput}
              placeholder="Tell us about your experience... *"
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!submitting}
            />

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.modalSubmitButton,
                submitting && styles.modalSubmitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={submitting || rating === 0 || !comment.trim()}
            >
              <Text style={styles.modalSubmitButtonText}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const getStatusText = status => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const gallery = resort?.image_gallery?.map(img => ({ uri: img.url }));

  const specificAmenities = [
    '4G Television',
    'Poolside dine',
    'Standard wifi',
    'Free Breakfast',
  ];

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + parseInt(review.rating), 0) /
          reviews.length
        ).toFixed(1)
      : 0;

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
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {(resort.amenities || []).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityTagText}>{amenity}</Text>
            </View>
          ))}
          {(resort.amenities || []).length === 0 && (
            <Text style={styles.descriptionText}>No amenities listed</Text>
          )}
        </View>
      </ScrollView>
    ),

    gallery: () => (
      <View style={styles.galleryContainer}>
        <FlatList
          data={gallery}
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
      <ScrollView style={styles.reviewsContainer}>
        {/* Reviews Header */}
        {/* <View style={styles.reviewsHeader}> */}
        {/* <View style={styles.ratingSummary}>
            <Text style={styles.averageRating}>{averageRating}</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={20}
                  color={star <= averageRating ? '#FFD700' : '#DDD'}
                  fill={star <= averageRating ? '#FFD700' : 'none'}
                />
              ))}
            </View>
            <Text style={styles.totalReviews}>({reviews.length} reviews)</Text>
          </View> */}

        {/* <TouchableOpacity
            style={styles.addReviewButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.addReviewButtonText}>Add Review</Text>
          </TouchableOpacity> */}
        {/* </View> */}

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
                <TouchableOpacity
                  style={styles.addReviewButton}
                  onPress={() => setIsModalVisible(true)}
                >
                  <Text style={styles.addReviewButtonText}>Write a Review</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>
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
            {/* Room card content remains the same */}
            <View style={styles.roomHeader}>
              <View>
                <Text style={styles.roomNumber}>
                  {room.roomType?.room_type || 'Standard Room'}
                </Text>
              </View>
              {/* <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(room.room_status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {getStatusText(room.room_status)}
                </Text>
              </View> */}
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

            <View style={styles.roomFooter}>
              <View>
                <Text style={styles.priceLabel}>Price per night</Text>
                <Text style={styles.price}>
                  ₹{room.roomType?.price_per_night || '0.00'}
                </Text>
              </View>
            </View>

            {/* {room.housekeeping_status && (
              <View style={styles.housekeepingInfo}>
                <Text style={styles.housekeepingLabel}>Housekeeping:</Text>
                <Text style={styles.housekeepingStatus}>
                  {room.housekeeping_status.replace(/_/g, ' ')}
                </Text>
              </View>
            )} */}

            {/* {room.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesText}>{room.notes}</Text>
              </View>
            )} */}
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

      {/* Header Image with overlay text */}
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
          </View>
        </ImageBackground>
      </View>

      {/* Amenities Icons */}
      <View style={styles.amenitiesRow}>
        {[Monitor, Bath, Wifi, Coffee].map((Icon, index) => (
          <View key={index} style={styles.amenityIconContainer}>
            <View style={styles.amenityIconWrapper}>
              <Icon size={20} color="#8B5A2B" />
            </View>
            <Text style={styles.amenityLabel}>{specificAmenities[index]}</Text>
          </View>
        ))}
      </View>

      {/* Tab Navigation */}
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

      {/* Review Modal */}
      <ReviewModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={submitReview}
        submitting={submittingReview}
      />
    </SafeAreaView>
  );
};

export default ResortDetails;
