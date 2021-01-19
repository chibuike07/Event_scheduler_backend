const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const signUpUser = require("./router/signUp_users");
const eventScheduler = require("./router/events");
const SignIn = require("./router/signIn_user");
const AdminPostEvent = require("./router/admin_post");

require("dotenv").config();
const Options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const PORT = process.env.PORT || 7000;
// const MONGODB_URI = `${process.env.MONGODB_URI}`;
const MONGODB_URI = "mongodb://localhost:07017(express.server)";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", signUpUser);
app.use("/api/v1/", SignIn);
app.use(bodyParser.json());
app.use("/api/v1/", eventScheduler);
app.use("/api/v1/", AdminPostEvent);

mongoose
  .connect(MONGODB_URI, Options)
  .then(console.log("connected succesfully"))
  .catch((err) => console.error(err));

// https://medium.com/make-school/how-to-deploy-your-node-js-mongodb-app-to-the-web-using-heroku-63d4bccf2675
app.listen(PORT, () => {
  console.log(`server ready on ${PORT}`);
});
