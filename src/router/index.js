import React from "react";
import Home from "../components/Home";
import AdminHome from "../components/admin/AdminHome";
import AdminLogin from "../components/admin/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedAdminRoute from "./AdminProtectedRoute";
function Routes() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home} />
      <ProtectedAdminRoute path="/admin" component={AdminHome} />
      <Route path="/admin-login" component={AdminLogin} />
    </Router>
  );
}

export default Routes;
