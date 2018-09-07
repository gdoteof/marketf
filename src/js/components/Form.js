import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addListing, addListingAsync } from "../actions/index";

import ImagePreview from "./ImagePreview";

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';


import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import store from "../store/index";


import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        marginTop: "10px"
        },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    formControl: {
          margin: theme.spacing.unit,
          minWidth: "360px",
        },
});

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
      shipping: "Free Shipping",
      pictures: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNumeric = this.handleChangeNumeric.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImagePreviewChange = this.onImagePreviewChange.bind(this);
    this.imagesCallback = this.imagesCallback.bind(this);
  }

  handleChange(event) {
    console.log("received change", event.target.id, ":", event.target.value);
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeNumeric(event) {
    this.setState({ [event.target.id]: Number(event.target.value) });
  }

  onImagePreviewChange(pictures){
      this.setState({pictures})
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, price, distillery, images } = this.state;
    const id = uuidv1();

    const parsedPrice = parseFloat(price)
    this.props.addListing({ name, id, price:parsedPrice, distillery });
    this.props.addListingAsync({name, price: parsedPrice, distillery, images: images.map(i=>i.b64)})
    this.setState({ name: "" , price: 0, distillery: ""});
    localStorage.setItem("market4store", JSON.stringify(store.getState()));
    console.log("Syncing:", store.getState());
  }

  imagesCallback(images){
    this.setState( { images: images } );
    console.log("got ", images, "in the parent!!!");
  }

  render() {
    const { name, price, distillery, email, multiBottle, shipping } = this.state;
    const classes = this.props;
    return (
      <form className={classes.root}>
        <Button component="span" size="small" aria-label="Select" variant="contained" className={classes.button} onClick={this.handleSubmit}>
          <AddIcon/>
          Save this listing
        </Button>
        
        <Grid container>
          <Grid item sm={8} xs={12}>
            <TextField id="name" name="name"
              fullWidth
              label="name"
              value={name}
              onChange={this.handleChange}
             />
            <TextField id="price" name="price"
              fullWidth
              label="price"
              value={price}
              InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              onChange={this.handleChange}
             />
            <TextField id="distillery" name="distillery"
              fullWidth
              label="distillery"
              value={distillery}
              onChange={this.handleChange}
             />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="shipping">Shipping</InputLabel>
              <Select id="shipping"
                value={shipping}
                onChange={this.handleChange}
                name="shipping"
              >
                <MenuItem value={'Shipping Included'}>Shipping Included</MenuItem>
                <MenuItem value={'Buyer Pays'}>Buyer Pays Shipping</MenuItem>
                <MenuItem value={'Flat Rate'}>Flat Rate</MenuItem>
              </Select>
              <FormHelperText>Some important helper text</FormHelperText>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.multiBottle}
                    onChange={this.handleChange}
                    value={this.state.multiBottle}
                  />
                }
                label="Multi-Bottle listing?"
              />

          </FormControl>
          </Grid>
        </Grid>
      <ImagePreview callback={this.imagesCallback}/>
      </form>
    );
  }
}

const Form = withStyles(styles)(connect(null, mapDispatchToProps)(ConnectedForm));



function _FormTitle ({ classes }) {return (
                <Typography variant="title" color="inherit" className={classes.flex} noWrap>
                  Add a new listing
                </Typography>
)};

const titleStyles = {
    flex: {
          flex: 1
        }
};

const FormTitle = withStyles(titleStyles)(_FormTitle);

export { FormTitle };

export default Form;
