import React, { useEffect, useState } from "react";
import FormComponent from "./component/form/FormComponent";
import { useAppDispatch } from "../../../../store/hooks";
import { loginApi } from "../utils/slice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { LoginValidation } from "./component/ruls";
import { stringDecryptData } from "../../../../config/global-funtion";

const Login = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    // console.log("data", data);
    setIsLoading(true);
    await dispatch(loginApi(data))
      .then((res) => {
        console.log("res", res);
        setIsLoading(false);
        toast.success(res.message);
      })
      .catch((error) => {
        // console.log("error", error);
        setIsLoading(false);
        toast.error(error?.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: LoginValidation,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const getData = localStorage.getItem("rememberMe");
    if (getData) {
      const getRememberMe = JSON.parse(getData);
      formik.setValues({
        ...getRememberMe,
        password: stringDecryptData(getRememberMe?.password),
      });
    }
  }, []);

  const handleGoogleLogin = async (provider, googleData) => {
    const payload = {
      socialId: googleData.sub,
      email: googleData.email,
      name: googleData.name,
      token: googleData.access_token, // Or id_token based on what you need
      loginType: provider,
    };
    console.log("payload : ", payload);

    setIsLoading(true);
    await dispatch(loginApi(payload))
      .then((res) => {
        setIsLoading(false);
        toast.success(res.message);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error?.message);
      });
  };

  return (
    <div>
      <FormComponent
        formik={formik}
        isLoading={isLoading}
        handleGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
};

export default Login;
