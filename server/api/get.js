const express = require('express');
const router = express.Router();
const Task = require('../models/task'); // Adjust the path as needed
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
 

const posts = [
  {
    userId: '66c43a572a607f077c59e31f',
    title: 'Post 1'
  },
  {
    userId: 'Jim',
    title: 'Post 2'
  }
]

router.get('/posts', authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.userId === req.user.userId))
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// GET endpoint to fetch all tasks for a specific user
router.get('/api/get/getTask', async (req, res) => {
  try {
    const userId = req.params.userId.trim(); // Ensure no extra whitespace

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
