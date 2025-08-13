import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import styles from './TopRatedStyles';
import GradientButton from '../Buttons/GradientButton';

export const TopRated = () => {
  const resorts = [
    {
      id: 1,
      title: 'Ajabgarh',
      description:
        'The quay is situated upstream from the mouth of the Singapore River and Boat Quay.',
      image: { uri: 'https://picsum.photos/400/300' }, // Replace with your image
    },
    {
      id: 2,
      title: 'Deluxe Ocean View',
      description: 'Enjoy breathtaking ocean views with premium stays.',
      image: { uri: 'https://picsum.photos/400/301' },
    },
    {
      id: 3,
      title: 'Villa with Pool',
      description: 'Private villas with pools and luxury interiors.',
      image: { uri: 'https://picsum.photos/400/302' },
    },
  ];

  return (
    <View style={{ backgroundColor: '#000' }}>
      {/* Header */}
      <View style={styles.topRatedContainer}>
        <Text style={styles.topRatedText}>Top Rated</Text>
        <Text style={styles.topRatedSubText}>
          Unwind at{' '}
          <Text style={{ fontWeight: '700', color: '#fff' }}>ANANTA</Text> Club
          best resorts with premium stays and amazing experiences.
        </Text>
      </View>

      {/* Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {resorts.map(resort => (
          <View key={resort.id} style={{ width: 280, marginRight: 15 }}>
            <View
              style={{
                borderRadius: 20,
                overflow: 'hidden',
                borderColor: '#E0C48F',
                borderWidth: 2,
              }}
            >
              <ImageBackground
                source={resort.image}
                style={{ height: 220, borderRadius: 20 }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end', // centers vertically
                    alignItems: 'center', // centers horizontally
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    padding: 16,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                  }}
                >
                  <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#FBCF9C',
                        fontFamily: 'Cormorant',
                        marginBottom: 6,
                        textAlign: 'center', // ensures text is centered
                      }}
                    >
                      {resort.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#fff',
                        fontFamily: 'Montserrat',
                        lineHeight: 18,
                        marginBottom: 12,
                        textAlign: 'center', // ensures description is centered
                      }}
                    >
                      {resort.description}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>

            {/* Button Below Card, Centered */}
            <View style={{ alignItems: 'center', marginTop: -25 }}>
              <GradientButton
                title="Explore"
                style={{
                  width: 140,
                  borderRadius: 15,
                }}
                onPress={() => {
                  console.log('Explore button clicked');
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
