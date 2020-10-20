//import dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

//set up app
const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

//API_TOKEN validation

//handle request functions
function handleGetMovie(req, res){
    res.send(`Let's go to the movies`);
}
//get endpoints
app.get('/movie', handleGetMovie);
//set PORT
const PORT = 8000
//listen
app.listen(PORT, ()=> {
    console.log(`Server listening at PORT ${PORT}`);
})