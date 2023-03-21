'use strict';

console.log('Zup bone daddy...?')

//**** REQUIRES (like import but for the backend) */

const express = require('express');
require('dotenv').config();
const cors = require('cors');

//***Once we bring in express we call it to create the server */
//***app === server */
const app = express();

//** MIDDLEWARE -CORS */
app.use(cors());


//***PORT THAT MY SERVER WILL RUN ON */
const PORT = process.env.PORT || 3002;

app.listen(PORT, ()=> console.log(`We are running on port ${PORT}!`));

//**ENDPOINTS****

//**BASE ENDPOINT - PROOF OF LIFE */
//***1st Arg - string url in quotes */
//**2nd Arg - callback that will execute when that endpoint is hit */


app.get('/', (request, response) =>{
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


//****CATCH ALL - BE AT THE BOTTOM AND SERVE AS 404 ERROR MESSAGE */
app.get('*', (request, response)=>{
  response.status(404).send('This route does not exist...!');
});