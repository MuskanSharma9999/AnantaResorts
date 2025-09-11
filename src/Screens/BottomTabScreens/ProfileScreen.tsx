import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './ProfileScreenStyles';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import ApiList from '../../Api_List/apiList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  // ✅ All hooks declared at top level
  const [profile_photo_url, setProfile_photo_url] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'Authentication token missing');
          return;
        }

        const res = await axios.get(ApiList.GET_PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const user = res.data.data.user;
          setProfile_photo_url(user.profile_photo_url || null);
          setEmail(user.email || '');
          setName(user.name || '');

          console.log(res)
        } else {
          console.log('Failed to fetch profile');
        }
      } catch (err: any) {
        console.error('Error fetching profile:', err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  // Pick photo from gallery
  const pickImageFromGallery = () => {
    const options = { mediaType: 'photo', quality: 1.0 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets?.[0]?.uri) {
        setProfile_photo_url(response.assets[0].uri);
      }
    });
  };

  // Update profile API
  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token missing');
        return;
      }

      const payload = { email, name, profile_photo_url };

      console.log('[handleUpdateProfile] Sending PUT request...', payload);

      const { data } = await axios.put(ApiList.UPDATE_PROFILE, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        Alert.alert('Success', 'Your profile has been updated!');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error: any) {
      console.error('[handleUpdateProfile] error:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image 
            source={
              profile_photo_url
                ? { uri: profile_photo_url }
                : require('../../assets/images/1.svg')
            }
            style={styles.avatar}
          />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>

          {/* Tap email to open modal */}
          <TouchableOpacity
            onPress={() => {
              setTempEmail(email);
              setIsEmailModalVisible(true);
            }}
          >
            <Text style={[styles.email, { textDecorationLine: 'underline' }]}>
              {email}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Settings Section */}
      <View style={styles.AccountSettingsSection}>
        <Text style={styles.AccountSettingTitle}>Account settings</Text>

        <TouchableOpacity style={styles.menuItem} onPress={pickImageFromGallery}>
          <Text style={styles.menuText}>Update profile photo</Text>
          <Text style={styles.chevron}>></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleUpdateProfile}>
          <Text style={[styles.menuText, { color: 'green' }]}>Save Changes</Text>
          <Text style={styles.chevron}>✓</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Email Update Modal */}
      <Modal visible={isEmailModalVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Update Email
            </Text>
            <TextInput
              value={tempEmail}
              onChangeText={setTempEmail}
              placeholder="Enter new email"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 12,
                borderRadius: 8,
              }}
              onPress={() => {
                setEmail(tempEmail); // update main email state
                setIsEmailModalVisible(false);
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                Save
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => setIsEmailModalVisible(false)}
            >
              <Text style={{ textAlign: 'center', color: 'red' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;





// const handleImagePick = (source, section) => {
//   const options = {
//     mediaType: "photo",
//     quality: 1.0,
//   };

//   const callback = (response) => {
//     if (response.didCancel) {
//       console.log("User cancelled image picker");
//     } else if (response.errorCode) {
//       console.log("ImagePicker Error: ", response.errorCode);
//     } else if (response.assets?.[0]?.uri) {
//       addImageToSection(response.assets[0].uri, section);
//     }
//   };

//   if (source === "camera") {
//     launchCamera(options, callback);
//   } else if (source === "library") {
//     launchImageLibrary(options, callback);
//   }
// };

//   const showImageOptions = (section) => {
//     Alert.alert(
//       "Select Image Source",
//       "",
//       [
//         {
//           text: "Take Photo",
//           onPress: () => handleImagePick("camera", section),
//         },
//         {
//           text: "Choose from Library",
//           onPress: () => handleImagePick("library", section),
//         },
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//         <TouchableOpacity
//         style={[
//           styles.addButton,
//           { borderColor: Txtcolor, backgroundColor: "#333" },
//         ]}
//         onPress={() => showImageOptions(section)}
//       >
//         <Text style={[styles.addButtonText, { color: Txtcolor }]}>+</Text>
//       </TouchableOpacity>

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';

// const ProfileScreen = () => {
//   const [photoUri, setPhotoUri] = useState<string | null>(null);

//   const pickImageFromGallery = () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 1.0,
//     };

//     launchImageLibrary(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         Alert.alert('Error', response.errorMessage || 'Something went wrong');
//       } else if (response.assets?.[0]?.uri) {
//         setPhotoUri(response.assets[0].uri);
//       }
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upload Profile Photo</Text>

//       <TouchableOpacity
//         onPress={pickImageFromGallery}
//         style={styles.imageContainer}
//       >
//         {photoUri ? (
//           <Image source={{ uri: photoUri }} style={styles.image} />
//         ) : (
//           <Text style={styles.placeholder}>Tap to select photo</Text>
//         )}
//       </TouchableOpacity>

//       {photoUri && (
//         <TouchableOpacity
//           style={styles.uploadBtn}
//           onPress={() => Alert.alert('Uploaded!')}
//         >
//           <Text style={styles.uploadText}>Upload</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//     fontWeight: '600',
//   },
//   imageContainer: {
//     width: 150,
//     height: 150,
//     borderRadius: 75,
//     borderWidth: 2,
//     borderColor: '#888',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     marginBottom: 20,
//   },
//   placeholder: {
//     color: '#888',
//     fontSize: 14,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   uploadBtn: {
//     backgroundColor: '#333',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//   },
//   uploadText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
