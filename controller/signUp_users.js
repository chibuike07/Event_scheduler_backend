const SignUpUser = require("../models/signUp_users");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
exports.post_new_users = (req, res) => {
  const { fullName, email, password, gender } = req.body;

  const pass = password;
  const saltR = 10;
  bcrypt.genSalt(saltR, (err, salt) => {
    if (err) {
      console.error(err);
    } else {
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          const member = new SignUpUser({
            //creating an instance of User data
            fullName,
            email,
            gender,
            password: hash
          });
          member.save(); //saving the new member to mongodb
          console.log(member);
        }
      });
    }
  });
  sendEmail(email, password, fullName);
};

exports.get_user = async (req, res) => {
  //getting all the member from the mongodb
  const findMembers = await SignUpUser.find();
  res.send(findMembers); //sending the found memeber to registered_members path
};

exports.put_event = async (req, res) => {
  const { id } = req.params;
  const { reminderDate } = req.body;
  console.log("reminderDate", reminderDate);
  // reminderDate = new Date(reminderDate).toISOString()
  SignUpUser.findByIdAndUpdate(id, req.body, (err, updated) => {
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
  const removedData = await SignUpUser.findByIdAndRemove(id, (err, removed) => {
    if (err) {
      return err;
    } else {
      res.send(removed);
      console.log(removed);
    }
  });
};

const sendEmail = (signupMemberEmail, pass, fullName) => {
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
    html: `<h1>Hello ${fullName.toUpperCase()} </h1> <p>this mail is from scheduler events app,</p> <p>Thank you for signing up with us.</p> <p>This are your secret credentials below.</p> <p>Email: ${signupMemberEmail}\n password: ${pass}</p>`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`email successfully sent! ${info.response}`);
    }
  });
};
