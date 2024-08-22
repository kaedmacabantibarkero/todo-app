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
    enum: ['Not started', 'In progress', 'Done'],  
    default: 'Not started',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true  
});

module.exports = mongoose.model('Task', TaskSchema);
