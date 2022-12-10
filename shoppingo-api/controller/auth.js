require('dotenv').config();

const User = require('../model/user');
const Seller = require('../model/seller.js');
const { validationResult } = require('express-validator');
const bycrpt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const { encrypt, decrypt } = require('../crypto.js');
// const Seller = require('../model/seller');
const isAuth = require('../middleware/isAuth');
const user = require('../model/user');
exports.admin = async (req, res, next) => {
	let flog1 = true;
	var sellerEmail = req.params['email'];
	var flag = req.params['flag'];
	var seller1 = await Seller.find({ emailShop: sellerEmail });
	if (flag == 'false') {
		await Seller.deleteOne({ emailShop: sellerEmail });
		res.json({ msg: 'fuck off' });
	} else {
		// console.log(seller1)
		User.findById(seller1[0].infoUser).then((user) => {
			user.status = 1;
			user.save();
		});
		// console.log(3);
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'sip2-267.nexcess.net',
			port: 587,
			secure: false,
			auth: {
				user: 'fullaaudi@gmail.com',
				pass: 'nsrexwxoxezlkqao'
			}
		});

		var mailOptions = {
			from: 'fullaaudi@gmail.com',
			to: sellerEmail,
			subject: 'Sending Email using Node.js',
			text: `you are seller! `
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				res.json({ error });
			} else {
				res.json({ 'Email sent: ': info.response });
			}
		});
	}
};
exports.upgrade = async (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		const error = new Error('enter valid things');
		error.statusCode = 422;
		throw error;
	}
	const { nameShop, phone, address, emailShop, infoUser, lat, log } = req.body;
	try {
		Seller.findOne({ emailShop: emailShop }).then((userdb) => {
			if (userdb) {
				const error = new Error('seller already exists');
				error.statusCode = 422;
				throw error;
			}
		});

		const seller = new Seller({
			nameShop: nameShop,
			emailShop: emailShop,
			phone: phone,
			address: address,
			infoUser: req.userId,
			lat: lat,
			log: log
		});
		seller.save();
		res.status(201).json({ message: 'user Created!!', seller: seller });
	} catch (err) {
		error.statusCode = 422;
		throw error;
	}
};

exports.getAllSeller = async (req, res, next) => {
	const allSeller = await Seller.find();
	// res.json({ allSeller });
	const sellerToUpgrade = [];
	setTimeout(() => {
		allSeller.forEach(async (seller) => {
			const user = await User.findById(seller.infoUser);
			// console.log(user);
			if (user.status === 0) {
				// console.log('jjjjjjjjjjjj');
				sellerToUpgrade.push(seller);
				// console.log(seller._id);
			}
		});
	}, 5000);
	setTimeout(() => {
		res.json( sellerToUpgrade );
	}, 15000);
};

exports.signup = async (req, res, next) => {
	const error = validationResult(req);
	// console.log(error);
	if (!error.isEmpty()) {
		const error = new Error('enter valid things');
		error.statusCode = 422;
		throw error;
	}
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	const imageUrl = name.slice(0, 1);
	try {
		// console.log(34)
		await User.findOne({ email: email })
			.then((userdb) => {
				if (userdb) {
					const error = new Error('user already exists');
					error.statusCode = 422;
					throw error;
				}
				const hash = encrypt(password);
				const salt = bycrpt.genSalt(12);
				// console.log(salt);
				bycrpt
					.hash(password, 12)
					.then((hashedPassword) => {
						console.log(hashedPassword);
						const user = new User({
							name: name,
							email: email,
							password: hashedPassword,
							pass: hash,
							imageUrl: imageUrl
						});
						return user.save();
					})
					.then((user) => {
						const userId = { userId: user._id };
						jwt.sign(userId, process.env.JWT_SECRET_KEY, (err, token) => {
							if (err) {
								const error = new Error(err.message);
								error.statusCode = 422;
								throw error;
							}
							res.status(201).json({ message: 'user Created!!', user: user, token });
						});
					});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	} catch (error) {
		error.statusCode = 422;
		throw error;
	}
};

/////////////////////////////////////LOGIN controlller///////////////////////////////////////

exports.login = (req, res, next) => {
	const error = validationResult(req);
	console.log(error);
	if (!error.isEmpty()) {
		const error = new Error('enter valid things');
		error.statusCode = 422;
		throw error;
	}
	var userCode;
	const email = req.body.email;
	const password = req.body.password;

	try {
		User.findOne({ email: email })
			.then((user) => {
				if (!user) {
					const error = new Error('Email is not exist');
					error.statusCode = 422;
					throw error;
				}
				const dec = decrypt(user.pass);
				bycrpt
					.compare(password, user.password)
					.then((isEqual) => {
						if (!isEqual) {
							const error = new Error('password is not correct');
							error.statusCode = 401;
							throw error;
						}

						const userId = user._id.toString();

						jwt.sign({ userId }, process.env.JWT_SECRET_KEY, (err, token) => {
							if (err) {
								const error = new Error(err.message);
								error.statusCode = 422;
								throw error;
							}
							res.status(201).json({ message: 'user Login!!', user: user, token: token });
						});
					})
					.catch((err) => {
						if (!err.statusCode) {
							err.statusCode = 500;
						}
						next(err);
					});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	} catch (error) {
		error.statusCode = 500;
		throw error;
	}
};
exports.forgetPassword = async (req, res, next) => {
	const email = req.body.email;
	const numRan = Math.random() * 100000;
	console.log(email);
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		host: 'sip2-267.nexcess.net',
		port: 587,
		secure: false,
		auth: {
			user: 'fullaaudi@gmail.com',
			pass: 'nsrexwxoxezlkqao'
		}
	});
	var mailOptions = {
		from: 'fullaaudi@gmail.com',
		to: email,
		subject: 'Sending Email using Node.js',
		text: `your code is ${numRan}`
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
	res.json({
		numRan: numRan
	});
};
exports.resetPassword = async (req, res, next) => {
	const newPassword = req.body.password;
	if (newPassword.length < 6) {
		res.json({
			status: 422,
			message: 'please enter six chars or mors for passowrd '
		});
	}
	const userId = req.userId;
	const user = await User.findById(userId);
	console.log(req.userId);
	const hash = encrypt(newPassword);
	const salt = bycrpt.genSalt(12);
	console.log(salt);
	bycrpt.hash(newPassword, 12).then((hashedPassword) => {
		s;
		user.password = hashedPassword;
		user.pass = hash;
		user.save();
	});
	res.json({
		user: user,
		message: 'password updated'
	});
};
