const fs = require("fs");
const AdminEvents = require("../models/admin_post");
const { adminValidator } = require("../middleware/adminValidator");

exports.add_post = async (req, res, next) => {
  const { title, description } = req.body;

  const { error } = adminValidator.validate(req.body);

  if (error) {
    return res.status(401).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  // console.log("req.file", req.file);
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  const readyEvents = new AdminEvents({
    title,
    date,
    time,
    description,
    image: req.file.path,
  });

  try {
    await readyEvents.save();

    return res.status(200).json({
      message: "Event saved successfully",
      status: "success",
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
      status: "error",
    });
  }
};

exports.get_Admin_event = async (req, res) => {
  const { page, limit } = req.query;

  const adminEvent = await AdminEvents.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);

  if (!adminEvent) {
    return res.status(400).json({
      message: "No event has been created",
      status: "error",
    });
  }

  if (adminEvent.length < 1) {
    return res.status(200).json({
      message: "you have reached the page limit",
      status: "success",
    });
  }
  return res.status(200).json({ data: adminEvent, status: "success" });
};

exports.getSpecifiedEvent = async (req, res) => {
  const { id } = req.params;

  const specifiedEvent = await AdminEvents.findById({ _id: id });
  if (!specifiedEvent) {
    return res.status(400).json({
      message: "No match was found",
      status: "error",
    });
  }

  return res.status(200).json({ data: specifiedEvent, status: "success" });
};

exports.put_Amin_event = async (req, res) => {
  const { id } = req.params;
  const dynamicField = {};
  const { accessKey, adjustment } = req.body;

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
        return res.status(400).json({
          message:
            "error occured while trying to update event, kindly try again",
          status: "error",
        });
      } else {
        return res.status(200).json({
          message: "event updated successfully",
          status: "success",
        });
      }
    }
  );
};

exports.delete_event = async (req, res) => {
  const { id } = req.params;

  await AdminEvents.findByIdAndDelete(id, (err, removed) => {
    if (err) {
      return res.status(400).json({
        message:
          "could not delete event. check if you added the correct fields",
        status: "error",
      });
    } else {
      return res.status(200).json({
        message: "event deleted successfully",
        status: "error",
      });
    }
  });
};
