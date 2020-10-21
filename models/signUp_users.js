const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const SignUpUsers = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

SignUpUsers.plugin(uniqueValidator);

const SignUp_users = mongoose.model("SignUpUser", SignUpUsers);

module.exports = SignUp_users;
