import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile } from '../../actions/authActions';
import axios from 'axios';
import { setCurrentUser } from '../../actions/authActions';

const Profile = ({ auth, updateProfile, errors, setCurrentUser }) => {
  const { user, isAuthenticated } = auth;
  const [establishmentname, setEstablishment] = useState('');
  const [website, setWebsite] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [profileErrors, setProfileErrors] = useState({});
  const [profileUser, setProfileUser] = useState({});

  useEffect(() => {
    setProfileErrors(errors);
  }, [errors]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      window.location.href = '/login';
    } else if (isAuthenticated && user) {
      fetchProfile(user.email);
    }
  }, [isAuthenticated, user, setCurrentUser]);

  const fetchProfile = (email) => {
    axios
      .get(`http://localhost:5000/api/users/profile?email=${email}`)
      .then((res) => {
        const profile = res.data;
        if (profile) {
          setProfileUser(profile);
          setEstablishment(profile.establishmentname || '');
          setWebsite(profile.website || '');
          setPhonenumber(profile.phonenumber || '');
        }
      })
      .catch((err) => {
        console.log('Error while fetching profile:', err);
      });
  };

  const onSubmit = (e) => {
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
                onChange={(e) => setEstablishment(e.target.value)}
                error={profileErrors.establishmentname}
              />
              <input
                className="passwordinputbar"
                placeholder="Website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                error={profileErrors.website}
              />
              <input
                className="verifypasswordinputbar"
                placeholder="Phone Number"
                name="phonenumber"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                error={profileErrors.phonenumber}
              />
              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
            <div className="currentprofileinfo">
              <h4>Establishment Name: {user.establishmentname || ''}</h4>
              <h4>Website: {user.website || ''}</h4>
              <h4>Phone Number: {user.phonenumber || ''}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  updateProfile: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { updateProfile, setCurrentUser })(Profile);
