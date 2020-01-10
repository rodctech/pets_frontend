import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <h2>Logged In status: {this.props.loggedIn}</h2>
      </div>
    );
  }
}

export default Dashboard;
