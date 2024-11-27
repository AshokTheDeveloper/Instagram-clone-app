const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const rootDir = require("./pathUtils");
const dbPath = path.join(rootDir, "db", "instadb.db");

const dbPromise = open({
  filename: dbPath,
  driver: sqlite3.Database,
});

const initializeDBAndServer = async (app, PORT) => {
  try {
    await dbPromise;
    app.listen(PORT, () => {
      console.log(
        `DB and Server started and listens on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.log("DB connection failed");
  }
};

module.exports = { dbPromise, initializeDBAndServer };
