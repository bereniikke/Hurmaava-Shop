// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // e.g., 'admin', 'user', etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
