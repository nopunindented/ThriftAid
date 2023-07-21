import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Button,  DialogContent } from '@mui/material';

export default function AllPostings() {
  const [postings, setPostings] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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
      <h1 className="allpostings-container">All Postings</h1>
      <div className="postings-container">
        {postings.map((postin) => (
          <div key={postin.thriftstore} className="thriftstorepost">
            <div className='thriftstorepostfont'>{postin.thriftstore}</div>
            <div className="address-top">{postin.address}</div>
            <div className="city-top">{postin.city}, {postin.country}</div>
            {postin.pickupcomments && (
            
            <>
            <Button
            type="submit"
            sx={{
              position: 'absolute',
              display: 'flex',
              color: '#F7F3F3',
              fontFamily: 'Noto Sans',
              fontSize: "1.5vh",
              fontStyle: 'normal',
              fontWeight: 700,
              textAlign: 'center',
              height: 30,
              left: '15.7%',
              top: '91%',
              width: '70%',
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
            View poster's comments
          </Button>
        <Dialog open={openDialog} onClose={handleDialogClose} className='dialoguebackgroundtwice'>
        <div className="dialoguecancel-container">
          <Button onClick={handleDialogClose} variant="contained" color="primary" className='dialoguecancel'>
              Cancel
          </Button>
        </div>
          <DialogContent>
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