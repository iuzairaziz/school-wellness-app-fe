import { yupToFormErrors } from "formik";
import * as Yup from "yup";

class UserValidation {
  newUserValidation = () => {
    return Yup.object({
      firstName: Yup.string().required("Required!").min(2).max(100),
      lastName: Yup.string().required("Required!").min(2).max(100),
      email: Yup.string()
        .email("User Name Must be A Valid Email Address")
        .required("Required!"),
      recieveEmail: Yup.boolean().required("Required!"),
    });
  };

  newUserbyAdminValidation = () => {
    return Yup.object({
      firstName: Yup.string().required("Required!").min(2).max(100),
      lastName: Yup.string().required("Required!").min(2).max(100),
      email: Yup.string()
        .email("User Name Must be A Valid Email Address")
        .required("Required!"),
    });
  };

  handleError(error) {
    console.log(error.message);
  }
}
const userValidation = new UserValidation();
export default userValidation;
