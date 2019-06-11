const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/a0b095407cdb6aec82cb9a822d8399a8/${lat},${long}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather api", undefined);
    }
    else if (response.body.error) {
      callback("Unable to find the location", undefined);
    }
    else {
      const data = response.body.currently;
      callback(undefined, `${response.body.hourly.summary} It is currently ${data.temperature} degrees out. There is ${data.precipProbability}% chance of rain.`);
    }
  });
};

module.exports = forecast;