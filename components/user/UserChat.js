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
  ActivityIndicator,
  RefreshControl,
  Modal,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  UserGroupIcon,
  UserCircleIcon,
} from "react-native-heroicons/outline";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMain from "./UserHomeRootComponent";
import { useSelector } from "react-redux";
import {
  getAllUserChatService,
  getAllUsersServices,
} from "../../services/oneForAll";

const UserChat = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Chat with Clients`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  useEffect(() => {
    getUserChats();
  }, []);

  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  const [myChats, setMyChats] = useState([]);

  const userId = useSelector((state) => state.user)._id;
  const userToken = useSelector((state) => state.user).token;

  const getUserChats = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const response = await getAllUserChatService({ headers });

    const { allChats, error } = response;
    console.log("allChats in get user chats: ", allChats);

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    allChats ? setMyChats(allChats) : setMyChats([]);

    allChats ? setLoader(false) : setLoader(false);
  };

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
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => getUserChats()} />
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
            justifyContent: "space-around",
            alignItems: "center",
            // backgroundColor: "orange",
          }}
        >
          <ScrollView>
            {console.log("myChats: ", myChats)}
            {myChats.length !== 0 ? (
              <View>
                {myChats.map((item, index) => {
                  console.log("index: ", index);
                  console.log("item - chat: ", item);

                  const lastMsg = item.chats.length - 1;
                  console.log("lastMsg: ", lastMsg);

                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor: "white",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",

                        width: 350,
                        minHeight: 70,
                        padding: 10,
                        margin: 15,
                        borderRadius: 4,
                        shadowColor: "black",
                        elevation: 15,
                      }}
                      onPress={() =>
                        navigation.navigate("ChatWithClient", {
                          chat: item,
                        })
                      }
                    >
                      <UserCircleIcon
                        size={40}
                        color={"white"}
                        style={{
                          backgroundColor: "#E90064",
                          borderRadius: 100,
                        }}
                      />
                      <View style={{ width: 260 }}>
                        <Text
                          style={{
                            marginTop: 5,
                            fontSize: 16,
                            fontWeight: "600",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.clientId.firstName + item.clientId.lastName}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            fontSize: 14,
                            fontWeight: "400",
                          }}
                        >
                          {item.clientId.email}
                        </Text>
                        <Text
                          style={{
                            marginTop: 5,
                            fontSize: 14,
                            fontWeight: "500",
                            color: "grey",
                          }}
                        >
                          {item.chats[lastMsg]?.user
                            ? "me . " + item.chats[lastMsg].user
                            : ""}
                          {item.chats[lastMsg]?.client
                            ? "client . " + item.chats[lastMsg].client
                            : ""}
                          {item.chats[lastMsg]?.userAttachment
                            ? "me . Attachment was sent"
                            : ""}
                          {item.chats[lastMsg]?.clientAttachment
                            ? "client . sent an Attachment"
                            : ""}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
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
                  No chats started yet!
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 17,
                    fontWeight: "500",
                  }}
                >
                  Please make a bid to start the chat!
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default UserChat;
