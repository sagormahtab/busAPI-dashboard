import * as React from "react";
import { Route } from "react-router-dom";
import EditProfile from "./Layouts/EditProfile";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import SignupPage from "./Auth/SignupPage";
import Dashboard from "./Layouts/Dashboard";

const routes = [
  <Route exact path="/signup" component={SignupPage} noLayout />,
  <Route exact path="/my-profile" component={EditProfile} />,
  <Route exact path="/find-account" component={ForgotPassword} noLayout />,
  <Route
    exact
    path="/reset-password/:token"
    component={ResetPassword}
    noLayout
  />,
  <Route exact path="/dashboard" component={Dashboard} />,
];

export default routes;
