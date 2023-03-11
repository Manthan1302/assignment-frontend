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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
} from "react-native-heroicons/outline";
import { getAllAssingmentServices } from "../../services/oneForAll";

const UserMain = () => {
  const navigation = useNavigation();

  // const [assignments, setAssignments] = useState([]);

  const [assignments, setAssignments] = useState([
    {
      __v: 0,
      _id: "63bbb788fdd68b90e18224d7",
      assignmentBudget: 5000,
      assignmentName: "laravel admin pannel",
      assignmentStatus: "pending",
      assignmentType: "soft copy",
      attachments: [
        "http://localhost:4300/clientAttachments/attachments_1673246600503.pdf",
      ],
      client: "63adae033d9f89a79dfe8d61",
      createdAt: "2023-01-09T06:43:20.646Z",
      description: "ecom webapp based on e pharmacy 3-5 page",
      updatedAt: "2023-01-09T06:43:20.646Z",
    },
    {
      __v: 0,
      _id: "63bbb788fdd68b90e18224d7",
      assignmentBudget: 6000,
      assignmentName: "epharm app",
      assignmentStatus: "done",
      assignmentType: "soft copy",
      attachments: [
        "http://localhost:4300/clientAttachments/attachments_1673246600503.pdf",
      ],
      client: "63adae033d9f89a79dfe8d61",
      createdAt: "2023-01-09T06:43:20.646Z",
      description: "ecom webapp based on e pharmacy 3-5 page",
      updatedAt: "2023-01-09T06:43:20.646Z",
    },
    {
      __v: 0,
      _id: "63bbb788fdd68b90e18224d7",
      assignmentBudget: 8000,
      assignmentName: "flutter ecom app",
      assignmentStatus: "pending",
      assignmentType: "soft copy",
      attachments: [
        "http://localhost:4300/clientAttachments/attachments_1673246600503.pdf",
      ],
      client: "63adae033d9f89a79dfe8d61",
      createdAt: "2023-01-09T06:43:20.646Z",
      description: "ecom webapp based on e pharmacy 3-5 page",
      updatedAt: "2023-01-09T06:43:20.646Z",
    },
    {
      __v: 0,
      _id: "63bbb788fdd68b90e18224d7",
      assignmentBudget: 10000,
      assignmentName: "php hotel website",
      assignmentStatus: "pending",
      assignmentType: "soft copy",
      attachments: [
        "http://localhost:4300/clientAttachments/attachments_1673246600503.pdf",
      ],
      client: "63adae033d9f89a79dfe8d61",
      createdAt: "2023-01-09T06:43:20.646Z",
      description: "ecom webapp based on e pharmacy 3-5 page",
      updatedAt: "2023-01-09T06:43:20.646Z",
    },
  ]);

  // const [loader, setLoader] = useState(false);
  const [loader, setLoader] = useState(true);

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

    getAssignments();
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getAssignments = async () => {
    setLoader(true);
    const data = await getAllAssingmentServices();

    const { theData, error } = data;
    console.log("theData: ", theData);

    error && theData === undefined
      ? ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      : "";

    theData ? setLoader(false) : setLoader(true);

    // theData ? setAssignments(theData) : [];
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
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
          // all the assignments
          assignments.map((item) => {
            if (item.assignmentStatus === "pending") {
              return (
                <View
                  key={item}
                  style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: 350,
                      height: 80,
                      backgroundColor: "white",
                      justifyContent: "space-around",
                      alignItems: "center",
                      borderRadius: 5,
                      shadowColor: "#748c94",
                      elevation: 10,

                      marginTop: 10,
                      marginBottom: 17,
                    }}
                  >
                    <View style={{ width: 150 }}>
                      <Text style={{ fontWeight: "500" }}>
                        {item.assignmentName}
                      </Text>
                      <Text style={{ fontWeight: "500" }}>
                        {item.assignmentType}
                      </Text>
                    </View>

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

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#E90064",
                        width: 60,
                        height: 40,
                        justifyContent: "space-around",
                        alignItems: "center",
                        borderRadius: 3,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        view
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          })
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default UserMain;
