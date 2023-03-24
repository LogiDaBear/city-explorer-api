'use strict';

const axios = require('axios');

let weatherCache = {};

async function getWeather(request, response, next) {
  try {
    let queriedLat = request.query.lat;
    let queriedLon = request.query.lon;
    let weatherKey = `${queriedLat, queriedLon}-Weather`;

    if(weatherCache[weatherKey] && (Date.now() - weatherCache[weatherKey].timestamp) < 8.64e+7){
      console.log('weatherCACHE HIT!',weatherCache);

      response.status(200).send(weatherCache[weatherKey].data);

    }else{
      console.log('weatherCACHE NOT HIT :(');

      let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${queriedLat}&lon=${queriedLon}`
  
      let weatherDatafromAxios = await axios.get(weatherUrl);
      console.log(weatherDatafromAxios);
  
      let cityForecast = weatherDatafromAxios.data.data.map((day, idx) => new Forecast(day));
      console.log(cityForecast);

      weatherCache[weatherKey] = {
        data: cityForecast,
        timestamp: Date.now()
      };
  
      response.status(200).send(cityForecast);
    }

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