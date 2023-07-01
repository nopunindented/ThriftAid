import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPosting } from '../../actions/authActions';
import { Button, Fade } from '@mui/material';

const NewPosting = ({ auth, createPosting, errors, history }) => {
  const { user, isAuthenticated } = auth;

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [pickupdate, setPickupdate] = useState('');
  const [pickuptime, setPickuptime] = useState('');
  const [postingErrors, setPostingErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    const newPosting = {
      thriftstore: user.establishmentname,
      numberofphone: user.phonenumber,
      address,
      country,
      city,
      pickupdate,
      pickuptime,
    };

    createPosting(newPosting, history);
  };

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null; // Render nothing until redirected
  }

  return (
    <Fade in={true}>
      <div className="posting">
        <div className='posting-box' />
        <div className='posting-box' />
        <h1 className="display-4 text-center">Create Posting</h1>
        <form onSubmit={onSubmit}>
          <input
            className="address-input"
            placeholder="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={postingErrors.address}
          />
          <input
            className="country-input"
            placeholder="Country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            error={postingErrors.country}
          />
          <input
            className="city-input"
            placeholder="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={postingErrors.city}
          />
          <input
            className="pickupdate-input"
            placeholder="Pickup Date"
            name="pickupdate"
            value={pickupdate}
            onChange={(e) => setPickupdate(e.target.value)}
            error={postingErrors.pickupdate}
          />
          <input
            className="pickuptime-input"
            placeholder="Pickup Time"
            name="pickuptime"
            value={pickuptime}
            onChange={(e) => setPickuptime(e.target.value)}
            error={postingErrors.pickuptime}
          />
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
          >
            Create Posting
          </Button>
          
        </form>
      </div>
    </Fade>
  );
};

NewPosting.propTypes = {
  auth: PropTypes.object.isRequired,
  createPosting: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createPosting })(NewPosting);
