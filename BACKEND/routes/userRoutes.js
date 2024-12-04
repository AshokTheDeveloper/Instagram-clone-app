const express = require("express");
const router = express.Router();

const {
  getUsers,
  signup,
  login,
  logout,
  post,
  userProfilePosts,
  followUser,
  homePosts,
  profileUser,
} = require("../controllers/users.controllers");

const authenticateUser = require("../middleware/authenticateUser");

router.get("/", authenticateUser, getUsers);
router.get("/profile-user", authenticateUser, profileUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/home-posts", authenticateUser, homePosts);
router.post("/logout", authenticateUser, logout);
router.post("/posts/create-post", authenticateUser, post);
router.get("/posts/user-posts", authenticateUser, userProfilePosts);
router.post("/follow-user", authenticateUser, followUser);

module.exports = router;
