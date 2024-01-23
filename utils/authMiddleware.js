const authMiddleware = (req, res, next) => {
	if (req.session.login) {
		next();
	} else {
		res.status(401).send('You are not authorised');
	}
};

module.exports = authMiddleware;
