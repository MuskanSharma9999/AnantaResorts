import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from '../../styles/HomeScreenStyles';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TopRated } from '../../components/HomeScreenComponents/TopRated/TopRated';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiList from '../../Api_List/apiList';
import { fetchUserProfile } from './././../../redux/slices/userSlice';
import { apiRequest } from '../../Api_List/apiUtils';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // ✅ Get user state from Redux
  const {
    name,
    email,
    activeMembership,
    isLoading: userLoading,
  } = useSelector(state => state.user);

  const [Banners, setBanners] = useState<string[]>([]);
  const [BannersCount, setBannersCount] = useState<number>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [bannersLoading, setBannersLoading] = useState(true);

  const { width, height } = Dimensions.get('window');

  // ✅ ROBUST: Fetch user profile using Redux thunk when screen focuses
  useEffect(() => {
    if (!isFocused) return;

    console.log('[HomeScreen] Screen focused, fetching user profile...');

    // Dispatch the async thunk
    // forceRefresh on first load or when coming back to screen
    dispatch(fetchUserProfile(false));
  }, [isFocused, dispatch]);

  // ✅ Optional: Log when user data changes
  useEffect(() => {
    if (name && email) {
      console.log('[HomeScreen] User data loaded:', {
        name,
        email,
        activeMembership,
      });
    }
  }, [name, email, activeMembership]);

  // ✅ Fetch banners independently
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setBannersLoading(true);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('[HomeScreen] No token found for banners');
          setBannersLoading(false);
          return;
        }

        console.log('[HomeScreen] Fetching banners...');
        const response = await apiRequest({
          url: ApiList.HOME_BANNER,
          method: 'GET',
          token,
        });

        console.log('[HomeScreen] Banners API Response:', response);

        if (response.success) {
          const banners = response.data.data.map(item => item.image_url);
          setBanners(banners);
          setBannersCount(banners.length);
        } else {
          console.error(
            '[HomeScreen] Failed to fetch banners:',
            response.error,
          );
        }
      } catch (error) {
        console.error('[HomeScreen] Error fetching banners:', error);
      } finally {
        setBannersLoading(false);
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
      {/* Show loading indicator for banners */}
      {bannersLoading ? (
        <View
          style={{
            height: height * 0.65,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#FBCF9C" />
        </View>
      ) : Banners.length > 0 ? (
        <>
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
        </>
      ) : (
        <View
          style={{
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#999' }}>No banners available</Text>
        </View>
      )}

      <TopRated />
      <TopRated />
      <TopRated />
    </ScrollView>
  );
};

export default HomeScreen;
