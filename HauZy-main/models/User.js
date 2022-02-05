const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  address: {
    type: String,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
});

module.exports = mongoose.model('User', UserSchema);
