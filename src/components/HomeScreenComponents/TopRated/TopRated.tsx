import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import styles from './TopRatedStyles';
import GradientButton from '../../Buttons/GradientButton';
import { useNavigation } from '@react-navigation/native';
import ApiList from '../../../Api_List/apiList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TopRated = () => {
  const navigation = useNavigation();
  const [resorts, setResorts] = useState<any[]>([]);

useEffect(() => {
  const fetchResorts = async () => {
    try {
      console.log('[TopRated] Fetching resorts...');

      // ✅ Get token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.warn('[TopRated] No token found in storage');
        return;
      }
      console.log('[TopRated] Token:', token.substring(0, 15) + '...');

      // ✅ Pass token in headers
      const response = await axios.get(ApiList.GET_ALL_RESORTS, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(
        '[TopRated] Full API Response:',
        JSON.stringify(response.data, null, 2)
      );

      if (Array.isArray(response.data)) {
        setResorts(response.data);
        console.log('[TopRated] Resorts set in state:', response.data.length);
      } else if (Array.isArray(response.data.data)) {
        setResorts(response.data.data);
        console.log('[TopRated] Resorts set from response.data.data:', response.data.data.length);
      } else {
        console.warn('[TopRated] Unexpected response structure:', response.data);
      }
    } catch (error: any) {
      console.error(
        '[TopRated] Error fetching resorts:',
        error.response?.data || error.message
      );
    }
  };

  fetchResorts();
}, []);


  return (
    <View style={{ backgroundColor: '#000' }}>
      {/* Header */}
      <View style={styles.topRatedContainer}>
        <Text style={styles.topRatedText}>Top Rated</Text>
        <Text style={styles.topRatedSubText}>
          Unwind at{' '}
          <Text style={{ fontWeight: '700', color: '#fff' }}>ANANTA</Text> Club
          best resorts with premium stays and amazing experiences.
        </Text>
      </View>

      {/* Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {resorts.map(resort => (
          <View key={resort.id} style={{ width: 280, marginRight: 15 }}>
            <View
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                borderColor: '#E0C48F',
                borderWidth: 2,
              }}
            >
              <ImageBackground
                source={resort.image}
                style={{ height: 220, borderRadius: 20 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    padding: 16,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                >
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#FBCF9C',
                        fontFamily: 'Cormorant-Bold',
                        marginBottom: 6,
                        textAlign: 'center',
                      }}
                    >
                      {resort.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#fff',
                        fontFamily: 'Montserrat-Regular',
                        lineHeight: 18,
                        marginBottom: 12,
                        textAlign: 'center',
                      }}
                    >
                      {resort.location}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>

            {/* Button Below Card */}
            <View style={{ alignItems: 'center', marginTop: -25 }}>
              <GradientButton
                title="Explore"
                style={{
                  width: 140,
                  borderRadius: 15,
                }}
                onPress={() => {
                  navigation.navigate('ResortDetails', { resort });
                }}

              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

//  const resorts = [
//     {
//       id: 1,
//       title: 'Ajabgarh',
//       description:
//         'The quay is situated upstream from the mouth of the Singapore River and Boat Quay.',
//       image: { uri: 'https://picsum.photos/400/300' },
//       amenities: ['Free Wi-Fi', 'Swimming Pool', 'Spa', 'Restaurant', 'Gym'],
//       specificAmenities: [
//         '42" television',
//         'Bath tub',
//         '24H stable wifi',
//         'Free Breakfast',
//       ],
//       location: 'Ajabgarh, Rajasthan',
//       aboutSections: ['Gallery', 'Reviews', 'Resort Services & Offers'],
//       gallery: [
//         { uri: 'https://picsum.photos/400/301', title: 'Resort Pool' },
//         { uri: 'https://picsum.photos/400/302', title: 'Luxury Room' },
//         { uri: 'https://picsum.photos/400/303', title: 'Restaurant Area' },
//       ],
//       reviews: [
//         {
//           user: 'Samantha Payne',
//           username: 'Sam.Payne90',
//           rating: 4.5,
//           verifiedPurchase: true,
//           comment:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla...',
//           date: '23 Nov 2021',
//         },
//         {
//           user: 'Samantha Payne',
//           username: 'Sam.Payne90',
//           rating: 4.5,
//           verifiedPurchase: true,
//           comment:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla...',
//           date: '23 Nov 2021',
//         },
//       ],
//       clientTestimonials: [
//         {
//           videoUrl: 'video-placeholder-or-url.mp4',
//           comment:
//             'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut Lorem ipsum dolor sit amet, consectetur adipiscing elit ut',
//           date: '23 Nov 2021',
//         },
//       ],

//       servicesAndOffers: [
//         {
//           service: 'Spa & Wellness',
//           description:
//             'Full-service spa offering massages, facials, and wellness therapies.',
//         },
//         {
//           service: 'Restaurant & Bar',
//           description:
//             'Multiple dining options including fine dining and casual café.',
//         },
//         {
//           service: 'Special Offers',
//           description:
//             'Book 3 nights and get 1 night free during the off-season.',
//         },
//       ],
//     },
//     {
//       id: 2,
//       title: 'Pushkar',
//       description:
//         'Located near the sacred lake, Pushkar resort combines comfort with spirituality.',
//       image: { uri: 'https://picsum.photos/400/301' },
//       amenities: [
//         'Free Wi-Fi',
//         'Swimming Pool',
//         'Yoga Sessions',
//         'Cafe',
//         'Gym',
//       ],
//       specificAmenities: [
//         '40" television',
//         'Shower',
//         '24H stable wifi',
//         'Complimentary Breakfast',
//       ],
//       location: 'Pushkar, Rajasthan',
//       aboutSections: ['Gallery', 'Reviews', 'Resort Services & Offers'],
//       gallery: [
//         { uri: 'https://picsum.photos/400/304', title: 'Lake View Room' },
//         { uri: 'https://picsum.photos/400/305', title: 'Yoga Deck' },
//         { uri: 'https://picsum.photos/400/306', title: 'Dining Hall' },
//       ],
//       reviews: [
//         {
//           user: 'Diana',
//           email: 'sam.pyne.90@gmail.com',
//           rating: 4.5,
//           isVerified: 'true',
//           date: '02/02/24',
//           comment: 'Peaceful and spiritual environment.',
//         },
//         {
//           user: 'Diana',
//           email: 'sam.pyne.90@gmail.com',
//           rating: 4.5,
//           isVerified: 'true',
//           date: '02/02/24',
//           comment: 'Peaceful and spiritual environment.',
//         },
//       ],
//       servicesAndOffers: [
//         {
//           service: 'Yoga & Meditation',
//           description:
//             'Daily yoga and meditation classes by experienced instructors.',
//         },
//         {
//           service: 'Dining & Cafe',
//           description:
//             'Organic food options and a cozy cafe overlooking the lake.',
//         },
//         {
//           service: 'Special Offers',
//           description: 'Early bird discounts and group packages available.',
//         },
//       ],
//     },
//     {
//       id: 3,
//       title: 'Udaipur',
//       description:
//         'Experience the city of lakes with luxury stays and royal hospitality.',
//       image: { uri: 'https://picsum.photos/400/302' },
//       amenities: [
//         'Free Wi-Fi',
//         'Swimming Pool',
//         'Spa',
//         'Rooftop Restaurant',
//         'Gym',
//       ],
//       specificAmenities: [
//         '50" television',
//         'Bathtub with view',
//         '24H stable wifi',
//         'Complimentary Breakfast',
//       ],
//       location: 'Udaipur, Rajasthan',
//       aboutSections: ['Gallery', 'Reviews', 'Resort Services & Offers'],
//       gallery: [
//         { uri: 'https://picsum.photos/400/307', title: 'Rooftop View' },
//         { uri: 'https://picsum.photos/400/308', title: 'Luxury Suite' },
//         { uri: 'https://picsum.photos/400/309', title: 'Swimming Pool' },
//       ],
//       reviews: [
//         {
//           user: 'George',
//           rating: 5,
//           comment: 'Royal experience, highly recommended.',
//         },
//         {
//           user: 'Hannah',
//           rating: 4,
//           comment: 'Beautiful views and friendly staff.',
//         },
//         { user: 'Ian', rating: 4.5, comment: 'Rooms are luxurious and clean.' },
//       ],
//       servicesAndOffers: [
//         {
//           service: 'Spa & Wellness',
//           description:
//             'Relaxing spa services including aromatherapy and massages.',
//         },
//         {
//           service: 'Rooftop Dining',
//           description: 'Enjoy meals with panoramic city and lake views.',
//         },
//         {
//           service: 'Special Offers',
//           description: 'Book early for complimentary lake tour and discounts.',
//         },
//       ],
//     },
//   ];
