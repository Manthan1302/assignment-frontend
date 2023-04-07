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
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  UserGroupIcon,
  XMarkIcon,
  EnvelopeIcon,
} from "react-native-heroicons/outline";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMain from "./UserHomeRootComponent";
import Profilepic from "../../images/profilepic.jpg";
import { useSelector } from "react-redux";
import { getOrdersForUserService } from "../../services/oneForAll";

// task screen
const UserOrders = () => {
  useEffect(() => {
    getUserOrders();
  }, []);

  const userToken = useSelector((state) => state.user).token;

  const navigation = useNavigation();

  const [loader, setLoader] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [orderInfo, setOrderInfo] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerBackVisible: false,
      headerTitle: "Accepted Orders",
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
        fontWeight: "500",
      },
    });
  });

  if (!userToken) {
    return (
      <SafeAreaView
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <Text style={{ color: "grey", fontSize: 20, fontWeight: "400" }}>
            You are not Logged In!
          </Text>
          <Text style={{ color: "grey", fontSize: 20, fontWeight: "400" }}>
            Please login first!
          </Text>
          <Text style={{ color: "grey", fontSize: 20, fontWeight: "400" }}>
            To see your Tasks
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const getUserOrders = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const response = await getOrdersForUserService({ headers });

    const { userOrders, error } = response;

    userOrders ? setLoader(false) : setLoader(false);

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    setAllOrders(userOrders);
  };

  return (
    <KeyboardAwareScrollView
      style={{
        marginTop: 20,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getUserOrders()}
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
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          {allOrders.map((item, index) => {
            console.log("item: ", item);

            if (allOrders.length === 0) {
              return (
                <View
                  key={index}
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: 40,
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 17,
                      fontWeight: "500",
                    }}
                  >
                    No orders Accepted yet!
                  </Text>
                </View>
              );
            } else {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: "white",
                    width: 350,
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexDirection: "row",
                    padding: 10,
                    borderRadius: 3,
                  }}
                >
                  <View style={{ width: 230 }}>
                    <Text style={{ fontSize: 16 }}>
                      {item.assignment.assignmentName}
                    </Text>
                    <Text style={{ fontSize: 16 }}>
                      {item.assignment.assignmentType}
                    </Text>
                    <Text style={{ color: "grey", fontSize: 16 }}>
                      {item.assignment.description}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E90064",
                      width: 60,
                      height: 50,
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                    onPress={() => {
                      setModalStatus(true), setOrderInfo(item);
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 18 }}>view</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
        </View>
      )}

      {modalStatus ? (
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
                height: 650,
                width: 350,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 5,
                borderColor: "white",
                borderWidth: 2,
              }}
            >
              <View
                style={{
                  width: 310,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity onPress={() => setModalStatus(false)}>
                  <XMarkIcon
                    color={"#E90064"}
                    size={40}
                    style={{ height: 50, width: 50, backgroundColor: "white" }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  // backgroundColor: "white",
                  height: 550,
                  padding: 15,
                  width: 310,
                }}
              >
                <ScrollView>
                  {console.log("order info : ", orderInfo)}

                  <View style={{}}>
                    {/* client */}
                    <View
                      style={{
                        backgroundColor: "white",

                        borderRadius: 3,
                        justifyContent: "space-around",
                        alignItems: "flex-start",
                      }}
                    >
                      <UserIcon color={"#E90064"} size={40} />
                      <Text>
                        {" "}
                        {orderInfo.client.firstName} {orderInfo.client.lastName}{" "}
                      </Text>
                      <View>
                        <EnvelopeIcon color={"#E90064"} size={20} />
                        <Text>{orderInfo.client.email}</Text>
                      </View>
                    </View>
                    {/* accepted task */}
                    <View></View>
                  </View>

                  {/* work stats */}
                  <View></View>
                </ScrollView>
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

export default UserOrders;
