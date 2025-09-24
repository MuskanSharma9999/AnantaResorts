import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';

import { launchImageLibrary } from 'react-native-image-picker';

import GradientButton from '../../../../components/Buttons/GradientButton';

import ApiList from '../../../../Api_List/apiList';

const styles = {
  container: {
    flex: 1,

    backgroundColor: 'black',

    padding: 16,
  },

  sectionTitle: {
    color: '#FFE2B8',

    fontSize: 22,

    fontWeight: '600',

    fontFamily: 'Cormorant-Bold',

    marginBottom: 12,
  },

  inputLabel: {
    color: '#FFE2B8',

    fontSize: 14,

    fontWeight: '700',

    fontFamily: 'Montserrat-Regular',

    marginTop: 12,

    marginBottom: 4,
  },

  inputField: {
    backgroundColor: '#19191A',

    borderRadius: 8,

    borderColor: '#FFE2B8',

    borderWidth: 1,

    color: '#fff',

    paddingHorizontal: 12,

    paddingVertical: 10,

    fontSize: 14,

    fontFamily: 'Montserrat-Regular',
  },

  button: {
    backgroundColor: '#FBCF9C',

    borderRadius: 18,

    paddingVertical: 14,

    alignItems: 'center',

    marginTop: 30,

    marginHorizontal: 12,
  },

  buttonText: {
    color: '#19191A',

    fontWeight: '700',

    fontSize: 16,

    fontFamily: 'Cormorant',
  },

  uploadButtonText: {
    backgroundColor: '#19191A',

    borderRadius: 8,

    borderColor: '#FFE2B8',

    borderWidth: 1,

    color: '#fff',

    paddingHorizontal: 12,

    paddingVertical: 10,

    fontSize: 14,

    fontFamily: 'Montserrat',

    textAlign: 'center',
  },

  elementDropdown: {
    backgroundColor: '#19191A',

    borderColor: '#FFE2B8',

    borderWidth: 1,

    borderRadius: 8,

    marginBottom: 12,

    paddingHorizontal: 12,
  },

  elementDropdownPlaceholder: {
    color: '#bbb',

    fontFamily: 'Montserrat',

    paddingVertical: 10,
  },

  elementDropdownItem: {
    backgroundColor: '#19191A',

    padding: 10,

    color: '#FFE2B8',

    fontFamily: 'Montserrat',

    fontSize: 15,
  },

  elementDropdownSelectedTextStyle: {
    color: '#FFE2B8',

    fontWeight: '700',

    fontFamily: 'Montserrat',

    paddingVertical: 10,
  },

  elementDropdownIcon: {
    tintColor: '#FFE2B8',
  },
};

const KYC = () => {
  const [selectedDocType, setSelectedDocType] = useState('');

  const [docNumber, setDocNumber] = useState('');

  const [docFile, setDocFile] = useState(null);

  const items = [
    { label: 'Aadhaar', value: 'aadhaar' },

    { label: 'PAN', value: 'pan' },

    { label: 'Driving License', value: 'drivingLicense' },
  ];

  const getDocLabel = () => {
    switch (selectedDocType) {
      case 'aadhaar':
        return 'Aadhaar Number';

      case 'pan':
        return 'PAN Code';

      case 'drivingLicense':
        return 'Driving License Number';

      default:
        return 'Document Number';
    }
  };

  const getDocNumberMaxLength = () => {
    if (selectedDocType === 'aadhaar') return 12;

    if (selectedDocType === 'pan') return 10;

    return 20;
  };

  const pickDocument = async () => {
    try {
      const options = {
        mediaType: 'photo', // only images
        quality: 1,
        includeBase64: false,
      };

      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Something went wrong');
        } else {
          // `response.assets` is an array of selected images
          setDocFile(response.assets[0]);
        }
      });
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const handleSubmit = () => {
    if (!selectedDocType) {
      Alert.alert('Error', 'Please select a document type');

      return;
    }

    if (!docNumber || docNumber.length < 6) {
      Alert.alert('Error', `Please enter a valid ${getDocLabel()}`);

      return;
    }

    if (!docFile) {
      Alert.alert('Error', `Please upload the ${getDocLabel()}`);

      return;
    }

    Alert.alert('Success', 'KYC submitted successfully!');

    // Add API call logic here
  };

  const renderDropdownItem = (item, selected) => {
    return (
      <View
        style={{
          backgroundColor: selected ? '#19191A' : '#19191A',

          paddingHorizontal: 12,

          paddingVertical: 10,

          borderBottomWidth: 0.5,

          borderBottomColor: '#333',
        }}
      >
        <Text
          style={{
            color: '#FFE2B8',

            fontFamily: 'Montserrat',

            fontSize: 15,

            fontWeight: selected ? '700' : '400',
          }}
        >
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>KYC Verification</Text>
      <Text style={styles.inputLabel}>Select Document Type</Text>
      <Dropdown
        data={items}
        labelField="label"
        valueField="value"
        value={selectedDocType}
        onChange={item => {
          setSelectedDocType(item.value);

          setDocNumber('');

          setDocFile(null);
        }}
        placeholder="Choose Document Type"
        style={styles.elementDropdown}
        selectedTextStyle={styles.elementDropdownSelectedTextStyle}
        placeholderStyle={styles.elementDropdownPlaceholder}
        containerStyle={{
          backgroundColor: '#19191A',

          borderColor: '#FFE2B8',

          borderWidth: 1,

          borderRadius: 8,

          marginTop: 2,
        }}
        itemContainerStyle={{
          backgroundColor: '#19191A',
        }}
        itemTextStyle={{
          color: '#FFE2B8',

          fontFamily: 'Montserrat',

          fontSize: 15,

          backgroundColor: '#19191A',
        }}
        activeColor="#19191A"
        dropdownPosition="auto"
        iconStyle={styles.elementDropdownIcon}
        renderItem={renderDropdownItem}
        flatListProps={{
          style: { backgroundColor: '#19191A' },
        }}
      />

      {selectedDocType !== '' && (
        <>
          <Text style={styles.inputLabel}>{getDocLabel()}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={`Enter ${getDocLabel()}`}
            placeholderTextColor="#bbb"
            keyboardType={selectedDocType === 'aadhaar' ? 'numeric' : 'default'}
            autoCapitalize="characters"
            maxLength={getDocNumberMaxLength()}
            value={docNumber}
            onChangeText={setDocNumber}
          />

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.inputLabel}>Upload Document</Text>

            <TouchableOpacity onPress={pickDocument}>
              <Text style={styles.uploadButtonText}>
                {docFile?.fileName || 'Choose Document Image'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit KYC</Text>
      </TouchableOpacity> */}

      <GradientButton
        title="Submit KYC"
        onPress={handleSubmit}
      ></GradientButton>
    </ScrollView>
  );
};

export default KYC;
