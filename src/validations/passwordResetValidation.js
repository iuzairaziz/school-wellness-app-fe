import { yupToFormErrors } from "formik";
import * as Yup from "yup";

class PasswordResetValidation {
  passwordReset = () => {
    return Yup.object({
      email: Yup.string()
        .email("Enter A Valid Email Address")
        .required("Required!"),
    });
  };

  confirmPasswordValidation = () => {
    return Yup.object({
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const passwordResetValidation = new PasswordResetValidation();
export default passwordResetValidation;
