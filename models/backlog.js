module.exports = (sequelize, DataTypes) => {
  const backlog = sequelize.define("backlog", {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("Not Started", "Working", "Complete"),
      allowNull: false,
      defaultValue: "Not Started"
    },
    workingUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "0"
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return backlog;
};
