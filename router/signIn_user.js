const express = require("express");
const router = express.Router();
const SignIn = require("../controller/signIn_user");

router.post("/user/login", SignIn.get_user);

module.exports = router;
