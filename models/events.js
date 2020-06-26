const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const event = new Schema({
  title: String,
  date: { type: Date },
  remindDate: { type: Date }
});

let Scheduler = mongoose.model("EventScheduler", event);
module.exports = Scheduler;
