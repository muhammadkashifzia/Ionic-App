import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import  SignIn  from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import OtpVerify from "../../pages/auth/OtpVerify.js";
import Success from "../../pages/auth/Success.js";
import ForgotPassword from "../../pages/auth/ForgotPassword.js";
import NewPassword from "../../pages/auth/NewPassword.js";
import { useOnboarding } from "../context/OnboardingContext";
import Onboarding1 from "../onboarding/Onboarding1";
import Onboarding2 from "../onboarding/Onboarding2";
import Onboarding3 from "../onboarding/Onboarding3";

import Tabs from "../Tabs";
import "../../theme/global.css";

const AppRoutes: React.FC = () => {
  const { isOnboarded } = useOnboarding();

  return (
    <IonReactRouter>
    {/* If onboarding is not completed, redirect to onboarding */}
    {isOnboarded && <Redirect exact from='/' to='/onboarding1' />}

    {/* Onboarding Routes */}
    <Route exact path='/onboarding1' component={Onboarding1} />
    <Route exact path='/onboarding2' component={Onboarding2} />
    <Route exact path='/onboarding3' component={Onboarding3} />
  

    {/* Authentication Routes */}
    <Route exact path='/signin' component={SignIn} />
    <Route exact path='/signup' component={SignUp} />
    <Route exact path='/otp-verify' component={OtpVerify} />
    <Route exact path='/success' component={Success} />
    <Route exact path='/forgot-password' component={ForgotPassword} />
    <Route exact path='/new-password' component={NewPassword} />


    {/* Protected Routes: Redirect to SignIn if not logged in */}
    <PrivateRoute path='/tabs' component={Tabs} />

    {/* Default Redirect */}
    {/* <Redirect exact from='/' to='/signup' /> */}
  </IonReactRouter>
  );
};

export default AppRoutes;


