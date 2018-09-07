import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Listings from "./List";
import Form,  {FormTitle} from "./Form";
import Nav from "./Nav";
import ImagePreview from "./ImagePreview";
import Profile from "./Profile";
import Login from "./Login";

import classNames from 'classnames'

import { Link } from 'react-router-dom'

import { syncState, getName, getNameSuccess, submitLogout } from "../actions/index";
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
          height: '100%',
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
      height: '100%',
    },
});





const mapDispatchToProps = dispatch => {
  return {
    submitLogout: () => dispatch(submitLogout()),
  };
};

const mapStateToProps = state => {
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
			anchorEl: null,
		};
    this.handleClose  = this.handleClose.bind(this);
    this.handleMenu   = this.handleMenu.bind(this);
  }


  handleMenu( event ) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLogout( event ) {
    this.setState({ anchorEl: null });
  };

  handleClose () {
    this.setState({ anchorEl: null });
  };

  render() {
   const { classes } = this.props;
   const { anchorEl, user} = this.state;
   const open = Boolean(anchorEl);
   return (
     <div>
        <Router>
          <div className={classes.appFrame}>
            <AppBar position="absolute" className={classNames(classes.appBar, classes[`appBar-left`])}>
              <Toolbar>
                <Route path="/app/form" component={FormTitle} />
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
                  {this.props.user.loggedIn ? 
                    (
                      <a href="/auth/logout">
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                      </a>
                    )
                    :
                    (
                      <a href="/auth/login">
                        <MenuItem onClick={this.handleClose}>Login</MenuItem>
                      </a>
                    )
                  }
                </Menu>
              </Toolbar>
            </AppBar>
            <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
              <div className={classes.toolbar} />
              <Divider/>
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
                  <Link to="/app/widget">
                    <ListItem button>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Widget" />
                    </ListItem>
                    </Link>
                </div>
              </List>
            </Drawer>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Route path="/app/profile" component={Profile} />
              <Route path="/app/listing/:id" component={ListingDetail} />
              <Route path="/app/list" component={Listings} />
              <Route path="/app/form" component={Form} />
              <Route path="/app/user/login" component={Login} />
              <Route path="/app/widget" component={ImagePreview} />
            </main>
          </div>
         </Router>
     </div>
  );

  }
}

const    _App = connect(mapStateToProps, mapDispatchToProps)(App);

export default withStyles(styles)(_App);
