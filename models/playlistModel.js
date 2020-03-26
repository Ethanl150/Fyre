const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

const Playlist = sequelize.define("playlist", {
  image: Sequelize.STRING,
  title: Sequelize.STRING,
  artist: Sequelize.STRING,
  album: Sequelize.STRING,
});

// Syncs with DB
Playlist.sync();

module.exports = Playlist;