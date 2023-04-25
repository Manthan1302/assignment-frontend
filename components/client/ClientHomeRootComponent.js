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
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import image from "../4529164.jpg";
import { UserIcon, UserGroupIcon,UserCircleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {getAllUsersServices} from "../../services/oneForAll";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ClientMain = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
const [users,setUsers]=useState([]); 

const clientToken = useSelector((state) => state.client).token;
 
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Exit App", "Exiting the application", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    getUser();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getUser = async ()=>{
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${clientToken}` } };
    const data =  await getAllUsersServices({headers});
   

    const {users,error} = data;
    console.log("user:", users)
    
    error && users === undefined
    ?ToastAndroid.show(`${error}`,ToastAndroid.SHORT,ToastAndroid.BOTTOM)
    :"";

    users ? setLoader(false) : setLoader(true);
    users ? setUsers(users):[];
  };

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
 
  return(
    <KeyboardAwareScrollView>
      <SafeAreaView style={{padding:10}}>
      {loader ? (
          <Modal
            transparent={true}
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "#FFF2F2aa",
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#E90064",
                  height: 70,
                  width: 130,
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 5,
                  borderColor: "white",
                  borderWidth: 2,
                }}
              >
                <ActivityIndicator size={30} color={"white"} />
                <Text style={{ color: "white", fontSize: 18 }}>Loading...</Text>
              </View>
            </View>
          </Modal>
        ) : (
          users.map((item)=>{
            if(item.usertype === "user")
            {
              return(
                <View 
                key={item}>
                   <View style={{
                  height: 440,
                  width: 375,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}>
            <View style={{backgroundColor:"#E90064",padding:5}}>
            <TouchableOpacity
                        style={{
                          backgroundColor: "#E90064",
                          justifyContent: "space-around",
                          borderRadius: 3,
                        }}
                        onPress={async () => {
                          await storeRecentSearches(item.firstName);

                          navigation.navigate("ViewUser", {
                            user: item,
                          });
                        }}
                      >
            
            <Text style={{fontSize:20,color:"white" }}>
            <UserCircleIcon size={35} color={"white"} style={{marginTop:15}} ></UserCircleIcon>  
              
            </Text>
            <Text style={{marginLeft:45,fontSize:20,color:"white",marginTop:-30 }}>{item.firstName} {item.lastName}</Text>
            </TouchableOpacity>
            </View>
            <View>
                <Image source={image} style={{
                  height: 400,
                  width: 370,
                  marginLeft: "auto",
                  marginRight: "auto",
                  
                }} 
                ></Image>
            </View>
          </View>
          <Text>{"\n"}</Text>
          
          
                </View>
              )
            }
          })
        )}
       
      </SafeAreaView>
      </KeyboardAwareScrollView>
  );
}
export default ClientMain;
