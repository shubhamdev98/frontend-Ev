import * as Yup from "yup";
import { validations } from "../../../../config/validation";


export const forgotPasswordValidation = Yup.object().shape({
    email: Yup.string()
        .trim()
        .required(validations.required.text("Email"))
        .email(validations.email("Email")),
})