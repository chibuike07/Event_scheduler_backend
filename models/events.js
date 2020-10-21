const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const event = new Schema(
  {
    title: { type: String, required: true },
    reminderDate: { type: String, required: true },
    reminderTime: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Scheduler = mongoose.model("EventScheduler", event);
module.exports = Scheduler;
