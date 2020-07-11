const bcrypt = require("bcryptjs");
const SignUpUser = require("../models/signUp_users");
const jwt = require("jsonwebtoken");
exports.get_user = async (req, res) => {
  const { email: Email, password: pass } = req.body;
  let secureId = await SignUpUser.find({ email: Email });
  if (secureId.length < 1) {
    res.status(200).send({ statusr: 401 });
  } else {
    let auth = null;
    secureId.find(({ email, password, fullName, _id }) => {
      -bcrypt.compare(pass, password, (err, isMatch) => {
        bcrypt.compare(pass, password, (err, isMatch) => {
          if (err) {
            res
              .status(200)
              .send({ error: "server error please try again later" });
          } else if (!isMatch) {
            res.status(200).send({ error: 401 });
          } else {
            const token = jwt.sign({ userId: _id }, "RAMDOM_TOKEN_SECRET", {
              expiresIn: "24h"
            });
            auth = { fullName, token };
            res.status(200).send(auth);
          }
        });
      });
    });
  }
};
