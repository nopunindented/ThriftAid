import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../actions/authActions";
import { Button, Card } from "@mui/material";
import  LoginLogo from "./Loginpagelogo.tsx";
import { styled } from "@mui/material/styles"; // Import styled from the correct location
import Typography from "@mui/material/Typography"; // Import Typography
import { useTheme } from "@mui/material/styles";

const handleSignupClick = () => {
  window.location.href = "http://localhost:3000/register";
};

const handleAlreadyLogged = () => {
  window.location.href = "http://localhost:3000/dashboard";
};

const SignupBox = styled(Card)(({ theme }) => ({
  position: 'absolute',
  display: 'inline-block',
  borderRadius: '2%',
  background: 'white',
  boxShadow: '0px 4px 30px rgba(0.1, 0.1, 0.1, 0.25)',
  [theme.breakpoints.up('xs')]: {
    width: '66%',
    height: '60%',
    top: '21%',
    left: '28.3%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '38%',
    height: '60%',
    top: '21%',
    left: '35%',
  },
  [theme.breakpoints.up('md')]: {
    width: '30%',
    height: '60%',
    top: '21%',
    left: '39.3%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '24%',
    height: '60%',
    top: '21%',
    left: '39.3%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '22%',
    height: '60%',
    top: '21%',
    left: '39.3%',
  },
}));

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
    top: '50%',
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


const OrOption = styled('div')(({ theme }) => ({
  position: 'absolute',
  color: '#919394',
  [theme.breakpoints.up('xs')]: {
    top: '66%',
    left: '60.1%',
    fontSize: '2.4vh',
    fontWeight: 50,
    width: '35.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('sm')]: {
    top: '59.5%',
    left: '53%',
    fontSize: '2.4vh',
    fontWeight: 50,
    width: '35.2vw',
    height: '5vh',
  },
  [theme.breakpoints.up('md')]: {
    left: '53.8%',
    top: '60%',
    fontSize: '2.1vh',
    fontWeight: 20,
  },
  [theme.breakpoints.up('lg')]: {
    left: '50.8%',
    top: '60%',
    fontSize: '2.1vh',
    fontWeight: 20,
  },
  [theme.breakpoints.up('xl')]: {
    left: '49.8%',
    top: '60%',
    fontSize: '2.1vh',
    fontWeight: 20,
  },
}));

const SignIn = styled('div')(({ theme }) => ({
  position: 'absolute',
  fontFamily: 'Open sans',
  [theme.breakpoints.up('xs')]: {
    left: '55.2%',
    top: '32.4%',
    fontSize: '2.5vh'
  },
  [theme.breakpoints.up('sm')]: {
    left: '50.8%',
    top: '32%',
    fontSize: '2.5vh'
  },
  [theme.breakpoints.up('md')]: {
    left: '52%',
    top: '31%',
    fontSize: '2.5vh'
  },
  [theme.breakpoints.up('lg')]: {
    left: '49%',
    top: '31%',
    fontSize: '2.5vh'
  },
  [theme.breakpoints.up('xl')]: {
    left: '48.5%',
    top: '31%',
    fontSize: '2.5vh'
  },
}));

const DashboardButton: React.FC = () => {
  return (
    <Button
      type="button"
      sx={{
        position: "absolute",
        display: "flex",
        color: "#F7F3F3",
        fontFamily: "Noto Sans",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: 700,
        textAlign: "center",
        height: "5%",
        left: "42%",
        top: "61%",
        width: "17%",
        textTransform: "none",
        bgcolor: "#24a0ed",
        ":hover": {
          bgcolor: "#0792e8",
          color: "#F7F3F3",
          textTransform: "none",
        },
      }}
      onClick={handleAlreadyLogged}
    >
      Dashboard
    </Button>
  );
};

const LoggedInEmailStyle = styled('div')(({ theme }) => ({
  position: 'absolute',
  fontWeight: 600,
  color: '#000000',
  textAlign: 'center',
  fontFamily: 'Uber Move Text',
  [theme.breakpoints.up('xs')]: {
    top: '33.5%',
    left: '35%',
    fontSize: '3.1vh',
    width: '55vw',
  },
  [theme.breakpoints.up('sm')]: {
    top: '33.5%',
    left: '40.3%',
    fontSize: '3.1vh',
    width: '28vw',
  },
  [theme.breakpoints.up('md')]: {
    top: '33.5%',
    left: '40.5%',
    fontSize: '3.1vh',
    width: '28vw',
  },
  [theme.breakpoints.up('lg')]: {
    top: '33.5%',
    left: '42.4%',
    fontSize: '3.3vh',
    width: '18vw',
  },
  [theme.breakpoints.up('xl')]: {
    top: '36%',
    left: '41.55%',
    fontSize: '3.3vh',
    width: '18vw',
  },
}));



interface LoginProps {
  loginUser: (userData: any, navigate: any) => void;
  logoutUser: () => void;
  auth: any;
  errors: any;
}

const Login: React.FC<LoginProps> = ({
  loginUser,
  logoutUser,
  auth,
  errors,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState<any>({});
  const [loggedInEmail, setLoggedInEmail] = useState("");

  const theme= useTheme();

  useEffect(() => {
    setLoginErrors(errors);
  }, [errors]);

  const onLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    setLoginErrors(errors);

    const savedEmail = localStorage.getItem("loggedInEmail");
    if (savedEmail) {
      setLoggedInEmail(savedEmail);
    }
  }, [errors]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };
    loginUser(userData, navigate);
    setLoggedInEmail(email);
    localStorage.setItem("loggedInEmail", email);
  };
  return (
    <div className="container">
      {auth.isAuthenticated ? (
        <div>
          <SignupBox />
          <LoggedInEmailStyle>
            Hi {loggedInEmail}, you're already logged in!
          </LoggedInEmailStyle>
          <div className="loggedinemaildashboard">
            You can go to your dashboard or logout:
          </div>
          <DashboardButton />
          <Button
            type="submit"
            sx={{
              position: "absolute",
              display: "flex",
              color: "#F7F3F3",
              fontFamily: "Noto Sans",
              fontStyle: "normal",
              textTransform: "none",
              bgcolor: "#5ab0f2",
              ":hover": {
                bgcolor: "#4baaf2",
                color: "#F7F3F3",
                textTransform: "none",
              },
              [theme.breakpoints.up('xs')]: {
                fontSize: '5vh',
                fontWeight: 700,
                textAlign: "center",
                height: "5%",
                left: "42%",
                top: "67%",
                width: "17%",
              },
              [theme.breakpoints.up('sm')]: {
                fontSize: '5vh',
                fontWeight: 700,
                textAlign: "center",
                height: "5%",
                left: "42%",
                top: "67%",
                width: "17%",
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '5vh',
                fontWeight: 700,
                textAlign: "center",
                height: "5%",
                left: "42%",
                top: "67%",
                width: "17%",
              },
              [theme.breakpoints.up('lg')]: {
                fontSize: '5vh',
                fontWeight: 700,
                textAlign: "center",
                height: "5%",
                left: "42%",
                top: "67%",
                width: "17%",
              },
              [theme.breakpoints.up('xl')]: {
                fontSize: '5vh',
                fontWeight: 700,
                textAlign: "center",
                height: "5%",
                left: "42%",
                top: "67%",
                width: "17%",
              },
            }}
            onClick={onLogoutClick}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="container">
          <SignupBox />
          <SignIn>Sign in</SignIn>
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}></div>
              <form noValidate onSubmit={onSubmit}>
                <div className="input-field col s12">
                  <EmailInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    onError={loginErrors.email}
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                  <span className="inputerror">
                    {loginErrors.email || loginErrors.emailnotfound}
                  </span>
                </div>
                <div className="input-field col s12">
                  <UserInput
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onError={loginErrors.password}
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                  <span className="inputerror">
                    {loginErrors.password || loginErrors.passwordincorrect}
                  </span>
                </div>
                <Button
                  type="submit"
                  sx={{
                    position: "absolute",
                    display: "flex",
                    color: "#F7F3F3",
                    fontFamily: "Noto Sans",
                    fontStyle: "normal",
                    fontWeight: 700,
                    textAlign: "center",
                    textTransform: "none",
                    bgcolor: "#24a0ed",
                    ":hover": {
                      bgcolor: "#0792e8",
                      color: "#F7F3F3",
                      textTransform: "none",
                    },
                    [theme.breakpoints.up('xs')]: {
                      fontSize: '2.3vh',
                      height: "4.5vh",
                      left: "31%",
                      top: "61.5%",
                      width: "61.4vw",
                    },
                    [theme.breakpoints.up('sm')]: {
                      fontSize: '2.3vh',
                      height: "4.5vh",
                      left: "36%",
                      top: "55%",
                      width: "36vw",
                    },
                    [theme.breakpoints.up('md')]: {
                      fontSize: '2.3vh',
                      height: "4.5vh",
                      left: "40%",
                      top: "55%",
                      width: "28.7vw",
                    },
                    [theme.breakpoints.up('lg')]: {
                      fontSize: '2.3vh',
                      height: "4.5vh",
                      left: "40%",
                      top: "55%",
                      width: "22.5vw",
                    },
                    [theme.breakpoints.up('xl')]: {
                      fontSize: '2.3vh',
                      height: "4.5vh",
                      left: "40%",
                      top: "55%",
                      width: "20.7vw",
                    },
                  }}
                >
                  Login
                </Button>
                <OrOption>or</OrOption>
                <Link to="/">
                  <LoginLogo />
                </Link>
              </form>
              <Button
                type="button"
                sx={{
                  position: "absolute",
                  display: "flex",
                  color: "#F7F3F3",
                  fontFamily: "Noto Sans",
                  fontStyle: "normal",
                  fontWeight: 700,
                  textAlign: "center",
                  textTransform: "none",
                  bgcolor: "#5ab0f2",
                  ":hover": {
                    bgcolor: "#4baaf2",
                    color: "#F7F3F3",
                    textTransform: "none",
                  },
                  [theme.breakpoints.up('xs')]: {
                    fontSize: '2.3vh',
                    height: "4.5vh",
                    left: "31%",
                    top: "69.8%",
                    width: "61.4vw",
                  },
                  [theme.breakpoints.up('sm')]: {
                    fontSize: '2.3vh',
                    height: "4.5vh",
                    left: "36%",
                    top: "63.8%",
                    width: "36vw",
                  },
                  [theme.breakpoints.up('md')]: {
                    fontSize: '2.3vh',
                    height: "4.5vh",
                    left: "40%",
                    top: "63.8%",
                    width: "28.7vw",
                  },
                  [theme.breakpoints.up('lg')]: {
                    fontSize: '2.3vh',
                    height: "4.5vh",
                    left: "40%",
                    top: "63.8%",
                    width: "22.5vw",
                  },
                  [theme.breakpoints.up('xl')]: {
                    fontSize: '2.3vh',
                    height: "4.5vh",
                    left: "40%",
                    top: "63.8%",
                    width: "20.7vw",
                  },
                }}
                onClick={handleSignupClick}
              >
                Click here to sign up instead!
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser, logoutUser })(Login);
