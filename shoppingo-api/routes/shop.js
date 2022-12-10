const express = require('express');
const isAuth = require('../middleware/isAuth');
const isSeller = require('../middleware/isSeller.js');
const isAdmin = require('../middleware/isAdmin');
const productController = require('../controller/shop');
const router = express.Router();
///////////////start process image////////////
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else cb(null, false);
};
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});
///////end process image////////////////

const shopController = require('../controller/shop');
const { check, validationResult } = require('express-validator');
router.post('/addProduct', upload.single('productImage'), isAuth, isSeller, shopController.addProduct);
router.get('/getProducts', shopController.getProducts);
router.post('/displayProduct/:id', isAuth, shopController.displayProduct);
router.post('/getCategoriesProduct', isAuth, shopController.getCategoriesProduct);
router.post('/ProductFilter', shopController.ProductFilter);
router.get('/createProductReview', isAuth, shopController.createProductReview);
router.get('/deleteProduct/:id', isAuth, isSeller, shopController.deleteProduct);
router.post('/updateProduct/:id', isAuth, isSeller, shopController.updateProduct);
router.get('/getProductInfoForUpdate/:id', isAuth, isSeller, shopController.getProductInfoForUpdate);

module.exports = router;
