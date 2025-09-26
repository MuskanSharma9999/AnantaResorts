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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../redux/slices/authSlice';
import { apiRequest } from '../../../Api_List/apiUtils';
import ApiList from '../../../Api_List/apiList';
import { BlurView } from '@react-native-community/blur';
import { clearUser, setUserDetails, updateProfilePhoto } from '../../../redux/slices/userSlice';


const ProfileScreen = () => {
  // ✅ All hooks declared at top level
   // ✅ Get user data from Redux store
  const user = useSelector(state => state.user);
  
  // ✅ Initialize local state with Redux data
  const [profile_photo_url, setProfile_photo_url] = useState(user.profilePhoto || '');
  const [email, setEmail] = useState(user.email || '');
  const [name, setName] = useState(user.name || '');
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);
  const [isKYCSubmitted, setIsKYCSubmitted] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [tempName, setTempName] = useState(name);

  useEffect(() => {
    setProfile_photo_url(user.profilePhoto || '');
    setEmail(user.email || '');
    setName(user.name || '');
  }, [user]);




   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          Alert.alert('Error', 'Authentication token missing');
          return;
        }

        const response = await apiRequest({
          url: ApiList.GET_PROFILE,
          method: 'GET',
          token,
        });

        if (response.success) {
          console.log('response:::::::', response);
          
          const user = response.data.data.user;
          setProfile_photo_url(user.profile_photo_url || '');
          setEmail(user.email || '');
          setName(user.name || '');
          
          // ✅ Update Redux store with fetched data
          dispatch(setUserDetails({
            name: user.name || '',
            email: user.email || '',
            profilePhoto: user.profile_photo_url || ''
          }));
        } else {
          console.log('Failed to fetch profile:', response.error);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        Alert.alert('Error', 'Failed to load profile data');
      }
    };

    fetchProfile();
  }, [dispatch]);

  const pickImageFromGallery = () => {
    const options = { mediaType: 'photo', quality: 1.0 };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Something went wrong');
      } else if (response.assets?.[0]?.uri) {
        const uri = response.assets[0].uri;
        setProfile_photo_url(uri);

        try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
            Alert.alert('Error', 'Authentication token missing');
            return;
          }

          const payload = { email, name, profile_photo_url: uri };

          console.log('[pickImageFromGallery] Sending PUT request...', payload);

          const response = await apiRequest({
            url: ApiList.UPDATE_PROFILE,
            method: 'PUT',
            body: payload,
            token,
          });

          if (response.success) {
            // ✅ Update Redux store with new profile photo
            dispatch(updateProfilePhoto(uri));
            Alert.alert('Success', 'Profile photo updated successfully!');
          } else {
            Alert.alert('Error', response.error || 'Failed to update profile photo');
          }
        } catch (error) {
          console.error('Error updating profile photo:', error);
          Alert.alert('Error', 'Failed to update profile photo');
        }
      }
    });
  };




  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.setItem("isAuth", "false");
              dispatch(setAuth(false));
              // ✅ Clear user data from Redux on logout
              dispatch(clearUser());
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };



  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Authentication token missing');
        return;
      }

      const payload = { email: tempEmail, name: tempName, profile_photo_url };

      console.log('[handleUpdateProfile] Sending PUT request...', payload);

      const response = await apiRequest({
        url: ApiList.UPDATE_PROFILE,
        method: 'PUT',
        body: payload,
        token,
      });

      if (response.success) {
        // ✅ Update Redux store with new data
        dispatch(setUserDetails({
          name: tempName,
          email: tempEmail,
          profilePhoto: profile_photo_url
        }));
        
        // ✅ Update local state
        setName(tempName);
        setEmail(tempEmail);
        
        Alert.alert('Success', 'Your profile has been updated!');
        setIsProfileModalVisible(false);
        navigation.navigate('MainTabs', { profileUpdated: true });
      } else {
        Alert.alert('Error', response.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('[handleUpdateProfile] error:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };


  return (
 <ScrollView style={styles.container}>
      {/* Profile Header */}
      {(name || email || profile_photo_url) && (
        <TouchableOpacity
          onPress={() => {
            setTempEmail(email);
            setTempName(name);
            setIsProfileModalVisible(true);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={
                  profile_photo_url
                    ? { uri: profile_photo_url }
                    : require('../../../assets/images/ProfileIcon.svg')
                }
                style={styles.avatar}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={[styles.email, { textDecorationLine: 'underline' }]}>
                {email}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}



      {/* Account Settings Section */}
      <View style={styles.AccountSettingsSection}>
        <Text style={styles.AccountSettingTitle}>Account settings</Text>

        <TouchableOpacity style={styles.menuItem} onPress={pickImageFromGallery}>
          <Text style={styles.menuText}>Update profile photo</Text>
          <Text style={styles.chevron}>></Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} 
          onPress={() =>
            navigation.navigate('KYC', {
              onKYCSubmit: () => setIsKYCSubmitted(true),
            })
          }>
          <Text style={[styles.menuText, styles.logoutText]}>KYC</Text>
          <Text style={styles.chevron}>  {isKYCSubmitted ? '✓' : '>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Email Update Modal */}

   <Modal visible={isProfileModalVisible} transparent animationType="slide">
        <BlurView
          style={{ flex: 1 }}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '85%', backgroundColor: 'black', padding: 20, borderRadius: 10, borderColor: '#FBCF9C', borderWidth: 1.5 }}>
              <Text style={{ fontFamily: 'Cormorant-Bold', fontSize: 18, color: '#FBCF9C', marginBottom: 10 }}>
                Edit Profile
              </Text>

              <TextInput
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter name"
                placeholderTextColor="#999"
                style={{ borderWidth: 1, borderColor: '#FBCF9C', borderRadius: 8, padding: 10, marginBottom: 10, color: '#FBCF9C' }}
              />
              <TextInput
                value={tempEmail}
                onChangeText={setTempEmail}
                placeholder="Enter email"
                keyboardType="email-address"
                placeholderTextColor="#999"
                style={{ borderWidth: 1, borderColor: '#FBCF9C', borderRadius: 8, padding: 10, marginBottom: 15, color: '#FBCF9C' }}
              />

              <TouchableOpacity
                style={{ backgroundColor: 'green', padding: 12, borderRadius: 8 }}
                onPress={handleUpdateProfile} // Use the function directly
              >
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>
                  Save
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginTop: 10 }}
                onPress={() => setIsProfileModalVisible(false)}
              >
                <Text style={{ textAlign: 'center', color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>


    </ScrollView>
  );
};

export default ProfileScreen;




  // Update profile API
  // const handleUpdateProfile = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     if (!token) {
  //       Alert.alert('Error', 'Authentication token missing');
  //       return;
  //     }

  //     const payload = { email, name, profile_photo_url };

  //     console.log('[handleUpdateProfile] Sending PUT request...', payload);

  //     const { data } = await axios.put(ApiList.UPDATE_PROFILE, payload, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (data.success) {
  //       Alert.alert('Success', 'Your profile has been updated!');
  //     } else {
  //       Alert.alert('Error', data.message || 'Something went wrong');
  //     }
  //   } catch (error: any) {
  //     console.error('[handleUpdateProfile] error:', error.response?.data || error.message);
  //     Alert.alert(
  //       'Error',
  //       error.response?.data?.message || 'Failed to update profile'
  //     );
  //   }
  // };




//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         Alert.alert('Error', 'Authentication token missing');
//         console.log('Error: Authentication token missing');
//         return;
//       }
      
//       const res = await axios.get(ApiList.GET_PROFILE, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Log full response for debugging
//       console.log('get user data', res);

//       if (res.data?.success) {
//         const user = res.data.data.user;
//         setProfile_photo_url(user.profile_photo_url || null);
//         setEmail(user.email || '');
//         setName(user.name || '');
//       } else {
//         console.log('Failed to fetch profile:', res.data);
//       }
//     } catch (err) {
//       // Log detailed error info for Axios and non-Axios errors
//       if (err.response) {
//         // Axios error with a server response
//         console.error('Error fetching profile:', err.response.data);
//         console.log('Full error object:', err);
//       } else {
//         // Other errors: network, parsing, etc.
//         console.error('Error fetching profile:', err.message);
//         console.log('Full error object:', err);
//       }
//     }
//   };

//   fetchProfile();
// }, []);


  // Pick photo from gallery
//   const pickImageFromGallery = () => {
//   const options = { mediaType: 'photo', quality: 1.0 };
//   launchImageLibrary(options, async (response) => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.errorCode) {
//       Alert.alert('Error', response.errorMessage || 'Something went wrong');
//     } else if (response.assets?.[0]?.uri) {
//       const uri = response.assets[0].uri;
//       setProfile_photo_url(uri); // update photo url in state immediately

//       // Call update profile API to save changes including new photo
//       try {
//         const token = await AsyncStorage.getItem('token');
//         if (!token) {
//           Alert.alert('Error', 'Authentication token missing');
//           return;
//         }

//         const payload = { email, name, profile_photo_url: uri };

//         console.log('[pickImageFromGallery] Sending PUT request...', payload);

//         const { data } = await axios.put(ApiList.UPDATE_PROFILE, payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (data.success) {
//           Alert.alert('Success', 'Profile photo updated successfully!');
//         } else {
//           Alert.alert('Error', data.message || 'Failed to update profile photo');
//         }
//       } catch (error: any) {
//         console.error('Error updating profile photo:', error.response?.data || error.message);
//         Alert.alert(
//           'Error',
//           error.response?.data?.message || 'Failed to update profile photo'
//         );
//       }
//     }
//   });
// };


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
