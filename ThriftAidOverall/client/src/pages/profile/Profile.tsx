import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfile } from "../../actions/authActions";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Fade, Card } from "@mui/material";
import ProfileLogo from "./Profilepagelogo.tsx";
import { setCurrentUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles"; // Import styled from the correct location
import { useTheme } from "@mui/material/styles";

interface ProfileUser {
  establishmentname?: string;
  website?: string;
  phonenumber?: string;
}

interface ProfileProps {
  auth: any;
  updateProfile: (profileData: any) => void;
  setCurrentUser: (userData: any) => void;
  errors: any;
}

const theAlert = () => {
  Swal.fire("Good job!", "Your profile was updated successfully", "success");
};

const EstablishmentInput = styled("h4")(({ theme }) => ({
  position: "absolute",
  fontWeight: 10,
  [theme.breakpoints.up("xs")]: {
    fontSize: "2.25vh",
    left: "37.1%",
    top: "37.5%",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.1vh",
    left: "41.2%",
    top: "37.5%",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "37.5%",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "37.5%",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "37.5%",
  },
}));

const WebsiteInput = styled("h4")(({ theme }) => ({
  position: "absolute",
  fontWeight: 10,
  [theme.breakpoints.up("xs")]: {
    fontSize: "2.25vh",
    left: "37.1%",
    top: "46.5%",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.1vh",
    left: "41.2%",
    top: "46.5%",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "46.5%",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "46.5%",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "46.5%",
  },
}));

const PhoneInput = styled("h4")(({ theme }) => ({
  position: "absolute",
  fontWeight: 10,
  [theme.breakpoints.up("xs")]: {
    fontSize: "2.25vh",
    left: "37.1%",
    top: "55.5%",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.1vh",
    left: "41.2%",
    top: "55.5%",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "55.5%",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "55.5%",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "2.25vh",
    left: "41.2%",
    top: "55.5%",
  },
}));

const SignIn = styled("div")(({ theme }) => ({
  position: "absolute",
  fontFamily: "Open sans",
  [theme.breakpoints.up("xs")]: {
    left: "55.4%",
    top: "32.4%",
    fontSize: "2.5vh",
  },
  [theme.breakpoints.up("sm")]: {
    left: "51%",
    top: "32%",
    fontSize: "2.5vh",
  },
  [theme.breakpoints.up("md")]: {
    left: "52.2%",
    top: "31%",
    fontSize: "2.5vh",
  },
  [theme.breakpoints.up("lg")]: {
    left: "49%",
    top: "31%",
    fontSize: "2.5vh",
  },
  [theme.breakpoints.up("xl")]: {
    left: "48.7%",
    top: "31%",
    fontSize: "2.5vh",
  },
}));

const EmailInput = styled("input")(({ theme }) => ({
  borderRadius: "3px",
  position: "fixed",
  borderWidth: "0.5px",
  borderColor: "#a9a9a9",
  textIndent: "5px",
  "::placeholder": {
    position: "relative",
    fontSize: "22px",
    fontWeight: "10",
    left: "0%",
    top: "7%",
  },
  ":focus": {
    outline: 0,
    border: "3px solid #24a0ed",
  },
  [theme.breakpoints.up("xs")]: {
    top: "42%",
    left: "30.5%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "60.2vw",
    height: "5vh",
  },
  [theme.breakpoints.up("sm")]: {
    top: "40%",
    left: "36%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "35.2vw",
    height: "5vh",
  },
  [theme.breakpoints.up("md")]: {
    top: "40%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "28.1vw",
    height: "5vh",
  },
  [theme.breakpoints.up("lg")]: {
    top: "40%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "22vw",
    height: "5vh",
  },
  [theme.breakpoints.up("xl")]: {
    top: "40%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "20.2vw",
    height: "5vh",
  },
}));

const UserInput = styled("input")(({ theme }) => ({
  borderRadius: "3px",
  position: "fixed",
  borderWidth: "0.5px",
  borderColor: "#a9a9a9",
  textIndent: "5px",
  "::placeholder": {
    position: "relative",
    fontSize: "22px",
    fontWeight: "10",
    left: "0%",
    top: "7%",
  },
  ":focus": {
    outline: 0,
    border: "3px solid #24a0ed",
  },
  [theme.breakpoints.up("xs")]: {
    top: "49%",
    left: "30.5%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "60.2vw",
    height: "5vh",
  },
  [theme.breakpoints.up("sm")]: {
    top: "47.5%",
    left: "36%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "35.2vw",
    height: "5vh",
  },
  [theme.breakpoints.up("md")]: {
    top: "47.5%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "28.1vw",
    height: "5vh",
  },
  [theme.breakpoints.up("lg")]: {
    top: "47.5%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "22vw",
    height: "5vh",
  },
  [theme.breakpoints.up("xl")]: {
    top: "47.5%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "20.2vw",
    height: "5vh",
  },
}));

const UserInputV2 = styled("input")(({ theme }) => ({
  borderRadius: "3px",
  position: "fixed",
  borderWidth: "0.5px",
  borderColor: "#a9a9a9",
  textIndent: "5px",
  "::placeholder": {
    position: "relative",
    fontSize: "22px",
    fontWeight: "10",
    left: "0%",
    top: "7%",
  },
  ":focus": {
    outline: 0,
    border: "3px solid #24a0ed",
  },
  [theme.breakpoints.up("xs")]: {
    top: "56%",
    left: "30.5%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "60.2vw",
    height: "5vh",
  },
  [theme.breakpoints.up("sm")]: {
    top: "55%",
    left: "36%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "35.2vw",
    height: "5vh",
  },
  [theme.breakpoints.up("md")]: {
    top: "55%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "28.1vw",
    height: "5vh",
  },
  [theme.breakpoints.up("lg")]: {
    top: "55%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "22vw",
    height: "5vh",
  },
  [theme.breakpoints.up("xl")]: {
    top: "55%",
    left: "40%",
    fontSize: "3vh",
    fontWeight: "10",
    width: "20.2vw",
    height: "5vh",
  },
}));

const Profile: React.FC<ProfileProps> = ({
  auth,
  updateProfile,
  errors,
  setCurrentUser,
}) => {
  const { user, isAuthenticated } = auth;
  const [establishmentname, setEstablishment] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [profileErrors, setProfileErrors] = useState<any>({});
  const [profile, setProfileUser] = useState<string>("");
  const [contentProfile, setContentProfile] = useState<string>("yes");

  const notContent = () => {
    setContentProfile("no");
  };

  const yesContent = () => {
    setContentProfile("yes");
  };

  const formatPhoneNumber = (inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, "");
    const phoneNumberRegex = /^(\d{3})(\d{3})(\d{4})$/;
    const formattedValue = numericValue.replace(phoneNumberRegex, "($1)-$2-$3");
    return formattedValue;
  };

  const setPhoneNumberFormatted = (inputValue: string) => {
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setPhonenumber(formattedPhoneNumber);
  };

  const UpdateProfileButton: React.FC = () => {
    const theme = useTheme();

    const buttonStyles = {
      position: "absolute",
      display: "flex",
      color: "#F7F3F3",
      fontFamily: "Noto Sans",
      textAlign: "center",
      fontStyle: "normal",
      fontWeight: 700,
      textTransform: "none",
      bgcolor: "#24a0ed",
      ":hover": {
        bgcolor: "#0792e8",
        color: "#F7F3F3",
        textTransform: "none",
      },
      [theme.breakpoints.up("xs")]: {
        fontSize: "1.5vh",
        height: "4.5vh",
        left: "37.2%",
        top: "67%",
        width: "49.2vw",
      },
      [theme.breakpoints.up("sm")]: {
        fontSize: "1.5vh",
        height: "4.5vh",
        left: "41.1%",
        top: "67%",
        width: "26.6vw",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "1.5vh",
        height: "4.5vh",
        left: "41.1%",
        top: "67%",
        width: "26.7vw",
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: "1.5vh",
        height: "4.5vh",
        left: "41.1%",
        top: "67%",
        width: "20.7vw",
      },
      [theme.breakpoints.up("xl")]: {
        fontSize: "1.5vh",
        height: "4.5vh",
        left: "41.1%",
        top: "67%",
        width: "18.9vw",
      },
    };

    return (
      <Button type="submit" sx={buttonStyles} onClick={notContent}>
        Want to create/update your profile? Click here!
      </Button>
    );
  };

  const CreateProfileButton: React.FC = () => {
    const theme= useTheme();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onSubmit(e as any); // Calling the onSubmit function with proper type casting
    };

    return (
      <Button
            type="submit"
            sx={{
              position: "absolute",
              display: "flex",
              color: "#F7F3F3",
              fontFamily: "Noto Sans",
              fontStyle: "normal",
              textTransform: "none",
              textAlign: "center",
              bgcolor: "#24a0ed",
              ":hover": {
              bgcolor: "#0792e8",
              color: "#F7F3F3",
              textTransform: "none",
              },
              [theme.breakpoints.up('xs')]: {
                fontSize: '2vh',
                fontWeight: 700,
                height: "5%",
                left: "30.8%",
                top: "67%",
                width: "61.5%",
              },
              [theme.breakpoints.up('sm')]: {
                fontSize: '2vh',
                fontWeight: 700,
                height: "5%",
                left: "36.2%",
                top: "67%",
                width: "35.7%",
              },
              [theme.breakpoints.up('md')]: {
                fontSize: '2vh',
                fontWeight: 700,
                height: "5%",
                left: "40.1%",
                top: "67%",
                width: "28.5%",
              },
              [theme.breakpoints.up('lg')]: {
                fontSize: '2vh',
                fontWeight: 700,
                height: "5%",
                left: "40.1%",
                top: "67%",
                width: "22.3%",
              },
              [theme.breakpoints.up('xl')]: {
                fontSize: '2vh',
                fontWeight: 700,
                height: "5%",
                left: "40.1%",
                top: "67%",
                width: "20.5%",
              },
            }}
            onClick={handleClick}
          >
            Click here to create/update profile!
          </Button>
      
    );
  };

  const SignupBox = styled(Card)(({ theme }) => ({
    position: "absolute",
    display: "inline-block",
    borderRadius: "2%",
    background: "white",
    boxShadow: "0px 4px 30px rgba(0.1, 0.1, 0.1, 0.25)",
    [theme.breakpoints.up("xs")]: {
      width: "66%",
      height: "60%",
      top: "21%",
      left: "28.3%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "38%",
      height: "60%",
      top: "21%",
      left: "35%",
    },
    [theme.breakpoints.up("md")]: {
      width: "30%",
      height: "60%",
      top: "21%",
      left: "39.3%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "24%",
      height: "60%",
      top: "21%",
      left: "39.3%",
    },
    [theme.breakpoints.up("xl")]: {
      width: "22%",
      height: "60%",
      top: "21%",
      left: "39.3%",
    },
  }));

  useEffect(() => {
    setProfileErrors(errors);
  }, [errors]);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    } else if (isAuthenticated && user) {
      fetchProfile(user.email);
    }
  }, [isAuthenticated, user, setCurrentUser]);

  const fetchProfile = (email: string) => {
    axios
      .get(`https://thriftaid-39eb36def246.herokuapp.com/api/users/profile?email=${email}`)
      .then((res) => {
        const profile = res.data;
        if (profile) {
          setProfileUser(profile);
          setEstablishment(profile.establishmentname || "");
          setWebsite(profile.website || "");
          setPhonenumber(profile.phonenumber || "");
        }
      })
      .catch((err) => {
        console.log("Error while fetching profile:", err);
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedProfile = {
      establishmentname,
      website,
      phonenumber,
      email: user.email,
    };

    updateProfile(updatedProfile);

    const updatedUser = {
      ...(user || {}),
      establishmentname,
      website,
      phonenumber,
    };
    setCurrentUser(updatedUser);
    setTimeout(theAlert, 500);
    yesContent();
  };

  return (
    <div>
      {contentProfile === "yes" ? (
        <div>
          <SignupBox />
          <Link to="/">
            <ProfileLogo />
          </Link>
          <SignIn>Profile</SignIn>
          <UpdateProfileButton />

          <EstablishmentInput>
            Establishment Name: {user.establishmentname || ""}
          </EstablishmentInput>
          <WebsiteInput>Website: {user.website || ""}</WebsiteInput>
          <PhoneInput>
            Phone Number: {formatPhoneNumber(user.phonenumber) || ""}
          </PhoneInput>
        </div>
      ) : (
        <Fade in={true}>
          <div className="profile">
            <SignupBox />
            <Link to="/">
              <ProfileLogo />
            </Link>
            <SignIn>Profile</SignIn>
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Profile</h1>
                  <form onSubmit={onSubmit}>
                    <EmailInput
                      placeholder="Establishment Name"
                      name="establishmentname"
                      value={establishmentname}
                      onChange={(e) => setEstablishment(e.target.value)}
                      onError={profileErrors.establishmentname}
                    />
                    <span className="inputerror">
                      {profileErrors.establishmentname}
                    </span>
                    <UserInput
                      placeholder="Website"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      onError={profileErrors.website}
                    />
                    <span className="inputerror">{profileErrors.website}</span>
                    <UserInputV2
                      placeholder="Phone Number"
                      name="phonenumber"
                      value={formatPhoneNumber(phonenumber)}
                      onChange={(e) => setPhoneNumberFormatted(e.target.value)}
                      onError={profileErrors.phonenumber}
                    />
                    <span className="inputerror">
                      {profileErrors.phonenumber}
                    </span>
                    <CreateProfileButton />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateProfile, setCurrentUser })(
  Profile
);
