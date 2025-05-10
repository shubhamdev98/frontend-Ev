import * as Yup from "yup";
import { minPassword, validations } from "../../../../../config/validation";

const label = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm password",
  companyName: "Company name",
};
export const registerValidation = Yup.object().shape({
  firstName: Yup.string()
    .trim()
    .required(validations.required.text(label.firstName)),

  lastName: Yup.string().when("role", {
    is: "user",
    then: () =>
      Yup.string().trim().required(validations.required.text(label.lastName)),
    otherwise: () => Yup.string().trim().notRequired(),
  }),

  email: Yup.string()
    .trim()
    .required(validations.required.text(label.email))
    .email(validations.email(label.email)),

  password: Yup.string()
    .required(validations.required.text(label.password))
    .min(minPassword, validations.min.text(label.password, minPassword)),

  confirmPassword: Yup.string()
    .required(validations.required.text(label.confirmPassword))
    .oneOf([Yup.ref("password")], "Passwords do not match"),

  companyName: Yup.string().when("role", {
    is: "company",
    then: () =>
      Yup.string()
        .trim()
        .required(validations.required.text(label.companyName)),
    otherwise: () => Yup.string().trim().notRequired(),
  }),

  role: Yup.string().oneOf(["user", "company"]).required(),
});
