import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Platform,
} from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import GradientButton from '../../Buttons/GradientButton';

const { Calendar, Phone, User, MessageCircle } = LucideIcons;

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
      handleClose();
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

  const isFormValid =
    bookingData.checkIn &&
    bookingData.checkOut &&
    bookingData.contactPhone &&
    !submitting;

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
            <View
              style={[
                styles.submitButtonWrapper,
                !isFormValid && styles.submitButtonDisabled,
              ]}
            >
              <GradientButton
                title={
                  submitting
                    ? 'Processing...'
                    : `Book Now - ₹${calculateTotal()}`
                }
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={!isFormValid}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    color: '#FBCF9C',
    fontSize: 16,
    fontFamily: 'Montserrat',
    marginBottom: 16,
    fontWeight: '600',
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
  dateInputText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#888',
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
  paymentOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
  },
  paymentOptionSelected: {
    borderColor: '#E0C48F',
    backgroundColor: '#333',
  },
  paymentOptionText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontWeight: '500',
  },
  paymentOptionTextSelected: {
    color: '#E0C48F',
    fontWeight: '600',
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
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1A1A1A',
  },
  submitButtonWrapper: {
    width: '100%',
  },
  submitButton: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    overflow: 'hidden',
  },
  submitButtonDisabled: {
    opacity: 0.4,
  },
});

export default BookingModal;
