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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserIcon, UserGroupIcon } from "react-native-heroicons/outline";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMain from "./UserHomeRootComponent";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const UserChat = () => {
  const userToken = useSelector((state) => state.user).token;

  if (!userToken) {
    return (
      <SafeAreaView
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 200,
        }}
      >
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <Text style={{ color: "grey", fontSize: 20, fontWeight: "400" }}>
            You are not Logged In!
          </Text>
          <Text style={{ color: "grey", fontSize: 20, fontWeight: "400" }}>
            Please login first!
          </Text>
          <Text style={{ color: "grey", fontSize: 20, fontWeight: "400" }}>
            To see your Chats
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Text>my chats</Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default UserChat;
