import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessAuth = this.handleSuccessAuth.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  handleSuccessAuth(data) {
    //UPDATE Parent
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  onLogoutClick() {
    axios
      .delete("https://pets-backend-ctd.herokuapp.com/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("Logout ERROR", error);
      });
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Logged In status: {this.props.loggedIn}</h2>
        <br />
        <h4>Register</h4>
        <Registration handleSuccessAuth={this.handleSuccessAuth} />
        <br />
        <br />
        <br />
        <h4>Log In</h4>
        <Login handleSuccessAuth={this.handleSuccessAuth} />
        <br />
        <br />
        <br />
        <button onClick={() => this.onLogoutClick()}>Log Out</button>
      </div>
    );
  }
}

export default Home;
