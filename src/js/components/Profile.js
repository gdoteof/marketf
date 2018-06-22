import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { getName, updateName } from "../actions/index";

import EditableField from "./EditableField";
import Button from "@material-ui/core/Button";
import store from "../store/index";

import TextField from '@material-ui/core/TextField';


const mapStateToProps = (state ) => {
  return {
    name: state.name
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getName: () => dispatch(getName()),
    updateName: name => dispatch(updateName(name)),
  };
};


class ConnectedProfile extends Component {

  constructor() {
    super();

    this.state={
      name: 'lol',
      isEditing: false
    }

    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleChange(event) {
    console.log(event.target.id, event.target.value);
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSave(){
    const { name } = this.state;
    console.log("calling handleSave with", name);
    this.props.updateName({name})
  }

  _handleFocus(text){
    console.log("focus in: ", text);
  }

  _handleFocusOut(text){
    console.log("focusOut: ", text);
  }

  buttomCallback(text){
    this.setState({ isEditing: true });
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <h4>profile</h4>
        <TextField id="name"
          label="Name"
          value={name}
          onChange={this.handleChange}
         />
        <Button variant="contained" onClick={this.handleSave}>
          Default
        </Button>
      </div>
    );
  }
}

const Profile = connect(mapStateToProps, mapDispatchToProps)(ConnectedProfile);

export default Profile;
