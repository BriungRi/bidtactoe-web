import React, { Component } from 'react';
import './../css/App.css';

class Login extends Component {
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
    });
  }

  handleSubmit(event) {
    this.props.handleLogin(this.state.email, this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
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
        <br/><br/>
        <button className="Link"
          onClick={this.props.openSignup}><u>No account yet? Create one</u></button>
      </div>
    );
  }
}

export default Login;