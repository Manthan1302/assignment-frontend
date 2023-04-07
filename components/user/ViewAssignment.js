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
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowDownTrayIcon,
  BookOpenIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  PhoneArrowUpRightIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import {
  CurrencyRupeeIcon,
  UserIcon,
  XMarkIcon,
} from "react-native-heroicons/solid";
import Profilepic from "../../images/profilepic.jpg";
import {
  getBidsonTaskServices,
  postBidonTaskService,
} from "../../services/oneForAll";

const ViewAssignment = ({ route }) => {
  const { assignment } = route.params;
  console.log("viewed assignment: ", assignment);

  const userToken = useSelector((state) => state.user).token;
  //   console.log("userToken console: ", userToken);

  const navigation = useNavigation();

  const [allBids, setBids] = useState([]);
  const [loader, setLoader] = useState(false);
  const [zeroBid, setZeroBid] = useState(false);
  const [bidingClosed, setBidingClosed] = useState(false);
  const [bidLoader, setBidLoader] = useState(false);
  const [bidModel, setBidModel] = useState(false);

  const [userBid, setUserBid] = useState({
    finalPrice: "",
    userMessage: "",
  });

  const setField = (value, name) => {
    setUserBid({ ...userBid, [name]: value });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Client's Task`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });

    const backAction = () => {
      // const popAction = StackActions.pop(1);
      // navigation.goBack();
      navigation.navigate("UserNav");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, []);

  useEffect(() => {
    getBidsonTask();
  }, []);

  const getBidsonTask = async () => {
    setLoader(true);
    const _id = assignment._id;

    const result = await getBidsonTaskServices({ _id });

    const { error, allTaskBids } = result;
    console.log("allTaskBids: ", allTaskBids);

    if (allTaskBids) {
      allTaskBids.length === 0 ? setZeroBid(true) : setZeroBid(false);
    }

    allTaskBids.sort(function (a, b) {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateA - dateB;
    });

    allTaskBids ? setBids(allTaskBids) : setBids([]);

    allTaskBids ? setLoader(false) : setLoader(false);

    error ? setBids([]) : "";

    if (allTaskBids) {
      allTaskBids.map((item) => {
        if (item.bidStatus === "accepted") {
          setBidingClosed(true);
        }
      });
    }
  };

  const postBidonTask = async () => {
    if (userToken !== "") {
      if (userBid.finalPrice === "" && userBid.userMessage === "") {
        return ToastAndroid.show(
          "please fill all the details !",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      setBidModel(true);
      setBidLoader(true);
      // , await getBidsonTask();
      // setBidModel(false);

      console.log("user bid :", userBid);

      try {
        const taskId = assignment._id;

        const headers = { headers: { Authorization: `Bearer ${userToken}` } };

        const result = await postBidonTaskService({ taskId, userBid, headers });

        const { myBid, error } = result;

        if (myBid) {
          setBidLoader(false);
          setBidModel(false);
        }

        if (error) {
          setBidLoader(false);
          setBidModel(false);
        }

        getBidsonTask();
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      ToastAndroid.show(
        "please login first!",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{ justifyContent: "space-around", alignItems: "center" }}>
        {/* client */}
        <View
          style={{
            backgroundColor: "white",
            width: 340,
            // height: 600,
            justifyContent: "space-around",
            alignItems: "center",
            // flexDirection: "row",
            marginTop: 20,
            padding: 20,
            borderRadius: 8,
            elevation: 15,
            shadowColor: "#748c94",
          }}
        >
          <View
            style={{ alignItems: "center", justifyContent: "space-around" }}
          >
            <UserCircleIcon color={"#E90064"} height={40} width={40} />
            <Text style={{ fontSize: 20, fontWeight: "500", color: "grey" }}>
              {assignment.client
                ? assignment.client.firstName +
                  "  " +
                  assignment.client.lastName
                : "client name"}
            </Text>
          </View>
          <View style={{ alignItems: "flex-start" }}>
            <View
              style={{
                marginTop: 10,
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                //   backgroundColor: "green",
              }}
            >
              <EnvelopeIcon
                color={"#E90064"}
                height={20}
                width={20}
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontSize: 18 }}>
                {assignment.client ? assignment.client.email : "client email"}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                //   backgroundColor: "green",
              }}
            >
              <PhoneArrowUpRightIcon
                color={"#E90064"}
                height={20}
                width={20}
                style={{ marginRight: 10 }}
              />
              <Text style={{ fontSize: 18 }}>
                {assignment.client
                  ? assignment.client.contactNumber
                  : "client phone"}
              </Text>
            </View>
          </View>
        </View>
        {/* ------------------------------------------------------- */}
        {/* assignment name */}
        <View
          style={{
            backgroundColor: "white",
            width: 340,
            minHeight: 400,
            maxHeight: 800,
            marginBottom: 20,
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 20,
            borderRadius: 8,
            elevation: 15,
            shadowColor: "#748c94",
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              alignItems: "flex-start",
              //   backgroundColor: "green",
              padding: 12,
              margin: 5,
            }}
          >
            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <BookOpenIcon
                color={"#E90064"}
                height={20}
                width={20}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 17, margin: 5, textTransform: "capitalize" }}
              >
                {assignment.assignmentName
                  ? assignment.assignmentName
                  : "assignment name"}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <BookOpenIcon
                color={"#E90064"}
                height={20}
                width={20}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 17, margin: 5, textTransform: "capitalize" }}
              >
                {assignment.assignmentBudget
                  ? assignment.assignmentBudget
                  : "assignment budget"}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <BookOpenIcon
                color={"#E90064"}
                height={20}
                width={20}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 17, margin: 5, textTransform: "capitalize" }}
              >
                {assignment.assignmentType
                  ? assignment.assignmentType
                  : "assignment Type"}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <BookOpenIcon
                color={"#E90064"}
                height={20}
                width={20}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  fontSize: 17,
                  margin: 5,

                  width: 250,
                }}
              >
                {assignment.description
                  ? assignment.description
                  : "assignment budget"}
              </Text>
            </View>
          </View>

          {assignment.attachments ? (
            <View>
              <View
                style={{
                  backgroundColor: "#E90064",
                  width: 280,
                  height: 180,
                }}
              >
                {/* <Image source={{ uri: assignment.attachments[0] }} /> */}
                <Image
                  source={Profilepic}
                  style={{
                    width: 280,
                    height: 180,
                  }}
                />
              </View>
              {bidingClosed ? (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#E90064",
                      height: 60,
                      width: 60,
                      justifyContent: "space-around",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <ArrowDownTrayIcon color={"white"} height={40} width={40} />
                  </View>
                  <View
                    style={{
                      backgroundColor: "#E90064",
                      justifyContent: "space-around",
                      alignItems: "center",
                      height: 60,
                      width: 90,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>Bid</Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E90064",
                      height: 60,
                      width: 60,
                      justifyContent: "space-around",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <ArrowDownTrayIcon color={"white"} height={40} width={40} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#E90064",
                      justifyContent: "space-around",
                      alignItems: "center",
                      height: 60,
                      width: 90,
                      borderRadius: 5,
                    }}
                    onPress={() => setBidModel(true)}
                  >
                    <Text style={{ color: "white", fontSize: 20 }}>Bid</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ) : (
            ""
          )}
        </View>
        {/* user bids */}
        <View>
          <Text style={{ fontSize: 20, color: "grey" }}>User Bids</Text>
        </View>
        <View style={{ marginBottom: 40 }}>
          {loader ? (
            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <ActivityIndicator color={"#E90064"} size={30} />
            </View>
          ) : (
            allBids.map((item, index) => {
              console.log("-----------------------------------------");
              console.log("item: ", item);

              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: "white",
                    width: 350,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    padding: 14,
                    margin: 10,
                    marginBottom: 15,
                    borderRadius: 3,
                    elevation: 15,
                    shadowColor: "#748c94",
                  }}
                >
                  <View
                    style={{
                      //   backgroundColor: "green",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <UserIcon color={"#E90064"} height={40} width={40} />
                    <Text style={{ fontSize: 14, textTransform: "capitalize" }}>
                      {item.user.firstName + " " + item.user.lastName}
                    </Text>
                    <Text style={{ color: "grey" }}>
                      {item.user.profession}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#E90064",
                      height: 100,
                      width: 2,
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      //   backgroundColor: "pink",
                      width: 200,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <CurrencyRupeeIcon
                        color={"#E90064"}
                        height={30}
                        width={30}
                      />
                      <Text
                        style={{
                          fontSize: 17,
                          color: "grey",
                          fontWeight: "500",
                        }}
                      >
                        {" "}
                        {item.finalPrice}{" "}
                      </Text>
                    </View>
                    <Text style={{ fontWeight: "500", fontSize: 16 }}>
                      {item.userMessage}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
          {/* zero projects */}
          {!loader ? (
            zeroBid ? (
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Text style={{ fontSize: 17 }}>No one has bidded yet</Text>
                <Text style={{ fontSize: 17 }}>on this project!</Text>
              </View>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {/* bidding closed */}
          {!loader ? (
            bidingClosed ? (
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 10,
                  marginBottom: 30,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "grey" }}
                >
                  {" "}
                  bid has been accepted{" "}
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "grey" }}
                >
                  ---{"   "} Bids are closed now!{"   "}---
                </Text>
              </View>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </View>
      </View>
      {/* bid model */}
      {bidModel ? (
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
                backgroundColor: "white",
                height: 450,
                width: 300,
                justifyContent: "space-around",
                alignItems: "center",
                // flexDirection: "column",
                borderRadius: 5,
                borderColor: "#E90064",
                borderWidth: 2,
              }}
            >
              <View
                style={{
                  alignItems: "flex-end",
                  width: 250,
                  marginTop: 15,
                  marginBottom: 15,
                }}
              >
                <TouchableOpacity
                  style={{ backgroundColor: "#E90064", borderRadius: 3 }}
                  onPress={() => setBidModel(false)}
                >
                  <XMarkIcon color={"white"} height={40} width={40} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  //   backgroundColor: "green",
                  height: 400,
                  width: 250,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    color: "grey",
                  }}
                >
                  Bid on this Project
                </Text>
                <View style={{ width: 270 }}>
                  <Text style={{ fontSize: 18 }}>Your Budget</Text>
                  <TextInput
                    style={{
                      backgroundColor: "#E90064",
                      color: "white",
                      padding: 10,
                      fontSize: 18,
                      borderRadius: 3,
                    }}
                    keyboardType="numeric"
                    onChangeText={(text) => setField(text, "finalPrice")}
                  />
                </View>
                <View style={{ width: 270 }}>
                  <Text style={{ fontSize: 18 }}>Description</Text>
                  <TextInput
                    style={{
                      backgroundColor: "#E90064",
                      padding: 5,
                      color: "white",
                      fontSize: 18,
                      minHeight: 50,
                      maxHeight: 180,
                      borderRadius: 3,
                    }}
                    onChangeText={(text) => setField(text, "userMessage")}
                    multiline={true}
                    numberOfLines={4}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E90064",
                    width: 100,
                    height: 50,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 3,
                  }}
                  onPress={async () => {
                    await postBidonTask();
                  }}
                >
                  {bidLoader ? (
                    <ActivityIndicator color={"white"} size={30} />
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "700",
                        fontSize: 25,
                      }}
                    >
                      BID
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
    </KeyboardAwareScrollView>
  );
};

export default ViewAssignment;
