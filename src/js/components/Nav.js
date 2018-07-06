import React, { Component } from "react";
import { NavLink } from 'react-router-dom'

import { connect } from "react-redux";

const mapStateToProps = state => {
  return { user: state.user || {name:"anonymous"} };
};

class Nav extends Component {
  constructor(){
    super();
  }

  render(){

    return (
      <div>
                <NavLink className="nav-link" to="/app/list">List</NavLink>
                <NavLink className="nav-link" to="/app/form">Add Listing</NavLink>
                <NavLink className="nav-link" to="/app/profile">Profile {this.props.user.name}</NavLink>
                <a className="nav-link disabled" href="/auth/login">Login</a>
      </div>
      );
  }
}

const _Nav = connect(mapStateToProps)(Nav);

export default _Nav;
