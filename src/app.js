const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsDir);
app.set("view engine", "hbs");
app.set("views", viewsDir);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Shubham Pal"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Shubham Pal"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Shubham Pal"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide addresss"
    });
  }
  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Shubham Pal",
    error: "Help Article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Shubham Pal",
    error: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server success");
});
