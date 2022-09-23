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
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

module.exports = Doctor = mongoose.model('doctor', DoctorUserSchema);
