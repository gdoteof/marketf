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

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import store from "../store/index";


import { withStyles } from '@material-ui/core/styles';


const steps = ['Bottle Info', 'Bottle Pictures', 'Review your listing'];


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    width: '50%',
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  marker: {
    border: "5px red solid"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
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

    /*
    this.state = {
      name: "",
      price: '',
      distillery: "",
      email: "",
      shipping: "Free Shipping",
      pictures: {},
      knownBirth: "",
      description: "",
      birthday: '',
      activeStep: 0,
    }; */

    this.state = {
      name: "Knob Creek Single Barrel",
      price: 65,
      distillery: "Knob Creek",
      shipping: "Shipping Included",
      pictures: {},
      knownBirth: true,
      description: "13+ year singel barrel selected",
      birthday:  "2017-07-07",
      age:  9,
      activeStep: 2,
    };


    this.handleChange          =  this.handleChange.bind(this);
    this.handleCheckChange     =  this.handleCheckChange.bind(this);
    this.handleChangeNumeric   =  this.handleChangeNumeric.bind(this);
    this.handleSubmit          =  this.handleSubmit.bind(this);
    this.onImagePreviewChange  =  this.onImagePreviewChange.bind(this);
    this.imagesCallback        =  this.imagesCallback.bind(this);
    this.handleNext            =  this.handleNext.bind(this);
    this.handleBack            =  this.handleBack.bind(this);
    this.handleReset           =  this.handleReset.bind(this);
  }

  bottleInfoForm(){
    const { name, price, distillery, email, multiBottle, shipping, activeStep, description, age } = this.state;
    const classes = this.props;
    return (
      <form>
        <Grid container spacing={24} justify="space-evenly">
          <Grid container item sm={8} xs={12} justify="space-evenly" spacing={24}>
            <Grid item sm={12} xs={12}>
              <TextField id="name" name="name"
                fullWidth
                label="name"
                value={name}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={24} sm={8} xs={12} justify="space-evenly">
            <Grid item sm={12} xs={12}>
              <TextField
                id="description"
                name="description"
                fullWidth
                multiline
                label="Description"
                type="text"
                value={description}
                onChange={this.handleChange}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={24} sm={8} xs={12} justify="flex-start">
            <Grid item sm={4} xs={6}>
              <TextField id="price" name="price"
                fullWidth
                label="price"
                value={price}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item sm={8} xs={8}>
              <TextField id="distillery" name="distillery"
                fullWidth
                label="distillery"
                value={distillery}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid container item spacing={24} sm={8} xs={12} justify="flex-start">
              <Grid item sm={4} xs={12}>
                <InputLabel htmlFor="shipping">Shipping</InputLabel>
                <Select id="shipping"
                  value={shipping}
                  onChange={this.handleChange}
                  name="shipping"
                  fullWidth
                >
                  <MenuItem value={'Shipping Included'}>Shipping Included</MenuItem>
                  <MenuItem value={'Buyer Pays'}>Buyer Pays Shipping</MenuItem>
                  <MenuItem value={'Flat Rate'}>Flat Rate</MenuItem>
                </Select>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="knownBirth"
                      checked={this.state.knownBirth}
                      onChange={this.handleCheckChange}
                    />
                  }
                  label="Known Birthdate?"
                />
                { this.state.knownBirth && 
                <TextField
                  fullWidth
                  id="birthday"
                  name="birthday"
                  label="Birthday"
                  onChange={this.handleChange}
                  type="date"
                  value={this.state.birthday}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                }
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextField
                  fullWidth
                  name="age"
                  id="age"
                  label="Age (on label)"
                  type="number"
                  value={age}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </form>
    )
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return this.bottleInfoForm();
      case 1:
        return this.imageSelection(); 
      case 2:
        return this.listingPreview();;
      default:
        throw new Error('Unknown step');
    }
  }

  listingPreview(){
    const { name, price, distillery, shipping, pictures, knownBirth, description, birthday, age } = this.state;
    return (
      <React.Fragment>
        <ul>
          <li>
            <em>name</em>: {name}
          </li>
          <li>
            <em>price</em>: {price}
          </li>
          <li>
            <em>distillery</em>: {distillery}
          </li>
          <li>
            <em>shipping</em>: {shipping}
          </li>
          <li>
            <em>Known Birthdate?</em> {(knownBirth) ? "yes" : "no"}
          </li>
          { birthday !== ""  && knownBirth && <li>
            <em>Birthday</em>: {birthday}
          </li> }
          <li>
            <em>Age</em>: {age}
          </li>
          <li>
            <em>Description</em>: {description}
          </li>
        </ul>
      </React.Fragment>
    )

  }

  imageSelection(){
    const { images } = this.state;
    return (
      <React.Fragment>
        <ImagePreview callback={this.imagesCallback} images={images}/>;
      </React.Fragment>
    )
  }

  handleNext() {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack(){
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset(){
    this.setState({
      activeStep: 0,
    });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheckChange(event) {
    this.setState({ [event.target.name]: event.target.checked });
  }

  handleChangeNumeric(event) {
    this.setState({ [event.target.id]: Number(event.target.value) });
  }

  onImagePreviewChange(pictures){
    this.setState({pictures})
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, price, distillery, images, age, birthday, description, shipping } = this.state;
    const id = uuidv1();
    
    const utcBirthday = new Date(birthday);


    const parsedPrice = parseFloat(price)
    this.props.addListing({ name, id, price:parsedPrice, distillery });
    this.props.addListingAsync({name, price: parsedPrice, distillery, images: images.map(i=>i.b64), age, birthday, description, shipping})
    localStorage.setItem("market4store", JSON.stringify(store.getState()));
    console.log("Syncing:", store.getState());
  }

  imagesCallback(images){
    this.setState( { images: images } );
    console.log("got ", images, "in the parent!!!");
  }


  render() {
    const { name, price, distillery, email, multiBottle, shipping, activeStep } = this.state;
    const classes = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="headline" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subheading">
                    Saving...
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.flexEnd} style={{display: "flex", justifyContent: "flex-end"}}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} style={{marginBottom: "10px"}}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                      style={{marginBottom: "10px", marginRight:"20px"}}
                    >
                      {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                    </Button>
                    {activeStep === 2 && (
                      <Button component="span" size="small" aria-label="Select" variant="contained" className={classes.button} onClick={this.handleSubmit}>
                        <AddIcon/>
                        Save this listing
                      </Button>
                    ) }
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
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
