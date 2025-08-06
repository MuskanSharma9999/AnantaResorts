import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import GradientButton from '../../Buttons/GradientButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const countryCodes = [
  { code: '61', name: 'Australia' },
  { code: '880', name: 'Bangladesh' },
  { code: '55', name: 'Brazil' },
  { code: '86', name: 'China' },
  { code: '20', name: 'Egypt' },
  { code: '372', name: 'Estonia' },
  { code: '33', name: 'France' },
  { code: '49', name: 'Germany' },
  { code: '350', name: 'Gibraltar' },
  { code: '91', name: 'India' },
  { code: '62', name: 'Indonesia' },
  { code: '972', name: 'Israel' },
  { code: '39', name: 'Italy' },
  { code: '81', name: 'Japan' },
  { code: '60', name: 'Malaysia' },
  { code: '976', name: 'Mongolia' },
  { code: '212', name: 'Morocco' },
  { code: '234', name: 'Nigeria' },
  { code: '64', name: 'New Zealand' },
  { code: '92', name: 'Pakistan' },
  { code: '63', name: 'Philippines' },
  { code: '351', name: 'Portugal' },
  { code: '7', name: 'Russia' },
  { code: '966', name: 'Saudi Arabia' },
  { code: '65', name: 'Singapore' },
  { code: '94', name: 'Sri Lanka' },
  { code: '27', name: 'South Africa' },
  { code: '82', name: 'South Korea' },
  { code: '34', name: 'Spain' },
  { code: '255', name: 'Tanzania' },
  { code: '90', name: 'Turkey' },
  { code: '380', name: 'Ukraine' },
  { code: '971', name: 'United Arab Emirates' },
  { code: '44', name: 'United Kingdom' },
  { code: '1', name: 'United States' },
  { code: '598', name: 'Uruguay' },
  { code: '998', name: 'Uzbekistan' },
  { code: '353', name: 'Ireland' },
];

const PhoneInputWithCountryCode = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[9]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobileNumber) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (mobileNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(async () => {
        // Store user token (in real app, this would come from your API)
        await AsyncStorage.setItem('userToken', 'dummy_token');
        await AsyncStorage.setItem('userMobile', mobileNumber);
        setIsLoading(false);
        navigation.navigate('Otp');
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Phone Input Row */}
      <View style={styles.inputContainer}>
        {/* Country Code Picker Button */}
        <TouchableOpacity
          style={styles.countryCodeButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.countryCodeText}>+{selectedCountry.code} ▼</Text>
        </TouchableOpacity>

        {/* Phone Number Input */}
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={text => {
            const digitsOnly = text.replace(/[^0-9]/g, '');
            setMobileNumber(digitsOnly);
          }}
          maxLength={10}
        />
      </View>
      <GradientButton
        style={{ width: '100%' }}
        onPress={handleLogin}
        disabled={isLoading}
        title={isLoading ? 'Submitting...' : 'Submit'}
      />

      {/* Country Code Selection Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={countryCodes}
              keyExtractor={item => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(item);
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.countryItemRow}>
                    <Text style={styles.countryCodeText}>+{item.code}</Text>
                    <Text style={styles.countryNameText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E3E5E5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  countryCodeButton: {
    paddingVertical: 12,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#cfdbe2ff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '60%',
    backgroundColor: '#474444ff',
    borderRadius: 10,
    maxHeight: '50%',
  },
  countryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1E1E1E',
  },
  countryItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  countryCodeText: {
    fontSize: 14,
    color: '#cfdbe2ff',
    width: 60, // give a fixed width for alignment, tweak as needed
  },
  countryNameText: {
    fontSize: 14,
    color: '#cfdbe2ff',
    flex: 1, // allow name to take the remaining space
  },

  closeButton: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1E1E1E',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PhoneInputWithCountryCode;
