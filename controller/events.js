const scheduledEvent = require("../models/events");
const SignInUser = require("../models/signIn_user");
let array = [];
exports.add_event = (res, req) => {
  const { title, currentDate, reminderDate } = req.body;
  const event = new scheduledEvent({
    title,
    currentDate,
    reminderDate
  });
  userEvents.push(event);
  console.log(event);
};

exports.put_books_activity = async (req, res) => {
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

exports.delete_books_activity = async (req, res) => {
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
