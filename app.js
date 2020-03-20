/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var cors = require('cors');
var cookieParser = require('cookie-parser');
var exphbs = require("express-handlebars")




var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/apiRoutes.js")(app)
require("./routes/htmlRoutes.js")(app)

console.log('Listening on 8888');
app.listen(8888);
