import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import AdminLayout from "layouts/Admin/Admin.jsx";

const hist = createBrowserHistory();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: Object
    }
  }

  render() {
    return (
        <Router history={hist}>
            <Switch>
            <Route path="/admin" render={props => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
            </Switch>
        </Router>
    );
  }
}

export default App;
