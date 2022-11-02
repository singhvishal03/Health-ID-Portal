const mongoose = require('mongoose');
const TreatmentHistorySchema = new mongoose.Schema({
  healthidno: {
    type: String,
    required: true,
  },
  lasttreatment: {
    type: String,
    required: true,
  },
  typeoftreatment: {
    type: String,
    required: true,
  },
  dateoftreatment: {
    type: Date,
    required: true,
  },
  givenbytreatment: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

module.exports = TreatmentHistory = mongoose.model(
  'treatmenthistory',
  TreatmentHistorySchema
);
