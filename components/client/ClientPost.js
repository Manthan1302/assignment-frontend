import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
// import DocumentPicker from "react-native-document-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  Text,
  TextInput,
  View,
  Alert,
  BackHandler,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  UserGroupIcon,
  ArrowUpOnSquareStackIcon,
  CurrencyRupeeIcon,
  TrashIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import {
  deleteAssignmentServices,
  getAllAssingmentServices,
  postAssignmentsServices,
} from "../../services/oneForAll";
const ClientPost = () => {
  const navigation = useNavigation();
  const [showPwd, setShowPwd] = useState(true);
  const [addAssignment, setAddAssignment] = useState({
    assignmentName: "",
    assignmentBudget: null,
    assignmentType: "",
    description: "",
  });

  const [Img, setImg] = useState({
    attachments: [],
  });

  const inputData = (value, name) => {
    setAddAssignment({ ...addAssignment, [name]: value });
  };
  const [assignments, setAssignments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);
  const token = useSelector((state) => state.client).token;

  //add img
  const inputImg = () => {
    // setImg({attachments:e.target.files});
    setImg({
      attachments:
        "http://localhost:4300/clientAttachments/attachments_1678770505806.jpg",
    });
  };

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
      });
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    getAssignments();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const getAssignments = async () => {
    setLoader(true);
    setRefresh(true);
    const data = await getAllAssingmentServices();

    const { theData, error } = data;
    console.log("theData: ", theData);

    error && theData === undefined
      ? ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      : "";

    theData ? setLoader(false) : setLoader(true), setRefresh(false);

    theData ? setAssignments(theData) : [];
  };

  const postAssignments = async () => {
    setLoader(true);
    try {
      const { assignmentName, assignmentType, assignmentBudget, description } =
        addAssignment;
      // const {attachments}=Img;
      attachments = `http://localhost:4300/clientAttachments/attachments_1678770505806.jpg`;
      const data = {
        assignmentName,
        assignmentType,
        assignmentBudget,
        description,
        attachments,
      };
      console.log("Data", data);

      const fd = new FormData();
      fd.append("assignmentName", assignmentName);
      fd.append("assignmentType", assignmentType);
      fd.append("assignmentBudget", assignmentBudget);
      fd.append("description", description);
      fd.append("attachments", attachments);
      //   for(const key of Object.keys(attachments)){
      //     fd.append("attachments",attachments[key]);
      // }
      // const headers = { headers: { Authorization: `Bearer ${token}` } };
      const result = await postAssignmentsServices({ fd, token });
      console.log("Result", result);
      if (result) {
        setLoader(false);
        ToastAndroid.show(
          `Task added Successfull!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setAddAssignment({
          assignmentName: "",
          assignmentType: "",
          assignmentBudget: "",
          description: "",
        });
      } else if (error) {
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoader(false);
      }
    } catch (error) {
      console.log("errors: ", error.response);
    }
  };

  const deleteAssignment = async (item) => {
    setLoader(true);
    try {
      const { _id } = item;
      console.log("_id", _id);
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response = await deleteAssignmentServices(headers, _id);
      // console.log("response",response);
      if (response) setLoader(false);
      getAssignments();
    } catch (error) {
      console.log("error: ", error);

      return { error };
    }
    getAssignments();
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        <View
          style={{
            padding: 10,
            marginTop: 10,
            height: 40,
            backgroundColor: "#E90064",
            height: 550,
            width: 395,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              marginTop: 50,
            }}
          >
            Add Assignment
          </Text>
          <TextInput
            placeholder="Assignment Name"
            style={{
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              height: 50,
              borderColor: "white",
              backgroundColor: "white",
              marginTop: 20,
            }}
            onChangeText={(text) => inputData(text, "assignmentName")}
          ></TextInput>

          <TextInput
            placeholder="Assignment Type"
            style={{
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              height: 50,
              borderColor: "white",
              backgroundColor: "white",
            }}
            onChangeText={(text) => inputData(text, "assignmentType")}
          ></TextInput>

          <TextInput
            placeholder="Assignment Description"
            multiline={true}
            style={{
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              height: 50,
              borderColor: "white",
              backgroundColor: "white",
            }}
            onChangeText={(text) => inputData(text, "description")}
          ></TextInput>

          <TextInput
            placeholder="Assignment Budget"
            keyboardType="phone-pad"
            style={{
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              height: 50,
              borderColor: "white",
              backgroundColor: "white",
            }}
            onChangeText={(text) => inputData(text, "assignmentBudget")}
          ></TextInput>
          <TouchableOpacity
            onPress={handleDocumentSelection}
            onChangeText={inputImg}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 250,
                borderRadius: 8,
                height: 50,
                alignItems: "center",
                padding: 10,
                marginTop: 10,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text style={{ marginTop: 5, fontSize: 18 }}>
                Enter Attachments{" "}
              </Text>
              <Text style={{ marginLeft: 190, marginTop: -25, fontSize: 18 }}>
                <ArrowUpOnSquareStackIcon style={{ color: "black" }} />
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: 150,
              height: 45,
              alignItems: "center",
              borderRadius: 20,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
            }}
            onPress={postAssignments}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              Add Assignment
            </Text>
          </TouchableOpacity>
        </View>
        {loader ? (
          <Modal
            transparent={true}
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFFaa",
                flex: 1,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#E90064",
                  height: 70,
                  width: 140,
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
          // all the assignments

          <View style={{ marginBottom: 160 }}>
            {assignments.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    marginTop: 25,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ClientBid", {
                        assignment: item,
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        width: 350,
                        height: 80,
                        backgroundColor: "white",
                        justifyContent: "space-around",
                        alignItems: "center",
                        borderRadius: 5,
                        shadowColor: "#748c94",
                        elevation: 10,

                        // marginTop: 10,
                        marginBottom: 17,
                      }}
                    >
                      <View style={{ width: 150 }}>
                        <Text style={{ fontWeight: "500" }}>
                          {item.assignmentName}
                        </Text>
                        <Text style={{ fontWeight: "500" }}>
                          {item.assignmentType}
                        </Text>
                      </View>

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <CurrencyRupeeIcon
                          color={"#E90064"}
                          height={25}
                          width={25}
                        />
                        <Text
                          style={{
                            fontWeight: "500",
                          }}
                        >
                          {item.assignmentBudget}
                        </Text>
                      </View>
                      <PencilSquareIcon
                        style={{ color: "black" }}
                      ></PencilSquareIcon>
                      <TrashIcon
                        style={{ color: "black" }}
                        onPress={() => deleteAssignment(item)}
                      ></TrashIcon>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ClientPost;
