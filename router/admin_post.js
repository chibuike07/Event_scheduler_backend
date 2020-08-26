const express = require("express");
const adminPost = require("../controller/Admin_post");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const URL = require("url");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CLOUDINARY_URL } = process.env;
const cloudinary_url = URL.parse(`${process.env.CLOUDINARY_URL}`);
cloudinary.config({
  cloud_name: cloudinary_url.host,
  api_key: cloudinary_url.auth.split(":")[0],
  api_secret: cloudinary_url.auth.split(":")[1],
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Admin_event_photo",
    allowedFormats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => file.filename,
  },
});
const parser = multer({ storage: storage });
router.post("/admin_post/events", parser.single("file"), adminPost.add_post);
router.get("/admin_post/event_update/", adminPost.get_Admin_event);
router.get("/admin_post/event_update/:id", adminPost.getSpecifiedEvent);
router.put(
  "/admin_post/event_update/:id",
  parser.single("admin_upload"),
  adminPost.put_Amin_event
);
router.delete("/admin_post/event_update/:id", adminPost.delete_event);
module.exports = router;
