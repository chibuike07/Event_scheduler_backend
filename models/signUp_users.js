const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const events = new Schema({
  title: { type: String, required: true },
  reminderDate: { type: String, required: true },
  reminderTime: { type: String, required: true },
  description: { type: String, required: true }
});
const SignUpUsers = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  event: [events]
});

SignUpUsers.plugin(uniqueValidator);
let SignUp_users = mongoose.model("SignUpUser", SignUpUsers);
module.exports = SignUp_users;
