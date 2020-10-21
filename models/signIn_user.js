const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signIn_user = new Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

const SignIn = mongoose.model("UserSignIn", signIn_user);
module.exports = SignIn;
