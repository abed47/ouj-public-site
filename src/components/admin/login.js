import React from 'react';
import {useState, useRef} from "react";

import {fireStore} from '../../utils/firebase/index';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert  from "@material-ui/lab/Alert";

import logo from '../../assets/images/logo.jpg';
import '../../assets/styles/Admin.scss';

function Alert(props, type) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AdminLogin(){

    const [open, setOpen] = useState(true)
    const [success, setSuccess] = useState(true)
    const [message, setMessage] = useState("")

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function login(){
        fireStore.collection("users").where("name","==",username).where("password","==",password).get().then(res => {
            if(res.docs.length){
                openAlert(true)                
                return;
            }

            openAlert(false)
        }).catch(err => {
            console.log(err)
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const openAlert = (type) => {

        if(type){
            setSuccess(true);
            setMessage("Login Success")
            setOpen(true);
            return
        }

        setSuccess(false);
        setMessage("Username Or Password Wrong")
        setOpen(true);
    }

    return (
        <div className="container justify-content-center">
            <div className="login-container">
                <img className="logo" src={logo}/>

                <TextField id="standard-basic" value={username} onChange={e => setUsername(e.target.value)} label="Username" />

                <TextField id="standard-basic" value={password} onChange={e => setPassword(e.target.value)}label="Password" />

                <Button variant="contained" color="primary" onClick={login}>
                    Login
                </Button>

                <Snackbar open={open} autoHideDuration={3000}  onClose={handleClose}>
                    <Alert  onClose={handleClose} severity={success ? "success" : "error"}>
                        {message}
                    </Alert>
                </Snackbar>
            </div>


        </div>
    );
}
