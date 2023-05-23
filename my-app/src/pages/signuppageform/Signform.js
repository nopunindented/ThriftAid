import React from "react";
import { useState } from "react";
import { render } from "react-dom";
import validator from "validator";

export default function SignupForm() {
  const [message, setMessage] = useState(false);
  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setMessage(true);
    } else {
      setMessage(false);
    }
  };

  // Setting inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Setting input error handlers
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Email change handler
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Password change handler
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setError(true);
      setMessage("Please enter all the fields");
    } else if (!validateEmail(email)) {
      setError(true);
      return(
        <h1 className="invalidemail">put a proper email</h1>
      )
    } else {
      setSubmitted(true);
      setError(false);
      setMessage("User successfully registered!!");
    }
  };

  const successMessage = () => {
    return (
      <div className="success" style={{ display: submitted ? "" : "none" }}>
        <h1>{message}</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? "" : "none" }}>
        <h1>{message}</h1>
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
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          type="password"
        />

        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
