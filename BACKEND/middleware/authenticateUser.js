const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const SECRETE_KEY = process.env.KEY;
  const jwtToken = req.cookies.jwt_token;
  if (!jwtToken) {
    return res.status(401).json({ message: "Invalid access token" });
  }

  try {
    jwt.verify(jwtToken, SECRETE_KEY, (error, payload) => {
      if (error) {
        return res.status(401).json({ message: "Invalid access token" });
      } else {
        req.user = payload;
        next();
      }
    });
  } catch (error) {
    console.log("Error at middleware: ", error.message);
  }
};

module.exports = authenticateUser;
