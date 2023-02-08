import { createSlice } from "@reduxjs/toolkit";

const clientDataSlice = createSlice({
  name: "clientdata-storage",
  initialState: {
    _id: "",
    name: "",
    city: "",
    State: "",
    pincode: "",
    email: "",
    phone: "",
    type: "",
    token: "",
    profession: "",
    workerExperience: "",
  },

  reducers: {
    clientData: (state, action) => {
      console.log("action: ", action);
    },
  },
});

export const { clientData } = clientDataSlice.actions;
export default clientDataSlice.reducer;
