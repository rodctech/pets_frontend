import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Home from "./Home";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: "False",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {
    axios
      .get("https://pets-backend-ctd.herokuapp.com/logged_in", {
        withCredentials: true
      })
      .then(response => {
        if (response.data.logged_in && this.state.loggedIn === "False") {
          this.setState({
            loggedIn: "True",
            user: response.data.user
          });
        } else if (!response.data.logged_in && this.state.loggedIn === "True") {
          this.setState({
            loggedIn: "False",
            user: {}
          });
        }
        console.log("Login Status ?", response);
      })
      .catch(error => {
        console.log("Login ERROR", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedIn: "False",
      user: {}
    });
  }

  handleLogin(data) {
    this.setState({
      loggedIn: "True",
      user: data.user
    });
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  handleLogout={this.handleLogout}
                  handleLogin={this.handleLogin}
                  loggedIn={this.state.loggedIn}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard {...props} loggedIn={this.state.loggedIn} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
