import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Dialog, Button, DialogContent } from '@mui/material';
import mapmarker from './mapmarker.svg';
import clock from './clock.svg';
import phone from './phone.svg';
import email from './email.svg';
import xmark from './xmark.png';
import internet from './internet.svg';
import { styled } from "@mui/material/styles"; // Import styled from the correct location
import { useTheme } from "@mui/material/styles";


interface Posting {
  _id: string;
  thriftstore: string;
  address: string;
  city: string;
  country: string;
  email: string;
  numberofphone: string;
  website: string;
  pickupcomments?: string;
  pickuptime: string;
  pickupdate: string;
}

const dialogStyle: React.CSSProperties = {
  width: '20%',
  height: '40%',
  backgroundColor: '#f5f2f2',
  overflowY: 'auto',
};

interface ButtonProps {
  onClick: () => void;
}

const SearchPost = styled("input")(({ theme }) => ({
  position: 'absolute',
  borderRadius: '4%',
  borderWidth: '1px',
  borderColor: '#a9a9a9',
  boxSizing: 'border-box',
  "::placeholder": {
    position: 'relative',
    fontSize: '2.6vh',
    fontWeight: 10,
    left: '0%',
    top: '7%'
  },
  ":focus": {
    outline: 0,
    border: '2px solid #000000',
  },
  [theme.breakpoints.up("xs")]: {
    left: '8%',
    width: '88%',
    fontSize: '2.3vh',
    height: '4.5%',
    top: "21.5%"
  },
  [theme.breakpoints.up("sm")]: {
    left: '26%',
    width: '45%',
    fontSize: '2.3vh',
    height: '4.5%',
    top: "19.5%"
  },
  [theme.breakpoints.up("md")]: {
    left: '29.55%',
    width: '42%',
    fontSize: '2.3vh',
    height: '4.5%',
    top: "19.5%"
  },
  [theme.breakpoints.up("lg")]: {
    left: '29.55%',
    width: '42%',
    fontSize: '2.3vh',
    height: '4.5%',
    top: "19.5%"
  },
  [theme.breakpoints.up("xl")]: {
    left: '29.55%',
    width: '42%',
    fontSize: '2.3vh',
    height: '4.5%',
    top: "19.5%"
  },
}));

const AllPostings: React.FC = () => {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [selectedPostin, setSelectedPostin] = useState<Posting | null>(null);
  const [filterCity, setFilterCity] = useState<string>('');
  const theme= useTheme();

  const handleDialogOpen = (postin: Posting) => {
    setSelectedPostin(postin);
  };

  const handleAcceptPosting = (postin: Posting) => {
    setPostings((prevPostings) => prevPostings.filter((p) => p._id !== postin._id));

    axios
      .post('https://thriftaidreal-291fee9b2aaa.herokuapp.com/api/everyposting/acceptposting', { postinId: postin._id })
      .catch((err) => {
        console.log('Error accepting posting', err);
      });
  };

  const handleDialogClose = () => {
    setSelectedPostin(null);
  };

  useEffect(() => {
    axios
      .get('https://thriftaidreal-291fee9b2aaa.herokuapp.com/api/everyposting/allpostings')
      .then((response) => {
        setPostings(response.data);
      })
      .catch((err) => {
        console.log('Error fetching the list of postings', err);
      });
  }, []);

  const filteredPostings = useMemo(() => {
    if (!filterCity || filterCity === '') {
      return postings;
    } else {
      return postings.filter(
        (postin) =>
          postin.city.toLowerCase() === filterCity.toLowerCase() ||
          postin.country.toLowerCase() === filterCity.toLowerCase()
      );
    }
  }, [postings, filterCity]);

  const ButtonAcceptPostingOne: React.FC<ButtonProps> = ({ onClick }) => (
    <Button
      variant="contained"
      sx={{
        position: 'absolute',
        display: 'flex',
        color: '#F7F3F3',
        fontFamily: 'Noto Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        textAlign: 'center',
        textTransform: 'none',
        bgcolor: '#5ab0f2',
        ':hover': {
          bgcolor: '#4baaf2',
          color: '#F7F3F3',
          textTransform: 'none',
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: '1vh',
          top: '91%',
          height: '5%',
          left: '26.7%',
          width: '50%',
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '1vh',
          top: '91%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '1.1vh',
          top: '91%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '1.4vh',
          top: '91%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '1.4vh',
          top: '91%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
      }}
      onClick={onClick}
    >
      Accept Posting
    </Button>
  );

  const ButtonAcceptPostingTwo: React.FC<ButtonProps> = ({ onClick }) => (
    <Button
      variant="contained"
      sx={{
        position: 'absolute',
        display: 'flex',
        color: '#F7F3F3',
        fontFamily: 'Noto Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        textAlign: 'center',
        textTransform: 'none',
        bgcolor: '#5ab0f2',
        ':hover': {
          bgcolor: '#4baaf2',
          color: '#F7F3F3',
          textTransform: 'none',
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: '1vh',
          top: '85.5%',
          height: '6.5%',
          left: '26.7%',
          width: '50%',
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '0.9vh',
          top: '84.5%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
        [theme.breakpoints.up('md')]: {
        fontSize: '1.2vh',
        top: '84.5%',
        height: '7%',
        left: '21.7%',
        width: '55%',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '1.4vh',
          top: '84.5%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '1.4vh',
          top: '84.5%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
      }}
      onClick={onClick}
    >
      Accept Posting
    </Button>
  );

  const ButtonViewComments: React.FC<ButtonProps> = ({ onClick }) => (
    
    <Button
      variant="contained"
      sx={{
        position: 'absolute',
        display: 'flex',
        color: '#F7F3F3',
        fontFamily: 'Noto Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        textAlign: 'center',
        textTransform: 'none',
        bgcolor: '#5ab0f2',
        ':hover': {
          bgcolor: '#4baaf2',
          color: '#F7F3F3',
          textTransform: 'none',
        },
        [theme.breakpoints.up('xs')]: {
          fontSize: '1vh',
          top: '92.5%',
          height: '6.5%',
          left: '26.7%',
          width: '50%',
        },
        [theme.breakpoints.up('sm')]: {
          fontSize: '0.9vh',
          top: '92%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '0.98vh',
          top: '92%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
        [theme.breakpoints.up('lg')]: {
          fontSize: '1.05vh',
          top: '92%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
        [theme.breakpoints.up('xl')]: {
          fontSize: '1.2vh',
          top: '92%',
          height: '7%',
          left: '21.7%',
          width: '55%',
        },
      }}
      onClick={onClick}
    >
      View poster's comments
    </Button>
  );

  const memoizedPostings = useMemo(
    () =>
      filteredPostings.map((postin) => (
        <div key={postin._id} className="thriftstorepost">
          <div className='thriftstorepostfont'>{postin.thriftstore}</div>
          <div className="address-top">{postin.address}</div>
          <img src={mapmarker} className="mapmarkerstyle" alt="map marker" />
          <img src={clock} className="clockstyle" alt="clock" />
          <img src={phone} className="phonestyle" alt="phone" />
          <img src={email} className="emailstyle" alt="email" />
          <img src={internet} className="internetstyle" alt="websiteurl" />
          <div className='pickuptimestyle'>Pickup time: {postin.pickuptime}</div>
          <div className='pickupdatestyle'>Pickup date: {postin.pickupdate}</div>
          <div className="city-top">{postin.city}, {postin.country}</div>
          <div className="email-top">{postin.email}</div>
          <div className="phone-top">{postin.numberofphone}</div>
          <div className="website-top">{postin.website}</div>
          {!postin.pickupcomments && <ButtonAcceptPostingOne onClick={() => handleAcceptPosting(postin)} />}
          {postin.pickupcomments && (
            <>
              <ButtonAcceptPostingTwo onClick={() => handleAcceptPosting(postin)} />
              <ButtonViewComments onClick={() => handleDialogOpen(postin)} />
              <Dialog
                open={selectedPostin === postin}
                onClose={handleDialogClose}
                className="dialoguebackgroundtwice"
                PaperProps={{
                  style: dialogStyle,
                }}
              >
                <DialogContent>
                  <Button onClick={handleDialogClose}>
                    <img src={xmark} className="xmarkdialogue" alt="Close" />
                  </Button>
                  <div className="postercomments">
                    {postin.pickupcomments}
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      )),
    [filteredPostings, selectedPostin]
  );

  return (
    <div className="page-container">
      <div>
        <SearchPost
          type="text"
          placeholder="Enter a city or country to view posts from there"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        />
      </div>
      <div className="postings-container">
        {memoizedPostings}
      </div>
    </div>
  );
}

export default AllPostings;
