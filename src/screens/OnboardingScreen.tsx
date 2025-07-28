// src/screens/OnboardingScreen.tsx
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import GoldButton from '../components/GoldButton';
import styles from '../styles/OnboardingScreenStyles';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Magical Moments with\nAnanta Holiday Club',
    subtitle: 'Where Would you like to go?',
    images: [
      // You'll replace these with actual images
      { id: 1, source: null, position: 'top-left' },
      { id: 2, source: null, position: 'top-center' },
      { id: 3, source: null, position: 'top-right' },
      { id: 4, source: null, position: 'middle-left' },
      { id: 5, source: null, position: 'center' }, // Main center image
      { id: 6, source: null, position: 'middle-right' },
      { id: 7, source: null, position: 'bottom-left' },
      { id: 8, source: null, position: 'bottom-center' },
    ],
  },
  {
    id: '2',
    title: 'Experience Luxury\nLike Never Before',
    subtitle: 'Discover world-class amenities',
    images: [
      { id: 1, source: null, position: 'top-left' },
      { id: 2, source: null, position: 'top-center' },
      { id: 3, source: null, position: 'top-right' },
      { id: 4, source: null, position: 'middle-left' },
      { id: 5, source: null, position: 'center' },
      { id: 6, source: null, position: 'middle-right' },
      { id: 7, source: null, position: 'bottom-left' },
      { id: 8, source: null, position: 'bottom-center' },
    ],
  },
  {
    id: '3',
    title: 'Create Memories\nFor a Lifetime',
    subtitle: 'Your perfect vacation awaits',
    images: [
      { id: 1, source: null, position: 'top-left' },
      { id: 2, source: null, position: 'top-center' },
      { id: 3, source: null, position: 'top-right' },
      { id: 4, source: null, position: 'middle-left' },
      { id: 5, source: null, position: 'center' },
      { id: 6, source: null, position: 'middle-right' },
      { id: 7, source: null, position: 'bottom-left' },
      { id: 8, source: null, position: 'bottom-center' },
    ],
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login' as never);
    }
  };

  const renderDiamondImage = (image: any, index: number) => {
    return (
      <View
        key={image.id}
        style={[styles.diamondContainer, styles[image.position]]}
      >
        <View style={styles.diamondImage}>
          {/* Replace with actual ImageBackground when you have images */}
          <View style={styles.imagePlaceholder} />
        </View>
      </View>
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      {/* Diamond Grid Layout */}
      <View style={styles.diamondGrid}>
        {item.images.map((image: any, index: number) =>
          renderDiamondImage(image, index),
        )}
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#000000', '#1a1a1a', '#000000']}
      style={styles.container}
    >
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View style={styles.bottomContainer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Button */}
        <GoldButton
          title={
            currentIndex === onboardingData.length - 1 ? "Let's Go" : 'Next'
          }
          onPress={handleNext}
          style={styles.button}
        />
      </View>
    </LinearGradient>
  );
};

export default OnboardingScreen;
