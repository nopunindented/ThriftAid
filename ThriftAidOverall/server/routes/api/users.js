const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateProfileInput = require("../../validation/profilename");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    console.log("Registration validation errors:", errors);
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      console.log("Registration failed. Email already exists:", req.body.email);
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        usertype: req.body.usertype,
        email: req.body.email,
        password: req.body.password,
        establishmentname: "",
        website: "",
        phonenumber: "",
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              console.log("User registered successfully:", user);
              res.json(user);
            })
            .catch((err) => {
              console.log("Error while registering user:", err);
              res.status(500).json(err);
            });
        });
      });
    }
  });
});

router.get("/profile", (req, res) => {
  const profile = {
    establishmentname: req.session.establishmentname || "",
    website: req.session.website || "",
    phonenumber: req.session.phonenumber || "",
  };

  res.json(profile);
});

router.post("/profile", async (req, res) => {
  // Form validation
  const { errors, isValid } = validateProfileInput(req.body);
  // Check validation
  if (!isValid) {
    console.log("Profile validation errors:", errors);
    return res.status(400).json(errors);
  }

  const profileFields = {
    establishmentname: req.body.establishmentname,
    website: req.body.website,
    phonenumber: req.body.phonenumber,
  };

  try {
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: profileFields },
      { new: true }
    );

    console.log("Profile updated successfully:", user);

    req.session.establishmentname = user.establishmentname; // Update establishment name in session
    req.session.website = user.website; // Update website in session
    req.session.phonenumber = user.phonenumber; // Update phone number in session

    res.json(user);
  } catch (err) {
    console.log("Error while updating profile:", err);
    res.status(500).json(err);
  }
});

router.get("/profile", (req, res) => {
  const user = req.session.user;

  if (user) {
    const profile = {
      establishmentname: user.establishmentname,
      website: user.website,
      phonenumber: user.phonenumber,
    };
    res.json(profile);
  } else {
    res.status(404).json({ profilenotfound: "Profile not found" });
  }
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    console.log("Login validation errors:", errors);
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      console.log("Login failed. Email not found:", email);
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          email: user.email,
        };
        // Sign token
        jwt.sign(
          { ...payload, usertype: user.usertype, establishmentname: user.establishmentname, website: user.website, phonenumber: user.phonenumber }, // Include usertype in the payload
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            console.log("User logged in successfully:", user);
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        console.log("Login failed. Incorrect password");
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
