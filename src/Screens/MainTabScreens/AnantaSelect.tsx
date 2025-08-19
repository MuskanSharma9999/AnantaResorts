import React from 'react';
import { Image, Text, View } from 'react-native';
import AnantaSelectImage from '../../assets/images/LoginBG.svg';
const AnantaSelect = () => {
  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <AnantaSelectImage></AnantaSelectImage>

      <Text
        style={{
          color: 'gold',
          fontFamily: 'Cormorant',
          fontSize: 24,
          fontWeight: '700',
          marginBottom: 4,
        }}
      >
        Ananta  Awards
      </Text>
    </View>
  );
};

export default AnantaSelect;
