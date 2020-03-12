const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.NAME,
  "postgres",
  process.env.PASS,
  {
    host: "localhost",
    dialect: "postgres"
  }
);

sequelize
  .authenticate()
  .then(() => console.log("database is connected"))
  .catch(err => console.log(err));

User = sequelize.import("./models/user");
Backlog = sequelize.import("./models/backlog");

Backlog.belongsTo(User);
User.hasMany(Backlog);

module.exports = sequelize;
