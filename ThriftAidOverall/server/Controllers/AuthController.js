const User = require('../Models/UserModel.js');
const bcrypt = require('bcryptjs');
const { createSecretToken } = require('../util/SecretToken.js');

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, usertype } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new User({
      email,
      password,
      usertype,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Create a secret token
    const token = createSecretToken(user._id);

    // Set the token as a cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to 'true' if using HTTPS
    });

    res.status(200).json({ message: 'User logged in successfully!', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};