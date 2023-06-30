import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile } from '../../actions/authActions';
import axios from 'axios';
import { setCurrentUser } from '../../actions/authActions';
import Swal from 'sweetalert2';
import { Button, Fade } from '@mui/material';
import ProfileLogo from './Profilepagelogo';
import { Link } from 'react-router-dom';

const theAlert = () => {
  Swal.fire('Good job!', 'Your profile was updated successfully', 'success');
};

const Profile = ({ auth, updateProfile, errors, setCurrentUser }) => {
  const { user, isAuthenticated } = auth;
  const [establishmentname, setEstablishment] = useState('');
  const [website, setWebsite] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [profileErrors, setProfileErrors] = useState({});
  const [profileUser, setProfileUser] = useState({});
  const [contentProfile, setContentProfile] = useState('yes');

  const notContent = () => {
    setContentProfile('no');
  };

  const yesContent = () => {
    setContentProfile('yes');
  };

  function UpdateProfileButton() {
    return (
      <Button
        type="submit"
        sx={{
          position: 'absolute',
          display: 'flex',
          color: '#F7F3F3',
          fontFamily: 'Noto Sans',
          fontSize: 10,
          fontStyle: 'normal',
          fontWeight: 700,
          textAlign: 'center',
          height: 30,
          left: '41.1%',
          top: '67%',
          width: 292,
          textTransform: 'none',
          bgcolor: '#24a0ed',
          ':hover': {
            bgcolor: '#0792e8',
            color: '#F7F3F3',
            textTransform: 'none',
          },
        }}
        onClick={notContent}
      >
        Want to create/update your profile? Click here!
      </Button>
    );
  }
  function CreateProfileButton() {
    return (
      <Button
        type="submit"
        sx={{
          position: 'absolute',
          display: 'flex',
          color: '#F7F3F3',
          fontFamily: 'Noto Sans',
          fontSize: 15,
          fontStyle: 'normal',
          fontWeight: 700,
          textAlign: 'center',
          height: 30,
          left: '40.05%',
          top: '62.5%',
          width: '20.6%',
          textTransform: 'none',
          bgcolor: '#24a0ed',
          ':hover': {
            bgcolor: '#0792e8',
            color: '#F7F3F3',
            textTransform: 'none',
          },
        }}
        onClick={onSubmit}
      >
        Click here to create/update profile
      </Button>
    );
  }
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
    setTimeout(theAlert, 500);
    yesContent();
  };

  if (contentProfile === 'yes') {
    return (
      <div>
      <div className='currentprofilebox' />
      <Link to= '/'>
        <ProfileLogo />
      </Link>
      <div className="profilewelcometoo">Profile</div>
      <UpdateProfileButton />
      <div className="currentprofileinfo">
        <h4 className='establishmentinputbarv2'>Establishment Name: {user.establishmentname || ''}</h4>
        <h4 className='websiteinputbarv2'>Website: {user.website || ''}</h4>
        <h4 className='phonenumberinputbarv2'>Phone Number: {user.phonenumber || ''}</h4>
      </div>
      </div>
    );
  } else if (contentProfile === 'no') {
    return (
      <Fade in={true}>
        <div className="profile">
        <div className='currentprofilebox' />
        <div className='currentprofilebox' />
      <Link to= '/'>
        <ProfileLogo />
      </Link>
      <div className="profilewelcometoo">Profile</div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Profile</h1>
                <form onSubmit={onSubmit}>
                  <input
                    className="establishmentinputbar"
                    placeholder="Establishment Name"
                    name="establishmentname"
                    value={establishmentname}
                    onChange={(e) => setEstablishment(e.target.value)}
                    error={profileErrors.establishmentname}
                  />
                  <input
                    className="websiteinputbar"
                    placeholder="Website"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    error={profileErrors.website}
                  />
                  <input
                    className="phonenumberinputbar"
                    placeholder="Phone Number"
                    name="phonenumber"
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    error={profileErrors.phonenumber}
                  />
                <CreateProfileButton />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
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
