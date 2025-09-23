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
} from 'react-native';
import {
  Monitor,
  Bath,
  Wifi,
  Coffee,
  MapPin,
  ChevronLeft,
  Star,
} from 'lucide-react-native';
import { styles } from './ResortDetailsStyle';
import GradientButton from '../../Buttons/GradientButton';
import Xyz from '../../../Screens/MembershipModal';
import { useRoute } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// Assuming ApiList is imported from your API configuration file
import { ApiList } from '../../../Api_List/apiList';

const ResortDetails: React.FC = ({ navigation }) => {
  const route = useRoute();
  const { resortId } = route.params;

  const [activeTab, setActiveTab] = useState('About Resort');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResort = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(ApiList.GET_RESORT_BY_ID(resortId), {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setResort(response.data?.data); // adjust based on actual API shape
      } catch (err) {
        console.error('Failed to fetch resort details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResort();
  }, [resortId]);

  // Fallback for gallery since API doesn't provide image_gallery
  const gallery = resort?.image_gallery?.map(img => ({ uri: img.url })) ?? [
    { uri: 'https://picsum.photos/400/304' },
    { uri: 'https://picsum.photos/400/305' },
    { uri: 'https://picsum.photos/400/306' },
  ];

  // Hardcoded specific amenities texts to match the 4 icons (since API provides amenity IDs, not names)
  // In a real app, fetch amenity names by ID from another endpoint
  const specificAmenities = ['TV Monitor', 'Bathroom', 'WiFi', 'Coffee Bar'];

  if (loading) return <ActivityIndicator />;
  if (!resort) return <Text>Resort not found</Text>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About Resort':
        return (
          <View style={styles.contentPadding}>
            <Text style={styles.sectionTitle}>About {resort.name}</Text>

            <Text style={styles.descriptionText}>
              {resort.about || 'No description available'}
            </Text>

            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {(resort.amenities || []).map((amenity, index) => (
                <View key={index} style={styles.amenityTag}>
                  <Text style={styles.amenityTagText}>
                    Amenity ID: {amenity}{' '}
                    {/* Display ID; in real app, fetch name */}
                  </Text>
                </View>
              ))}
              {resort.amenities?.length === 0 && (
                <Text style={styles.descriptionText}>No amenities listed</Text>
              )}
            </View>
          </View>
        );
      case 'Gallery':
        return (
          <View style={styles.contentPadding}>
            <FlatList
              data={gallery}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              renderItem={({ item }) => (
                <View style={styles.galleryItem}>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.galleryImage}
                  />
                </View>
              )}
              contentContainerStyle={styles.galleryList}
            />
            <GradientButton
              title="Join Club"
              style={styles.joinClubButton}
              onPress={() => setIsModalVisible(true)} // open modal
            />
            <Xyz
              visible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
            />
          </View>
        );

      case 'Reviews':
        return (
          <View style={styles.reviewsContainer}>
            {/* Clients say section */}
            <Text style={styles.clientsSayTitle}>
              See what client are saying
            </Text>
            <Text style={styles.clientsSaySubtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut Lorem
              Ipsum dolor sit amet
            </Text>

            {/* Example video/image */}
            <View style={styles.videoCard}>
              <Image
                source={{ uri: 'https://picsum.photos/400/300' }}
                style={styles.videoImage}
              />
              <View style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
              </View>
            </View>

            <Text style={styles.reviewDate}>23 Nov 2021</Text>

            {(resort.reviews || []).map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                {/* Header with avatar + name + handle */}
                <View style={styles.reviewHeader}>
                  <Image
                    source={{ uri: review.avatar }}
                    style={styles.avatar}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.userName}>{review.user}</Text>
                    <Text style={styles.userHandle}>{review.handle}</Text>
                  </View>
                </View>

                {/* Verified Purchase */}
                {review.isVerified && (
                  <View style={styles.verifiedContainer}>
                    <Text style={styles.verifiedText}>✓ Verified Purchase</Text>
                  </View>
                )}

                {/* Rating */}
                <View style={styles.ratingContainer}>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={18}
                      color={starIndex < review.rating ? '#FFD700' : '#444'}
                      fill={starIndex < review.rating ? '#FFD700' : 'none'}
                    />
                  ))}
                </View>

                {/* Comment */}
                <Text numberOfLines={3} style={styles.reviewComment}>
                  {review.comment}
                </Text>

                {/* Show more */}
                <TouchableOpacity>
                  <Text style={styles.showMoreText}>Show more ⌄</Text>
                </TouchableOpacity>

                {/* Date */}
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            ))}
            {(resort.reviews || []).length === 0 && (
              <Text style={styles.descriptionText}>No reviews available</Text>
            )}
          </View>
        );

      case 'Resort Services & Offers':
        return (
          <View style={styles.contentPadding}>
            {(resort.servicesAndOffers || []).map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceTitle}>{service.service}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>
            ))}
            {(resort.servicesAndOffers || []).length === 0 && (
              <Text style={styles.descriptionText}>
                No services or offers available
              </Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        {/* Header Image with Title */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{
              uri: 'http://103.191.132.144/uploads/resort-images/d3327d02-aee5-4c16-868d-1dcc082e2348_thumb.png',
            }}
            style={[styles.imageBackground]} // ensure width
            imageStyle={styles.imageStyle}
            onError={e =>
              console.log('Image Background failed to load:', e.nativeEvent)
            }
          >
            <View style={styles.imageOverlay}>
              {/* <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <ChevronLeft size={24} color="white" />
              </TouchableOpacity> */}
              <Text style={styles.resortTitle}>{resort.name}</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#D1D5DB" />
                <Text style={styles.locationText}>{resort.location}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Amenities Icons */}
        <View style={styles.amenitiesContainer}>
          <View style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <Monitor size={24} color="black" />
            </View>
            <Text style={styles.amenityText}>{specificAmenities[0]}</Text>
          </View>

          <View style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <Bath size={24} color="black" />
            </View>
            <Text style={styles.amenityText}>{specificAmenities[1]}</Text>
          </View>

          <View style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <Wifi size={24} color="black" />
            </View>
            <Text style={styles.amenityText}>{specificAmenities[2]}</Text>
          </View>

          <View style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <Coffee size={24} color="black" />
            </View>
            <Text style={styles.amenityText}>{specificAmenities[3]}</Text>
          </View>
        </View>

        {/* Navigation Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navigationTabsContainer}
        >
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'About Resort' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('About Resort')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'About Resort' && styles.activeTabText,
              ]}
            >
              About Resort
            </Text>
            {activeTab === 'About Resort' && (
              <View style={styles.activeTabIndicator} />
            )}
          </TouchableOpacity>

          {(resort.aboutSections ?? []).map((section, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabButton,
                activeTab === section && styles.activeTab,
              ]}
              onPress={() => setActiveTab(section)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === section && styles.activeTabText,
                  section.length > 15 && { fontSize: 12 },
                ]}
              >
                {section}
              </Text>
              {activeTab === section && (
                <View style={styles.activeTabIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Bottom Indicator
        <View style={styles.bottomIndicator}>
          <View style={styles.indicatorLine} />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResortDetails;
