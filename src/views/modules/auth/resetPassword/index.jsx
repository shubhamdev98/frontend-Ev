// --------------- ResetPassword

// index.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../store/hooks";
import { ResetPasswordApi } from "../utils/slice";
import FormComponent from "./component/form/FormComponent";
import { ResetPasswordValidation } from "./component/rules";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const email = location?.state?.email;
  const verified_otp = location?.state?.verified_otp;

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    delete data.confirmPassword;
    data.verification_otp = verified_otp;
    data.email = email;
    // console.log("data", data);
    try {
      setIsLoading(true);
      const response = await dispatch(ResetPasswordApi(data));
      console.log("response", response);
      setIsLoading(false);
      formik.resetForm();
      navigate("/signin");
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      new_password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordValidation,
    onSubmit: handleSubmit,
  });

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      toast.warning("Email address is required");
      navigate("/forgot-password");
    } else if (!verified_otp) {
      toast.warning("Please verify our account");
      navigate("/verify-otp", {
        state: { email: email, isReset: true },
      });
    }
  }, [email, navigate, verified_otp]);

  return (
    <div>
      <FormComponent formik={formik} isLoading={isLoading} />
    </div>
  );
};

export default ResetPassword;