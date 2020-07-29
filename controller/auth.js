const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // console.log("res.req", req);
    const token = req.headers.authorization.split(" ")[1];
    // console.log("alphas", token);
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // console.log("userId", decodedToken);
    const userId = decodedToken.userId;
    if (req.query.userId && req.query.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!")
    });
  }
};
