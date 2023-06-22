import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfile } from "../../actions/authActions";

const Profile = ({ auth, updateProfile, errors }) => {
  const { user, isAuthenticated } = auth;
  const [establishmentname, setEstablishment] = useState(user.establishmentname || "");
  const [website, setWebsite] = useState(user.website || "");
  const [phonenumber, setPhonenumber] = useState(user.phonenumber || "");
  const [profileErrors, setProfileErrors] = useState({});

  useEffect(() => {
    setProfileErrors(errors);
  }, [errors]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      window.location.href = "/login";
    }
  }, [isAuthenticated]);

  const onSubmit = e => {
    e.preventDefault();

    const updatedProfile = {
      establishmentname,
      website,
      phonenumber,
      email: user.email
    };

    updateProfile(updatedProfile);
  };

  return (
    <div className="profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Profile</h1>
            <form onSubmit={onSubmit}>
              <input
              className="emailinputbar"
                placeholder="Establishment Name"
                name="establishmentname"
                value={establishmentname}
                onChange={e => setEstablishment(e.target.value)}
                error={profileErrors.establishmentname}
              />
              <input
              className="passwordinputbar"
                placeholder="Website"
                name="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                error={profileErrors.website}
              />
              <input
              className="verifypasswordinputbar"
                placeholder="Phone Number"
                name="phonenumber"
                value={phonenumber}
                onChange={e => setPhonenumber(e.target.value)}
                error={profileErrors.phonenumber}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { updateProfile })(Profile);
