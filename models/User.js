const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: false,
  },
  healthid: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  avatar: {
    type: String,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
