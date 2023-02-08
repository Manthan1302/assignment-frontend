import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
  name: "admindata-storage",
  initialState: {
    _id: "",
    name: "",
    email: "",
    type: "",
    token: "",
  },

  reducers: {
    adminData: (state, action) => {
      console.log("action: ", action);
    },
  },
});

export const { adminData } = adminDataSlice.actions;
export default adminDataSlice.reducer;
