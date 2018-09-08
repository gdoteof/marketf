import React, { Component } from "react";
import Remove from "./Remove";

import { withStyles } from '@material-ui/core/styles';

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
})



class ListingDetail extends Component {

  constructor(props) {
    super(props);
    const { loadListingAsync, match, listingDetails } = this.props;
    loadListingAsync(match.params.id);
  }

  render() {
    const { listings, classes, match, listingDetails} = this.props;
    const thisListing = match.params.id;

    console.log("rendering with", listingDetails);

    let name;
    if( listingDetails[match.params.id] ) {
      name = listingDetails[match.params.id].name;
    } else {
      name = "loading..";
    }
    return (
      <div>{name}</div> 
    )
  }
  
}
    

const List = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ListingDetail));

export default List;
