require('dotenv').config();
const express = require("express")
const router  = express.Router()
const MongoClient = require('mongodb').MongoClient;
const mongoURI = process.env.MONGODB_CONNECT_URI;
const client = new MongoClient(mongoURI);
const Task = require('../models/task');
const authenticateToken = require('../middleware/authMiddleware');


// PUT endpoint to update a task
router.put('/api/put/updateTask/:id',authenticateToken, async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request body
    
    const { id } = req.params;
    const { taskTitle, taskDescription, deadline, status, user: userId } = req.body;

    const validStatuses = ['Not started', 'In progress', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: 'Invalid status value' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { taskTitle, taskDescription, deadline, status, user: userId },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    res.status(200).json({ msg: 'Task updated successfully', task: updatedTask });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router
  