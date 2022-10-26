import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userData: null,
  hasFinishSetup: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => ({
      ...state,
      token: action.payload,
    }),
    setUserInfo: (state, action) => ({
      ...state,
      userData: action.payload,
    }),
    logout: (state) => ({
      ...state,
      token: null,
      userData: null,
    }),
    setHasFinishSetup: (state, action) => ({
      ...state,
      hasFinishSetup: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const {
  login, setUserInfo, logout, setHasFinishSetup,
} = authSlice.actions;

export default authSlice.reducer;
