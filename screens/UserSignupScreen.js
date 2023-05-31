import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  BackHandler,
  ToastAndroid,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import {
  DocumentPlusIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import { signupUserServices } from "../services/oneForAll";
import { userData } from "../services/UserData.reducer";
import * as ImagePicker from "expo-image-picker";

const UserSignupScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  if (Platform.OS === "android" || Platform.OS === "ios") {
    useEffect(() => {
      const backAction = () => {
        navigation.navigate("Signup");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    }, []);
  }

  const dispatch = useDispatch();

  const [onLoad, setLoader] = useState(false);
  const [showPwd, setShowPwd] = useState(true);
  const [register, setRegistration] = useState({
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
    usertype: "user",
    profilePic: "",
  });

  const setFields = (value, name) => {
    setRegistration({ ...register, [name]: value });
  };

  const signUp = async () => {
    console.log("register: ", register);

    setLoader(true);

    if (
      register.firstName === "" ||
      register.lastName === "" ||
      register.gender === "" ||
      register.email === "" ||
      register.password === "" ||
      register.phoneNumber === "" ||
      register.area === "" ||
      register.address === "" ||
      register.city === "" ||
      register.pincode === "" ||
      register.profession === "" ||
      register.experience === "" ||
      register.about === "" ||
      register.usertype === "" ||
      register.profilePic === ""
    ) {
      ToastAndroid.show(
        "please enter all details",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      setLoader(false);
    } else {
      console.log("register: ", register);

      const fd = new FormData();
      fd.append("firstName", register.firstName);
      fd.append("lastName", register.lastName);
      fd.append("gender", register.gender);
      fd.append("email", register.email);
      fd.append("password", register.password);
      fd.append("phoneNumber", register.phoneNumber);
      fd.append("area", register.area);
      fd.append("address", register.address);
      fd.append("city", register.city);
      fd.append("pincode", register.pincode);
      fd.append("profession", register.profession);
      fd.append("experience", register.experience);
      fd.append("about", register.about);
      fd.append("usertype", "user");
      fd.append("profilePic", {
        uri: register.profilePic,
        name: new Date() + "_profilePic",
        type: "image/jpg",
      });

      console.log("fd: ", fd);

      const reply = await signupUserServices(fd);

      const { response, error } = reply;
      console.log("response: ", response);

      if (response) {
        setLoader(false);
        ToastAndroid.show(
          `Sign up Successfull!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        const { token, user } = response;

        dispatch(userData({ user, token }));
        navigation.navigate("UserNav");

        setRegistration({
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
          usertype: "user",
        });
      } else if (error) {
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoader(false);
      }
    }
    // setLoader(false);
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
        setRegistration({
          profilePic: result.uri,
        });
        console.log("result.assets: ", result.uri);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView
        style={{
          margin: 20,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ textAlign: "center", fontSize: 25, color: "#E90064" }}>
            Signup As A User{" "}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          {register.profilePic ? (
            <TouchableOpacity
              style={{
                backgroundColor: "#E90064",
                width: 150,
                height: 150,
                alignItems: "center",
                justifyContent: "space-around",
                borderRadius: 5,
              }}
              onPress={openImageLibrary}
            >
              <DocumentPlusIcon color={"white"} height={50} width={50} />
              <Text style={{ color: "white" }}>picture uploaded!</Text>
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
              <DocumentPlusIcon color={"#E90064"} height={50} width={50} />
              <Text style={{ color: "#E90064" }}> profile picture</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View>
              <Text style={{ marginLeft: 10, fontSize: 18 }}>First Name</Text>
              <TextInput
                style={{
                  height: 45,
                  width: 160,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                placeholder="eg: Bruce..."
                onChangeText={(text) => setFields(text, "firstName")}
              />
            </View>
            <View>
              <Text style={{ marginLeft: 10, fontSize: 18 }}>Last Name</Text>
              <TextInput
                style={{
                  height: 45,
                  width: 160,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                placeholder="eg: Bruce..."
                onChangeText={(text) => setFields(text, "lastName")}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View>
              <Text style={styles.texts}>Phone</Text>
              <TextInput
                style={{
                  height: 45,
                  width: 160,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                keyboardType="numeric"
                maxLength={10}
                placeholder="9999999999"
                onChangeText={(text) => setFields(text, "phoneNumber")}
              />
            </View>
            <View style={{ width: 170 }}>
              <Text style={styles.texts}>Gender</Text>
              <Picker
                selectedValue={register.gender}
                onValueChange={(text) => setFields(text, "gender")}
                mode="dropdown" // Android only
                style={{
                  width: 180,
                  height: 40,
                  color: "white",
                  backgroundColor: "#E90064",
                }}
              >
                <Picker.Item color="#E90064" label="select" value="male" />
                <Picker.Item color="#E90064" label="male" value="male" />
                <Picker.Item color="#E90064" label="female" value="female" />
              </Picker>
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.texts}>Email</Text>
            <TextInput
              style={[styles.container, styles.center, styles.border]}
              keyboardType="email-address"
              placeholder="eg: brucelee@gmail.com"
              onChangeText={(text) => setFields(text, "email")}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.texts}>Address</Text>
            <TextInput
              style={[styles.container, styles.center, styles.border]}
              placeholder="eg: 05 , xyz street , abc lane..."
              onChangeText={(text) => setFields(text, "address")}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <View>
              <Text style={{ marginLeft: 10, fontSize: 18 }}>City</Text>
              <TextInput
                style={{
                  height: 45,
                  width: 160,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                placeholder="eg: abc city.."
                onChangeText={(text) => setFields(text, "city")}
              />
            </View>
            <View>
              <Text style={{ marginLeft: 10, fontSize: 18 }}>Area</Text>
              <TextInput
                style={{
                  height: 45,
                  width: 160,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                placeholder="eg: xyz area.."
                onChangeText={(text) => setFields(text, "area")}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <View>
              <Text style={{ marginLeft: 10, fontSize: 18 }}>Pin Code</Text>
              <TextInput
                style={{
                  height: 45,
                  width: 160,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                keyboardType="numeric"
                maxLength={6}
                placeholder="eg: 888888"
                onChangeText={(text) => setFields(text, "pincode")}
              />
            </View>
            <View>
              <Text style={{ marginLeft: 10, fontSize: 18 }}>Profession</Text>
              <TextInput
                style={{
                  height: 45,
                  width: 160,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                placeholder="eg: writer.."
                onChangeText={(text) => setFields(text, "profession")}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View>
              <Text style={styles.texts}>Password</Text>
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  width: 210,
                }}
              >
                <TextInput
                  style={{
                    height: 45,
                    width: 160,
                    borderRadius: 5,
                    borderWidth: 1,
                    marginLeft: 10,
                    borderColor: "#E90064",
                    padding: 10,
                  }}
                  secureTextEntry={showPwd}
                  onChangeText={(text) => setFields(text, "password")}
                />
                <TouchableOpacity
                  onPress={() =>
                    showPwd === false ? setShowPwd(true) : setShowPwd(false)
                  }
                >
                  {showPwd === true ? (
                    <EyeIcon size={30} color={"#E90064"} />
                  ) : (
                    <EyeSlashIcon size={30} color={"#E90064"} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.texts}>Experience</Text>
              <TextInput
                style={{
                  height: 45,
                  width: 130,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                keyboardType="numeric"
                maxLength={2}
                placeholder="eg: 05.."
                onChangeText={(text) => setFields(text, "experience")}
              />
            </View>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.texts}>About</Text>
            <TextInput
              style={[styles.container, styles.center, styles.border]}
              placeholder="eg: something about you.."
              onChangeText={(text) => setFields(text, "about")}
            />
          </View>

          <View style={{ marginTop: 20, alignItems: "center" }}>
            <TouchableOpacity style={styles.signin} onPress={() => signUp()}>
              {onLoad ? (
                <ActivityIndicator size={30} color={"white"} />
              ) : (
                <Text style={{ color: "white", textTransform: "uppercase" }}>
                  Create Account
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 17 }}>Already a member ?</Text>
            <TouchableOpacity
              style={{
                height: 25,
                width: 60,
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ color: "grey", fontSize: 17 }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    width: 330,
    height: 45,
    padding: 10,
  },
  texts: {
    marginLeft: 35,
    fontSize: 18,
  },
  signin: {
    borderRadius: 5,
    width: 350,
    height: 45,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#E90064",
    color: "white",
    fontSize: 20,
    justifyContent: "space-around",
    alignItems: "center",
    textTransform: "uppercase",
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
  },
  border: {
    borderColor: "#E90064",
  },
});

export default UserSignupScreen;
