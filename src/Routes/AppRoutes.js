import React from "react";
import AddAdmin from "../Components/Admin/AddAdmin/AddAdmin";
import ViewAdmin from "../Components/Admin/ViewAdmin/ViewAdmin";
import AddUser from "../Components/User/AddUser/AddUser";
import ViewUser from "../Components/User/ViewUser/ViewUser";
import ConsentForm from "../Components/ConsentForm/ConsentForm";
import AddQuestion from "../Components/Questionore/AddQuestion/AddQuestion";
import Login from "../Components/Auth/Login/Login";
import EnterEmailAddress from "../Components/ForgetPassword/EnterEmailAddress";
import ResetPassword from "../Components/ForgetPassword/ResetPassword";
import AddAnswer from "../Components/Answer/AddAnswer/AddAnswer";
import ViewQuestion from "../Components/Questionore/ViewQuestions/ViewQuestion";
import ViewAnswer from "../Components/Answer/ViewAnswer/ViewAnswer";
import Greetings from "../Components/Greetings/Greetings";
import Optout from "../Components/Optout/Optout";
import ConsentFormSpanish from "../Components/ConsentForm/ConsentFormSpanish";
import AddSpanishAnswer from "../Components/Answer/AddAnswer/AddSpanishAnswer";
import AddSpanishQuestion from "../Components/Questionore/AddQuestion/AddSpanishQuestion";
import ViewSpanishQuestion from "../Components/Questionore/ViewQuestions/ViewSpanishQuestion";
import ViewSpanishAnswer from "../Components/Answer/ViewAnswer/ViewSpanishAnswer";
import AnsGreetings from "../Components/Greetings/AnsGreetings";
import addRemoveFamilyMemeber from "../Components/addRemoveFamilyMemeber/addRemoveFamilyMemeber";

const AppRoutes = [
  {
    path: "/admin/add",
    component: AddAdmin,
    exact: true,
    name: "Admin",
  },
  {
    path: "/admin",
    component: ViewAdmin,
    exact: true,
    name: "private",
  },
  {
    path: "/user/add",
    component: AddUser,
    exact: true,
    name: "private",
  },
  {
    path: "/user",
    component: ViewUser,
    exact: true,
    name: "private",
  },
  {
    path: "/login",
    component: Login,
    exact: true,
    name: "public",
  },
  {
    path: "/password-reset",
    component: EnterEmailAddress,
    exact: true,
    name: "public",
  },
  {
    path: `/forgot-password/:adminId/:token`,
    component: ResetPassword,
    exact: true,
    name: "public",
  },
  {
    path: "/consentform",
    component: ConsentForm,
    exact: true,
    name: "public",
  },
  //   {
  //     path: "/consentform-spanish",
  //     component: ConsentFormSpanish,
  //     exact: true,
  //     name: "public",
  //   },
  {
    path: "/consentform/:userId/:firstName/:lastName/:email",
    component: ConsentForm,
    exact: true,
    name: "public",
  },
  //   {
  //     path: "/consentform-spanish/:userId/:firstName/:lastName/:email",
  //     component: ConsentFormSpanish,
  //     exact: true,
  //     name: "public",
  //   },
  {
    path: "/answer/add/:userId/:userName",
    component: AddAnswer,
    exact: true,
    name: "public",
  },
  // {
  //   path: "/answer/add",
  //   component: AddAnswer,
  //   exact: true,
  //   name: "public",
  // },
  // {
  //   path: "/answer-spanish/add",
  //   component: AddSpanishAnswer,
  //   exact: true,
  //   name: "public",
  // },
  //   {
  //     path: "/answer-spanish/add/:userId/:userName",
  //     component: AddSpanishAnswer,
  //     exact: true,
  //     name: "public",
  //   },
  {
    path: "/greeting",
    component: Greetings,
    exact: true,
    name: "public",
  },
  {
    path: "/ans/greeting",
    component: AnsGreetings,
    exact: true,
    name: "public",
  },
  {
    path: "/opt-out",
    component: Optout,
    exact: true,
    name: "public",
  },
  {
    path: "/question/add",
    component: AddQuestion,
    exact: true,
    name: "private",
  },
  //   {
  //     path: "/question-spanish/add",
  //     component: AddSpanishQuestion,
  //     exact: true,
  //     name: "private",
  //   },
  {
    path: "/question",
    component: ViewQuestion,
    exact: true,
    name: "private",
  },
  //   {
  //     path: "/question-spanish",
  //     component: ViewSpanishQuestion,
  //     exact: true,
  //     name: "private",
  //   },
  {
    path: "/answer",
    component: ViewAnswer,
    exact: true,
    name: "private",
  },
  {
    path: "/add-familymember/:id",
    component: addRemoveFamilyMemeber,
    exact: true,
    name: "public",
  },
  //   {
  //     path: "/answer-spanish",
  //     component: ViewSpanishAnswer,
  //     exact: true,
  //     name: "private",
  //   },
];

export default AppRoutes;
