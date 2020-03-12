module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userType: {
      type: DataTypes.ENUM("Manager", "User"),
      defaultValue: "User"
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0"
    }
  });
  return User;
};
