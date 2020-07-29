const express = require("express");
const router = express.Router();
const events = require("../controller/events");
const auth = require("../controller/auth");

router.post("/scheduler/events", events.add_event);

module.exports = router;
