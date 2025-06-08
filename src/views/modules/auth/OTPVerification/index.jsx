import React, { useEffect, useState } from "react";
import FormComponent from "./component/form/FormComponent";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router";
import VerificationSuccessful from "./component/form/VerificationSuccessful";
import { verifyOtpValidation } from "./component/rules";
import { useAppDispatch } from "../../../../store/hooks";
import { toast } from "react-toastify";
import { verify_OTPApi } from "../utils/slice";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const email = location.state?.email || "";
  const isReset = location.state?.isReset || false;
  const INITIAL_TIME_LEFT = 300; // 5 minutes in seconds

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    const { timeLeft, ...formdata } = data;
    const otp = Object.values(formdata).join("");
    const isExpired = formik.values.timeLeft <= 0;

    if (isExpired) {
      formik.setStatus("Code has expired. Please request a new one.");
      return;
    }

    const payload = {
      verification_otp: otp,
      email: email,
    };

    try {
      const response = await dispatch(verify_OTPApi(payload));
      setIsLoading(false);
      formik.resetForm();
      toast.success(response?.message || "Verification successful");

      if (isReset) {
        navigate("/reset-password", { state: { email, verified_otp: otp } });
      } else {
        navigate("/signin", { state: { email, verified: true } });
      }
    } catch (error) {
      console.log("error?.message", error?.message);

      setIsLoading(false);
      toast.error(error?.message || "Verification failed. Please try again.");
      formik.resetForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      timeLeft: INITIAL_TIME_LEFT, // 5 minutes
    },
    validationSchema: verifyOtpValidation,
    onSubmit: handleSubmit,
  });

  // Store when component mounted
  const startTime = Date.now();
  const EXPIRY_DURATION = 5 * 60 * 1000; // 5 minutes in ms

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      toast.warning("Email address is required");
      navigate(isReset ? "/forgot-password" : "/signup");
    }
  }, [email, navigate, isReset]);

  // Auto-focus first input on mount
  useEffect(() => {
    const timeId = setTimeout(() => {
      const firstInput = document.querySelector('input[name="otp0"]');
      if (firstInput) {
        firstInput.focus();
      }
      return () => clearTimeout(timeId);
    }, 100);
  }, [isLoading]);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextTimeLeft = Math.max(formik.values.timeLeft - 1, 0);
      formik.setFieldValue("timeLeft", nextTimeLeft);

      if (nextTimeLeft <= 0 && !formik.status) {
        formik.setStatus("Code expired. Please request a new one.");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [formik.values.timeLeft]);

  // Success UI
  if (formik.status === "success") {
    return <VerificationSuccessful isReset={isReset} email={email} />;
  }

  return (
    <div>
      <FormComponent
        formik={formik}
        isReset={isReset}
        email={email}
        INITIAL_TIME_LEFT={INITIAL_TIME_LEFT}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default OTPVerification;


