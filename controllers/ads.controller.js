const Ad = require('../models/Ad.model');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');

exports.getAllAds = async (req, res) => {
	try {
		res.json(await Ad.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getAdById = async (req, res) => {
	try {
		const ad = await Ad.findById(req.params.id);
		if (!ad) {
			res.status(404).json({ message: 'Ad Not Found' });
		} else res.json(ad);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.addNewAd = async (req, res) => {
	try {
		const { title, content, publishDate, image, price, location, user } =
			req.body;

		const newAd = new Ad({
			title: title,
			content: content,
			publishDate: publishDate,
			image: image,
			price: price,
			location: location,
			user: user,
		});

		await newAd.save();
		res.json({ message: 'New Ad has been added' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editAdById = async (req, res) => {
	try {
		const adToEdit = await Ad.findById(req.params.id);
		if (!adToEdit) {
			return res.status(404).json({ message: 'Could not find ad to edit' });
		}

		const { title, content, publishDate, price, location, user } = req.body;
		let newImage = req.file ? req.file.filename : adToEdit.image;

		if (req.file) {
			fs.unlinkSync(`./public/uploads/${adToEdit.image}`);
		}

		const editedAd = await Ad.updateOne(
			{ _id: req.params.id },
			{
				$set: {
					title: title,
					content: content,
					publishDate: publishDate,
					image: newImage,
					price: price,
					location: location,
					user: user,
				},
			}
		);

		res.json(editedAd);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteAd = async (req, res) => {
	try {
		const ad = await Ad.findById(rea.params.id);
		if (!ad) {
			res.status(404).json({ message: 'Ad Not Found' });
		} else {
			await Ad.deleteOne({ _id: req.params.id });
			res.json({ message: 'Ad has been deleted' });
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.searchAd = async (rec, res) => {
	try {
		const ad = await Ad.find({
			title: { $regex: new RegExp(rec.params.searchPhrase), $options: 'i' },
		});
		if (!ad) {
			res.status(404).json({ message: 'Ad Not Found' });
		} else {
			res.json(ad);
		}
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
