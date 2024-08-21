const express = require('express');
const router = express.Router();
const Task = require('../models/task'); 
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middleware/authMiddleware');

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
