import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import GradientButton from '../components/Buttons/GradientButton';
import { Dropdown } from 'react-native-element-dropdown';
import { apiRequest } from '../Api_List/apiUtils';
import ApiList from '../Api_List/apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactUs = () => {
  const [category, setCategory] = useState('general');
  const [priority, setPriority] = useState('low');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const categories = [
    { label: 'General', value: 'general' },
    { label: 'Membership', value: 'membership' },
    { label: 'Booking', value: 'booking' },
    { label: 'Technical', value: 'technical' },
    { label: 'Complaint', value: 'complaint' },
  ];

  const priorities = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  const handleSubmit = async () => {
    if (!subject || !message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const token = (await AsyncStorage.getItem('token')) ?? undefined;

      // Ensure we have clean, valid data
      const payload = {
        subject: subject.trim(),
        message: message.trim(),
        category: category || 'general',
        status: 'submitted',
      };

      console.log('Payload:', JSON.stringify(payload, null, 2));
      console.log('Token:', token ? 'Present' : 'Missing');

      const response = await apiRequest({
        url: ApiList.SEND_CONTACT_US_FORM,
        method: 'POST',
        body: payload,
        token,
      });

      console.log('Full Response:', response);

      if (response?.success) {
        Alert.alert(
          'Success',
          response.message || 'Message sent successfully!',
        );
        // Reset form
        setSubject('');
        setMessage('');
        setCategory('general');
        setPriority('low');
      } else {
        // More detailed error message
        const errorMsg =
          response?.error || response?.message || 'Failed to send message.';
        Alert.alert('Error', `Validation failed: ${errorMsg}`);
      }
    } catch (error) {
      console.error('ContactUs Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Contact Details</Text>
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>Email:</Text>
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL('mailto:info@anantahotels.com')}
          >
            info@anantahotels.com
          </Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>Phone:</Text>
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL('tel:+911413540500')}
          >
            +91 141 354 0500
          </Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>Website:</Text>
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL('https://www.anantahotels.com/')}
          >
            www.anantahotels.com
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Get In Touch</Text>

        <Dropdown
          style={styles.dropdown}
          placeholder="Select Category"
          data={categories}
          labelField="label"
          valueField="value"
          value={category}
          onChange={item => setCategory(item.value)}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          inputSearchStyle={styles.dropdownInputSearch}
          iconStyle={styles.dropdownIcon}
          itemTextStyle={styles.dropdownItemText}
          itemContainerStyle={styles.dropdownItemContainer}
          containerStyle={styles.dropdownContainer}
          activeColor="rgba(251, 207, 156, 0.15)"
        />

        <Dropdown
          style={styles.dropdown}
          placeholder="Select Priority"
          data={priorities}
          labelField="label"
          valueField="value"
          value={priority}
          onChange={item => setPriority(item.value)}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          inputSearchStyle={styles.dropdownInputSearch}
          iconStyle={styles.dropdownIcon}
          itemTextStyle={styles.dropdownItemText}
          itemContainerStyle={styles.dropdownItemContainer}
          containerStyle={styles.dropdownContainer}
          activeColor="rgba(251, 207, 156, 0.15)"
        />
        <TextInput
          style={styles.input}
          placeholder="Subject"
          placeholderTextColor="#6B7280"
          value={subject}
          onChangeText={setSubject}
          maxLength={100} // Add reasonable limits
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter your message here..."
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          maxLength={500} // Reasonable limit
        />

        <GradientButton title="Send Message" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

// Your existing styles remain the same...
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
    flexGrow: 1,
  },
  card: {
    backgroundColor: 'rgba(251, 207, 156, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.2)',
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#FBCF9C',
    fontFamily: 'Cormorant-Bold',
  },
  infoSection: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  infoText: {
    fontWeight: '600',
    marginRight: 8,
    color: '#FBCF9C',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  linkText: {
    color: '#E0C48F',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat',
    fontSize: 14,
  },
  input: {
    borderColor: 'rgba(251, 207, 156, 0.3)',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(251, 207, 156, 0.05)',
    fontSize: 16,
    color: '#D1D5DB',
    fontFamily: 'Montserrat',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  dropdown: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.4)', // Slightly brighter border
    borderRadius: 10,
    padding: 12,
    backgroundColor: 'rgba(251, 207, 156, 0.08)', // Lighter background
  },
  dropdownPlaceholder: {
    color: '#9CA3AF', // Lighter placeholder color
    fontFamily: 'Montserrat',
    fontSize: 16,
  },
  dropdownSelectedText: {
    color: '#FBCF9C', // Gold text for selected item
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownInputSearch: {
    color: '#FBCF9C',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderColor: 'rgba(251, 207, 156, 0.4)',
    borderRadius: 8,
    fontFamily: 'Montserrat',
    paddingHorizontal: 12,
  },
  dropdownIcon: {
    tintColor: '#FBCF9C', // Gold dropdown arrow
    width: 20,
    height: 20,
  },
  dropdownItemText: {
    color: '#FBCF9C', // Light gray text for items
    fontFamily: 'Montserrat',
    fontSize: 16,
    // paddingVertical: 10,
  },
  dropdownItemContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)', // Dark background for items
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(251, 207, 156, 0.2)',
  },
  dropdownContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)', // Dark container background
    borderColor: 'rgba(251, 207, 156, 0.4)',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    shadowColor: '#FBCF9C',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default ContactUs;
