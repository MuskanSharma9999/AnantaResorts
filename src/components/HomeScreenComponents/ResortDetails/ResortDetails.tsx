import React, { useState } from 'react';
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

const ResortDetails = ({ route, navigation }) => {
  const { resort } = route.params;
  const [activeTab, setActiveTab] = useState('About Resort');
  const gallery = [
    { uri: 'https://picsum.photos/400/304' },
    { uri: 'https://picsum.photos/400/305' },
    { uri: 'https://picsum.photos/400/306' },
    { uri: 'https://picsum.photos/400/304' },
    { uri: 'https://picsum.photos/400/305' },
    { uri: 'https://picsum.photos/400/306' },
    { uri: 'https://picsum.photos/400/304' },
    { uri: 'https://picsum.photos/400/305' },
    { uri: 'https://picsum.photos/400/306' },
    // ...other items
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'About Resort':
        return (
          <View style={styles.contentPadding}>
            <Text style={styles.sectionTitle}>About {resort.title}</Text>
            <Text style={styles.descriptionText}>{resort.description}</Text>

            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {resort.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityTag}>
                  <Text style={styles.amenityTagText}>{amenity}</Text>
                </View>
              ))}
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
              onPress={() => console.log('Join Club Pressed')}
            ></GradientButton>
          </View>
        );

      case 'Reviews':
        return (
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsMainTitle}>Reviews</Text>

            {resort.reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.userName}>{review.user}</Text>
                  <Text style={styles.reviewTime}>9:41</Text>
                </View>

                {review.isVerified && (
                  <View style={styles.verifiedContainer}>
                    <Text style={styles.verifiedText}>Verified Purchase</Text>
                  </View>
                )}

                <View style={styles.ratingContainer}>
                  <Star size={16} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.ratingText}>{review.rating}</Text>
                </View>

                <Text style={styles.reviewComment}>{review.comment}</Text>

                <TouchableOpacity>
                  <Text style={styles.showMoreText}>Show more ✔</Text>
                </TouchableOpacity>

                <Text style={styles.reviewDate}>{review.date}</Text>

                {index < resort.reviews.length - 1 && (
                  <View style={styles.reviewDivider} />
                )}
              </View>
            ))}

            <Text style={styles.clientsSayTitle}>
              See what clients are saying
            </Text>
            <Text style={styles.clientsSaySubtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut Lorem
              Ipsum dolor sit amet
            </Text>
          </View>
        );
      case 'Resort Services & Offers':
        return (
          <View style={styles.contentPadding}>
            {resort.servicesAndOffers.map((service, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceTitle}>{service.service}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>
            ))}
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
            source={resort.image}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <View style={styles.imageOverlay}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <ChevronLeft size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.resortTitle}>{resort.title}</Text>
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
            <Text style={styles.amenityText}>
              {resort.specificAmenities[0]}
            </Text>
          </View>

          <View style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <Bath size={24} color="black" />
            </View>
            <Text style={styles.amenityText}>
              {resort.specificAmenities[1]}
            </Text>
          </View>

          <View style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <Wifi size={24} color="black" />
            </View>
            <Text style={styles.amenityText}>
              {resort.specificAmenities[2]}
            </Text>
          </View>

          <View style={styles.amenityItem}>
            <View style={styles.iconContainer}>
              <Coffee size={24} color="black" />
            </View>
            <Text style={styles.amenityText}>
              {resort.specificAmenities[3]}
            </Text>
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

          {resort.aboutSections.map((section, index) => (
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

        {/* Bottom Indicator */}
        <View style={styles.bottomIndicator}>
          <View style={styles.indicatorLine} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResortDetails;
