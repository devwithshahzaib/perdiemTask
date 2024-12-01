import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  buttons: {
    catch: false,
    team: false,
    settings: false,
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    toggleButton: (state, action) => {
      state.buttons[action.payload] = !state.buttons[action.payload];
    },
  },
});

export const {toggleButton} = homeSlice.actions;
export default homeSlice.reducer;
