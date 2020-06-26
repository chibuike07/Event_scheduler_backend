const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SignUpUsers = new Schema({
  fullName: String,
  email: String,
  password: String,
  gender: String
});

let SignUp_users = mongoose.model("SignUpUser", SignUpUsers);
module.exports = SignUp_users;
