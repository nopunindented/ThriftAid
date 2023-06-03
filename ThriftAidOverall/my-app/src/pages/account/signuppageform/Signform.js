import Userfront from "@userfront/react";
import React from "react";
import { Button } from "@mui/material";
import SignupLogo from "./Signuppagelogo.js";
import { Link } from "react-router-dom";

Userfront.init("rbv5jmqn");




const handleLoginClick = () => {
  window.location.href = "http://localhost:3000/login";
};

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
    this.setAlertMessage("");
    // Verify that the passwords match
    if (this.state.password !== this.state.passwordVerify) {
      this.setAlertMessage("Passwords must match");
      return;
    }
    else if (this.state.accountType === "") {
      this.setAlertMessage("Must choose an account type");
      return;
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
    const { alertMessage } = this.state;

    return (
      <div>
        <div className="typeofaccountoutline"></div>
        <div className="signupbox" />
        <div className="signon">
          {alertMessage && (
            <div
              className="notmatchpassword"
              style={{
                position: 'absolute',
                top: -270,
                backgroundColor: "transparent",
                color: "red",
                fontSize: "20px",
                width: 30,
                whiteSpace: 'nowrap',
                left: alertMessage === "Must choose an account type" ? -350 : -330
              }}
            >
              {alertMessage}
            </div>
          )}
          <form onSubmit={this.handleSubmit}>
            <label>
              <input
                className="emailinputbar"
                name="email"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              <input
                className="passwordinputbar"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              <input
                className="verifypasswordinputbar"
                name="passwordVerify"
                type="password"
                placeholder="Verify Password"
                value={this.state.passwordVerify}
                onChange={this.handleInputChange}
              />
            </label>
            <label className="radiothriftlabel">
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
            <label className="radiohomelesslabel">
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
                position: "absolute",
                display: "flex",
                color: "#F7F3F3",
                fontFamily: "Noto Sans",
                fontSize: 15,
                fontStyle: "normal",
                fontWeight: 700,
                textAlign: "center",
                height: 30,
                left: -388,
                top: 34,
                width: 312,
                textTransform: "none",
                bgcolor: "#24a0ed",
                ":hover": {
                  bgcolor: "#0792e8",
                  color: "#F7F3F3",
                  textTransform: "none"
                }
              }}
            >
              Sign up
            </Button>
          </form>
        </div>
        <div className="oroption">or</div>
        <Button
          type="text"
          sx={{
            position: "absolute",
            display: "flex",
            color: "#F7F3F3",
            fontFamily: "Noto Sans",
            fontSize: 15,
            fontStyle: "normal",
            fontWeight: 700,
            textAlign: "center",
            height: 30,
            left: 612,
            top: 601,
            width: 312,
            textTransform: "none",
            bgcolor: "#5ab0f2",
            ":hover": {
              bgcolor: "#4baaf2",
              color: "#F7F3F3",
              textTransform: "none"
            }
          }}
          onClick={handleLoginClick}
        >
          Click here to login instead!
        </Button>
        <Link to="/">
          <SignupLogo />
        </Link>
        <div className="singupwelcometo">Sign up</div>
        <div className="choicebetweenaccounts">Choose your account type:</div>
      </div>
    );
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

export default Signup;


