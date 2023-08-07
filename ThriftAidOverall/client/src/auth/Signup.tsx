import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import { Button, InputLabel, Radio } from "@mui/material";
import SignupLogo from "./Signuppagelogo";
import Swal from 'sweetalert2';
import { styled } from "@mui/material/styles"; // Import styled from the correct location
import Typography from "@mui/material/Typography"; // Import Typography
import { useTheme } from "@mui/material/styles";

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


const EmailInput = styled('input')(({ theme }) => ({
  borderRadius: '3px',
  position: 'fixed',
  borderWidth: '0.5px',
  borderColor: '#a9a9a9',
  textIndent: '5px',
  '::placeholder' : {
    position: 'relative',
    fontSize: '22px',
    fontWeight: '10',
    left: '0%',
    top: '7%',
  },
  ":focus" : {
    outline: 0,
    border: '3px solid #24a0ed',
  },
  [theme.breakpoints.up('xs')]: {
    top: '42%',
    left: '30.5%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '60.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('sm')]: {
    top: '40%',
    left: '36%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '35.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('md')]: {
    top: '40%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '28.1vw',
    height: '5vh',
  },
  [theme.breakpoints.up('lg')]: {
    top: '40%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '22vw',
    height: '5vh',
  },
  [theme.breakpoints.up('xl')]: {
    top: '40%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '20.2vw',
    height: '5vh',
  },
}));

const UserInput = styled('input')(({ theme }) => ({
  borderRadius: '3px',
  position: 'fixed',
  borderWidth: '0.5px',
  borderColor: '#a9a9a9',
  textIndent: '5px',
  '::placeholder' : {
    position: 'relative',
    fontSize: '22px',
    fontWeight: '10',
    left: '0%',
    top: '7%',
  },
  ":focus" : {
    outline: 0,
    border: '3px solid #24a0ed',
  },
  [theme.breakpoints.up('xs')]: {
    top: '49%',
    left: '30.5%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '60.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('sm')]: {
    top: '47.5%',
    left: '36%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '35.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('md')]: {
    top: '47.5%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '28.1vw',
    height: '5vh',
  },
  [theme.breakpoints.up('lg')]: {
    top: '47.5%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '22vw',
    height: '5vh',
  },
  [theme.breakpoints.up('xl')]: {
    top: '47.5%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '20.2vw',
    height: '5vh',
  },
}));

const UserInputV2 = styled('input')(({ theme }) => ({
  borderRadius: '3px',
  position: 'fixed',
  borderWidth: '0.5px',
  borderColor: '#a9a9a9',
  textIndent: '5px',
  '::placeholder' : {
    position: 'relative',
    fontSize: '22px',
    fontWeight: '10',
    left: '0%',
    top: '7%',
  },
  ":focus" : {
    outline: 0,
    border: '3px solid #24a0ed',
  },
  [theme.breakpoints.up('xs')]: {
    top: '56%',
    left: '30.5%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '60.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('sm')]: {
    top: '55%',
    left: '36%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '35.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('md')]: {
    top: '55%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '28.1vw',
    height: '5vh',
  },
  [theme.breakpoints.up('lg')]: {
    top: '55%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '22vw',
    height: '5vh',
  },
  [theme.breakpoints.up('xl')]: {
    top: '55%',
    left: '40%',
    fontSize: '3vh',
    fontWeight: '10',
    width: '20.2vw',
    height: '5vh',
  },
}));



const RadioBar = styled('div')(({ theme }) => ({
  position: 'absolute',
  background: 'transparent',
  borderRadius: '3px',
  border: '0.1px solid #a9a9a9',
  [theme.breakpoints.up('xs')]: {
    left: '31.5%',
    top: '73.5%',
    width: '60.8%',
    height: '8.7vh',
  },
  [theme.breakpoints.up('sm')]: {
    left: '36.3%',
    top: '65.7%',
    width: '35.5%',
    height: '4.7vh',
  },
  [theme.breakpoints.up('md')]: {
    left: '40%',
    top: '65.7%',
    width: '28.5%',
    height: '4.5vh',
  },
  [theme.breakpoints.up('lg')]: {
    left: '40%',
    top: '65.7%',
    width: '22.2%',
    height: '4.5vh',
  },
  [theme.breakpoints.up('xl')]: {
    left: '40%',
    top: '65.7%',
    width: '20.5%',
    height: '4.5vh',
  },
}));

const ChooseAccount = styled('div')(({ theme }) => ({
  position: 'absolute',
  fontFamily: 'Open sans',
  [theme.breakpoints.up('xs')]: {
    left: '32%',
    top: '71%',
    fontSize: '12px',
  },
  [theme.breakpoints.up('sm')]: {
    left: '36.2%',
    top: '63%',
    fontSize: '12px',
  },
  [theme.breakpoints.up('md')]: {
    left: '40%',
    top: '63%',
    fontSize: '12px',
  },
  [theme.breakpoints.up('lg')]: {
    left: '40%',
    top: '63%',
    fontSize: '12px',
  },
  [theme.breakpoints.up('xl')]: {
    left: '40%',
    top: '63%',
    fontSize: '12px',
  },
}));

const SignUp = styled('div')(({ theme }) => ({
  position: 'absolute',
  fontFamily: 'Open sans',
  [theme.breakpoints.up('xs')]: {
    left: '55.2%',
    top: '26.5%',
    fontSize: '2.5vh'
  },
  [theme.breakpoints.up('sm')]: {
    left: '50.8%',
    top: '27%',
    fontSize: '2.5vh'
  },
  [theme.breakpoints.up('md')]: {
    left: '51.2%',
    top: '26.5%',
    fontSize: '2.5vh'
  },
  [theme.breakpoints.up('lg')]: {
    left: '49%',
    top: '25%',
    fontSize: '2.5vh'
  },
  [theme.breakpoints.up('xl')]: {
    left: '48.5%',
    top: '25%',
    fontSize: '2.5vh'
  },
}));

const OrOption = styled('div')(({ theme }) => ({
  position: 'absolute',
  color: '#919394',
  [theme.breakpoints.up('xs')]: {
    top: '89%',
    left: '60.1%',
    fontSize: '2.4vh',
    fontWeight: 50,
    width: '35.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('sm')]: {
    top: '77.5%',
    left: '53%',
    fontSize: '2.4vh',
    fontWeight: 50,
    width: '35.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('md')]: {
    left: '53.8%',
    top: '77.5%',
    fontSize: '2.1vh',
    fontWeight: 20,
  },
  [theme.breakpoints.up('lg')]: {
    left: '50.8%',
    top: '77.5%',
    fontSize: '2.1vh',
    fontWeight: 20,
  },
  [theme.breakpoints.up('xl')]: {
    left: '49.8%',
    top: '77.5%',
    fontSize: '2.1vh',
    fontWeight: 20,
  },
}));

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

  const theme= useTheme();

  return (
    <div className="container">
      <div className="row">
        <RadioBar />
        <ChooseAccount>Choose your account type:</ChooseAccount>
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
            </label>
            <div className="inputerrors">{state.errors.usertype}</div>
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
            </label>
            <div>
              <EmailInput
                onChange={handleChange}
                value={state.email}
                id="email"
                type="email"
                placeholder="Email"
              />
              <div className="inputerrors">{state.errors.email}</div>
            </div>
            <div className="input-field col s12">
              <UserInput
                onChange={handleChange}
                value={state.password}
                id="password"
                type="password"
                placeholder="Password"
              />
              <div className="inputerrors">{state.errors.password}</div>
            </div>
            <div className="input-field col s12">
              <UserInputV2
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
                textAlign: "center",
                fontFamily: "Noto Sans",
                fontStyle: "normal",
                fontSize: 15,
                fontWeight: 700,
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
                },
                [theme.breakpoints.up('xs')]: {
                  fontSize: "2.1vh",
                  fontWeight: 700,
                  height: "4.2vh",
                  left: "31.5%",
                  top: "85%",
                  width: "61.7vw",
                },
                [theme.breakpoints.up('sm')]: {
                  fontSize: "2.1vh",
                  fontWeight: 700,
                  height: "4.2vh",
                  left: "36.5%",
                  top: "73%",
                  width: "35.5vw",
                },
                [theme.breakpoints.up('md')]: {
                  fontSize: "2.1vh",
                  fontWeight: 700,
                  height: "4.2vh",
                  left: "40%",
                  top: "73%",
                  width: "28.7vw",
                },
                [theme.breakpoints.up('lg')]: {
                  fontSize: "2.1vh",
                  fontWeight: 700,
                  height: "4.2vh",
                  left: "40%",
                  top: "73%",
                  width: "22.4vw",
                },
                [theme.breakpoints.up('xl')]: {
                  fontSize: "2.1vh",
                  fontWeight: 700,
                  height: "4.2vh",
                  left: "40%",
                  top: "73%",
                  width: "20.7vw",
                },
              }}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </form>
        </div>
        <OrOption>or</OrOption>
        <Button
          variant="text"
          sx={{
            position: "absolute",
            display: "flex",
            color: "#F7F3F3",
            fontFamily: "Noto Sans",
            fontStyle: "normal",
            textAlign: "center",
            textTransform: "none",
            bgcolor: "#5ab0f2",
            ":hover": {
              bgcolor: "#4baaf2",
              color: "#F7F3F3",
              textTransform: "none"
            },
            [theme.breakpoints.up('xs')]: {
              fontSize: "2.1vh",
              fontWeight: 700,
              height: "4.2vh",
              left: "31.5%",
              top: "92.5%",
              width: "61.7vw",
            },
            [theme.breakpoints.up('sm')]: {
              fontSize: "2.1vh",
              fontWeight: 700,
              height: "4.2vh",
              left: "36.5%",
              top: "81.5%",
              width: "35.5vw",
            },
            [theme.breakpoints.up('md')]: {
              fontSize: "2.1vh",
              fontWeight: 700,
              height: "4.2vh",
              left: "40%",
              top: "81.5%",
              width: "28.7vw",
            },
            [theme.breakpoints.up('lg')]: {
              fontSize: "2.1vh",
              fontWeight: 700,
              height: "4.2vh",
              left: "40%",
              top: "81.5%",
              width: "22.4vw",
            },
            [theme.breakpoints.up('xl')]: {
              fontSize: "2.1vh",
              fontWeight: 700,
              height: "4.2vh",
              left: "40%",
              top: "81.5%",
              width: "20.7vw",
            },
          }}
          onClick={handleLoginClick}
        >
          Click here to login instead!
        </Button>
        <Link to="/">
          <SignupLogo />
        </Link>
        <SignUp>Sign up</SignUp>
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