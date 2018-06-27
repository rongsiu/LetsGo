import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Trips from './Trips.jsx';
import Pack from './Pack.jsx';
import Nav from './Nav.jsx';
import Enjoy from './Enjoy.jsx';
import Savor from './Savor.jsx'

class App extends React.Component {

  render() {
    return (
      <div >
        <BrowserRouter>
          <Switch>
            <Nav>
            <Route exact path="/trips" component={Trips} />
            <Route path="/pack/:trip" component={Pack} />
            <Route path="/enjoy/:trip" component={Enjoy} />
            <Route path="/savor/:trip" component={Savor} />
            </Nav>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;