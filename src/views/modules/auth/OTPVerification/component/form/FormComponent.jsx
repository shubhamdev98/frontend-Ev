import React from "react";
import { ArrowLeft, AlertCircle, Clock, Mail } from "lucide-react";
import Logo from "../../../../../../assets/Logo.png";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../../../store/hooks";
import { forgotPasswordAndResendOTPApi } from "../../../utils/slice";
import LoadingOverlay from "../../../../../../components/LoadingOverlay";

const FormComponent = ({
    formik,
    isReset,
    email,
    INITIAL_TIME_LEFT,
    isLoading,
    setIsLoading,
}) => {
    const dispatch = useAppDispatch();

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    const handleResendCode = async () => {
        try {
            // Here you would call your API to resend OTP
            // formik.setFieldValue("timeLeft", INITIAL_TIME_LEFT);
            // formik.setStatus(null);
            setIsLoading(true);

            const payload = {
                email: email,
                flag: "resend_otp",
            };
            const response = await dispatch(forgotPasswordAndResendOTPApi(payload));
            console.log("response", response);

            setIsLoading(false);

            formik.resetForm()
            toast.success("New verification code sent successfully");
        } catch (error) {
            console.log("error 22", error?.message);
            setIsLoading(false);
            formik.resetForm()
            toast.error(error?.message || "Failed to resend code. Please try again.");
        }
    };

    const expired = formik.values.timeLeft <= 0;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-dark to-primary px-4 py-10">
            {isLoading && <LoadingOverlay text="Waiting..." />}
            <div className="bg-white/10 p-8 rounded-2xl max-w-md w-full border border-background-light/20 backdrop-blur-sm">
                <div className="text-center mb-6">
                    <NavLink to="/">
                        <img src={Logo} alt="Company Logo" className="w-12 mx-auto" />
                    </NavLink>
                    <h2 className="text-lg font-bold text-background-light mt-2">
                        Crystal Event Management System
                    </h2>
                </div>

                <div className="text-center mb-6">
                    <div className="flex items-center justify-center text-background-light mb-2">
                        <Mail className="h-5 w-5 mr-2" />
                        <h3 className="text-lg font-semibold">
                            {isReset ? "Password Reset Verification" : "Account Verification"}
                        </h3>
                    </div>
                    <p className="text-sm text-background-light/70">
                        We've sent a 6-digit code to{" "}
                        <span className="font-medium text-background-light">{email}</span>
                    </p>
                </div>

                {formik.status && typeof formik.status === "string" && (
                    <div className="p-3 bg-red-50/10 border border-red-100/30 text-red-400 text-sm flex items-start mb-4 rounded-lg">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{formik.status}</span>
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <div className="flex justify-between text-sm text-background-light mb-2">
                            <label>Enter 6-digit code</label>
                            <div
                                className={`flex items-center ${expired ? "text-red-400" : "text-background-light/70"
                                    }`}
                            >
                                <Clock className="inline w-3.5 h-3.5 mr-1" />
                                {expired ? "Expired" : formatTime(formik.values.timeLeft)}
                            </div>
                        </div>

                        <div className="flex justify-center space-x-3">
                            {["otp0", "otp1", "otp2", "otp3", "otp4", "otp5"].map(
                                (name, idx, arr) => {
                                    const hasError = formik.touched[name] && formik.errors[name];
                                    return (
                                        <input
                                            //   autoFocus
                                            key={name}
                                            name={name}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            maxLength={1}
                                            value={formik.values[name]}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, "");
                                                if (val || val === "") {
                                                    formik.setFieldValue(name, val);
                                                    if (val && idx < arr.length - 1) {
                                                        e.target.form.elements[arr[idx + 1]]?.focus();
                                                    }
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (
                                                    e.key === "Backspace" &&
                                                    !formik.values[name] &&
                                                    idx > 0
                                                ) {
                                                    e.target.form.elements[arr[idx - 1]]?.focus();
                                                }
                                            }}
                                            onFocus={(e) => e.target.select()}
                                            onBlur={formik.handleBlur}
                                            className={`w-12 h-14 text-center text-xl font-bold rounded-lg focus:outline-none 
                                            ${hasError
                                                    ? "bg-red-100/10 border-red-500 focus:ring-red-500 border"
                                                    : "bg-white/5 border border-background-light/30 focus:ring-secondary focus:border-secondary"
                                                }
                                            text-background-light`}
                                            disabled={expired}
                                            autoComplete="off"
                                        />
                                    );
                                }
                            )}
                        </div>

                        {Object.values(formik.errors).filter(Boolean).length > 0 && (
                            <p className="text-xs text-red-400 mt-2 text-center">
                                Please enter a complete 6-digit verification code
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={expired || formik.isSubmitting || !formik.isValid}
                        className="w-full py-3 rounded-lg bg-secondary hover:bg-secondary-dark text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {formik.isSubmitting ? "Verifying..." : "Verify Code"}
                    </button>

                    <div className="flex justify-between text-sm">
                        <NavLink
                            to={isReset ? "/forgot-password" : "/signup"}
                            className="text-secondary hover:text-secondary-dark flex items-center"
                            state={{ email }}
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back
                        </NavLink>

                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={!expired}
                            className={`flex items-center ${expired
                                    ? "text-secondary hover:text-secondary-dark"
                                    : "text-background-light/40 cursor-not-allowed"
                                }`}
                        >
                            {expired ? "Resend Code" : "Wait to resend"}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-xs text-background-light/50">
                    <p>Didn't receive the code? Check your spam folder or</p>
                    <p>contact support if the problem persists</p>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;




