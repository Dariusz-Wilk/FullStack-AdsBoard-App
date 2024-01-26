const Ad = require('../models/Ad.model');
const User = require('../models/User.model');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType');

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
		const { title, content, publishDate, price, location, user } = req.body;
		const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

		if (
			title &&
			typeof title === 'string' &&
			content &&
			typeof content === 'string' &&
			publishDate &&
			typeof publishDate === 'string' &&
			price &&
			typeof price === 'string' &&
			location &&
			typeof location === 'string' &&
			req.file &&
			['image/png', 'image/gif', 'image/jpeg'].includes(fileType)
		) {
			const existingUser = await User.findOne({ _id: user });

			if (!existingUser) {
				res.status(404).json({ message: 'User not found' });
				return;
			}
			const newAd = await Ad.create({
				title: title,
				content: content,
				publishDate: publishDate,
				price: parseFloat(price),
				location: location,
				user: user,
				image: req.file.filename,
			});

			res.status(201).json({ message: 'New Ad has been added: ' + newAd });
		} else {
			if (req.file) {
				fs.unlinkSync(`./public/uploads/${req.file.filename}`);
				res.status(400).send({ message: 'Bad request' });
			}
		}
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
