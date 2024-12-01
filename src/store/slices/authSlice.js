import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {setLoggedIn, setUser, logout} = authSlice.actions;
export default authSlice.reducer;
