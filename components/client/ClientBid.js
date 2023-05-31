import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  BackHandler,
  ToastAndroid,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Modal,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  CreditCardIcon,
  CurrencyRupeeIcon,
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
  NewspaperIcon,
  TrashIcon,
  UserIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import {
  getBidsonTaskServices,
  postOrderServices,
} from "../../services/oneForAll";
import {
  Bars3CenterLeftIcon,
  DocumentTextIcon,
} from "react-native-heroicons/solid";

const ClientBid = ({ route }) => {
  const navigation = useNavigation();
  const { assignment } = route.params;
  console.log(
    "🚀 ~ file: ClientBid.js:40 ~ ClientBid ~ assignment:",
    assignment
  );

  const clientToken = useSelector((state) => state.client).token;
  const [loader, setLoader] = useState(false);
  const [myBids, setMyBids] = useState([]);
  const [refresh, setRefresh] = useState(false);
  // console.log("🚀 ~ file: ClientBid.js:45 ~ ClientBid ~ myBids:", myBids)

  const [bidInfo, setBidInfo] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const backAction = () => {
    // const popAction = StackActions.pop(1);
    // navigation.goBack();
    navigation.navigate("ClientNav");
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Users Bids`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  useEffect(() => {
    getParticularTaskBid();
  }, []);

  const getParticularTaskBid = async () => {
    setLoader(true);
    const _id = assignment._id;
    console.log(_id);
    const headers = { headers: { Authorization: `Bearer ${clientToken}` } };

    const result = await getBidsonTaskServices({ _id });

    const { allTaskBids, error } = result;

    allTaskBids.sort(function (a, b) {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateA - dateB;
    });

    allTaskBids ? setMyBids(allTaskBids) : "";

    allTaskBids ? setLoader(false) : setLoader(false);

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  };

  const acceptBid = async (_id) => {
    try {
      const onClickOk = async () => {
        const headers = { headers: { Authorization: `Bearer ${clientToken}` } };
        // console.log("🚀 ~ file: ClientBid.js:109 ~ acceptBid ~ _id:", _id)

        myBids.map(async (item) => {
          // console.log("item: ", item._id);

          if (_id === item._id) {
            console.log("accepted bid id :", _id);
            const bidStatus = "accepted";
            const data = { bidStatus };

            const result = await postOrderServices({ _id, headers, data });

            const { accepted, error } = result;
            console.log("accepted: ", accepted);

            if (error) {
              return ToastAndroid.show(
                `${error}`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            }

            if (acceptBid) {
              ToastAndroid.show(
                `Bid accepted`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
              getParticularTaskBid();
              return ToastAndroid.show(
                `Order was placed!`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );
            }
          } else {
            console.log("rejected bid id :", item._id);
            rejectAllBid(item._id);
          }
        });
      };

      Alert.alert("Accept Bid", "Are you sure , you want to Accept Bid ?", [
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
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const rejectAllBid = async (_id) => {
    const headers = { headers: { Authorization: `Bearer ${clientToken}` } };
    const bidStatus = "rejected";
    const data = { bidStatus };
    const result = await postOrderServices({ _id, headers, data });
    const { accepted, rejected, error } = result;
    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  };

  const rejectBid = (_id) => {
    console.log("_id: ", _id);
    try {
      const onClickOk = async () => {
        console.log(_id);
        const headers = { headers: { Authorization: `Bearer ${clientToken}` } };
        const bidStatus = "rejected";
        const data = { bidStatus };
        const result = await postOrderServices({ _id, headers, data });
        const { rejected, error } = result;
        console.log("rejected: ", rejected);
        if (error) {
          return ToastAndroid.show(
            `${error}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }

        if (rejected) {
          getBidsonTaskServices();
          return ToastAndroid.show(
            `You rejected a Bid!`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      };
      Alert.alert("Reject Bid", "Are you sure , you want to Reject Bid ?", [
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
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getParticularTaskBid()}
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
            marginBottom: 20,
          }}
        >
          <View
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <View
              style={{
                padding: 15,
                minHeight: 150,
                maxHeight: "auto",
                borderRadius: 5,
                width: 350,
                backgroundColor: "#E90064",
                marginTop: 10,
                elevation: 15,
                shadowColor: "#748c94",
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: "300",
                  padding: 10,
                  color: "white",
                }}
              >
                Task
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                Name . {assignment.assignmentName}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                Description . {assignment.description}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                My budget . {assignment.assignmentBudget}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                Type req . {assignment.assignmentType}
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
                Status . {assignment.assignmentStatus}
              </Text>
            </View>
          </View>

          {myBids.length !== 0 ? (
            myBids.map((item, index) => {
              console.log("---------------------------------------------");
              // console.log("item: ", item);

              return (
                <View
                  key={index}
                  style={{
                    justifyContent: "space-around",
                    alignItems: "center",
                    margin: 15,
                  }}
                >
                  {item.bidStatus === "pending" ? (
                    <View
                      style={{
                        backgroundColor: "white",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: 370,
                        borderRadius: 3,
                        padding: 7,
                        elevation: 15,
                        shadowColor: "#748c94",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "column",
                          backgroundColor: "#E90064",
                          padding: 5,
                          borderRadius: 4,
                        }}
                        onPress={() => {
                          navigation.navigate("ViewUser", {
                            user: item.user,
                          });
                        }}
                      >
                        <UserIcon color={"white"} size={27} />
                        <Text
                          style={{
                            // backgroundColor: "pink",
                            width: 87,
                            textAlign: "center",
                            marginBottom: 8,
                            color: "white",
                            borderBottomColor: "white",
                            borderBottomWidth: 1,
                            marginTop: 2,
                          }}
                        >
                          {item.user.firstName} {item.user.lastName}
                        </Text>
                        <Text
                          style={{
                            // backgroundColor: "pink",
                            width: 87,
                            textAlign: "center",
                            marginBottom: 5,
                            color: "white",
                            borderBottomColor: "white",
                            borderBottomWidth: 1,
                          }}
                        >
                          {item.user.profession}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            width: 87,
                            textAlign: "center",
                          }}
                        >
                          exp . {item.user.experience} . yr
                        </Text>
                      </TouchableOpacity>

                      <View
                        style={{
                          // backgroundColor: "green",
                          width: 250,
                          minHeight: 80,
                          maxHeight: 200,
                          alignItems: "center",
                          justifyContent: "space-around",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            justifyContent: "space-around",
                            alignItems: "flex-start",
                            // backgroundColor: "orange",
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "space-around",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <CurrencyRupeeIcon
                              color={"#E90064"}
                              height={20}
                              width={20}
                            />
                            <Text>{item.finalPrice}</Text>
                          </View>

                          <Text
                            style={{
                              width: 170,
                              marginTop: 10,
                              marginBottom: 10,
                              // backgroundColor: "pink",
                            }}
                          >
                            {" "}
                            {item.userMessage}
                          </Text>
                          <Text>
                            {item.bidStatus === "pending" ? (
                              <Text style={{ color: "red" }}>
                                {item.bidStatus} *
                              </Text>
                            ) : (
                              <Text style={{ color: "green" }}>
                                {item.bidStatus} *
                              </Text>
                            )}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            // backgroundColor: "yellow",
                            height: 95,
                            justifyContent: "space-around",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#E90064",
                              width: 60,
                              height: 40,
                              justifyContent: "space-around",
                              alignItems: "center",
                              borderRadius: 3,
                              color: "white",
                            }}
                            onPress={() => acceptBid(item._id)}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "500",
                              }}
                            >
                              Accept
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#E90064",
                              width: 60,
                              height: 40,
                              justifyContent: "space-around",
                              alignItems: "center",
                              borderRadius: 3,
                              color: "white",
                            }}
                            onPress={() => rejectBid(item._id)}
                          >
                            <Text
                              style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: "500",
                              }}
                            >
                              Reject
                            </Text>
                          </TouchableOpacity>
                          {/*  */}
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: "white",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: 370,
                        borderRadius: 3,
                        padding: 7,
                        elevation: 15,
                        shadowColor: "#748c94",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "column",
                          backgroundColor: "#E90064",
                          padding: 5,
                          borderRadius: 4,
                        }}
                        onPress={() => {
                          navigation.navigate("ViewUser", {
                            user: item.user,
                          });
                        }}
                      >
                        <UserIcon color={"white"} size={27} />
                        <Text
                          style={{
                            // backgroundColor: "pink",
                            width: 87,
                            textAlign: "center",
                            marginBottom: 8,
                            color: "white",
                            borderBottomColor: "white",
                            borderBottomWidth: 1,
                            marginTop: 2,
                          }}
                        >
                          {item.user.firstName} {item.user.lastName}
                        </Text>
                        <Text
                          style={{
                            // backgroundColor: "pink",
                            width: 87,
                            textAlign: "center",
                            marginBottom: 5,
                            color: "white",
                            borderBottomColor: "white",
                            borderBottomWidth: 1,
                          }}
                        >
                          {item.user.profession}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            width: 87,
                            textAlign: "center",
                          }}
                        >
                          exp . {item.user.experience} . yr
                        </Text>
                      </TouchableOpacity>

                      <View
                        style={{
                          // backgroundColor: "green",
                          width: 250,
                          minHeight: 80,
                          maxHeight: 200,
                          alignItems: "center",
                          justifyContent: "space-around",
                          flexDirection: "row",
                        }}
                      >
                        <View
                          style={{
                            justifyContent: "space-around",
                            alignItems: "flex-start",
                            // backgroundColor: "orange",
                            width: 230,
                          }}
                        >
                          <View
                            style={{
                              justifyContent: "space-around",
                              alignItems: "center",
                              flexDirection: "row",
                            }}
                          >
                            <CurrencyRupeeIcon
                              color={"#E90064"}
                              height={20}
                              width={20}
                            />
                            <Text>{item.finalPrice}</Text>
                          </View>

                          <Text
                            style={{
                              width: 230,
                              marginTop: 10,
                              marginBottom: 10,
                              // backgroundColor: "pink",
                            }}
                          >
                            {item.userMessage}
                          </Text>
                          <Text>
                            {item.bidStatus === "accepted" ? (
                              <Text style={{ color: "green" }}>
                                {item.bidStatus} *
                              </Text>
                            ) : (
                              <Text style={{ color: "red" }}>
                                {item.bidStatus} *
                              </Text>
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
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
                No Bids placed yet!
              </Text>
            </View>
          )}

          {modalStatus ? (
            <Modal
              transparent={true}
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              {console.log("bidInfo: ", bidInfo)}
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
                    height: 500,
                    width: 340,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 5,
                    borderColor: "white",
                    borderWidth: 2,
                  }}
                >
                  <View
                    style={{
                      width: 280,
                      alignItems: "flex-end",
                    }}
                  >
                    <TouchableOpacity onPress={() => setModalStatus(false)}>
                      <XMarkIcon
                        color={"#E90064"}
                        size={40}
                        style={{
                          height: 50,
                          width: 50,
                          backgroundColor: "white",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      // backgroundColor: "green",
                      height: 400,
                      width: 280,
                    }}
                  >
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {/* assignment info */}
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 27,
                          width: 280,
                          borderRadius: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: "300",
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          Assignment
                        </Text>

                        <Text
                          style={{ fontSize: 16, textTransform: "capitalize" }}
                        >
                          {bidInfo.assignment.assignmentName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "grey",
                            fontWeight: "500",
                          }}
                        >
                          {bidInfo.assignment.assignmentType}
                        </Text>
                        <View
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: "grey",
                              fontWeight: "500",
                            }}
                          >
                            Budget .{" "}
                          </Text>
                          <CurrencyRupeeIcon color={"#E90064"} size={25} />
                          <Text
                            style={{
                              fontSize: 16,
                              color: "grey",
                              fontWeight: "500",
                            }}
                          >
                            {bidInfo.assignment.assignmentBudget}
                          </Text>
                        </View>
                        <View
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "row",
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>
                            Assignment Status .{" "}
                          </Text>
                          {bidInfo.assignment.assignmentStatus === "pending" ? (
                            <Text style={{ color: "red", fontSize: 16 }}>
                              {bidInfo.assignment.assignmentStatus}
                            </Text>
                          ) : (
                            <Text style={{ color: "green", fontSize: 16 }}>
                              {bidInfo.assignment.assignmentStatus}
                            </Text>
                          )}
                        </View>
                      </View>
                      {/* bid info */}
                      <View
                        style={{
                          backgroundColor: "white",
                          padding: 27,
                          marginTop: 15,
                          borderRadius: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: "300",
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          My Bid
                        </Text>

                        <Text
                          style={{ fontSize: 16, textTransform: "capitalize" }}
                        >
                          {bidInfo.userMessage}
                        </Text>
                        <View
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexDirection: "row",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: "grey",
                              fontWeight: "500",
                            }}
                          >
                            Accepted Offer .{" "}
                          </Text>
                          <CurrencyRupeeIcon color={"#E90064"} size={25} />
                          <Text
                            style={{
                              fontSize: 16,
                              color: "grey",
                              fontWeight: "500",
                            }}
                          >
                            {bidInfo.finalPrice}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={{ fontSize: 16 }}>Bid Status . </Text>
                          {bidInfo.bidStatus === "pending" ? (
                            <Text style={{ color: "red", fontSize: 16 }}>
                              {bidInfo.bidStatus} *
                            </Text>
                          ) : (
                            <Text style={{ color: "green", fontSize: 16 }}>
                              {bidInfo.bidStatus} *
                            </Text>
                          )}
                        </View>
                      </View>

                      {bidInfo.bidStatus === "pending" ? (
                        <View
                          style={{
                            padding: 20,
                            width: 280,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              backgroundColor: "white",
                              flexDirection: "row",
                              height: 70,
                              width: 80,
                              justifyContent: "space-around",
                              alignItems: "center",
                              borderRadius: 3,
                            }}
                            onPress={() => deleteMyBid(bidInfo._id)}
                          >
                            <TrashIcon color={"#E90064"} size={40} />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        ""
                      )}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </Modal>
          ) : (
            ""
          )}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default ClientBid;
