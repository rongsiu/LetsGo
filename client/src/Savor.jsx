import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Modal from 'react-modal';
import PhotoUploader from './PhotoUploader.jsx'

Modal.setAppElement('#app');

class Savor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      photos: [],
      modalIsOpen: false,
    }

    this.toggleShowModal = this.toggleShowModal.bind(this)
  }

  componentWillMount() {
    this.trip = this.props.location.pathname.split('/')[2];
    this.trip_id = this.props.location.pathname.split('/')[3];
  }

  componentDidMount() {
    axios.get(`/api/savor/${this.trip_id}`)
      .then(response => {
        console.log(response.data)
        this.setState({
          photos: response.data
        })
      })
      .catch(error => {
        console.log(error);
    });
  }
  
  toggleShowModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen})
  }

  render() {
    return(
      <div className="container">
        <div className="gallery">
          <button onClick={this.toggleShowModal}>Add Photos</button>
          <Modal
          isOpen={this.state.modalIsOpen}>
          <button onClick={this.toggleShowModal}>close</button>
          <PhotoUploader />
          </Modal>
          <div>
            {this.state.photos.map(item =>
              <img className="photos" src={`https://s3-us-west-1.amazonaws.com/letsgophotos/${item.photo}.jpg`}/>
            )} 
          </div>
        </div>
      </div>)
  }
}

export default Savor;