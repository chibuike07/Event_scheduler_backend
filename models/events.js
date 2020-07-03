const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const event = new Schema({
  title: String,
  reminderDate: String,
  description: String
});

let Scheduler = mongoose.model("EventScheduler", event);
module.exports = Scheduler;
