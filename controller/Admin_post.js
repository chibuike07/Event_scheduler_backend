const fs = require("fs");
const AdminEvents = require("../models/admin_post");

exports.add_post = (req, res, next) => {
  const { title, description } = req.body;
  console.log("req.file", req.file);
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const readyEvents = new AdminEvents({
    title,
    date,
    time,
    description,
    image: req.file.path,
  });
  console.log("readyEvents", readyEvents);
  readyEvents.save();
};

exports.get_Admin_event = async (req, res) => {
  const adminEvent = await AdminEvents.find();
  res.send(adminEvent);
};

exports.getSpecifiedEvent = async (req, res) => {
  const { id } = req.params;
  const Specified = await AdminEvents.findById({ _id: id });
  res.send(Specified);
};

exports.put_Amin_event = async (req, res) => {
  const { id } = req.params;
  const dynamicField = {};
  const { accessKey, adjustment } = req.body;
  console.log("req.file", req.file);
  console.log("req.body", req.body);
  if (req.file) {
    dynamicField["image"] = req.file.path;
  } else {
    dynamicField[accessKey] = adjustment;
  }
  await AdminEvents.updateOne(
    { _id: id },
    { $set: dynamicField },
    (err, updated) => {
      if (err) {
        return err;
      } else {
        res.send(updated);
        console.log("AdminEvent updated", updated);
      }
    }
  );
};

exports.delete_event = async (req, res) => {
  const { id } = req.params;
  const removedData = await AdminEvents.findByIdAndRemove(
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
