import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/BookingScreenStyles';

const BookingScreen = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [selectedRoom, setSelectedRoom] = useState('');

  const roomTypes = [
    {
      id: 1,
      name: 'Standard Room',
      price: 199,
      features: ['City View', 'Free WiFi'],
    },
    {
      id: 2,
      name: 'Deluxe Ocean View',
      price: 299,
      features: ['Ocean View', 'Balcony', 'Free WiFi'],
    },
    {
      id: 3,
      name: 'Premium Suite',
      price: 459,
      features: ['Ocean View', 'Living Area', 'Kitchenette'],
    },
    {
      id: 4,
      name: 'Villa with Pool',
      price: 699,
      features: ['Private Pool', 'Garden View', 'Full Kitchen'],
    },
  ];

  const handleBooking = () => {
    if (!checkIn || !checkOut || !selectedRoom) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Your booking request has been submitted!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Book Your Stay</Text>

        {/* Date Selection */}
        <View style={styles.dateContainer}>
          <TouchableOpacity style={styles.dateInput}>
            <Icon name="calendar" size={20} color="#2E86AB" />
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>Check-in</Text>
              <Text style={styles.dateText}>{checkIn || 'Select Date'}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dateInput}>
            <Icon name="calendar" size={20} color="#2E86AB" />
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateLabel}>Check-out</Text>
              <Text style={styles.dateText}>{checkOut || 'Select Date'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Guests */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of Guests</Text>
          <TextInput
            style={styles.input}
            value={guests}
            onChangeText={setGuests}
            keyboardType="numeric"
            placeholder="2"
          />
        </View>

        {/* Room Selection */}
        <Text style={styles.label}>Select Room Type</Text>
        {roomTypes.map(room => (
          <TouchableOpacity
            key={room.id}
            style={[
              styles.roomOption,
              selectedRoom === room.name && styles.selectedRoom,
            ]}
            onPress={() => setSelectedRoom(room.name)}
          >
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomPrice}>${room.price}/night</Text>
              <View style={styles.features}>
                {room.features.map((feature, index) => (
                  <Text key={index} style={styles.feature}>
                    • {feature}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.radioButton}>
              {selectedRoom === room.name && (
                <View style={styles.radioButtonSelected} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingScreen;
