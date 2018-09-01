import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';


const styles = {
  input: {
    display: 'none',
  },
}


class ImagePreview extends Component {

  constructor() {
    super();

    this.state={
      images: [],
      selected: null
    }

    this.handleFilePick = this.handleFilePick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    
  }

  buttomCallback(text){
    this.setState({ isEditing: true });
  }

  handleFilePick(e){
    const { images } = this.state;
    const files = e.target.files;

    //Add new files to end of array
    const initN = images.length;

    for (var i = 0; i < files.length; ++i){
      images[i + initN] = {name:files[i].name, img: URL.createObjectURL(files[i]), size:files[i].size};
    }

    //Filter (by name and size)
    const filtered = images.filter((image, index, self) =>
        index === self.findIndex((t) => ( t.name === image.name && t.size === image.size)))

    this.setState({ images : filtered });

  }

  handleRemove(imageIndex){
    const {images} = this.state;
    images.splice(imageIndex,1);
    this.setState({images});
  }

  render() {
    const { images } = this.state;
    console.log("LOGGING RENDER", images);
    const { classes } = this.props;
    return (
      <div>
        <h4>image preview</h4>
         <input
            accept="image/*"
            className={classes.input}
            id="fab-button-file"
            multiple
            type="file"
            onChange={this.handleFilePick}
          />
        <label htmlFor="fab-button-file">
          <Button component="span" mini variant="fab">
            Select
          </Button>
        </label>
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {images.map((image, index) => (
                        <GridListTile key={image.img} cols={image.cols || 1} onClick={(index) => this.handleRemove(index)}>
                          <img src={image.img} alt={image.name} />
                        </GridListTile>
                      ))}
          </GridList>
        </div>

        
      </div>
    );
  }
}



export default withStyles(styles)(ImagePreview);
