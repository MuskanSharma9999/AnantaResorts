// Fixed CustomDrawerContent function with proper logout

import React, { useEffect, useState } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { DrawerParamList } from './types';
import { BottomTabNavigator } from './BottomTabNavigator';
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slices/authSlice';
import HomeIcon from '../assets/images/home.svg';
import LogoutIcon from '../assets/images/Logout.svg';
import { apiRequest } from '../Api_List/apiUtils';
import ApiList from '../Api_List/apiList';

const Drawer = createDrawerNavigator<DrawerParamList>();
const { width } = Dimensions.get('window');

function CustomDrawerContent(props) {
  const { state, navigation, descriptors } = props;
  const dispatch = useDispatch(); // ✅ Add this line - it was missing!

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profile_photo_url: '',
  });

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token missing');
        return;
      }
      const response = await apiRequest({
        url: ApiList.GET_PROFILE,
        method: 'GET',
        token,
      });
      if (response.success) {
        const user = response.data.data.user;
        setProfile({
          name: user.name || '',
          email: user.email || '',
          profile_photo_url: user.profile_photo_url || '',
        });
      } else {
        Alert.alert('Error', response.error || 'Failed to fetch profile');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to load profile data');
    }
  };

  useEffect(() => {
    fetchProfile();

    const unsubscribeDrawerOpen = navigation.addListener('drawerOpen', () => {
      fetchProfile();
    });

    const unsubscribeProfileUpdated = navigation.addListener(
      'profileUpdated',
      () => {
        fetchProfile();
      },
    );

    return () => {
      unsubscribeDrawerOpen();
      unsubscribeProfileUpdated();
    };
  }, [navigation]);

  // ✅ Fixed handleLogout function - matches ProfileScreen logic
  const handleLogout = async () => {
    try {
      // Clear AsyncStorage - use the same method as ProfileScreen
      await AsyncStorage.removeItem('token');
      await AsyncStorage.setItem('isAuth', 'false');

      // ✅ Update Redux state to trigger re-render (this was missing!)
      dispatch(setAuth(false));

      // The AppNavigator will automatically switch to AuthNavigator
      // because isAuthenticated will be false
    } catch (err) {
      console.error('Logout Error:', err);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const showLogoutConfirmation = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: handleLogout,
      },
    ]);
  };

  // Rest of your component remains the same...
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 50 }}
      style={{ backgroundColor: '#000' }}
    >
      {/* User Profile Section */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingBottom: 30,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            overflow: 'hidden',
            marginRight: 15,
          }}
        >
          {profile.profile_photo_url ? (
            <Image
              source={{ uri: profile.profile_photo_url }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          ) : null}
        </View>
        <View>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            {profile.name}
          </Text>
          <Text style={{ color: '#fff', fontSize: 14, opacity: 0.7 }}>
            {profile.email}
          </Text>
        </View>
      </View>

      {/* Navigation Items */}
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { title, drawerIcon } = descriptors[route.key].options;

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ marginVertical: 4 }}
          >
            {focused ? (
              <LinearGradient
                colors={['#C3A485', '#8F7138']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  marginRight: 10,
                  paddingLeft: 0,
                }}
              >
                <View style={{ paddingLeft: 10 }}>
                  {drawerIcon?.({ color: '#fff', size: 24 })}
                </View>
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 16,
                    fontSize: 18,
                    fontWeight: '600',
                    paddingVertical: 15,
                  }}
                >
                  {title}
                </Text>
              </LinearGradient>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingRight: 20,
                  paddingLeft: 0,
                }}
              >
                <View style={{ paddingLeft: 10 }}>
                  {drawerIcon?.({ color: '#fff', size: 24 })}
                </View>
                <Text
                  style={{
                    color: '#fff',
                    marginLeft: 16,
                    fontSize: 16,
                    fontWeight: '400',
                  }}
                >
                  {title}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {/* Logout Button */}
      <TouchableOpacity
        onPress={showLogoutConfirmation}
        style={{ marginVertical: 4, marginTop: 20 }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingRight: 20,
            paddingLeft: 10,
          }}
        >
          <LogoutIcon width={24} height={24} fill="#fff" />
          <Text
            style={{
              color: '#fff',
              marginLeft: 16,
              fontSize: 16,
              fontWeight: '400',
            }}
          >
            Log Out
          </Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export const DrawerNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000',
          width: width * 0.7,
        },
        drawerActiveTintColor: '#D4AF37',
        drawerInactiveTintColor: '#fff',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => (
            <HomeIcon width={size} height={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

{
  /* <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={({ navigation }) => ({
          title: 'Settings',
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',

          headerTitleContainerStyle: {
            height: '100%',
          },
          drawerIcon: ({ color, size }) => (
            <SettingIcon width={size} height={size} fill="#fff" />
          ),
          headerStyle: {
            backgroundColor: 'black',
            height: Platform.OS === 'ios' ? 56 + insets.top : 56 + insets.top,
          },
          headerTintColor: '#D4AF37',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginLeft: 15 }}
            >
              <MenuIcon width={30} height={30} />
            </TouchableOpacity>
          ),
        })}
      /> */
}
{
  /* <Drawer.Screen
        name="Travedise"
        component={TravediseScreen}
        options={({ navigation }) => ({
          title: 'Travedise',
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',

          headerTitleContainerStyle: {
            height: '100%',
          },
          drawerIcon: ({ color, size }) => (
            <CardIcon width={size} height={size} fill="#fff" />
          ),
          headerStyle: {
            backgroundColor: 'black',
            height: Platform.OS === 'ios' ? 56 + insets.top : 56 + insets.top,
          },
          headerTintColor: '#D4AF37',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginLeft: 15 }}
            >
              <MenuIcon width={30} height={30} />
            </TouchableOpacity>
          ),
        })}
      /> */
}
