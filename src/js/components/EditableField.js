import React, { Component } from "react";

import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";



import { connect } from "react-redux";

const mapStateToProps = state => {
  return { 
    fieldName: state.fieldName,
    value: state.value
  };
};

const EditableFieldStyle = {
};

class ConnectedEditableField extends Component {
  
  constructor() {
    super()
    this.state = {
      value: "notlol"
    }
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const value = this.props.value;
    return  (
      <form>
        <FormControl>
          <TextField id="value"
            label="Name"
            value={value}
            onclick={this.props.callback(value)}
           />
        </FormControl>
      </form>
    );
  }
}

const EditableField = connect(mapStateToProps)(ConnectedEditableField);

export default EditableField;
