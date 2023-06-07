import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../actions/authActions.js";
import classnames from "classnames";

function Register({ registerUser, auth, errors }) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    usertype: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, navigate]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, errors }));
  }, [errors]);

  const onChange = (e) => {
    setState((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      usertype: state.usertype,
      email: state.email,
      password: state.password,
      password2: state.password2
    };
    registerUser(newUser, navigate);
  };

  return (
    <div className="container">
      {/* Rest of the component code */}
    </div>
  );
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
