import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateProfile } from '../../actions/authActions';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button, Fade } from '@mui/material';
import ProfileLogo from './Profilepagelogo';
import { setCurrentUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';

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
  Swal.fire('Good job!', 'Your profile was updated successfully', 'success');
};

const Profile: React.FC<ProfileProps> = ({
  auth,
  updateProfile,
  errors,
  setCurrentUser,
}) => {
  const { user, isAuthenticated } = auth;
  const [establishmentname, setEstablishment] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [profileErrors, setProfileErrors] = useState<any>({});
  const [profile, setProfileUser] = useState<string>('')
  const [contentProfile, setContentProfile] = useState<string>('yes');

  const notContent = () => {
    setContentProfile('no');
  };

  const yesContent = () => {
    setContentProfile('yes');
  };

  const formatPhoneNumber = (inputValue: string) => {
    const numericValue = inputValue.replace(/\D/g, '');
    const phoneNumberRegex = /^(\d{3})(\d{3})(\d{4})$/;
    const formattedValue = numericValue.replace(phoneNumberRegex, '($1)-$2-$3');
    return formattedValue;
  };

  const setPhoneNumberFormatted = (inputValue: string) => {
    const formattedPhoneNumber = formatPhoneNumber(inputValue);
    setPhonenumber(formattedPhoneNumber);
  };

  const UpdateProfileButton: React.FC = () => {
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
  };

  const CreateProfileButton: React.FC = () => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onSubmit(e as any); // Calling the onSubmit function with proper type casting
    };
  
    return (
      <Button
        type="button" // Change the type to "button"
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
          top: '68.5%',
          width: '20.6%',
          textTransform: 'none',
          bgcolor: '#24a0ed',
          ':hover': {
            bgcolor: '#0792e8',
            color: '#F7F3F3',
            textTransform: 'none',
          },
        }}
        onClick={handleClick} // Use the handleClick function for onClick
      >
        Click here to create/update profile
      </Button>
    );
  };

  useEffect(() => {
    setProfileErrors(errors);
  }, [errors]);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    } else if (isAuthenticated && user) {
      fetchProfile(user.email);
    }
  }, [isAuthenticated, user, setCurrentUser]);

  const fetchProfile = (email: string) => {
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
      {contentProfile === 'yes' ? (
        <div>
          <div className="currentprofilebox" />
          <Link to="/">
            <ProfileLogo />
          </Link>
          <div className="profilewelcometoo">Profile</div>
          <UpdateProfileButton />
          <div className="currentprofileinfo">
            <h4 className="establishmentinputbarv2">
              Establishment Name: {user.establishmentname || ''}
            </h4>
            <h4 className="websiteinputbarv2">Website: {user.website || ''}</h4>
            <h4 className="phonenumberinputbarv2">
              Phone Number: {formatPhoneNumber(user.phonenumber) || ''}
            </h4>
          </div>
        </div>
      ) : (
        <Fade in={true}>
          <div className="profile">
            <div className="currentprofilebox" />
            <Link to="/">
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
                      onError={profileErrors.establishmentname}
                    />
                    <span className="inputerror">
                      {profileErrors.establishmentname}
                    </span>
                    <input
                      className="websiteinputbar"
                      placeholder="Website"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      onError={profileErrors.website}
                    />
                    <span className="inputerror">{profileErrors.website}</span>
                    <input
                      className="phonenumberinputbar"
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
