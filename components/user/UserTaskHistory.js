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
  PhoneArrowUpRightIcon,
  ArrowDownCircleIcon,
} from "react-native-heroicons/outline";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMain from "./UserHomeRootComponent";
import Profilepic from "../../images/profilepic.jpg";
import { useSelector } from "react-redux";
import {
  getOrdersForUserService,
  onWorkCompleteService,
} from "../../services/oneForAll";

const UserTaskHistory = () => {
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

      headerTitle: "Task History",
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
      style={{}}
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
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            // backgroundColor: "green",
            marginBottom: 140,
          }}
        >
          {allOrders.length !== 0 ? (
            allOrders.map((item, index) => {
              console.log("item: ", item);
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
                    shadowColor: "black",
                    elevation: 15,
                    marginTop: 20,
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
                      Budget . {item.assignment.assignmentBudget}
                    </Text>
                    <Text style={{ color: "grey", fontSize: 16 }}>
                      Got Accepted . {item.finalBid.finalPrice}
                    </Text>
                    <Text
                      style={{ color: "grey", fontSize: 14, fontWeight: "700" }}
                    >
                      Work Status . {item.workStatus}
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
            })
          ) : (
            <View
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
                No orders Done yet!
              </Text>
            </View>
          )}
        </View>
      )}

      {/* order info */}
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
                  // backgroundColor: "green",
                  height: 550,
                  width: 310,
                }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {console.log("order info : ", orderInfo)}

                  {/* client */}
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 3,
                      justifyContent: "space-around",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 15,
                        fontWeight: "300",
                      }}
                    >
                      Client
                    </Text>
                    <UserIcon color={"#E90064"} size={40} />
                    <Text>
                      {" "}
                      {orderInfo.client.firstName} {orderInfo.client.lastName}{" "}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <EnvelopeIcon color={"#E90064"} size={20} />
                      <Text>{orderInfo.client.email}</Text>
                    </View>
                    <TouchableOpacity
                      style={{ flexDirection: "row", marginTop: 10 }}
                    >
                      <PhoneArrowUpRightIcon color={"#E90064"} size={20} />
                      <Text>{orderInfo.client.contactNumber}</Text>
                    </TouchableOpacity>
                  </View>

                  {/* accepted task */}
                  <View
                    style={{
                      backgroundColor: "white",
                      marginTop: 15,
                      padding: 15,
                      borderRadius: 3,
                      justifyContent: "space-around",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 15,
                        fontWeight: "300",
                      }}
                    >
                      Task
                    </Text>

                    <Text>{orderInfo.assignment.assignmentName}</Text>
                    <Text>{orderInfo.assignment.assignmentType}</Text>
                    <Text>
                      Budget . {orderInfo.assignment.assignmentBudget}
                    </Text>
                    <Text>{orderInfo.assignment.description}</Text>
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text>Assignment status</Text>
                      <View
                        style={{
                          backgroundColor: "#E90064",
                          height: 30,
                          width: 80,
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginLeft: 5,
                          borderRadius: 3,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          {orderInfo.assignment.assignmentStatus}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: 280,
                        // backgroundColor: "pink",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          backgroundColor: "#E90064",
                          padding: 8,
                          borderRadius: 3,
                          height: 60,
                        }}
                      >
                        <ArrowDownCircleIcon color={"white"} size={40} />
                        <Text style={{ color: "white", marginLeft: 5 }}>
                          attachments
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* work stats */}
                  <View
                    style={{
                      backgroundColor: "white",
                      marginTop: 15,
                      padding: 15,
                      borderRadius: 3,
                      justifyContent: "space-around",
                      alignItems: "flex-start",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 15,
                        fontWeight: "300",
                      }}
                    >
                      Accpeted BID
                    </Text>
                    <Text>Final Price . {orderInfo.finalBid.finalPrice}</Text>
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text>Work status</Text>
                      <View
                        style={{
                          backgroundColor: "#E90064",
                          height: 30,
                          width: 80,
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginLeft: 5,
                          borderRadius: 3,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          {orderInfo.workStatus}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <Text>Payment status</Text>
                      <View
                        style={{
                          backgroundColor: "#E90064",
                          height: 33,
                          width: 150,
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginLeft: 5,
                          borderRadius: 3,
                        }}
                      >
                        <Text style={{ color: "white" }}>
                          {orderInfo.paymentStatus}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: 20,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: 280,
                        // backgroundColor: "pink",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          backgroundColor: "#E90064",
                          padding: 8,
                          borderRadius: 3,
                          height: 60,
                        }}
                      >
                        {orderInfo.workStatus === "pending" ? (
                          <Text style={{ color: "white", marginLeft: 5 }}>
                            pending
                          </Text>
                        ) : (
                          <Text style={{ color: "white", marginLeft: 5 }}>
                            completed
                          </Text>
                        )}
                      </View>
                    </View>
                  </View>
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

export default UserTaskHistory;
