import { createSlice } from "@reduxjs/toolkit";
import { stringDecryptData, stringEncrypt } from "../../../../config/global-funtion";
import { api } from "../../../../store/api";
import { API_URL } from "./apiUrl";

const initialState = {
  isLoading: true,
  token: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    Success: (state) => {
      state.isLoading = false;
    },
    Failed: (state) => {
      state.isLoading = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { Success, Failed, setToken } = authSlice.actions;

const authReducer = authSlice.reducer;

export const loginApi = (payload) => async (dispatch) => {
  try {
    console.log("payload", payload?.rememberMe);
    const encpassword = await stringEncrypt(payload?.password);
    const decrpassword = await stringDecryptData(encpassword);

    console.log("stringEncrypt", encpassword);
    console.log("stringDecryptData", decrpassword);

  } catch (error) {
    console.log("error", error);
  }
};

export const registerApi = (payload) => async (dispatch) => {
  try {
    const data = await api.post(API_URL.REGISTER,payload);
    console.log("data",data);
    
  } catch (error) {
    // console.log("error 51", error?.response?.data);
    return Promise.reject(error?.response?.data)
  }
};

export default authReducer;
