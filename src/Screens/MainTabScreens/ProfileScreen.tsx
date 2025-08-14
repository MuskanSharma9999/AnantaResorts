import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import GradientButton from '../../components/Buttons/GradientButton';

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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account settings</Text>
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
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Wallet Section */}
      <View >
        <Text style={styles.sectionTitle}>Point Wallet</Text>

<View style={{display: "flex"}}>

      <GradientButton title={"1500"} onPress={()=>console.log("sds")} style={{width: 100}} />
      <GradientButton title={"1500"} onPress={()=>console.log("sds")} style={{width: 100}} />

      <GradientButton title={"1500"} onPress={()=>console.log("sds")} style={{width: 100}} />

</View>
     <View style={styles.container}>
      <Text style={styles.sectionTitle}>Point Wallet</Text>
      
      <View style={styles.walletContainer}>
        {/* First row */}
        <View style={styles.walletItem}>
          <Text style={styles.walletNumber}>1500</Text>
          <Text style={styles.walletLabel}>Total vouchers in</Text>
          <Text style={styles.walletSubLabel}>current membership plan</Text>
        </View>
        
        {/* Second row */}
        <View style={styles.walletItem}>
          <Text style={styles.walletNumber}>800</Text>
          <Text style={styles.walletLabel}>Total vouchers</Text>
          <Text style={styles.walletSubLabel}>redeemed</Text>
        </View>
      </View>
    </View>
              <Text style={styles.sectionTitle}>Membership Points</Text>
        <View style={styles.walletRow}>
          <View style={styles.walletItem}>
            <Text style={styles.walletNumber}>3000</Text>
            <Text style={styles.walletLabel}>Total vouchers remaining</Text>
          </View>
          <View style={styles.walletItem}>
            <Text style={styles.walletNumber}>1500</Text>
            <Text style={styles.walletLabel}>Points Used</Text>
          </View>
        </View>
      </View>
   
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#FBCF9C",
    borderRadius: 10,
    padding: 10
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    fontFamily: "Cormorant"
  },
  email: {
    fontSize: 14,
    color: '#fff',
        fontFamily: "Montserrat"

  },
  section: {
    marginBottom: 24,
        borderWidth: 1,
    borderColor: "#FBCF9C",
        borderRadius: 10,
    padding: 10
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FBCF9C',
        fontFamily: "Cormorant",

    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
            fontFamily: "Montserrat"

  },
 
  chevron: {
    color: '#98A2B3',
    fontSize: 16,
    paddingRight: 10
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletItem: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
  },
  walletNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 4,
  },
  walletLabel: {
    fontSize: 14,
    color: '#667085',
  },

    walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletItem: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  walletNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 4,
  },
  walletLabel: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
  },
  walletSubLabel: {
    fontSize: 14,
    color: '#667085',
    textAlign: 'center',
  },
});

export default ProfileScreen;