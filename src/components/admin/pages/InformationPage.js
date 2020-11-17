import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import firebase from "../../../utils/firebase/index";
import MultiImageInput from "react-multiple-image-input";

import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

//bootstrap item
import { MDBContainer, MDBRow, MDBCard, MDBCol, MDBEdgeHeader } from "mdbreact";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const InfoPage = (props) => {
  const [docId, setDocId] = useState("");
  const [bannerImages, setBannerImages] = useState({});
  //alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("sdfaf");
  const [alertType, setAlertType] = useState("success");
  const [aboutUsDescription, setAboutUsDescription] = useState(EditorState.createEmpty());
  const [email, setEmail] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [caption1, setCaption1] = useState("");
  const [caption2, setCaption2] = useState("");
  const [caption3, setCaption3] = useState("");

  let fb = firebase.firestore();
  let fs = firebase.storage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let arr = [];

    await fb
      .collection("info")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          arr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
      });

    fillData(arr);
  };

  const fillData = (data) => {
    let bannerInfo = {};
    let contactInfo = {};
    let generalInfo = {};

    data.forEach((el) => {
      if (el.id == "banner") {
        let d = el.data;
      }

      if (el.id == "contact") {
        let d = el.data;
        setTwitter(d.twitter);
        setFacebook(d.facebook);
        setInstagram(d.instagram);
        setCity(d.city);
        setStreet(d.street);
        setAddress(d.address);
        setEmail(d.email);
        setPhone1(d.phone1);
        setPhone2(d.phone2);
      }

      if (el.id == "general") {
      }
    });
  };

  const onDataUpdate = () => {
    fb.collection("info")
      .doc("contact")
      .update({
        phone1,
        phone2,
        email,
        address,
        instagram,
        facebook,
        twitter,
        street,
        city,
      })
      .then((res) => {
        createAlert("success", "data updated successfully");
      })
      .catch((err) => {
        createAlert("error", "update failed please try again later!");
      });
  };

  const createAlert = (type, msg) => {
    setAlertType(type);
    setAlertMessage(msg);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const saveChanges = () => {};
  return (
    <>
      <MDBRow>
        <MDBCol size="12">
          <MDBCol size="3" className="p-0">
            <strong className="p-0">Banner Images</strong>
          </MDBCol>
          <MultiImageInput
            images={bannerImages}
            setImages={setBannerImages}
            cropConfig={{
              crop: {
                unit: "%",
                aspect: 1 / 1,
                width: "100",
              },
              ruleOfThirds: true,
            }}
            max={1}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="justify-content-around">
        <MDBCol size="12">
          <strong>Contact Information</strong>
        </MDBCol>
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="email"
            fullWidth
          />
        </MDBCol>
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={phone1}
            onChange={(e) => setPhone1(e.target.value)}
            label="phone"
            fullWidth
          />
        </MDBCol>
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
            label="phone 2"
            fullWidth
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-around my-4">
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            label="address"
            fullWidth
          />
        </MDBCol>
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            label="city"
            fullWidth
          />
        </MDBCol>
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            label="street"
            fullWidth
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="justify-content-around my-4">
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            label="Instagram"
            fullWidth
          />
        </MDBCol>
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            label="Facebook"
            fullWidth
          />
        </MDBCol>
        <MDBCol size="3">
          <TextField
            variant="standard"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            label="Twitter"
            fullWidth
          />
        </MDBCol>
      </MDBRow>

      <MDBRow className="my-3">
        <MDBCol size="12">
          <Paper className="p-2">
            <Editor onEditorStateChange={setAboutUsDescription} placeholder="About Us Description"></Editor>
          </Paper>
        </MDBCol>
      </MDBRow>

      <MDBRow className="my-3 text-right">
        <MDBCol>
          <Button variant="contained" color="primary" onClick={onDataUpdate}>
            Update
          </Button>
        </MDBCol>
      </MDBRow>

      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default InfoPage;
