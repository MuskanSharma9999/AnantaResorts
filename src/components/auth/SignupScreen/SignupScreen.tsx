// src/screens/SignupScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './SignupScreenStyle';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'react-native';
import GradientButton from '../../Buttons/GradientButton';
import Icon from 'react-native-vector-icons/Feather'; // Feather has eye & eye-off icons

const SignupScreen = () => {
  const { width, height } = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const data = [
    {
      image: require('../../../assets/images/signUpCarousel_images/img_1.jpg'),
    },
    {
      image: require('../../../assets/images/signUpCarousel_images/img_2.jpg'),
    },
    {
      image: require('../../../assets/images/signUpCarousel_images/img_3.jpg'),
    },
    {
      image: require('../../../assets/images/signUpCarousel_images/img_4.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={{ flex: 1 }}>
            {/* Carousel Section */}
            <View style={styles.imageSection}>
              <Carousel
                loop
                autoPlay
                width={width}
                height={height * 0.5}
                data={data}
                scrollAnimationDuration={2000}
                autoPlayInterval={3000}
                renderItem={({ item }) => (
                  <Image source={item.image} style={styles.carouselImage} />
                )}
              />
            </View>

            {/* Bottom Section */}
            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <Text style={styles.welcomeText}>Let’s Sign you in</Text>
              {/* <Text style={styles.subText}>
                Lorem ipsum dolor sit amet, consectetur
              </Text> */}

              {/* Name */}
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />

              {/* Email */}
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                placeholderTextColor="#999"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              {/* Password */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIconContainer}
                >
                  <Icon
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color={showPassword ? '#F5C97B' : '#999'} // gold when active
                  />{' '}
                </TouchableOpacity>
              </View>

              {/* Remember Me + Forgot Password */}
              <View style={styles.rowBetween}>
                <TouchableOpacity
                  style={styles.rememberContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.checkbox,
                      rememberMe && styles.checkboxChecked,
                    ]}
                  >
                    {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberText}>Remember Me</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot Password</Text>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <GradientButton
                title="Submit"
                onPress={() => console.log('Submitted')}
              />

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Don’t have an account?{' '}
                  <Text style={styles.signUp}>Sign Up</Text>
                </Text>
                <Text style={styles.termsText}>
                  By signing up you agree to our{' '}
                  <Text style={styles.termsLink}>Terms</Text> and{' '}
                  <Text style={styles.termsLink}>Conditions of Use</Text>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignupScreen;
