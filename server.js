'use strict';

console.log('our first server');

const { response } = require('express');
// REQUIRE
// in our servers, we have to use 'require' instead of 'import'
// Here we will list the requirments for a server
const express = require('express');
let data = require('./data/pets.json');

// we need to bring in our .env file, so we'll use this after we have installed
// `npm i dotenv`
require('dotenv').config();

// USE
// once we have required something, we have to use it
// Here is where we will assign the required file a variable
// React does this in one step with 'import' - express takes 2 steps: require and use
// This is just how express works
const app = express();

// define the PORT and validate that our .env is working
const PORT = process.env.PORT || 3002;

// If we see our server running on 3002, that means theere's a problem with our .env file or how we are importing it.

// ROUTES
// this is where we will write handlers for our endpoints

// create a basic default route
// app.get() correlates to axios.get()
// app.get() takes in a parament or a URL in quotes, and callback function
app.get('/', (request, response) => {
  response.send('Hello, from our server');
});

app.get('/sayHello', (request, response)=> {
  console.log(request.query.name);
  let lastName = request.query.lastName
  response.send(`Hi ${request.query.name} ${lastName}`);
});

app.get('/pet', (request, response) => {
  let species = request.query.species;

  let selectedPet = data.find(pet => pet.species === species);
  let petCleanedUp = new Pet(selectedPet);
  response.send(petCleanedUp);
})

// '*' wild card
// this will run for any route not defined above
app.get('*', (request, response) => {
  response.send('That route does not exist');
});

// ERRORS
// handle any errors

// CLASSES
class Pet {
  constructor(petObject) {
    this.name = petObject.name;
    this.breed = petObject.breed;
  }
}

// LISTEN
// start the server

// listen is express method, it takes in a port value and a callback function
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
