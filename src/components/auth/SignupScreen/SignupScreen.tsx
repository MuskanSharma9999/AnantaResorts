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
import { useDispatch } from 'react-redux';

import styles from './SignupScreenStyle';
import GradientButton from '../../Buttons/GradientButton';
import ApiList from '../../../Api_List/apiList';
import axios from 'axios';
import { setAuth } from '../../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
});

const SignupScreen = () => {
  const dispatch = useDispatch();

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

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  Keyboard.dismiss();

  try {
    console.log('Submitting form:', {
      ...values,
    });

    const token = await AsyncStorage.getItem('token');
    console.log('???????????', token);

    if (!token) {
      Alert.alert(
        'Error',
        'Authentication token not found. Please log in again.',
      );
      return;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Hard-coded successful response simulation
    const response = { status: 200 };

    if (response.status === 200) {
      await AsyncStorage.setItem('isAuth', 'true');
      dispatch(setAuth(true));
      Alert.alert('Success', 'Profile updated successfully');
    }

    resetForm();
  } catch (error) {
    console.error('Signup error:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  } finally {
    setSubmitting(false);
  }
};


  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   Keyboard.dismiss();

  //   try {
  //     console.log('Submitting form:', {
  //       ...values,
  //     });

  //     const token = await AsyncStorage.getItem('token');
  //     console.log('???????????', token);

  //     if (!token) {
  //       Alert.alert(
  //         'Error',
  //         'Authentication token not found. Please log in again.',
  //       );
  //       return;
  //     }

  //     const response = await axios.put(
  //       ApiList.UPDATE_PROFILE,
  //       {
  //         ...values,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (response.status === 200) {
  //       await AsyncStorage.setItem('isAuth', 'true');
  //       dispatch(setAuth(true));
  //       Alert.alert('Success', 'Profile updated successfully');
  //     }

  //     resetForm();
  //   } catch (error) {
  //     console.error('Signup error:', error);
  //     Alert.alert('Error', 'Something went wrong. Please try again.');
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

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
                initialValues={{ name: '', email: '' }}
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
                        errors.email && touched.email
                          ? styles.inputError
                          : null,
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

                    <GradientButton
                      title={isSubmitting ? 'Creating Account...' : 'Submit'}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      style={{ marginTop: 10, marginBottom: 20 }}
                    />

                    {/* Footer */}
                    <View style={styles.footer}>
                      <Text style={styles.termsText}>
                        By signing up you agree to our{' '}
                        <Text style={styles.termsLink}>Terms</Text> and{' '}
                        <Text style={styles.termsLink}>Conditions of Use</Text>
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
