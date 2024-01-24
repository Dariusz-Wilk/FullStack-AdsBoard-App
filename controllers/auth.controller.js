const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const Session = require('../models/Session.model');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
	try {
		const { login, password, phoneNumber } = req.body;
		const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

		console.log(req.body, req.file);
		if (
			login &&
			typeof login === 'string' &&
			password &&
			typeof password === 'string' &&
			req.file &&
			['image/png', 'image/gif', 'image/jpeg'].includes(fileType) &&
			phoneNumber &&
			typeof phoneNumber === 'string'
		) {
			const isLoginExist = await User.findOne({ login: login });
			if (isLoginExist) {
				return res
					.status(409)
					.send('User with login "' + login + '" already exist');
			}
			const user = await User.create({
				login,
				password: await bcrypt.hash(password, 10),
				avatar: req.file.filename,
				phoneNumber,
			});
			res.status(200).json({ message: 'User added: ' + user.login });
		} else {
			res.status(400).send('Wrong data / Bad request');
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { login, password } = req.body;

		if (
			login &&
			typeof login === 'string' &&
			password &&
			typeof password === 'string'
		) {
			const user = await User.findOne({ login });
			if (!user || !bcrypt.compareSync(password, user.password)) {
				return res
					.status(409)
					.send({ message: 'Login or password are incorrect' });
			} else {
				req.session.user = { login: user.login, id: user._id };
				res
					.status(200)
					.json({ message: 'Login successfully', login: user.login });
			}
		} else {
			return res.status(400).send({ message: 'Wrong data / Bad request' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};

exports.getUser = (req, res) => {
	res.send({ message: 'Yeah, you`ve logged', user: req.session.user.login });
};

exports.logout = async (req, res) => {
	try {
		if (process.env.NODE_ENV !== 'production') {
			await Session.deleteMany({});
			res.send({ message: 'Session expired / you`ve log out' });
		} else {
			req.session.destroy();
			res.send("Yeah, You've just logged out");
		}
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
