import * as Yup from "yup";
import { minPassword, validations } from "../../../../../config/validation";

const label = {
  email: "Email",
  password: "Password",
};

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email(validations.email(label.email))
    .required(validations.required.text(label.email)),
  password: Yup.string()
    .required(validations.required.text(label.password))
    .min(minPassword, validations.min.text(label.password,minPassword)),
});
