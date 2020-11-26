import React from "react";
import Home from "../components/Home";
import ContactUs from "../components/ContactUs";
import ProductsPage from "../components/ProductsPage";
import AdminHome from "../components/admin/AdminHome";
import AdminLogin from "../components/admin/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedAdminRoute from "./AdminProtectedRoute";
function Routes() {
  return (
    <Router>
      <Route path="/" exact={true} component={Home} />
      <Route path="/contact-us" exact={true} component={ContactUs} />
      <Route path="/products" exact={true} component={ProductsPage} />
      <ProtectedAdminRoute path="/admin" component={AdminHome} />
      <Route path="/admin-login" component={AdminLogin} />
    </Router>
  );
}

export default Routes;
