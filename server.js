const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();

// start express server
const app = express();

// Connect to DB
connectToDB();

//add standard middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		store: MongoStore.create(mongoose.connection),
		resave: false,
		saveUninitialized: false,
	})
);

// add server endpoints and routes
app.use('/api', require('./routes/ads.routes'));
app.use('/auth', require('./routes/auth.routes'));

// serve static files from React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
	res.status(404).send({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running...');
});
