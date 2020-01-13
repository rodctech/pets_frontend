import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { username, password } = this.state;
    axios
      .post(
        "https://pets-backend-ctd.herokuapp.com/sessions",
        {
          user: {
            username: username,
            password: password
          }
        },
        {
          withCredentials: true
          //NOTE: This tells API it's ok to set Cookie in our client
        }
      )
      .then(response => {
        console.log("User Session response", response);
        if (response.data.logged_in === true) {
          this.props.handleSuccessAuth(response.data);
        } else
          this.setState({
            loginErrors: response.data.error
          });
      })
      .catch(error => {
        console.log("User Login ERROR", error);
      });
    // console.log("User Login Submitted");
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
            name={"username"}
            placeholder={"Username"}
            value={this.state.username}
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
          <button type={"submit"}>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
