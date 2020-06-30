const bcrypt = require("bcryptjs");
const SignUpUser = require("../models/signUp_users");
exports.get_user = async (req, res) => {
  const { email: Email, password: pass } = req.body;
  let secureId = await SignUpUser.find();
  let auth = null;
  secureId.map(({ email, password, fullName }) => {
    bcrypt.compare(pass, password, (err, isMatch) => {
      if (err) {
        throw err;
      } else if (!isMatch) {
        isMatch = false;
        auth = { isMatch };
        res.send(auth);
      } else {
        if (email !== Email) {
          isMatch = false;
          auth = { isMatch };
        } else {
          isMatch = true;
          auth = { isMatch, email, fullName };
        }

        res.status(200).send(auth);
        console.log(auth);
      }
    });
  });
};
