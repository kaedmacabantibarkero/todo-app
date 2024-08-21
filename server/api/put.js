require('dotenv').config();
const express = require("express")
const router  = express.Router()
const MongoClient = require('mongodb').MongoClient;
const mongoURI = process.env.MONGODB_CONNECT_URI;
const client = new MongoClient(mongoURI);

const Task = require('../models/task');
// PUT endpoint to update a task
router.put('/api/put/updateTask/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from URL parameters
    const { taskTitle, taskDescription, deadline, status, user: userId } = req.body;

    // Find the task by ID and update it
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { taskTitle, taskDescription, deadline, status, user: userId },
      { new: true, runValidators: true } // Return the updated task and run validation
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
  