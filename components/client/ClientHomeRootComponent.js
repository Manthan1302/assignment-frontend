import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import image from "../4529164.jpg";
import {
  UserIcon,
  UserGroupIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersServices } from "../../services/oneForAll";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ClientMain = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);

  const clientToken = useSelector((state) => state.client).token;

  const [refresh, setRefresh] = useState(false);

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

    getUserWorks();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerBackVisible: false,
      headerTitle: "Taskify",
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
        fontWeight: "500",
      },
    });
  }, []);

  const getUserWorks = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${clientToken}` } };
    const data = await getAllUsersServices({ headers });

    const { allWorkImages, error } = data;
    console.log("user:", allWorkImages);

    error && allWorkImages === undefined
      ? ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      : "";

    allWorkImages.reverse();

    allWorkImages ? setLoader(false) : setLoader(true);
    allWorkImages ? setUsers(allWorkImages) : [];
  };

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => getUserWorks()} />
      }
    >
      <View style={{ marginTop: 10, marginBottom: 100 }}>
        {loader ? (
          <Modal
            transparent={true}
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "#FFF2F2aa",
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#E90064",
                  height: 70,
                  width: 130,
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 5,
                  borderColor: "white",
                  borderWidth: 2,
                }}
              >
                <ActivityIndicator size={30} color={"white"} />
                <Text style={{ color: "white", fontSize: 18 }}>Loading...</Text>
              </View>
            </View>
          </Modal>
        ) : (
          users.map((item, index) => {
            console.log("item: ", item);

            return (
              <View
                key={index}
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E90064",
                    height: 520,
                    width: 370,
                    marginBottom: 13,
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "column",
                    borderRadius: 4,
                    shadowColor: "black",
                    elevation: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("ViewUser", {
                      user: item.user,
                    });
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      width: 300,
                      padding: 10,
                    }}
                  >
                    <UserCircleIcon size={40} color={"white"} />
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        {item.user.firstName}
                        {"   "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          color: "white",
                          fontWeight: "500",
                        }}
                      >
                        {item.user.lastName}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: item.workImage }}
                    style={{ height: 400, width: 350, borderRadius: 4 }}
                  />
                  <View
                    style={{
                      alignItems: "flex-start",
                      width: 300,
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{ fontSize: 15, color: "pink", fontWeight: "600" }}
                    >
                      Prof . {item.user.profession}
                    </Text>
                    <Text
                      style={{ fontSize: 15, color: "pink", fontWeight: "600" }}
                    >
                      Expn . {item.user.experience} yrs
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default ClientMain;
