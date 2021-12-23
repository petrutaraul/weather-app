const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c0fa6f5e9c29753d0cc456fcfe9001c6&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find the location");
    } else {
      callback(
        undefined,
        "Today the temperature is " +
          body.current.temperature +
          " .The wind speed is " +
          body.current.wind_speed +
          " and it feels like " +
          body.current.feelslike +
          ". Also the pressure is " +
          body.current.pressure +
          " and the precipitation chance is " +
          body.current.precip +
          "."
      );
    }
  });
};

module.exports = forecast;
