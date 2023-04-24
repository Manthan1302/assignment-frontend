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
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import {
  EyeIcon,
  EyeSlashIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";

const FunctionalPage = ({ route }) => {
  const navigation = useNavigation();
  const { screenName } = route.params;

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
      headerTitle: `${screenName}`,
      headerStyle: {
        backgroundColor: "#E90064",
      },
      headerTitleStyle: {
        color: "white",
      },
    });
  }, []);

  //   about taskify screen
  if (screenName === "About Taskify") {
    return (
      <View style={{ justifyContent: "space-around", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "white",
            width: 330,
            height: 550,
            padding: 25,
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 70,
            borderRadius: 8,
            elevation: 15,
            shadowColor: "#748c94",
          }}
        >
          <Text style={{ fontSize: 25, color: "#E90064", fontWeight: "500" }}>
            {" "}
            About{" "}
          </Text>
          <Text style={{ fontSize: 16 }}>
            This application is a startup for any person like : Student after
            12th , unemployed person, graduation, after graduation, full or part
            time job ,housewives, etc. because after covid , many people want to
            open their own start-up, is not only useful for agencies ,
            businesman but also for students and for any housewife.
          </Text>
          <Text style={{ fontSize: 16 }}>
            From this application many people can get opportunity to show their
            talent and earn online from home.
          </Text>
          <Text style={{ fontSize: 16 }}>
            Many websites is there like this we will see it in further slides
            but in that only experienced person can do work but in this website
            non-experienced person can get work .
          </Text>
        </View>
      </View>
    );
  }

  //   customer support page
  if (screenName === "Customer Support") {
    return (
      <View>
        <Text>customer support page rendered</Text>
      </View>
    );
  }

  //   frequently asked question page
  if (screenName === "Privacy Policy") {
    return (
      <View style={{ justifyContent: "space-around", alignItems: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Information We Collect
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              You directly provide us with most of the information we collect:
              when you register to the Site, use it, complete forms, or register
              to any of our programs. We also collect information about your
              communications with Taskify as well as any of your posts on our
              blogs or forums and your communication with other users of
              Taskify. In addition, we automatically collect information while
              you access, browse, view or otherwise use the Site and receive
              information from third party vendors or other available sources.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Our Legal Basis for Using Your Personal Information
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Where relevant under applicable laws, all processing of your
              personal information will be justified by a "lawful ground" for
              processing as detailed below.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              How Do We Use the Information Collected ?
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We use personal information to provide you with quality service
              and security, to operate the Site, understand how people use the
              Site, and to perform our obligations to you; to ensure marketplace
              integrity and security; to prevent fraud; to contact you and send
              you direct marketing communications; to promote and advertise the
              Site, our services and the Taskify marketplace; to comply with
              lawful requests by public authorities and to comply with
              applicable laws and regulations.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              How Long Do We Keep Personal Information
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We will keep personal information only for as long as is required
              to fulfil the purpose for which it was collected. However, in some
              cases we will retain personal information for longer periods of
              time.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Children
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              This Site is offered and available to users who are at least 18
              years of age and of legal age to form a binding contract. Minors
              under 18 and at least 13 years of age, are only permitted to use
              the Site through an account owned by a parent or legal guardian
              with their appropriate permission. Minors under 13 are not
              permitted to use the Site or the Taskify services. We do not
              knowingly collect personal information from children under 13.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Sharing Personal Information with Third Parties
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We share personal information with third parties in order to
              operate the Site, provide our services to you, fulfil obligations
              imposed on us by applicable laws and regulations, and prevent
              fraud, infringements and illegal activities.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Security
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We implement technical and organizational measures to maintain the
              security of the Site and your personal information and in
              preventing unauthorized access, loss, misuse, alteration,
              destruction or damage to it through industry standard technologies
              and internal procedures.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Updating Personal Information
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              We take steps to ensure that the personal information we collect
              is accurate and up to date, and we provide you with the
              opportunity to update your information through your account
              profile settings. In the event that you believe your information
              is in any way incorrect or inaccurate, please let us know
              immediately.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
            }}
          >
            <Text
              style={{
                color: "white",
                width: 250,
                fontSize: 16,
                backgroundColor: "#E90064",
                marginTop: 15,
                marginBottom: 15,
                fontSize: 24,
                fontWeight: "300",
                textAlign: "center",
              }}
            >
              Our Legal Basis for Using Your Personal Information
            </Text>
            <Text
              style={{
                backgroundColor: "white",
                color: "#E90064",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Where relevant under applicable laws, all processing of your
              personal information will be justified by a "lawful ground" for
              processing as detailed below.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // terms and conditions page
  if (screenName === "Terms & Conditions") {
    return (
      <View style={{ justifyContent: "space-around", alignItems: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            User Conduct
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Users of the freelancing platform must act with integrity and
              honesty at all times. Any fraudulent or illegal activity will not
              be tolerated.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Payment
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The freelancing platform will charge a commission on all payments
              made through the platform. This commission will be clearly stated
              and agreed upon by the user.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Termination
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform reserves the right to terminate any user account at
              any time for any reason, without prior notice.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Intellectual Property
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Users retain all ownership rights to their intellectual property.
              However, by using the platform, users grant the platform a license
              to use their intellectual property for the purpose of promoting
              the platform.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Communication
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform provides communication tools for users to communicate
              with each other. However, the platform reserves the right to
              monitor these communications and take action if necessary.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Feedback
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Users are encouraged to leave feedback for each other, but all
              feedback must be fair and honest. The platform reserves the right
              to remove any feedback that is deemed to be unfair or dishonest.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Disputes
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform provides a dispute resolution process for users to
              resolve any disputes that may arise. Users are expected to use
              this process in good faith.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Confidentiality
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              Users must keep all confidential information obtained through the
              platform confidential. This includes any information about other
              users, the platform itself, or any projects being worked on.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Liability
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform is not liable for any damages or losses incurred by
              users as a result of using the platform.
            </Text>
          </View>

          <Text
            style={{
              backgroundColor: "white",
              width: 340,
              padding: 10,
              height: 50,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              marginBottom: -10,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              fontSize: 20,
              color: "#E90064",
              textAlign: "center",
            }}
          >
            Changes to Terms and Conditions
          </Text>
          <View
            style={{
              backgroundColor: "#E90064",
              width: 340,
              padding: 10,
              minHeight: 80,
              justifyContent: "space-around",
              alignItems: "center",
              margin: 20,
              borderRadius: 3,
              elevation: 10,
              shadowColor: "black",
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                color: "white",
                padding: 13,
                borderRadius: 3,
                fontSize: 16,
              }}
            >
              The platform reserves the right to change these terms and
              conditions at any time. Users will be notified of any changes and
              must agree to the new terms in order to continue using the
              platform.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default FunctionalPage;
