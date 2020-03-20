var Sequelize = require("sequelize");
require("dotenv").config();

var sequelize = new Sequelize("fyre_db", "root", "118136aaaA", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;

