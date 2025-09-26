import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import ApiList from '../../Api_List/apiList';
import axios from 'axios';
import GradientButton from '../../components/Buttons/GradientButton';
import { useNavigation } from '@react-navigation/native';

const AnantaSelect = () => {
  const navigation = useNavigation();
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResorts = async () => {
    try {
      const response = await axios.get(ApiList.GET_ALL_RESORTS);
      console.log('Resorts API Response:', response.data);

      if (response.status === 200) {
        setResorts(
          Array.isArray(response.data)
            ? response.data
            : response.data.data || [],
        );
      } else {
        setError('Unexpected response format');
      }
    } catch (err) {
      console.error('Error fetching resorts:', err);
      setError('Failed to load resorts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResorts();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FBCF9C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {resorts.map((resort, index) => {
          const mainImage = resort.image
            ? { uri: resort.image }
            : resort.image_gallery && resort.image_gallery.length > 0
            ? { uri: resort.image_gallery[0].url }
            : require('../../assets/images/1.svg');

          return (
            <View
              key={resort.id}
              style={[
                styles.cardWrapper,
                index === resorts.length - 1 && { marginBottom: 0 },
              ]}
            >
              <View style={styles.cardContainer}>
                <ImageBackground
                  source={mainImage}
                  style={styles.imageBackground}
                  resizeMode="cover"
                >
                  <View style={styles.overlay}>
                    <View style={styles.textContainer}>
                      <Text style={styles.resortName}>{resort.name}</Text>
                      <Text style={styles.resortLocation}>
                        {resort.location}
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              <View style={styles.buttonContainer}>
                <GradientButton
                  title="Explore"
                  style={styles.exploreButton}
                  onPress={() =>
                    navigation.navigate('ResortDetails', {
                      resortId: resort.id,
                    })
                  }
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AnantaSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingBottom: 80,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  cardWrapper: {
    marginBottom: 30, // spacing between vertical cards
  },
  cardContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: '#E0C48F',
    borderWidth: 2,
  },
  imageBackground: {
    height: 220,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 8,
  },
  resortName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FBCF9C',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  resortLocation: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
    lineHeight: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: -25,
  },
  exploreButton: {
    width: 140,
    borderRadius: 15,
  },
});
