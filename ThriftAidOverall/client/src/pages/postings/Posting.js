import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPosting } from '../../actions/authActions';
import { Button, Dialog, DialogContent, Fade, TextField } from '@mui/material';
import PostingLogo from './postinglogo';
import { Link } from 'react-router-dom';
import GoogleMaps from './googlemaps';

console.log(process.env.REACT_APP_MAP_KEY);
const NewPosting = ({ auth, createPosting, errors, history }) => {
  const { user, isAuthenticated } = auth;

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [pickupdate, setPickupdate] = useState('');
  const [pickuptime, setPickuptime] = useState('');
  const [pickupcomments, setPickupcomments] = useState('');
  const [postingErrors, setPostingErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogPickupComments, setDialogPickupComments] = useState(''); // New state for pickup comments in dialog

  const formatDate = (inputDate) => {
    const date = inputDate.replace(/\D/g, '');
    if (date.length >= 6) {
      return `${date.slice(0, 2)}/${date.slice(2, 6)}/${date.slice(6, 8)}`;
    } else if (date.length >= 3) {
      return `${date.slice(0, 2)}/${date.slice(2)}`;
    } else {
      return date;
    }
  };


  const formatTime = (inputTime) => {
    const time = inputTime.replace(/\D/g, '');
  
    // Check if the time has at least 3 characters (hhm)
    if (time.length >= 3) {
      let hours = time.slice(0, -2);
      let minutes = time.slice(-2);
  
      // Remove leading zeros for hours
      hours = parseInt(hours, 10).toString();
      // Remove leading zeros for minutes
      minutes = parseInt(minutes, 10).toString().padStart(2, '0');
  
      let formattedTime = `${hours}:${minutes}`;
      const numericHours = parseInt(hours, 10);
      if (numericHours >= 12) {
        formattedTime += ' pm';
        if (numericHours > 12) {
          formattedTime = `${numericHours - 12}:${minutes} pm`;
        }
      } else {
        formattedTime += ' am';
      }
      return formattedTime;
    } else {
      return time;
    }
  };
  

  const handleDateChange = (x) => {
    const formattedDate = formatDate(x);
    setPickupdate(formattedDate);
  };

  const handleTimeChange = (y) => {
    const formattedTime = formatTime(y);
    setPickuptime(formattedTime);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPickupcomments(dialogPickupComments); // Update pickupcomments state with dialogPickupComments when closing the dialog
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
    setDialogPickupComments('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newPosting = {
      thriftstore: user.establishmentname,
      numberofphone: user.phonenumber,
      website: user.website,
      email: user.email,
      address,
      country,
      city,
      pickupcomments,
      pickupdate,
      pickuptime,
    };

    createPosting(newPosting, history);
    setSubmitted(true);
  };
  // Assuming you have 'address' and 'city' variables defined
const properAddress = {
  fulladdress: address + ', ' + city,
};

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null; // Render nothing until redirected
  }

  return (
    <Fade in={true}>
      <div className="newpostbox">
        <Link to="/">
          <PostingLogo />
        </Link>
        <div className="postingwelcometoo">Create Posting</div>
        <form onSubmit={onSubmit}>
          <input
            className="establishmentinputbarv3"
            placeholder="Address"
            name="Pickup Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={postingErrors.address}
          />
          <input
            className="websiteinputbarv3"
            placeholder="Country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            error={postingErrors.country}
          />
          <input
            className="phonenumberinputbarv3"
            placeholder="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={postingErrors.city}
          />
          <input
            className="pickupd"
            placeholder="Pickup Date (MM/YYYY/DD)"
            name="pickupdate"
            value={pickupdate}
            onChange={(e) => handleDateChange(e.target.value)}
            error={postingErrors.pickupdate}
          />
          <input
            className="pickupt"
            placeholder="Pickup Time (hh:mm)"
            name="pickuptime"
            value={pickuptime}
            onChange={(e) => handleTimeChange(e.target.value)}
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
              left: '4.1%',
              top: '82%',
              width: '92.6%',
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
        {submitted && address !== '' ? (
          <GoogleMaps address={properAddress.fulladdress} />
        ) : (
          submitted
        )}
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
              left: '4.1%',
              top: '91%',
              width: '92.6%',
              textTransform: 'none',
              bgcolor: "#5ab0f2",
              ":hover": {
                bgcolor: "#4baaf2",
                color: "#F7F3F3",
                textTransform: "none"
              }
            }}
            onClick={handleDialogOpen}
          >
            Add Pickup Comments
          </Button>
        <Dialog open={openDialog} onClose={handleDialogClose} className='dialoguebackground'>
          <Button onClick={handleDialogCancel} variant="contained" color="primary" className='dialoguecancel'>
              Cancel
          </Button>
          <DialogContent>
            <TextField
              multiline
              rows={8}
              variant="outlined"
              placeholder="Enter pickup comments"
              value={dialogPickupComments}
              onChange={(e) => setDialogPickupComments(e.target.value)}
            />
            <Button onClick={handleDialogClose} variant="contained" color="primary" className='dialoguesubmission'>
              Submit
            </Button>
          </DialogContent>
        </Dialog>
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
