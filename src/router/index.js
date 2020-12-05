import React, { Suspense, lazy } from "react";

import AdminHome from "../components/admin/AdminHome";
import { BrowserRouter as Router, Route } from "react-router-dom";
import InformationContextProvider from "../components/context/InformationContext";
import LoadingPage from "../components/UI/LoadingPage";

const Home = lazy(() => import("../components/Home"));
const ContactUs = lazy(() => import("../components/ContactUs"));
const ProductsPage = lazy(() => import("../components/ProductsPage"));
const AdminLogin = lazy(() => import("../components/admin/login"));
const ProtectedAdminRoute = lazy(() => import("./AdminProtectedRoute"));

function Routes() {
  return (
    <Router>
      <Suspense fallback={LoadingPage}>
        <InformationContextProvider>
          <Route path="/contact-us" exact={true} component={ContactUs} />
          <Route path="/products" exact={true} component={ProductsPage} />
          <Route path="/admin-login" exact={true} component={AdminLogin} />
          <Route path="/" exact={true} component={Home} />
          <ProtectedAdminRoute path="/admin" component={AdminHome} />
        </InformationContextProvider>
      </Suspense>
    </Router>
  );
}

export default Routes;
