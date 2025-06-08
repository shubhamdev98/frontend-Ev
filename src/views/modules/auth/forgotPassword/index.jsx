
import React, { useState } from "react";
import FormComponent from "./component/form/FormComponent";
import { useAppDispatch } from "../../../../store/hooks";
import { assignFormError } from "../../../../config/global-funtion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { forgotPasswordValidation } from "./ruls";
import { forgotPasswordAndResendOTPApi } from "../utils/slice";
import LoadingOverlay from "../../../../components/LoadingOverlay";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    console.log("data : ", data);

    setIsLoading(true);
    data.flag = "forgot_password";
    await dispatch(forgotPasswordAndResendOTPApi(data))
      .then((res) => {
        console.log("res", res);
        setIsLoading(false);
        formik.resetForm();
        navigate("/verify-otp", {
          state: { email: data?.email, isReset: true },
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error 22", error?.message);
        formik.resetForm();
        assignFormError(formik, error.errors);
        toast.error(error?.message);
        navigate("/verify-otp", {
          state: { email: data?.email, isReset: true },
        });
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: handleSubmit,
  });


  return (
    <div>
      {isLoading && <LoadingOverlay text="Processing..." />}
      <FormComponent formik={formik} isLoading={isLoading} />
    </div>
  );
};

export default ForgotPassword;
