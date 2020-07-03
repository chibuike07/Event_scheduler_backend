const scheduledEvent = require("../models/events");
const SignUpUser = require("../models/signUp_users");
let array = [];
exports.add_event = (req, res) => {
  const { title, reminderDate, description, fullName } = req.body;
  const event = new scheduledEvent({
    title,
    reminderDate: new Date(reminderDate),
    description
  });
  res.status(200).send("ok");
  console.log("event", event);
  addUserEvent(fullName, event);
};

exports.put_event = async (req, res) => {
  const { id } = req.params;

  scheduledEvent.findByIdAndUpdate(id, req.body, (err, updated) => {
    if (err) {
      return err;
    } else {
      res.send(updated);
      console.log(updated);
    }
  });
};

exports.delete_event = async (req, res) => {
  const { id } = req.params;
  const removedData = await scheduledEvent.findByIdAndRemove(
    id,
    (err, removed) => {
      if (err) {
        return err;
      } else {
        res.send(removed);
        console.log(removed);
      }
    }
  );
};

exports.get_event = async (req, res) => {
  const findEvent = await scheduledEvent.find();
  res.send(findEvent);
  console.log(findEvent);
};

const addUserEvent = async (name, event) => {
  array.push(event);
  await SignUpUser.updateMany(
    { fullName: name },
    { $set: { event: array } },
    (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Event updated successfully");
      }
    }
  );
};
