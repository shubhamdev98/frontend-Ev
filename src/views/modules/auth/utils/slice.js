import { createSlice } from "@reduxjs/toolkit";
import { stringEncrypt } from "../../../../config/global-funtion";
import { api } from "../../../../store/api";
import { API_URL } from "./apiUrl";

const initialState = {
  isLoading: true,
  token: "",
  authUser: null,
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
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    resetAuthStore: () => {
      return initialState;
    },
  },
});

export const { Success, Failed, setToken, setAuthUser, resetAuthStore } =
  authSlice.actions;

export const initialValue = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("authUser");

  token && (await dispatch(setToken(token)));
  if (user) {
    const authUser = JSON.parse(user);
    await dispatch(setAuthUser(authUser));
  }
};

export const loginApi = (payload) => async (dispatch) => {
  try {
    const data = await api.post(API_URL.LOGIN, payload);
    if (payload?.rememberMe) {
      const encpassword = await stringEncrypt(payload?.password);
      const storeRemberMe = {
        email: payload?.email,
        password: encpassword,
        rememberMe: payload?.rememberMe,
      };
      localStorage.setItem("rememberMe", JSON.stringify(storeRemberMe));
    } else {
      localStorage.removeItem("rememberMe");
    }
    localStorage.setItem("token", data?.data?.data?.token);
    localStorage.setItem(
      "authUser",
      JSON.stringify(data?.data?.data?.userData)
    );
    dispatch(setToken(data?.data?.data?.token));
    dispatch(setAuthUser(data?.data?.data?.userData));
    return Promise.resolve(data?.data);
  } catch (error) {
    return Promise.reject(error?.response?.data);
  }
};

export const registerApi = (payload) => async (dispatch) => {
  try {
    const data = await api.post(API_URL.REGISTER, payload);
    console.log("data", data);
    dispatch(Success());
    return Promise.resolve(data?.data);
  } catch (error) {
    // console.log("error 51", error?.response?.data);
    dispatch(Failed());
    return Promise.reject(error?.response?.data);
  }
};

export const verify_OTPApi = (payload) => async (dispatch) => {
  try {
    const data = await api.post(API_URL.VERIFY_OTP, payload);
    dispatch(Success(data?.data));
    return Promise.resolve(data?.data);
  } catch (error) {
    // console.log("error 51", error?.response?.data);
    dispatch(Failed());
    return Promise.reject(error?.response?.data);
  }
};

export const forgotPasswordAndResendOTPApi = (payload) => async (dispatch) => {
  try {
    const data = await api.post(API_URL.FORGOT_PASSWORD, payload);
    dispatch(Success(data?.data));
    return Promise.resolve(data?.data);
  } catch (error) {
    // console.log("error 51", error?.response?.data);
    dispatch(Failed());
    return Promise.reject(error?.response?.data);
  }
};

export const ResetPasswordApi = (payload) => async (dispatch) => {
  try {
    const data = await api.post(API_URL.PASSWORD_RESET, payload);
    dispatch(Success(data?.data));
    return Promise.resolve(data?.data);
  } catch (error) {
    // console.log("error 51", error?.response?.data);
    dispatch(Failed());
    return Promise.reject(error?.response?.data);
  }
};

export const logOutApi = (payload) => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    dispatch(setToken(null));
    dispatch(setAuthUser(null));
  } catch (error) {
    dispatch(Failed());
    return Promise.reject(error?.response?.data);
  }
} 

const authReducer = authSlice.reducer;

export default authReducer;
