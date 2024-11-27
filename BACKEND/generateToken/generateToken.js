const jwt = require("jsonwebtoken");

const generateToken = (user, res) => {
  try {
    const payload = {
      id: user,
    };

    const SECRETE_KEY = process.env.KEY;
    const jwtToken = jwt.sign(payload, SECRETE_KEY, { expiresIn: "7d" });
    
    return res.status(200).json({ jwt_token: jwtToken });

    // res.cookie("jwt_token", jwtToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "development",
    //   sameSite: "None",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });
  } catch (error) {
    return res.status(500).json({ message: "Failed to generate token" });
  }
};

module.exports = generateToken;
