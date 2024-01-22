const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
	try {
		const { login, password } = req.body;

		console.log(req.body, typeof login, typeof password);

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
exports.login = async (req, res) => {};
