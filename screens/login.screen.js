import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import login from '../images/loginanimation.jpg';
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function Login() {

     // navigation
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
      if (Platform.OS === "android" || Platform.OS === "ios") {
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
    else
    {
        return (
            
         <div style={{display:'flex',backgroundColor:'#4340ab'}} >
                <div><img src={login} style={{height:735,flex:50}}></img></div>
                <hr></hr>
               
                <div style={{flex:50}}>
                    <div style={{textAlign:'center'}}>
                    <h2 style={{textAlign:'Center',
                    fontSize:30,
                    color:"#fff"}}>Please Enter Your Login Details</h2><hr></hr>
                     <br></br>
                <br></br>

                    <label style={{marginRight:200,color:"#fff"}}>Email</label><br></br>
                    <input type="text"  placeholder="Enter email.." style={{height:30,
                        width:250,
                        borderRadius:7}}/><br></br><br></br>
                    <label style={{marginRight:180,color:"#fff"}}>Password</label><br></br>
                    <input type="text"  placeholder="Enter Password.." style={{height:30,
                        width:250,
                        borderRadius:7}}/><br></br><br></br><br></br>
                    <button style={{width:150,height:35,borderRadius:7,backgroundColor:"#fff",color:"000000"}}>Login</button>
                    <p style={{fontSize:15,color:"#fff"}}>forgot password?</p> 
                    <p style={{fontSize:15,color:"#fff"}}>You Have No Account?Sign Up</p>
                    
                    </div>
                </div>
         </div>
          
        )
    }
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

