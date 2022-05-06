import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: function (state) {
      state.value += 1;
    },
    decrement: function (state) {
      state.value -= 1;
    },
    setValue: function (state, action) {
      state.value = action.payload;
    },
  },
});

export default counterSlice.reducer;
export const { increment, decrement, setValue } = counterSlice.actions;
