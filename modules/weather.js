'use strict';

const axios = require('axios');

async function getWeather(request, response, next) {
  try {
    let queriedLat = request.query.lat;

    let queriedLon = request.query.lon;

    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${queriedLat}&lon=${queriedLon}`

    console.log(weatherUrl);

    let weatherDatafromAxios = await axios.get(weatherUrl);
    console.log(weatherDatafromAxios);

    let cityForecast = weatherDatafromAxios.data.data.map((day, idx) => new Forecast(day));
    console.log(cityForecast);

    response.status(200).send(cityForecast);
  } catch (error) {
    next(error);
  }
};

class Forecast {
  constructor(obj) {
    this.date = obj.valid_date,
      this.description = obj.weather.description
  }
};

module.exports = getWeather;