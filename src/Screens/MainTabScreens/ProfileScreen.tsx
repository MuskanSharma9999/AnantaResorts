import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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

  AccountSettingsSection:{
    marginVertical: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#FBCF9C",
    borderRadius: 10
  
  },
  section: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  MembershipSection:{
    marginVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 200
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#E0C097',
    fontFamily: "Cormorant",
    marginBottom: 12,
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
    paddingLeft: 20,
    fontFamily: "Montserrat"
  },
  AccountSettingTitle:{
    fontSize: 24,
    fontWeight: '600',
    color: '#E0C097',
    fontFamily: "Cormorant",
    marginBottom: 12,
    paddingLeft: 20
  },
  chevron: {
    color: '#98A2B3',
    fontSize: 16,
    paddingRight: 10
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 80, // Adjust width to fit screen
  },


walletCard: {
    width: Dimensions.get('window').width - 230, // Adjust width to fit screen
  height: 120,       // fixed height (adjust as needed)
  marginHorizontal: 5,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
},



  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "center",
  },
  walletNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
    fontFamily: 'Cormorant',
  },
  walletLabel: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  walletSubLabel: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  logoutText: {
    color: 'white ',
    paddingTop: 10,
     fontSize: 16,
    color: '#fff',
    paddingLeft: 20,
    fontFamily: "Montserrat"
  }
});

export default ProfileScreen;
