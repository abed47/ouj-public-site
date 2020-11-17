import React from "react";
import { useState, useEffect } from "react";
import InfoPage from "./pages/InformationPage";
import ItemsPage from "./pages/ItemsPage";
import OffersPage from "./pages/OffersPage";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

import Storage from "../../utils/storage";

import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import icons from "../UI/Icons";

import LoadingPage from "../UI/LoadingPage";

import { useAuth } from "../context/AuthContext";

import { useHistory } from "react-router-dom";
import { Router, Switch, Route, Link } from "react-router-dom";

const { MailIcon, DiscountIcon, LogOutIcon, AddBox, InfoIcon } = icons();

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Admin = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const { currentUser, setCurrentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if ("type" in currentUser) {
      setLoading(false);
    } else {
      history.push("/admin-login");
    }
  }, []);
  const handleLogout = () => {
    Storage.flush();
    setCurrentUser({});
    history.push("/admin-login");
  };

  return (
    <div className={classes.root}>
      {loading ? <LoadingPage /> : ""}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            OUJ
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to="/admin/items">
              <ListItem button>
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary="Items" />
              </ListItem>
            </Link>

            <Link to="/admin/offers">
              <ListItem button>
                <ListItemIcon>
                  <DiscountIcon />
                </ListItemIcon>
                <ListItemText primary="Offers" />
              </ListItem>
            </Link>

            <Link to="/admin/info">
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Site information" />
              </ListItem>
            </Link>

            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogOutIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />

        <Switch>
          <Route
            exact={true}
            path="/admin"
            component={() => {
              return <h1>Home</h1>;
            }}
          />
          <Route exact={true} path="/admin/items" component={ItemsPage} />
          <Route exact={true} path="/admin/offers" component={OffersPage} />
          <Route exact={true} path="/admin/info" component={InfoPage} />
        </Switch>
      </main>
    </div>
  );
};

export default Admin;
