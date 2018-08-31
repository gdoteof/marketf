import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { getName, updateName, submitLogin } from "../actions/index";

import EditableField from "./EditableField";
import Button from "@material-ui/core/Button";
import store from "../store/index";

import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';


const mapStateToProps = (state) => {
  return {
    name: state.name
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getName: () => dispatch(getName()),
    updateName: name => dispatch(updateName(name)),
    submitLogin: loginInfo => dispatch(submitLogin(loginInfo)),
  };
};


class ConnectedProfile extends Component {


  constructor() {
    super();

    this.state={
      email: 'l',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(){
    console.log("handling submit");
    console.log("calling update with", email, password);
    const { email, password } = this.state;
    console.log("called update with", email, password);
    this.props.submitLogin({email,password})
  }

  _handleFocus(text){
    console.log("focus in: ", text);
  }

  _handleFocusOut(text){
    console.log("focusOut: ", text);
  }



  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h4>Enter information</h4>
        <Grid container align="center" justify="center">
          <Grid item xs={6} sm={3}>
            <TextField id="email"
              fullWidth
              label="email!"
              value={email}
              onChange={this.handleChange}
             />
            <TextField 
              fullWidth
              id="password"
              label="password"
              type="password"
              value={password}
              onChange={this.handleChange}
             />
            <Button variant="contained" onClick={this.handleSubmit} align="left">
              Login
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);

export default Profile;

