import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import login from '../images/loginanimation.jpg';
import { useNavigation } from "@react-navigation/native";
export default function Login() {

     // navigation
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
  return (
   <SafeAreaView style={{backgroundColor:'#fff',height:'100%'}}>
     <View>
      <Text style={{textAlign:'center',fontSize:30}}>Welcome Back!</Text>
      <Text style={{textAlign:'center',fontSize:20}}>Sign In to Taskify </Text>
    </View>
    <Text>{"\n"}</Text> 
    <Image source={login} style={{ height: 270, width: 270, marginLeft:'auto', marginRight:'auto' }} />
    <View>
        <Text style={styles.texts}>Email</Text>
      <TextInput style={[styles.container , styles.center]}/>
      <Text>{"\n"}</Text> 
      <Text style={styles.texts} >Password</Text>
      <TextInput style={[styles.container , styles.center]} 
      secureTextEntry={true}/>
        <Text>{"\n"}</Text> 
        <View style={styles.center}>
        <Text style={styles.signin }> Sign In</Text>
        <Text>{"\n"}</Text>
        <Text style={{textAlign:'center',fontSize:17}}>forgot password?</Text> 
        <Text style={{textAlign:'center',fontSize:17}}>Don't have an account?Sign Up here</Text> 
       
        </View>
      
    </View>

   </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
        borderRadius:5,
        borderWidth:1,
        width:350,
        height:45,
        padding:10
    },
    texts : {
        marginLeft:40,
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

