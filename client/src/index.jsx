import React from 'react';
import ReactDOM from 'react-dom';
import Trips from './Trips.jsx';
import Pack from './Pack.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  search() {

  }


  render() {
    return (
      <div >
        <div className="row">
          <form className="form-group col-md-6 col-sm-12">
            <input type="text" placeholder="Search for a Trip" />
            <input type="submit" value="Search" onClick={search} />
          </form>
          <div className="form group col-md-6 col-sm-12">
            <input type="text" placeholder="Location" />
            <input type="date" />
            <input type="date" />
            <input type="submit" value="Add" />
          </div>
        </div>
        <h3>Upcoming Trips</h3>
        <Trips />
        <h3>Completed Trips</h3>
        <Trips />
        <Pack />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

