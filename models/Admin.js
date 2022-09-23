const mongoose = require('mongoose');
const AdminUserSchema = new mongoose.Schema({
  adminid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = Admin = mongoose.model('admin', AdminUserSchema);
