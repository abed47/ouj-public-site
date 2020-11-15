import React, { useState, useEffect } from "react";
import { MDBDataTable, MDBRow, MDBCol } from "mdbreact";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import axios from "axios";

//get firebase
import firebase from "../../../utils/firebase/index";

//react ui select
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";

import MultiImageInput from "react-multiple-image-input";
import AddItemModalContent from "./../components/AddItemModal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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

const ItemsPage = () => {
  const classes = useStyles();
  const fb = firebase.firestore();
  const fs = firebase.storage();
  const items = [];

  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [editItemModalOpen, setEditItemModalOpen] = useState(false);
  const [deleteItemModalOpen, setDeleteItemModalOpen] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);

  //hold item id for edit and data grab
  const [selectedItemId, setSelectedItemId] = useState("");

  const [tableData, setTableData] = useState([]);

  //add item constants
  const [itemImages, setItemImages] = useState({});
  const [itemDescription, setItemDescription] = useState(EditorState.createEmpty());
  const [itemMeasureUnit, setItemMeasureUnit] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);

  //edit item constants
  const [editItemImage, setEditItemImage] = useState({});
  const [editItemDescription, setEditItemDescription] = useState(EditorState.createEmpty());
  const [editItemMeasureUnit, setEditItemMeasureUnit] = useState("");
  const [editItemName, setEditItemName] = useState("");
  const [editItemPrice, setEditItemPrice] = useState("");

  //Snackbar states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");

  //loadData from firebase
  const loadData = () => {
    fb.collection("items")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          let d = doc.data();
          d.id = doc.id;
          items.push(d);
          data.rows.push({
            name: d.name,
            price: d.price,
            unit: d.unit,
            actions: (
              <>
                <Button variant="contained" color="primary" onClick={() => handleEditItemOpen(doc.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteItemOpen(doc.id)}>
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

  //edit item event handlers
  const handleEditItemOpen = async (id) => {
    setLoadingModalOpen(true);
    setSelectedItemId(id);
    let editItem = items.filter((el) => el.id == id)[0];
    if (editItem) {
      console.log(editItem);

      let url = await fs
        .ref()
        .child("/items/" + editItem.imageName + ".png")
        .getDownloadURL();

      axios
        .get(url, { responseType: "arraybuffer" })
        .then((res) => {
          setLoadingModalOpen(false);
          let imageBuffer = Buffer.from(res.data, "binary").toString("base64");
          setEditItemImage({ 0: "data:image/png;base64," + imageBuffer });
          setEditItemDescription(
            EditorState.createWithContent(convertFromRaw(JSON.parse(editItem.description)))
          );
          setEditItemName(editItem.name);
          setEditItemPrice(editItem.price);
          setEditItemMeasureUnit(editItem.unit);
          setEditItemModalOpen(true);
        })
        .catch((err) => {
          setLoadingModalOpen(false);
          handleResponseAlert("error happened", "error");
        });
    }
  };

  const handleEditNameChange = (e) => {
    setEditItemName(e.target.value);
  };

  const handleEditPriceChange = (e) => {
    setEditItemPrice(e.target.value);
  };

  const handleEditUnitChange = (e) => {
    setEditItemMeasureUnit(e.target.value);
  };

  const handleUpdateItem = () => {
    let description = JSON.stringify(convertToRaw(editItemDescription.getCurrentContent()));
    let name = editItemName;
    let price = editItemPrice;
    let image = editItemImage[0];
    let unit = editItemMeasureUnit;
    let imageName = generateImageName();

    fs.ref()
      .child(`/items/${imageName}.png`)
      .putString(image, "data_url")
      .then((res) => {
        if (res.state == "success") {
          fb.collection("items")
            .doc(selectedItemId)
            .update({
              name,
              price,
              imageName,
              unit,
              description,
            })
            .then((res) => {
              handleResponseAlert("item updated successfully !", "success");
              setEditItemModalOpen(false);
              loadData();
            })
            .catch((err) => {
              handleResponseAlert("item update failed !", "error");
              setEditItemModalOpen(false);
            });
        }
      })
      .catch((err) => {
        handleResponseAlert("item update failed !", "error");
        setEditItemModalOpen(false);
      });
  };

  const handleEditItemClose = () => {
    setEditItemImage({});
    setEditItemDescription(EditorState.createEmpty());
    setEditItemMeasureUnit("");
    setEditItemName("");
    setEditItemPrice(0);
    setEditItemModalOpen(false);
  };

  //delete item event handlers
  const handleDeleteItemOpen = (id) => {
    setSelectedItemId(id);
    setDeleteItemModalOpen(true);
  };

  const handleDeleteItemConfirm = () => {
    fb.collection("items")
      .doc(selectedItemId)
      .delete()
      .then((res) => {
        loadData();
        handleDeleteItemClose();
        handleResponseAlert("Item Deleted successfully!", "success");
      })
      .catch((err) => {
        handleDeleteItemClose();
        handleResponseAlert("Item Delete failed!", "error");
      });
  };

  const handleDeleteItemClose = () => {
    setSelectedItemId("");
    setDeleteItemModalOpen(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddItemClose = () => {
    setItemImages({});
    setItemDescription(EditorState.createEmpty());
    setItemMeasureUnit("");
    setItemName("");
    setItemPrice(0);
    setAddItemModalOpen(false);
  };

  const handleAddItemOpen = () => {
    setAddItemModalOpen(true);
  };

  const handleMeasureUnitChange = (e) => {
    setItemMeasureUnit(e.target.value);
  };

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleItemPriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  const handleResponseAlert = (msg, type) => {
    setAlertMessage(msg);
    setAlertType(type);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleCreateItem = () => {
    let description = JSON.stringify(convertToRaw(itemDescription.getCurrentContent()));
    let name = itemName;
    let price = itemPrice;
    let image = itemImages[0];
    let unit = itemMeasureUnit;
    let imageName = generateImageName();

    fs.ref()
      .child(`/items/${imageName}.png`)
      .putString(image, "data_url")
      .then((res) => {
        if (res.state == "success") {
          fb.collection("items")
            .add({
              name,
              price,
              imageName,
              unit,
              description,
            })
            .then((res) => {
              handleResponseAlert("item created successfully!", "success");
              handleAddItemClose();
              loadData();
            })
            .catch((err) => {
              handleResponseAlert("item creation failed !", "error");
              handleAddItemClose();
            });
        }
      })
      .catch((err) => {
        handleResponseAlert("item creation failed !", "error");
        handleAddItemClose();
      });
  };

  const generateImageName = () => {
    return Date.now() + "ouj";
  };

  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 270,
      },
      {
        label: "Unit",
        field: "unit",
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
          <MatButton variant="contained" color="primary" onClick={handleAddItemOpen}>
            <AddIcon className="mx-1" /> Add Item
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

      <Dialog open={addItemModalOpen} onClose={handleAddItemClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
        <DialogContent>
          <div className="horizontal-form">
            <TextField
              value={itemName}
              onChange={handleItemNameChange}
              autoFocus
              margin="dense"
              id="name"
              label="Item Name"
              type="text"
              fullWidth
            />
            <TextField
              value={itemPrice}
              onChange={handleItemPriceChange}
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={itemMeasureUnit}
                onChange={handleMeasureUnitChange}
              >
                <MenuItem value={"Kg"}>Kg</MenuItem>
                <MenuItem value={"Pcs"}>Pcs</MenuItem>
              </Select>
            </FormControl>

            <MultiImageInput
              images={itemImages}
              setImages={setItemImages}
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
                placeholder="Item description..."
                editorState={itemDescription}
                onEditorStateChange={setItemDescription}
              />
            </Paper>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddItemClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateItem} color="primary">
            Save Item
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editItemModalOpen} onClose={handleEditItemClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
        <DialogContent>
          <div className="horizontal-form">
            <TextField
              value={editItemName}
              onChange={handleEditNameChange}
              autoFocus
              margin="dense"
              id="name"
              label="Item Name"
              type="text"
              fullWidth
            />
            <TextField
              value={editItemPrice}
              onChange={handleEditPriceChange}
              margin="dense"
              id="price"
              label="Price"
              type="number"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Unit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editItemMeasureUnit}
                onChange={handleEditUnitChange}
              >
                <MenuItem value={"Kg"}>Kg</MenuItem>
                <MenuItem value={"Pcs"}>Pcs</MenuItem>
              </Select>
            </FormControl>

            <MultiImageInput
              images={editItemImage}
              setImages={setEditItemImage}
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
                placeholder="Item description..."
                editorState={editItemDescription}
                onEditorStateChange={setEditItemDescription}
              />
            </Paper>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditItemClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateItem} color="primary">
            Save Item
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteItemModalOpen} onClose={handleDeleteItemClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Item</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteItemClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteItemConfirm} color="warning">
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

export default ItemsPage;
