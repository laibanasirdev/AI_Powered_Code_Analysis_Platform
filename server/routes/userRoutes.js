const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


// Assuming you have a User model set up with mongoose for user registration
const User = require('../models/User'); // Update the path if needed

// POST request to register a new user
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists (this is a basic check, you can expand it)
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user (you can add more validation here)
    const newUser = new User({
      username,
      email,
      password,  // You should hash the password before saving it!
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare entered password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      res.status(200).json({
        message: 'Login successful',
        user: {
          username: user.username,
          email: user.email,
          _id: user._id
        }
      });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
