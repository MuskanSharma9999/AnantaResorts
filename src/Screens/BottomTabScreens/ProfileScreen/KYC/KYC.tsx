import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import apiList from '../../../../Api_List/apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [isLoading, setIsLoading] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [usingDynamicTypes, setUsingDynamicTypes] = useState(false);

  // Fetch available document types from backend
  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const fetchDocumentTypes = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.log('No token found, using hardcoded document types');
        setUsingDynamicTypes(false);
        return;
      }

      // Check if your API endpoint for document types exists
      if (!apiList.GET_DOCUMENT_TYPES) {
        console.log(
          'No document types endpoint configured, using hardcoded types',
        );
        setUsingDynamicTypes(false);
        return;
      }

      const response = await axios.get(apiList.GET_DOCUMENT_TYPES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.data.success &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        // Transform backend response to dropdown format
        const types = response.data.data.map(docType => ({
          label: docType.name,
          value: docType.id, // This should be the UUID
          originalType: docType.type || docType.name.toLowerCase(), // Keep original type for mapping
        }));
        setDocumentTypes(types);
        setUsingDynamicTypes(true);
        console.log('Using dynamic document types:', types);
      } else {
        setUsingDynamicTypes(false);
      }
    } catch (error) {
      console.error('Error fetching document types, using hardcoded:', error);
      setUsingDynamicTypes(false);
    }
  };

  // Hardcoded document type UUIDs - USE THE CORRECT ONES FROM YOUR BACKEND
  const documentTypeMap = {
    aadhaar: 'Aadhar Card', // This might be incorrect - get the right UUID
    pan: 'pan',
    drivingLicense: 'YOUR_DL_UUID_HERE',
  };

  // Fallback items for when dynamic loading fails
  const fallbackItems = [
    { label: 'Aadhaar Card', value: 'aadhaar', id: documentTypeMap.aadhaar },
    { label: 'PAN Card', value: 'pan', id: documentTypeMap.pan },
    {
      label: 'Driving License',
      value: 'drivingLicense',
      id: documentTypeMap.drivingLicense,
    },
  ];

  // Use dynamic types if available, otherwise use fallback
  const dropdownItems = usingDynamicTypes ? documentTypes : fallbackItems;

  const getDocLabel = () => {
    const selectedItem = dropdownItems.find(item =>
      usingDynamicTypes
        ? item.value === selectedDocType
        : item.value === selectedDocType,
    );

    if (selectedItem) {
      return `${selectedItem.label} Number`;
    }
    return 'Document Number';
  };

  const getDocNumberMaxLength = () => {
    if (!selectedDocType) return 20;

    const docType = usingDynamicTypes
      ? documentTypes.find(item => item.value === selectedDocType)?.originalType
      : selectedDocType;

    if (docType?.includes('aadhaar')) return 12;
    if (docType?.includes('pan')) return 10;
    return 20;
  };

  const pickDocument = async () => {
    try {
      const options = {
        mediaType: 'photo',
        quality: 1,
        includeBase64: false,
      };

      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Something went wrong');
        } else {
          setDocFile(response.assets[0]);
        }
      });
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const renderDropdownItem = (item, selected) => {
    return (
      <View
        style={{
          backgroundColor: selected ? '#2A2A2B' : '#19191A',
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

  const getDocumentTypeId = () => {
    if (usingDynamicTypes) {
      // For dynamic types, the value IS the UUID
      return selectedDocType;
    } else {
      // For fallback items, map the value to UUID
      return documentTypeMap[selectedDocType];
    }
  };

  const handleSubmit = async () => {
    if (!selectedDocType || !docNumber || !docFile) {
      Alert.alert('Error', 'Please complete all fields');
      return;
    }

    const documentTypeId = getDocumentTypeId();

    // Validate that we have a proper UUID (basic check for UUID format)
    if (
      !documentTypeId ||
      documentTypeId.includes('YOUR_') ||
      documentTypeId.includes('GET_CORRECT')
    ) {
      Alert.alert(
        'Configuration Error',
        'Document type not properly configured. Please contact support or try again later.',
      );
      return;
    }

    // Basic UUID format validation
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(documentTypeId)) {
      Alert.alert(
        'Error',
        'Invalid document type configuration. Please contact support.',
      );
      return;
    }

    // Validate document number based on type
    const docType = usingDynamicTypes
      ? documentTypes.find(item => item.value === selectedDocType)?.originalType
      : selectedDocType;

    if (docType?.includes('aadhaar') && !/^\d{12}$/.test(docNumber)) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number');
      return;
    }

    if (
      docType?.includes('pan') &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(docNumber)
    ) {
      Alert.alert(
        'Error',
        'Please enter a valid PAN number (e.g., ABCDE1234F)',
      );
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('document_type_id', documentTypeId);
      formData.append('document_number', docNumber);
      formData.append('document', {
        uri: docFile.uri,
        name: docFile.fileName || `kyc_document_${Date.now()}.jpg`,
        type: docFile.type || 'image/jpeg',
      });

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert(
          'Error',
          'Authentication token not found. Please log in again.',
        );
        setIsLoading(false);
        return;
      }

      console.log('Sending KYC data...');
      console.log('Document Type ID:', documentTypeId);
      console.log('Document Number:', docNumber);
      console.log('Using dynamic types:', usingDynamicTypes);

      const response = await axios.post(apiList.UPDATE_KYC, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        timeout: 30000,
      });

      console.log('KYC Response:', response.data);

      if (response.data.success) {
        Alert.alert('Success', 'KYC submitted successfully!');
        setSelectedDocType('');
        setDocNumber('');
        setDocFile(null);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to submit KYC');
      }
    } catch (error) {
      console.error('KYC Submit Error:', error);

      if (error.response?.data?.message?.includes('Invalid document type')) {
        Alert.alert(
          'Error',
          'The document type UUID is not recognized by the server. Please contact support with error ID: ' +
            (error.response.data.errorId || 'N/A'),
        );
      } else if (error.response) {
        Alert.alert(
          'Error',
          error.response.data?.message || 'Server error occurred',
        );
      } else if (error.request) {
        Alert.alert(
          'Error',
          'No response from server. Please check your connection.',
        );
      } else {
        Alert.alert('Error', error.message || 'Failed to submit KYC');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>KYC Verification</Text>

      <Text style={styles.inputLabel}>Select Document Type</Text>
      <Dropdown
        data={dropdownItems}
        labelField="label"
        valueField={usingDynamicTypes ? 'value' : 'value'}
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
        itemTextStyle={{
          color: '#FFE2B8',
          fontFamily: 'Montserrat',
          fontSize: 15,
        }}
        activeColor="#2A2A2B"
        dropdownPosition="auto"
        iconStyle={styles.elementDropdownIcon}
        renderItem={renderDropdownItem}
      />

      {selectedDocType && (
        <>
          <Text style={styles.inputLabel}>{getDocLabel()}</Text>
          <TextInput
            style={styles.inputField}
            placeholder={`Enter ${getDocLabel()}`}
            placeholderTextColor="#bbb"
            keyboardType={
              getDocLabel().includes('Aadhaar') ? 'numeric' : 'default'
            }
            autoCapitalize={
              getDocLabel().includes('PAN') ? 'characters' : 'none'
            }
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
            {docFile && (
              <Text style={{ color: '#4CAF50', marginTop: 5, fontSize: 12 }}>
                File selected: {docFile.fileName}
              </Text>
            )}
          </View>
        </>
      )}

      <GradientButton
        title={isLoading ? 'Submitting...' : 'Submit KYC'}
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </ScrollView>
  );
};

export default KYC;
