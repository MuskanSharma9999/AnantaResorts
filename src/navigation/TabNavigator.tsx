import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Logo from '../assets/images/AnantaLogo.svg';
import MenuIcon from '../assets/images/MenuIcon.svg';
import ProfileIcon from '../assets/images/ProfileIcon.svg';
import HomeIcon from '../assets/images/home.svg';
import CardIcon from '../assets/images/Credit Card.svg';
import FlightIcon from '../assets/images/Essentials.svg';
import HeartIcon from '../assets/images/Action.svg';
import { BlurView } from '@react-native-community/blur';

// Extend the TabParamList if needed
declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabParamList {}
  }
}

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconSize = size + 4; // Slightly bigger for emphasis
          switch (route.name) {
            case 'Home':
              return (
                <HomeIcon width={iconSize} height={iconSize} fill={color} />
              );
            case 'Booking':
              return (
                <CardIcon width={iconSize} height={iconSize} fill={color} />
              );
            case 'Services':
              return (
                <FlightIcon width={iconSize} height={iconSize} fill={color} />
              );
            case 'Profile':
              return (
                <HeartIcon width={iconSize} height={iconSize} fill={color} />
              );
            default:
              return null;
          }
        },
        tabBarActiveTintColor: '#D4AF37', // Gold

        tabBarBackground: () => (
          <BlurView
            style={{ flex: 1 }}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
        ),
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white
          borderTopWidth: 0,
          height: 100,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 10, // Android shadow
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 6,
          paddingHorizontal: 10,
          position: 'absolute', // Required for blur
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden', // Clips blur edges
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          paddingBottom: 2,
        },
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#D4AF37',
        headerTitleStyle: {
          fontWeight: 'bold',
          paddingTop: 10,
          fontSize: 18,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: true,
          headerTitle: () => <Logo width={100} height={100} />,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: '#D4AF37',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginLeft: 15 }}
            >
              <MenuIcon width={30} height={30} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ marginLeft: 15 }}
            >
              <ProfileIcon
                width={30}
                height={30}
                style={{
                  backgroundColor: 'gold',
                  borderRadius: 20,
                  margin: 10,
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: 'Book Stay',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          title: 'Services',
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: true,
        }}
      />
    </Tab.Navigator>
  );
};
