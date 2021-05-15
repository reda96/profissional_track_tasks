// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Start up an instance of app
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//  GET route setup on the server side
app.get("/weather", (req, res) => res.send(projectData));

// POST route setup on the server side
app.post("/weather", (req, res) => {
  const newEntry = {
    zip: req.body.zip,
    feelings: req.body.feelings,
  };
  projectData.push(newEntry);
  res.send(projectData);
});
// Setup Server
app.listen(3000, () => {
  console.log("listening to server 3000");
});
