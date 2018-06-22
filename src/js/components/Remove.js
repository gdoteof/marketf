import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { removeListing } from "../actions/index";


import store from "../store/index";

const mapDispatchToProps = dispatch => {
  return {
   removeListing: id => dispatch(removeListing(id))
  };
};

const mapStateToProps = (state , ownProps) => {
  return {
    id:ownProps.id
  }
};

class ConnectedRemove extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const id = this.props.id;
    this.props.removeListing({ id });
    localStorage.setItem("market4store", JSON.stringify(store.getState()));
  }

  render() {
    return (
      <button type="button" className="close" aria-label="Close" onClick={this.handleClick}>
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }
}

const Remove = connect(mapStateToProps, mapDispatchToProps)(ConnectedRemove);

export default Remove;
