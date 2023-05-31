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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";
import { signUpClientServices } from "../services/oneForAll";
import { clientData } from "../services/ClientData.reducer";

const ClientSignupScreen = () => {
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const dispatch = useDispatch();

  const [onLoad, setLoader] = useState(false);
  const [showPwd, setShowPwd] = useState(true);
  const [register, setRegistration] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    profession: "",
    usertype: "client",
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
      register.contactNumber === "" ||
      register.address === "" ||
      register.city === "" ||
      register.state === "" ||
      register.pinCode === "" ||
      register.profession === "" ||
      register.usertype === ""
    ) {
      ToastAndroid.show(
        "please enter all details",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      setLoader(false);
    } else {
      const reply = await signUpClientServices(register);

      const { response, error } = reply;
      console.log("response: ", response);

      if (response) {
        setLoader(false);
        ToastAndroid.show(
          `Sign up Successfull!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        const { token, client } = response;

        dispatch(clientData({ client, token }));
        navigation.navigate("ClientNav");

        setRegistration({
          firstName: "",
          lastName: "",
          gender: "",
          email: "",
          password: "",
          contactNumber: "",
          address: "",
          city: "",
          state: "",
          pinCode: "",
          profession: "",
          usertype: "client",
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
    setLoader(false);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={{ margin: 20 }}>
        <View>
          <Text style={{ textAlign: "center", fontSize: 25, color: "#E90064" }}>
            Signup As A Client{" "}
          </Text>
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
                placeholder="eg: Banner..."
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
                placeholder="eg: 88888888"
                onChangeText={(text) => setFields(text, "contactNumber")}
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
              style={[styles.container, styles.center]}
              placeholder="eg: brucebanner@gmail.com..."
              onChangeText={(text) => setFields(text, "email")}
              keyboardType="email-address"
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={styles.texts}>Address</Text>
            <TextInput
              style={[styles.container, styles.center]}
              placeholder="eg: 06 , 32street , lane..."
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
                placeholder="eg: abc city..."
                onChangeText={(text) => setFields(text, "city")}
              />
            </View>
            <View>
              <Text style={{ marginLeft: 10, fontSize: 18 }}>State</Text>
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
                placeholder="eg: xyz state..."
                onChangeText={(text) => setFields(text, "state")}
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
                placeholder="eg: 888888..."
                onChangeText={(text) => setFields(text, "pinCode")}
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
                placeholder="eg: comapny owner..."
                onChangeText={(text) => setFields(text, "profession")}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              // justifyContent: "space-around",
              // alignItems: "center",
            }}
          >
            <Text style={styles.texts}>Password</Text>
            <View
              style={{
                marginTop: 20,
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                // backgroundColor: "green",
                // width: 350,
              }}
            >
              <TextInput
                style={{
                  height: 45,
                  width: 280,
                  borderRadius: 5,
                  borderWidth: 1,
                  marginLeft: 10,
                  borderColor: "#E90064",
                  padding: 10,
                }}
                onChangeText={(text) => setFields(text, "password")}
                secureTextEntry={showPwd}
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

          <View style={{ marginTop: 20, alignItems: "center" }}>
            <TouchableOpacity style={styles.signin}>
              <TouchableOpacity style={styles.signin} onPress={() => signUp()}>
                {onLoad ? (
                  <ActivityIndicator size={30} color={"white"} />
                ) : (
                  <Text style={{ color: "white", textTransform: "uppercase" }}>
                    Create Account
                  </Text>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
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
    width: 350,
    height: 45,
    padding: 10,
    borderColor: "#E90064",
  },
  texts: {
    marginLeft: 30,
    fontSize: 18,
  },
  signin: {
    borderRadius: 5,
    width: 350,
    height: 45,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#E90064",
    fontSize: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
  center: {
    // marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
  },
});

export default ClientSignupScreen;
