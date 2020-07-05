const scheduledEvent = require("../models/events");
const SignUpUser = require("../models/signUp_users");
exports.add_event = async (req, res) => {
  const { title, reminderDate, description, fullName } = req.body;
  const event = new scheduledEvent({
    title,
    reminderDate: new Date(reminderDate),
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
      //updated the user object with the book the user borrowed
      _id, //set the id to find
      others._doc, //things to update
      (err, updated) => {
        if (err) {
          return err;
        } else {
          console.log("memberUpdated", updated);
        }
      }
    );
  });
};
