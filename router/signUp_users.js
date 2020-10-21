const express = require("express");
const router = express.Router();
const SignupUser = require("../controller/signUp_users");
const Auth = require("../controller/auth");

router.post("/user/signup", SignupUser.post_new_users);
router.get("/user_list", SignupUser.get_user);

module.exports = router;
