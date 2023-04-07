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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";

const FunctionalPage = ({ route }) => {
  const navigation = useNavigation();
  const { screenName } = route.params;

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
      headerTitle: `${screenName}`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

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
    return (
      <View>
        <Text>customer support page rendered</Text>
      </View>
    );
  }

  //   frequently asked question page
  if (screenName === "Frequenlty Asked Questions") {
    return (
      <View>
        <Text>faq page rendered</Text>
      </View>
    );
  }

  // terms and conditions page
  if (screenName === "Terms & Conditions") {
    return (
      <View>
        <Text>Terms and condition page</Text>
      </View>
    );
  }
};

export default FunctionalPage;
