'use strict';

const axios = require('axios');

async function getMovies (request, response, next) {
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
}

class Movies {
  constructor(mObj) {
    this.title = mObj.title;
    this.overview = mObj.overview;
  }
};


module.exports = getMovies;