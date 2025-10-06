import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import GradientButton from '../components/Buttons/GradientButton';

const ContactUs = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.heading}>Contact Ananta Hotels Group</Text>
      <Text style={styles.subheading}>
        For inquiries, bookings, or more information, reach out to us below or
        send a message.
      </Text> */}

      {/* Contact Info Card */}
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

      {/* Form Card */}
      <View style={styles.card}>
        <Text style={styles.cardHeading}>Get In Touch</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#6B7280"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="#6B7280"
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Comments"
          placeholderTextColor="#6B7280"
          multiline
          numberOfLines={4}
        />

        <GradientButton
          title="Send Message"
          onPress={() => alert('Form submission not implemented')}
        ></GradientButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000',
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    marginBottom: 10,
    textAlign: 'center',
    color: '#FBCF9C',
    fontFamily: 'Cormorant-Bold',
  },
  subheading: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#D1D5DB',
    fontFamily: 'Montserrat',
    lineHeight: 22,
  },
  card: {
    backgroundColor: 'rgba(251, 207, 156, 0.05)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.2)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#FBCF9C',
    textAlign: 'left',
    fontFamily: 'Cormorant-Bold',
  },
  infoSection: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
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
  button: {
    backgroundColor: '#E0C48F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(251, 207, 156, 0.5)',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});

export default ContactUs;
