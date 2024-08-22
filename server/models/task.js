const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Not started', 'In progress', 'Completed'],  // Define possible status values
    default: 'Not started',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User schema
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true  // Optional: adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Task', TaskSchema);
