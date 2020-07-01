const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const event = new Schema({
  title: String,
  currentDate: { type: Date },
  reminderDate: { type: Date },
  description: String
});

let Scheduler = mongoose.model("EventScheduler", event);
module.exports = Scheduler;
