const Ad = require('../models/Ad.model');
const sanitizeHtml = require('sanitize-html');

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
			imagr: image,
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
			res.status(404).json({ message: 'Could not find ad to edit' });
		} else {
			const { title, content, publishDate, image, price, location, user } =
				req.body;
			const editedAd = await Ad.updateOne(
				{ _id: req.params.id },
				{
					$set: {
						title: title,
						content: content,
						publishDate: publishDate,
						imagr: image,
						price: price,
						location: location,
						user: user,
					},
				}
			);
			res.json(editedAd);
		}
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
