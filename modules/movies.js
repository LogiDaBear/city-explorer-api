'use strict';

const axios = require('axios');

let moviesCache = {};

async function getMovies (request, response, next) {
  try {
    let queriedMovie = request.query.title;

    let moviesKey = `${queriedMovie}-Movie`;
    
    if(moviesCache[moviesKey] && (Date.now() - moviesCache[moviesKey].timestamp) < 8.64e+7){
      console.log('moviesCACHE HIT FOR CASH!', moviesCache);

      response.status(200).send(moviesCache[moviesKey].data);

    }else{

      console.log('NO ITEMS FOR CASH!');

      let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&language=en-US&query=${queriedMovie}&include_adult=false`

      let movieResultsfromAxios = await axios.get(movieUrl);
      console.log(movieResultsfromAxios);
  
      let moviecityResults = movieResultsfromAxios.data.results.map((movie) => new Movies(movie));

      //****BUILD INTO moviesCACHE */

      moviesCache[moviesKey] = {
        data: moviecityResults,
        timestamp: Date.now()
      };

      response.status(200).send(moviecityResults);
    }
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