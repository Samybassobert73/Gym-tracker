import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticate: string | null;
}

const initialState: AuthState = {
  accessToken:  null,
  refreshToken:  null,
  isAuthenticate: 'false',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string|null>) => {
      localStorage.setItem('accessToken', action.payload || '');
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string|null>) => {
      localStorage.setItem('refreshToken', action.payload || '');
      state.refreshToken = action.payload;
    },
    setIsAuthenticate: (state, action: PayloadAction<string|null>) => {
      localStorage.setItem('isAuthenticate', action.payload || 'false');
      state.isAuthenticate = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken, setIsAuthenticate } = authSlice.actions;
export default authSlice.reducer;