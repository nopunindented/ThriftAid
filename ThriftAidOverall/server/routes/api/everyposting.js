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



  module.exports = router;