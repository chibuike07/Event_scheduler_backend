const scheduledEvent = require("../models/events");
const SignUpUser = require("../models/signUp_users");
const nodeMailer = require("nodemailer");
exports.add_event = async (req, res) => {
  const { title, reminderDate, reminderTime, description, fullName } = req.body;

  const event = new scheduledEvent({
    title,
    reminderDate,
    reminderTime,
    description
  });
  res.status(200).send("ok");
  await addUserEvent(fullName, event);
};

let array = [];
const addUserEvent = async (name, events) => {
  let user = await SignUpUser.find({ fullName: name });
  user.map(({ event, _id, ...others }) => {
    event.push(events);

    SignUpUser.findByIdAndUpdate(
      //updated the user object with the added event
      _id, //set the id to find
      others._doc, //things to update
      (err, updated) => {
        if (err) {
          return err;
        } else {
          console.log("memberUpdated", updated);
          alertReadyEvent();
        }
      }
    );
  });
};

const alertReadyEvent = name => {
  let user = SignUpUser.find();
  user.map(({ event }) => {
    if (event.length > 0) {
      let dateTime = event.map(
        ({ reminderDate, reminderTime }) => `${reminderDate} ${reminderTime}`
      );
      console.log("dateTime", dateTime);
    }
  });
  let now = new Date().toLocaleDateString();
  let time = new Date().toTimeString();
};
