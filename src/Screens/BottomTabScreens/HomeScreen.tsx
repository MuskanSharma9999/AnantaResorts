import React, { useEffect, useState } from 'react';
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
import { TopRated } from '../../components/HomeScreenComponents/TopRated/TopRated';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiList from '../../Api_List/apiList';
import {
  clearUser,
  setUserDetails,
  updateProfilePhoto,
} from './././../../redux/slices/userSlice';
import { apiRequest } from '../../Api_List/apiUtils';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        console.log('Fetching user profile in drawer...');
        const response = await apiRequest({
          url: ApiList.GET_PROFILE,
          method: 'GET',
          token,
        });

        console.log('Drawer API Response:', response);

        if (response.success) {
          const user = response.data?.data?.user || response.data?.user;
          console.log('User data from API:', user);

          const userData = {
            name: user?.name || '',
            email: user?.email || '',
            profilePhoto: user?.profile_photo_url || '',
          };

          // console.log('Dispatching user data:', userData);
          dispatch(setUserDetails(userData));
        } else {
          console.error('Failed to fetch profile:', response.error);
        }
      } catch (error) {
        console.error('Error fetching user profile in drawer:', error);
      }
    };

    if (isFocused) {
      fetchUserProfile();
    }
  }, [dispatch, isFocused]); // Runs when screen comes into focus

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
      <View style={{ maxHeight: 300 }}>
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

      <TopRated></TopRated>
      <TopRated></TopRated>

      <TopRated></TopRated>
    </ScrollView>
  );
};

export default HomeScreen;
