import React, { useState, useEffect } from "react";
import { MDBDataTable, MDBRow, MDBCol } from "mdbreact";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import axios from "axios";
import moment from "moment";
//get firebase
import firebase from "../../../utils/firebase/index";

//react ui select
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

import MultiImageInput from "react-multiple-image-input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MatButton from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";
import Snackbar from "@material-ui/core/Snackbar";

//css files
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../../assets/styles/Admin.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const OffersPage = () => {
  const classes = useStyles();
  const fb = firebase.firestore();
  const fs = firebase.storage();
  const items = [];

  const [addOfferModalOpen, setAddOfferModalOpen] = useState(false);
  const [editOfferModalOpen, setEditOfferModalOpen] = useState(false);
  const [deleteOfferModalOpen, setDeleteOfferModalOpen] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);

  //hold offer id for edit and data grab
  const [selectedOfferId, setSelectedOfferId] = useState("");

  const [tableData, setTableData] = useState([]);

  //add offer constants
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDate, setOfferDate] = useState("");
  const [offerActive, setOfferActive] = useState("");
  const [offerImage, setOfferImage] = useState({});
  const [offerShortDescription, setOfferShortDescription] = useState("");
  const [offerDescription, setOfferDescription] = useState(EditorState.createEmpty());

  //edit offer constants
  const [editOfferTitle, setEditOfferTitle] = useState("");
  const [editOfferDate, setEditOfferDate] = useState("");
  const [editOfferActive, setEditOfferActive] = useState("");
  const [editOfferImage, setEditOfferImage] = useState({});
  const [editOfferShortDescription, setEditOfferShortDescription] = useState("");
  const [editOfferDescription, setEditOfferDescription] = useState(EditorState.createEmpty());

  //Snackbar states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");

  //loadData from firebase
  const loadData = () => {
    fb.collection("offers")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          let d = doc.data();
          d.id = doc.id;
          items.push(d);
          data.rows.push({
            title: d.title,
            date: d.date,
            active: d.active,
            actions: (
              <>
                <Button variant="contained" color="primary" onClick={() => handleEditOfferOpen(doc.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteOfferOpen(doc.id)}>
                  Delete
                </Button>
              </>
            ),
          });
        });

        setTableData(data);
      })
      .catch((err) => {
        handleResponseAlert("load data failed, reload page", "error");
      });
  };

  //edit Offer event handlers
  const handleEditOfferOpen = async (id) => {
    setLoadingModalOpen(true);
    setSelectedOfferId(id);
    let editOffer = items.filter((el) => el.id == id)[0];
    if (editOffer) {
      console.log(editOffer);

      let url = await fs
        .ref()
        .child("/offers/" + editOffer.imageName + ".png")
        .getDownloadURL();

      axios
        .get(url, { responseType: "arraybuffer" })
        .then((res) => {
          setLoadingModalOpen(false);
          let imageBuffer = Buffer.from(res.data, "binary").toString("base64");
          setEditOfferImage({ 0: "data:image/png;base64," + imageBuffer });
          setEditOfferDescription(
            EditorState.createWithContent(convertFromRaw(JSON.parse(editOffer.description)))
          );
          setEditOfferTitle(editOffer.title);
          setEditOfferShortDescription(editOffer.shortDescription);
          setEditOfferDate(editOffer.date);
          setEditOfferActive(editOffer.active);
          setEditOfferModalOpen(true);
        })
        .catch((err) => {
          setLoadingModalOpen(false);
          handleResponseAlert("error happened", "error");
        });
    }
  };

  const handleUpdateOffer = () => {
    let description = JSON.stringify(convertToRaw(editOfferDescription.getCurrentContent()));
    let title = editOfferTitle;
    let date = editOfferDate;
    let image = editOfferImage[0];
    let active = editOfferActive;
    let shortDescription = editOfferShortDescription;
    let imageName = generateImageName();

    fs.ref()
      .child(`/offers/${imageName}.png`)
      .putString(image, "data_url")
      .then((res) => {
        if (res.state == "success") {
          fb.collection("offers")
            .doc(selectedOfferId)
            .update({
              title,
              date,
              imageName,
              active,
              description,
              shortDescription,
            })
            .then((res) => {
              handleResponseAlert("offer updated successfully !", "success");
              setEditOfferModalOpen(false);
              loadData();
            })
            .catch((err) => {
              handleResponseAlert("offer update failed !", "error");
              setEditOfferModalOpen(false);
            });
        }
      })
      .catch((err) => {
        handleResponseAlert("offer update failed !", "error");
        setEditOfferModalOpen(false);
      });
  };

  const handleEditOfferClose = () => {
    setEditOfferActive("false");
    setEditOfferDate("");
    setEditOfferDescription(EditorState.createEmpty());
    setEditOfferShortDescription("");
    setEditOfferTitle("");
    setEditOfferImage({});
    setSelectedOfferId("");
    setEditOfferModalOpen(false);
  };

  //delete Offer event handlers
  const handleDeleteOfferOpen = (id) => {
    setSelectedOfferId(id);
    setDeleteOfferModalOpen(true);
  };

  const handleDeleteOfferConfirm = () => {
    fb.collection("offers")
      .doc(selectedOfferId)
      .delete()
      .then((res) => {
        loadData();
        handleDeleteOfferClose();
        handleResponseAlert("Offer Deleted successfully!", "success");
      })
      .catch((err) => {
        handleDeleteOfferClose();
        handleResponseAlert("Offer Delete failed!", "error");
      });
  };

  const handleDeleteOfferClose = () => {
    setSelectedOfferId("");
    setDeleteOfferModalOpen(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddOfferClose = () => {
    setOfferActive("false");
    setOfferDate("");
    setOfferDescription(EditorState.createEmpty());
    setOfferShortDescription("");
    setOfferTitle("");
    setOfferImage({});
    setAddOfferModalOpen(false);
  };

  const handleResponseAlert = (msg, type) => {
    setAlertMessage(msg);
    setAlertType(type);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleCreateOffer = () => {
    let description = JSON.stringify(convertToRaw(offerDescription.getCurrentContent()));
    let title = offerTitle;
    let shortDescription = offerShortDescription;
    let date = offerDate;
    let image = offerImage[0];
    let active = offerActive;
    let imageName = generateImageName();

    fs.ref()
      .child(`/offers/${imageName}.png`)
      .putString(image, "data_url")
      .then((res) => {
        if (res.state == "success") {
          fb.collection("offers")
            .add({
              title,
              description,
              shortDescription,
              date,
              active,
              imageName,
            })
            .then((res) => {
              handleResponseAlert("offer created successfully!", "success");
              handleAddOfferClose();
              loadData();
            })
            .catch((err) => {
              handleResponseAlert("offer creation failed !", "error");
              handleAddOfferClose();
            });
        }
      })
      .catch((err) => {
        handleResponseAlert("offer creation failed !", "error");
        handleAddOfferClose();
      });
  };

  const generateImageName = () => {
    return Date.now() + "ouj";
  };

  const data = {
    columns: [
      {
        label: "Title",
        field: "title",
        sort: "asc",
        width: 150,
      },
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 270,
      },
      {
        label: "Active",
        field: "active",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  };

  return (
    <>
      <MDBRow around className="my-3">
        <MDBCol size="3" className="p-0"></MDBCol>
        <MDBCol size="3" className="p-0 text-right">
          <MatButton variant="contained" color="primary" onClick={() => setAddOfferModalOpen(true)}>
            <AddIcon className="mx-1" /> Add Offer
          </MatButton>
        </MDBCol>
      </MDBRow>
      <MDBRow center={true} className="">
        <MDBCol size="10">
          <Paper className="p-3">
            <MDBDataTable striped bordered small data={tableData} />
          </Paper>
        </MDBCol>
      </MDBRow>

      <Dialog open={addOfferModalOpen} onClose={handleAddOfferClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Offer</DialogTitle>
        <DialogContent>
          <div className="horizontal-form">
            <TextField
              value={offerTitle}
              onChange={(e) => setOfferTitle(e.target.value)}
              autoFocus
              margin="dense"
              id="name"
              label="Offer Title"
              type="text"
              fullWidth
            />

            <TextField
              value={offerShortDescription}
              onChange={(e) => setOfferShortDescription(e.target.value)}
              margin="dense"
              id="shortDescription"
              label="Short Description"
              type="text"
              fullWidth
            />
            <TextField
              id="date"
              label="Offer Date"
              type="date"
              onChange={(e) => setOfferDate(e.target.value)}
              defaultValue={moment().format("YYYY-MM-DD")}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Active</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={offerActive}
                onChange={(e) => setOfferActive(e.target.value)}
              >
                <MenuItem value={"true"}>yes</MenuItem>
                <MenuItem value={"false"}>no</MenuItem>
              </Select>
            </FormControl>

            <MultiImageInput
              images={offerImage}
              setImages={setOfferImage}
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

            <Paper className="p-2">
              <Editor
                placeholder="offer description..."
                editorState={offerDescription}
                onEditorStateChange={setOfferDescription}
              />
            </Paper>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddOfferClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateOffer} color="primary">
            Save Offer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOfferModalOpen} onClose={handleEditOfferClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Offer</DialogTitle>
        <DialogContent>
          <div className="horizontal-form">
            <TextField
              value={editOfferTitle}
              onChange={(e) => setEditOfferTitle(e.target.value)}
              autoFocus
              margin="dense"
              id="title"
              label="Offer Title"
              type="text"
              fullWidth
            />
            <TextField
              value={editOfferShortDescription}
              onChange={(e) => setEditOfferShortDescription(e.target.value)}
              margin="dense"
              id="price"
              label="Short Description"
              type="short description"
              fullWidth
            />

            <TextField
              id="date"
              label="Offer Date"
              type="date"
              onChange={(e) => setEditOfferDate(e.target.value)}
              defaultValue={moment(editOfferDate).format("YYYY-MM-DD")}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editOfferActive}
                onChange={(e) => setEditOfferActive(e.target.value)}
              >
                <MenuItem value={"true"}>yes</MenuItem>
                <MenuItem value={"false"}>no</MenuItem>
              </Select>
            </FormControl>

            <MultiImageInput
              images={editOfferImage}
              setImages={setEditOfferImage}
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

            <Paper className="p-2">
              <Editor
                placeholder="Offer description..."
                editorState={editOfferDescription}
                onEditorStateChange={setEditOfferDescription}
              />
            </Paper>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditOfferClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateOffer} color="primary">
            Save Offer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteOfferModalOpen}
        onClose={handleDeleteOfferClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Offer</DialogTitle>
        <DialogContent>Are you sure you want to delete this Offer?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteOfferClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteOfferConfirm} color="warning">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={loadingModalOpen} onClose={() => setLoadingModalOpen(false)} className="bg-none">
        <div className="p-5 bg-none">
          <CircularProgress />
        </div>
      </Dialog>
      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OffersPage;
