const jwt = require("jsonwebtoken");
module.exports.userVerifyToken = async (req, res, next) => {
  //get the token secret from the .env file
  const { USER_ACCESS_SECRETE } = process.env;
  // const token = req.header(VENDOR_TOKEN_KEY);
  const token = req.cookies[process.env.USER_TOKEN_KEY] || "";
  if (!token) {
    return res.status(401).send({
      message: "access denied",
      status: "error",
    });
  }

  try {
    const verified = await jwt.verify(token, USER_ACCESS_SECRETE);

    //getting the userId and the token duration;
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({
      message: "invalid token" + error,
      status: "error",
    });
  }
};
