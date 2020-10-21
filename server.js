//invoke dotenv to read API_TOKEN
require('dotenv').config();

//import dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const movies = require('./movies-data-small.json');

//set up app
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

//API_TOKEN validation
app.use(function validateBearerToken(req, res, next) {
    //devlare variables
    const apiToken = process.env.API_TOKEN;
    const apiAuth = req.get('Authorization');
   
    //check if bearerToken matches apiToken 
    if(!apiAuth || apiAuth.split(' ')[1] !== apiToken){
        return res.status(401).json({error: 'Unauthorized request'})
    }
    //continue to next function
    next();

})
//handle request functions
function handleGetMovie(req, res){
    const {genre, country, avg_vote} = req.query;
    let results = movies;
    //check if search by genre
    if(genre){
        results = results.filter(movie => {
            return (
                movie
                .genre
                .toLowerCase()
                .includes(genre.toLowerCase())
            );
        });
    }
    //check if search by country 
    if(country){
        results = results.filter(movie => {
            return(
                movie
                .country
                .toLowerCase()
                .includes(country.toLowerCase())
            );
        });
    }
    //check if search by avg_vote
    if(avg_vote){
        if(isNaN(avg_vote)){
            return res.status(400).send('Please enter in a valid number');
        }
        results = results.filter(movie => {
            return (
                movie.avg_vote >= parseFloat(avg_vote)
            );
        })
    }


    res.json(results);
}
//get endpoints
app.get('/movie', handleGetMovie);
//set PORT
const PORT = 8000
//listen
app.listen(PORT, ()=> {
    console.log(`Server listening at PORT ${PORT}`);
})