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
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { PencilSquareIcon } from "react-native-heroicons/solid";
import { clientData } from "../../services/ClientData.reducer";

const ClientSetting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const firstname = useSelector((state) => state.client).firstName;
  const lastname = useSelector((state) => state.client).lastName;
  const gender = useSelector((state) => state.client).gender;
  const email = useSelector((state) => state.client).email;
  const phone = useSelector((state) => state.client).contactNumber;
  const address = useSelector((state) => state.client).address;
  const city = useSelector((state) => state.client).city;
  const state = useSelector((state) => state.client).State;
  const pincode = useSelector((state) => state.client).pinCode;
  console.log("pincode: ", pincode);
  const profession = useSelector((state) => state.client).profession;

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

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{ marginBottom: 100, marginTop: 30 }}>
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
                    {firstname}{" "}
                  </Text>
                  <Text style={{ fontSize: 20, color: "#E90064" }}>
                    {lastname}
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
                    <Text style={{ fontSize: 16, color: "white" }}>Logout</Text>
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
                >
                  <BanknotesIcon size={30} color={"#E90064"} />
                  <Text style={{ fontSize: 16 }}>Pay commi.</Text>
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
                >
                  <NewspaperIcon size={30} color={"#E90064"} />
                  <Text style={{ fontSize: 16 }}>T&C apply*</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ClientSetting;
