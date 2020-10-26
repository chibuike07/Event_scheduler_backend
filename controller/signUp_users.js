const SignUpUser = require("../models/signUp_users");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const { SignUpValiddator } = require("../middleware/registrationValidation");
require("dotenv").config();

exports.post_new_users = async (req, res) => {
  const { fullName, email, password, gender } = req.body;
  const { error } = SignUpValiddator.validate(req.body);

  if (error) {
    //send a message if error
    return res.status(400).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  const emailExist = await SignUpUser.findOne({ email: email });

  if (emailExist) {
    return res.status(401).json({
      message: "Email already exist",
      status: "error",
    });
  }

  const saltR = 10;
  bcrypt.genSalt(saltR, async (err, salt) => {
    if (err) {
      return res.status(500).json({
        message: "internal server error",
        status: "error",
      });
    } else {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "server error try again",
            status: "error",
          });
        }

        const NewMember = new SignUpUser({
          //creating an instance of User data
          fullName,
          email,
          gender,
          password: hash,
        });

        try {
          //saving the new member to mongodb
          await NewMember.save();

          res.status(200).json({
            message: "user added successfully",
            userId: NewMember._id,
            status: "success",
          });

          sendEmail(email, password, fullName);
        } catch (error) {
          return res.status(401).json({
            message: error.message,
            status: "error",
          });
        }
      });
    }
  });
};

exports.get_user = async (req, res) => {
  const { userId } = req.params;

  if (userId === undefined) {
    return res.status(400).json({
      message: "please add the ID of the user",
      status: "error",
    });
  }
  //getting all the member from the mongodb
  const FindMembers = await SignUpUser.findById({ _id: userId });

  //check for error
  if (!FindMembers) {
    return res.status(400).json({
      message: "user does not exist",
      error: "error",
    });
  }

  return res.status(200).json({ data: FindMembers, status: "success" }); //sending the found memeber to registered_members path
};

const sendEmail = (signupMemberEmail, pass, fullName, res) => {
  const { EMAIL, PASSWORD } = process.env;
  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: `${PASSWORD}`,
      pass: `${EMAIL}`,
    },
  });

  let mailOptions = {
    from: `${EMAIL}`,
    to: signupMemberEmail,
    subject: "library app",
    html: `<h1>Hello ${fullName.toUpperCase()} </h1> <p>this mail is from scheduler events app,</p> <p>Thank you for signing up with us.</p> <p>This are your secret credentials below.</p> <p>Email: ${signupMemberEmail}\n password: ${pass}</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      throw `email successfully sent! ${info.response}`;
    }
  });
};
