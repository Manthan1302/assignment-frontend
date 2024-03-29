import axios from "axios";
const host = "https://taskify-backend-server.onrender.com";
// const host = "http://localhost:4000";
export const loginServices = async (data) => {
  console.log("data:", data);
  const url = "/login";
  const link = host + url;

  try {
    const result = await axios.post(link, data);
    console.log(
      "==========================================================================="
    );
    console.log("result:", result.data);
    if (result.data.logedActor) {
      const response = result.data.logedActor;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error:", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error:", error);
    return { error };
  }
};

// edit pass
export const editUserPassService = async ({ _id, headers, newPass }) => {
  try {
    const url = `/editPasswordUser/${_id}`;
    const link = host + url;

    const password = newPass;

    const body = { password };

    const result = await axios.put(link, body, headers);
    console.log("password was updated: ", result.data);

    if (result.data.error) {
      const error = result.data.error;

      return { error };
    }

    const { updated } = result.data;

    return { updated };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const editUserService = async ({ _id, headers, editData }) => {
  try {
    const url = `/editUser/${_id}`;
    const link = host + url;

    const result = await axios.put(link, editData, headers);
    // console.log("password was updated: ", result.data);

    if (result.data.error) {
      const error = result.data.error;

      return { error };
    }

    const { updated } = result.data;

    return { updated };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// edit pass
export const editClientPassService = async ({ _id, headers, newPass }) => {
  try {
    const url = `/editPasswordClient/${_id}`;
    const link = host + url;

    const password = newPass;

    const body = { password };

    const result = await axios.put(link, body, headers);
    console.log("password was updated: ", result.data);

    if (result.data.error) {
      const error = result.data.error;

      return { error };
    }

    const { updated } = result.data;

    return { updated };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const editClientService = async ({ _id, headers, editData }) => {
  try {
    const url = `/editClient/${_id}`;
    const link = host + url;

    const result = await axios.put(link, editData, headers);
    // console.log("password was updated: ", result.data);

    if (result.data.error) {
      const error = result.data.error;

      return { error };
    }

    const { updated } = result.data;

    return { updated };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const signupUserServices = async (data) => {
  console.log("------------------------------");
  console.log("data form data:", data);

  const url = "/signupUser";
  const link = host + url;

  try {
    const result = await axios.post(link, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(
      "==========================================================================="
    );
    console.log("result: ", result.data);

    console.log("success on signup:", result.data.successOnSignUp);
    if (result.data.successOnSignUp) {
      const response = result.data.successOnSignUp;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error:", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error:", error);
    return { error };
  }
};

export const uploadWorkDemo = async ({ fd, token }) => {
  try {
    const url = "/addWorkDemo";
    const link = host + url;

    const result = await axios.post(link, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("result: ", result.data);

    const { newWorkImage, error } = result.data;

    if (error) {
      return { error };
    }

    return { newWorkImage };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getWorkDemoService = async ({ headers }) => {
  // console.log("headers serice: ", headers);
  const url = "/getMyWorkImage";
  const link = host + url;
  // console.log("link service: ", link);

  try {
    const result = await axios.get(link, headers);

    const { myWorkImages, error } = result.data;
    console.log("error - service: ", error);
    console.log("myWorkImages  - service: ", myWorkImages);

    if (error) {
      return { error };
    }

    return { myWorkImages };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const deleteWorkDemoService = async ({ headers, id }) => {
  const url = `/deleteMyWorkDemo/${id}`;
  const link = host + url;

  try {
    const result = await axios.delete(link, headers);

    const { message, error } = result.data;

    if (error) {
      return { error };
    }

    return { message };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const signUpClientServices = async (data) => {
  console.log("------------------------------");
  console.log("data:", data);
  const url = "/signupClient";
  const link = host + url;

  try {
    const result = await axios.post(link, data);
    console.log(
      "==========================================================================="
    );
    console.log("result: ", result.data);

    console.log("success on signup:", result.data.successOnSignUp);
    if (result.data.successOnSignUp) {
      const response = result.data.successOnSignUp;
      return { response };
    } else if (result.data.error) {
      console.log("result.data.error:", result.data.error);
      const error = result.data.error;
      return { error };
    }
  } catch (error) {
    console.log("error:", error);
    return { error };
  }
};

export const getAllAssingmentServices = async () => {
  console.log("------------------------------");
  const url = "/visitorsAssigments";
  const link = host + url;

  try {
    const response = await axios.get(link);

    const theData = response.data.allAssignments;

    return { theData };
  } catch (error) {
    console.log("error:", error);
    return { error };
  }
};

export const getClientAssigments = async ({ _id, headers }) => {
  console.log("------------------------------");
  const url = `/getMyTask/${_id}`;
  const link = host + url;

  try {
    const response = await axios.get(link, headers);

    const { myAssignments, error } = response.data;

    if (error) {
      return { error };
    }

    return { myAssignments };
  } catch (error) {
    console.log("error:", error);
    return { error };
  }
};

export const getAllUsersServices = async ({ headers }) => {
  const url = "/getAllWorkImages";
  const link = host + url;
  try {
    const response = await axios.get(link, headers);
    console.log("response work images: ", response.data);
    const allWorkImages = response.data.allUserWorkImage;

    return { allWorkImages };
  } catch (error) {
    console.log("error1:", error);
    return { error };
  }
};

export const getSearchAssignmentServices = async ({ searchTask }) => {
  console.log("searchTask: ", searchTask);
  try {
    const url = `/searchAssignment/${searchTask}`;
    const link = host + url;

    const response = await axios.get(link);
    // console.log("response: ", response.data);

    if (response.data.error) {
      const error = response.data.error;

      return { error };
    }

    const allSearchAssignment = response.data.found;

    return { allSearchAssignment };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getBidsonTaskServices = async ({ _id }) => {
  try {
    const url = `/getParticularTaskBid/${_id}`;
    const link = host + url;
    // console.log("link: ", link);

    const response = await axios.get(link);

    console.log("response: ", response.data);

    const { allTaskBids, error } = response.data;

    if (error) {
      return { error };
    }

    return { allTaskBids };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postBidonTaskService = async ({ taskId, userBid, headers }) => {
  const url = `/postBid/${taskId}`;
  const link = host + url;

  try {
    const response = await axios.post(link, userBid, headers);

    const usersBid = response.data;
    const { myBid, error } = usersBid;

    if (error) {
      return { error };
    }

    return { myBid };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getMyBidsService = async ({ headers }) => {
  const url = "/getMyBid";
  const link = host + url;

  try {
    const response = await axios.get(link, headers);
    console.log("-------------------------------------");
    console.log("response: ", response.data);

    const { findMyBid, error, Message } = response.data;

    if (error) {
      return { error };
    }

    if (Message) {
      return { Message };
    }

    return { findMyBid };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getOrdersForUserService = async ({ headers }) => {
  const url = "/getUserOrders";
  const link = host + url;

  try {
    const response = await axios.get(link, headers);

    const { userOrders, error } = response.data;

    if (error) {
      return { error };
    }

    return { userOrders };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getSearchUserServices = async ({ searchUser }) => {
  console.log("searchUser: ", searchUser);
  try {
    const url = `/searchUser/${searchUser}`;
    const link = host + url;

    const response = await axios.get(link);
    if (response.data.error) {
      const error = response.data.error;
      return { error };
    }
    const allSearchUser = response.data.found;

    return { allSearchUser };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const onWorkCompleteService = async ({ _id, headers }) => {
  const url = `/onCompleteTask/${_id}`;
  const link = host + url;

  const data = { workStatus: "done" };

  try {
    const response = await axios.put(link, data, headers);

    const { message, error } = response.data;
    console.log("==================================================");
    console.log("headers: ", headers);
    console.log("link: ", link);
    console.log("response.data: ", response.data);

    if (response.data.code === 500) {
      const error = "something went wrong in Authentication";
      return { error };
    }

    if (error) {
      return { error };
    }

    return { message };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const deleteAssignmentServices = async (header, id) => {
  try {
    const url = `/deleteMyTask/${id}`;
    const link = host + url;
    const response = await axios.delete(link, header);
    return response;
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const deleteMyBidService = async ({ _id, headers }) => {
  try {
    const url = `/deleteMyBid/${_id}`;
    const link = host + url;

    const response = await axios.delete(link, headers);

    const { error, deletedBid } = response.data;

    if (error) {
      return { error };
    }

    return { deletedBid };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postAssignmentsServices = async ({ fd, token }) => {
  // console.log("data form data:", header);
  const url = "/uploadTask";
  const link = host + url;
  try {
    const response = await axios.post(link, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response", response);
    return response;
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getClientBidsService = async ({ headers }) => {
  try {
    const url = "/getClientsBid";
    const link = host + url;

    const response = await axios.get(link, headers);
    console.log("response: ", response.data);

    const { allBids, error } = response.data;

    if (error) {
      return { error };
    }

    return { allBids };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// >>>>>>>>>>>>>>>>>> user chat and get

export const getAllUserChatService = async ({ headers }) => {
  try {
    const url = "/getAllClientChats";
    const link = host + url;

    const response = await axios.get(link, headers);
    console.log("response: ", response.data);

    const { allChats, error } = response.data;

    if (error) {
      return { error };
    }

    return { allChats };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postMessageUser = async ({ data, headers }) => {
  try {
    const url = "/postMessageUser";
    const link = host + url;

    const reply = await axios.put(link, data, headers);

    const { newMessage, error } = reply.data;

    if (error) {
      return { error };
    }

    return { newMessage };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postUserAttachment = async ({ fd, userToken }) => {
  console.log("fd: ", fd);
  try {
    const url = "/sendUserAttachments";
    const link = host + url;

    const reply = await axios.post(link, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      },
    });

    const { newMessage, error } = reply.data;
    console.log("reply.data: ", reply.data);

    if (error) {
      return { error };
    }

    return { newMessage };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getMychatWithClientService = async ({ _id, headers }) => {
  try {
    const url = `/getUserchatRoomId/${_id}`;
    const link = host + url;

    const reply = await axios.get(link, headers);

    const { chatRoom, error } = reply.data;

    if (error) {
      return { error };
    }

    return { chatRoom };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postOrderServices = async ({ _id, headers, data }) => {
  console.log(_id);
  try {
    const url = `/placeOrder/${_id}`;
    const link = host + url;

    const reply = await axios.put(link, data, headers);
    const { accepted, rejected, error } = reply.data;
    if (error) {
      return { error };
    }

    return { accepted, rejected };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// >>>>>>>>>>>> client chat
export const createClientChatRoomService = async ({ userId, headers }) => {
  try {
    const url = `/createClientChatroom/${userId}`;
    const link = host + url;

    const response = await axios.get(link, headers);
    console.log("response: ", response.data);

    const { newMessage, error } = response.data;

    if (error) {
      return { error };
    }

    return { newMessage };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getAllClientChatService = async ({ headers }) => {
  try {
    const url = "/getAllUserChats";
    const link = host + url;

    const response = await axios.get(link, headers);
    console.log("response: ", response.data);

    const { allChats, error } = response.data;

    if (error) {
      return { error };
    }

    return { allChats };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postMessageClient = async ({ data, headers }) => {
  try {
    const url = "/postMessageClient";
    const link = host + url;

    const reply = await axios.put(link, data, headers);

    const { newMessage, error } = reply.data;

    if (error) {
      return { error };
    }

    return { newMessage };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postClientAttachment = async ({ fd, headers }) => {
  console.log("fd: ", fd);
  try {
    const url = "/sendClientAttachments";
    const link = host + url;

    const reply = await axios.post(link, fd, headers);

    const { newMessage, error } = reply.data;
    console.log("reply.data: ", reply.data);

    if (error) {
      return { error };
    }

    return { accepted, rejected };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getMychatWithUserService = async ({ _id, headers }) => {
  try {
    const url = `/getClientchatRoomId/${_id}`;
    const link = host + url;

    const reply = await axios.get(link, headers);

    const { chatRoom, error } = reply.data;

    if (error) {
      return { error };
    }

    return { chatRoom };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// >>>>>>>>>>>>> feedback

export const postFeedbackUserApi = async ({ headers, feedback }) => {
  try {
    const url = `/postUserFeedback`;
    const link = host + url;

    const data = { feedback };

    const response = await axios.post(link, data, headers);

    const { feed, error } = response.data;
    console.log("response.data: ", response.data);

    if (error) {
      return { error };
    }

    return { feed };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const postFeedbackClientApi = async ({ headers, feedback }) => {
  try {
    const url = `/postClientFeedback`;
    const link = host + url;

    const data = { feedback };

    const response = await axios.post(link, data, headers);

    const { feed, error } = response.data;
    console.log("response.data: ", response.data);

    if (error) {
      return { error };
    }

    return { feed };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// >>>>>>>>>>>>> user complaint
export const postCompaintUserApi = async ({ headers, complaint }) => {
  try {
    const url = `/postUserComplaints`;
    const link = host + url;

    const data = { complaint };

    const response = await axios.post(link, data, headers);

    const { addComplaint, error } = response.data;

    if (error) {
      return { error };
    }

    return { addComplaint };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getComplaintUserApi = async ({ headers }) => {
  try {
    const url = `/getUserComplaints`;
    const link = host + url;

    const response = await axios.get(link, headers);

    const { myComplaints, error } = response.data;

    if (error) {
      return { error };
    }

    return { myComplaints };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const deleteComplaintUserApi = async ({ id, headers }) => {
  try {
    const url = `/deleteUserComplaints/${id}`;
    const link = host + url;

    const response = await axios.delete(link, headers);

    const { feedDeleted, error } = response.data;

    if (error) {
      return { error };
    }

    return { feedDeleted };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// >>>>>>>>>>>>> client complaint
export const postCompaintClientApi = async ({ headers, complaint }) => {
  try {
    const url = `/postClientComplaints`;
    const link = host + url;

    const data = { complaint };

    const response = await axios.post(link, data, headers);

    const { addComplaint, error } = response.data;

    if (error) {
      return { error };
    }

    return { addComplaint };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const getComplaintClientApi = async ({ headers }) => {
  try {
    const url = `/getClientComplaints`;
    const link = host + url;

    const response = await axios.get(link, headers);

    const { myComplaints, error } = response.data;
    console.log("response.data: ", response.data);
    console.log("myComplaints: ", myComplaints);

    if (error) {
      return { error };
    }

    return { myComplaints };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

export const deleteComplaintClientApi = async ({ id, headers }) => {
  try {
    const url = `/deleteClientComplaints/${id}`;
    const link = host + url;

    const response = await axios.delete(link, headers);

    const { feedDeleted, error } = response.data;

    if (error) {
      return { error };
    }

    return { feedDeleted };
  } catch (error) {
    console.log("error: ", error);

    return { error };
  }
};

// -------------------------------
// payemnt gateway

// user

export const askForPaymentService = async ({
  assignmentCost,
  assignmentId,
  clientId,
  _id,
  headers,
}) => {
  try {
    console.log("headers: ", headers);

    const url = `/askForPayment/${_id}`;
    const link = host + url;

    const data = {
      clientId,
      assignmentCost,
      assignmentId,
      paymentInfo: "pending",
    };

    const reply = await axios.post(link, data, headers);

    const { success, error } = reply.data;
    console.log("error: ", error);

    if (error) {
      return { error };
    }

    return { success };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const getWalletService = async ({ headers }) => {
  try {
    const url = `/getBalance`;
    const link = host + url;

    const reply = await axios.get(link, headers);

    const { error, myBalance } = reply.data;

    if (error) {
      return { error };
    }

    return { myBalance };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

export const createWalletIntentService = async ({ amount, headers }) => {
  try {
    const url = `/walletIntentUser`;
    const link = host + url;

    const data = { amount };

    const reply = await axios.post(link, data, headers);

    const { paymentIntent, error } = reply.data;

    if (error) {
      return { error };
    }

    return { paymentIntent };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};
export const withdrawAmtService = async ({ headers, amount }) => {
  try {
    const url = `/withdrawAmount`;
    const link = host + url;

    const data = {
      withdrawlAmt: Number(amount),
    };

    const reply = await axios.put(link, data, headers);

    const { error, success } = reply.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};

//client payment

export const getAllPaymentService = async ({ headers }) => {
  try {
    const url = "/getAllPaymentClient";
    const link = host + url;

    const response = await axios.get(link, headers);

    const { error, allPayments } = response.data;

    if (error) {
      return { error };
    }

    return { allPayments };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const payAmountService = async (_id, headers) => {
  console.log("payAmountService called: ");
  try {
    const url = `/payAmount/${_id}`;

    const link = host + url;

    const data = { paymentInfo: "paid" };

    const resposne = await axios.put(link, data, headers);

    const { success, error } = resposne.data;

    if (error) {
      return { error };
    }

    return { success };
  } catch (error) {
    console.log("error: ", error);
    return { error };
  }
};

export const createPayemntIntentService = async ({ amount, headers }) => {
  try {
    const url = `/paymentIntent`;
    const link = host + url;

    const data = { amount };

    const reply = await axios.post(link, data, headers);

    const { paymentIntent, error } = reply.data;

    if (error) {
      return { error };
    }

    return { paymentIntent };
  } catch (e) {
    console.log("error: ", error);
    return { error };
  }
};
