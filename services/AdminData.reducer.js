import { createSlice } from "@reduxjs/toolkit";

const adminDataSlice = createSlice({
  name: "admindata-storage",
  initialState: {
    _id: "",
    email: "",
    usertype: "",
    token: "",
  },

  reducers: {
    adminData: (state, action) => {
      console.log("action: ", action);

      const { actor, token } = action.payload;
      console.log("actor: ", actor);

      const { _id, email, usertype } = actor;

      state.token = token;

      state._id = _id;
      state.email = email;
      state.usertype = usertype;
    },
  },
});

export const { adminData } = adminDataSlice.actions;
export default adminDataSlice.reducer;
