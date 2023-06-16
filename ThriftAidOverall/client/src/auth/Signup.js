import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SignupLogo from "./Signuppagelogo.js";

const handleLoginClick = () => {
  window.location.href = "http://localhost:3000/login";
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      usertype: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  
  componentDidMount() {
    // If logged in and user navigates to Register page, redirect them to the dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  onChange = (e) => {
    if (e.target.name === 'usertype') {
      this.setState({ usertype: e.target.value });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    // Reset the alert to empty
    
    const newUser = {
      usertype: this.state.usertype,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
        <div className="typeofaccountoutline"></div>
        <div className="choicebetweenaccounts">Choose your account type:</div>
          <div className="col s8 offset-s2">
            <form noValidate onSubmit={this.onSubmit}>
            <label className="radiothriftlabel">
            <input
              className="thriftradio"
              onChange={this.onChange}
              value="thrift store"
              error={errors.usertype}
              id="thrift"
              name="usertype"
              type="radio"
              checked={this.state.usertype === "thrift store"}
            />
              Thrift Store
              <div className="inputerrors">{errors.usertype}</div>
            
            </label>
            <label className="radiohomelesslabel">
            <input
              className="homelessradio"
              onChange={this.onChange}
              value="homeless shelter"
              error={errors.usertype}
              id="homeless"
              name="usertype"
              type="radio"
              checked={this.state.usertype === "homeless shelter"}
            />
              Homeless Shelter
              <div className="inputerrors">{errors.usertype}</div>
            
            </label>
              <div>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="emailinputbar"
                />
                <div className="inputerrors">{errors.email}</div>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="passwordinputbar"
                />
                <div className="inputerrors">{errors.password}</div>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className="verifypasswordinputbar"
                  placeholder="Verify Password"
                />
                <div className="inputerrors">{errors.password2}</div>
              </div>
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
                left: "40%",
                top: "73%",
                width: 317,
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
            left: "40%",
            top: "81%",
            width: 317,
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
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);
