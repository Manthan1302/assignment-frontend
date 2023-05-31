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
  Modal,
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
  NewspaperIcon,
  TrashIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { deleteMyBidService, getMyBidsService } from "../../services/oneForAll";
import {
  Bars3CenterLeftIcon,
  DocumentTextIcon,
} from "react-native-heroicons/solid";

const UserBids = () => {
  const navigation = useNavigation();

  const userToken = useSelector((state) => state.user).token;
  const [loader, setLoader] = useState(false);
  const [myBids, setMyBids] = useState([]);

  const [bidInfo, setBidInfo] = useState("");
  const [modalStatus, setModalStatus] = useState(false);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `My Bids`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  useEffect(() => {
    getMyBids();
  }, []);

  const getMyBids = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const result = await getMyBidsService({ headers });

    const { findMyBid, error } = result;

    findMyBid
      ? findMyBid.sort(function (a, b) {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          return dateA - dateB;
        })
      : "";

    findMyBid ? setMyBids(findMyBid) : "";

    findMyBid ? setLoader(false) : setLoader(false);

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  };

  const deleteMyBid = async (_id) => {
    console.log("_id: ", _id);
    setLoader(true);

    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const result = await deleteMyBidService({ _id, headers });

    const { deletedBid, error } = result;
    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    if (deletedBid) {
      ToastAndroid.show(
        `Bid deleted Successfully!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    setModalStatus(false);
    getMyBids();
  };

  return (
    <KeyboardAwareScrollView>
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
          <View>
            {myBids.length !== 0 ? (
              myBids.map((item, index) => {
                console.log("---------------------------------------------");
                console.log("item: ", item);

                if (item.bidStatus === "accepted") {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: 15,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          width: 350,
                          borderRadius: 3,
                          padding: 7,
                          elevation: 15,
                          shadowColor: "#748c94",
                        }}
                      >
                        <NewspaperIcon
                          color={"#E90064"}
                          height={40}
                          width={40}
                        />
                        <View
                          style={{
                            // backgroundColor: "green",
                            width: 200,
                            minHeight: 80,
                            maxHeight: 200,
                            alignItems: "flex-start",
                            justifyContent: "space-around",
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
                          <Text> {item.userMessage}</Text>
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
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#E90064",
                            width: 60,
                            height: 40,
                            justifyContent: "space-around",
                            alignItems: "center",
                            borderRadius: 3,
                          }}
                          onPress={() => {
                            setModalStatus(true), setBidInfo(item);
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "500",
                            }}
                          >
                            info
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: 15,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                          width: 350,
                          borderRadius: 3,
                          padding: 7,
                          elevation: 15,
                          shadowColor: "#748c94",
                        }}
                      >
                        <NewspaperIcon
                          color={"#E90064"}
                          height={40}
                          width={40}
                        />
                        <View
                          style={{
                            // backgroundColor: "green",
                            width: 200,
                            minHeight: 80,
                            maxHeight: 200,
                            alignItems: "flex-start",
                            justifyContent: "space-around",
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
                          <Text> {item.userMessage}</Text>
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
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#E90064",
                            width: 60,
                            height: 40,
                            justifyContent: "space-around",
                            alignItems: "center",
                            borderRadius: 3,
                          }}
                          onPress={() => {
                            setModalStatus(true), setBidInfo(item);
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: "500",
                            }}
                          >
                            info
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
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
          </View>

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

export default UserBids;
