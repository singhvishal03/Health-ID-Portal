const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
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
  //   confirmpassword: {
  //     type: String,
  //     required: true,
  //   },
  //   bloodgroup: {
  //     type: String,
  //     required: true,
  //   },
  //   address: {
  //     type: String,
  //     required: true,
  //   },
  //   gender: {
  //     type: String,
  //     required: true,
  //   },
  avatar: {
    type: String,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
