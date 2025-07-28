import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/HomeScreenStyles';

const HomeScreen = () => {
  const featuredRooms = [
    { id: 1, name: 'Deluxe Ocean View', price: '$299', image: null },
    { id: 2, name: 'Premium Suite', price: '$459', image: null },
    { id: 3, name: 'Villa with Pool', price: '$699', image: null },
  ];

  const amenities = [
    { id: 1, name: 'Pool', icon: 'water' },
    { id: 2, name: 'Spa', icon: 'flower' },
    { id: 3, name: 'Restaurant', icon: 'restaurant' },
    { id: 4, name: 'Gym', icon: 'fitness' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroImagePlaceholder}>
          <Text style={styles.heroText}>Welcome to Paradise</Text>
          <Text style={styles.heroSubtext}>
            Experience luxury at Ananta Resorts
          </Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="calendar" size={24} color="#2E86AB" />
          <Text style={styles.actionText}>Book Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="call" size={24} color="#2E86AB" />
          <Text style={styles.actionText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="location" size={24} color="#2E86AB" />
          <Text style={styles.actionText}>Location</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Rooms */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Rooms</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredRooms.map(room => (
            <View key={room.id} style={styles.roomCard}>
              <View style={styles.roomImagePlaceholder} />
              <Text style={styles.roomName}>{room.name}</Text>
              <Text style={styles.roomPrice}>{room.price}/night</Text>
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Amenities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesGrid}>
          {amenities.map(amenity => (
            <TouchableOpacity key={amenity.id} style={styles.amenityCard}>
              <Icon name={amenity.icon} size={32} color="#2E86AB" />
              <Text style={styles.amenityText}>{amenity.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Ananta Resorts</Text>
        <Text style={styles.aboutText}>
          Nestled in paradise, Ananta Resorts offers world-class luxury and
          unparalleled service. Experience breathtaking views, exceptional
          dining, and memories that last a lifetime.
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
