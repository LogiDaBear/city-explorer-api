'use strict';


console.log('Zup bone daddy...?')

//**** REQUIRES (like import but for the backend) */
const getMovies = require('./modules/movies.js');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather.js');

let data = require('./data/weather.json');

//***Once we bring in express we call it to create the server */
//***app === server */
const app = express();

//** MIDDLEWARE -CORS */
app.use(cors());

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on port ${PORT}!`));

app.get('/movies', getMovies);

app.get('/weather', getWeather);


//****CATCH ALL - BE AT THE BOTTOM AND SERVE AS 404 ERROR MESSAGE */
app.get('*', (request, response) => {
  response.status(404).send('This route does not exist...!');
});

//**ERROR HANDLING-PLUG AND PLAY FROM EXPRESS DOCS */
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});