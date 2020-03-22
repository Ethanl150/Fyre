const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const exphbs = require("express-handlebars")
// const config = require("config/config.js")

const PORT = process.env.PORT || 8888

const app = express();

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

console.log('Listening on ' + PORT);

app.listen(PORT);