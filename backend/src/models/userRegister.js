const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userRegisterSchema = mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userRegisterSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserRegister",userRegisterSchema);