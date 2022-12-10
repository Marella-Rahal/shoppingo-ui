const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/isAuth');
const managmentController = require('../controller/managment');

const { check, validationResult } = require('express-validator');
const isAdmin = require('../middleware/isAdmin');
const isSeller = require('../middleware/isSeller');

//router for Add payment
router.post(
	'/addpayment',
	isAuth,
	[
		check('name', 'name is required').not().isEmpty(),
		check('value', 'value is required').not().isEmpty(),
		
	],
	managmentController.addPayment
);
//router for Post Payment Require
router.post(
	'/addPaymentReq',
	isAuth,
	[ check('name', 'name is required').not().isEmpty(), check('value', 'value is required').not().isEmpty() ],
	managmentController.addPaymentReq
);
// router for post addicome
router.post(
	'/addIncome',
	isAuth,
	[ check('value', 'name is required').not().isEmpty() ],
	managmentController.addIncome
);

//router for get all payments
router.get('/getallpayments', isAuth, managmentController.getpayments);
//router for get all reqpayments
router.get('/getallreqpayments', isAuth, managmentController.getreqpayments);
// router for get dashboard's data
router.get('/getdatadashboard', isAuth, managmentController.getdatadashboard);
router.post('/filterpayments', isAuth, managmentController.filterPayments);
router.post('/filterreqpayments', isAuth, managmentController.filterReqPayments);

router.post('/addInstallment/:id', isAuth, managmentController.addinstallment);
router.get('/deleteInstallment/:id', isAuth, managmentController.deleteinstallment);
router.post('/updateInstallment/:id', isAuth, managmentController.updateinstallment);
router.get('/monthlyinstallment/:id', isAuth, managmentController.addmonthlyinstallment);

router.get('/updatepayreq/:id', isAuth, managmentController.updatePayReq);

router.get('/getSellerDash', isAuth, isSeller, managmentController.getSellerDash);
module.exports = router;
