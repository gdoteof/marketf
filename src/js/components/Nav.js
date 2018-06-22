import React from "react";
import { NavLink } from 'react-router-dom'

const mapStateToProps = (state ) => {
  return {
    name: state.name
  }
};

const Nav = ( props )  => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">All Listings <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">My Listings</a>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/app/form">Add Listing</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/app/profile">Profile {props.name}</NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="/auth/login">Login</a>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
);


export default Nav;
