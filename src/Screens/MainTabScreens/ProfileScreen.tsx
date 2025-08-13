import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/ProfileScreenStyles';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userEmail, setUserEmail] = useState('');
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      const token = await AsyncStorage.getItem('userToken');

      if (email) {
        setUserEmail(email);
      } else {
        setIsGuest(true);
      }
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.multiRemove(['userToken', 'userEmail']);
            navigation.navigate('Login' as never);
          } catch (error) {
            console.error('Error logging out:', error);
          }
        },
      },
    ]);
  };

  const menuItems = [
    { id: 1, title: 'My Bookings', icon: 'calendar', onPress: () => {} },
    { id: 2, title: 'Favorites', icon: 'heart', onPress: () => {} },
    { id: 3, title: 'Payment Methods', icon: 'card', onPress: () => {} },
    { id: 4, title: 'Notifications', icon: 'notifications', onPress: () => {} },
    { id: 5, title: 'Help & Support', icon: 'help-circle', onPress: () => {} },
    { id: 6, title: 'About', icon: 'information-circle', onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Icon name="person" size={50} color="#2E86AB" />
        </View>
        <Text style={styles.userName}>
          {isGuest ? 'Guest User' : userEmail || 'User'}
        </Text>
        <Text style={styles.userStatus}>
          {isGuest ? 'Guest Account' : 'Premium Member'}
        </Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Icon name={item.icon} size={24} color="#2E86AB" />
            <Text style={styles.menuText}>{item.title}</Text>
            <Icon name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out" size={20} color="#ff4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* App Version */}
      <Text style={styles.versionText}>Ananta Resorts v1.0.0</Text>
    </ScrollView>
  );
};

export default ProfileScreen;
