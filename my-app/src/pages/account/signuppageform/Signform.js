import Userfront from "@userfront/react";
import React from "react";


Userfront.init("rbv5jmqn");

// Define the Signup form component
export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      accountName: "",
      password: "",
      passwordVerify: "",
      alertMessage: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setAlertMessage = this.setAlertMessage.bind(this);
  }

  // Whenever an input changes value, change the corresponding state variable
  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  // Handle the form submission by calling Userfront.signup()
  handleSubmit(event) {
    event.preventDefault();
    // Reset the alert to empty
    this.setAlertMessage();
    // Verify that the passwords match
    if (this.state.password !== this.state.passwordVerify) {
      return this.setAlertMessage('Passwords must match');
    }
    // Call Userfront.signup()
    Userfront.signup({
      method: "password",
      email: this.state.email,
      password: this.state.password,
      data: {
        accountName: this.state.accountName
      }
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  render() {
    return (
      <div>
      <div className="signupbox" />
      <div className="signon">
        <Alert message={this.state.alertMessage} />
        <form onSubmit={this.handleSubmit}>
          <label>
            Email address
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input className="passwordinputbar"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Verify password
            <input
              name="passwordVerify"
              type="password"
              value={this.state.passwordVerify}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
      </div>
    );
  }
}

// Define the alert component
class Alert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.message) return "";
    return <div id="alert">{this.props.message}</div>;
  }
}

// Define the Single Sign-on (SSO) button
class SSOButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    Userfront.login({ method: this.props.provider });
    event.preventDefault();
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Sign up with {this.props.provider}
      </button>
    );
  }
}