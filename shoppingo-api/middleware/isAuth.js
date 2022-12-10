require('dotenv').config();
const jwt = require('jsonwebtoken');
const seller = require('../model/seller');
const User = require('../model/user');
const Seller = require('../model/seller.js');
module.exports = async (req, res, next) => {
	// const token = req.headers['authorization'];
	const token = req.get('Authorization').split(' ')[1];
	// console.log(token);
	if (!token) {
		res.status(422).json({ message: 'no token access' });
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		// console.log(decoded);
		req.userId = decoded.userId;
		// console.log(decoded)
		const user = await User.findById(req.userId);
		// console.log(user);
		req.userr = user;
		// console.log(req.userr, 'from isAuth');

		next();
	} catch (error) {
		res.status(422).json({ message: 'token is not valid' });
	}
};
