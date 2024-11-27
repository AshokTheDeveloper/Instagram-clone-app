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

const getUsers = async (req, res) => {
  try {
    const db = await dbPromise;
    const getUsersQuery = `SELECT * FROM users`;
    const users = await db.all(getUsersQuery);
    return res.status(200).json({ users: users });
  } catch (error) {
    console.log("Internal Server error 3: ", error.message);
  }
};

module.exports = { signup, login, getUsers, logout };
