import Home from "../components/Home";
import admin from "../components/admin/index";
import AdminLogin from "../components/admin/login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Routes() {
  return (
    <Router>
      <Route path="/home" component={Home} />
      <Route path="/admin" component={admin} />
      <Route path="/admin-login" component={AdminLogin} />
    </Router>
  );
}

export default Routes;
