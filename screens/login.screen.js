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
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import login from "../images/loginanimation.jpg";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginServices } from "../services/oneForAll";
import { useDispatch } from "react-redux";
import { userData } from "../services/UserData.reducer";
import { clientData } from "../services/ClientData.reducer";
import { adminData } from "../services/AdminData.reducer";

const Login = ({ history }) => {
  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });

  const [onLoad, setLoader] = useState(false);
  const [showpwd, setShowPwd] = useState(false);
  const dispatch = useDispatch();

  // navigation
  const navigation = useNavigation();

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
      headerShown: false,
    });
  }, []);

  const setFields = (value, name) => {
    setLogUser({ ...logUser, [name]: value });
  };

  const signin = async () => {
    setLoader(true);
    if (logUser.email === "" || logUser.password === "") {
      console.log("🚀 ~ file: login.screen.js:57 ~ signin ~ logUser", logUser);
      ToastAndroid.show(
        "Please enter all details",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      setLoader(false);
    } else {
      const reply = await loginServices(logUser);

      const { response, error } = reply;
      console.log(
        "==========================================================================="
      );
      console.log("response: ", response);

      if (response) {
        const { token, actor } = response;
        console.log(
          "==========================================================================="
        );
        console.log("actor:", actor);

        setLoader(false);
        setLogUser({
          email: "",
          password: "",
        });

        ToastAndroid.show(
          `sign in successfull`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        if (actor.usertype === "user") {
          const user = actor;
          console.log(
            "==========================================================================="
          );
          console.log("user ln 103: ", user);
          dispatch(userData({ user, token }));
          navigation.navigate("UserNav");
        } else if (actor.usertype === "client") {
          const client = actor;
          console.log(
            "==========================================================================="
          );
          console.log("client ln 108: ", client);
          dispatch(clientData({ client, token }));
          navigation.navigate("ClientNav");
        } else if (actor.usertype === "admin") {
          dispatch(adminData({ actor, token }));
          navigation.navigate("theOwnerAdmin");
        }
      } else if (error) {
        console.log("🚀 ~ file: login.screen.js:105 ~ signin ~ error", error);
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoader(false);
      }
      setLogUser({ email: "", password: "" });
    }
  };

  const signInweb = async () => {
    setLoader(true);
    if (logUser.email === "" || logUser.password === "") {
      console.log(
        "🚀 ~ file: login.screen.js:118 ~ signInweb ~ logUser",
        logUser
      );
      alert("Please enter all details");
      setLoader(false);
    } else {
      const reply = await loginServices(logUser);
      const { response, error } = reply;
      console.log("response: ", response);

      if (response) {
        const { token, user } = response;
        console.log(
          "🚀 ~ file: login.screen.js:73 ~ signin ~ response",
          response
        );
        setLoader(false);
        setLogUser({
          email: "",
          password: "",
        });

        alert(`Sign in Successfull!`);

        dispatch(adminData({ actor, token }));
        navigation.navigate("theOwnerAdmin");
      } else if (error) {
        console.log("🚀 ~ file: login.screen.js:105 ~ signin ~ error", error);
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoader(false);
      }
    }
  };

  if (Platform.OS === "android" || Platform.OS === "ios") {
    return (
      <SafeAreaView style={{ backgroundColor: "#fff", height: "100%" }}>
        <KeyboardAwareScrollView
          style={{ flex: 1, margin: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={{ textAlign: "center", fontSize: 30 }}>
              Welcome Back!
            </Text>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Sign In to Taskify{" "}
            </Text>
          </View>
          <Text>{"\n"}</Text>
          <Image
            source={login}
            style={{
              height: 270,
              width: 270,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <View>
            <Text style={styles.texts}>Email</Text>
            <TextInput
              style={[styles.container, styles.center]}
              onChangeText={(text) => setFields(text, "email")}
              value={logUser.email}
            />
            <Text>{"\n"}</Text>
            <Text style={styles.texts}>Password</Text>
            <TextInput
              style={[styles.container, styles.center]}
              secureTextEntry={true}
              onChangeText={(text) => setFields(text, "password")}
              value={logUser.password}
            />
            <Text>{"\n"}</Text>
            <View style={styles.center}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#E90064",
                  height: 47,
                  borderRadius: 5,
                  flex: 0.5,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                onPress={() => signin()}
              >
                {onLoad ? (
                  <ActivityIndicator size={30} color={"white"} />
                ) : (
                  <Text style={{ color: "white" }}>SIGN IN</Text>
                )}
              </TouchableOpacity>
              <Text style={{ textAlign: "center", fontSize: 17 }}>
                forgot password?
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 17 }}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                  <Text style={{ fontSize: 17, color: "gray" }}>
                    Sign Up now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <div style={{ display: "flex", backgroundColor: "#FCC2FC" }}>
        <div>
          <img src={login} style={{ height: 735, flex: 50 }}></img>
        </div>
        <hr></hr>

        <div style={{ flex: 50 }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ textAlign: "Center", fontSize: 30, color: "#fff" }}>
              Please Enter Your Login Details
            </h2>
            <hr></hr>
            <br></br>
            <br></br>

            <label style={{ marginRight: 200, color: "#fff" }}>Email</label>
            <br></br>
            <TextInput
              type="text"
              placeholder="Enter email.."
              style={{ height: 30, width: 250, borderRadius: 7 }}
              onChangeText={(text) => setFields(text, "email")}
            />
            <br></br>
            <br></br>
            <label style={{ marginRight: 180, color: "#fff" }}>Password</label>
            <br></br>
            <TextInput
              type="text"
              placeholder="Enter Password.."
              style={{ height: 30, width: 250, borderRadius: 7 }}
              onChangeText={(text) => setFields(text, "password")}
              secureTextEntry={true}
            />
            <br></br>
            <br></br>
            <br></br>
            <TouchableOpacity
              style={{
                width: 150,
                height: 35,

                borderRadius: 5,

                outline: "none",
                backgroundColor: "white",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onPress={() => signInweb()}
            >
              {onLoad ? (
                <ActivityIndicator size={10} color={"#E90064"} />
              ) : (
                <Text style={{ color: "#E90064", fontSize: 15 }}>Login</Text>
              )}
            </TouchableOpacity>
          </div>
        </div>
      </div>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    borderWidth: 1,
    width: 350,
    height: 45,
    padding: 10,
  },
  texts: {
    marginLeft: 15,
    fontSize: 18,
  },
  signin: {
    borderRadius: 5,
    borderWidth: 1,
    width: 350,
    height: 45,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: "#E90064",
    color: "#fff",
    fontSize: 20,
  },
  center: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
  },
});

export default Login;
