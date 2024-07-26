import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    order: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { order } = orderSlice.actions;
export default orderSlice.reducer;
