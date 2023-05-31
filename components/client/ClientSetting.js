import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  BackHandler,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Malesymbol from "../../images/malesymbol.png";
import Femalesymbol from "../../images/femalesymbol.png";
import {
  UserIcon,
  UserGroupIcon,
  PowerIcon,
  ClipboardDocumentListIcon,
  BellAlertIcon,
  CreditCardIcon,
  BanknotesIcon,
  NewspaperIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  Bars3CenterLeftIcon,
  InformationCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import { clientData } from "../../services/ClientData.reducer";
import {
  editClientPassService,
  editClientService,
} from "../../services/oneForAll";

const ClientSetting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Exiting the application", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `My Profile`,
      headerShown: true,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  const fname = useSelector((state) => state.client).firstName;
  const lname = useSelector((state) => state.client).lastName;
  const gender = useSelector((state) => state.client).gender;
  const email = useSelector((state) => state.client).email;
  const phone = useSelector((state) => state.client).contactNumber;
  const address = useSelector((state) => state.client).address;
  const city = useSelector((state) => state.client).city;
  const state = useSelector((state) => state.client).State;
  const pincode = useSelector((state) => state.client).pinCode;
  const profession = useSelector((state) => state.client).profession;

  // edit user
  const [editData, setEditData] = useState({
    fname: fname,
    lname: lname,
    email: email,
    phone: phone.toString(),
    address: address,
    city: city,
    pincode: pincode.toString(),
    profession: profession,
    state: state,
  });
  const [editDataModal, setFieldsModal] = useState(false);

  // edit loader state
  const [editLoader, setEditLoad] = useState(false);

  // edit pass
  const [newPass, setNewPass] = useState("");
  const [editPassModal, setEditPassModal] = useState(false);
  const [pwd, showPwd] = useState(true);

  const logOut = () => {
    const onClickOk = () => {
      const _id = "";
      const firstName = "";
      const lastName = "";
      const gender = "";
      const email = "";
      const password = "";
      const contactNumber = "";
      const address = "";
      const city = "";
      const State = "";
      const pinCode = "";
      const profession = "";
      const usertype = "client";
      const token = "";

      const client = {
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
      };

      dispatch(clientData({ client, token }));
      ToastAndroid.show(
        `Log out Successfull!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      navigation.navigate("Login");
    };

    Alert.alert("Log out", "Are you sure , you want to log out ?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => onClickOk(),
      },
    ]);
  };

  const editPass = async () => {
    console.log("newPass: ", newPass);

    if (newPass === "") {
      return ToastAndroid.show(
        `no password added!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    setEditLoad(true);

    console.log("_id: ", _id);

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const result = await editClientPassService({ _id, headers, newPass });

    const { updated, error } = result;

    if (error) {
      setEditLoad(false);
      setNewPass("");

      return ToastAndroid.show(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (updated) {
      setEditLoad(false);
      setEditPassModal(false);
      setNewPass("");
      const {
        _id,
        firstName,
        lastName,
        gender,
        profilePic,
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
      } = updated;

      const user = {
        _id,
        firstName,
        lastName,
        gender,
        profilePic,
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
      };

      dispatch(userData({ user, token }));

      return ToastAndroid.show(
        `password updated successfully!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const setFields = async (text, name) => {
    setEditData({ ...editData, [name]: text });
  };

  const editUser = async () => {
    console.log("editData: ", editData);

    const onClickOk = async () => {
      setEditLoad(true);

      console.log("_id: ", _id);

      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const result = await editClientService({ _id, headers, editData });

      const { updated, error } = result;

      if (error) {
        setEditLoad(false);
        setNewPass("");

        return ToastAndroid.show(
          `${error}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      if (updated) {
        setEditLoad(false);
        setEditPassModal(false);
        setNewPass("");
        const {
          _id,
          firstName,
          lastName,
          gender,
          profilePic,
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
        } = updated;

        const user = {
          _id,
          firstName,
          lastName,
          gender,
          profilePic,
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
        };

        dispatch(userData({ user, token }));

        setFieldsModal(false);

        return ToastAndroid.show(
          `profile updated successfully!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    };

    Alert.alert(
      "Accept Order",
      "Are you sure , you want to edit your profile?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => onClickOk(),
        },
      ]
    );
  };

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            setEditData({
              fname: fname,
              lname: lname,
              email: email,
              phone: phone.toString(),
              address: address,
              city: city,
              pincode: pincode.toString(),
              profession: profession,
              state: state,
            });
          }}
        />
      }
    >
      {loader ? (
        <Modal
          transparent={true}
          style={{ justifyContent: "space-around", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFFaa",
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#E90064",
                height: 70,
                width: 70,
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 5,
                borderColor: "white",
                borderWidth: 2,
              }}
            >
              <ActivityIndicator size={30} color={"white"} />
            </View>
          </View>
        </Modal>
      ) : (
        <SafeAreaView style={{ marginBottom: 100, marginTop: -18 }}>
          {/* parent */}
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                // backgroundColor: "orange",
                width: "97%",
                height: "100%",
                // shadowColor: "#52006A",
                // elevation: 20,
                padding: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* profile details */}
                <View
                  style={{
                    backgroundColor: "white",
                    width: 230,
                    justifyContent: "space-around",
                    padding: 12,
                    borderRadius: 9,
                    shadowColor: "#748c94",
                    elevation: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      // backgroundColor: "#E90064",
                      backgroundColor: "white",
                      width: 200,
                      padding: 5,
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Text style={{ fontSize: 20, color: "#E90064" }}>
                      {" "}
                      {fname}{" "}
                    </Text>
                    <Text style={{ fontSize: 20, color: "#E90064" }}>
                      {lname}
                    </Text>
                    <Image
                      source={gender === "male" ? Malesymbol : Femalesymbol}
                      style={{ height: 25, width: 25, tintColor: "aqua" }}
                    />
                  </View>
                  <Text style={{ fontSize: 16 }}>{email} </Text>
                  <Text style={{ fontSize: 16 }}>{phone} </Text>
                  <Text style={{ fontSize: 16 }}>{address} </Text>
                  <Text style={{ fontSize: 16 }}>{city} </Text>
                  <Text style={{ fontSize: 16 }}>{pincode} </Text>
                  <Text style={{ fontSize: 16 }}>{state} </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: 140,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{profession} </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E90064",
                      height: 50,
                      // width: 120,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      borderRadius: 9,
                    }}
                    onPress={() => setEditPassModal(true)}
                  >
                    <Text style={{ fontSize: 16, color: "white" }}>
                      Change password
                    </Text>
                    <PencilSquareIcon size={20} color={"white"} />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#E90064",
                        height: 50,
                        width: 78,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        borderRadius: 9,
                      }}
                      onPress={() => setFieldsModal(true)}
                    >
                      <Text style={{ fontSize: 16, color: "white" }}>edit</Text>
                      <PencilSquareIcon size={20} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#E90064",
                        height: 50,
                        width: 100,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        borderRadius: 9,
                      }}
                      onPress={() => logOut()}
                    >
                      <Text style={{ fontSize: 16, color: "white" }}>
                        Logout
                      </Text>
                      <PowerIcon size={20} color={"white"} />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* extra buttons */}
                <View
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: 150,
                    height: 600,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 70,
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: 110,
                      height: 100,
                      borderRadius: 8,
                      shadowColor: "#748c94",
                      elevation: 20,
                    }}
                    onPress={() =>
                      navigation.navigate("FunctionalPageClient", {
                        screenName: "Project History",
                      })
                    }
                  >
                    <ClipboardDocumentListIcon size={30} color={"#E90064"} />
                    <Text style={{ fontSize: 16 }}>Project history</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 70,
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: 110,
                      height: 100,
                      borderRadius: 8,
                      shadowColor: "#748c94",
                      elevation: 20,
                    }}
                    onPress={() =>
                      navigation.navigate("FunctionalPageClient", {
                        screenName: "Notifications",
                      })
                    }
                  >
                    <BellAlertIcon size={30} color={"#E90064"} />
                    <Text style={{ fontSize: 16 }}>Notifications</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 70,
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: 110,
                      height: 100,
                      borderRadius: 8,
                      shadowColor: "#748c94",
                      elevation: 20,
                    }}
                    onPress={() =>
                      navigation.navigate("FunctionalPageClient", {
                        screenName: "Payments",
                      })
                    }
                  >
                    <CreditCardIcon size={30} color={"#E90064"} />
                    <Text style={{ fontSize: 16 }}>Payments</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 70,
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      width: 110,
                      height: 100,
                      borderRadius: 8,
                      shadowColor: "#748c94",
                      elevation: 20,
                    }}
                    onPress={() =>
                      navigation.navigate("FunctionalPageClient", {
                        screenName: "Privacy Policy",
                      })
                    }
                  >
                    <Bars3CenterLeftIcon size={30} color={"#E90064"} />
                    <Text style={{ fontSize: 16 }}>Privacy policy.</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 70,
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: 110,
                      height: 100,
                      borderRadius: 8,
                      shadowColor: "#748c94",
                      elevation: 20,
                    }}
                    onPress={() =>
                      navigation.navigate("FunctionalPageClient", {
                        screenName: "Terms & Conditions",
                      })
                    }
                  >
                    <NewspaperIcon size={30} color={"#E90064"} />
                    <Text style={{ fontSize: 16 }}>T&C apply*</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* informativebuttons */}
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  // width: 150,
                  minHeight: 250,
                  // backgroundColor: "green",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    height: 70,
                    alignItems: "center",
                    width: 350,
                    height: 100,
                    borderRadius: 8,
                    shadowColor: "#748c94",
                    elevation: 15,
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    navigation.navigate("FunctionalPageClient", {
                      screenName: "About Taskify",
                    })
                  }
                >
                  <InformationCircleIcon
                    size={30}
                    color={"#E90064"}
                    style={{ paddingLeft: 60, paddingRight: 60 }}
                  />
                  <Text style={{ fontSize: 16 }}>About Taskify</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    height: 70,
                    alignItems: "center",

                    width: 350,
                    height: 100,
                    borderRadius: 8,
                    shadowColor: "#748c94",
                    elevation: 15,
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    navigation.navigate("FunctionalPageClient", {
                      screenName: "Customer Support",
                    })
                  }
                >
                  <UserGroupIcon
                    size={30}
                    color={"#E90064"}
                    style={{ paddingLeft: 60, paddingRight: 60 }}
                  />
                  <Text style={{ fontSize: 16 }}>Customer support</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}

      {/* edit password model */}
      {editPassModal ? (
        <Modal
          transparent={true}
          style={{ justifyContent: "space-around", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFFaa",
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#E90064",
                height: 270,
                width: 300,
                justifyContent: "space-around",
                alignItems: "center",
                // flexDirection: "row",
                borderRadius: 5,
                borderColor: "white",
                borderWidth: 2,
              }}
            >
              <View
                style={{
                  width: 270,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{ backgroundColor: "white", borderRadius: 3 }}
                  onPress={() => setEditPassModal(false)}
                >
                  <XMarkIcon color={"#E90064"} size={40} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 180,
                  width: 270,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "white",
                  }}
                >
                  New Password
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: 280,
                  }}
                >
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 200,
                      borderRadius: 3,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    onChangeText={(text) => setNewPass(text)}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      borderRadius: 3,
                      height: 40,
                      width: 40,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onPress={() =>
                      pwd === false ? showPwd(true) : showPwd(false)
                    }
                  >
                    {pwd === false ? (
                      <EyeSlashIcon size={35} color={"#E90064"} />
                    ) : (
                      <EyeIcon size={35} color={"#E90064"} />
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    backgroundColor: "white",
                    width: 90,
                    height: 40,
                    borderRadius: 3,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderColor: "#E90064",
                    borderWidth: 2,
                  }}
                  onPress={() => editPass()}
                >
                  {editLoader ? (
                    <ActivityIndicator color={"#E90064"} size={30} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "300",
                      }}
                    >
                      done!
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        ""
      )}

      {/* edit user data model */}
      {editDataModal ? (
        <Modal
          transparent={true}
          style={{ justifyContent: "space-around", alignItems: "center" }}
        >
          {console.log("user data modal :", editData)}
          <View
            style={{
              backgroundColor: "#FFFFFFaa",
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#E90064",
                height: 600,
                width: 350,
                justifyContent: "space-around",
                alignItems: "center",
                // flexDirection: "row",
                borderRadius: 5,
                borderColor: "white",
                borderWidth: 2,
              }}
            >
              {/* x,mark icon */}
              <View
                style={{
                  width: 300,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{ backgroundColor: "white", borderRadius: 3 }}
                  onPress={() => setFieldsModal(false)}
                >
                  <XMarkIcon color={"#E90064"} size={40} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 500,
                  width: 270,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                    color: "white",
                  }}
                >
                  Edit Details
                </Text>
                <View
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: 380,
                  }}
                >
                  {/* first name */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    value={editData.fname}
                    onChangeText={(text) => setFields(text, "fname")}
                  />
                  {/* last name */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    value={editData.lname}
                    onChangeText={(text) => setFields(text, "lname")}
                  />
                  {/* email */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    value={editData.email}
                    onChangeText={(text) => setFields(text, "email")}
                  />
                  {/* phone number */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                      color: "black",
                    }}
                    placeholder={editData.phone}
                    value={editData.phone}
                    onChangeText={(text) => setFields(text, "phone")}
                  />
                  {/* address */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    value={editData.address}
                    placeholder={address ? "" : "your address"}
                    onChangeText={(text) => setFields(text, "address")}
                  />
                  {/* city */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    value={editData.city}
                    placeholder={city ? "" : "your city"}
                    onChangeText={(text) => setFields(text, "city")}
                  />
                  {/* state */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    value={editData.state}
                    placeholder={city ? "" : "your state"}
                    onChangeText={(text) => setFields(text, "city")}
                  />
                  {/* pincode */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    placeholder={editData.pincode}
                    value={editData.pincode}
                    onChangeText={(text) => setFields(text, "pincode")}
                  />
                  {/* profession */}
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 250,
                      borderRadius: 4,
                      borderColor: "#E90064",
                      borderWidth: 2,
                    }}
                    value={editData.profession}
                    placeholder={profession ? "" : "your proffession"}
                    onChangeText={(text) => setFields(text, "profession")}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    backgroundColor: "white",
                    width: 90,
                    height: 40,
                    borderRadius: 4,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderColor: "#E90064",
                    borderWidth: 2,
                  }}
                  onPress={() => editUser()}
                >
                  {editLoader ? (
                    <ActivityIndicator color={"#E90064"} size={30} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "300",
                      }}
                    >
                      Set!
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        ""
      )}
    </KeyboardAwareScrollView>
  );
};

export default ClientSetting;
