import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import HomeScreen from '../Screens/MainTabScreens/HomeScreen';
import ProfileScreen from '../Screens/MainTabScreens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Logo from '../assets/images/AnantaLogo.svg';
import MenuIcon from '../assets/images/MenuIcon.svg';
import ProfileIcon from '../assets/images/ProfileIcon.svg';
import HomeIcon from '../assets/images/home.svg';
import CardIcon from '../assets/images/Credit Card.svg';
import AnantaSelectIcon from '../assets/images/Essentials.svg';
import HeartIcon from '../assets/images/Action.svg';
// import { BlurView } from '@react-native-community/blur';
import { BlurView } from 'expo-blur';

import { View } from 'react-native';
import JoinClub from '../Screens/MainTabScreens/JoinClub';
import AnantaSelect from '../Screens/MainTabScreens/AnantaSelect';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabParamList {}
  }
}

const BottomTab = createBottomTabNavigator<TabParamList>();

export const BottomTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconSize = size + 4; // Slightly bigger for emphasis
          switch (route.name) {
            case 'Home':
              return <HomeIcon width={iconSize} height={iconSize} />;
            case 'JoinClub':
              return <CardIcon width={iconSize} height={iconSize} />;
            case 'AnantaSelect':
              return <AnantaSelectIcon width={iconSize} height={iconSize} />;
            case 'Profile':
              return <HeartIcon width={iconSize} height={iconSize} />;
            default:
              return null;
          }
        },
        tabBarActiveTintColor: '#D4AF37', // Gold

        tabBarBackground: () => (
          // <BlurView
          //   style={{ flex: 1 }}
          //   blurAmount={1}
          //   reducedTransparencyFallbackColor="white"
          // />

            <BlurView
    tint="light"
    intensity={50}
    style={{ flex: 1 }}
  />
        ),
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent white
          borderTopWidth: 0,
          height: 80,
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
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerTitleContainerStyle: {
            height: '100%',
          },
          headerStyle: {
            backgroundColor: 'black',
            height: 120,
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
        }}
      />
      <BottomTab.Screen
        name="JoinClub"
        component={JoinClub}
        options={{
          title: 'Join Club',
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerTitleContainerStyle: {
            height: '100%',
          },
          headerStyle: {
            backgroundColor: 'black',
            height: 120,
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
        }}
      />
      <BottomTab.Screen
        name="AnantaSelect"
        component={AnantaSelect}
        options={{
          title: 'Ananta Select',
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerTitleContainerStyle: {
            height: '100%',
          },
          headerStyle: {
            backgroundColor: 'black',
            height: 120,
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
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerShown: true,
          headerTitle: () => <Logo width={100} height={50} />,
          headerTitleAlign: 'center',
          headerTitleContainerStyle: {
            height: '100%',
          },
          headerStyle: {
            backgroundColor: 'black',
            height: 120,
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
        }}
      />
    </BottomTab.Navigator>
  );
};
