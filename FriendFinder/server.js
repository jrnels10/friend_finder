// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// // Tells node that we are creating an "express" server
var app = express();

// // Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// // Sets up the Express app to handle data parsing
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // ================================================================================
// // ROUTER
// // The below points our server to a series of "route" files.
// // These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// // ================================================================================

// // require("app/routing/apiRoutes")(app);
// // require("app/routing/htmlRoutes")(app);

// // =============================================================================
// // LISTENER
// // The below code effectively "starts" our server
// // =============================================================================

// app.listen(PORT, function() {
//   console.log("App listening on PORT: " + PORT);
// });

var characters = [
    {
      routeName: "yoda",
      name: "Yoda",
      role: "Jedi Master",
      age: 900,
      forcePoints: 2000
    },
    {
      routeName: "darthmaul",
      name: "Darth Maul",
      role: "Sith Lord",
      age: 200,
      forcePoints: 1200
    },
    {
      routeName: "obiwankenobi",
      name: "Obi Wan Kenobi",
      role: "Jedi Master",
      age: 55,
      forcePoints: 1350
    }
  ];
  
  // Routes
  // =============================================================
  
  // Basic route that sends the user first to the AJAX Page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
  });
  
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
  });
  
  // Displays all characters
  app.get("/api/characters", function(req, res) {
    return res.json(characters);
  });
  
  // Displays a single character, or returns false
  app.get("/api/characters/:character", function(req, res) {
    var chosen = req.params.character;
  
    console.log(chosen);
  
    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        return res.json(characters[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New Characters - takes in JSON input
  app.post("/api/characters", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newcharacter = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newcharacter);
  
    characters.push(newcharacter);
  
    res.json(newcharacter);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  