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
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";

const Login = ({ history }) => {
  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });

  const [onLoad, setLoader] = useState(false);
  const [showPwd, setShowPwd] = useState(true);
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
    // validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  width: 300,
                  height: 45,
                  padding: 10,
                }}
                secureTextEntry={showPwd}
                onChangeText={(text) => setFields(text, "password")}
                value={logUser.password}
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
