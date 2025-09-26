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
  documentSection: {
    marginBottom: 20,
    padding: 12,
    borderColor: '#FFE2B8',
    borderWidth: 1,
    borderRadius: 8,
  },
  sectionHeader: {
    color: '#FFE2B8',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Montserrat',
    marginBottom: 8,
  },
  requiredBadge: {
    color: '#FF6B6B',
    fontSize: 12,
    marginLeft: 4,
  },
  optionalBadge: {
    color: '#4CAF50',
    fontSize: 12,
    marginLeft: 4,
  },
  completedBadge: {
    color: '#4CAF50',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '700',
  },
};

const KYC = () => {
  // State for each document
  const [panData, setPanData] = useState({
    docNumber: '',
    docFile: null,
    completed: false,
  });

  const [aadhaarData, setAadhaarData] = useState({
    docNumber: '',
    docFile: null,
    completed: false,
  });

  const [optionalDocData, setOptionalDocData] = useState({
    selectedDocType: '',
    docNumber: '',
    docFile: null,
    completed: false,
  });

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
        const types = response.data.data.map(docType => ({
          label: docType.name,
          value: docType.id,
          originalType: docType.type || docType.name.toLowerCase(),
        }));
        setDocumentTypes(types);
        setUsingDynamicTypes(true);
      } else {
        setUsingDynamicTypes(false);
      }
    } catch (error) {
      console.error('Error fetching document types, using hardcoded:', error);
      setUsingDynamicTypes(false);
    }
  };

  // Hardcoded document type UUIDs
  const documentTypeMap = {
    aadhaar: 'Aadhar Card',
    pan: 'pan',
    drivingLicense: 'YOUR_DL_UUID_HERE',
    voterId: 'YOUR_VOTER_ID_UUID_HERE',
    passport: 'YOUR_PASSPORT_UUID_HERE',
  };

  // Fallback items for optional documents
  const fallbackOptionalItems = [
    {
      label: 'Driving License',
      value: 'drivingLicense',
      id: documentTypeMap.drivingLicense,
    },
    { label: 'Voter ID', value: 'voterId', id: documentTypeMap.voterId },
    { label: 'Passport', value: 'passport', id: documentTypeMap.passport },
  ];

  const optionalDropdownItems = usingDynamicTypes
    ? documentTypes.filter(
        item =>
          !item.originalType?.includes('pan') &&
          !item.originalType?.includes('aadhaar'),
      )
    : fallbackOptionalItems;

  // Update completion status
  useEffect(() => {
    setPanData(prev => ({
      ...prev,
      completed: prev.docNumber.trim() !== '' && prev.docFile !== null,
    }));
  }, [panData.docNumber, panData.docFile]);

  useEffect(() => {
    setAadhaarData(prev => ({
      ...prev,
      completed: prev.docNumber.trim() !== '' && prev.docFile !== null,
    }));
  }, [aadhaarData.docNumber, aadhaarData.docFile]);

  useEffect(() => {
    setOptionalDocData(prev => ({
      ...prev,
      completed:
        prev.selectedDocType !== '' &&
        prev.docNumber.trim() !== '' &&
        prev.docFile !== null,
    }));
  }, [
    optionalDocData.selectedDocType,
    optionalDocData.docNumber,
    optionalDocData.docFile,
  ]);

  const pickDocument = async documentType => {
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
          const file = response.assets[0];
          switch (documentType) {
            case 'pan':
              setPanData(prev => ({ ...prev, docFile: file }));
              break;
            case 'aadhaar':
              setAadhaarData(prev => ({ ...prev, docFile: file }));
              break;
            case 'optional':
              setOptionalDocData(prev => ({ ...prev, docFile: file }));
              break;
          }
        }
      });
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const validateDocument = (type, number) => {
    switch (type) {
      case 'pan':
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(number);
      case 'aadhaar':
        return /^\d{12}$/.test(number);
      default:
        return number.trim().length > 0;
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

  const getDocumentTypeId = (docType, value) => {
    if (usingDynamicTypes) {
      return value;
    } else {
      return documentTypeMap[value] || documentTypeMap[docType];
    }
  };

  const handleSubmit = async () => {
    // Validate required documents
    if (!panData.completed) {
      Alert.alert('Error', 'Please complete PAN card details');
      return;
    }

    if (!aadhaarData.completed) {
      Alert.alert('Error', 'Please complete Aadhaar card details');
      return;
    }

    // Validate PAN number
    if (!validateDocument('pan', panData.docNumber)) {
      Alert.alert(
        'Error',
        'Please enter a valid PAN number (e.g., ABCDE1234F)',
      );
      return;
    }

    // Validate Aadhaar number
    if (!validateDocument('aadhaar', aadhaarData.docNumber)) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert(
          'Error',
          'Authentication token not found. Please log in again.',
        );
        setIsLoading(false);
        return;
      }

      // Add PAN document
      const panTypeId = getDocumentTypeId('pan', 'pan');
      formData.append(
        'documents[]',
        JSON.stringify({
          document_type_id: panTypeId,
          document_number: panData.docNumber,
        }),
      );
      formData.append('documents[]', {
        uri: panData.docFile.uri,
        name: panData.docFile.fileName || `pan_document_${Date.now()}.jpg`,
        type: panData.docFile.type || 'image/jpeg',
      });

      // Add Aadhaar document
      const aadhaarTypeId = getDocumentTypeId('aadhaar', 'aadhaar');
      formData.append(
        'documents[]',
        JSON.stringify({
          document_type_id: aadhaarTypeId,
          document_number: aadhaarData.docNumber,
        }),
      );
      formData.append('documents[]', {
        uri: aadhaarData.docFile.uri,
        name:
          aadhaarData.docFile.fileName || `aadhaar_document_${Date.now()}.jpg`,
        type: aadhaarData.docFile.type || 'image/jpeg',
      });

      // Add optional document if completed
      if (optionalDocData.completed) {
        const optionalTypeId = getDocumentTypeId(
          optionalDocData.selectedDocType,
          optionalDocData.selectedDocType,
        );
        formData.append(
          'documents[]',
          JSON.stringify({
            document_type_id: optionalTypeId,
            document_number: optionalDocData.docNumber,
          }),
        );
        formData.append('documents[]', {
          uri: optionalDocData.docFile.uri,
          name:
            optionalDocData.docFile.fileName ||
            `optional_document_${Date.now()}.jpg`,
          type: optionalDocData.docFile.type || 'image/jpeg',
        });
      }

      console.log('Submitting KYC with documents...');

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
        // Reset all forms
        setPanData({ docNumber: '', docFile: null, completed: false });
        setAadhaarData({ docNumber: '', docFile: null, completed: false });
        setOptionalDocData({
          selectedDocType: '',
          docNumber: '',
          docFile: null,
          completed: false,
        });
      } else {
        Alert.alert('Error', response.data.message || 'Failed to submit KYC');
      }
    } catch (error) {
      console.error('KYC Submit Error:', error);
      if (error.response) {
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

  const allRequiredCompleted = panData.completed && aadhaarData.completed;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>KYC Verification</Text>

      {/* PAN Card Section */}
      <View style={styles.documentSection}>
        <Text style={styles.sectionHeader}>
          PAN Card{' '}
          {panData.completed ? (
            <Text style={styles.completedBadge}>✓ Completed</Text>
          ) : (
            <Text style={styles.requiredBadge}>(Required)</Text>
          )}
        </Text>

        <Text style={styles.inputLabel}>PAN Number</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter PAN Number (e.g., ABCDE1234F)"
          placeholderTextColor="#bbb"
          autoCapitalize="characters"
          maxLength={10}
          value={panData.docNumber}
          onChangeText={text =>
            setPanData(prev => ({ ...prev, docNumber: text }))
          }
        />

        <Text style={styles.inputLabel}>Upload PAN Card</Text>
        <TouchableOpacity onPress={() => pickDocument('pan')}>
          <Text style={styles.uploadButtonText}>
            {panData.docFile?.fileName || 'Choose PAN Card Image'}
          </Text>
        </TouchableOpacity>
        {panData.docFile && (
          <Text style={{ color: '#4CAF50', marginTop: 5, fontSize: 12 }}>
            File selected: {panData.docFile.fileName}
          </Text>
        )}
      </View>

      {/* Aadhaar Card Section */}
      <View style={styles.documentSection}>
        <Text style={styles.sectionHeader}>
          Aadhaar Card{' '}
          {aadhaarData.completed ? (
            <Text style={styles.completedBadge}>✓ Completed</Text>
          ) : (
            <Text style={styles.requiredBadge}>(Required)</Text>
          )}
        </Text>

        <Text style={styles.inputLabel}>Aadhaar Number</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter 12-digit Aadhaar Number"
          placeholderTextColor="#bbb"
          keyboardType="numeric"
          maxLength={12}
          value={aadhaarData.docNumber}
          onChangeText={text =>
            setAadhaarData(prev => ({ ...prev, docNumber: text }))
          }
        />

        <Text style={styles.inputLabel}>Upload Aadhaar Card</Text>
        <TouchableOpacity onPress={() => pickDocument('aadhaar')}>
          <Text style={styles.uploadButtonText}>
            {aadhaarData.docFile?.fileName || 'Choose Aadhaar Card Image'}
          </Text>
        </TouchableOpacity>
        {aadhaarData.docFile && (
          <Text style={{ color: '#4CAF50', marginTop: 5, fontSize: 12 }}>
            File selected: {aadhaarData.docFile.fileName}
          </Text>
        )}
      </View>

      {/* Optional Document Section */}
      <View style={styles.documentSection}>
        <Text style={styles.sectionHeader}>
          Additional Document{' '}
          <Text style={styles.optionalBadge}>(Optional)</Text>
        </Text>

        <Text style={styles.inputLabel}>
          If you already have an Physical card
        </Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter Physical card Number"
          placeholderTextColor="#bbb"
          value={optionalDocData.docNumber}
          onChangeText={text =>
            setOptionalDocData(prev => ({
              ...prev,
              docNumber: text,
              completed: text.trim().length > 0, // Mark as completed if number is entered
              selectedDocType: 'manualEntry', // Use fixed type if not using dropdown
            }))
          }
        />

        <Text style={styles.inputLabel}>Upload Card Image</Text>
        <TouchableOpacity onPress={() => pickDocument('optional')}>
          <Text style={styles.uploadButtonText}>
            {optionalDocData.docFile?.fileName || 'Choose Document Image'}
          </Text>
        </TouchableOpacity>
        {optionalDocData.docFile && (
          <Text style={{ color: '#4CAF50', marginTop: 5, fontSize: 12 }}>
            File selected: {optionalDocData.docFile.fileName}
          </Text>
        )}
      </View>

      <GradientButton
        title={
          isLoading
            ? 'Submitting...'
            : `Submit KYC ${allRequiredCompleted ? '✓' : ''}`
        }
        onPress={handleSubmit}
        disabled={isLoading || !allRequiredCompleted}
      />

      {!allRequiredCompleted && (
        <Text
          style={{
            color: '#FF6B6B',
            textAlign: 'center',
            marginTop: 10,
            fontSize: 12,
          }}
        >
          Please complete all required documents (PAN and Aadhaar) to submit
        </Text>
      )}
    </ScrollView>
  );
};

export default KYC;
