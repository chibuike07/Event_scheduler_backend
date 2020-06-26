const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const events = new Schema({
  title: String,
  currentDate: Date,
  reminderDate: Date
});
const SignUpUsers = new Schema({
  fullName: String,
  email: String,
  password: String,
  gender: String,
  event: [events]
});

let SignUp_users = mongoose.model("SignUpUser", SignUpUsers);
module.exports = SignUp_users;
