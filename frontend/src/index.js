import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

// layouts

import Admin from "layouts/Admin";
import Auth from "layouts/Auth";
import Dashboard from "layouts/Dashboard";

// views without layouts

import About from "views/About";
import Blog from "views/Blog";
import Services from "views/Services";
import Index from "views/Index";
import Contact from "views/Contact";

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer />
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      {/* add routes without layouts */}
      <Route path="/about-us" exact component={About} />
      <Route path="/services" exact component={Services} />
      <Route path="/blogs" exact component={Blog} />
      <Route path="/contact-us" exact component={Contact} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
