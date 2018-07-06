import React, { Component } from "react";
import Listings from "./List";
import Form from "./Form";
import Nav from "./Nav";
import Profile from "./Profile";

import { syncState, getName, getNameSuccess } from "../actions/index";
import store from "../store/index"

import '../../scss/index.scss'

import { BrowserRouter as Router, Route } from 'react-router-dom'


import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';

import { connect } from "react-redux";


const drawerWidth = 240;

const styles = theme => ({
    root: {
          flexGrow: 1,
        },
    appFrame: {
          height: 430,
          zIndex: 1,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          width: '100%',
        },
    appBar: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
    'appBar-left': {
          marginLeft: drawerWidth,
        },
    'appBar-right': {
          marginRight: drawerWidth,
        },
    drawerPaper: {
          position: 'relative',
          width: drawerWidth,
        },
    toolbar: theme.mixins.toolbar,
    content: {
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing.unit * 3,
        },
});


const mapStateToProps = state => {
  console.log("inside app mapping", state);
  return { user: state.user };
};

class App extends Component {
  constructor() {
    super();
    
    const previousState = JSON.parse(localStorage.getItem('market4store')); 
    console.log("constructing APP");

    if( previousState ) {
      store.dispatch({type: 'SYNC_STATE', payload: previousState})
    } 
  }

  render() {
   const { classes } = this.props;
   return (
     <div className="container">
        <Router>
          <div>
            <Nav/>
            <div className="col-md-4 offset-md-1">
              <Route path="/app/profile" component={Profile} />
              <Route path="/app/list" component={Listings} />
              <Route path="/app/form" component={Form} />
            </div>
            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              anchor="left"
            >
              <div className={classes.toolbar} />
              <List>
                <div>
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Listings" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Listing" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItem>
                </div>

              </List>
            </Drawer>
          </div>
         </Router>
     </div>
  );

  }
}

const _App = connect(mapStateToProps)(App);

//export default _App;
export default withStyles(styles)(_App);

