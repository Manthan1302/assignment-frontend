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
import image from "../4529164.jpg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserCircleIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { ArrowTrendingUpIcon } from "react-native-heroicons/solid";
import { getSearchUserServices } from "../../services/oneForAll";
const ClientFind = () => {
  const [searchUser, setSearch] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const [recent, setRecent] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getRecentSearches();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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

  const getSearchUser = async () => {
    console.log("searchUser: ", searchUser);

    const result = await getSearchUserServices({ searchUser });

    const { error, allSearchUser } = result;
    console.log("allSearchUser: ", allSearchUser);

    if (error) {
      console.log("error :", error);
      setSearchedUser([error]);
    } else if (allSearchUser) {
      setSearchedUser(allSearchUser);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="search for User..."
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
              await getSearchUser();
              await getRecentSearches();
            }}
            value={searchUser}
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
            onPress={() => getSearchUser()}
          >
            <MagnifyingGlassIcon color={"#E90064"} height={"40"} width={"40"} />
          </TouchableOpacity>
        </View>
        {searchUser === "" ? (
          <>
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
                            await getSearchUser();
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
            {searchedUser.map((item, index) => {
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
                      User you are searching for was not found!
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
                      justifyContent: "space-around",
                      alignItems: "center",
                      margin: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#E90064",
                        justifyContent: "space-around",
                        borderRadius: 3,
                      }}
                      onPress={async () => {
                        await storeRecentSearches(item.profession);

                        navigation.navigate("ViewUser", {
                          user: item,
                        });
                      }}
                    >
                      <View
                        style={{
                          height: 90,
                          width: 350,
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "row",
                          padding: 10,
                        }}
                      >
                        <UserCircleIcon size={40} color={"white"} />
                        <View
                          style={{
                            padding: 10,
                            width: 230,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: "white",
                              fontWeight: "500",
                              textTransform: "capitalize",
                            }}
                          >
                            {item.firstName} {item.lastName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "white",
                              fontWeight: "500",
                              textTransform: "capitalize",
                            }}
                          >
                            {item.profession}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              color: "white",
                              fontWeight: "500",
                            }}
                          >
                            {item.experience} . yrs of experience
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
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

export default ClientFind;
