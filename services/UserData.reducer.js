import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "Userdata-storage",
  initialState: {
    _id: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    phoneNumber: "",
    area: "",
    address: "",
    city: "",
    pincode: "",
    profession: "",
    experience: "",
    about: "",
    usertype: "",
    workDemo: "",
    token: "",
  },

  reducers: {
    userData: (state, action) => {
      console.log("action: ", action);
      const { token, user } = action.payload;
      console.log("user: ", user);
      state.token = token;
      console.log("state.token user: ", state.token);
      const {
        _id,
        firstName,
        lastName,
        gender,
        email,
        password,
        phoneNumber,
        area,
        address,
        city,
        pincode,
        profession,
        experience,
        about,
        usertype,
        workDemo,
      } = user;
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.gender = gender;
      state.email = email;
      state.password = password;
      state.phoneNumber = phoneNumber;
      state.area = area;
      state.address = address;
      state.city = city;
      state.pincode = pincode;
      state.profession = profession;
      state.experience = experience;
      state.about = about ? about : "";
      state.usertype = usertype;
      state.workDemo = workDemo ? workDemo : "";
    },
  },
});

export const { userData } = userDataSlice.actions;
export default userDataSlice.reducer;
