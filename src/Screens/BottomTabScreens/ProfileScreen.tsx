import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './ProfileScreenStyles';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Olivia Rhye</Text>
          <Text style={styles.email}>olivia@untitledui.com</Text>
        </View>
      </View>

      {/* Account Settings Section */}
      <View style={styles.AccountSettingsSection}>
        <Text style={styles.AccountSettingTitle}>Account settings</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Change Password</Text>
          <Text style={styles.chevron}>></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Update profile photo</Text>
          <Text style={styles.chevron}>></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Update Email Address</Text>
          <Text style={styles.chevron}>></Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Wallet Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Point Wallet</Text>
        
        <View style={styles.walletContainer}>
          
          {/* Total Vouchers */}
          <LinearGradient
            colors={['#CDAA7D', '#A67C52']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.walletCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.walletNumber}>1500</Text>
              <Text style={styles.walletLabel}>Total vouchers in</Text>
              <Text style={styles.walletSubLabel}>current membership plan</Text>
            </View>
          </LinearGradient>

          {/* Redeemed Vouchers */}
          <LinearGradient
            colors={['#CDAA7D', '#A67C52']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.walletCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.walletNumber}>800</Text>
              <Text style={styles.walletLabel}>Total vouchers</Text>
              <Text style={styles.walletSubLabel}>redeemed</Text>
            </View>
          </LinearGradient>

        </View>
      </View>


            {/* Membership Points< */}
      <View style={styles.MembershipSection}>
        <Text style={styles.sectionTitle}>Membership Points</Text>
        
        <View style={styles.walletContainer}>
          
          {/* Total Vouchers */}
          <LinearGradient
            colors={['#CDAA7D', '#A67C52']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.walletCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.walletNumber}>1500</Text>
              <Text style={styles.walletLabel}>Total vouchers in</Text>
              <Text style={styles.walletSubLabel}>current membership plan</Text>
            </View>
          </LinearGradient>

          {/* Redeemed Vouchers */}
          <LinearGradient
            colors={['#CDAA7D', '#A67C52']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.walletCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.walletNumber}>800</Text>
              <Text style={styles.walletLabel}>Total vouchers</Text>
              <Text style={styles.walletSubLabel}>redeemed</Text>
            </View>
          </LinearGradient>

        </View>
      </View>


    </ScrollView>
  );
};

export default ProfileScreen;
