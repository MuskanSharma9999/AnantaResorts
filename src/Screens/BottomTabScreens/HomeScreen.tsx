import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/HomeScreenStyles';
import ApiList from '../../Api_List/apiList';
import { apiRequest } from '../../Api_List/apiUtils';
import { fetchUserProfile } from '../../redux/slices/userSlice';
import { TopRated } from '../../components/HomeScreenComponents/TopRated/TopRated';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {
    name,
    email,
    activeMembership,
    activeMembershipName, // ✅ Get membership name
    isLoading: userLoading,
  } = useSelector(state => state.user);

  const [Banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [bannersLoading, setBannersLoading] = useState(true);

  const { width, height } = Dimensions.get('window');

  // ✅ Fetch user profile when screen focuses (always get fresh data)
  useEffect(() => {
    if (!isFocused) return;

    console.log('[HomeScreen] Screen focused, fetching fresh user profile...');
    // Always get fresh data (forceRefresh = true)
    dispatch(fetchUserProfile(true)).then(result => {
      if (result.payload) {
        console.log('[HomeScreen] Profile fetched:', {
          name: result.payload.name,
          email: result.payload.email,
          activeMembership: result.payload.activeMembership,
        });
      }
    });
  }, [isFocused, dispatch]);

  // ✅ Log when user data updates in Redux
  useEffect(() => {
    console.log('[HomeScreen] User data updated from Redux:', {
      name,
      email,
      activeMembership,
      userLoading,
    });
  }, [name, email, activeMembership, userLoading]);

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

        if (response.success) {
          const banners = response.data.data.map(item => item.image_url);
          setBanners(banners);
          console.log('[HomeScreen] Banners loaded:', banners.length);
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
      {/* Banners Section */}
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

      {/* Top Rated sections */}
      <TopRated />
      <TopRated />
      <TopRated />

      {/* User Info Section - Show loading state while fetching */}
      {/* {userLoading && !activeMembership ? (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#FBCF9C" />
          <Text style={{ color: '#FBCF9C', marginTop: 8 }}>
            Loading membership...
          </Text>
        </View>
      ) : name || email || activeMembership ? (
        <View
          style={{
            padding: 20,
            backgroundColor: 'rgba(251, 207, 156, 0.1)',
            borderRadius: 10,
            margin: 15,
          }}
        >
          {name && (
            <Text
              style={{ color: '#FBCF9C', fontSize: 18, fontWeight: 'bold' }}
            >
              Welcome, {name}!
            </Text>
          )}
          {email && (
            <Text style={{ color: '#FBCF9C', fontSize: 14, marginTop: 5 }}>
              {email}
            </Text>
          )}
          {activeMembership ? (
            <View
              style={{
                marginTop: 10,
                paddingTop: 10,
                borderTopWidth: 1,
                borderTopColor: '#FBCF9C',
              }}
            >
              <Text style={{ color: '#FBCF9C', fontSize: 16 }}>
                Active Membership: {activeMembership}
              </Text>
              <Text style={{ color: '#FBCF9C', fontSize: 12, marginTop: 5 }}>
                Plan ID: {activeMembership}
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginTop: 10,
                paddingTop: 10,
                borderTopWidth: 1,
                borderTopColor: '#666',
              }}
            >
              <Text style={{ color: '#888', fontSize: 14 }}>
                No active membership
              </Text>
              <Text style={{ color: '#666', fontSize: 10, marginTop: 5 }}>
                User loading: {userLoading ? 'Yes' : 'No'}
              </Text>
            </View>
          )}
        </View>
      ) : null} */}
    </ScrollView>
  );
};

export default HomeScreen;
