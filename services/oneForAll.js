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

export const signupUserServices = async (data) => {
  console.log("------------------------------");
  console.log("data:", data);
  const url = "/signupUser";
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



export const getAllUsersServices = async()=>{
  console.log("------------------------------");
  const url = "/getAllUsersClient";
  const link = host + url;
  try{
    const response = await axios.get(link);
    const theData = response.data;

    return { theData };
  }
  catch(error)
  {
    console.log("error:", error);
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

