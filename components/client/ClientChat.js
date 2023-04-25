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
import { useSelector } from "react-redux";
import { getAllClientChatService } from "../../services/oneForAll";

const UserChat = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Chat with User`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  useEffect(() => {
    getClientChats();
  }, []);

  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  const [myChats, setMyChats] = useState([]);

  // const userId = useSelector((state) => state.user)._id;
  const clientToken = useSelector((state) => state.client).token;

  const getClientChats = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${clientToken}` } };

    const response = await getAllClientChatService({ headers });

    const { allChats, error } = response;
    console.log("allChats in get client chats: ", allChats);

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    allChats ? setMyChats(allChats) : setMyChats([]);

    allChats ? setLoader(false) : setLoader(false);
  };

  if (!clientToken) {
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
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getClientChats()}
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
                    console.log("item: ", item);
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
                          navigation.navigate("ChatWithUser", {
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
                        <View style={{ width: 180 }}>
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 16,
                              fontWeight: "600",
                              textTransform: "capitalize",
                            }}
                          >
                            {item.userId.firstName + item.userId.lastName}
                          </Text>
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 14,
                              fontWeight: "400",
                            }}
                          >
                            {item.userId.email}
                          </Text>
                          <Text
                            style={{
                              marginTop: 5,
                              fontSize: 14,
                              fontWeight: "400",
                            }}
                          >
                            {item.userId.profession}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#E90064",
                            borderRadius: 4,
                            height: 50,
                            width: 65,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: "white" }}>delete</Text>
                        </TouchableOpacity>
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
                    Please make a bid to start the chat!
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default UserChat;
