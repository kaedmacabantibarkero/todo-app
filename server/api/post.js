const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
 const authenticateToken = require('../middleware/authMiddleware');

// POST endpoint to create a new user
router.post('/api/post/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Account already exists' });
    }
    // Create a new user
    user = new User({
      username,
      password,
    });

    await user.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST endpoint for login
let refreshTokens = [];

// Function to generate access token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // Shorter expiry for access tokens
}

// Function to generate refresh token
function generateRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // Longer expiry for refresh tokens
}

router.post('/api/post/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken({ username: user.username, userId: user._id });
    const refreshToken = generateRefreshToken({ username: user.username, userId: user._id });

    // Store refresh token (in a real application, use a more secure method)
    refreshTokens.push(refreshToken);

    res.status(200).json({
      msg: 'Login successful',
      userId: user._id,
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.post('/api/post/addTask', authenticateToken, async (req, res) => {
  try {
 
    const { taskTitle, taskDescription, deadline, status, user} = req.body;

    // Create a new task
    const task = new Task({
      taskTitle,
      taskDescription,
      deadline,
      status,
      user 
    });

    await task.save();
    res.status(201).json({ msg: 'Task created successfully' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
