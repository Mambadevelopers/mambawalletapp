const { axiosInstance } = require(".");

//===================================
//Login a user
//-========================
export const LoginUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/login", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//===================================
//Register User a user
//-========================

export const RegisterUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/register", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//===================================
//Register User info
//-========================

export const GetUserInfo = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/get-user-info", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//===================================
//Get all users
//-========================
export const GetAllUsers = async () => {
  try {
    const { data } = await axiosInstance.post("/api/users/get-all-users");
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//===================================
//Update Users verified status
//-========================
export const UpdateUsersVerifiedStatus = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/users/update-user-verified-status", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

