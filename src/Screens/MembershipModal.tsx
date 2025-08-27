import React, { useState } from 'react';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height } = Dimensions.get('window');

interface MembershipModalProps {
  visible: boolean;
  onClose: () => void;
}

const MembershipModal: React.FC<MembershipModalProps> = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('9898989898');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const panY = React.useRef(new Animated.Value(height)).current;
  const [modalVisible, setModalVisible] = useState(visible);

  React.useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.spring(panY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 0,
      }).start();
    } else {
      Animated.timing(panY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
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
    })
  ).current;

  const handleSubmit = () => {
    if (!name || !age || !phone || !email || !city) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (!agreeToTerms) {
      Alert.alert('Error', 'You must agree to the Terms and Conditions');
      return;
    }
    
    Alert.alert('Success', 'Your information has been submitted successfully!');
    onClose();
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={modalVisible}
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
          <View style={styles.sheetHeader}>
            <View style={styles.panelHandle} />
          </View>

          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.title}>Let's get in touch</Text>
              <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur</Text>
              
              <View style={styles.form}>
                <Text style={styles.label}>Hello, My name is</Text>
                <View style={styles.inputContainer}>
                  <Icon name="person" size={20} color="#666" style={styles.inputIcon} />
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
                  <Icon name="cake" size={20} color="#666" style={styles.inputIcon} />
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
                <View style={styles.phoneContainer}>
                  <View style={styles.countryCode}>
                    <Text style={styles.countryCodeText}>+91 ✓</Text>
                  </View>
                  <TextInput
                    style={styles.phoneInput}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999"
                  />
                </View>
                
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputContainer}>
                  <Icon name="email" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email ID"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                  />
                </View>
                
                <Text style={styles.label}>I live in</Text>
                <View style={styles.inputContainer}>
                  <Icon name="location-city" size={20} color="#666" style={styles.inputIcon} />
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
                >
                  <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                    {agreeToTerms && <Icon name="check" size={16} color="#fff" />}
                  </View>
                  <Text style={styles.termsText}>
                    By signing up you agree to our <Text style={styles.termsLink}>Terms and Conditions of Use</Text>
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.85,
    overflow: 'hidden',
  },
  sheetHeader: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4a6bff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#4a6bff',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  termsLink: {
    color: '#4a6bff',
    fontWeight: '500',
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
});

export default MembershipModal;