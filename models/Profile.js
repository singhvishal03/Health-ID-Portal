const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  bloodgroup: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  healthidno: {
    type: String,
    required: false,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
