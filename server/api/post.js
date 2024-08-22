const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task'); 
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


router.post('/api/post/addTask', authenticateToken, async (req, res) => {
  try {
 
    const { taskTitle, taskDescription, deadline, status, user_id} = req.body;

    // Create a new task
    const task = new Task({
      taskTitle,
      taskDescription,
      deadline,
      status,
      user_id
    });

    await task.save();
    res.status(201).json({ msg: 'Task created successfully' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
