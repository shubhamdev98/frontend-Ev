import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../../../store/hooks";
import { registerApi } from "../utils/slice";
import { assignFormError } from "../../../../config/global-funtion";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { registerValidation } from "./component/ruls";
import FormComponent from "./component/form/FormComponent";
import LoadingOverlay from "../../../../components/LoadingOverlay";

const Registration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    data.repeat_password = data.confirmPassword;

    const { confirmPassword, companyName, role, ...payload } = data;
    console.log("payload", payload);

    await dispatch(registerApi(payload))
      .then((res) => {
        console.log("res", res);
        setIsLoading(false);
        toast.success(res?.message);
        formik.resetForm();
        navigate("/verify-otp", { state: { email: payload?.email } });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error 20", error?.message);
        assignFormError(formik, error.errors);
        toast.error(error?.message);
        
      });
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      role: "user",
    },
    validationSchema: registerValidation,
    onSubmit: handleSubmit,
  });
  return (
    <>
      {isLoading && <LoadingOverlay text="Processing..." />}
      <FormComponent formik={formik} />
    </>
  );
};

export default Registration;
