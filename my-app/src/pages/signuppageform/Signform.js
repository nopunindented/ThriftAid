import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import validator from "validator";
import Button from '@mui/material/Button';
import { AlignHorizontalRight } from "@mui/icons-material";

export default function SignupForm() {
  // Setting inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Setting input error handlers
  const [error, setError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Email change handler
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
    setInvalidEmail(false);
  };

  // Password change handler
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && !validator.isEmail(email)) {
      setInvalidEmail(true);
      setError(false);
    } else if (email === "" || password === "") {
      setError(true);
      setInvalidEmail(false);
    } else {
      setSubmitted(true);
      setError(false);
      setInvalidEmail(false);
    }
  };

  const successMessage = () => {
    return (
      <div className="success" style={{ display: submitted ? "" : "none" }}>
        <h1>User successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  const emailInvalidMessage = () => {
    return (
      <div className="message" style={{ display: invalidEmail ? "" : "none" }}>
        <h1>Please enter a valid email</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>Sign Up</h1>
      </div>

      {/* Calling the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
        {emailInvalidMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="emailheader">Email</label>
        <input onChange={handleEmail} className="inputemail" value={email} type="email" />

        <label className="passwordheader">Password</label>
        <input onChange={handlePassword} className="inputpassword" value={password} type="password" />

        <Button
      variant="contained"
      sx={{
        color: "#F7F3F3",
        bgcolor: "#24a0ed",
        fontFamily: 'Open Sans',
        fontSize: 25,
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'left',
        justifyContent: 'center',
        width: 100,
        height: 50,
        left: 5,
        top: 19,
        textTransform: 'none',
      }}
    onClick={handleSubmit}>
      Submit
    </Button>
      </form>
    </div>
  );
}