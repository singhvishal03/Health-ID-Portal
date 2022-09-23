const mongoose = require('mongoose');

const DoctorProfileSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
  },
  phoneno: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
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

module.exports = DoctorProfile = mongoose.model(
  'doctorprofile',
  DoctorProfileSchema
);
