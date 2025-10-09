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
  Platform,
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
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';

const {
  Monitor,
  Bath,
  Wifi,
  Coffee,
  MapPin,
  ChevronLeft,
  Star,
  Users,
  Square,
  Calendar,
  User,
  Phone,
  MessageCircle,
} = LucideIcons;

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
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '1',
    specialRequests: '',
  });
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

    // Try to get the icon from Lucide
    const IconComponent = LucideIcons[iconName];

    // Return the component if found, otherwise return a default icon
    return IconComponent || LucideIcons.Circle;
  };

  // Helper function to render dynamic icon
  const renderDynamicIcon = (iconName, size = 20, color = '#8B5A2B') => {
    const IconComponent = getLucideIcon(iconName);

    if (!IconComponent) {
      // Fallback to a default icon if not found
      return <LucideIcons.Circle size={size} color={color} />;
    }

    return <IconComponent size={size} color={color} />;
  };

  useEffect(() => {
    fetchResort();
    fetchRooms();
    fetchReviews();
  }, [resortId]);

  const openBookingModal = room => {
    setSelectedRoom(room);
    setBookingData({
      checkIn: '',
      checkOut: '',
      guests: room?.roomType?.max_occupancy?.toString() || '1',
      specialRequests: '',
    });
    setBookingModalVisible(true);
  };

  const closeBookingModal = () => {
    setBookingModalVisible(false);
    setSelectedRoom(null);
    setBookingData({
      checkIn: '',
      checkOut: '',
      guests: '1',
      specialRequests: '',
    });
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

  // const calculateAverageRating = reviews => {
  //   if (!reviews || reviews.length === 0) return 0;

  //   try {
  //     const sum = reviews.reduce((total, review) => {
  //       const rating = parseInt(review.rating) || 0;
  //       return total + rating;
  //     }, 0);

  //     return (sum / reviews.length).toFixed(1);
  //   } catch (error) {
  //     console.error('Error calculating average rating:', error);
  //     return 0;
  //   }
  // };

  // const averageRating = calculateAverageRating(reviews);

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
        title: title.trim() || `Rating: ${rating} stars`,
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
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Write a Review</Text>
              <TouchableOpacity onPress={handleClose} disabled={submitting}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

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

            <TextInput
              style={styles.modalTitleInput}
              placeholder="Review title (optional)"
              value={title}
              onChangeText={setTitle}
              maxLength={100}
              editable={!submitting}
            />

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

  const BookingModal = ({ visible, onClose, onSubmit, room, submitting }) => {
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
    const [bookingData, setBookingData] = useState({
      checkIn: '',
      checkOut: '',
      guests: '1',
      specialRequests: '',
      contactPhone: '',
      paymentMethod: 'razorpay',
    });

    const handleSubmit = async () => {
      const success = await onSubmit(bookingData);
      if (success) {
        onClose();
      }
    };

    const handleClose = () => {
      setBookingData({
        checkIn: '',
        checkOut: '',
        guests: '1',
        specialRequests: '',
        contactPhone: '',
        paymentMethod: 'razorpay',
      });
      onClose();
    };

    const formatDate = date => {
      return date.toISOString().split('T')[0];
    };

    const onCheckInChange = (event, selectedDate) => {
      setShowCheckInPicker(false);
      if (selectedDate) {
        const formattedDate = formatDate(selectedDate);
        setBookingData({ ...bookingData, checkIn: formattedDate });

        if (!bookingData.checkOut) {
          const nextDay = new Date(selectedDate);
          nextDay.setDate(nextDay.getDate() + 1);
          setBookingData(prev => ({
            ...prev,
            checkIn: formattedDate,
            checkOut: formatDate(nextDay),
          }));
        }
      }
    };

    const onCheckOutChange = (event, selectedDate) => {
      setShowCheckOutPicker(false);
      if (selectedDate) {
        setBookingData({
          ...bookingData,
          checkOut: formatDate(selectedDate),
        });
      }
    };

    const calculateTotal = () => {
      if (!bookingData.checkIn || !bookingData.checkOut) return 0;

      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

      return nights > 0 ? nights * (room?.roomType?.price_per_night || 0) : 0;
    };

    const calculateNights = () => {
      if (!bookingData.checkIn || !bookingData.checkOut) return 0;

      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    };

    const getMinCheckOutDate = () => {
      if (!bookingData.checkIn) return new Date();
      const minDate = new Date(bookingData.checkIn);
      minDate.setDate(minDate.getDate() + 1);
      return minDate;
    };

    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book This Room</Text>
              <TouchableOpacity
                onPress={handleClose}
                disabled={submitting}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.bookingRoomInfo}>
                <Text style={styles.bookingRoomType}>
                  {room?.roomType?.room_type || 'Standard Room'}
                </Text>
                <Text style={styles.bookingRoomPrice}>
                  ₹{room?.roomType?.price_per_night || '0.00'} / night
                </Text>
                <Text style={styles.bookingRoomCapacity}>
                  Max {room?.roomType?.max_occupancy || 2} guests
                </Text>
              </View>

              <View style={styles.bookingSection}>
                <Text style={styles.sectionTitle}>Dates</Text>

                <View style={styles.bookingField}>
                  <Text style={styles.bookingLabel}>
                    <Calendar size={16} color="#E0C48F" /> Check-in Date
                  </Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowCheckInPicker(true)}
                    disabled={submitting}
                  >
                    <Text
                      style={[
                        styles.dateInputText,
                        !bookingData.checkIn && styles.placeholderText,
                      ]}
                    >
                      {bookingData.checkIn || 'Select check-in date'}
                    </Text>
                    <Calendar size={20} color="#E0C48F" />
                  </TouchableOpacity>
                </View>

                <View style={styles.bookingField}>
                  <Text style={styles.bookingLabel}>
                    <Calendar size={16} color="#E0C48F" /> Check-out Date
                  </Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowCheckOutPicker(true)}
                    disabled={submitting || !bookingData.checkIn}
                  >
                    <Text
                      style={[
                        styles.dateInputText,
                        !bookingData.checkOut && styles.placeholderText,
                      ]}
                    >
                      {bookingData.checkOut || 'Select check-out date'}
                    </Text>
                    <Calendar size={20} color="#E0C48F" />
                  </TouchableOpacity>
                </View>

                {showCheckInPicker && (
                  <DateTimePicker
                    value={
                      bookingData.checkIn
                        ? new Date(bookingData.checkIn)
                        : new Date()
                    }
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onCheckInChange}
                    minimumDate={new Date()}
                    themeVariant="dark"
                  />
                )}

                {showCheckOutPicker && (
                  <DateTimePicker
                    value={
                      bookingData.checkOut
                        ? new Date(bookingData.checkOut)
                        : getMinCheckOutDate()
                    }
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onCheckOutChange}
                    minimumDate={getMinCheckOutDate()}
                    themeVariant="dark"
                  />
                )}
              </View>

              <View style={styles.bookingSection}>
                <Text style={styles.sectionTitle}>Contact Information</Text>

                <View style={styles.bookingField}>
                  <Text style={styles.bookingLabel}>
                    <Phone size={16} color="#E0C48F" /> Contact Phone *
                  </Text>
                  <TextInput
                    style={styles.bookingInput}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#888"
                    value={bookingData.contactPhone}
                    onChangeText={text =>
                      setBookingData({ ...bookingData, contactPhone: text })
                    }
                    keyboardType="phone-pad"
                    maxLength={15}
                    editable={!submitting}
                  />
                </View>
              </View>

              <View style={styles.bookingSection}>
                <Text style={styles.sectionTitle}>Guests</Text>
                <View style={styles.bookingField}>
                  <Text style={styles.bookingLabel}>
                    <User size={16} color="#E0C48F" /> Number of Guests
                  </Text>
                  <View style={styles.guestsContainer}>
                    <TouchableOpacity
                      style={[
                        styles.guestButton,
                        (submitting || parseInt(bookingData.guests) <= 1) &&
                          styles.guestButtonDisabled,
                      ]}
                      onPress={() => {
                        const currentGuests = parseInt(bookingData.guests);
                        if (currentGuests > 1) {
                          setBookingData({
                            ...bookingData,
                            guests: (currentGuests - 1).toString(),
                          });
                        }
                      }}
                      disabled={submitting || parseInt(bookingData.guests) <= 1}
                    >
                      <Text style={styles.guestButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.guestCount}>{bookingData.guests}</Text>

                    <TouchableOpacity
                      style={[
                        styles.guestButton,
                        (submitting ||
                          parseInt(bookingData.guests) >=
                            (room?.roomType?.max_occupancy || 2)) &&
                          styles.guestButtonDisabled,
                      ]}
                      onPress={() => {
                        const currentGuests = parseInt(bookingData.guests);
                        const maxGuests = room?.roomType?.max_occupancy || 2;
                        if (currentGuests < maxGuests) {
                          setBookingData({
                            ...bookingData,
                            guests: (currentGuests + 1).toString(),
                          });
                        }
                      }}
                      disabled={
                        submitting ||
                        parseInt(bookingData.guests) >=
                          (room?.roomType?.max_occupancy || 2)
                      }
                    >
                      <Text style={styles.guestButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.bookingSection}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <View style={styles.bookingField}>
                  <Text style={styles.bookingLabel}>Select Payment Method</Text>
                  <View style={styles.paymentOptions}>
                    <TouchableOpacity
                      style={[
                        styles.paymentOption,
                        bookingData.paymentMethod === 'razorpay' &&
                          styles.paymentOptionSelected,
                      ]}
                      onPress={() =>
                        setBookingData({
                          ...bookingData,
                          paymentMethod: 'razorpay',
                        })
                      }
                      disabled={submitting}
                    >
                      <Text
                        style={[
                          styles.paymentOptionText,
                          bookingData.paymentMethod === 'razorpay' &&
                            styles.paymentOptionTextSelected,
                        ]}
                      >
                        Razorpay
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.paymentOption,
                        bookingData.paymentMethod === 'cash' &&
                          styles.paymentOptionSelected,
                      ]}
                      onPress={() =>
                        setBookingData({
                          ...bookingData,
                          paymentMethod: 'cash',
                        })
                      }
                      disabled={submitting}
                    >
                      <Text
                        style={[
                          styles.paymentOptionText,
                          bookingData.paymentMethod === 'cash' &&
                            styles.paymentOptionTextSelected,
                        ]}
                      >
                        Pay at Resort
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.bookingSection}>
                <Text style={styles.sectionTitle}>
                  <MessageCircle size={16} color="#E0C48F" /> Special Requests
                </Text>
                <TextInput
                  style={[styles.bookingInput, styles.bookingTextArea]}
                  placeholder="Any special requests or requirements..."
                  placeholderTextColor="#888"
                  value={bookingData.specialRequests}
                  onChangeText={text =>
                    setBookingData({ ...bookingData, specialRequests: text })
                  }
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={!submitting}
                />
              </View>

              <View style={styles.bookingSection}>
                <Text style={styles.sectionTitle}>Price Breakdown</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>
                    ₹{room?.roomType?.price_per_night || '0.00'} x{' '}
                    {calculateNights()} nights
                  </Text>
                  <Text style={styles.priceValue}>₹{calculateTotal()}</Text>
                </View>

                <View style={styles.divider} />

                <View style={[styles.priceRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalAmount}>₹{calculateTotal()}</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.footer}>
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
            </View>
          </View>
        </View>
      </Modal>
    );
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
                          {renderDynamicIcon(amenity.icon_name, 26, '#8B5A2B')}
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
