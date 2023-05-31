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
  RefreshControl,
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
  getClientAssigments,
  postAssignmentsServices,
} from "../../services/oneForAll";
import * as ImagePicker from "expo-image-picker";

const ClientPost = () => {
  const navigation = useNavigation();
  const [addAssignment, setAddAssignment] = useState({
    assignmentName: "",
    assignmentBudget: null,
    assignmentType: "",
    description: "",
  });

  const [attachment, setAttachment] = useState("");

  const inputData = (value, name) => {
    setAddAssignment({ ...addAssignment, [name]: value });
  };
  const [assignments, setAssignments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(false);

  const _id = useSelector((state) => state.client)._id;
  const token = useSelector((state) => state.client).token;

  const handleDocumentSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("sorry , we need camera roll permission to make this work");
    }

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });

      console.log("result: ", result);

      if (!result.canceled) {
        const imgSet = result.uri;
        setAttachment(result.uri);
        console.log("result.assets: ", result.uri);
      }
    }
  };

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

    const headers = { headers: { Authorization: `Bearer ${token}` } };

    const data = await getClientAssigments({ _id, headers });

    const { myAssignments, error } = data;
    console.log("myAssignments: ", myAssignments);

    error && myAssignments === undefined
      ? ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      : "";

    myAssignments ? setLoader(false) : setLoader(false), setRefresh(false);

    myAssignments ? setAssignments(myAssignments) : [];
  };

  const postAssignments = async () => {
    setLoader(true);
    try {
      const fd = new FormData();
      fd.append("assignmentName", addAssignment.assignmentName);
      fd.append("assignmentType", addAssignment.assignmentType);
      fd.append("assignmentBudget", addAssignment.assignmentBudget);
      fd.append("description", addAssignment.description);
      fd.append("attachments", {
        uri: attachment,
        name: new Date() + "_attachments",
        type: "image/jpg",
      });
      console.log("attachment: ", attachment);

      console.log("fd: ", fd);

      const result = await postAssignmentsServices({ fd, token });

      console.log("Result", result.data);
      if (result) {
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
        setAttachment("");
        getAssignments();
      } else if (error) {
        setLoader(false);
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      console.log("errors: ", error.response);
    }
  };

  const deleteAssignment = async (item) => {
    const onClickOk = async () => {
      setLoader(true);
      try {
        const { _id } = item;
        console.log("_id", _id);
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const response = await deleteAssignmentServices(headers, _id);
        // console.log("response",response);
        if (response) getAssignments();
      } catch (error) {
        console.log("error: ", error);

        return { error };
      }
    };

    Alert.alert(
      "Delete Task",
      "Are you sure , you want to delete this Task ?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => onClickOk(),
        },
      ]
    );
  };

  let notdone = 0;

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getAssignments()}
        />
      }
    >
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
            value={addAssignment.assignmentName}
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
            value={addAssignment.assignmentType}
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
            value={addAssignment.description}
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
            value={addAssignment.assignmentBudget}
          ></TextInput>
          <TouchableOpacity onPress={handleDocumentSelection}>
            <View
              style={{
                backgroundColor: "white",
                width: 200,
                borderRadius: 5,
                height: 50,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                padding: 10,
                marginTop: 10,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text style={{ marginTop: 5, fontSize: 18 }}>Attachments</Text>
              <ArrowUpOnSquareStackIcon style={{ color: "black" }} />
            </View>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", color: "white" }}>
            Add images only!
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: 100,
              height: 45,
              alignItems: "center",
              borderRadius: 5,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
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
              Add Task
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
            {assignments.length !== 0 ? (
              assignments.map((item, index) => {
                console.log("item: ", item);
                if (item.assignmentStatus === "pending") {
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
                            minHeight: 90,
                            maxHeight: "auto",
                            padding: 10,
                            backgroundColor: "white",
                            justifyContent: "space-around",
                            alignItems: "center",
                            borderRadius: 5,
                            shadowColor: "#748c94",
                            elevation: 10,
                            marginTop: 10,
                          }}
                        >
                          <View
                            style={{
                              width: 150,
                              padding: 10,
                            }}
                          >
                            <Text style={{ fontWeight: "500" }}>
                              {item.assignmentName}
                            </Text>
                            <Text style={{ fontWeight: "500" }}>
                              {item.assignmentType}
                            </Text>
                            {item.assignmentStatus === "pending" ? (
                              <Text style={{ fontWeight: "500", color: "red" }}>
                                pending*
                              </Text>
                            ) : (
                              <Text
                                style={{ fontWeight: "500", color: "green" }}
                              >
                                completed*
                              </Text>
                            )}
                          </View>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
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
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#E90064",
                              height: 40,
                              width: 40,
                              borderRadius: 4,
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <PencilSquareIcon
                              size={27}
                              color={"white"}
                            ></PencilSquareIcon>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => deleteAssignment(item)}
                            style={{
                              backgroundColor: "#E90064",
                              height: 40,
                              width: 40,
                              borderRadius: 4,
                              justifyContent: "space-around",
                              alignItems: "center",
                            }}
                          >
                            <TrashIcon
                              size={27}
                              style={{ color: "white" }}
                            ></TrashIcon>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                } else {
                  notdone = notdone + 1;
                }

                if (assignments.length === notdone) {
                  console.log("notdone: ", notdone);
                  console.log("assignments.length: ", assignments.length);

                  return (
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginTop: 40,
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        uploaded tasks have already been done!
                      </Text>
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        Please add some more tasks
                      </Text>
                    </View>
                  );
                }
              })
            ) : (
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    fontSize: 17,
                    fontWeight: "500",
                  }}
                >
                  No tasks uploaded yet!
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 17,
                    fontWeight: "500",
                  }}
                >
                  upload some tasks and get your work done
                </Text>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default ClientPost;
