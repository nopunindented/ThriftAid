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
      const user = await User.findById(req.user.id);

      const newPosting = new Posting( {
        thriftstore: user.establishmentname,
        email: user.email,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        numberofphone: user.phonenumber,
        pickupdate: req.body.pickupdate,
        pickuptime: req.body.pickuptime,
        pickupcomments: req.body.pickupcomments,
      });

      const posting = await Posting.create(newPosting); // saves the posting :D

      console.log(posting);
      
      res.json(posting);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create posting' });
    }
  }
);

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
