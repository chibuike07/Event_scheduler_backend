const express = require("express");
const router = express.Router();
const events = require("../controller/events");
const { userVerifyToken } = require("../middleware/userAuth");

// const auth = require("../controller/auth");

router.post("/user/events", userVerifyToken, events.add_event);

router.get("/user_list/update", userVerifyToken, events.getUserEvent);

router.put("/user_list/update/:eventId", userVerifyToken, events.put_event);

router.delete(
  "/user_list/update/:eventId",
  userVerifyToken,
  events.delete_event
);

module.exports = router;
