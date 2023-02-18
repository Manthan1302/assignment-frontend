import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./screens/login.screen";
import LoginScreen from "./screens/login.screen";
import SignUpScreen from "./screens/SignupScreen";
import ClientHomeScreen from "./screens/ClientHomeScreen";
import UserHomeScreen from "./screens/UserHomeScreen";
import AdminScreen from "./screens/AdminScreen";
import ClientSignupScreen from "./screens/ClientSignupScreen";
import UserSignupScreen from "./screens/UserSignupScreen";
import OnboardScreen from "./screens/OnboardingScreen";
const Stack = createNativeStackNavigator();
const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboard" component={OnboardScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="ClientServices" component={ClientHomeScreen} />
        <Stack.Screen name="UserServices" component={UserHomeScreen} />
        <Stack.Screen name="theOwnerAdmin" component={AdminScreen} />
        <Stack.Screen name="ClientSignup" component={ClientSignupScreen} />
        <Stack.Screen name="UserSignup" component={UserSignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
