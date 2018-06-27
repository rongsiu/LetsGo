import Dropzone from 'react-dropzone';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
 
class PhotoUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
    };
    this.handleOnDrop = this.handleOnDrop.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }

  handleOnDrop(files) {
    Promise.all(files.map(file => this.uploadImage(file)))
      .then (
        this.setState({
          isUploading: true,
        })
      ).catch(e => console.log(e));
  }

  uploadImage(file) {
    const data = new FormData()
    data.append('file', file)
    return axios.post(`/upload/${this.props.biz_id}`, data)
    .then(res => {
      const options = {
        headers: {
          'Content-Type': file.type
        }
      };
      return axios.put(res.data.url, file, options);
    }).then(res => {
      return {
        isUploading: false,
      };
    });
  }

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.handleOnDrop}
          accept="image/*"
          style={{"width" : "500px", "height" : "500px", "border" : "2px dotted black", "margin": "auto"}}
        >
        Click here to upload photos...
        </Dropzone>
      </div>
    );
  }
}

export default PhotoUploader