import React from "react";
import Remove from "./Remove";
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { connect } from "react-redux";

const mapStateToProps = state => {
  return { listings: state.listings };
};


const styles = theme => ({
  input: {
    display: 'none',
  },
  gridlist: {
  },
  button: {
    margin: theme.spacing.unit,
  },
  uploadIcon: {
    marginRight: theme.spacing.unit,
  }
})



const ConnectedList = ({ listings, classes }) => (
  <ul className="list-group list-group-flush" key="listparent">
    {listings.map(el => (
      <li className="list-group-item" key={"LISTING_" + el.key}>
        {el.name} - ${el.price} - {el.user} - {el.createdAt} - key:{el.key} - id:{el.id} - <Link to={"/app/listing/" + el.key}>Go</Link>
        <GridList cellHeight={280} className={classes.gridList} cols={3}>
          {el.photos && el.photos.map((image, index) => (
                      <GridListTile key={image.name} cols={image.cols || 1} 
                      >
                        <button type="button" className="close" aria-label="Close" 
                          onClick={() => this.handleRemove(index)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <img src={"/static/img/" + image} />
                      </GridListTile>
                    ))}
          <Remove id={el.key}/>
        </GridList>
      </li>
    ))}
  </ul>
);

const List = withStyles(styles)(connect(mapStateToProps)(ConnectedList));

export default List;
