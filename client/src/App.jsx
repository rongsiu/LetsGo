import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import Trips from './Trips.jsx';
import Pack from './Pack.jsx';
import Nav from './Nav.jsx'
import Login from './Login.jsx'


const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn === true ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};


class App extends React.Component {

  render() {
    return (
      <div >
        <BrowserRouter>
          <Switch>
            <Nav> 
            <AuthButton/>
            <Route exact path="/login" component={Login} />
            <PrivateRoute loggedIn={this.props.appState.loggedIn} exact path="/trips" component={Trips} />
            <PrivateRoute loggedIn={this.props.appState.loggedIn} path="/pack/:trip" component={Pack} />
            </Nav>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;