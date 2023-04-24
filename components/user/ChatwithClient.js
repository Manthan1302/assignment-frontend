import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowDownOnSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import {
  getMychatWithClientService,
  postMessageUser,
  postUserAttachment,
} from "../../services/oneForAll";
import * as DocumentPicker from "expo-document-picker";

const ChatwithClient = ({ route }) => {
  useEffect(() => {
    getMyChatofClientonLoad();
  }, []);
  const { chat } = route.params;
  console.log("chat: ", chat);
  const { clientId, chats, _id } = chat;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${clientId.firstName + " " + clientId.lastName}`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  const [fileSet, setFile] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(_id); // chatrrom id

  const userToken = useSelector((state) => state.user).token;

  const navigation = useNavigation();
  const scrollViewRef = useRef(); // for scroll to bottom

  //   chats
  const [myChat, setMyChat] = useState(chats);
  const [chatLoader, setChatload] = useState(false);

  const [userMsg, setUserMsg] = useState("");
  const [userAttachment, setUserAtachment] = useState({
    uri: "",
    name: "",
    type: "",
  });

  const getMyChatwithClient = async () => {
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const _id = chatRoomId;

    const response = await getMychatWithClientService({ _id, headers });

    const { chatRoom, error } = response;
    // console.log("chatRoom: ", chatRoom);

    if (error) {
      console.log("error: ", error);
      ToastAndroid.show(
        `something went wrong in get message!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    setMyChat(chatRoom.chats);

    chatRoom ? setChatload(false) : setChatload(false);

    setUserMsg("");
  };

  const getMyChatofClientonLoad = async () => {
    setChatload(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const _id = chatRoomId;

    const response = await getMychatWithClientService({ _id, headers });

    const { chatRoom, error } = response;
    // console.log("chatRoom: ", chatRoom);

    if (error) {
      console.log("error: ", error);
      ToastAndroid.show(
        `something went wrong in get message!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    chatRoom ? setChatload(false) : setChatload(false);

    setMyChat(chatRoom.chats);
  };

  const postAttachment = async () => {
    console.log("post attachment function called");
    console.log("userAttachment: ", userAttachment);

    setChatload(true);

    const fd = new FormData();

    fd.append("clientId", clientId);
    fd.append("userAttachment", userAttachment);

    const headers = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await postUserAttachment({ fd, headers });

    const { newMessage, error } = response;
    console.log("error: ", error);
    console.log("newMessage: ", newMessage);

    if (error) {
      console.log("error: ", error);
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    // newMessage ? setChatload(false) : setChatload(false);

    getMyChatwithClient();
    setFile(false);
  };

  const uploadDoc = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync();
      console.log("file: ", file);
      const { type, uri, mimeType } = file;

      if (type === "success") {
        ToastAndroid.show(
          `Attachment was selecetd!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        setUserAtachment({
          uri,
          name: new Date() + "_userAttachment",
          type: "image/jpg",
        });
        setFile(true);
      } else {
        ToastAndroid.show(
          `file selection was canceled!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    } catch (e) {
      console.log("e: ", e);
      ToastAndroid.show(
        `something went wrong file choosing!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const postMessage = async () => {
    console.log("post messgae function called");
    if (userMsg === "") {
      return null;
    }

    setChatload(true);

    const headers = { headers: { Authorization: `Bearer ${userToken}` } };
    console.log("userMsg: ", userMsg);

    const data = {
      clientId,
      user: userMsg,
    };

    const response = await postMessageUser({ data, headers });

    const { newMessage, error } = response;
    console.log("newMessage: ", newMessage);

    if (error) {
      console.log("error: ", error);
      ToastAndroid.show(
        `something went wrong in post message!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    // newMessage ? setChatload(false) : setChatload(false);

    getMyChatwithClient();
  };

  return (
    <KeyboardAwareScrollView style={{ marginBottom: 10 }}>
      <View style={{ justifyContent: "space-around", alignItems: "center" }}>
        {/* chats */}
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={{
            // backgroundColor: "orange",
            width: "94%",
            height: 670,
            marginTop: 10,
            padding: 10,
          }}
          showsVerticalScrollIndicator={false}
        >
          {myChat.map((item, index) => {
            console.log("item: ", item);

            if (item.client) {
              return (
                <View style={{ alignItems: "flex-start" }} key={index}>
                  <Text
                    style={{
                      backgroundColor: "white",
                      borderRadius: 5,
                      padding: 10,
                      margin: 10,
                      fontSize: 17,
                      maxWidth: 230,
                      color: "#E90064",
                      fontWeight: "500",
                      shadowColor: "black",
                      elevation: 10,
                    }}
                  >
                    {item.client}
                  </Text>
                </View>
              );
            } else if (item.user) {
              return (
                <View style={{ alignItems: "flex-end" }} key={index}>
                  <Text
                    style={{
                      backgroundColor: "#E90064",
                      borderRadius: 5,
                      padding: 10,
                      margin: 10,
                      fontSize: 17,
                      maxWidth: 230,
                      color: "white",
                      fontWeight: "500",
                      shadowColor: "black",
                      elevation: 10,
                    }}
                  >
                    {item.user}
                  </Text>
                </View>
              );
            } else {
              if (item.clientAttachment) {
                return (
                  <View style={{ alignItems: "flex-start" }} key={index}>
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 5,
                        padding: 10,
                        margin: 10,
                        fontSize: 17,
                        color: "white",
                        fontWeight: "500",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        shadowColor: "black",
                        elevation: 10,
                      }}
                    >
                      <Text
                        style={{
                          borderRadius: 5,

                          fontSize: 17,
                          color: "#E90064",
                          padding: 10,
                          fontWeight: "500",
                        }}
                      >
                        Attachment
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#E90064",
                          height: 60,
                          width: 60,
                          borderRadius: 4,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <ArrowDownOnSquareIcon color={"white"} size={50} />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              } else if (item.userAttachment) {
                return (
                  <View style={{ alignItems: "flex-end" }} key={index}>
                    <View
                      style={{
                        backgroundColor: "#E90064",
                        borderRadius: 5,
                        padding: 10,
                        margin: 10,
                        fontSize: 17,
                        color: "white",
                        fontWeight: "500",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        shadowColor: "black",
                        elevation: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          backgroundColor: "white",
                          height: 60,
                          width: 60,
                          borderRadius: 4,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <ArrowDownOnSquareIcon color={"#E90064"} size={50} />
                      </TouchableOpacity>
                      <Text
                        style={{
                          borderRadius: 5,

                          fontSize: 17,
                          color: "white",
                          padding: 10,
                          fontWeight: "500",
                        }}
                      >
                        Attachment
                      </Text>
                    </View>
                  </View>
                );
              }
            }
          })}

          {/*  */}
        </ScrollView>
        {/* text field */}
        <View
          style={{
            // backgroundColor: "pink",
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            width: 380,
          }}
        >
          <TextInput
            style={{
              backgroundColor: "white",
              height: 50,
              width: 250,
              borderColor: "#E90064",
              borderWidth: 2,
              borderRadius: 4,
              padding: 10,
              fontSize: 16,
            }}
            onChangeText={(text) => setUserMsg(text)}
            value={userMsg}
          />
          {/* attachment */}
          <TouchableOpacity
            style={{
              backgroundColor: "#E90064",

              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: 100,
            }}
            onPress={() => uploadDoc()}
          >
            <PlusCircleIcon size={35} color={"white"} />
          </TouchableOpacity>
          {/* post message */}
          <TouchableOpacity
            style={{
              backgroundColor: "#E90064",
              height: 50,
              width: 70,
              justifyContent: "space-around",
              alignItems: "center",
              borderRadius: 4,
            }}
            onPress={() => {
              fileSet ? postAttachment() : postMessage();
            }}
          >
            {chatLoader ? (
              <ActivityIndicator size={30} color={"white"} />
            ) : (
              <PaperAirplaneIcon size={35} color={"white"} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChatwithClient;
