import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
//import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';

console.log('DocumentPicker:', DocumentPicker);


// Styles inspired by ProfileScreen styles for consistency
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
    fontFamily: 'Cormorant',
    marginBottom: 12,
  },
  inputLabel: {
    color: '#FFE2B8',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Montserrat',
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
    fontFamily: 'Montserrat',
  },
  button: {
    backgroundColor: '#FFE2B8',
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
  },
  picker: {
    color: '#FFE2B8',
    backgroundColor: '#19191A',
    borderRadius: 8,
    marginBottom: 8,
  },
  dropDownContainer: {
    backgroundColor: '#19191A',
    borderColor: '#FFE2B8',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  dropDownTextStyle: {
    color: '#FFE2B8',
    fontFamily: 'Montserrat',
  },
  dropDownLabelStyle: {
    color: '#FFE2B8',
    fontFamily: 'Montserrat',
    fontWeight: '700',
  },
  elementDropdown: {
  backgroundColor: '#19191A',
  borderColor: '#FFE2B8',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 12,
  paddingHorizontal: 12,
  color: '#FFE2B8',
// height:40
},
elementDropdownPlaceholder: {
  color: '#bbb',
  fontFamily: 'Montserrat',
    paddingVertical:10
},
elementDropdownItem: {
  color: '#FFE2B8',
  fontFamily: 'Montserrat',
  fontSize: 15,
},
elementDropdownSelectedTextStyle: {
  color: '#FFE2B8',
  fontWeight: '700',
  fontFamily: 'Montserrat',
  paddingVertical:10
},
elementDropdownIcon: {
  tintColor: '#FFE2B8'
}
};

const KYC = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panCode, setPanCode] = useState('');
  const [aadhaarDoc, setAadhaarDoc] = useState(null);
  const [panDoc, setPanDoc] = useState(null);
  const [physicalCardDoc, setPhysicalCardDoc] = useState(null);

  const [open, setOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [items, setItems] = useState([
    { label: 'Aadhaar Document', value: 'aadhaar' },
    { label: 'PAN Document', value: 'pan' },
    { label: 'Physical Card Document', value: 'physicalCard' },
  ]);

  // const pickDocument = async setDoc => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });
  //     setDoc(res[0]); // Use first selected document
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       console.log('User cancelled document picker');
  //     } else {
  //       Alert.alert('Error', 'Failed to pick document');
  //     }
  //   }
  // };

  const pickDocument = async () => {
    console.log('Picker button pressed');
    console.log('DocumentPicker:', DocumentPicker);
console.log('DocumentPicker.pick:', DocumentPicker?.pick);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (selectedDocType === 'aadhaar') setAadhaarDoc(res[0]);
      else if (selectedDocType === 'pan') setPanDoc(res[0]);
      else if (selectedDocType === 'physicalCard') setPhysicalCardDoc(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.log('Document picker error:', err);
        Alert.alert('Error', 'Failed to pick document');
      }
    }
  };

  const handleSubmit = () => {
    if (aadhaarNumber.length !== 12) {
      Alert.alert('Error', 'Please enter a valid 12-digit Aadhaar number');
      return;
    }
    if (!aadhaarDoc) {
      Alert.alert('Error', 'Please upload Aadhaar document');
      return;
    }
    if (panCode.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-character PAN code');
      return;
    }
    if (!panDoc) {
      Alert.alert('Error', 'Please upload PAN document');
      return;
    }

    Alert.alert('Success', 'KYC details submitted successfully!');
    // Add your backend submit logic here including document upload
  };

  const getSelectedDocName = () => {
    if (selectedDocType === 'aadhaar') return aadhaarDoc?.name || '';
    if (selectedDocType === 'pan') return panDoc?.name || '';
    if (selectedDocType === 'physicalCard') return physicalCardDoc?.name || '';
    return '';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>KYC Verification</Text>

      <Text style={styles.inputLabel}>Aadhaar Number</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Enter Aadhaar Number"
        placeholderTextColor="#bbb"
        keyboardType="numeric"
        maxLength={12}
        value={aadhaarNumber}
        onChangeText={setAadhaarNumber}
      />

      {/* <Text style={styles.inputLabel}>Upload Aadhaar</Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => pickDocument(setAadhaarDoc)}
      >
        <Text style={styles.uploadButtonText}>
          {aadhaarDoc
            ? aadhaarDoc.name || 'Aadhaar Document Selected'
            : 'Choose Aadhaar Document'}
        </Text>
      </TouchableOpacity> */}

      <Text style={styles.inputLabel}>PAN Code</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Enter PAN Code"
        placeholderTextColor="#bbb"
        autoCapitalize="characters"
        maxLength={10}
        value={panCode}
        onChangeText={setPanCode}
      />

      <Text style={styles.inputLabel}>Select Document Type to Upload</Text>
<Dropdown
  data={items}
  labelField="label"
  valueField="value"
  value={selectedDocType}
  onChange={item => setSelectedDocType(item.value)}
  placeholder="Choose Document Type"
  style={styles.elementDropdown}
  itemContainerStyle={{ backgroundColor: '#19191A' }}
  selectedTextStyle={styles.elementDropdownSelectedTextStyle}
  placeholderStyle={styles.elementDropdownPlaceholder}
  containerStyle={styles.elementDropdown}
  itemTextStyle={styles.elementDropdownItem}
  dropdownPosition="auto"
  iconStyle={styles.elementDropdownIcon}
/>

<TouchableOpacity
  style={styles.uploadButton}
  onPress={() => {
    // Optionally close dropdown if open
    setOpen(false);
    pickDocument();
  }}
>
  <Text style={styles.uploadButtonText}>
    {getSelectedDocName() || 'Upload Document'}
  </Text>
</TouchableOpacity>


      {/* <Text style={styles.inputLabel}>Upload PAN</Text> */}
      {/* <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => pickDocument(setPanDoc)}
      >
        <Text style={styles.uploadButtonText}>
          {panDoc
            ? panDoc.name || 'PAN Document Selected'
            : 'Choose PAN Document'}
        </Text>
      </TouchableOpacity> */}
       {/* <Text style={styles.inputLabel}>Select Document Type to Upload</Text>

      <DropDownPicker
        open={open}
        value={selectedDocType}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedDocType}
        setItems={setItems}
        containerStyle={styles.dropDownContainer}
        style={{ backgroundColor: '#19191A' }}
        dropDownContainerStyle={{ backgroundColor: '#19191A' }}
        textStyle={styles.dropDownTextStyle}
        labelStyle={styles.dropDownLabelStyle}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
        <Text style={styles.uploadButtonText}>
          {getSelectedDocName() ? getSelectedDocName() : `Upload ${selectedDocType} Document`}
        </Text>
      </TouchableOpacity> */}
      {/* <Text style={styles.inputLabel}>Upload Physical Card</Text>
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => pickDocument(setPhysicalCardDoc)}
      >
        <Text style={styles.uploadButtonText}>
          {physicalCardDoc
            ? physicalCardDoc.name || 'Physical Card Document Selected'
            : 'Choose Physical Card Document'}
        </Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit KYC</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default KYC;
