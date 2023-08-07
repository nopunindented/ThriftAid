import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import SignupLogo from "./Signuppagelogo";
import Swal from 'sweetalert2';

interface Errors {
  usertype: string;
  email: string;
  password: string;
  password2: string;
}

interface NewUser {
  usertype: string;
  email: string;
  password: string;
  password2: string;
  establishmentname: string;
  phonenumber: string;
  website: string;
  errors: Errors; // Include errors in NewUser interface
}

const Register: React.FC<any> = ({ registerUser }: any) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const reduxErrors = useSelector((state: any) => state.errors);

  const [state, setState] = useState<NewUser>({
    usertype: "",
    email: "",
    password: "",
    password2: "",
    establishmentname: "",
    phonenumber: "",
    website: "",
    errors: reduxErrors // Initialize errors from Redux store
  });

  useEffect(() => {
    if (reduxErrors !== state.errors) {
      setState((prevState) => ({ ...prevState, errors: reduxErrors }));
    }
  }, [reduxErrors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'usertype') {
      setState((prevState) => ({ ...prevState, usertype: e.target.value }));
    } else {
      setState((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: NewUser = {
      usertype: state.usertype,
      email: state.email,
      password: state.password,
      password2: state.password2,
      establishmentname: "",
      phonenumber: "",
      website: "",
      errors: state.errors
    };

    registerUser(newUser);
  };

  const handleLoginClick = () => {
    window.location.href = "http://localhost:3000/login";
  };

  const theAlert = () => {
    Swal.fire('Good job!', 'Your profile was updated successfully', 'success');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="typeofaccountoutline"></div>
        <div className="choicebetweenaccounts">Choose your account type:</div>
        <div className="col s8 offset-s2">
          <form noValidate onSubmit={handleSubmit}>
            <label className="radiothriftlabel">
              <input
                className="thriftradio"
                onChange={handleChange}
                value="thrift store"
                id="thrift"
                name="usertype"
                type="radio"
                checked={state.usertype === "thrift store"}
              />
              Thrift Store
              <div className="inputerrors">{state.errors.usertype}</div>
            </label>
            <label className="radiohomelesslabel">
              <input
                className="homelessradio"
                onChange={handleChange}
                value="homeless shelter"
                id="homeless"
                name="usertype"
                type="radio"
                checked={state.usertype === "homeless shelter"}
              />
              Homeless Shelter
              <div className="inputerrors">{state.errors.usertype}</div>
            </label>
            <div>
              <input
                onChange={handleChange}
                value={state.email}
                id="email"
                type="email"
                placeholder="Email"
                className="emailinputbar"
              />
              <div className="inputerrors">{state.errors.email}</div>
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={state.password}
                id="password"
                type="password"
                placeholder="Password"
                className="passwordinputbar"
              />
              <div className="inputerrors">{state.errors.password}</div>
            </div>
            <div className="input-field col s12">
              <input
                onChange={handleChange}
                value={state.password2}
                id="password2"
                type="password"
                className="verifypasswordinputbar"
                placeholder="Verify Password"
              />
              <div className="inputerrors">{state.errors.password2}</div>
            </div>
            <Button
              variant="text"
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
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </form>
        </div>
        <div className="oroption">or</div>
        <Button
          variant="text"
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
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);