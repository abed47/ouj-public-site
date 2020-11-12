import React from "react";
import { useState, useEffect } from "react";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import LoadingPage from "../UI/LoadingPage";

import { useAuth } from "../context/AuthContext";

import { useHistory } from "react-router-dom";

const Admin = (props) => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if ("type" in currentUser) {
      setLoading(false);
    } else {
      history.push("/admin-login");
    }
  }, []);

  return (
    <div className="d-flex">
      {loading ? <LoadingPage /> : ""}
      hello world
    </div>
  );
};

export default Admin;
