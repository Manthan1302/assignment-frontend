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
  Modal,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrencyRupeeIcon,
  EyeIcon,
  EyeSlashIcon,
  NewspaperIcon,
} from "react-native-heroicons/outline";
import { getMyBidsService } from "../../services/oneForAll";
import {
  Bars3CenterLeftIcon,
  DocumentTextIcon,
} from "react-native-heroicons/solid";

const UserBids = () => {
  const navigation = useNavigation();

  const userToken = useSelector((state) => state.user).token;
  const [loader, setLoader] = useState(false);
  const [myBids, setMyBids] = useState([]);

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
      headerTitle: `My Bids`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  useEffect(() => {
    getMyBids();
  }, []);

  const getMyBids = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const result = await getMyBidsService({ headers });

    const { findMyBid, error } = result;

    findMyBid.sort(function (a, b) {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return dateA - dateB;
    });

    findMyBid ? setMyBids(findMyBid) : "";

    findMyBid ? setLoader(false) : setLoader(false);

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }
  };

  return (
    <KeyboardAwareScrollView>
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
            marginBottom: 20,
          }}
        >
          {myBids.map((item, index) => {
            console.log("---------------------------------------------");
            console.log("item: ", item);

            return (
              <View
                key={index}
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  margin: 15,
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: 350,
                    borderRadius: 3,
                    elevation: 15,
                    shadowColor: "#748c94",
                  }}
                >
                  <NewspaperIcon color={"#E90064"} height={40} width={40} />
                  <View
                    style={{
                      // backgroundColor: "green",
                      width: 200,
                      minHeight: 80,
                      maxHeight: 200,
                      alignItems: "flex-start",
                      justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <CurrencyRupeeIcon
                        color={"#E90064"}
                        height={20}
                        width={20}
                      />
                      <Text>{item.finalPrice}</Text>
                    </View>
                    <Text> {item.userMessage}</Text>
                    <Text>
                      {item.bidStatus === "pending" ? (
                        <Text style={{ color: "red" }}>pending *</Text>
                      ) : (
                        <Text style={{ color: "green" }}>accepted *</Text>
                      )}
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
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        fontWeight: "500",
                      }}
                    >
                      info
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default UserBids;
