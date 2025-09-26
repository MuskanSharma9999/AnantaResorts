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
import { ApiList } from '../../../Api_List/apiList';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Dimensions } from 'react-native';

const ResortDetails: React.FC = ({ navigation }) => {
  const route = useRoute();
  const { resortId } = route.params;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resort, setResort] = useState(null);
  const [loading, setLoading] = useState(true);

  const layout = Dimensions.get('window');
  const [tabIndex, setTabIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About Resort' },
    { key: 'gallery', title: 'Gallery' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'services', title: 'Resort Services & Offers' },
  ]);

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
        setResort(response.data?.data);
      } catch (err) {
        console.error('Failed to fetch resort details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResort();
  }, [resortId]);

  const handleJoinClub = () => {
    console.log('handle join club pressed');
  };

  const gallery = resort?.image_gallery?.map(img => ({ uri: img.url })) ?? [
    { uri: 'https://picsum.photos/400/304' },
    { uri: 'https://picsum.photos/400/305' },
    { uri: 'https://picsum.photos/400/306' },
    { uri: 'https://picsum.photos/400/304' },
    { uri: 'https://picsum.photos/400/305' },
    { uri: 'https://picsum.photos/400/306' },
    { uri: 'https://picsum.photos/400/304' },
    { uri: 'https://picsum.photos/400/305' },
    { uri: 'https://picsum.photos/400/306' },
  ];

  const specificAmenities = [
    '4G Television',
    'Poolside dine',
    'Standard wifi',
    'Free Breakfast',
  ];

  if (loading) return <ActivityIndicator size="large" color="#E0C48F" />;
  if (!resort)
    return <Text style={styles.descriptionText}>Resort not found</Text>;

  const renderScene = SceneMap({
    about: () => (
      <ScrollView
        style={styles.contentPadding}
        contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={true}
        scrollEventThrottle={16}
      >
        <Text style={styles.sectionTitle}>About {resort.name}</Text>
        <Text style={styles.descriptionText}>
          {resort.about || 'No description available'}
        </Text>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {(resort.amenities || []).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityTagText}>{amenity}</Text>{' '}
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
        {/* <View style={styles.joinClubContainer}>
          <GradientButton
            title="Join Club"
            onPress={() => setIsModalVisible(true)}
          />
        </View>
        <Xyz
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        /> */}
      </View>
    ),

    reviews: () => (
      <ScrollView style={styles.reviewsContainer}>
        <Text style={styles.clientsSayTitle}>See what clients are saying</Text>
        <Text style={styles.clientsSaySubtitle}>
          Hear from our guests about their unforgettable experiences
        </Text>

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
            <View style={styles.reviewHeader}>
              <Image source={{ uri: review.avatar }} style={styles.avatar} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.userName}>{review.user}</Text>
                <Text style={styles.userHandle}>{review.handle}</Text>
              </View>
            </View>
            {review.isVerified && (
              <View style={styles.verifiedContainer}>
                <Text style={styles.verifiedText}>✓ Verified Purchase</Text>
              </View>
            )}
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
            <Text style={styles.reviewComment} numberOfLines={3}>
              {review.comment}
            </Text>
            <TouchableOpacity>
              <Text style={styles.showMoreText}>Show more ⌄</Text>
            </TouchableOpacity>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        ))}

        {(resort.reviews || []).length === 0 && (
          <Text style={styles.descriptionText}>No reviews available</Text>
        )}
      </ScrollView>
    ),

    services: () => (
      <ScrollView
        style={styles.contentPadding}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {(resort.servicesAndOffers || []).map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={styles.serviceTitle}>{service.service}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
          </View>
        ))}
        {(resort.servicesAndOffers || []).length === 0 && (
          <Text style={styles.descriptionText}>
            No services or offers available
          </Text>
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
          {/* Back button */}
          {/* <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity> */}

          {/* Resort info overlay */}
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
    </SafeAreaView>
  );
};

export default ResortDetails;
