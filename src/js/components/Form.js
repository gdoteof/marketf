import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addListing, addListingAsync } from "../actions/index";

import ImagePreview from "./ImagePreview";

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import store from "../store/index";

import { withStyles } from '@material-ui/core/styles';

const styles = {
    button: {
          marginTop: "10px"
        }
};

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
      price: '',
      distillery: "",
      email: "",
      pictures: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNumeric = this.handleChangeNumeric.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImagePreviewChange = this.onImagePreviewChange.bind(this);
    this.imagesCallback = this.imagesCallback.bind(this);
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
    const { name, priceString, distillery, images } = this.state;
    const id = uuidv1();

    const price = parseFloat(priceString)
    this.props.addListing({ name, id, price, distillery });
    this.props.addListingAsync({name, price, distillery, images})
    this.setState({ name: "" , price: 0, distillery: ""});
    localStorage.setItem("market4store", JSON.stringify(store.getState()));
    console.log("Syncing:", store.getState());
  }

  imagesCallback(images){
    this.setState( { images: images } );
    console.log("got ", images, "in the parent!!!");
  }

  render() {
    const { name, price, distillery, email } = this.state;
    const classes = this.props;
    return (
      <div>
        <Button component="span" size="small" aria-label="Select" variant="extendedFab" className={classes.button} onClick={this.handleSubmit}>
          <AddIcon/>
          Create New Listing
        </Button>
        <Grid container>
          <Grid item xs={6}>
            <TextField id="name"
              fullWidth
              label="name"
              value={name}
              onChange={this.handleChange}
             />
            <TextField id="price"
              fullWidth
              label="price"
              value={price}
              onChange={this.handleChange}
             />
            <TextField id="distillery"
              fullWidth
              label="distillery"
              value={distillery}
              onChange={this.handleChange}
             />
          </Grid>
        </Grid>
      <ImagePreview callback={this.imagesCallback}/>
      </div>
    );
  }
}

const Form = withStyles(styles)(connect(null, mapDispatchToProps)(ConnectedForm));

export default Form;
