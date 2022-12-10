const express = require('express');
const isAuth = require('../middleware/isAuth');
const isSeller = require('../middleware/isSeller.js');
const isAdmin = require('../middleware/isAdmin');
const cartController = require('../controller/cart.js');
const router = express.Router();

router.post('/addItemToCart', isAuth, cartController.addItemToCart);
router.get('/getCart', isAuth, cartController.getCart);
router.post('/deleteFromCart', isAuth, cartController.removeCartItems);
router.get('/addCartToPayments', isAuth, cartController.addCartToPayments);
router.post('/updatequantity', isAuth, cartController.updateQuantity);
module.exports = router;
