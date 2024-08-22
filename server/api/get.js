const express = require('express');
const router = express.Router();
const Task = require('../models/task'); 
const Session = require('../models/sessions'); 
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middleware/authMiddleware');

// GET endpoint to fetch all tasks for a specific user
router.get('/api/get/jwt', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    // Check if userId is valid
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    // Fetch the session for the user
    const session = await Session.findOne({ user_id: userId });

    if (!session) {
      return res.status(404).json({ msg: 'No session found for this user' });
    }

    // Return the JWT
    res.status(200).json({ jwt: session.jwt });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
// GET endpoint to fetch all tasks for a specific user
router.get('/api/get/getTask', authenticateToken, async(req, res) => {
  try {
    const userId = req.user.userId

    // Check if userId is valid
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    // Fetch tasks for the user
    const tasks = await Task.find({ user: userId });

    if (tasks.length === 0) {
      return res.status(404).json({ msg: 'No tasks found for this user' });
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
