const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1Ijoic2h1YmhhbXBhbDk4IiwiYSI6ImNqd2VsdmpncDB3aHI0YnMyOGMyb2t3OG8ifQ.VrBAO2eEFbAe4lCWBPCNXw`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to mapbox api', undefined);
    }
    else if (response.body.features.length === 0) {
      callback('Unable to find the longitude and latitude', undefined);
    }
    else {
      const data = response.body.features[0];
      const responseObj = {
        long: data.center[0],
        lat: data.center[1],
        location: data.place_name
      }
      callback(undefined, responseObj);
    }
  })
}

module.exports = geocode;
