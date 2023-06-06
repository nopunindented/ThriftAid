import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import SignupLogo from "./account/signuppageform/Signuppagelogo";

const handleLoginClick = () => {
  window.location.href = "http://localhost:4000/login";
};

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    usertype: "",
  });
  const { email, password, usertype } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      usertype: "",
    });
  };

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <div>
          <label >
          <input
            className="emailinputbar"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleOnChange}
          />
          </label>
        </div>
        <div>
           <label className="radiothriftlabel">
              <input
                className="thriftradio"
                name="usertype"
                type="radio"
                value="Thrift Store"
                checked={usertype === "Thrift Store"}
                onChange={handleOnChange}
              />
              Thrift Store
            </label>
            <label className="radiohomelesslabel">
              <input
                className="homelessradio"
                name="usertype"
                type="radio"
                value="Homeless Shelter"
                checked={usertype === "Homeless Shelter"}
                onChange={handleOnChange}
              />
              Homeless Shelter
            </label>
            </div>
        <div>
          <label>
          <input
            className="passwordinputbar"
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
          </label>
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
                left: 612,
                top: 535,
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

      <ToastContainer />
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
    </div>
  );
};

export default Signup