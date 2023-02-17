import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View,Image, Alert, BackHandler, ToastAndroid,KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from 'react-native-paper';
const ClientSignupScreen= ()=>{
  const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
    return(
        <KeyboardAwareScrollView
            style={{ flex: 1,backgroundColor:"#fff" }}
            showsVerticalScrollIndicator={false}>
              <SafeAreaView>
                <View>
                  <Text style={{textAlign:"center",fontSize:25}}>Signup As A Client </Text>
                </View>

                <View style={{marginTop:20}}>
                  <View style={{flexDirection:"row",justifyContent:"space-around"}}>
                  <View>
                  <Text style={{ marginLeft:10,fontSize:18}}>First Name</Text>
                  <TextInput style={{height:45,width:150,borderRadius:5,borderWidth:1,marginLeft:10}}/>
                  </View>
                  <View>
                  <Text style={{ marginLeft:10,fontSize:18}}>Last Name</Text>
                  <TextInput  style={{height:45,width:150,borderRadius:5,borderWidth:1,marginLeft:10}}/>
                  </View>
                  </View>

                  <View style={{marginTop:20}}>
                    <Text style={styles.texts}>Phone</Text>
                    <TextInput style={[styles.container , styles.center]}/>
                  </View>


                  <View style={{marginTop:20}}>
                  <Text style={styles.texts}>Email</Text>
                  <TextInput style={[styles.container , styles.center]}/>
                  </View>
                  
                  <View style={{marginTop:20,flexDirection:"row",justifyContent:"space-around"}}>
                    <Text style={{fontSize:18,marginLeft:30,marginTop:5}}>Gender:</Text>
                    <RadioButton value="Male"></RadioButton><Text style={{fontSize:18,marginRight:15,marginTop:5}}>Male</Text>
                    <RadioButton value="Male"></RadioButton><Text style={{fontSize:18,marginRight:15,marginTop:5}}>Female</Text>
                    <RadioButton value="Male"></RadioButton><Text style={{fontSize:18,marginRight:15,marginTop:5}}>other</Text>
                  </View>

                  <View style={{marginTop:20}}>
                  <Text style={styles.texts}>Address</Text>
                  <TextInput style={[styles.container , styles.center]}/>
                  </View>
                
                  <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:20}}>
                    <View>
                      <Text style={{ marginLeft:10,fontSize:18}}>City</Text>
                      <TextInput style={{height:45,width:150,borderRadius:5,borderWidth:1,marginLeft:10}}/>
                    </View>
                    <View>
                      <Text style={{ marginLeft:10,fontSize:18}}>State</Text>
                      <TextInput style={{height:45,width:150,borderRadius:5,borderWidth:1,marginLeft:10}}/>
                    </View>
                  </View>
                  
                  <View style={{flexDirection:"row",justifyContent:"space-around",marginTop:20}}>
                    <View>
                    <Text style={{ marginLeft:10,fontSize:18}}>Postel Code</Text>
                    <TextInput  style={{height:45,width:150,borderRadius:5,borderWidth:1,marginLeft:10}}/>
                    </View>
                   <View>
                    <Text style={{ marginLeft:10,fontSize:18}}>Profession</Text>
                    <TextInput style={{height:45,width:150,borderRadius:5,borderWidth:1,marginLeft:10}}/>
                    </View>
                  </View>

                 <View style={{marginTop:20}}>
                  <Text style={styles.texts}>Password</Text>
                  <TextInput style={[styles.container , styles.center]}/>
                 </View>
                  
                <View style={{marginTop:20,alignItems:"center"}}>
                <Text style={styles.signin}>Create Account</Text>
                </View>
                  <View style={{
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
                </View>
              </SafeAreaView>  
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
  container: {
      borderRadius:5,
      borderWidth:1,
      width:350,
      height:45,
      padding:10
  },
  texts : {
      marginLeft:35,
      fontSize:18
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
  center : {
      marginLeft : 'auto',
      marginRight : 'auto',
      marginTop : 'auto',
  }
});

export default ClientSignupScreen;