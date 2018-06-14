import React from 'react';
import ReactDOM from 'react-dom';
import Trips from './Trips.jsx';
import Pack from './Pack.jsx';

const App = (props) => {
  return (
    <div >
      <div className="row">
        <form className="form-group col-md-6 col-sm-12">
          <input type="text" placeholder="Search for a Trip" />
          <input type="submit" value="Search" />
        </form>
        <div className="form group col-md-6 col-sm-12">
          <input type="text" placeholder="Location" />
          <input type="date" value="Start" />
          <input type="date" value="End" />
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
};

ReactDOM.render(<App />, document.getElementById('app'));

