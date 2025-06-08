
import * as Yup from "yup";
import { minPassword, validations } from "../../../../../config/validation";

const label = {
    password: "New Password",
    confirmPassword: "Confirm password",
};

export const ResetPasswordValidation = Yup.object().shape({
    new_password: Yup.string()
        .required(validations.required.text(label.password))
        .min(minPassword, validations.min.text(label.password, minPassword)),

    confirmPassword: Yup.string()
        .required(validations.required.text(label.confirmPassword))
        .oneOf([Yup.ref("new_password")], "Passwords do not match"),
})