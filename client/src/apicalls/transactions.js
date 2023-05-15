const { axiosInstance } = require(".");

//=========================================
//Verify receiver account
//=================================
export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/verify-account",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};


//=========================================
//Transfer Funds
//=================================
export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/transfer-funds",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//=========================================
//Get transactions
//=================================
export const GetTransactionsOfUser = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/transactions/get-all-transactions-by-user",
      payload
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

//=========================================
//Deposit funds using strip
//=================================
export const DepositFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/transactions/deposit-funds", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
}
