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
  const [Banners, setBanners] = useState<string[]>([]);
  const [BannersCount, setBannersCount] = useState<number>();
  const [activeIndex, setActiveIndex] = useState(0);

  const { width, height } = Dimensions.get('window');

  // ✅ FIXED: Fetch user profile when screen is focused
  useEffect(() => {
    if (!isFocused) return;

    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        console.log('Fetching user profile in HomeScreen...');
        const response = await apiRequest({
          url: ApiList.GET_PROFILE,
          method: 'GET',
          token,
        });

        console.log('HomeScreen API Response:', response);

        if (response.success) {
          const user = response.data?.data?.user || response.data?.user;
          console.log('User data from API:', user);

          // Check if user has active membership
          let activeMembershipValue = '';

          if (user?.active_membership?.plan_id) {
            activeMembershipValue = user.active_membership.plan_id;
          } else if (user?.activeMembership?.plan_id) {
            activeMembershipValue = user.activeMembership.plan_id;
          } else if (user?.memberships && Array.isArray(user.memberships)) {
            const activeMembership = user.memberships.find(
              member => member.is_active === true,
            );
            if (activeMembership?.plan_id) {
              activeMembershipValue = activeMembership.plan_id;
            }
          }

          console.log('Active Membership Plan ID:', activeMembershipValue);

          const userData = {
            name: user?.name || '',
            email: user?.email || '',
            profilePhoto: user?.profile_photo_url || '',
            activeMembership: activeMembershipValue,
            kycStatus: user?.kyc_status || '',
          };

          console.log('User Data to be stored:', userData);
          dispatch(setUserDetails(userData));
        } else {
          console.error('Failed to fetch profile:', response.error);
        }
      } catch (error) {
        console.error('Error fetching user profile in HomeScreen:', error);
      }
    };

    fetchUserProfile();
  }, [isFocused, dispatch]);

  // ✅ Fetch banners on mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          return;
        }

        console.log('Fetching banners...');
        const response = await apiRequest({
          url: ApiList.HOME_BANNER,
          method: 'GET',
          token,
        });

        console.log('Banners API Response:', response);

        if (response.success) {
          const banners = response.data.data.map(item => item.image_url);
          setBanners(banners);
          setBannersCount(banners.length);
        } else {
          console.error('Failed to fetch banners:', response.error);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);

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

      <TopRated />
      <TopRated />
      <TopRated />
    </ScrollView>
  );
};

export default HomeScreen;
