var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use("/", express.static(path.join(__dirname + "/public")));
app.set("view engine", "hbs");

var artistsController = require("./controllers/artists");
var worksController = require("./controllers/works");

app.get("/", function(req, res){
  res.render("home");
});

app.use("/", artistsController);
app.use("/", worksController);

app.listen(3000, function(){
  console.log("Listening on port 3000");
});
