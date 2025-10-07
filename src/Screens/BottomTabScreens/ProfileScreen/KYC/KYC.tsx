import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import GradientButton from '../../../../components/Buttons/GradientButton';
import axios from 'axios';
import ApiList from '../../../../Api_List/apiList';
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
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  fileNameText: {
    color: '#FFE2B8',
    fontSize: 12,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginTop: 5,
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
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Cormorant-Bold',
    marginBottom: 8,
  },
  statusContainer: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Cormorant-Bold',
    textAlign: 'center',
  },
  statusSubText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  // Verified Style
  verifiedContainer: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: '#22c55e',
  },
  verifiedText: {
    color: '#22c55e',
  },
  verifiedSubText: {
    color: '#22c55e',
  },
  // Pending Style
  pendingContainer: {
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
    borderColor: '#eab308',
  },
  pendingText: {
    color: '#eab308',
  },
  pendingSubText: {
    color: '#eab308',
  },
  // Rejected Style
  rejectedContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: '#ef4444',
  },
  rejectedText: {
    color: '#ef4444',
  },
  rejectedSubText: {
    color: '#ef4444',
  },
  // Expired Style
  expiredContainer: {
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderColor: '#f97316',
  },
  expiredText: {
    color: '#f97316',
  },
  expiredSubText: {
    color: '#f97316',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    fontFamily: 'Montserrat',
    marginTop: 4,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFE2B8',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
};

const KYC = () => {
  // Get KYC status from Redux store
  const { kycStatus } = useSelector(state => state.user);

  // State variables
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [aadhaarImageUri, setAadhaarImageUri] = useState(null);

  const [panNumber, setPanNumber] = useState('');
  const [panFile, setPanFile] = useState(null);
  const [panImageUri, setPanImageUri] = useState(null);

  const [selectedDocType, setSelectedDocType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const documentTypes = [
    { label: 'Aadhaar Card', value: 'Aadhaar Card' },
    { label: 'PAN Card', value: 'PAN Card' },
    { label: 'Physical Card', value: 'PAN Card' },
  ];

  // Check KYC status
  const isKYCVerified = kycStatus === 'verified' || kycStatus === 'approved';
  const isKYCPending = kycStatus === 'pending' || kycStatus === 'under_review';
  const isKYCRejected = kycStatus === 'rejected' || kycStatus === 'failed';
  const isKYCExpired = kycStatus === 'expired';

  // Clear errors when inputs change
  useEffect(() => {
    if (
      errors.aadhaarNumber &&
      aadhaarNumber &&
      validateAadhaar(aadhaarNumber)
    ) {
      setErrors(prev => ({ ...prev, aadhaarNumber: '' }));
    }
    if (errors.panNumber && panNumber && validatePAN(panNumber)) {
      setErrors(prev => ({ ...prev, panNumber: '' }));
    }
    if (errors.documentType && selectedDocType) {
      setErrors(prev => ({ ...prev, documentType: '' }));
    }
    if (errors.documentFile && (aadhaarFile || panFile)) {
      setErrors(prev => ({ ...prev, documentFile: '' }));
    }
  }, [aadhaarNumber, panNumber, selectedDocType, aadhaarFile, panFile]);

  const pickDocument = type => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Error', 'Failed to pick image');
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        const fileData = {
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName || `${type.toLowerCase()}_${Date.now()}.jpg`,
          size: asset.fileSize,
        };

        if (type === 'Aadhaar') {
          setAadhaarFile(fileData);
          setAadhaarImageUri(asset.uri);
        } else if (type === 'PAN') {
          setPanFile(fileData);
          setPanImageUri(asset.uri);
        }
      }
    });
  };

  const validateAadhaar = aadhaar => {
    return /^\d{12}$/.test(aadhaar);
  };

  const validatePAN = pan => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedDocType) {
      newErrors.documentType = 'Please select a document type';
    }

    if (selectedDocType === 'Aadhaar Card') {
      if (!aadhaarNumber) {
        newErrors.aadhaarNumber = 'Please enter Aadhaar number';
      } else if (!validateAadhaar(aadhaarNumber)) {
        newErrors.aadhaarNumber =
          'Please enter a valid 12-digit Aadhaar number';
      }

      if (!aadhaarFile) {
        newErrors.documentFile = 'Please upload Aadhaar Card document image';
      }
    }

    if (selectedDocType === 'PAN Card') {
      if (!panNumber) {
        newErrors.panNumber = 'Please enter PAN number';
      } else if (!validatePAN(panNumber)) {
        newErrors.panNumber =
          'Please enter a valid PAN number (e.g., ABCDE1234F)';
      }

      if (!panFile) {
        newErrors.documentFile = 'Please upload PAN Card document image';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    // Append common fields
    formData.append('document_type_id', selectedDocType);

    if (selectedDocType === 'Aadhaar Card') {
      formData.append('document_number', aadhaarNumber);
      formData.append('document', {
        uri: aadhaarFile.uri,
        type: aadhaarFile.type || 'image/jpeg',
        name: aadhaarFile.name,
      });
    } else if (selectedDocType === 'PAN Card') {
      formData.append('document_number', panNumber);
      formData.append('document', {
        uri: panFile.uri,
        type: panFile.type || 'image/jpeg',
        name: panFile.name,
      });
    }

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        Alert.alert(
          'Error',
          'Authentication token not found. Please login again.',
        );
        setIsLoading(false);
        return;
      }

      console.log('KYC Upload - API Endpoint:', ApiList.UPDATE_KYC);
      console.log('KYC Upload - Form Data:', {
        document_type_id: selectedDocType,
        document_number:
          selectedDocType === 'Aadhaar Card' ? aadhaarNumber : panNumber,
        hasFile: !!(aadhaarFile || panFile),
      });

      const response = await axios.post(ApiList.UPDATE_KYC, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        timeout: 30000, // 30 seconds timeout
      });

      console.log('KYC Upload Success:', response.data);
      Alert.alert('Success', 'KYC documents submitted successfully!');

      // Reset form fields after success
      setSelectedDocType('');
      setAadhaarNumber('');
      setAadhaarFile(null);
      setAadhaarImageUri(null);
      setPanNumber('');
      setPanFile(null);
      setPanImageUri(null);
      setErrors({});
    } catch (error) {
      console.error('KYC Upload Error:', error);

      let errorMessage = 'Failed to upload KYC data';

      if (error.response) {
        // Server responded with error status
        console.error('KYC Upload Error Details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });

        if (error.response.status === 404) {
          errorMessage =
            'KYC service is currently unavailable. Please try again later.';
        } else if (error.response.status === 401) {
          errorMessage = 'Authentication failed. Please login again.';
        } else if (error.response.status === 413) {
          errorMessage = 'File size too large. Please upload a smaller image.';
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // Request made but no response received
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
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

  const renderStatusMessage = () => {
    if (isKYCVerified) {
      return (
        <View style={[styles.statusContainer, styles.verifiedContainer]}>
          <Text style={[styles.statusText, styles.verifiedText]}>
            ✅ KYC Verified Successfully
          </Text>
          <Text style={[styles.statusSubText, styles.verifiedSubText]}>
            Your KYC verification has been completed and approved. You can now
            enjoy all the features of our platform.
          </Text>
        </View>
      );
    }

    if (isKYCPending) {
      return (
        <View style={[styles.statusContainer, styles.pendingContainer]}>
          <Text style={[styles.statusText, styles.pendingText]}>
            ⏳ KYC Under Review
          </Text>
          <Text style={[styles.statusSubText, styles.pendingSubText]}>
            Your KYC documents are currently under review. This process usually
            takes 24-48 hours. You'll be notified once the verification is
            complete.
          </Text>
        </View>
      );
    }

    if (isKYCRejected) {
      return (
        <View style={[styles.statusContainer, styles.rejectedContainer]}>
          <Text style={[styles.statusText, styles.rejectedText]}>
            ❌ KYC Verification Failed
          </Text>
          <Text style={[styles.statusSubText, styles.rejectedSubText]}>
            Your KYC verification has been rejected. Please check your documents
            and submit again with correct information.
          </Text>
        </View>
      );
    }

    if (isKYCExpired) {
      return (
        <View style={[styles.statusContainer, styles.expiredContainer]}>
          <Text style={[styles.statusText, styles.expiredText]}>
            📅 KYC Expired
          </Text>
          <Text style={[styles.statusSubText, styles.expiredSubText]}>
            Your KYC verification has expired. Please submit your documents
            again to continue using all platform features.
          </Text>
        </View>
      );
    }

    return null;
  };

  const renderKYCForm = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Submitting KYC...</Text>
        </View>
      );
    }

    return (
      <>
        <Text style={styles.inputLabel}>Select Document Type</Text>
        <Dropdown
          data={documentTypes}
          labelField="label"
          valueField="value"
          value={selectedDocType}
          onChange={item => {
            setSelectedDocType(item.value);
            setAadhaarNumber('');
            setAadhaarFile(null);
            setAadhaarImageUri(null);
            setPanNumber('');
            setPanFile(null);
            setPanImageUri(null);
            setErrors({});
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
        {errors.documentType && (
          <Text style={styles.errorText}>{errors.documentType}</Text>
        )}

        {/* Aadhaar Card Section */}
        {selectedDocType === 'Aadhaar Card' && (
          <View style={styles.documentSection}>
            <Text style={styles.sectionHeader}>Aadhaar Card Details</Text>

            <Text style={styles.inputLabel}>Aadhaar Number</Text>
            <TextInput
              style={[
                styles.inputField,
                errors.aadhaarNumber && { borderColor: '#ef4444' },
              ]}
              placeholder="Enter 12-digit Aadhaar Number"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              maxLength={12}
              value={aadhaarNumber}
              onChangeText={setAadhaarNumber}
            />
            {errors.aadhaarNumber && (
              <Text style={styles.errorText}>{errors.aadhaarNumber}</Text>
            )}

            <View style={{ marginTop: 12 }}>
              <Text style={styles.inputLabel}>
                Upload Aadhaar Card Document
              </Text>
              <TouchableOpacity onPress={() => pickDocument('Aadhaar')}>
                <Text
                  style={[
                    styles.uploadButtonText,
                    errors.documentFile && { borderColor: '#ef4444' },
                  ]}
                >
                  {aadhaarFile
                    ? 'Change Aadhaar Card Image'
                    : 'Choose Aadhaar Card Image'}
                </Text>
              </TouchableOpacity>
              {errors.documentFile && (
                <Text style={styles.errorText}>{errors.documentFile}</Text>
              )}

              {aadhaarImageUri && (
                <View>
                  <Image
                    source={{ uri: aadhaarImageUri }}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.fileNameText}>
                    {aadhaarFile?.name || 'Aadhaar Card Document'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* PAN Card Section */}
        {selectedDocType === 'PAN Card' && (
          <View style={styles.documentSection}>
            <Text style={styles.sectionHeader}>PAN Card Details</Text>

            <Text style={styles.inputLabel}>PAN Number</Text>
            <TextInput
              style={[
                styles.inputField,
                errors.panNumber && { borderColor: '#ef4444' },
              ]}
              placeholder="Enter PAN Number (e.g., ABCDE1234F)"
              placeholderTextColor="#bbb"
              autoCapitalize="characters"
              maxLength={10}
              value={panNumber}
              onChangeText={text => setPanNumber(text.toUpperCase())}
            />
            {errors.panNumber && (
              <Text style={styles.errorText}>{errors.panNumber}</Text>
            )}

            <View style={{ marginTop: 12 }}>
              <Text style={styles.inputLabel}>Upload PAN Card Document</Text>
              <TouchableOpacity onPress={() => pickDocument('PAN')}>
                <Text
                  style={[
                    styles.uploadButtonText,
                    errors.documentFile && { borderColor: '#ef4444' },
                  ]}
                >
                  {panFile ? 'Change PAN Card Image' : 'Choose PAN Card Image'}
                </Text>
              </TouchableOpacity>
              {errors.documentFile && (
                <Text style={styles.errorText}>{errors.documentFile}</Text>
              )}

              {panImageUri && (
                <View>
                  <Image
                    source={{ uri: panImageUri }}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.fileNameText}>
                    {panFile?.name || 'PAN Card Document'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        <GradientButton
          title={
            isKYCRejected
              ? 'Resubmit KYC'
              : isKYCExpired
              ? 'Renew KYC'
              : 'Submit KYC'
          }
          onPress={handleSubmit}
          disabled={isLoading}
        />
      </>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>KYC Verification</Text>

      {/* Show status message for all states */}
      {renderStatusMessage()}

      {/* Show KYC form for pending, rejected, expired, or no status */}
      {(isKYCPending || isKYCRejected || isKYCExpired || !kycStatus) &&
        renderKYCForm()}
    </ScrollView>
  );
};

export default KYC;
