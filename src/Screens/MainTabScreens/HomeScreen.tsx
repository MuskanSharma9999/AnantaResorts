import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from '../../styles/HomeScreenStyles';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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

  const { width, height } = Dimensions.get('window');
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      image: require('../../assets/images/loginCarousel_images/img_1.jpg'),
    },
    {
      image: require('../../assets/images/loginCarousel_images/img_2.jpg'),
    },
    {
      image: require('../../assets/images/loginCarousel_images/img_3.jpg'),
    },
    {
      image: require('../../assets/images/loginCarousel_images/img_4.jpg'),
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Carousel
          loop
          autoPlay
          width={width}
          height={height * 0.65}
          data={data}
          scrollAnimationDuration={2000}
          autoPlayInterval={3000}
          pagingEnabled
          onSnapToItem={index => setActiveIndex(index)}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item.image} style={styles.carouselImage} />
            </View>
          )}
        />
      </View>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.topRatedContainer}>
        <Text style={styles.topRatedText}>Top Rated</Text>
        <Text style={styles.topRatedSubText}>
          Unwind at ANANTA Club best resorts with premium stays and amazing
          experiences.
        </Text>
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
      <View style={styles.topRatedContainer}>
        <Text style={styles.topRatedText}>Hot Offers</Text>
        <Text style={styles.topRatedSubText}>
          Unwind at ANANTA Club best resorts with premium stays and amazing
          experiences.
        </Text>
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
      <View style={styles.topRatedContainer}>
        <Text style={styles.topRatedText}>Trending this Season</Text>
        <Text style={styles.topRatedSubText}>
          Unwind at ANANTA Club best resorts with premium stays and amazing
          experiences.
        </Text>
      </View>
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
    </ScrollView>
  );
};

export default HomeScreen;
