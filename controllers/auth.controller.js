const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
	try {
		const { login, password } = req.body;

		if (
			login &&
			typeof login === 'string' &&
			password &&
			typeof password === 'string'
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
			}
			return res.status(200).json({ message: 'Login successfully' });
		} else {
			return res.status(400).send({ message: 'Wrong data / Bad request' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
};
