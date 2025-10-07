// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true, // Start as loading
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      state.isLoading = false;
      console.log('[authSlice] Auth state updated:', action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.isLoading = false;
      console.log('[authSlice] User logged out');
    },
  },
});

export const { setAuth, setLoading, logout } = authSlice.actions;

export default authSlice.reducer;
