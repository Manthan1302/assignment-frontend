import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import { ArrowTrendingUpIcon } from "react-native-heroicons/solid";
import { DataTable } from "react-native-paper";
import image from "../4529164.jpg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  UserGroupIcon,
  UserCircleIcon,
  EnvelopeOpenIcon,
  PhoneIcon,
  MapIcon,
  AcademicCapIcon,
  Bars3CenterLeftIcon,
  ChatBubbleBottomCenterIcon,
} from "react-native-heroicons/outline";
import { createClientChatRoomService } from "../../services/oneForAll";
import { useSelector } from "react-redux";

const ViewUser = ({ route }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${user.firstName} ${user.lastName}`,
      headerStyle: {
        backgroundColor: "#E90064",
        textTransform: "capitalize",
      },
      headerTitleStyle: {
        color: "white",
      },
    });

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
  }, []);
  const { user } = route.params;
  console.log("users", user);

  const clientToken = useSelector((state) => state.client).token;
  const [loader, setLoader] = useState(false);

  const createClientchatroom = async () => {
    const userId = user._id;
    setLoader(true);

    const headers = { headers: { Authorization: `Bearer ${clientToken}` } };

    const reply = await createClientChatRoomService({ userId, headers });

    const { newMessage, error } = reply;
    console.log("newMessage: ", newMessage);

    newMessage ? setLoader(false) : setLoader(false);

    if (error) {
      return ToastAndroid.show(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    // const chat = newMessage;

    navigation.navigate("ChatWithUser", {
      chat: newMessage,
    });
  };

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          padding: 10,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* user bio */}
        <View
          style={{
            backgroundColor: "#E90064",
            minHeight: 450,
            maxHeight: "auto",
            width: 350,
            marginTop: 20,
            padding: 20,
            borderRadius: 8,
            shadowColor: "black",
            elevation: 10,
          }}
        >
          <Image
            source={{ uri: user.profilePic }}
            style={{
              height: 150,
              width: 150,
              radius: 100,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 4,
            }}
          />

          <View
            style={{
              padding: 5,
              alignItems: "center",
              flexDirection: "row",

              margin: 8,
              borderBottomColor: "white",
              borderBottomWidth: 0.5,
              width: 300,
            }}
          >
            <UserCircleIcon size={30} color={"white"} />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                fontWeight: "500",
                color: "white",
              }}
            >
              {user.firstName} {user.lastName}
            </Text>
          </View>

          <View
            style={{
              padding: 5,
              alignItems: "center",
              flexDirection: "row",

              margin: 8,
              borderBottomColor: "white",
              borderBottomWidth: 0.5,
              width: 300,
            }}
          >
            <EnvelopeOpenIcon size={30} color={"white"} />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                fontWeight: "500",
                color: "white",
              }}
            >
              {user.email}
            </Text>
          </View>

          <View
            style={{
              padding: 5,
              alignItems: "center",
              flexDirection: "row",

              margin: 8,
              borderBottomColor: "white",
              borderBottomWidth: 0.5,
              width: 300,
            }}
          >
            <Bars3CenterLeftIcon size={30} color={"white"} />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                fontWeight: "500",
                color: "white",
              }}
            >
              {user.about}
            </Text>
          </View>

          <View
            style={{
              padding: 5,
              alignItems: "center",
              flexDirection: "row",

              margin: 8,
              borderBottomColor: "white",
              borderBottomWidth: 0.5,
              width: 300,
            }}
          >
            <MapIcon size={30} color={"white"} />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                fontWeight: "500",
                color: "white",
              }}
            >
              {user.city}
            </Text>
          </View>

          <View
            style={{
              padding: 5,
              alignItems: "center",
              flexDirection: "row",

              margin: 8,
              borderBottomColor: "white",
              borderBottomWidth: 0.5,
              width: 300,
            }}
          >
            <ArrowTrendingUpIcon size={30} color={"white"} />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                fontWeight: "500",
                color: "white",
              }}
            >
              {user.experience} . yrs exp.
            </Text>
          </View>

          <View
            style={{
              padding: 5,
              alignItems: "center",
              flexDirection: "row",

              margin: 8,
              borderBottomColor: "white",
              borderBottomWidth: 0.5,
              width: 300,
            }}
          >
            <AcademicCapIcon size={30} color={"white"} />
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                fontWeight: "500",
                color: "white",
              }}
            >
              {user.profession}
            </Text>
          </View>
        </View>

        {/* chat with user */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: 350,
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#E90064",
              width: 140,
              height: 60,
              borderRadius: 4,
              justifyContent: "space-around",
              alignItems: "center",
              shadowColor: "black",
              elevation: 10,
            }}
            onPress={() => {
              createClientchatroom();
            }}
          >
            {loader ? (
              <ActivityIndicator size={40} color={"white"} />
            ) : (
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  width: 100,
                }}
              >
                <ChatBubbleBottomCenterIcon size={30} color={"white"} />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "white",
                  }}
                >
                  chat
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#E90064",
              width: 170,
              height: 60,
              borderRadius: 4,
              justifyContent: "space-around",
              alignItems: "center",
              shadowColor: "black",
              elevation: 10,
              marginBottom: 50,
            }}
            onPress={() => {
              Linking.openURL(`tel:${user.phoneNumber}`);
            }}
          >
            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                width: 150,
              }}
            >
              <PhoneIcon size={30} color={"white"} />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  color: "white",
                }}
              >
                {user.phoneNumber}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ViewUser;
