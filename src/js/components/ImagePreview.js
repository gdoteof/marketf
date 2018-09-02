import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

import UploadIcon from '@material-ui/icons/AddAPhoto';

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


class ImagePreview extends Component {

  constructor() {
    super();

    this.state={
      images: [],
      selected: null
    }

    this.handleFilePick = this.handleFilePick.bind(this);
    this.handleRemove   = this.handleRemove.bind(this);
    
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
      images[i + initN] = files[i];
    }


    //Filter (by unique on name and size)
    const filtered = images.filter((image, index, self) =>
        index === self.findIndex((t) => ( t.name === image.name && t.size === image.size)))

    console.log("There are ", filtered.length, "images in the array after filtering");

    //Create base64 representations where needed
    for (var i = 0; i < filtered.length; ++i){
      if( ! filtered[i].b64 ){
        var reader = new FileReader();
        reader.readAsDataURL(filtered[i]);
        const outer = this;
        reader.onload = (function(r,index) { 
          return function () {
          outer.handleb64(r.result, index);
        }})(reader,i);
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }
    }

    this.setState({ images : filtered });
  }

  handleb64(b64, index){
    const {images} = this.state;
    images[index].b64 = b64;
    this.setState({ images });
    this.percolate(images)
  }

  handleRemove(imageIndex){
    const {images} = this.state;
    images.splice(imageIndex,1);
    this.setState({images});
    this.percolate(images)
  }

  percolate(images){
    this.props.callback(images)
  }

  render() {
    const { images } = this.state;
    const { classes } = this.props;
    return (
      <div>
         <input
            accept="image/*"
            className={classes.input}
            id="fab-button-file"
            multiple
            type="file"
            onChange={this.handleFilePick}
          />
        <label htmlFor="fab-button-file">
          <Button component="span" size="small" aria-label="Select" variant="extendedFab" className={classes.button}>
            <UploadIcon className={classes.uploadIcon}/>
            Select Images
          </Button>
        </label>
        <div className={classes.root}>
          <GridList cellHeight={280} className={classes.gridList} cols={3}>
            {images.map((image, index) => (
                        <GridListTile key={image.name} cols={image.cols || 1} 
                        >
                          <button type="button" className="close" aria-label="Close" 
                            onClick={() => this.handleRemove(index)}
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <img src={URL.createObjectURL(image)} alt={image.name} />
                        </GridListTile>
                      ))}
          </GridList>
        </div>

        
      </div>
    );
  }
}



export default withStyles(styles)(ImagePreview);
