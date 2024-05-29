const mongoose = require('mongoose');

// Define the schema for a task
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the task
  description: { type: String }, // Optional description
  completed: { type: Boolean, default: false }, // Completion status
  createdAt: { type: Date, default: Date.now } // Creation date
});

// Export the Task model
module.exports = mongoose.model('Task', TaskSchema);
