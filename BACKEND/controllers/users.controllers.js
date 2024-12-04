const bcrypt = require("bcrypt");
const { dbPromise } = require("../utils/dbAndServerUtils");
const generateToken = require("../generateToken/generateToken");

const signup = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  try {
    const db = await dbPromise;

    const findUserQuery = `SELECT * FROM users WHERE email = '${email}'`;
    const findUser = await db.get(findUserQuery);
    if (!findUser) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hashing password
      const createUserQuery = `
        INSERT INTO
          users (fullname, username, email, password)
        VALUES
          ('${fullname}', '${username}','${email}', '${hashedPassword}')`;
      const user = await db.run(createUserQuery);
      const createdUserId = user.lastID;
      const getUserQuery = `SELECT id, fullname, username, email FROM users WHERE id = '${createdUserId}'`;
      const createdUser = await db.get(getUserQuery);
      return res.status(201).json({ user: createdUser });
    } else {
      return res.status(401).json({ message: "User already exists" });
    }
  } catch (error) {
    console.log("Internal server error 1: ", error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = await dbPromise;
    const findUserQuery = `SELECT * FROM users WHERE email = '${email}'`;
    const dbDbUser = await db.get(findUserQuery);
    if (!dbDbUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, dbDbUser.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        return generateToken(dbDbUser.id, res);
      }
    }
  } catch (error) {
    console.log("Internal server error 2: ", error.message);
  }
};

const logout = (req, res) => {
  return res.clearCookie("jwt_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
};

const homePosts = async (req, res) => {
  const { id } = req.user;
  try {
    const db = await dbPromise;
    const getHomePostsQuery = `
    SELECT
      post.id AS post_id,
      users.id AS user_id,
      users.fullname AS full_name,
      users.username AS username,
      follow.created_at,
      post.image_url,
      post.caption
    FROM
      post
    JOIN follow ON post.user_id = follow.following_id
    JOIN users ON post.user_id = users.id
    WHERE
      follow.follower_id = ${id};
  `;

    const dbHomePosts = await db.all(getHomePostsQuery);

    if (!dbHomePosts || dbHomePosts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    return res.status(200).json({ posts: dbHomePosts });
  } catch (error) {
    console.error("Error fetching home posts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const post = async (req, res) => {
  const { imageUrl, caption } = req.body;
  const { id } = req.user;
  try {
    const db = await dbPromise;
    const findUser = `SELECT * FROM users WHERE id = '${id}'`;
    const dbUser = await db.get(findUser);
    if (!dbUser) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const createPostQuery = `
      INSERT INTO
        post(caption, image_url, user_id)
      VALUES
        ('${caption}', '${imageUrl}', '${id}')
      `;
    await db.run(createPostQuery);
    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Internal server error: ", error.message);
  }
};

const profileUser = async (req, res) => {
  const { id } = req.user;
  try {
    const db = await dbPromise;
    const findUserQuery = `SELECT id, username, fullname FROM users WHERE id = '${id}'`;
    const dbUser = await db.get(findUserQuery);
    if (!dbUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ profile_user: dbUser });
  } catch (error) {
    console.log("Internal server error: ", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  const { id } = req.user;
  try {
    const db = await dbPromise;
    const getUsersQuery = `SELECT id, username FROM users WHERE id <> '${id}'`;
    const users = await db.all(getUsersQuery);
    return res.status(200).json({ users: users });
  } catch (error) {
    console.log("Internal Server error 3: ", error.message);
  }
};

const userProfilePosts = async (req, res) => {
  const { id } = req.user;
  try {
    const db = await dbPromise;
    const findUserQuery = `SELECT * FROM users WHERE id = '${id}'`;
    const dbUser = await db.get(findUserQuery);
    if (!dbUser) {
      return res.status(401).json({ message: "User not found" });
    }
    const userPostsQuery = `SELECT * FROM post WHERE user_id = '${id}'`;
    const userPosts = await db.all(userPostsQuery);
    return res.status(200).json({ posts: userPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
  const { userId } = req.body;
  const { id } = req.user;
  console.log("Logged-in user ID: ", id);
  try {
    const db = await dbPromise;
    const followUserQuery = `
        INSERT INTO follow (follower_id, following_id)
        VALUES ('${id}', '${userId}')
      `;

    await db.run(followUserQuery);
    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  homePosts,
  getUsers,
  profileUser,
  logout,
  post,
  userProfilePosts,
  followUser,
};
