import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './OnboardingScreenStyles';
import OnBoarding from '../../../assets/images/onBoarding.svg';
import GradientButton from '../../Buttons/GradientButton';

const { width } = Dimensions.get('window');

const titles = [
  'Magical Moments with\nAnanta Holiday Club',
  'Experience Luxury\nLike Never Before',
  'Create Memories\nFor a Lifetime',
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < titles.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate('Login' as never);
    }
  };

  const renderTitle = ({ item }: { item: string }) => (
    <View style={styles.titleSlide}>
      <Text style={styles.title}>{item}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#000' }}
      edges={['top', 'bottom']}
    >
      <LinearGradient
        colors={['#000000', '#1a1a1a', '#000000']}
        style={styles.container}
      >
        <View style={styles.onboardingImage}>
          <OnBoarding width={width} height={width} />
        </View>

        <View>
          <FlatList
            data={titles}
            renderItem={renderTitle}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            ref={flatListRef}
            style={styles.carousel}
          />
          <Text style={styles.subtitle}>Where Would you like to go?</Text>

          <View style={styles.pagination}>
            {titles.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentIndex
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        <GradientButton
          title={currentIndex < titles.length - 1 ? 'Next' : "Let's Go"}
          onPress={handleNext}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
