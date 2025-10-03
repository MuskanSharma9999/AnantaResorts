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
import { string } from 'yup';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [Banners, setBanners] = useState<string[]>([]);
  const [BannersCount, setBannersCount] = useState<number>();

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

    const fetchBanners = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        console.log('Fetching user profile in drawer...');
        const response = await apiRequest({
          url: ApiList.HOME_BANNER,
          method: 'GET',
          token,
        });

        console.log('Drawer API Response:', response);

        if (response.success) {
          const banners = response.data.data.map(item => item.image_url);
          setBanners(banners);
          setBannersCount(response.data.data.map.length);
        } else {
          console.error('Failed to fetch Banner:', response.error);
        }
      } catch (error) {
        console.error('Error fetching Banner on home:', error);
      }
    };

    if (isFocused) {
      fetchUserProfile();
    }
    fetchBanners();
  }, [dispatch, isFocused]); // Runs when screen comes into focus

  const { width, height } = Dimensions.get('window');
  const [activeIndex, setActiveIndex] = useState(0);

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
          data={Banners}
          scrollAnimationDuration={1000}
          autoPlayInterval={2000}
          pagingEnabled
          onProgressChange={(_, absoluteProgress) => {
            const newIndex = Math.round(absoluteProgress) % Banners.length;
            setActiveIndex(newIndex);
          }}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={{ uri: item }} style={styles.carouselImage} />
            </View>
          )}
        />
      </View>

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        {Banners.map((_, index) => (
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
