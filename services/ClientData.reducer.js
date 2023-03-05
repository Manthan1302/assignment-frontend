import { createSlice } from "@reduxjs/toolkit";

const clientDataSlice = createSlice({
  name: "clientdata-storage",
  initialState: {
    _id: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    city: "",
    State: "",
    pinCode: "",
    profession: "",
    usertype: "client",
    token: "",
  },

  reducers: {
    clientData: (state, action) => {
      // console.log("action: ", action);
      const { token, client } = action.payload;
      console.log("client: ", client);

      state.token = token;
      console.log("state.token client: ", state.token);

      const {
        _id,
        firstName,
        lastName,
        gender,
        email,
        password,
        contactNumber,
        address,
        city,
        pinCode,
        profession,
        usertype,
      } = client;

      const State = client.state;

      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.gender = gender;
      state.email = email;
      state.password = password;
      state.contactNumber = contactNumber;
      state.address = address;
      state.city = city;
      state.pinCode = pinCode;
      state.profession = profession;
      state.State = State;
      state.usertype = usertype;
    },
  },
});

export const { clientData } = clientDataSlice.actions;
export default clientDataSlice.reducer;
