import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View,Image, Alert, BackHandler,TouchableOpacity, ToastAndroid,KeyboardAvoidingView} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from 'react-native-safe-area-context';
import signup from '../images/loginanimation.jpg';
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserIcon, UserGroupIcon } from "react-native-heroicons/outline";



const SignUp=()=>
{
  const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
      if (Platform.OS === "android") {
        useEffect(() => {
            const backAction = () => {
              navigation.navigate("Login");
              return true;
            };
            const backHandler = BackHandler.addEventListener(
              "hardwareBackPress",
              backAction
            );
          }, []);

          return(
            <KeyboardAwareScrollView
            style={{ flex: 1,backgroundColor:"#fff" }}
            showsVerticalScrollIndicator={false}
          >
            <SafeAreaView>
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",}}>
                <Image source={signup} style={{ height: 450, width: 380 }} />
              </View>
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",}}>
                <Text
                  style={{
                    fontSize: 25,
                    color: "#4340ab",}}>
                  Sign up as a:
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  // backgroundColor: "green",
                  height: 300,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#4340ab",
                    height: 180,
                    width: 160,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                  onPress={() => navigation.navigate("UserSignup")}
                >
                  {/* <UserIcon color={"#38b6ff"} size={70} /> */}
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    User
                  </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                  style={{
                    backgroundColor: "#4340ab",
                    height: 180,
                    width: 160,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 8,
                    shadowColor: "#38b6ff",
                  }}
                  onPress={() => navigation.navigate("ClientSignup")}
                >
                  {/* <UserGroupIcon color={"#38b6ff"} size={70} /> */}
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    Client
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",}}>
                <Text style={{fontSize:17}}>Already a member ?</Text>
                <TouchableOpacity
                  style={{
                    height: 25,
                    width: 60,
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={{ color: "grey",fontSize:17 }}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </KeyboardAwareScrollView>
          )
      }
};


const styles = StyleSheet.create({
  text :{
    textAlign:"center",
  },
  signin : {
    borderRadius:5,
    borderWidth:1,
    width:350,
    height:45,
    textAlign:'center',
    textAlignVertical:'center',
    backgroundColor:'#4340ab',
    color:'#fff',
    fontSize:20,
},
  });

export default SignUp;