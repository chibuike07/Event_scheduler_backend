const express = require("express");
const router = express.Router();
const events = require("../controller/events");

router.post("/scheduler/events", events.add_event);

module.exports = router;
