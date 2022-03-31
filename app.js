require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;

//Connect with DB
const DB_CONNECTION_STRING = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.0ueb0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}, () => console.log("Connected to DB...."));

//configure body-parser for express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Test route
app.get('/', (req, res) => {
    res.send("Hello World");
});

//get the users routes from the user controller
const users = require('./Controller/UsersController');
app.use('/user', users);

app.listen(port, () => {
    console.log("Server started...");
});