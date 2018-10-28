const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/recipesDB");
let db = mongoose.connection;

db.once("open", function() {
  console.log("Connected to MongoDB");
});

db.on("error", function(err) {
  console.log(err);
});

var app = express();

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// static files -  need this for my own js and css
app.use(express.static(path.join(__dirname, "/public")));

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var recipes = [{'id': '1','name': 'Roast Beef', 'description': 'Test'}, {'id': '2','name': 'Pork Chop', 'description': 'test'}];

app.get("/", function(req, res) {
  Recipe.find({}, function(err, recipes) {
    res.render("home", { recipes: recipes });
  });
});

app.post("/add", function(req, res) {
  let recipe = new Recipe();
  recipe.title = req.body.title;
  recipe.ingredients = req.body.ingredients;
  recipe.directions = req.body.directions;

  recipe.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

//edit recipe
app.get("/edit/:id", function(req, res) {
  Recipe.findById(req.params.id, function(err, recipe) {
    //console.log(recipe);
    res.render("edit", { recipe: recipe });
  });
});

app.post("/edit/:id", function(req, res) {
  let recipe = {};
  recipe.title = req.body.title;
  recipe.ingredients = req.body.ingredients;
  recipe.directions = req.body.directions;
  console.log(req.body.title);
  let query = { _id: req.params.id };

  Recipe.update(query, recipe, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

app.delete("/recipe/:id", function(req, res) {
  //   Recipe.findByIdAndRemove({ _id: req.params.id }).then(function(recipe) {});
  //   res.send(recipe);
  let query = { _id: req.params.id };

  Recipe.remove(query, function(err) {
    if (err) {
      console.log(err);
    }
    res.send("Success");
  });
});

app.set("port", process.env.PORT || 3000);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
