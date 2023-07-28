const express = require('express');
const router = express.Router();
const passport = require('passport');
const Posting = require('../../models/Posting');
const User = require('../../models/User');

router.get('/allpostings', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.usertype !== 'homeless shelter') {
      return res.status(403).json({ error: 'Only homeless shelters can create postings' });
    }
  
    try {
      const postings = await Posting.find({});
      
      res.json(postings);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  router.post('/acceptposting', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user.usertype !== 'homeless shelter') {
      return res.status(403).json({ error: 'Only homeless shelters can accept postings' });
    }
  
    try {
      const { postinId } = req.body;
      const acceptedPosting = await Posting.findById(postinId);
      if (!acceptedPosting) {
        return res.status(404).json({ error: 'Posting not found' });
      }

      await acceptedPosting.remove();
  
      const updatedAcceptedPostings = await Posting.find({});
      AcceptedPostings = updatedAcceptedPostings;
  
      res.json(updatedAcceptedPostings);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server Error' });
    }
  });


  module.exports = router;