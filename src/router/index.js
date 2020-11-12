import React from "react";
import Home from "../components/Home";
import AdminHome from "../components/admin/AdminHome";
import AdminLogin from "../components/admin/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Routes() {
  return (
    <Router>
      <Route path="/home" component={Home} />
      <Route path="/admin" component={AdminHome} />
      <Route path="/admin-login" component={AdminLogin} />
    </Router>
  );
}

export default Routes;
