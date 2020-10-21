const express = require("express");
const router = express.Router();
const events = require("../controller/events");

// const auth = require("../controller/auth");

router.post("/user/events", events.add_event);

router.get("/user_list/update/", events.getUserEvent);

router.put("/user_list/update/:eventId", events.put_event);

router.delete("/user_list/update/:eventId", events.delete_event);

module.exports = router;
