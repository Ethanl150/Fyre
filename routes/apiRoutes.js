const Playlist = require("../models/playlistModel.js");

module.exports = function (app) {
  app.get("/api/all", function (req, res) {
    Playlist.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  app.get("/api/:title", function (req, res) {
    if (req.params.title) {
      Playlist.findAll({
        where: {
          title: req.params.title
        }
      }).then(function (data) {
        res.json(data);
      });
    }
  });

  app.get("/api/:artist", function (req, res) {
    if (req.params.artist) {
      Playlist.findAll({
        where: {
          artist: req.params.artist
        }
      }).then(function (data) {
        res.json(data);
      });
    }
  });

  app.get("/api/:genre", function (req, res) {
    if (req.params.genre) {
      Playlist.findAll({
        where: {
          genre: req.params.genre
        }
      }).then(function (data) {
        res.json(data);
      });
    }
  });

  //add a song to playlist page if it's not already there
  app.post("/api/new", function (req, res) {
    Playlist.findAll({
      where: {
        title: req.body.title,
        artist: req.body.artist
      }
    }).then(function (data) {
      if (data.length) {
        res.end();
      } else {
        Playlist.create({
          image: req.body.image,
          title: req.body.title,
          artist: req.body.artist,
          album: req.body.album
        }).then(function (data) {
          res.json(data)
        });
      };
    });
  });

  app.delete("/api/delete/:id", function (req, res) {
    Playlist.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });
};
