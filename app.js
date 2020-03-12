require("dotenv").config();
// express
const express = require("express");
const app = express();
// db import
const sequelize = require("./db");
sequelize.sync(); //to drop tables use { force: true}
app.use(express.json());

//middleware import
app.use(require("./middleware/headers"));

//controllers
const user = require("./controllers/usercontroller");
const backlog = require("./controllers/backlogcontroller");
const team = require("./controllers/teamscontroller");

//routes

app.use("/auth", user);
app.use("/team", team);
app.use(require("./middleware/validate-session"));
app.use("/backlog", backlog);

app.listen(process.env.PORT, () =>
  console.log(`app is destroying all humans on ${process.env.PORT}`)
);
