const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotEnv.config();

const { initializeDBAndServer } = require("./utils/dbAndServerUtils");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;

app.use("/users", userRoutes);

initializeDBAndServer(app, PORT);
