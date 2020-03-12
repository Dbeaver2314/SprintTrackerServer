module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define("teams", {
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
  return Teams;
};
