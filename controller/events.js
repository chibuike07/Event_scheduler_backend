const scheduledEvent = require("../models/events");
const SignUpUser = require("../models/signUp_users");
const nodeMailer = require("nodemailer");
const cronJob = require("node-cron");
const schedule = require("node-schedule");
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
        }
      }
    );
  });
};

const alertReadyEvent = async () => {
  let user = await SignUpUser.find({});
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
      user: "chibuikeprincewill42@gmail.com",
      pass: "07vuLybboH"
    }
  });

  let mailOptions = {
    from: "chibuikeprincewill42@gmail.com",
    to: signupMemberEmail,
    subject: "library app",
    html: `<h1>HELLO ${fullName.toUpperCase()}</h1> <p>This mail is brought to you from Schedule App team,</p> <p>This message is sent to remind you of the event you will be having today at ${new Date(
      time
    ).toTimeString()}. Below is the event</p>   <div><h2>${title.toUpperCase()}</h2> <p>The activity description is ${desc.toUpperCase()} is scheduled on 
     ${date}
     </p></div>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`email successfully sent! ${info.response}`);
    }
  });
};
