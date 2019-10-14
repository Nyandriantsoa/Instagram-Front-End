import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { post, clearErrors} from '../../redux/actions/dataActions'; //, prepareImages 

// const styles = (theme) => ({
//   ...theme,
//   submitButton: {
//     position: 'relative',
//     float: 'right',
//     marginTop: 10
//   },
//   progressSpinner: {
//     position: 'absolute'
//   },
//   closeButton: {
//     position: 'absolute',
//     left: '91%',
//     top: '6%'
//   }
// });

class PostPost extends Component {
  state = {
    open: false,
    body: '',
    errors: {},
    images: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData()
    this.state.images.forEach((file, i) => {
      formData.append(i, file , file.name)
    })

    this.props.post({ 
      body: this.state.body,
      images : formData
    });
  };

  removeImage = (event) => {
    const images = this.state.images;
    images.splice(event.target.id , 1);
    this.setState({ images : images });
  }

  handleImages = (event) => {
    event.preventDefault();
    var currentList = this.state.images;
    currentList = currentList.concat(Array.from(event.target.files));
    this.setState({images : currentList});
    //this.props.prepareImages({images : event.target.files})
  };

  createListImages() {
    if(this.state.images){
      return this.state.images.map((image , i) => {
        return(
          <div key={i} id={i} >
            <button type="button" id={i} onClick={e => this.removeImage(e)}>X</button>
            <img src={URL.createObjectURL(image)} />
          </div>
        );
      })
    }
    
  }

  openExplorer(){
    document.getElementById('selectedFile').click();
  }

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Post something!">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            // tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Share your pictures</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="POST!!"
                multiline
                rows="3"
                placeholder="description"
                error={errors.body ? true : false}
                helperText={errors.body}
                //className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              {this.createListImages()}
              {/* <input type='file' onChange={this.handleImages} id='multiple' name="images"  multiple /> */}
              <input type="file" onChange={this.handleImages} 
                name="images"  multiple id="selectedFile" hidden 
              />
              <input type="button" value="+ add Picture" onClick={this.openExplorer} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                //className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostPost.propTypes = {
  post: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  images: state.data.post.images
});

export default connect(
  mapStateToProps,
  { post, clearErrors} //, prepareImages
)(PostPost); //(withStyles(styles)
