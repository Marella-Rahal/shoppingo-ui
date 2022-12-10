const User = require('../model/user.js');
module.exports = async (req, res, next) => {
	try {
		// console.log(req.user)
		const user = req.userr;
		// console.log(user);
		// console.log(user, req.userr, 'from isSeller');

		if (user.status !== 1 && user.status !== 2) {
			const error = new Error('you are not allowed to edit you need to be an Seller');
			error.statusCode = 401;
			res.status(error.statusCode).json({ msg: error.message });
			throw error;
		}
		next();
	} catch (error) {
		error.statusCode = 500;
		throw error;
	}
};
