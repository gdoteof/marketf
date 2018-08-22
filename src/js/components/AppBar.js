import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { connect } from "react-redux";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const mapStateToProps = state => {
  return { user: state.user || {name:"anonymous"} };
};


class MenuAppBar extends Component {
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

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
      poop
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const _MenuAppBar = connect(mapStateToProps)(MenuAppBar);

export default withStyles(styles)(_MenuAppBar);

