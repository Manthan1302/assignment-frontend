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
  ScrollView,
  RefreshControl,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  UserGroupIcon,
  PencilSquareIcon,
  PowerIcon,
  ClipboardDocumentListIcon,
  BellAlertIcon,
  CreditCardIcon,
  BanknotesIcon,
  NewspaperIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  Bars3BottomLeftIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  DocumentPlusIcon,
  TrashIcon,
  FolderIcon,
} from "react-native-heroicons/outline";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMain from "./UserHomeRootComponent";
// import Profilepic from "../../images/profilepic.jpg";
import Malesymbol from "../../images/malesymbol.png";
import Femalesymbol from "../../images/femalesymbol.png";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../services/UserData.reducer";
import {
  deleteWorkDemoService,
  editUserPassService,
  editUserService,
  getWorkDemoService,
  uploadWorkDemo,
} from "../../services/oneForAll";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const UserSetting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  useEffect(() => {
    getWorkModel();
  }, []);

  useLayoutEffect(() => {
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
    navigation.setOptions({
      headerShown: false,
    });
  });

  const _id = useSelector((state) => state.user)._id;
  const token = useSelector((state) => state.user).token;
  const fname = useSelector((state) => state.user).firstName;
  const gender = useSelector((state) => state.user).gender;
  const lname = useSelector((state) => state.user).lastName;
  const about = useSelector((state) => state.user).about;
  const email = useSelector((state) => state.user).email;
  const phone = useSelector((state) => state.user).phoneNumber;
  const area = useSelector((state) => state.user).area;
  const address = useSelector((state) => state.user).address;
  const city = useSelector((state) => state.user).city;
  const pincode = useSelector((state) => state.user).pincode;
  const profession = useSelector((state) => state.user).profession;
  const experience = useSelector((state) => state.user).experience;
  const profilePic = useSelector((state) => state.user).profilePic;
  console.log("profilePic: ", profilePic);

  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // edit loader state
  const [editLoader, setEditLoad] = useState(false);

  // edit pass
  const [newPass, setNewPass] = useState("");
  const [editPassModal, setEditPassModal] = useState(false);
  const [pwd, showPwd] = useState(true);

  // work demo
  const [workImage, setWorkImage] = useState("");
  const [workDemoModel, setWorkDemoModel] = useState("");
  const [workLoad, setWorkLoad] = useState(false);

  const [myWorkImage, setMyWorkImage] = useState([]);

  // edit user
  const [editData, setEditData] = useState({
    fname: fname,
    lname: lname,
    email: email,
    phone: phone.toString(),
    area: area,
    about: about,
    address: address,
    city: city,
    pincode: pincode.toString(),
    profession: profession,
    experience: experience.toString(),
  });
  const [editDataModal, setFieldsModal] = useState(false);

  // work model info state
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [workModelState, setWorkModelState] = useState(false);
  const [workModelInfo, setWorkModelInfo] = useState({
    imgId: "",
    imgUri: "",
  });

  const logOut = () => {
    const onClickOk = () => {
      const token = "";
      const _id = "";
      const firstName = "";
      const lastName = "";
      const gender = "";
      const email = "";
      const password = "";
      const phoneNumber = "";
      const area = "";
      const address = "";
      const city = "";
      const pincode = "";
      const profession = "";
      const experience = "";
      const about = "";
      const usertype = "";
      const workDemo = "";

      const user = {
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
      };

      dispatch(userData({ user, token }));
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

    const result = await editUserPassService({ _id, headers, newPass });

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

      const result = await editUserService({ _id, headers, editData });

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

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("sorry , we need camera roll permission to make this work");
    }

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });

      console.log("result: ", result);

      if (!result.canceled) {
        setWorkImage(result.uri);
        console.log("result.assets: ", result.uri);
      }
    }
  };

  const getWorkModel = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const result = await getWorkDemoService({ headers });

    const { myWorkImages, error } = result;
    console.log("myWorkImages: ", myWorkImages);

    myWorkImages ? setLoader(false) : setLoader(false);

    if (error) {
      console.log(error);
      setMyWorkImage([]);
    }
    if (myWorkImages) {
      setMyWorkImage(myWorkImages);
    } else {
      setMyWorkImage([]);
    }
  };

  // post
  const userWorkDemo = async () => {
    if (workImage === "") {
      ToastAndroid.show(
        "please select image first",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      return null;
    }

    setWorkLoad(true);

    const fd = new FormData();

    fd.append("workDemo", {
      uri: workImage,
      name: new Date() + "_workDemo",
      type: "image/jpg",
    });

    console.log("fd: ", fd);

    const result = await uploadWorkDemo({ fd, token });

    const { newWorkImage, error } = result;

    if (error) {
      setWorkDemoModel(false);
      setWorkLoad(false);
      setWorkImage("");
      getWorkModel();
      return ToastAndroid.show(
        "error : wrokdemo",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (newWorkImage) {
      setWorkDemoModel(false);
      setWorkLoad(false);
      setWorkImage("");
      getWorkModel();
      return ToastAndroid.show(
        "Image uploaded successfully!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const deletWorkDemo = async (id) => {
    setDeleteLoader(true);

    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const result = await deleteWorkDemoService({ headers, id });

    const { message, error } = result;
    console.log("message: ", message);
    console.log("dleete workimg error: ", error);

    message ? setDeleteLoader(false) : setDeleteLoader(false);

    if (message) {
      ToastAndroid.show(
        `image was deleted successfully!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      getWorkModel();
      setWorkModelState(false);
    }

    if (error) {
      ToastAndroid.show(
        `something went wrong in image deletion!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      setWorkModelState(false);
    }
  };

  if (token !== "") {
    return (
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getWorkModel()}
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
          <SafeAreaView style={{ marginBottom: 100 }}>
            <Image
              source={{ uri: profilePic }}
              style={{
                height: 400,
                width: 400,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                // backgroundColor: "#E90064",
                bottom: 55,
                left: 20,
                backgroundColor: "white",
                width: 250,
                padding: 5,
                justifyContent: "space-evenly",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 20, color: "#E90064" }}>
                  {" "}
                  {fname}
                  {"  "}
                </Text>
                <Text style={{ fontSize: 20, color: "#E90064" }}>{lname}</Text>
              </View>
              <Image
                source={gender === "male" ? Malesymbol : Femalesymbol}
                style={{ height: 25, width: 25, tintColor: "aqua" }}
              />
            </View>
            {/* parent */}
            <View style={{ alignItems: "center", bottom: 30 }}>
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
                    backgroundColor: "pink",
                    padding: 8,
                    marginBottom: 10,
                    height: 270,
                    borderRadius: 9,
                    shadowColor: "#748c94",
                    elevation: 20,
                  }}
                >
                  <View
                    style={{
                      height: 190,
                      marginBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    >
                      {myWorkImage.length !== 0 ? (
                        myWorkImage.map((item, index) => {
                          console.log("item: ", item);
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setWorkModelInfo({
                                  imgId: item._id,
                                  imgUri: item.workImage,
                                });
                                setWorkModelState(true);
                              }}
                            >
                              <Image
                                source={{ uri: item.workImage }}
                                style={{
                                  height: 190,
                                  width: 180,
                                  backgroundColor: "#E90064",
                                  marginRight: 7,
                                }}
                              />
                            </TouchableOpacity>
                          );
                        })
                      ) : (
                        <View
                          style={{
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <Text>No work Images were uploaded</Text>
                        </View>
                      )}
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      // backgroundColor: "green",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#E90064",
                        justifyContent: "space-around",
                        alignItems: "center",
                        height: 50,
                        width: 90,
                        borderRadius: 5,
                      }}
                      onPress={() => setWorkDemoModel(true)}
                    >
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: "white",
                    height: "auto",
                    padding: 15,
                    marginBottom: 10,
                    borderRadius: 9,
                    shadowColor: "#748c94",
                    elevation: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 10,
                    }}
                  >
                    About
                  </Text>
                  <Text style={{ fontSize: 15 }}>{about}</Text>
                </View>
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
                    <Text style={{ fontSize: 16 }}>
                      {email ? email : "email"}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      {phone ? phone : "phone"}
                    </Text>
                    <Text style={{ fontSize: 16 }}>{area ? area : "area"}</Text>
                    <Text style={{ fontSize: 16 }}>
                      {address ? address : "address"}
                    </Text>
                    <Text style={{ fontSize: 16 }}>{city ? city : "city"}</Text>
                    <Text style={{ fontSize: 16 }}>
                      {pincode ? pincode : "pincode"}
                    </Text>

                    <Text style={{ fontSize: 16 }}>{profession}</Text>
                    <Text style={{ fontSize: 16 }}>
                      {experience} yr. of Exp.
                    </Text>

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
                        <Text style={{ fontSize: 16, color: "white" }}>
                          edit
                        </Text>
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
                      onPress={() => navigation.navigate("UserTaskHistory")}
                    >
                      <ClipboardDocumentListIcon size={30} color={"#E90064"} />
                      <Text style={{ fontSize: 16 }}>Tasks history</Text>
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
                      onPress={() => navigation.navigate("UserNotifications")}
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
                      onPress={() => navigation.navigate("UserPayments")}
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
                      onPress={() => navigation.navigate("UserBids")}
                    >
                      <BanknotesIcon size={30} color={"#E90064"} />
                      <Text style={{ fontSize: 16 }}>My bids.</Text>
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
                        navigation.navigate("FunctionalPage", {
                          screenName: "Wallet",
                        })
                      }
                    >
                      <FolderIcon size={30} color={"#E90064"} />
                      <Text style={{ fontSize: 16 }}>My Wallet</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* informativebuttons */}
                <View
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    // width: 150,
                    height: 500,
                    // backgroundColor: "green",
                    marginTop: 20,
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
                      navigation.navigate("FunctionalPage", {
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
                      navigation.navigate("FunctionalPage", {
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
                      navigation.navigate("FunctionalPage", {
                        screenName: "Privacy Policy",
                      })
                    }
                  >
                    <Bars3BottomLeftIcon
                      size={30}
                      color={"#E90064"}
                      style={{ paddingLeft: 60, paddingRight: 60 }}
                    />
                    <Text style={{ fontSize: 16 }}>Privacy Policy</Text>
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
                      navigation.navigate("FunctionalPage", {
                        screenName: "Terms & Conditions",
                      })
                    }
                  >
                    <NewspaperIcon
                      size={30}
                      color={"#E90064"}
                      style={{ paddingLeft: 60, paddingRight: 60 }}
                    />
                    <Text style={{ fontSize: 16 }}>Terms and Conditions*</Text>
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
                    {/* about */}
                    <TextInput
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        height: 80,
                        width: 250,
                        borderRadius: 4,
                        borderColor: "#E90064",
                        borderWidth: 2,
                      }}
                      value={editData.about}
                      multiline={true}
                      onChangeText={(text) => setFields(text, "about")}
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
                    {/* arae */}
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
                      value={editData.area}
                      placeholder={area ? "" : "your area"}
                      onChangeText={(text) => setFields(text, "area")}
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
                    {/* experience */}
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
                      placeholder={editData.experience}
                      value={editData.experience}
                      onChangeText={(text) => setFields(text, "experience")}
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

        {/*  work demo model */}
        {workDemoModel ? (
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
                  height: 300,
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
                    onPress={() => setWorkDemoModel(false)}
                  >
                    <XMarkIcon color={"#E90064"} size={40} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: 20,
                  }}
                >
                  {workImage ? (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        width: 150,
                        height: 150,
                        alignItems: "center",
                        justifyContent: "space-around",
                        borderRadius: 5,
                      }}
                      onPress={openImageLibrary}
                    >
                      <DocumentPlusIcon
                        color={"#E90064"}
                        height={50}
                        width={50}
                      />
                      <Text style={{ color: "#E90064" }}>
                        picture uploaded!
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        width: 150,
                        height: 150,
                        alignItems: "center",
                        justifyContent: "space-around",
                        borderRadius: 5,
                        elevation: 15,
                        shadowColor: "grey",
                      }}
                      onPress={openImageLibrary}
                    >
                      <DocumentPlusIcon
                        color={"#E90064"}
                        height={50}
                        width={50}
                      />
                      <Text style={{ color: "#E90064" }}> work demo</Text>
                    </TouchableOpacity>
                  )}
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
                    borderWidth: 3,
                  }}
                  onPress={() => userWorkDemo()}
                >
                  {workLoad ? (
                    <ActivityIndicator color={"#E90064"} size={30} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "300",
                      }}
                    >
                      submit
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          ""
        )}

        {/* view work model info */}
        {/*  work demo model */}
        {workModelState ? (
          <Modal
            transparent={true}
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            {console.log("wokr model info :", workModelInfo)}
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
                  height: 550,
                  width: 350,
                  justifyContent: "space-around",
                  alignItems: "center",
                  // flexDirection: "row",
                  borderRadius: 5,
                  borderColor: "white",
                  borderWidth: 2,
                }}
              >
                {/* xmark icon */}
                <View
                  style={{
                    width: 300,
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={{ backgroundColor: "white", borderRadius: 3 }}
                    onPress={() => setWorkModelState(false)}
                  >
                    <XMarkIcon color={"#E90064"} size={40} />
                  </TouchableOpacity>
                </View>

                <Image
                  source={{ uri: workModelInfo.imgUri }}
                  style={{
                    height: 400,
                    width: 330,
                    backgroundColor: "white",
                    borderRadius: 3,
                  }}
                />

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    height: 50,
                    width: 50,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 3,
                  }}
                  onPress={() => deletWorkDemo(workModelInfo.imgId)}
                >
                  {deleteLoader ? (
                    <ActivityIndicator color={"#E90064"} size={30} />
                  ) : (
                    <TrashIcon size={30} color={"#E90006"} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          ""
        )}
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView style={{ marginBottom: 100 }}>
          {/* parent */}
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              // width: 150,
              minHeight: 700,
              // backgroundColor: "green",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 70,
                alignItems: "center",
                width: 310,
                height: 100,
                borderRadius: 8,
                shadowColor: "#748c94",
                elevation: 15,
                flexDirection: "row",
              }}
              onPress={() =>
                navigation.navigate("FunctionalPage", {
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

                width: 310,
                height: 100,
                borderRadius: 8,
                shadowColor: "#748c94",
                elevation: 15,
                flexDirection: "row",
              }}
              onPress={() =>
                navigation.navigate("FunctionalPage", {
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
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 70,
                alignItems: "center",

                width: 310,
                height: 100,
                borderRadius: 8,
                shadowColor: "#748c94",
                elevation: 15,
                flexDirection: "row",
              }}
              onPress={() =>
                navigation.navigate("FunctionalPage", {
                  screenName: "Privacy Policy",
                })
              }
            >
              <Bars3BottomLeftIcon
                size={30}
                color={"#E90064"}
                style={{ paddingLeft: 60, paddingRight: 60 }}
              />
              <Text style={{ fontSize: 16 }}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 70,
                alignItems: "center",

                width: 310,
                height: 100,
                borderRadius: 8,
                shadowColor: "#748c94",
                elevation: 15,
                flexDirection: "row",
              }}
              onPress={() =>
                navigation.navigate("FunctionalPage", {
                  screenName: "Terms & Conditions",
                })
              }
            >
              <NewspaperIcon
                size={30}
                color={"#E90064"}
                style={{ paddingLeft: 60, paddingRight: 60 }}
              />
              <Text style={{ fontSize: 16 }}>T&C apply*</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 70,
                alignItems: "center",

                width: 310,
                height: 100,
                borderRadius: 8,
                shadowColor: "#748c94",
                elevation: 15,
                flexDirection: "row",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <PowerIcon
                size={30}
                color={"#E90064"}
                style={{ paddingLeft: 60, paddingRight: 60 }}
              />
              <Text style={{ fontSize: 16 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
};

export default UserSetting;
