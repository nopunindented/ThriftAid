import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Button, DialogContent } from '@mui/material';
import mapmarker from './mapmarker.svg';
import clock from './clock.svg';
import phone from './phone.svg'
import email from './email.svg'
import xmark from './xmark.png'
import internet from './internet.svg'

export default function AllPostings() {
  const [postings, setPostings] = useState([]);
  const [selectedPostin, setSelectedPostin] = useState(null);

  const handleDialogOpen = (postin) => {
    setSelectedPostin(postin);
  };

  const handleDialogClose = () => {
    setSelectedPostin(null);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/everyposting/allpostings')
      .then((response) => {
        setPostings(response.data);
      })
      .catch((err) => {
        console.log('Error fetching the list of postings', err);
      });
  }, []);

  return (
    <div className="page-container">
      <div className="postings-container">
        {postings.map((postin) => (
          <div key={postin.thriftstore} className="thriftstorepost">
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
            {postin.pickupcomments && (
              <>
                <Button
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    color: '#F7F3F3',
                    fontFamily: 'Noto Sans',
                    fontSize: '1.4vh',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    textAlign: 'center',
                    height: '7%',
                    left: '21.7%',
                    top: '92%',
                    width: '55%',
                    textTransform: 'none',
                    bgcolor: '#5ab0f2',
                    ':hover': {
                      bgcolor: '#4baaf2',
                      color: '#F7F3F3',
                      textTransform: 'none',
                    },
                  }}
                  onClick={() => handleDialogOpen(postin)}
                >
                  View poster's comments
                </Button>
                <Dialog
                  open={selectedPostin === postin}
                  onClose={handleDialogClose}
                  className='dialoguebackgroundtwice'
                  PaperProps={{
                    style: {
                      width: '20%',
                      height: '40%',
                      backgroundColor: '#f5f2f2',
                      overflowY: 'auto'
                    },
                  }}
                >
                  <DialogContent>
                    <Button onClick={handleDialogClose}>
                    <img src={xmark} className="xmarkdialogue"/>
                    </Button>
                    <div className='postercomments'>
                      {postin.pickupcomments}
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
