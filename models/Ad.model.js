const mongoose = require('mongoose');
const User = require('./User.model');

const adSchema = new mongoose.Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	publishDate: { type: Date, required: true },
	image: { type: String, required: false },
	price: { type: Number, required: true },
	location: { type: String, required: true },
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Ad', adSchema);
