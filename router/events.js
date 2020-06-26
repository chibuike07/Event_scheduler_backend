const express = require("express");
const router = express.Router();
const events = require("../controller/events");

router.post("/scheduler/events", events.add_event);
router.put("/scheduler/events", events.put_event);
router.delete("/scheduler/events", events.delete_event);
router.get("/scheduler/events", events.get_event);

module.exports = router;
