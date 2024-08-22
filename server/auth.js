// auth.js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/user');  
const bcrypt = require('bcryptjs'); 
const Session = require('./models/sessions'); // Adjust the path if needed

const router = express.Router();
let refreshTokens = [];
// Function to generate access token
function generateAccessToken(user) {
return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }); // Shorter expiry for access tokens
}

// Function to generate refresh token
function generateRefreshToken(user) {
return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); // Longer expiry for refresh tokens
}

router.post('/auth/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

 
router.delete('/auth/logout', async (req, res) => {
  try {
    const { jwt } = req.body;

    // Check if the token exists in the database
    const session = await Session.findOneAndDelete({ jwt });

    if (!session) {
      return res.status(400).json({ msg: 'Invalid token or token already logged out' });
    }

    res.status(200).json({ msg: 'Logout success' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// POST endpoint for login 
router.post('/auth/login', async (req, res) => {
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

    // Store refresh token in the database
    const session = new Session({
      user_id: user._id,
      jwt: refreshToken,
    });

    await session.save();

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

module.exports = router;
