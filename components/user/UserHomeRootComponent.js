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
import { UserIcon, UserGroupIcon } from "react-native-heroicons/outline";
import { getAllAssingmentServices } from "../../services/oneForAll";

const UserMain = () => {
  const navigation = useNavigation();

  const [assignments, setAssignments] = useState([]);

  const [loader, setLoader] = useState(false);

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

    theData ? setAssignments(theData) : [];
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
            return (
              <View>
                <View>
                  <Text>Assignment name</Text>
                  <Text>Assignment type</Text>
                </View>

                <Text>budget</Text>

                <TouchableOpacity>
                  <Text>view</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default UserMain;
