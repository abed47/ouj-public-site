import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import firebase from "../../../utils/firebase/index";
import MultiImageInput from "react-multiple-image-input";
import axios from "axios";

import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

//bootstrap item
import { MDBContainer, MDBRow, MDBCard, MDBCol, MDBEdgeHeader, MDBInput } from "mdbreact";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const InfoPage = (props) => {
  const crop = {
    unit: "%",
    width: "100",
    height: "100",
  };
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
        let count = el.data.count;
        if (count) {
          console.log(count);
          loadBannerImages(count);
        }
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
        let d = el.data;
        setCaption1(d.caption1);
        setCaption2(d.caption2);
        setCaption3(d.caption3);
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
        updateBanner();
      })
      .catch((err) => {
        createAlert("error", "update failed please try again later!");
      });
  };

  const updateBanner = () => {
    let imageList = [];
    for (let item in bannerImages) {
      imageList.push("banner" + item + ".png");
      fs.ref()
        .child(`/banners/banner${item}.png`)
        .putString(bannerImages[item], "data_url")
        .then((res) => {
          console.log("updated");
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fb.collection("info")
      .doc("banner")
      .update({
        count: imageList.length,
      })
      .then((res) => {
        updateGeneral();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateGeneral = () => {
    fb.collection("info")
      .doc("general")
      .update({ caption1, caption2, caption3 })
      .then((res) => {
        createAlert("success", "Data updated successfully");
      })
      .catch((err) => {
        createAlert("error", "Error occurred, try again");
      });
  };

  const loadBannerImages = async (count) => {
    let imageUrls = [];
    let imageDateUrls = {};
    for (let i = 0; i < count; i++) {
      await fs
        .ref()
        .child(`/banners/banner${i}.png`)
        .getDownloadURL()
        .then((res) => {
          imageUrls.push(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    imageUrls.forEach((el, index) => {
      axios
        .get(el, { responseType: "arraybuffer" })
        .then((res) => {
          let obj = bannerImages;
          let buff = Buffer.from(res.data, "binary").toString("base64");
          obj[index] = "data:image/png;base64," + buff;

          setBannerImages({ ...obj });
        })
        .catch((err) => {
          console.log(err);
        });
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
              crop,
            }}
            max={5}
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

      <MDBRow className="justify-content-around my-4">
        <MDBCol size="3">
          <MDBInput
            type="textarea"
            label="Footer Title"
            onChange={(e) => setCaption1(e.target.value)}
            value={caption1}
            rows="5"
          />
        </MDBCol>
        <MDBCol size="3">
          <MDBInput
            type="textarea"
            label="Caption 2"
            onChange={(e) => setCaption2(e.target.value)}
            value={caption2}
            rows="5"
          />
        </MDBCol>
        <MDBCol size="3">
          <MDBInput
            type="textarea"
            label="Captions 3"
            onChange={(e) => setCaption3(e.target.value)}
            value={caption3}
            rows="5"
          />
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
