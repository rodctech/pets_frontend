import React, { Component } from "react";
import axios from "axios";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      password_confirmation
    } = this.state;
    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        {
          withCredentials: true
          //NOTE: This tells API it's ok to set Cookie in our client
        }
      )
      .then(response => {
        console.log("User Registration response", response);
        if (response.data.status === "created") {
          this.props.handleSuccessAuth(response.data);
        } else
          this.setState({
            registrationErrors: response.data.error
          });
      })
      .catch(error => {
        console.log("User Registration ERROR", error);
      });
    // console.log("User Registration Submitted");
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    //console.log("Form handle change", event);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type={"text"}
            name={"first_name"}
            placeholder={"First Name"}
            value={this.state.first_name}
            onChange={this.handleChange}
            required
          />
          <input
            type={"text"}
            name={"last_name"}
            placeholder={"Last Name"}
            value={this.state.last_name}
            onChange={this.handleChange}
            required
          />
          <input
            type={"text"}
            name={"username"}
            placeholder={"Username"}
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <input
            type={"email"}
            name={"email"}
            placeholder={"Email"}
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type={"password"}
            name={"password"}
            placeholder={"Password"}
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            type={"password_confirmation"}
            name={"password_confirmation"}
            placeholder={"Password Confirmation"}
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type={"submit"}>Register User</button>
        </form>
      </div>
    );
  }
}

export default Registration;
