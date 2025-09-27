// DrawerNavigator.js - FIXED CustomDrawerContent
import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/slices/authSlice';
import { setUserDetails, clearUser } from '../redux/slices/userSlice';
import HomeIcon from '../assets/images/home.svg';
import LogoutIcon from '../assets/images/Logout.svg';
import { apiRequest } from '../Api_List/apiUtils';
import ApiList from '../Api_List/apiList';

const Drawer = createDrawerNavigator<DrawerParamList>();
const { width } = Dimensions.get('window');

function CustomDrawerContent(props) {
  const { state, navigation, descriptors } = props;
  const dispatch = useDispatch();

  // ✅ FIXED: Correct Redux selector
  const { name, email, profilePhoto } = useSelector(state => state.user);

  console.log('Drawer - Redux User State:', { name, email, profilePhoto });

  // ✅ Fetch user profile on drawer mount if not already loaded
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
          // ✅ FIXED: Handle nested response structure
          const user = response.data?.data?.user || response.data?.user;
          console.log('User data from API:', user);

          const userData = {
            name: user?.name || '',
            email: user?.email || '',
            profilePhoto: user?.profile_photo_url || '',
          };

          // console.log('Dispatching user data:', userData);
          // Update Redux with fetched user data
          dispatch(setUserDetails(userData));
        } else {
          console.error('Failed to fetch profile:', response.error);
        }
      } catch (error) {
        console.error('Error fetching user profile in drawer:', error);
      }
    };

    // Always fetch to ensure latest data
    fetchUserProfile();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.setItem('isAuth', 'false');
      dispatch(setAuth(false));
      dispatch(clearUser()); // ✅ Clear user data from Redux
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout Error:', err);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const showLogoutConfirmation = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: handleLogout },
    ]);
  };

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
            backgroundColor: '#333', // Fallback background
          }}
        >
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={styles.avatar}
              onError={() => console.log('Failed to load profile photo')}
            />
          ) : (
            <Image
              source={require('../assets/images/Profile_Image.png')}
              style={styles.avatar}
            />
          )}
        </View>
        <View>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            {name || 'Guest User'}
          </Text>
          <Text style={{ color: '#fff', fontSize: 14, opacity: 0.7 }}>
            {email || 'guest@example.com'}
          </Text>
        </View>
      </View>

      {/* Debug Info - Remove in production */}
      {/* <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
        <Text style={{ color: '#666', fontSize: 12 }}>
          Debug: {name ? `Name: ${name}` : 'No name'},{' '}
          {email ? `Email: ${email}` : 'No email'}
        </Text>
      </View> */}

      {/* Drawer Items */}
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

const styles = {
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
};

export default CustomDrawerContent;

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
