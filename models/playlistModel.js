// Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection");

const Playlist = sequelize.define("playlist", {
  // the name of the artist track (a string)
  title: Sequelize.STRING,
  // the name of the artist (a string)
  artist: Sequelize.STRING,
  // the genre (a string)
  genre: Sequelize.STRING,
});

// Syncs with DB
Playlist.sync();

module.exports = Playlist;

