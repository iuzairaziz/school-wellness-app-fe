import { yupToFormErrors } from "formik";
import * as Yup from "yup";

class AdminValidation {
  newAdminValidation = () => {
    return Yup.object({
      firstName: Yup.string().required("Required!").min(2).max(100),
      lastName: Yup.string().required("Required!").min(2).max(100),
      email: Yup.string()
        .email("User Name Must be A Valid Email Address")
        .required("Required!"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    });
  };

  //   changePassword = () => {
  //     return Yup.object({
  //       oldPassword: Yup.string().required("Old Password is required"),
  //       password: Yup.string().required("Password is required"),
  //       confirmPassword: Yup.string().oneOf(
  //         [Yup.ref("password"), null],
  //         "Passwords must match"
  //       ),
  //     });
  //   };
  SignIn = () => {
    return Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
  };
  // loginSchemaValidation = () => {
  //   return Yup.object({
  //     username: Yup.string()
  //       .required("Required!")
  //       .min(6)
  //       .max(20),
  //     password: Yup.string().required("Required"),
  //   });
  // };

  handleError(error) {
    console.log(error.message);
  }
}
const adminValidation = new AdminValidation();
export default adminValidation;
