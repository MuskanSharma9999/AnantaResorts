// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  profilePhoto: '', // Could be a URL or Base64 string
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { name, email, profilePhoto } = action.payload;
      state.name = name || '';
      state.email = email || '';
      state.profilePhoto = profilePhoto || '';
    },
    updateUserName: (state, action) => {
      state.name = action.payload;
    },
    updateUserEmail: (state, action) => {
      state.email = action.payload;
    },
    updateProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
    },
    clearUser: state => {
      state.name = '';
      state.email = '';
      state.profilePhoto = '';
    },
  },
});

export const {
  setUserDetails,
  updateUserName,
  updateUserEmail,
  updateProfilePhoto,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
