import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, logoutUser } from "../../actions/authActions";
import { Button } from "@mui/material";

const Profile = ({ auth, createProfile, logoutUser, errors }) => {
  const { user, isAuthenticated } = auth;
  const [establishmentname, setEstablishment] = useState("");
  const [website, setWebsite] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [profileErrors, setProfileErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newProfile = {
      establishmentname: establishmentname,
      website: website,
      phonenumber: phonenumber,
    };
  
    createProfile(newProfile, (profile, err) => {
      if (err) {
        console.log("Error while creating profile:", err);
        setProfileErrors(err.response.data);
      } else {
        console.log("Profile created successfully:", profile);
        // Redirect to a new page after profile creation
        // Replace "/new-route" with the desired route
        window.location.href = "/new-route";
      }
    });
  };
  

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    // Redirect to the login page after logout
    // Replace "/login" with the desired login route
    window.location.href = "/login";
  };

  useEffect(() => {
    setProfileErrors(errors);
  }, [errors]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      // Replace "/login" with the desired login route
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // or a loading spinner or any other indication
  }

  if (!user || !user.email) {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> User
            </h4>
            <p className="flow-text grey-text text-darken-1">
              An error occurred while retrieving user data.
            </p>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
              }}
              onClick={handleLogout}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="signupbox" />
      <div className="loginwelcometoo">Sign in</div>
      <div style={{ marginTop: "4rem" }} className="row">
        <div className="col s8 offset-s2">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}></div>
          <form noValidate onSubmit={handleSubmit}>
            <div className="input-field col s12">
              <input
                onChange={(e) => setEstablishment(e.target.value)}
                value={establishmentname}
                error={profileErrors.establishmentname}
                id="establishmentname"
                type="establishmentname"
                className="emailinputbar"
                autoComplete="off"
              />
              <label htmlFor="establishmentname">Establishment Name</label>
              <span className="red-text">
                {profileErrors.establishmentname}
              </span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
                error={profileErrors.website}
                id="website"
                type="website"
                className="passwordinputbar"
                autoComplete="off"
              />
              <label htmlFor="website">Website</label>
              <span className="red-text">{profileErrors.website}</span>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPhonenumber(e.target.value)}
                value={phonenumber}
                error={profileErrors.phonenumber}
                id="phonenumber"
                type="phonenumber"
                className="verifypasswordinputbar"
                autoComplete="off"
              />
              <label htmlFor="phonenumber">Phone Number</label>
              <span className="red-text">{profileErrors.phonenumber}</span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, logoutUser })(Profile);
