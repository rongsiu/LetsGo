import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';


class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  componentDidMount() {
   const { from } = this.props.location.state || { from: { pathname: "/" } };
   const pathname = from.pathname;
   window.localStorage.setItem("redirectUrl", pathname);
}

  render() {
    return (
      <div>
        <p>You must log in to view the page</p>

        <a href='/auth/facebook'>login through facebook</a>
      </div>
    )
  }
}


export default Login;