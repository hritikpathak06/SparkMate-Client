import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  userData: null,
  error: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
