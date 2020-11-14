import React from "react";
import { useState, useRef, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import { fireStore } from "../../utils/firebase/index";
import storage from "./../../utils/storage";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import LoadingPage from "../UI/LoadingPage";

import logo from "../../assets/images/logo.jpg";
import "../../assets/styles/Admin.scss";

function Alert(props, type) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AdminLogin() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const { currentUser, setCurrentUser, abed } = useAuth();

  useEffect(() => {
    if (currentUser && "type" in currentUser) {
      history.push("/admin");
    }
    setLoading(false);
  }, []);

  function login() {
    fireStore
      .collection("users")
      .where("name", "==", username)
      .where("password", "==", password)
      .get()
      .then((res) => {
        if (res.docs.length) {
          let doc = res.docs[0].data();
          setCurrentUser(doc);
          storage.storeNew("user", JSON.stringify(doc));
          openAlert(true);
          history.push("/admin");
          return;
        }

        openAlert(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const openAlert = (type) => {
    if (type) {
      setSuccess(true);
      setMessage("Login Success");
      setOpen(true);
      return;
    }

    setSuccess(false);
    setMessage("Username Or Password Wrong");
    setOpen(true);
  };

  return (
    <MDBRow center={true} className="h-100">
      <MDBCol size="auto" className="d-flex justify-content-center align-items-center">
        {loading ? <LoadingPage /> : null}
        <div className="login-container">
          <img className="logo" src={logo} />

          <TextField
            id="standard-basic"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
          />

          <TextField
            id="standard-basic"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />

          <Button variant="contained" color="primary" onClick={login}>
            Login
          </Button>

          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={success ? "success" : "error"}>
              {message}
            </Alert>
          </Snackbar>
        </div>
      </MDBCol>
    </MDBRow>
  );
}
