
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./screens/login.screen";
import Login from "./screens/login.screen";

const Stack = createNativeStackNavigator();
const MainApp = () => {
    
    return(
       <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    </NavigationContainer>
    )
   
}


export default MainApp;