const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');

const app = express();
app.use( bodyParser.json() )

//the server makes the rules
//endpoints
app.get( "/api/movies", controller.read )
app.post( "/api/movies", controller.create )
app.put( "/api/movies/:id", controller.update )
app.delete( "/api/movies/:id", controller.delete )

const port = 3005;
app.listen( port, () =>  { console.log('Server is listening on port ' + port ); });