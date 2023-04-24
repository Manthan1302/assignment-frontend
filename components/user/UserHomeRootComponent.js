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
  CurrencyRupeeIcon,
} from "react-native-heroicons/outline";
import { getAllAssingmentServices } from "../../services/oneForAll";

const UserMain = () => {
  const navigation = useNavigation();

  const [assignments, setAssignments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);
  // const [loader, setLoader] = useState(true);

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

 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerBackVisible: false,
      headerTitle: "Tasks",
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
        fontWeight: "500",
      },
    });

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

  const getAssignments = async () => {
    setLoader(true);
    setRefresh(true);
    const data = await getAllAssingmentServices();

    const { theData, error } = data;
    console.log("theData: ", theData);

    error && theData === undefined
      ? ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      : "";

    theData ? setLoader(false) : setLoader(true), setRefresh(false);

    theData ? setAssignments(theData) : [];
  };

  return (
    <KeyboardAwareScrollView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getAssignments()}
          />
        }
      >
        <SafeAreaView>
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
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Loading...
                  </Text>
                </View>
              </View>
            </Modal>
          ) : (
            // all the assignments
            assignments.map((item, index) => {
              if (item.assignmentStatus === "pending") {
                return (
                  <View
                    key={index}
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

                        // marginTop: 10,
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
                        onPress={() =>
                          navigation.navigate("ViewAssignment", {
                            assignment: item,
                          })
                        }
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
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default UserMain;
