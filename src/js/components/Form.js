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


const steps = ['Bottle Info', 'Bottle Pictures', 'Review your order'];


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
        },
    buttons: {
          display: 'flex',
          justifyContent: 'flex-end',
        },
    marker: {
        border: "5px red solid"
        },
    button: {
        marginTop: "10px",
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
        },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    formControl: {
          margin: theme.spacing.unit,
          minWidth: "360px",
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
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleChangeNumeric = this.handleChangeNumeric.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImagePreviewChange = this.onImagePreviewChange.bind(this);
    this.imagesCallback = this.imagesCallback.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  bottleInfoForm(){
    const { name, price, distillery, email, multiBottle, shipping, activeStep } = this.state;
    const classes = this.props;
    return (
      <form className={classes.root}>
        <Button component="span" size="small" aria-label="Select" variant="contained" className={classes.button} onClick={this.handleSubmit}>
          <AddIcon/>
          Save this listing
        </Button>
        
        <Grid container>
          <Grid item sm={8} xs={12}>
            <div className={classes.marker}>
              <FormControl>
                <TextField id="name" name="name"
                  fullWidth
                  label="name"
                  value={name}
                  onChange={this.handleChange}
                 />
                 <TextField
                    id="description"
                    multiline
                    label="Description"
                    type="text"
                    value={this.state.description}
                    rows={4}
                 />
                 <TextField id="price" name="price"
                   label="price"
                   value={price}
                   InputProps={{
                         startAdornment: <InputAdornment position="start">$</InputAdornment>,
                   }}
                   onChange={this.handleChange}
                  />
                 <TextField id="distillery" name="distillery"
                   label="distillery"
                   value={distillery}
                   onChange={this.handleChange}
                  />
                </FormControl>
            </div>
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
              <TextField
                id="age"
                label="Age (on label)"
                type="number"
                className={classes.textField}
                InputLabelProps={{
                            shrink: true,
                            }}
              />

          </FormControl>
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
							return <div>step 1</div>;
						case 2:
							return <div>step 2</div>;
						default:
							throw new Error('Unknown step');
					}
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
    console.log("received change", event.target.id, ":", event.target.value);
    console.log(event.target);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheckChange(event) {
    console.log("received change", event.target.id, ":", event.target.checked);
    console.log(event.target);
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
    const { name, price, distillery, email, multiBottle, shipping, activeStep } = this.state;
    const classes = this.props;
    return (
		<div>
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} className={classes.stepper}>
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
                        Your order number is #2001539. We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
                      </Typography>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {this.getStepContent(activeStep)}
                      <div className={classes.buttons}>
                        {activeStep !== 0 && (
                            <Button onClick={this.handleBack} className={classes.button}>
                              Back
                            </Button>
                        )}
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleNext}
                              className={classes.button}
                            >
                              {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                      </div>
                    </React.Fragment>
                  )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>

      <ImagePreview callback={this.imagesCallback}/>
		</div>
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
