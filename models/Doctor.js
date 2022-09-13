const mongoose = require('mongoose');

const DoctorUserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: false,
  },
  doctorid: {
    type: String,
    required: true,
  },
  department: {
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
  gender: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  consultancycharge: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = Doctor = mongoose.model('doctor', DoctorUserSchema);
