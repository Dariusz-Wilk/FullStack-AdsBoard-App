const Session = require('../models/Session.model');
const authMiddleware = async (req, res, next) => {
	if (process.env.NODE_ENV !== 'production') {
		try {
			// find last session record in db
			const sessionRecord = await Session.findOne({});

			// if session is not found
			// return 401 status and message
			if (!sessionRecord)
				return res.status(401).send({ message: 'You are not authorized' });

			// if session is found, parse it and set user in req.session
			const sessionData = JSON.parse(sessionRecord.session);

			req.session.user = {
				id: sessionRecord._id,
				login: sessionData.user.login,
			};

			next();
		} catch (err) {
			return res.status(401).send({ message: err.message });
		}
	} else {
		if (req.session.user) {
			next();
		} else {
			res.status(401).send({ message: 'You are not authorized' });
		}
	}
};

module.exports = authMiddleware;