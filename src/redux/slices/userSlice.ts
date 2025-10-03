// redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../utils/userService';

const initialState = {
  name: '',
  email: '',
  activeMembership: '',
  profilePhoto: '',
  kycStatus: '',
  isLoading: false,
  error: null,
  lastUpdated: null,
};

// ✅ Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (forceRefresh = false, { rejectWithValue }) => {
    try {
      const result = await userService.fetchUserProfile(forceRefresh);

      if (!result.success) {
        return rejectWithValue(result.error);
      }

      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
      state.kycStatus = kycStatus || '';
      state.lastUpdated = Date.now();
      state.error = null;
    },
    updateUserName: (state, action) => {
      state.name = action.payload;
      state.lastUpdated = Date.now();
    },
    updateUserEmail: (state, action) => {
      state.email = action.payload;
      state.lastUpdated = Date.now();
    },
    updateProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
      state.lastUpdated = Date.now();
      // Update cache optimistically
      userService.updateCache({ profilePhoto: action.payload });
    },
    updateActiveMembership: (state, action) => {
      state.activeMembership = action.payload;
      state.lastUpdated = Date.now();
      // Update cache optimistically
      userService.updateCache({ activeMembership: action.payload });
    },
    updateKycStatus: (state, action) => {
      state.kycStatus = action.payload;
      state.lastUpdated = Date.now();
    },
    clearUser: state => {
      state.name = '';
      state.email = '';
      state.profilePhoto = '';
      state.activeMembership = '';
      state.kycStatus = '';
      state.isLoading = false;
      state.error = null;
      state.lastUpdated = null;
      // Clear service cache
      userService.clearCache();
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch user profile - pending
      .addCase(fetchUserProfile.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      // Fetch user profile - fulfilled
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name || '';
        state.email = action.payload.email || '';
        state.profilePhoto = action.payload.profilePhoto || '';
        state.activeMembership = action.payload.activeMembership || '';
        state.kycStatus = action.payload.kycStatus || '';
        state.error = null;
      })
      // Fetch user profile - rejected
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user profile';
      });
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
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
