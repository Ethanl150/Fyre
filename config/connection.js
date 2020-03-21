var Sequelize = require("sequelize");
require("dotenv").config();

// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL)
// } else {
//   connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: process.env.MySQL_PASS,
//     database: "burgers_db"
//   });
// }


if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  var sequelize = new Sequelize("fyre_db", "root", process.env.MYSQL_PASS, {
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

