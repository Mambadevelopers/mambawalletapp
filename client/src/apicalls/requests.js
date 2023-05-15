import { axiosInstance } from ".";

//=========================================
//Get all request for user
//===================
export const GetAllRequestsByUser = async () => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/get-all-requests-by-user"
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//=========================================
//Send a request to another user
//===================
export const SendRequest = async (request) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/send-request",
      request
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//=========================================
//Update request status
//===================
export const UpdateRequestStatus = async (request) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/update-request-status",
      request
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

