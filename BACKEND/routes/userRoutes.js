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
  commentPost,
  getComments,
  getUser,
  userPosts,
  likePost,
  likesCount,
} = require("../controllers/users.controllers");

const authenticateUser = require("../middleware/authenticateUser");

router.get("/", authenticateUser, getUsers);
router.get("/profile-user", authenticateUser, profileUser);
router.get("/user/:username", authenticateUser, getUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/home-posts", authenticateUser, homePosts);
router.post("/logout", authenticateUser, logout);
router.post("/posts/create-post", authenticateUser, post);
router.get("/posts/user-posts", authenticateUser, userProfilePosts);
router.get("/posts/:username", authenticateUser, userPosts);
router.post("/follow-user", authenticateUser, followUser);
router.post("/post/comment", authenticateUser, commentPost);
router.get("/posts/comments/:postId", authenticateUser, getComments);
router.post("/post/like", authenticateUser, likePost);
router.get("/post/likes/:postId", authenticateUser, likesCount);

module.exports = router;
