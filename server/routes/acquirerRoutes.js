// routers/acquirerRouter.js

const express = require('express');
const bcrypt = require('bcryptjs');
const Acquirer = require('../models/Acquirer'); // Ensure you have the correct path to the Acquirer model
const router = express.Router();

// Route to register a new acquirer
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if the acquirer already exists
    const existingAcquirer = await Acquirer.findOne({ username });
    if (existingAcquirer) {
      return res.status(400).json({ message: 'Acquirer already exists' });
    }

    // Create a new acquirer
    const newAcquirer = new Acquirer({ username, password });
    await newAcquirer.save();

    res.status(201).json({ message: 'Acquirer registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Route to login an acquirer (authenticate)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if the acquirer exists
    const acquirer = await Acquirer.findOne({ username });
    if (!acquirer) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Check if the password matches
    const isMatch = await acquirer.isPasswordMatch(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', acquirer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
