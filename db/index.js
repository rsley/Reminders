const { Sequelize } = require("sequelize");

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: `${__dirname}/main.sqlite`,
    logging: false
  });;

  sequelize.authenticate().then(() => {
    logger("Success", "Database", "Connected to MySQL.");
  }).catch((error) => {
    logger("Error", "Database", `Error connecting to MySQL: ${error}`);
  });

  module.exports = { sequelize };