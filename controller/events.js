const scheduledEvent = require("../models/events");

const nodeMailer = require("nodemailer");
const cronJob = require("node-cron");
const schedule = require("node-schedule");
const { eventValidator } = require("../middleware/eventValidator");

exports.add_event = async (req, res) => {
  //destructuring the request body
  const { title, reminderDate, reminderTime, description } = req.body;

  //checking for error
  const { error } = eventValidator.validate(req.body);

  if (error) {
    //sending error response to the client
    return res.status(401).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  //creating new event
  const Event = new scheduledEvent({
    title,
    reminderDate,
    reminderTime,
    description,
    userId: req.user._id,
  });

  try {
    //saving the event to the database
    await Event.save();

    // sending a success message to the client
    return res.status(200).json({
      message: "event added successfully",
      status: "success",
    });
  } catch (error) {
    //sendint an error message to the client
    return res.status(400).json({
      message: error,
      status: "error",
    });
  }
};

module.exports.getUserEvent = async (req, res) => {
  //creating pagination with the query from the client
  const { page = 1, limit = 10 } = req.query;

  //getting event of the logged in client
  const getEvent = await scheduledEvent
    .find({ userId: req.user._id })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  //checking if client has scheduled any event
  if (!getEvent) {
    return res.status(200).json({
      message: "Not a registered user yet",
    });
  }

  //sending the event to the client
  return res.status(200).json({
    data: getEvent,
    status: "success",
  });
};

module.exports.put_event = async (req, res) => {
  //geting the event id from the params
  const { eventId } = req.params;

  const { error } = eventValidator.validate(req.body);

  if (error) {
    //sending error response to the client
    return res.status(401).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  //getting the event id and update the event
  const foundUser = await scheduledEvent.findByIdAndUpdate(eventId, req.body);

  // sending an error message if the event id does not exist
  if (!foundUser) {
    return res.status(401).json({
      message: "No match was found",
      status: "error",
    });
  }

  //sending a success response if the event update went successfully
  return res.status(200).json({
    message: "Updated successfully",
    status: "success",
  });
};

exports.delete_event = async (req, res) => {
  //geting the event id from the params
  const { eventId } = req.params;

  // getting the event id that match the request id and delete it
  await scheduledEvent.findByIdAndDelete(eventId, (err, removed) => {
    if (err) {
      //sending an error response if the deleting of the event did not  went successfully
      return res.status(400).json({
        message: "No match was found",
        status: "error",
      });
    } else {
      //sending a success response to the client if event was deleted successfully
      return res.status(200).json({
        message: "Removed successfully",
        status: "success",
      });
    }
  });
};

const alertReadyEvent = async () => {
  let user = await scheduledEvent.find({});
  let now = new Date().toLocaleDateString();
  user.map(({ event, email, fullName }) => {
    if (event.length > 0) {
      let dueEvent = event.filter(
        ({ reminderDate, description, title, reminderTime }) => {
          if (new Date(reminderDate).toLocaleDateString() === now) {
            console.log("reminderDate", reminderDate);
            console.log(email);
            // sendEmail(
            //   email,
            //   fullName,
            //   description,
            //   title,
            //   reminderDate,
            //   reminderTime
            // );
          }
        }
      );
    }
  });
};

// alertReadyEvent();
// const excuteTime = () => {
//   schedule.scheduleJob("* * * * *", () => {

//     // console.log("hey dey");

//   });
// }

const sendEmail = (signupMemberEmail, fullName, desc, title, date, time) => {
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASS,
    },
  });

  let mailOptions = {
    from: "chibuikeprincewill42@gmail.com",
    to: signupMemberEmail,
    subject: "library app",
    html: `<h1>HELLO ${fullName.toUpperCase()}</h1> <p>This mail is brought to you from Schedule App team,</p> <p>This message is sent to remind you of the event you will be having today at ${new Date(
      time
    ).toTimeString()}. Below is the event</p>   <div><h2>${title.toUpperCase()}</h2> <p>The activity description is ${desc.toUpperCase()} is scheduled on 
     ${date}
     </p></div>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      throw new Error(err);
    } else {
      throw `email successfully sent! ${info.response}`;
    }
  });
};
