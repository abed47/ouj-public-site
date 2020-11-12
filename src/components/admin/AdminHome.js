import React from "react";
import { useState, useEffect } from "react";

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

import icons from "../UI/Icons";

import LoadingPage from "../UI/LoadingPage";

import { useAuth } from "../context/AuthContext";

import { useHistory } from "react-router-dom";
import { Router, Switch, Route, Link } from "react-router-dom";

const { MailIcon, InboxIcon, LogOutIcon, AddBox, InfoIcon } = icons();

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
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if ("type" in currentUser) {
      setLoading(false);
    } else {
      history.push("/admin-login");
    }
  }, []);

  const handleLogout = () => {};

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

            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Site information" />
            </ListItem>
            <ListItem button>
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
          <Route
            exact={true}
            path="/admin/items"
            component={() => {
              return <h1>items</h1>;
            }}
          />
        </Switch>
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis
          convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
          sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
          quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris
          commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue
          eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi
          etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare
          suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum
          eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
          ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus
          orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et.
          Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
          ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
};

export default Admin;
