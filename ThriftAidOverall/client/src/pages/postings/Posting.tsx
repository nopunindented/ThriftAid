import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPosting } from '../../actions/authActions';
import { Button, Dialog, DialogContent, Fade, TextField, Card } from '@mui/material';
import PostingLogo from './postinglogo.tsx';
import { Link } from 'react-router-dom';
import GoogleMaps from './googlemaps';
import { styled } from "@mui/material/styles"; // Import styled from the correct location
import Typography from "@mui/material/Typography"; // Import Typography
import { useTheme } from "@mui/material/styles";

interface RootState {
  auth: AuthState;
  errors: ErrorState;
}

interface AuthState {
  user: {
    establishmentname: string;
    phonenumber: string;
    website: string;
    email: string;
  };
  isAuthenticated: boolean;
}

interface ErrorState {
  address: string;
  country: string;
  city: string;
  pickupdate: string;
  pickuptime: string;
}
interface NewPostingProps {
  auth: AuthState;
  createPosting: (newPosting: any, history: any) => void;
  errors: ErrorState;
  history: any;
}

const SignupBox = styled(Card)(({ theme }) => ({
  position: 'absolute',
  display: 'inline-block',
  borderRadius: '2%',
  background: 'white',
  boxShadow: '0px 4px 30px rgba(0.1, 0.1, 0.1, 0.25)',
  [theme.breakpoints.up('xs')]: {
    width: '66%',
    height: '73%',
    top: '21%',
    left: '5.3%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '42.4%',
    height: '75%',
    top: '21%',
    left: '28%',
  },
  [theme.breakpoints.up('md')]: {
    width: '32%',
    height: '74%',
    top: '21%',
    left: '28.2%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '23.6%',
    height: '74%',
    top: '21%',
    left: '28.2%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '22%',
    height: '74%',
    top: '21%',
    left: '28.2%',
  },
}));

const NewPosting: React.FC<NewPostingProps> = ({ auth, createPosting, errors, history }) => {
  const { user, isAuthenticated } = auth;

  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [pickupdate, setPickupdate] = useState('');
  const [pickuptime, setPickuptime] = useState('');
  const [pickupcomments, setPickupcomments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogPickupComments, setDialogPickupComments] = useState('');

  const formatDate = (inputDate: string): string => {
    const date = inputDate.replace(/\D/g, '');
    if (date.length >= 6) {
      return `${date.slice(0, 2)}/${date.slice(2, 6)}/${date.slice(6, 8)}`;
    } else if (date.length >= 3) {
      return `${date.slice(0, 2)}/${date.slice(2)}`;
    } else {
      return date;
    }
  };

  const formatTime = (inputTime: string): string => {
    const time = inputTime.replace(/\D/g, '');

    if (time.length >= 3) {
      let hours = time.slice(0, -2);
      let minutes = time.slice(-2);

      hours = parseInt(hours, 10).toString();
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

  const handleDateChange = (x: string) => {
    const formattedDate = formatDate(x);
    setPickupdate(formattedDate);
  };

  const handleTimeChange = (y: string) => {
    const formattedTime = formatTime(y);
    setPickuptime(formattedTime);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setPickupcomments(dialogPickupComments);
  };

  const handleDialogCancel = () => {
    setOpenDialog(false);
    setDialogPickupComments('');
  };

  const onSubmit = (e: React.FormEvent) => {
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

  const properAddress = {
    fulladdress: address + ', ' + city,
  };

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return (
    <Fade in={true}>
      <div>
      <SignupBox>
        <Link to="/">
          <PostingLogo />
        </Link>
        <div className="postingwelcometoo">Create Posting</div>
        <div className="postingwelcometoo-v2">Need a profile to be able to create a posting</div>
        <form onSubmit={onSubmit}>
          <input
            className="establishmentinputbarv3"
            placeholder="Address"
            name="Pickup Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className="websiteinputbarv3"
            placeholder="Country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <input
            className="phonenumberinputbarv3"
            placeholder="City"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            className="pickupd"
            placeholder="Pickup Date (MM/YYYY/DD)"
            name="pickupdate"
            value={pickupdate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
          <input
            className="pickupt"
            placeholder="Pickup Time (hh:mm)"
            name="pickuptime"
            value={pickuptime}
            onChange={(e) => handleTimeChange(e.target.value)}
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
            bgcolor: '#5ab0f2',
            ':hover': {
              bgcolor: '#4baaf2',
              color: '#F7F3F3',
              textTransform: 'none',
            },
          }}
          onClick={handleDialogOpen}
        >
          Add Pickup Comments
        </Button>
        <Dialog open={openDialog} onClose={handleDialogClose} className="dialoguebackground">
          <Button onClick={handleDialogCancel} variant="contained" color="primary" className="dialoguecancel">
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
            <Button onClick={handleDialogClose} variant="contained" color="primary" className="dialoguesubmission">
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </SignupBox>
      {submitted && address !== '' ? (
          <GoogleMaps className="map-container" address={properAddress.fulladdress} />
        ) : (
          submitted
        )}
        </div>
    </Fade>
  );
};
const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createPosting })(NewPosting);
