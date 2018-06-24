import React, { Component } from "react";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Button from "muicss/lib/react/button";
import "./../css/App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleLogin(event) {
    if (this.state.email && this.state.password) {
      console.log(this.state.email + ", " + this.state.password);
      this.props.handleLogin(this.state.email, this.state.password);
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="Login">
        <p className="Regular-Text">{this.props.message}</p>
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
            onChange={this.handlePasswordChange}
            label="Password"
            type="password"
            floatingLabel={true}
            required={true}
          />
          <Button onClick={this.handleLogin} variant="raised">
            Log In
          </Button>
        </Form>
        <br />
        <p className="Link" onClick={this.props.openSignup}>
          <u>No account yet? Create one</u>
        </p>
      </div>
    );
  }
}

export default Login;
