const bcrypt = require("bcryptjs");
const SignUpUser = require("../models/signUp_users");
exports.get_user = async (req, res) => {
  const { email: Email, password: pass } = req.body;
  let secureId = await SignUpUser.find({ email: Email });
  console.log("secureId", secureId);
  if (secureId.length < 1) {
    console.log("email failed");
    res.status(200).send({ statusr: 401 });
  } else {
    let auth = null;
    secureId.find(({ email, password, fullName }) => {
      bcrypt.compare(pass, password, (err, isMatch) => {
        if (err) {
          res.status(500).send("server error please try again later");
        } else if (!isMatch) {
          res.status(401).send();
          console.log("not match");
        } else {
          auth = { email, fullName };
          res.status(200).send(auth);
        }
      });
      console.log("email", email);
      console.log("pass", pass);
    });
  }
};
