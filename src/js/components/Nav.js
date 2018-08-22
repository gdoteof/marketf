import React, { Component } from "react";
import { Link } from 'react-router-dom'

import { connect } from "react-redux";

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
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
  return { user: state.user || {name:"anonymous"} };
};

class Nav extends Component {
  constructor(){
    super();
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

  render(){
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
      </div>
      );
  }
}

/*
 *
            <NavLink className="nav-link" to="/app/list">List</Link>
            <Link className="nav-link" to="/app/form">Add Listing</Link>
            <Link className="nav-link" to="/app/profile">Profile {this.props.user.name}</Link>
          <a className="nav-link disabled" href="/auth/login">Login</a>
 */

const _Nav = connect(mapStateToProps)(Nav);

//export default _Nav;
export default withStyles(styles)(_Nav);
