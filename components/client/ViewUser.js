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
  import { ArrowTrendingUpIcon } from "react-native-heroicons/solid";
  import { DataTable } from 'react-native-paper';
  import image from "../4529164.jpg";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useNavigation } from "@react-navigation/native";
  import { UserIcon, UserGroupIcon,UserCircleIcon ,EnvelopeOpenIcon,PhoneIcon,MapIcon,AcademicCapIcon} from "react-native-heroicons/outline";
  
const ViewUser =({route})=>{
  
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Client's Task`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });

    const backAction = () => {
      // const popAction = StackActions.pop(1);
      // navigation.goBack();
      navigation.navigate("ClientNav");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, []);
  const {user} = route.params;
  console.log("users",user);
    return(
      <KeyboardAwareScrollView>
        <View
        style={{padding:10}}>
        <View style={{
            backgroundColor:"#E90064",
            height:550,
            width:395,
            marginTop:20,
            padding:10,
            borderRadius: 8,
        }}>
  
            <Image source={image} style={{
                  height: 150,
                  width: 150,
                  radius:100,
                  marginLeft: "auto",
                  marginRight:"auto"
                  }}  ></Image>
                  <Text>{"\n"}</Text>
                  <DataTable>
                  <DataTable.Row>
                  <DataTable.Cell> <UserCircleIcon size={35} color={"white"}></UserCircleIcon>  </DataTable.Cell>
                  <DataTable.Cell ><Text style={{fontSize:21,color:"white",marginRight:50}}>{user.firstName} {user.lastName}</Text></DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                  <DataTable.Cell> <EnvelopeOpenIcon size={35} color={"white"} ></EnvelopeOpenIcon> </DataTable.Cell>
                  <DataTable.Cell ><Text style={{fontSize:20,color:"white",marginRight:44}}>{user.email}</Text></DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                  <DataTable.Cell> <PhoneIcon size={35} color={"white"} ></PhoneIcon> </DataTable.Cell>
                  <DataTable.Cell ><Text style={{fontSize:20,color:"white",marginRight:44}}>{user.phoneNumber}</Text></DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                  <DataTable.Cell> <MapIcon size={35} color={"white"} ></MapIcon> </DataTable.Cell>
                  <DataTable.Cell ><Text style={{fontSize:20,color:"white",marginRight:44}}>{user.city}</Text></DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                  <DataTable.Cell> <ArrowTrendingUpIcon size={35} color={"white"} ></ArrowTrendingUpIcon> </DataTable.Cell>
                  <DataTable.Cell ><Text style={{fontSize:20,color:"white",marginRight:44}}>{user.experience} Year</Text></DataTable.Cell>
                  </DataTable.Row>

                  <DataTable.Row>
                  <DataTable.Cell><AcademicCapIcon size={35} color={"white"} ></AcademicCapIcon> </DataTable.Cell>
                  <DataTable.Cell flex><Text style={{fontSize:20,color:"white",marginRight:44}}>{user.profession}</Text></DataTable.Cell>
                  </DataTable.Row>
                  </DataTable>
              
        </View>
        </View>
      </KeyboardAwareScrollView>
    )
}

export default ViewUser; 