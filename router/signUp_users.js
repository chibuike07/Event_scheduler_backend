const express = require("express");
const router = express.Router();
const SignupUser = require("../controller/signUp_users");

router.post("/scheduler/users", SignupUser.post_new_users);
router.get("/scheduler/user_list", SignupUser.get_user);
router.put("/scheduler/user_list/:id", SignupUser.put_event);

module.exports = router;
