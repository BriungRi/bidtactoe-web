import React, { Component } from 'react';
import './App.css';
import Client from "./Client";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  handleSubmit(event) {
    var params = {
      email: this.state.email,
      password: this.state.password
    }
    Client.login(params, function (res) {
      if (res.error)
        console.log(res.error);
      console.log(res.body);
    })

    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <body className="Login-body" />
        <form className="Login-form" onSubmit={this.handleSubmit}>
          <label className="Login-label">Email</label>
          <br />
          <input className="Login-input" type="text" value={this.state.email} onChange={this.handleEmailChange} />
          <br /><br />
          <label className="Login-label">Password</label>
          <br />
          <input className="Login-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
          <br /><br />
          <input type="submit" value="Log In" />
        </form>
      </div>
    );
  }
}

export default Login