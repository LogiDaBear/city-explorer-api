'use strict';

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

app.get('/weather', (request, response, next) => {
  try {
    let queriedLat = request.query.lat;
    let queriedLon = request.query.lon;
    console.log(queriedLat, queriedLon);
    let foundCity = data.find(weather => {
      console.log(weather.lat, weather.lon)
    return weather.lat == queriedLat && weather.lon == queriedLon})
    console.log(foundCity);
    let cityForecast = foundCity.data.map((day, idx) => new Forecast(day));
    
      
      

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
}



//****CATCH ALL - BE AT THE BOTTOM AND SERVE AS 404 ERROR MESSAGE */
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist...!');
});

//**ERROR HANDLING-PLUG AND PLAY FROM EXPRESS DOCS */
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});