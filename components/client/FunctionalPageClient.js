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
  ScrollView,
  RefreshControl,
  Modal,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  EyeIcon,
  EyeSlashIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
  CurrencyRupeeIcon,
  PencilSquareIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import {
  deleteComplaintClientApi,
  getClientAssigments,
  getClientBidsService,
  getComplaintClientApi,
  postCompaintClientApi,
  postFeedbackClientApi,
  createPayemntIntentService,
  getAllPaymentService,
  payAmountService,
} from "../../services/oneForAll";
import { useStripe } from "@stripe/stripe-react-native";

const FunctionalPageClient = ({ route }) => {
  const navigation = useNavigation();
  const { screenName } = route.params;

  const [refresh, setRefresh] = useState(false);

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

  const _id = useSelector((state) => state.client)._id;
  const token = useSelector((state) => state.client).token;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${screenName}`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  if (screenName === "Project History") {
    useEffect(() => {
      getAssignments();
    }, []);

    const [assignments, setAssignments] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loader, setLoader] = useState(false);

    const getAssignments = async () => {
      setLoader(true);

      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const data = await getClientAssigments({ _id, headers });

      const { myAssignments, error } = data;
      console.log("myAssignments: ", myAssignments);

      error && myAssignments === undefined
        ? ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        : "";

      myAssignments ? setLoader(false) : setLoader(false), setRefresh(false);

      myAssignments ? setAssignments(myAssignments) : [];
    };

    return (
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getAssignments()}
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
                  width: 140,
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
          // all the assignments

          <View style={{ marginBottom: 100 }}>
            {assignments.length !== 0 ? (
              assignments.map((item, index) => {
                console.log("item: ", item);

                const created = new Date(item.createdAt);
                const cd = created.getDate();
                const cm = created.getMonth();
                const cy = created.getFullYear();

                const done = new Date(item.updatedAt);
                const dd = done.getDate();
                const dm = done.getMonth();
                const dy = done.getFullYear();

                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      marginTop: 25,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: 350,
                        minHeight: 90,
                        maxHeight: "auto",
                        padding: 10,
                        backgroundColor: "white",
                        justifyContent: "space-around",
                        alignItems: "center",
                        borderRadius: 5,
                        shadowColor: "#748c94",
                        elevation: 10,
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{
                          width: 200,
                          padding: 10,
                          //   backgroundColor: "green",
                        }}
                      >
                        <Text style={{ fontWeight: "500" }}>
                          {item.assignmentName}
                        </Text>
                        <Text style={{ fontWeight: "500" }}>
                          {item.assignmentType}
                        </Text>
                        {item.assignmentStatus === "pending" ? (
                          <Text style={{ fontWeight: "500", color: "red" }}>
                            pending*
                          </Text>
                        ) : (
                          <Text style={{ fontWeight: "500", color: "green" }}>
                            completed*
                          </Text>
                        )}

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <CurrencyRupeeIcon
                            color={"#E90064"}
                            height={25}
                            width={25}
                          />
                          <Text
                            style={{
                              fontWeight: "500",
                            }}
                          >
                            {item.assignmentBudget}
                          </Text>
                        </View>
                      </View>

                      <View style={{ justifyContent: "flex-start" }}>
                        <Text style={{ color: "grey", fontWeight: "600" }}>
                          created . {cd + "-" + cm + "-" + cy}
                        </Text>

                        <Text
                          style={{
                            textAlign: "left",
                            fontWeight: "600",
                          }}
                        >
                          {item.assignmentStatus === "done"
                            ? `done . ${dd + "-" + dm + "-" + dy}`
                            : ""}
                        </Text>
                      </View>
                    </View>
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
                  No Orders placed yet!
                </Text>
              </View>
            )}
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }

  if (screenName === "Notifications") {
    useEffect(() => {
      getAllBids();
    }, []);

    const [userBids, setAllbids] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loader, setLoader] = useState(false);

    const getAllBids = async () => {
      setLoader(true);

      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const data = await getClientBidsService({ _id, headers });

      const { allBids, error } = data;
      console.log("allBids: ", allBids);

      error && allBids === undefined
        ? ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        : "";

      allBids ? setLoader(false) : setLoader(false), setRefresh(false);

      allBids ? setAllbids(allBids) : [];
    };

    return (
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getAssignments()}
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
                  width: 140,
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
          <View>
            {userBids.length !== 0 ? (
              userBids.map((item, index) => {
                console.log("---------------------------------------------");
                console.log("item: ", item);

                if (item.assignment !== null) {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: 15,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ClientBid", {
                            assignment: item?.assignment,
                          })
                        }
                      >
                        {item.bidStatus === "pending" ? (
                          <View
                            style={{
                              backgroundColor: "pink",
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
                              // onPress={}
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
                                  //   backgroundColor: "orange",
                                }}
                              >
                                <View
                                  style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    flexDirection: "row",
                                  }}
                                >
                                  <Text
                                    style={{ fontSize: 17, marginBottom: 5 }}
                                  >
                                    {item.assignment.assignmentName}
                                  </Text>
                                </View>
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
                                  {" "}
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
                                  //   backgroundColor: "orange",
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
                                  <Text
                                    style={{ fontSize: 17, marginBottom: 5 }}
                                  >
                                    {item.assignment.assignmentName}
                                  </Text>
                                </View>
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
                                      accepted *
                                    </Text>
                                  ) : (
                                    <Text style={{ color: "red" }}>
                                      rejected *
                                    </Text>
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </TouchableOpacity>
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
        )}
      </KeyboardAwareScrollView>
    );
  }

  if (screenName === "Payments") {
    const navigation = useNavigation();
    const [allOrders, setAllOrders] = useState([]);

    const [refresh, setRefresh] = useState(false); // pull-down-refresh
    const [loader, setLoader] = useState(false); // loader state

    useEffect(() => {
      getAllPayments();
    }, []);

    const getAllPayments = async () => {
      setLoader(true);
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const response = await getAllPaymentService({ headers });

      const { allPayments, error } = response;
      console.log("allPayments ->: ", allPayments);
      response ? setLoader(false) : setLoader(false);

      if (allPayments) {
        setAllOrders(allPayments);
      }

      if (error) {
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    };

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    // payment gateway
    const payForService = async (item) => {
      const headers = { headers: { Authorization: `Bearer ${token}` } };

      setLoader(true);

      // create payment intent ->
      const intentId = await createPayemntIntentService({
        amount: item.assignmentCost,
        headers,
      });

      const { paymentIntent, error } = intentId;
      console.log("paymentIntent: ", paymentIntent);

      if (error) {
        console.log("error: ", error);
        return;
      }

      paymentIntent ? setLoader(false) : setLoader(false);
      // initialize pament sheet
      const initPayment = await initPaymentSheet({
        merchantDisplayName: `taskify`,
        paymentIntentClientSecret: paymentIntent, //payment intent
        style: "alwaysDark",
      });

      console.log("initPayment: ", initPayment);

      if (initPayment.error) {
        console.log("initPayment.error: ", initPayment.error);

        return;
      }

      // present the payment sheet
      const paymentResponse = await presentPaymentSheet();

      if (paymentResponse.error) {
        console.log("paymentResponse.error: ", paymentResponse.error);
        return;
      }

      //call other payemnt gateway mechanism

      if (paymentResponse) {
        setLoader(true);
        const response = await payAmountService(item._id, headers);

        const { success, error } = response;

        if (error) {
          return ToastAndroid.show(
            `${error.message}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }

        ToastAndroid.show(
          `${success}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        getAllPayments();
      }
    };

    let notDone = 0;

    return (
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getAllPayments()}
          />
        }
      >
        {/* container */}
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
          <View style={{ margin: 15 }}>
            {allOrders.length !== 0 ? (
              allOrders.map((item, index) => {
                console.log("item all orders: ", item);
                console.log("_---------------------------------------------");

                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "white",
                      marginTop: 10,
                      marginBottom: 10,
                      borderRadius: 5,
                      justifyContent: "space-around",
                      alignItems: "center",
                      flexDirection: "row",
                      minHeight: 90,
                      maxHeight: "auto",
                      shadowColor: "black",
                      elevation: 10,
                      padding: 5,
                    }}
                  >
                    <View
                      style={{
                        // backgroundColor: "pink",
                        width: 230,
                        margin: 7,
                        minHeight: 70,
                        maxHeight: "auto",
                        alignItems: "flex-start",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Text
                        style={{
                          textTransform: "capitalize",
                          fontSize: 17,
                          fontWeight: "400",
                          marginBottom: 7,
                        }}
                      >
                        Task . {item.assignment.assignmentName}
                      </Text>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          fontSize: 15,
                          fontWeight: "400",
                        }}
                      >
                        my budget . {item.assignment.assignmentBudget}
                      </Text>
                      <Text
                        style={{
                          textTransform: "capitalize",
                          fontSize: 15,
                          fontWeight: "400",
                        }}
                      >
                        locked on price . {item.assignmentCost}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "grey",
                          fontSize: 15,
                          textTransform: "capitalize",
                          color: "#E90064",
                          marginTop: 7,
                        }}
                      >
                        work status . {item.order.workStatus}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "#E90064",
                          fontSize: 15,
                          textTransform: "capitalize",
                          textAlign: "center",
                        }}
                      >
                        freelancer . {item.order.paymentStatus}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "#E90064",
                          fontSize: 15,
                          textTransform: "capitalize",
                          textAlign: "center",
                        }}
                      >
                        payment .{" "}
                        {item.paymentInfo === "pending" ? "pending" : "done"}
                      </Text>
                    </View>

                    {item.order.paymentStatus === "asked for payment" ? (
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#E90064",
                          height: 40,
                          width: 100,
                          borderRadius: 3,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                        onPress={() => payForService(item)}
                      >
                        <Text style={{ fontSize: 16, color: "white" }}>
                          PAY . {item.assignmentCost}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View
                        style={{
                          backgroundColor: "#E90064",
                          height: 40,
                          width: 60,
                          borderRadius: 3,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 16, color: "white" }}>
                          PAID
                        </Text>
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
                  No Orders cmpleted for payments!
                </Text>
              </View>
            )}

            {/* no bookings */}
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }

  //   about taskify screen
  if (screenName === "About Taskify") {
    return (
      <View style={{ justifyContent: "space-around", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            width: 330,
            height: 550,
            padding: 25,
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 70,
            borderRadius: 8,
            elevation: 15,
            shadowColor: "#748c94",
          }}
        >
          <Text style={{ fontSize: 25, color: "#E90064", fontWeight: "500" }}>
            {" "}
            About{" "}
          </Text>
          <Text style={{ fontSize: 16 }}>
            This application is a startup for any person like : Student after
            12th , unemployed person, graduation, after graduation, full or part
            time job ,housewives, etc. because after covid , many people want to
            open their own start-up, is not only useful for agencies ,
            businesman but also for students and for any housewife.
          </Text>
          <Text style={{ fontSize: 16 }}>
            From this application many people can get opportunity to show their
            talent and earn online from home.
          </Text>
          <Text style={{ fontSize: 16 }}>
            Many websites is there like this we will see it in further slides
            but in that only experienced person can do work but in this website
            non-experienced person can get work .
          </Text>
        </View>
      </View>
    );
  }

  //   customer support page
  if (screenName === "Customer Support") {
    useEffect(() => {
      getComplaint();
    }, []);
    const [feedback, setFeedback] = useState("");
    const [complaint, setComplaint] = useState("");
    const [allMyComplaints, setMyComplaints] = useState([]);
    const [feedLoader, setFeedLoader] = useState(false); //button loader
    const [complaintLoader, setComplaintLoader] = useState(false); //button loader

    const [mainLoader, setMainLoader] = useState(false); // loader loader

    const postFeedback = async () => {
      if (!token) {
        return ToastAndroid.show(
          `Please login first!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      setFeedLoader(true);

      if (feedback === "") {
        return ToastAndroid.show(
          `add your feedback first!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const reply = await postFeedbackClientApi({ feedback, headers });
      const { feed, error } = reply;

      feed ? setFeedLoader(false) : setFeedLoader(false);

      if (error) {
        return ToastAndroid.show(
          `${error}!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      if (feed) {
        return ToastAndroid.show(
          `Thanks for your feedback!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    };

    const postComplaint = async () => {
      if (!token) {
        return ToastAndroid.show(
          `Please login first!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
      setComplaintLoader(true);

      if (complaint === "") {
        return ToastAndroid.show(
          `add your complaint first!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const reply = await postCompaintClientApi({ complaint, headers });
      const { addComplaint, error } = reply;
      console.log("addComplaint: ", addComplaint);

      addComplaint ? setComplaintLoader(false) : setComplaintLoader(false);

      if (error) {
        setComplaint("");
        getComplaint();
        return ToastAndroid.show(
          `${error}!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      if (addComplaint) {
        setComplaint("");
        getComplaint();
        return ToastAndroid.show(
          `your complaint has been added!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    };

    const getComplaint = async () => {
      if (!token) {
        return ToastAndroid.show(
          `Please login first!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
      setMainLoader(true);

      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const reply = await getComplaintClientApi({ headers });
      const { myComplaints, error } = reply;
      console.log("myComplaints: ", myComplaints);

      myComplaints ? setMainLoader(false) : setMainLoader(false);

      myComplaints ? setMyComplaints(myComplaints) : setMyComplaints([]);

      if (error) {
        return ToastAndroid.show(
          `${error}!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    };

    const deleteComplaint = async (id) => {
      if (!token) {
        return ToastAndroid.show(
          `Please login first!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
      setMainLoader(true);

      const headers = { headers: { Authorization: `Bearer ${token}` } };

      const reply = await deleteComplaintClientApi({ id, headers });
      const { feedDeleted, error } = reply;

      // feedDeleted ? setMainLoader(false) : setMainLoader(false);

      if (feedDeleted) {
        getComplaint();

        return ToastAndroid.show(
          `complaint deleted!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      if (error) {
        return ToastAndroid.show(
          `${error}!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    };

    return (
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getComplaint()}
          />
        }
      >
        {mainLoader ? (
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
          <View style={{ marginBottom: 100 }}>
            <View
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  height: 250,
                  width: 330,
                  padding: 20,
                  marginTop: 20,
                  marginBottom: 20,
                  borderRadius: 5,
                  shadowColor: "#748c94",
                  elevation: 20,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Tell something you liked about our app {">>>"}
                </Text>
                <TextInput
                  multiline={true}
                  style={{
                    backgroundColor: "#E90064",
                    width: 230,
                    height: 80,
                    borderRadius: 5,
                    color: "white",
                    fontSize: 17,
                    padding: 10,
                    fontWeight: "600",
                  }}
                  onChangeText={(text) => setFeedback(text)}
                />
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 120,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderBottomColor: "#E90064",
                    borderBottomWidth: 2,
                    // backgroundColor: "green",
                  }}
                  onPress={() => postFeedback()}
                >
                  {feedLoader ? (
                    <ActivityIndicator color={"#E90064"} size={30} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 19,
                        fontWeight: "500",
                        color: "#E90064",
                      }}
                    >
                      Submit!
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {/* complaints */}
            <View
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <View
                style={{
                  backgroundColor: "#E90064",
                  height: 250,
                  width: 330,
                  padding: 20,
                  // marginTop: 0,
                  marginBottom: 30,
                  borderRadius: 5,
                  shadowColor: "#748c94",
                  elevation: 20,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, textAlign: "center", color: "white" }}
                >
                  Faced Some problems , Tell us below {">>>"}
                </Text>
                <TextInput
                  multiline={true}
                  style={{
                    backgroundColor: "white",
                    width: 230,
                    height: 50,
                    borderRadius: 5,
                    color: "#E90064",
                    fontSize: 17,
                    padding: 10,
                    fontWeight: "600",
                  }}
                  value={complaint}
                  onChangeText={(text) => setComplaint(text)}
                />
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 120,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderBottomColor: "white",
                    borderBottomWidth: 2,
                    // backgroundColor: "green",
                  }}
                  onPress={() => postComplaint()}
                >
                  {complaintLoader ? (
                    <ActivityIndicator color={"white"} size={30} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 19,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      List Down!
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {allMyComplaints.length !== 0
              ? allMyComplaints.map((item, index) => {
                  if (item.complaintStatus === "false") {
                    return (
                      <View
                        style={{
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginBottom: 20,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            backgroundColor: "white",
                            width: 360,
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexDirection: "row",
                            padding: 10,
                            borderRadius: 5,
                            shadowColor: "#748c94",
                            elevation: 20,
                          }}
                        >
                          <View
                            style={{
                              width: 270,
                              padding: 10,
                            }}
                          >
                            <Text
                              style={{
                                color: "grey",
                                fontSize: 15,
                                fontWeight: "500",
                                margin: 5,
                              }}
                            >
                              {item._id}
                            </Text>
                            <Text>{item.complaint}</Text>
                            {item.admin ? <Text>{item.admin}</Text> : ""}
                            {item.complaintStatus === "false" ? (
                              <Text style={{ color: "red" }}>pending*</Text>
                            ) : (
                              <Text style={{ color: "green" }}>solved*</Text>
                            )}
                          </View>

                          <TouchableOpacity
                            style={{
                              backgroundColor: "#E90064",
                              padding: 10,
                              borderRadius: 3,
                            }}
                            onPress={() => deleteComplaint(item._id)}
                          >
                            <TrashIcon color={"white"} size={30} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  }
                })
              : ""}
          </View>
        )}
      </KeyboardAwareScrollView>
    );
  }

  //   frequently asked question page
  if (screenName === "Privacy Policy") {
    return (
      <View style={{ justifyContent: "space-around", alignItems: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Information We Collect
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              You directly provide us with most of the information we collect:
              when you register to the Site, use it, complete forms, or register
              to any of our programs. We also collect information about your
              communications with Taskify as well as any of your posts on our
              blogs or forums and your communication with other users of
              Taskify. In addition, we automatically collect information while
              you access, browse, view or otherwise use the Site and receive
              information from third party vendors or other available sources.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Our Legal Basis for Using Your Personal Information
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Where relevant under applicable laws, all processing of your
              personal information will be justified by a "lawful ground" for
              processing as detailed below.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              How Do We Use the Information Collected ?
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We use personal information to provide you with quality service
              and security, to operate the Site, understand how people use the
              Site, and to perform our obligations to you; to ensure marketplace
              integrity and security; to prevent fraud; to contact you and send
              you direct marketing communications; to promote and advertise the
              Site, our services and the Taskify marketplace; to comply with
              lawful requests by public authorities and to comply with
              applicable laws and regulations.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              How Long Do We Keep Personal Information
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We will keep personal information only for as long as is required
              to fulfil the purpose for which it was collected. However, in some
              cases we will retain personal information for longer periods of
              time.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Children
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              This Site is offered and available to users who are at least 18
              years of age and of legal age to form a binding contract. Minors
              under 18 and at least 13 years of age, are only permitted to use
              the Site through an account owned by a parent or legal guardian
              with their appropriate permission. Minors under 13 are not
              permitted to use the Site or the Taskify services. We do not
              knowingly collect personal information from children under 13.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Sharing Personal Information with Third Parties
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We share personal information with third parties in order to
              operate the Site, provide our services to you, fulfil obligations
              imposed on us by applicable laws and regulations, and prevent
              fraud, infringements and illegal activities.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Security
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We implement technical and organizational measures to maintain the
              security of the Site and your personal information and in
              preventing unauthorized access, loss, misuse, alteration,
              destruction or damage to it through industry standard technologies
              and internal procedures.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Updating Personal Information
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We take steps to ensure that the personal information we collect
              is accurate and up to date, and we provide you with the
              opportunity to update your information through your account
              profile settings. In the event that you believe your information
              is in any way incorrect or inaccurate, please let us know
              immediately.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Our Legal Basis for Using Your Personal Information
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Where relevant under applicable laws, all processing of your
              personal information will be justified by a "lawful ground" for
              processing as detailed below.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // terms and conditions page
  if (screenName === "Terms & Conditions") {
    return (
      <View style={{ justifyContent: "space-around", alignItems: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            User Conduct
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Users of the freelancing platform must act with integrity and
              honesty at all times. Any fraudulent or illegal activity will not
              be tolerated.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Payment
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The freelancing platform will charge a commission on all payments
              made through the platform. This commission will be clearly stated
              and agreed upon by the user.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Termination
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform reserves the right to terminate any user account at
              any time for any reason, without prior notice.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Intellectual Property
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Users retain all ownership rights to their intellectual property.
              However, by using the platform, users grant the platform a license
              to use their intellectual property for the purpose of promoting
              the platform.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Communication
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform provides communication tools for users to communicate
              with each other. However, the platform reserves the right to
              monitor these communications and take action if necessary.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Feedback
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Users are encouraged to leave feedback for each other, but all
              feedback must be fair and honest. The platform reserves the right
              to remove any feedback that is deemed to be unfair or dishonest.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Disputes
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform provides a dispute resolution process for users to
              resolve any disputes that may arise. Users are expected to use
              this process in good faith.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Confidentiality
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Users must keep all confidential information obtained through the
              platform confidential. This includes any information about other
              users, the platform itself, or any projects being worked on.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Liability
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform is not liable for any damages or losses incurred by
              users as a result of using the platform.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Changes to Terms and Conditions
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform reserves the right to change these terms and
              conditions at any time. Users will be notified of any changes and
              must agree to the new terms in order to continue using the
              platform.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default FunctionalPageClient;
