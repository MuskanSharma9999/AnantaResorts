import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import PhoneInputWithCountryCode from '../components/auth/Login/PhoneInputWithCountryCode';

type MembershipModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export default function MembershipModal({
  isVisible,
  onClose,
}: MembershipModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    city: '',
    countryCode: '+91',
    acceptTerms: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.acceptTerms) {
      Alert.alert('Please agree to the Terms and Conditions');
      return;
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Please fill all required fields');
      return;
    }

    console.log('Membership form submitted:', formData);
    onClose();
  };

  const toggleTerms = () => {
    setFormData(prev => ({
      ...prev,
      acceptTerms: !prev.acceptTerms,
    }));
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      useNativeDriver
      hideModalContentWhileAnimating
    >
      <View style={styles.modalContent}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        {/* Form Content */}
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Let's get in touch</Text>
            <Text style={styles.subtitle}>
              Join our exclusive membership program today
            </Text>
          </View>

          <View style={styles.form}>
            {/* Name Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Hello, My name is</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter here"
                placeholderTextColor="#999"
                value={formData.name}
                onChangeText={value => handleInputChange('name', value)}
              />
            </View>

            {/* Age Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Age"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formData.age}
                onChangeText={value => handleInputChange('age', value)}
              />
            </View>


            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email ID"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={value => handleInputChange('email', value)}
              />
            </View>

            {/* City Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>I live in</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter city name"
                placeholderTextColor="#999"
                value={formData.city}
                onChangeText={value => handleInputChange('city', value)}
              />
            </View>

            {/* Phone Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Waiting to hear from you on</Text>
              <View style={styles.formContainer}>
                <View style={styles.phoneInputContainer}>
                  <PhoneInputWithCountryCode></PhoneInputWithCountryCode>
                </View>
              </View>
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleTerms}
            >
              <View
                style={[
                  styles.checkbox,
                  formData.acceptTerms && styles.checkboxChecked,
                ]}
              >
                {formData.acceptTerms && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.termsText}>
                By signing up you agree to our{' '}
                <Text style={styles.termsLink}>
                  Terms and Conditions of Use
                </Text>
              </Text>
            </TouchableOpacity>

         
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#000000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
  scrollContainer: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 1000,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Cormorant',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 14,
    color: '#333',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  phoneInput: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingRight: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 4,
    marginRight: 10,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFE2B8',
    borderColor: '#FFE2B8',
  },
  checkmark: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: '#ccc',
    flex: 1,
    lineHeight: 20,
  },
  termsLink: {
    color: '#FFE2B8',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#D4A574',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  formContainer: {
    gap: 30,
  },
  phoneInputContainer: {
    color: '#6B6B6B',
  },
});
