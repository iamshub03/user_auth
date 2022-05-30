//External Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//Internal Imports
const routes = require('./routes/routes');

//Set the view engine to EJS
app.set('view engine', 'ejs');

const port = 8080;

//Connect with DB
const DB_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.0ueb0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (res) => console.log('Database connected...'));

//configure body-parser for express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Base route
app.get('/', (req, res) => {
    res.render('dashboard/index', {name : 'Shubham'});
});

//Use routes from the routes.js file
app.use('/v1', routes);

app.listen(port, () => {
    console.log("Server started...");
});