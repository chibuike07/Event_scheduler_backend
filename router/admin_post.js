const express = require("express");
const adminPost = require("../controller/Admin_post");
const { parser } = require("../middleware/cloudinaryVerification");
const router = express.Router();

router.post("/admin_post/events", parser.single("file"), adminPost.add_post);

router.get("/admin_post/event_update/", adminPost.get_Admin_event);

router.get("/admin_post/event_update/:id", adminPost.getSpecifiedEvent);

router.put(
  "/admin_post/event_update/:id",
  // parser.single("admin_upload"),
  adminPost.put_Amin_event
);

router.delete("/admin_post/event_update/:id", adminPost.delete_event);

module.exports = router;
