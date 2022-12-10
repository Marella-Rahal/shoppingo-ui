const express = require('express');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

const authController = require('../controller/auth');
const { check, validationResult } = require('express-validator');

router.post(
	'/signup',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'please insert valid Email').not().isEmpty().isEmail(),
		check('password', 'please insert password with 6 charchter or more').not().isEmpty().isLength({
			min: 6
		})
	],
	authController.signup
);

router.post('/login', [ check('email', 'please insert valid Email').not().isEmpty().isEmail() ], authController.login);
router.post(
	'/ubgrade',
	isAuth,
	[
		check('nameShop', 'Name is required').not().isEmpty(),
		check('emailShop', 'please insert vaild Email').not().isEmpty().isEmail(),
		check('address', 'please insert your location').not().isEmpty(),
		check('phone', 'please insert your phone').not().isEmpty()
	],
	authController.upgrade
);
router.post('/admin/:email/:flag', isAuth, isAdmin, authController.admin);
router.post('/forgetPassword', authController.forgetPassword);
router.post('/resetPassword', authController.resetPassword);

router.get('/admin/getAllSeller', isAuth, isAdmin, authController.getAllSeller);
module.exports = router;
