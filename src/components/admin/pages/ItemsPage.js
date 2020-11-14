import React, { useState, useEffect } from "react";
import { MDBDataTable, MDBRow, MDBCol } from "mdbreact";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

//react ui select
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import MultiImageInput from "react-multiple-image-input";
import AddItemModalContent from "./../components/AddItemModal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import MatButton from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/AddCircle";

//css files
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../../../assets/styles/Admin.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const ItemsPage = () => {
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);

  const [itemImages, setItemImages] = useState({});
  const [itemDescription, setItemDescription] = useState(EditorState.createEmpty());
  const [itemMeasureUnit, setItemMeasureUnit] = useState();

  const handleAddItemClose = () => {
    setAddItemModalOpen(false);
  };

  const handleAddItemOpen = () => {
    setAddItemModalOpen(true);
  };

  const handleCreateItem = () => {
    console.log(convertToRaw(itemDescription.getCurrentContent()));
    console.log(itemImages);
  };

  const handleMeasureUnitChange = (e) => {
    setItemMeasureUnit(e.target.value);
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
        label: "Position",
        field: "position",
        sort: "asc",
        width: 270,
      },
      {
        label: "Office",
        field: "office",
        sort: "asc",
        width: 200,
      },
      {
        label: "Age",
        field: "age",
        sort: "asc",
        width: 100,
      },
      {
        label: "Start date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Salary",
        field: "salary",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [
      {
        name: "Airi Satou",
        position: "Accountant",
        office: "Tokyo",
        age: "33",
        date: "2008/11/28",
        salary: "$162",
      },
      {
        name: "Brielle Williamson",
        position: "Integration Specialist",
        office: "New York",
        age: "61",
        date: "2012/12/02",
        salary: "$372",
      },
      {
        name: "Herrod Chandler",
        position: "Sales Assistant",
        office: "San Francisco",
        age: "59",
        date: "2012/08/06",
        salary: "$137",
      },
      {
        name: "Rhona Davidson",
        position: "Integration Specialist",
        office: "Tokyo",
        age: "55",
        date: "2010/10/14",
        salary: "$327",
      },
      {
        name: "Colleen Hurst",
        position: "Javascript Developer",
        office: "San Francisco",
        age: "39",
        date: "2009/09/15",
        salary: "$205",
      },
      {
        name: "Sonya Frost",
        position: "Software Engineer",
        office: "Edinburgh",
        age: "23",
        date: "2008/12/13",
        salary: "$103",
      },
      {
        name: "Jena Gaines",
        position: "Office Manager",
        office: "London",
        age: "30",
        date: "2008/12/19",
        salary: "$90",
      },
      {
        name: "Quinn Flynn",
        position: "Support Lead",
        office: "Edinburgh",
        age: "22",
        date: "2013/03/03",
        salary: "$342",
      },
      {
        name: "Charde Marshall",
        position: "Regional Director",
        office: "San Francisco",
        age: "36",
        date: "2008/10/16",
        salary: "$470",
      },
      {
        name: "Haley Kennedy",
        position: "Senior Marketing Designer",
        office: "London",
        age: "43",
        date: "2012/12/18",
        salary: "$313",
      },
      {
        name: "Tatyana Fitzpatrick",
        position: "Regional Director",
        office: "London",
        age: "19",
        date: "2010/03/17",
        salary: "$385",
      },
      {
        name: "Michael Silva",
        position: "Marketing Designer",
        office: "London",
        age: "66",
        date: "2012/11/27",
        salary: "$198",
      },
      {
        name: "Paul Byrd",
        position: "Chief Financial Officer (CFO)",
        office: "New York",
        age: "64",
        date: "2010/06/09",
        salary: "$725",
      },

      {
        name: "Jennifer Acosta",
        position: "Junior Javascript Developer",
        office: "Edinburgh",
        age: "43",
        date: "2013/02/01",
        salary: "$75",
      },
      {
        name: "Cara Stevens",
        position: "Sales Assistant",
        office: "New York",
        age: "46",
        date: "2011/12/06",
        salary: "$145",
      },
      {
        name: "Hermione Butler",
        position: "Regional Director",
        office: "London",
        age: "47",
        date: "2011/03/21",
        salary: "$356",
      },
      {
        name: "Lael Greer",
        position: "Systems Administrator",
        office: "London",
        age: "21",
        date: "2009/02/27",
        salary: "$103",
      },
      {
        name: "Jonas Alexander",
        position: "Developer",
        office: "San Francisco",
        age: "30",
        date: "2010/07/14",
        salary: "$86",
      },
      {
        name: "Shad Decker",
        position: "Regional Director",
        office: "Edinburgh",
        age: "51",
        date: "2008/11/13",
        salary: "$183",
      },
      {
        name: "Michael Bruce",
        position: "Javascript Developer",
        office: "Singapore",
        age: "29",
        date: "2011/06/27",
        salary: "$183",
      },
      {
        name: "Donna Snider",
        position: "Customer Support",
        office: "New York",
        age: "27",
        date: "2011/01/25",
        salary: "$112",
      },
    ],
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
            <MDBDataTable striped bordered small data={data} />
          </Paper>
        </MDBCol>
      </MDBRow>

      <Dialog open={addItemModalOpen} onClose={handleAddItemClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
        <DialogContent>
          <div className="horizontal-form">
            <TextField autoFocus margin="dense" id="name" label="Item Name" type="text" fullWidth />
            <TextField margin="dense" id="price" label="Price" type="number" fullWidth />
            <TextField margin="dense" id="name" label="Email Address" type="email" fullWidth />
            <TextField margin="dense" id="name" label="Email Address" type="email" fullWidth />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={itemMeasureUnit}
                onChange={handleMeasureUnitChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
    </>
  );
};

export default ItemsPage;
