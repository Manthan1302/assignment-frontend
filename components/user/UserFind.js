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
import {
  UserIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getSearchAssignmentServices } from "../../services/oneForAll";
import taskImg from "../../images/signup.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowTrendingUpIcon } from "react-native-heroicons/solid";

const Tab = createBottomTabNavigator();

const UserFind = () => {
  const [searchTask, setSearch] = useState("");
  const [searchedTask, setSearchedTask] = useState([]);
  const [recent, setRecent] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getRecentSearches();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const storeRecentSearches = async (item) => {
    console.log("item store : ", item);

    try {
      const value = await AsyncStorage.getAllKeys();
      console.log("value in store recent: ", value);

      await AsyncStorage.setItem(item, item);
    } catch (e) {
      console.log("error :", e);
    }
  };

  const clear = async () => {
    const keys = await AsyncStorage.getAllKeys();
    keys.map((item) => {
      console.log("item keys: ", item);

      if (item === "persist:root") {
        console.log("cookies not deleted");
      } else {
        AsyncStorage.removeItem(item);
      }
    });
  };

  const getRecentSearches = async () => {
    try {
      const value = await AsyncStorage.getAllKeys();
      console.log("value: ", value);

      // AsyncStorage.clear();

      setRecent(value);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  console.log("---------------------------------------------------------");

  const getSearchAssignment = async () => {
    console.log("searchTask: ", searchTask);

    const result = await getSearchAssignmentServices({ searchTask });

    const { error, allSearchAssignment } = result;
    console.log("allSearchAssignment: ", allSearchAssignment);

    if (error) {
      console.log("error :", error);
      setSearchedTask([error]);
    } else if (allSearchAssignment) {
      setSearchedTask(allSearchAssignment);
    }
  };

  // console.log("recent outside : ", recent);

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        {/* search bar */}
        <View
          style={{ 
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="search for assignments..."
            style={{
              backgroundColor: "white",
              color: "black",
              height: 60,
              width: 300,
              fontSize: 18,
              padding: 10,
              borderRadius: 5,
              shadowColor: "#748c94",
              elevation: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
            onChangeText={async (text) => {
              setSearch(text);
              await getSearchAssignment();
              await getRecentSearches();
            }}
            value={searchTask}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              height: 60,
              width: 60,
              justifyContent: "space-around",
              alignItems: "center",
              shadowColor: "#748c94",
              elevation: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={() => getSearchAssignment()}
          >
            <MagnifyingGlassIcon color={"#E90064"} height={"40"} width={"40"} />
          </TouchableOpacity>
        </View>
        {/*  */}
        {searchTask === "" ? (
          <>
            <Text
              style={{
                fontSize: 17,
                textAlign: "center",
                marginTop: 40,
                fontWeight: "500",
                marginBottom: 20,
              }}
            >
              recent
            </Text>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 5,
                  shadowColor: "#748c94",
                  elevation: 10,
                  width: 220,
                  height: 40,
                  justifyContent: "space-around",
                  padding: 5,
                }}
                onPress={async () => {
                  await clear(), await getRecentSearches();
                }}
              >
                <Text style={{ fontSize: 17 }}>clear recent searches</Text>
                <XMarkIcon color={"#E90064"} height={30} width={30} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  // backgroundColor: "green",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: 350,
                  height: 500,
                }}
              >
                {recent.length !== 1 ? (
                  recent.map((item, index) => {
                    console.log("index: ", index);
                    if (item === "persist:root") {
                      return <Text key={index}></Text>;
                    } else {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor: "white",
                            margin: 10,
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexDirection: "row",
                            padding: 10,
                            borderRadius: 5,
                            shadowColor: "#748c94",
                            elevation: 10,
                          }}
                          onPress={async () => {
                            setSearch(item);
                            await getSearchAssignment();
                          }}
                        >
                          <Text style={{ fontSize: 18 }}>{item}</Text>
                          <ArrowTrendingUpIcon
                            color={"#E90064"}
                            height={30}
                            width={30}
                          />
                        </TouchableOpacity>
                      );
                    }
                  })
                ) : (
                  <>
                    <View
                      style={{
                        alignItems: "center",
                        width: 350,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                        }}
                      >
                        No recent found!
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </>
        ) : (
          <View>
            {searchedTask.map((item, index) => {
              console.log("===============================================");
              console.log("item: ", item);
              if (item.code) {
                return (
                  <View
                    style={{
                      justifyContent: "space-around",
                      alignItems: "center",
                      height: 600,
                    }}
                    key={index}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: "center",
                      }}
                    >
                      Task you are searching for was not found!
                      {"\n"}
                      Please recheck!
                    </Text>
                  </View>
                );
              } else {
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

                        marginTop: 10,
                        marginBottom: 17,
                      }}
                    >
                      <View>
                        <Image
                          // source={item.attachments[0]}
                          source={taskImg}
                          style={{
                            backgroundColor: "green",
                            height: 40,
                            width: 40,
                          }}
                        />
                      </View>
                      <View style={{ width: 150 }}>
                        <Text style={{ fontWeight: "500" }}>
                          {item.assignmentName}
                        </Text>
                        <Text style={{ fontWeight: "500" }}>
                          {item.assignmentType}
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
                        onPress={async () => {
                          await storeRecentSearches(item.assignmentName);

                          navigation.navigate("ViewAssignment", {
                            assignment: item,
                          });
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
            })}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default UserFind;
