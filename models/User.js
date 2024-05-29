const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for a user
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  password: { type: String, required: true } // Password (hashed)
});

// Middleware to hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
