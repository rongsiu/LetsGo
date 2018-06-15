import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Trips from './Trips.jsx';
import Pack from './Pack.jsx';

class App extends React.Component {

  render() {
    return (
      <div >
        <BrowserRouter>
          <Switch>
            <Route exact path="/trips" component={Trips} />
            <Route exact path="/pack" component={Pack} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;