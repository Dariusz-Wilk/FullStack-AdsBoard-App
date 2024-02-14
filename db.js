const mongoose = require('mongoose');

let dbUri = '';

if (process.env.NODE_ENV === 'production')
	dbUri = `mongodb+srv://dariuszwilk1993:${process.env.DB_PASS}@cluster0.hbjumtc.mongodb.net/?retryWrites=true&w=majority`;
else dbUri = 'mongodb://0.0.0.0:27017/adsBoardDB';

const connectToDB = () => {
	// connect to DB

	mongoose.connect(dbUri);

	const db = mongoose.connection;

	// on success
	db.once('open', () => {
		console.log(`Connected to the database`);
	});

	// on error
	db.on('error', err => console.log('Error ' + err));
};

module.exports = connectToDB;
