const { DataTypes } = require("sequelize");
const { sequelize } = require("./index");

const Profile = sequelize.define("Profile", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

(async () => {
  await Profile.sync();
})()

module.exports = Profile;
