import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  Dimensions,
  Animated,
  PanResponder,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ApiList from '../Api_List/apiList';
import axios from 'axios';
import PhoneInput from 'react-native-phone-number-input';
import GradientButton from '../components/Buttons/GradientButton';

const { height } = Dimensions.get('window');

interface MembershipModalProps {
  visible: boolean;
  onClose: () => void;
}

const MembershipModal: React.FC<MembershipModalProps> = ({
  visible,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);

  const panY = React.useRef(new Animated.Value(height)).current;
  const [modalVisible, setModalVisible] = useState(visible);

  // Add this to your useEffect to fetch profile when modal opens
  useEffect(() => {
    console.log('[MembershipModal] visible changed:', visible);

    if (visible) {
      console.log('[MembershipModal] Modal opening...');
      setModalVisible(true);
      setLoading(true); // Start loading
      fetchProfile(); // Fetch profile data
      Animated.spring(panY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      console.log('[MembershipModal] Modal closing...');
      Animated.timing(panY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        console.log('[MembershipModal] Modal hidden');
        setModalVisible(false);
      });
    }
  }, [visible, panY]);

  const panResponders = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 0,
          }).start();
        }
      },
    }),
  ).current;

  const fetchProfile = async () => {
    try {
      // console.log('[fetchProfile] fetching...');

      // Retrieve token with the correct key
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.warn('[fetchProfile] No token found in storage');
        Alert.alert('Error', 'Please login again');
        return;
      }

      // console.log(
      //   '[fetchProfile] Token found:',
      //   token.substring(0, 20) + '...',
      // ); // Log first part of token

      const response = await axios.get(ApiList.GET_PROFILE, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // console.log(
      //   '[fetchProfile] Full response:',
      //   JSON.stringify(response.data, null, 2),
      // );

      if (response.data?.success && response.data?.data?.user) {
        const { name, email, phone } = response.data.data.user;
        setName(name || '');
        setEmail(email || '');
        setPhone(phone || '');
        // console.log('[fetchProfile] Profile data set:', { name, email, phone });
      } else {
        console.warn(
          '[fetchProfile] Invalid response structure:',
          response.data,
        );
        Alert.alert('Error', 'Failed to load profile data');
      }
    } catch (error: any) {
      console.error('[fetchProfile] Error:', error);
      if (error.response) {
        console.error(
          '[fetchProfile] API error response:',
          error.response.data,
        );
        if (error.response.status === 401) {
          Alert.alert('Error', 'Session expired. Please login again.');
        } else {
          Alert.alert(
            'Error',
            'Failed to fetch profile: ' + error.response.data.message,
          );
        }
      } else if (error.request) {
        console.error('[fetchProfile] Network error:', error.request);
        Alert.alert('Error', 'Network error. Please check your connection.');
      } else {
        console.error('[fetchProfile] Unexpected error:', error.message);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    // console.log('[handleSubmit] Submit button clicked');
    // console.log('Form values:', {
    //   name,
    //   age,
    //   phone,
    //   email,
    //   city,
    //   agreeToTerms,
    // });

    if (!name || !age || !phone || !email || !city) {
      console.warn('[handleSubmit] Missing fields');
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!agreeToTerms) {
      console.warn('[handleSubmit] Terms not accepted');
      Alert.alert('Error', 'You must agree to the Terms and Conditions');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token missing');
        return;
      }

      // console.log('[handleSubmit] Sending PUT request...');
      const { data } = await axios.put(
        ApiList.UPDATE_PROFILE,
        {
          name,
          age,
          phone,
          email,
          city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // console.log('[handleSubmit] API response:', data);

      if (data.success) {
        Alert.alert(
          'Success',
          'Your information has been submitted successfully!',
        );
        onClose();
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error(
        '[handleSubmit] error:',
        error.response?.data || error.message,
      );
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to update profile',
      );
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible} // 👈 directly use parent prop
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY: panY }],
            },
          ]}
          {...panResponders.panHandlers}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>Let's get in touch</Text>
              <Text style={styles.subtitle}>
                Lorem ipsum dolor sit amet, consectetur
              </Text>

              <View style={styles.form}>
                <Text style={styles.label}>Hello, My name is</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter here"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#999"
                  />
                </View>

                <Text style={styles.label}>Age</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                  />
                </View>

                <Text style={styles.label}>Waiting to hear from you on</Text>

                <PhoneInput
                  ref={phoneInput}
                  value={phone} // 👈 use value instead of defaultValue
                  defaultCode="IN"
                  withDarkTheme={true}
                  withShadow={true}
                  layout="second"
                  onChangeFormattedText={text => setPhone(text)}
                  placeholder="Mobile number"
                  containerStyle={{
                    width: '100%',
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#fff5f5ff',
                    backgroundColor: '#948585ff',
                    marginBottom: 10,
                    height: 50,
                  }}
                  textContainerStyle={{
                    backgroundColor: '#ffffffff',
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    paddingVertical: 0,
                  }}
                  textInputStyle={{
                    color: '#000000ff',
                    fontSize: 16,
                    paddingVertical: 8,
                  }}
                  codeTextStyle={{
                    color: '#000000ff',
                    fontSize: 16,
                  }}
                  flagButtonStyle={{
                    backgroundColor: '#ffffffff',
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    paddingVertical: 0,
                  }}
                />

                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email ID"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                     editable={false} 
                  />
                </View>

                <Text style={styles.label}>I live in</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter city name"
                    value={city}
                    onChangeText={setCity}
                    placeholderTextColor="#999"
                  />
                </View>

                <TouchableOpacity
                  style={styles.termsContainer}
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      agreeToTerms && styles.checkboxChecked,
                    ]}
                  >
                    {agreeToTerms && (
                      <Icon name="check" size={14} color="#000000ff" />
                    )}
                  </View>
                  <Text style={styles.termsText}>
                    By signing up you agree to our{' '}
                    <Text style={styles.termsLink}>
                      Terms and Conditions of Use
                    </Text>
                  </Text>
                </TouchableOpacity>
                <GradientButton
                  title="Submit"
                  onPress={handleSubmit}
                ></GradientButton>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 254, 254, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.85,
    overflow: 'hidden',
  },

  panelHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  content: {
    padding: 24,
    height: '100%',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 8,
    color: '#FBCF9C',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fffcfcff',
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#ffffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryCode: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRightWidth: 0,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },

  submitButton: {
    backgroundColor: '#4a6bff',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#F5C47A', // gold outline
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#F5C47A', // gold fill when checked
    borderColor: '#F5C47A',
  },
  termsText: {
    flex: 1,
    color: '#ddd',
    fontSize: 14,
  },
  termsLink: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default MembershipModal;
