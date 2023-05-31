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
  Linking,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  UserGroupIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneArrowUpRightIcon,
  ArrowDownCircleIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import {
  getOrdersForUserService,
  onWorkCompleteService,
  askForPaymentService,
} from "../../services/oneForAll";

const UserPayments = () => {
  const navigation = useNavigation();

  const backAction = () => {
    // const popAction = StackActions.pop(1);
    // navigation.goBack();
    navigation.navigate("UserNav");
    return true;
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  const userToken = useSelector((state) => state.user).token;

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Payments Received`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  const [loader, setLoader] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getUserOrders = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const response = await getOrdersForUserService({ headers });

    const { userOrders, error } = response;

    userOrders ? setLoader(false) : setLoader(false);

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    userOrders ? setAllOrders(userOrders) : setAllOrders([]);
  };

  console.log("allorders :", allOrders);

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
            <View>
              {allOrders.map((item, index) => {
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
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: 95,
                      }}
                    >
                      <UserIcon size={30} color={"#E90064"} />
                      <Text style={{ textAlign: "center" }}>
                        {item.client.firstName + " " + item.client.lastName}
                      </Text>

                      <Text>{item.client.profession} </Text>
                    </View>

                    <View
                      style={{
                        height: 90,
                        width: 2,
                        backgroundColor: "#E90064",
                        marginLeft: 15,
                        marginRight: 15,
                      }}
                    ></View>

                    <View style={{ width: 230, padding: 8 }}>
                      <Text style={{ fontSize: 16, padding: 8 }}>
                        {item.assignment.assignmentName}
                      </Text>

                      <Text style={{ color: "grey", fontSize: 16 }}>
                        Final Price . {item.finalBid.finalPrice}
                      </Text>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        Work status . {item.workStatus}
                      </Text>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                      >
                        Payment . {item.paymentStatus}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
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
                No orders Accepted yet!
              </Text>
            </View>
          )}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default UserPayments;
