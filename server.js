const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");
const database = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(database)
  .then(() => console.log("database connection successful"))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

const port = 8000;
const server = app.listen(port, () => {
  console.log("app running | listenting port: 8000");
});
