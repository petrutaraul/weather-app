const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Petruta Raul Carlos Petru",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Petruta Raul Carlos Petru",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Please contact me if you need help",
    name: "Petruta Raul Carlos Petru",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "Please provide a location address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send([
        {
          forecast: forecastData,
          location: location,
          address,
        },
      ]);
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "No help article found",
    message: "This article can't be found",
    name: "Petruta Raul Carlos Petru",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404. Page not found",
    message: "The page doesn't exist",
    name: "Petruta Raul Carlos Petru",
  });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
