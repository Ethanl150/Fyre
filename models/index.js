// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection");

// Dependencies
// =============================================================

// Creates a "Genre" model that matches up with DB
var Fyrelists = sequelize.define("fyreLists", {
  // the name of the artist track (a string)
  title: Sequelize.STRING,
  // the name of the artist (a string)
  artist: Sequelize.STRING,
  // the genre (a string)
  genre: Sequelize.STRING,
  
  
}, {
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});

// Syncs with DB
FyreLists.sync();

// Makes the index Model available for other files (will also create a table)
module.exports = FyreLists;

