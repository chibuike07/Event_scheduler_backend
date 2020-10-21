const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admin_event = new Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Object, required: true },
  },
  { timestamps: true }
);

const Admin_post = mongoose.model("admin", admin_event);
module.exports = Admin_post;
