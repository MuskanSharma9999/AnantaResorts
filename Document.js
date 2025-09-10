// Navigator Diagram 
AppNavigator
 └─ NavigationContainer
    ├─ AuthNavigator (if not authenticated)
    └─ MainNavigator (if authenticated)
       └─ RootStack.Navigator
          ├─ DrawerRoot (DrawerNavigator)
          │   └─ Drawer.Navigator
          │      ├─ MainTabs (BottomTabNavigator)
          │      │   ├─ HomeScreen
          │      │   │   └─ TopRated component inside HomeScreen
          │      │   ├─ BookingScreen
          │      │   ├─ ServicesScreen
          │      │   └─ ProfileScreen
          │      └─ SettingScreen
          ├─ TopRated (optional standalone route)
          └─ ResortDetails  ✅ target screen


          // GradientButton is the button used for all the Button Styling 