import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: JSON.parse(localStorage.getItem("isLogin")) || false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("isLogin", state.value);
    },
  },
});

export const { login } = loginSlice.actions;
export default loginSlice.reducer;
