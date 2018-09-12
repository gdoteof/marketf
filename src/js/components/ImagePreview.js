import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutlined';
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
  },
  bigButtonArea: {
    minHeight: '400px',
  },
  icon: {
    color: 'white',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
})


class ImagePreview extends Component {

  constructor(props) {
    super(props);

    this.state={
      images: this.props.images || [],
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
      images[i + initN].img = URL.createObjectURL(files[i]);
    }


    //Filter (by unique on name and size)
    const filtered = images.filter((image, index, self) =>
        index === self.findIndex((t) => ( t.name === image.name && t.size === image.size)))

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
      <React.Fragment>
      <div>
        <Grid container direction="row" justify="center" alignItems="center" className={images.length ? classes.smallButtonArea : classes.bigButtonArea} spacing={24}>
          <Grid item>
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
                {images.length ? "Add Images" : "Select Images"}
              </Button>
            </label>
          </Grid>
        </Grid>
      </div>
      <GridList cellHeight={400} className={classes.gridList} cols={3}>
        {images.map((image, index) => (
                    <GridListTile key={image.name} cols={image.cols || 1}>

                      <img src={image.img} alt={image.name} />
                      <GridListTileBar
                        titlePosition="bottom"
                        actionIcon={
                          <IconButton className={classes.icon} onClick={() => this.handleRemove(index)}>
                            <DeleteOutlineIcon />
                          </IconButton>
                        }
                        actionPosition="left"
                        className={classes.titleBar}
                      />
				
                    </GridListTile>
                  ))}
      </GridList>
      </React.Fragment>
    )
  }
}



export default withStyles(styles)(ImagePreview);
