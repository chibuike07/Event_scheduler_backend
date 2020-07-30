const express = require("express");
const adminPost = require("../controller/Admin_post");
const router = express.Router();
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { CLOUD_NAME, API_KEY, API_SECRETE } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRETE,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Admin_event_photo",
    allowedFormats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => file.originalname,
  },
});

const parser = multer({ storage: storage });
router.post("/admin_post/events", parser.single("file"), adminPost.add_post);
router.get("/admin_post/event_update/", adminPost.get_Admin_event);
router.delete("/admin_post/event_update/:id", adminPost.delete_event);
module.exports = router;
