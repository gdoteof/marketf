import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addListing, addListingAsync } from "../actions/index";


import store from "../store/index";

const mapDispatchToProps = dispatch => {
  return {
    addListing: listing => dispatch(addListing(listing)),
    addListingAsync: listing => dispatch(addListingAsync(listing))
  };
};

class ConnectedForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: 0,
      distillery: "",
      pictures: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNumeric = this.handleChangeNumeric.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImagePreviewChange = this.onImagePreviewChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleChangeNumeric(event) {
    this.setState({ [event.target.id]: Number(event.target.value) });
  }

  onImagePreviewChange(pictures){
      this.setState({pictures})
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, price, distillery } = this.state;
    const id = uuidv1();
    this.props.addListing({ name, id, price, distillery });
    this.props.addListingAsync({name, price})
    this.setState({ name: "" , price: 0, distillery: ""});
    localStorage.setItem("market4store", JSON.stringify(store.getState()));
    console.log("Syncing:", store.getState());
  }

  render() {
    const { name, price, distillery } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name?</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={this.handleChangeNumeric}
          />
          <label htmlFor="distillery">Distillery</label>
          <input
            type="text"
            className="form-control"
            id="distillery"
            value={distillery}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;
