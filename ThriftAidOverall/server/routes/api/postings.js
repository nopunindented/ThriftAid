// postings.js route
const express = require('express');
const router = express.Router();
const passport = require('passport');
const Posting = require('../../models/Posting');
const User = require('../../models/User');

router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
      if (req.user.usertype !== 'thrift store') {
        return res
          .status(403)
          .json({ error: 'Only thrift stores can create postings' });
      }
  
      try {
        const user = await User.findById(req.user.id); // Fetch the user object from the database
  
        const newPosting = new Posting({
          thriftstore: user.establishmentname,
          address: req.body.address,
          country: req.body.country,
          city: req.body.city,
          numberofphone: user.phonenumber,
          pickupdate: req.body.pickupdate,
          pickuptime: req.body.pickuptime,
        });
  
        const posting = await newPosting.save();
        console.log(posting);
        
        res.json(posting);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create posting' });
      }
    }
  );
  

module.exports = router;
