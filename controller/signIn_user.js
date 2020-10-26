const bcrypt = require("bcryptjs");
const SignUpUser = require("../models/signUp_users");
const jwt = require("jsonwebtoken");
const { SignInValidator } = require("../middleware/registrationValidation");
exports.get_user = async (req, res) => {
  const { email: Email, password } = req.body;

  const { error } = SignInValidator.validate(req.body);

  if (error) {
    return res.status(401).json({
      message: error.details[0].message.split('"').join(""),
      status: "error",
    });
  }

  let verifyUser = await SignUpUser.findOne({ email: Email });

  if (!verifyUser) {
    return res.status(400).json({
      message: "email or password incorrect",
      status: "error",
    });
  }

  const isValidEntry = await bcrypt.compare(password, verifyUser.password);

  if (!isValidEntry) {
    return res.status(400).json({
      message: "email or password incorrect",
      error: "error",
    });
  }

  const token = jwt.sign(
    { _id: verifyUser._id },
    process.env.USER_ACCESS_SECRETE,
    {
      expiresIn: "24h",
    }
  );

  res
    .cookie(process.env.USER_TOKEN_KEY, token, {
      expires: new Date(Number(new Date()) + 86400000), // expires after 24hrs
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    })
    .json({
      message: "login successful",
      status: "success",
      userId: verifyUser._id,
      fullName: verifyUser.fullName,
    });
};
