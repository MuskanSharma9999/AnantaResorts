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
  Alert,
  ScrollView,
} from 'react-native';
import { Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from './SignupScreenStyle';
import GradientButton from '../../Buttons/GradientButton';

const { width, height } = Dimensions.get('window');

// ✅ Validation schema using Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters long')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 
      'Password must contain uppercase, lowercase, and a number')
    .required('Password is required'),
});

const SignupScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const data = [
    { image: require('../../../assets/images/signUpCarousel_images/img_1.jpg') },
    { image: require('../../../assets/images/signUpCarousel_images/img_2.jpg') },
    { image: require('../../../assets/images/signUpCarousel_images/img_3.jpg') },
    { image: require('../../../assets/images/signUpCarousel_images/img_4.jpg') },
  ];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    Keyboard.dismiss();

    try {
      console.log('Submitting form:', {
        ...values,
        rememberMe,
      });

      await new Promise(resolve => setTimeout(resolve, 2000)); // simulate API call

      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => console.log('Navigate next') },
      ]);
      resetForm();
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
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

            {/* Form Section */}
            <View style={styles.bottomSection}>
              <Text style={styles.welcomeText}>Let's Sign you up</Text>

              <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <>
                    {/* Name */}
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.name && touched.name ? styles.inputError : null,
                      ]}
                      placeholder="Enter your full name"
                      placeholderTextColor="#999"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}

                    {/* Email */}
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                      style={[
                        styles.input,
                        errors.email && touched.email ? styles.inputError : null,
                      ]}
                      placeholder="Enter your email address"
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    {/* Password */}
                    <Text style={styles.label}>Password</Text>
                    <View
                      style={[
                        styles.passwordContainer,
                        errors.password && touched.password
                          ? styles.inputError
                          : null,
                      ]}
                    >
                      <TextInput
                        style={styles.passwordInput}
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIconContainer}
                      >
                        <Icon
                          name={showPassword ? 'eye' : 'eye-off'}
                          size={20}
                          color={showPassword ? '#F5C97B' : '#999'}
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}

                    {/* Remember Me + Forgot Password */}
                    <View style={styles.rowBetween}>
                      <TouchableOpacity
                        style={styles.rememberContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            rememberMe && styles.checkboxChecked,
                          ]}
                        >
                          {rememberMe && (
                            <Text style={styles.checkmark}>✓</Text>
                          )}
                        </View>
                        <Text style={styles.rememberText}>Remember Me</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => console.log('Forgot')}>
                        <Text style={styles.forgotText}>Forgot Password</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Submit */}
                    <GradientButton
                      title={isSubmitting ? 'Creating Account...' : 'Submit'}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    />

                    {/* Footer */}
                    <View style={styles.footer}>
                      <Text style={styles.termsText}>
                        By signing up you agree to our{' '}
                        <Text style={styles.termsLink}>Terms</Text> and{' '}
                        <Text style={styles.termsLink}>
                          Conditions of Use
                        </Text>
                      </Text>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;
