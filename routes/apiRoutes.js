const Playlist = require("../models/playlistModel.js");

module.exports = function(app) {
  app.get("/api/all", function(req, res) {
    Playlist.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  app.get("/api/:title", function(req, res) {
    if (req.params.title) {
      Playlist.findAll({
        where: {
          title: req.params.title
        }
      }).then(function(data) {
        res.json(data);
      });
    }
  });

  app.get("/api/:artist", function(req, res) {
    if (req.params.artist) {
      Playlist.findAll({
        where: {
          artist: req.params.artist
        }
      }).then(function(data) {
        res.json(data);
      });
    }
  });

  app.get("/api/:genre", function(req, res) {
    if (req.params.genre) {
      Playlist.findAll({
        where: {
          genre: req.params.genre
        }
      }).then(function(data) {
        res.json(data);
      });
    }
  });

  //add a song to playlist page
  app.post("/api/new", function(req, res) {
    Playlist.create({
      image: req.body.image,
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album
    });
  });

  //delete song on page
  app.post("/api/delete", function(req, res) {
    Playlist.destroy({
      where: {
        id: req.body.id
      }
    });
  });

  // app.post("/api/new", function (req, res) {
  //   Playlist.create(req.body).then(function (data) {
  //     res.json(data)
  //   })
  // })

  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
