import React from 'react';
import ReactDOM from 'react-dom';
import Trips from './Trips.jsx';
import Pack from './Pack.jsx';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trips: [],
    };
    // this.search = this.search.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3005/api/trips')
      .then((response) => {
        this.setState({
          trips: response.data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    return (
      <div >
        <div className="row">
          <form className="form-group col-md-6 col-sm-12">
            <button>Find a Trip</button>
          </form>
          <form className="form group col-md-6 col-sm-12">
            <input type="text" placeholder="Location" />
            <input type="date" />
            <input type="date" />
            <input type="submit" value="Add" />
          </form>
        </div>
        <h3>Upcoming Trips</h3>
        <Trips trips={this.state.trips} />
        <h3>Completed Trips</h3>
        <Trips trips={this.state.trips} />
        <Pack />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

