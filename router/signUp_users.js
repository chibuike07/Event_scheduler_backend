const express = require("express");
const router = express.Router();
const SignupUser = require("../controller/signUp_users");
const { userVerifyToken } = require("../middleware/userAuth");

router.post("/user/signup", SignupUser.post_new_users);
router.get("/user_list", userVerifyToken, SignupUser.get_user);

module.exports = router;
