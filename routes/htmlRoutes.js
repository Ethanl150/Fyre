const Playlist = require("../models/playlistModel.js");
const querystring = require('querystring');
const request = require('request');
const sequelize = require("../config/connection.js")

const client_id = 'e85b89289a214ae4a662fb72e04af092';
const client_secret = 'af98379121394239860ea4d618489099';
let redirect_uri;

if (sequelize.config.host === "localhost") {
  redirect_uri = "http://localhost:8888/callback"
} else {
  redirect_uri = 'https://fathomless-basin-76899.herokuapp.com/callback';
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.render("login")
  })

  app.get('/index/:token', function (req, res) {
    const token = req.params.token;
    res.render("index", { token: token })
  })

  app.get('/playlist/:token', function (req, res) {
    const token = req.params.token;
    Playlist.findAll({}).then(function (data) {
      res.render("playlist", {
        playlist: data,
        token: token
      })
    })
  })

  app.get('/login', function (req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);

    // application requests authorization

    var scope = 'streaming user-read-private user-read-email playlist-modify-private user-read-playback-state user-read-currently-playing user-modify-playback-state';

    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

  app.get('/', function (req, res) {
    res.render('login')
  })

  app.get('/callback', function (req, res) {

    // application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

          var access_token = body.access_token,
            refresh_token = body.refresh_token;

          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          request.get(options, function (error, response, body) {
            console.log(body);
          });
          res.redirect("/index/" + access_token)
        }
      });
    }
  });

  app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });
};
