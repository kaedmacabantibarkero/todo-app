const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const bcrypt = require('bcryptjs');

// POST endpoint to create a new user
router.post('/api/post/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'Username already exists' });
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
  
      res.status(200).json({ msg: 'Login successful' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

// POST endpoint to create task
router.post('/api/post/addTask', async (req, res) => {
  try {
    const { taskTitle, taskDescription, deadline, status, user: userId } = req.body;

    // Create a new task
    const task = new Task({
      taskTitle,
      taskDescription,
      deadline,
      status,
      user: userId  // Ensure this is the user ID
    });

    await task.save();
    res.status(201).json({ msg: 'Task created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
