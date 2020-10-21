const scheduledEvent = require("../models/events");

const nodeMailer = require("nodemailer");
const cronJob = require("node-cron");
const schedule = require("node-schedule");
const { eventValidator } = require("../middleware/eventValidator");

exports.add_event = async (req, res) => {
  const { title, reminderDate, reminderTime, description, fullName } = req.body;

  const { error } = eventValidator.validate(req.body);

  if (error) {
    return res.status(401).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  const verifyName = await scheduledEvent.findOne({ fullName: fullName });

  if (!verifyName) {
    return res.status(400).json({
      message: "No match was found",
      status: "error",
    });
  }

  const Event = new scheduledEvent({
    title,
    reminderDate,
    reminderTime,
    description,
  });

  await addUserEvent({ fullName, Event, res });
};

const addUserEvent = async ({ fullName, Event, res }) => {
  await scheduledEvent.updateOne(
    { fullName: fullName },
    { $push: { event: Event } }
  );

  return res.status(200).json({
    message: "event added successfully",
    status: "success",
  });
};

module.exports.getUserEvent = async (req, res) => {
  const getEvent = scheduledEvent.find();

  if (!getEvent) {
    return res.status(200).json({
      message: "No registered user yet",
    });
  }

  return res.status(200).json({
    data: getEvent,
    status: "success",
  });
};

module.exports.put_event = async (req, res) => {
  const { eventId } = req.params;

  // const eventId = await SignUpUser
  const foundUser = await scheduledEvent.findByIdAndUpdate(eventId, req.body);

  if (!foundUser) {
    return res.status(401).json({
      message: "No match was found",
      status: "error",
    });
  }

  return res.status(200).json({
    message: "Updated successfully",
    status: "success",
  });
};

exports.delete_event = async (req, res) => {
  const { eventId } = req.params;

  await scheduledEvent.findByIdAndDelete(eventId, (err, removed) => {
    if (err) {
      return res.status(400).json({
        message: "No match was found",
        status: "error",
      });
    } else {
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

alertReadyEvent();
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
