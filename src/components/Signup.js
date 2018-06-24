import React, { Component } from "react";
import "./../css/App.css";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Button from "muicss/lib/react/button";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSignup(event) {
    if (this.state.email && this.state.username && this.state.password) {
      this.props.handleSignup(
        this.state.email,
        this.state.username,
        this.state.password
      );
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="Login">
        <p className="Error-Message">{this.props.message}</p>
        <Form>
          <Input
            className="Login-input"
            onChange={this.handleEmailChange}
            label="Email"
            type="email"
            floatingLabel={true}
            required={true}
          />
          <Input
            className="Login-input"
            onChange={this.handleUsernameChange}
            label="Username"
            floatingLabel={true}
            required={true}
          />
          <Input
            className="Login-input"
            onChange={this.handlePasswordChange}
            label="Password"
            type="password"
            floatingLabel={true}
            required={true}
          />
          <Button onClick={this.handleSignup} variant="raised">
            Sign Up
          </Button>
        </Form>
        <br />
        <p className="Link" onClick={this.props.openLogin}>
          <u>Already have an account? Log in</u>
        </p>
      </div>
    );
  }
}

export default Signup;
