import Userfront from "@userfront/react";
import React from "react";
import { Button } from "@mui/material";


Userfront.init("rbv5jmqn");

// Define the Signup form component
export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      accountType: "",
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
    if (this.state.accountType === '') {
      return this.setAlertMessage('Must choose an account type');
    }
    // Call Userfront.signup()
    Userfront.signup({
      method: "password",
      email: this.state.email,
      password: this.state.password,
      data: {
        accountType: this.state.accountType
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
            <input className="emailinputbar"
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            <input className="passwordinputbar"
              name="password"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            <input className="verifypasswordinputbar"
              name="passwordVerify"
              type="password"
              placeholder="Verify Password"
              value={this.state.passwordVerify}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            <input
            className="thriftradio"
            name="accountType"
            type="radio"
            value="thrift store"
            checked={this.state.accountType === "thrift store"}
            onChange={this.handleInputChange}
            />
            Thrift Store
          </label>
          <label>
            <input
            className="homelessradio"
            name="accountType"
            type="radio"
            value="homeless shelter"
            checked={this.state.accountType === "homeless shelter"}
            onChange={this.handleInputChange}
            />
            Homeless Shelter
</label>
          <Button
      type="submit"
      sx={{
        position:'absolute',
        display: "flex",
        color: "#F7F3F3",
        fontFamily: 'Noto Sans',
        fontSize: 30,
        fontStyle: 'normal',
        fontWeight: 700,
        textAlign: 'center',
        height: 50,
        left: -375,
        top: -40,
        width: 250,
        textTransform: 'none',
        bgcolor: "#24a0ed",
        ":hover": {
          bgcolor: "#0792e8",
          color: "#F7F3F3",
          textTransform: 'none',
        }
      }} >
      Sign up
    </Button>
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