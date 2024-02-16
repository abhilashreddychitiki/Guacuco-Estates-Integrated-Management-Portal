import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import ForgotPassword from "views/auth/ForgotPassword.js";
import EmailSent from "views/auth/EmailSent";
import ResetPassword from "views/auth/ResetPassword.js";
import PasswordChanged from "views/auth/PasswordChanged.js";
import VerifyEmail from "views/auth/VerifyEmail.js";

export default function Auth() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/verify-email/:id/:hash" exact component={VerifyEmail} />
            {token && role ? <Redirect to="/dashboard" /> : ''}
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path="/auth/forgot-password" exact component={ForgotPassword} />
            <Route path="/auth/email-sent" exact component={EmailSent} />
            <Route path="/auth/reset-password/:token" exact component={ResetPassword} />
            <Route path="/auth/password-changed" exact component={PasswordChanged} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
