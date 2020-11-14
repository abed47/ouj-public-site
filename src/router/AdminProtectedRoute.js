import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./../components/context/AuthContext";

const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if ("type" in auth.currentUser) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/admin-login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedAdminRoute;
