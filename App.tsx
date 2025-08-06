import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your screen components
import OnboardingScreen from './src/components/auth/onboarding/OnboardingScreen';
import LoginScreen from './src/components/auth/Login/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import BookingScreen from './src/screens/BookingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ServicesScreen from './src/screens/ServicesScreen';
import SplashScreen from './src/components/auth/splash/SplashScreen';
import OtpScreen from './src/components/auth/otp/OtpScreen';
import Logo from './src/assets/images/AnantaLogo.svg';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import MenuIcon from './src/assets/images/MenuIcon.svg';

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Otp: undefined;
  MainTabs: undefined;
};

export type TabParamList = {
  Home: undefined;
  Booking: undefined;
  Services: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000',
        },
        drawerActiveTintColor: '#D4AF37',
        drawerInactiveTintColor: '#fff',
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ title: 'Home' }}
      />
      {/* You can add more drawer screens here if needed */}
    </Drawer.Navigator>
  );
};

// Bottom Tab Navigator Component
const MainTabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Booking':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Services':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }
        },
        tabBarActiveTintColor: '#D4AF37', // Gold color
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#000000', // Black background
          borderTopWidth: 1,
          borderTopColor: '#333333',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#000000', // Black header
        },
        headerTintColor: '#D4AF37', // Gold text
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Ananta Resorts',
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
              <MenuIcon width={30} height={30}></MenuIcon>
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

// Main App Component
const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{
              gestureEnabled: false, // Prevent swipe back
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              gestureEnabled: false,
              headerShown: true,
              headerTitle: () => <Logo width={100} height={100}></Logo>,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#D4AF37',
              headerLeft: () => null,
            }}
          />
          <Stack.Screen
            name="Otp"
            component={OtpScreen}
            options={{
              gestureEnabled: true,
              headerShown: true,
              headerTitle: () => <Logo width={100} height={100}></Logo>,
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: '#D4AF37',
              headerBackButtonDisplayMode: 'minimal',
            }}
          />

          <Stack.Screen
            name="MainTabs"
            component={MainDrawerNavigator}
            options={{
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
