import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Listings from "./List";
import Form from "./Form";
import Nav from "./Nav";
import Profile from "./Profile";

import { Link } from 'react-router-dom'

import { syncState, getName, getNameSuccess } from "../actions/index";
import store from "../store/index"

import '../../scss/index.scss'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Drawer from '@material-ui/core/Drawer';
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

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';


const drawerWidth = 240;

import { connect } from "react-redux";
const styles = theme => ({
    appFrame: {
          height: 430,
          zIndex: 1,
          position: 'relative',
          display: 'flex',
          width: '100%',
        },
    root: {
          flexGrow: 1,
          height: 430,
          zIndex: 1,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
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
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      minWidth: 0, // So the Typography noWrap works
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
		this.state= {
			auth: true,
			anchorEl: null,
		};
    this.handleChange = this.handleChange.bind(this);
    this.handleClose  = this.handleClose.bind(this);
    this.handleMenu   = this.handleMenu.bind(this);
  }

  handleChange(event, checked) {
    this.setState({ auth: checked });
  };

  handleMenu( event ) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose () {
    this.setState({ anchorEl: null });
  };

  render() {
   const { classes } = this.props;
   const { auth, anchorEl } = this.state;
   const open = Boolean(anchorEl);
   return (
     <div>
        <Router>
          <div className={classes.appFrame}>
            <AppBar position="absolute">
              <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                  Title
                </Typography>
                {auth && (
                  <div>
                    <IconButton
                      aria-owns={open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
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
                  <Link to="/app/list">
                    <ListItem button>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Listings" />
                    </ListItem>
                    </Link>
                  <Link to="/app/form">
                    <ListItem button>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Listing" />
                    </ListItem>
                  </Link>
                  <Link to="/app/profile">
                    <ListItem button>
                      <ListItemIcon>
                        <StarIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" secondary="hmm" />
                    </ListItem>
                  </Link>
                </div>
              </List>
            </Drawer>
            <main className={classes.content}>
              <Route path="/app/profile" component={Profile} />
              <Route path="/app/list" component={Listings} />
              <Route path="/app/form" component={Form} />
            </main>
          </div>
         </Router>
     </div>
  );

  }
}

const _App = connect(mapStateToProps)(App);

//export default _App;
export default withStyles(styles)(_App);

