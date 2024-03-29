import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
  ActivityIndicator,
} from "react-native";
// import LoginScreen from "./screens/login.screen";
import LoginScreen from "./screens/login.screen";
import SignUpScreen from "./screens/SignupScreen";
import AdminScreen from "./screens/AdminScreen";
import ClientSignupScreen from "./screens/ClientSignupScreen";
import UserSignupScreen from "./screens/UserSignupScreen";
import OnboardScreen from "./screens/OnboardingScreen";

import {
  MagnifyingGlassIcon,
  QueueListIcon,
} from "react-native-heroicons/solid";
import {
  PlusCircleIcon,
  QueueListIcon as List,
} from "react-native-heroicons/outline";
import {
  HomeIcon as Home,
  UserCircleIcon as Profile,
  ChatBubbleLeftRightIcon as Chat,
} from "react-native-heroicons/solid";
import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
} from "react-native-heroicons/outline";

// user routes from components/user
import UserMain from "./components/user/UserHomeRootComponent";

// client routes from components/worker
import ClientMain from "./components/client/ClientHomeRootComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserFind from "./components/user/UserFind";
import UserPost from "./components/user/UserPost";
import UserChat from "./components/user/UserChat";
import UserSetting from "./components/user/UserSetting";
import { useSelector } from "react-redux";
import ClientFind from "./components/client/ClientFind";
import ClientPost from "./components/client/ClientPost";
import ClientChat from "./components/client/ClientChat";
import ClientSetting from "./components/client/ClientSetting";
import FunctionalPage from "./components/user/FunctionalPage";
import UserTaskHistory from "./components/user/UserTaskHistory";
import UserNotifications from "./components/user/UserNotifications";
import UserPayments from "./components/user/UserPayments";
import UserBids from "./components/user/UserBids";
import ViewAssignment from "./components/user/ViewAssignment";
import ViewUser from "./components/client/ViewUser";
import ChatwithClient from "./components/user/ChatwithClient";
import ChatWithUser from "./components/client/ChatwithUser";
import ClientBid from "./components/client/ClientBid";
import FunctionalPageClient from "./components/client/FunctionalPageClient";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserHome = () => {
  // home
  // search
  // post
  // chat
  // settings
  return (
    <Tab.Navigator
      initialRouteName="UserMain"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          margin: 15,
          height: 80,
          borderRadius: 15,
          justifyContent: "space-around",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={UserMain}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <Home size={30} color={focused ? "#E90064" : "#748c94"} />
                ) : (
                  <HomeIcon size={30} color={focused ? "#E90064" : "#748c94"} />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Find tasks"
        component={UserFind}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <MagnifyingGlassIcon
                  size={30}
                  color={focused ? "#E90064" : "#748c94"}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Search
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Post"
        component={UserPost}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <QueueListIcon
                    size={30}
                    color={focused ? "#E90064" : "#748c94"}
                  />
                ) : (
                  <List size={30} color={focused ? "#E90064" : "#748c94"} />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  My Tasks
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={UserChat}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <Chat size={30} color={focused ? "#E90064" : "#748c94"} />
                ) : (
                  <ChatBubbleLeftRightIcon
                    size={30}
                    color={focused ? "#E90064" : "#748c94"}
                  />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Chat
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserSetting}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <Profile size={30} color={focused ? "#E90064" : "#748c94"} />
                ) : (
                  <UserCircleIcon
                    size={30}
                    color={focused ? "#E90064" : "#748c94"}
                  />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const ClientHome = () => {
  // home
  // search
  // post
  // chat
  // settings
  return (
    <Tab.Navigator
      initialRouteName="ClientMain"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          margin: 15,
          height: 80,
          borderRadius: 15,
          justifyContent: "space-around",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ClientMain}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <HomeIcon size={30} color={focused ? "#E90064" : "#748c94"} />
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Find tasks"
        component={ClientFind}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <MagnifyingGlassIcon
                  size={30}
                  color={focused ? "#E90064" : "#748c94"}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Search
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Post"
        component={ClientPost}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <PlusCircleIcon
                  size={30}
                  color={focused ? "#E90064" : "#748c94"}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Post
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ClientChat}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <ChatBubbleLeftRightIcon
                  size={30}
                  color={focused ? "#E90064" : "#748c94"}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Chat
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ClientSetting}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <UserCircleIcon
                  size={30}
                  color={focused ? "#E90064" : "#748c94"}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#E90064" : "#748c94",
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const MainApp = () => {
  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);
  const clientToken = useSelector((state) => state.client).token;
  console.log("clientToken: ", clientToken);

  if (userToken !== "") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UserNav"
            component={UserHome}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="theOwnerAdmin" component={AdminScreen} />
          <Stack.Screen name="ClientSignup" component={ClientSignupScreen} />
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="ViewAssignment" component={ViewAssignment} />
          <Stack.Screen name="ChatWithClient" component={ChatwithClient} />
          <Stack.Screen
            name="UserTaskHistory"
            component={UserTaskHistory}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="UserNotifications"
            component={UserNotifications}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="UserPayments"
            component={UserPayments}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="UserBids"
            component={UserBids}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="FunctionalPage"
            component={FunctionalPage}
            options={{
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (clientToken !== "") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ClientNav"
            component={ClientHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="theOwnerAdmin" component={AdminScreen} />
          <Stack.Screen name="ClientSignup" component={ClientSignupScreen} />
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="ViewUser" component={ViewUser} />

          <Stack.Screen name="ChatWithUser" component={ChatWithUser} />
          <Stack.Screen name="ClientBid" component={ClientBid} />
          <Stack.Screen
            name="FunctionalPageClient"
            component={FunctionalPageClient}
            options={{
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen
            name="UserNav"
            component={UserHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ClientNav"
            component={ClientHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ClientMain" component={ClientMain} />
          <Stack.Screen name="theOwnerAdmin" component={AdminScreen} />
          <Stack.Screen name="ClientSignup" component={ClientSignupScreen} />
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="ViewAssignment" component={ViewAssignment} />
          <Stack.Screen
            name="FunctionalPage"
            component={FunctionalPage}
            options={{
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default MainApp;
