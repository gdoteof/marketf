import React, { Component } from "react";
import Remove from "./Remove";
import Slideshow from "./Slideshow";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
    mySlideshow: {
      width: '600px',
      height: '400px',
      margin: '0 auto',
      maxHeight: '100vh',
      maxWidth: '100%',
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
          <Grid container spacing={24}>
            <Grid item sm={5} xs={12}>
              <div className={classes.mySlideshow}>
                    <Slideshow autoplay={10000000} thumb={true} images={listing.photos} />
              </div>
            </Grid>
            <Grid item sm={7} xs={12}>
                <Typography variant="display2">
                  {listing.name}
                </Typography>
            </Grid>
          </Grid>
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
