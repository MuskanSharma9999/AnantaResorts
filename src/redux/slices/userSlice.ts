import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  activeMembership: '',
  profilePhoto: '',
  kycStatus: '', // <-- add this
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { name, email, profilePhoto, activeMembership, kycStatus } =
        action.payload;
      state.name = name || '';
      state.email = email || '';
      state.profilePhoto = profilePhoto || '';
      state.activeMembership = activeMembership || '';
      state.kycStatus = kycStatus || ''; // <-- add this
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
    updateActiveMembership: (state, action) => {
      state.activeMembership = action.payload;
    },
    updateKycStatus: (state, action) => {
      state.kycStatus = action.payload; // <-- add this
    },
    clearUser: state => {
      state.name = '';
      state.email = '';
      state.profilePhoto = '';
      state.activeMembership = '';
      state.kycStatus = ''; // <-- add this
    },
  },
});

export const {
  setUserDetails,
  updateUserName,
  updateUserEmail,
  updateProfilePhoto,
  updateActiveMembership,
  updateKycStatus,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
