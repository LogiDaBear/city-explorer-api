'use strict';
const axios = require('axios');

console.log('Zup bone daddy...?')

//**** REQUIRES (like import but for the backend) */

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('./data/weather.json');

//***Once we bring in express we call it to create the server */
//***app === server */
const app = express();

//** MIDDLEWARE -CORS */
app.use(cors());


//***PORT THAT MY SERVER WILL RUN ON */
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on port ${PORT}!`));

//**ENDPOINTS****

//**BASE ENDPOINT - PROOF OF LIFE */
//***1st Arg - string url in quotes */
//**2nd Arg - callback that will execute when that endpoint is hit */


app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstName;
  let userLastName = request.query.lastName;


  // let key = request.query.key;
  // let searchInfo = request.query.q
  response.status(200).send(`Howdy ${userFirstName} ${userLastName}! Welcome to my server.`);

});
//TODO: Build an endpoint that will call out to an api
// app.get('/', async(request, response, next) => {
//   try{
//TODO: accept queries -> /movies?searchQuery=value

//     let keywordFromFrontEnd = request.query.searchQuery;

//TODO: build my url for axios
//     let url = `${request.query}`

// let movieResults = await axios.get(url);

//TODO: groom that data and send it to the frontend
//let moviesToSend = movieResults.data.results.map((movie => new Movie(movie)));
//   }
// }
app.get('/movies', async (request, response, next) => {
  try {
    let queriedMovie = request.query.title;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&query=${queriedMovie}&include_adult=false`
    console.log(movieUrl);

    let movieResultsfromAxios = await axios.get(movieUrl);
    console.log(movieResultsfromAxios);

    let moviecityResults = movieResultsfromAxios.data.results.map((movie) => new Movies(movie));

    response.status(200).send(moviecityResults);
  } catch (error) {
    next(error);
  }
});

class Movies {
  constructor(mObj) {
    this.title = mObj.title;
    this.overview = mObj.overview;
  }
};


app.get('/weather', async (request, response, next) => {
  try {
    let queriedLat = request.query.lat;
    let queriedLon = request.query.lon;
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${queriedLat}&lon=${queriedLon}`
    console.log(weatherUrl);
    let weatherDatafromAxios = await axios.get(weatherUrl);
    // let foundCity = data.find(weather => {
    console.log(weatherDatafromAxios);

    // return weather.lat == queriedLat && weather.lon == queriedLon})
    // console.log(foundCity);
    let cityForecast = weatherDatafromAxios.data.data.map((day, idx) => new Forecast(day));
    console.log(cityForecast);




    response.status(200).send(cityForecast);
  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(obj) {
    this.date = obj.valid_date,
      this.description = obj.weather.description
  }
};



//****CATCH ALL - BE AT THE BOTTOM AND SERVE AS 404 ERROR MESSAGE */
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist...!');
});

//**ERROR HANDLING-PLUG AND PLAY FROM EXPRESS DOCS */
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});