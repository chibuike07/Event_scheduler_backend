const multer = require("multer");
const URL = require("url");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary_url = URL.parse(`${process.env.CLOUDINARY_URL}`);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  //   cloud_name: cloudinary_url.host,
  //   api_key: cloudinary_url.auth.split(":")[0],
  //   api_secret: cloudinary_url.auth.split(":")[1],
});
let parser;
try {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "Admin_event_photo",
      format: ["png", "jpeg", "jpg"],
      public_id: (req, file) => file.destination,
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
  });
  console.log("ends here");

  parser = multer({ storage: storage });
} catch (err) {
  if (err.response === undefined) {
    return console.log("got here");
  } else {
    console.log(err);
  }
}

module.exports = { parser };
