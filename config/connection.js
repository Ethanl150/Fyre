var Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
 sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  sequelize = new Sequelize("fyre_db", "root", process.env.MYSQL_PASS, {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
}

module.exports = sequelize;

