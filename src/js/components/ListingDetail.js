import React, { Component } from "react";
import Remove from "./Remove";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { connect } from "react-redux";
import { loadListingAsync } from "../actions/index";

const mapStateToProps = state => {
  return { listingDetails: state.listingDetails };
};

const mapDispatchToProps = dispatch => {
  return {
    loadListingAsync: (id) => dispatch(loadListingAsync(id)),
  };
};


const styles = theme => ({
    mainImage: {
          maxHeight: '300px',
        },
    root: {
          flexGrow: 1,
        },
    paper: {
          padding: theme.spacing.unit * 2,
          textAlign: 'center',
          color: theme.palette.text.secondary,
        },
});



class ListingDetail extends Component {

  constructor(props) {
    super(props);
    const { loadListingAsync, match } = this.props;
    loadListingAsync(match.params.id);
  }

  render() {
    const { match, listingDetails, classes} = this.props;
    const thisListing = match.params.id;

    console.log("rendering with", listingDetails);

    let component;
    if( listingDetails[match.params.id] ) {
      const listing = listingDetails[match.params.id];
      component = (

        <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={5}>
                <Paper className={classes.paper}>
                  <img src={'/static/img/' + listing.photos[0]} className={classes.mainImage}/>
                </Paper>
              </Grid>
              <Grid item xs={7}>
                  <h2>{listing.name}</h2>
              </Grid>
            </Grid>
        </div>
      )

    } else {
      component = "loading..";
    }
    return (
      <div>{component}</div> 
    )
  }
  
}
    

const List = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ListingDetail));

export default List;
