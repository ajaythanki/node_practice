const debug = require("debug")("app:debug");
const config = require("config");
const express = require("express");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

const helmet = require("helmet");
const morgan = require("morgan");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/", home);
console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server : ${config.get("mail.host")}`);
console.log(`Mail Password : ${config.get("mail.password")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.use(logger);

app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listing on port ${port}...`);
});
