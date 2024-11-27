const express = require("express");
const router = express.Router();

const {
  getUsers,
  signup,
  login,
  logout,
} = require("../controllers/users.controllers");
const authenticateUser = require("../middleware/authenticateUser");

router.get("/", authenticateUser, getUsers);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);

module.exports = router;
