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

const UserNotifications = () => {
  const navigation = useNavigation();

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
      headerTitle: `Notifications`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  return <Text>USer notifictaions</Text>;
};

export default UserNotifications;
