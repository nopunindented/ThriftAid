import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";
import { Button } from "@mui/material";
import LoginLogo from "./Loginpagelogo";


const handleSignupClick = () => {
  window.location.href = "http://localhost:3000/register";
};

const Login = ({ loginUser, auth, errors }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});
  useEffect(() => {
    setLoginErrors(errors);
  }, [errors]);
  
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    };

    loginUser(userData, navigate);
  };

  return (
    <div className="container">
      <div className="signupbox" />
      <div className="loginwelcometoo">Sign in</div>
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                error={loginErrors.email}
                id="email"
                type="email"
                className="emailinputbar"
                placeholder="Email"
              />
              <span className="inputerror">
                {loginErrors.email}
                {loginErrors.emailnotfound}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                error={loginErrors.password}
                id="password"
                type="password"
                placeholder="Password"
                className="passwordinputbar"
              />
              <span className="inputerror">
                {loginErrors.password}
                {loginErrors.passwordincorrect}
              </span>
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
                top: "55%",
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
              Login
            </Button>
            <div className="loginoroption">or</div>
            <Link to="/">
              <LoginLogo />
            </Link>
          </form>
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
            top: "64%",
            width: 317,
            textTransform: "none",
            bgcolor: "#5ab0f2",
            ":hover": {
              bgcolor: "#4baaf2",
              color: "#F7F3F3",
              textTransform: "none"
            }
          }}
          onClick={handleSignupClick}
        >
          Click here to sign up instead!
        </Button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
